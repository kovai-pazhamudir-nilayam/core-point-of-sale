const _ = require("lodash");
const { v5: uuidV5 } = require("uuid");
const { newAudit, updatedAudit } = require("../mappers/audit-mapper");
const { OutletMacVersionRepo, OUTLET_MAC_VERSION } = require("../repository/outlet_mac-version");
const { OutletMacVersionHistoryRepo } = require("../repository/outlet-mac-version-history");
const { SUCCESS_RESPONSE } = require("../../commons/constant");
const { CHUNK_SIZE, TYPE, DEPLOYMENT_STATUS } = require("../commons/constants");
const { TerminalRepo } = require("../../terminal/repository/terminal");

function buildPayload({ payload }) {
  const { outlet_id, mac_address, service, type, terminal_id, audit, deployment_hash, version } =
    payload;

  const outletMacVersionId = uuidV5(`${outlet_id}-${type}-${mac_address}-${service}`, uuidV5.URL);

  const createdAudit = newAudit({ createdBy: audit?.created_by });
  const modifiedAudit = updatedAudit({ updatedBy: audit?.last_modified_by });

  return {
    outlet_mac_version_id: outletMacVersionId,
    outlet_id,
    terminal_id,
    type,
    mac_address,
    service,
    status: DEPLOYMENT_STATUS.PENDING,
    deployment_hash,
    version,
    ...createdAudit,
    ...modifiedAudit
  };
}

async function fetchTerminals({ fastify, outlets, type }) {
  const { getTerminal } = TerminalRepo();

  if (type === TYPE.SERVER) return new Map();

  const macAddresses = _.uniq(
    outlets.reduce((acc, { mac_addresses = [] }) => [...acc, ...mac_addresses], [])
  );

  if (_.isEmpty(macAddresses)) return new Map();

  const terminals = await getTerminal.call(fastify.knex, {
    filters: { whereIn: { mac_addresses: macAddresses } }
  });

  return new Map(terminals.map(t => [t.mac_address, t]));
}

function buildTargets({ input, terminalMap }) {
  const { outlets, service = "", type, audit, deployment_hash, version } = input;
  return outlets.flatMap(({ outlet_id, mac_addresses = [] }) =>
    mac_addresses.map(macAddress => {
      const payload = {
        outlet_id,
        mac_address: macAddress,
        service,
        type,
        terminal_id: terminalMap.get(macAddress)?.terminal_id,
        audit,
        deployment_hash,
        version
      };
      return buildPayload({ payload });
    })
  );
}

async function insertOutletMacVersions({ knexTrx, targets }) {
  const { createOutletMacVersion } = OutletMacVersionRepo();

  const chunks = _.chunk(targets, CHUNK_SIZE);
  const createOutletMacVersionPromise = chunks.map(chunk =>
    createOutletMacVersion.call(knexTrx, { input: chunk })
  );
  const results = await Promise.all(createOutletMacVersionPromise);
  return results.flat();
}

async function insertHistoryIfExists({ knexTrx, existingRecords }) {
  const { createOutletMacVersionHistory } = OutletMacVersionHistoryRepo();

  if (_.isEmpty(existingRecords)) return;

  const historyChunks = _.chunk(existingRecords, CHUNK_SIZE);

  const createHistoryPromise = historyChunks.map(chunk =>
    createOutletMacVersionHistory.call(knexTrx, { input: chunk })
  );

  await Promise.all(createHistoryPromise);
}

function postOutletMacVersionBulkService(fastify) {
  const { getOutletMacVersion } = OutletMacVersionRepo();

  return async ({ input }) => {
    const { outlets = [], type } = input;

    if (_.isEmpty(outlets)) return SUCCESS_RESPONSE;

    const terminalMap = await fetchTerminals({ fastify, outlets, type });

    const targets = buildTargets({ input, terminalMap });

    if (_.isEmpty(targets)) return SUCCESS_RESPONSE;

    const knexTrx = await fastify.knex.transaction();

    try {
      const outletMacVersionIds = _.map(targets, OUTLET_MAC_VERSION.COLUMNS.OUTLET_MAC_VERSION_ID);

      const existingRecords = await getOutletMacVersion.call(knexTrx, {
        filters: { whereIn: { outlet_mac_version_id: outletMacVersionIds } }
      });

      if (!_.isEmpty(existingRecords)) {
        await insertHistoryIfExists({ knexTrx, existingRecords });
      }

      await insertOutletMacVersions({ knexTrx, targets });

      await knexTrx.commit();
    } catch (err) {
      await knexTrx.rollback();
      throw err;
    }

    return SUCCESS_RESPONSE;
  };
}

module.exports = postOutletMacVersionBulkService;
