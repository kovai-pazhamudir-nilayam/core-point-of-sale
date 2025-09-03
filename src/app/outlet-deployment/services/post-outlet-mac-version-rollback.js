const _ = require("lodash");
const { newAudit, updatedAudit } = require("../mappers/audit-mapper");
const { mapHistoryToBaseRecord } = require("../mappers/outlet-mac-version-history");
const { OUTLET_MAC_VERSION_HISTORY } = require("../repository/outlet-mac-version-history");
const { DEPLOYMENT_STATUS } = require("../commons/constants");
const { OutletMacVersionRepo } = require("../repository/outlet_mac-version");
const { OutletMacVersionHistoryRepo } = require("../repository/outlet-mac-version-history");
const Errors = require("../../errorHandler/domain/errors");
const { SUCCESS_RESPONSE } = require("../../commons/constant");

function postOutletMacVersionRollbackService(fastify) {
  const { getOutletMacVersion, createOutletMacVersion } = OutletMacVersionRepo();
  const { getOutletMacVersionHistory, createOutletMacVersionHistory } =
    OutletMacVersionHistoryRepo();

  return async ({ input }) => {
    const { outlet_mac_version_history_id, audit = {} } = input;

    const outletMacVersionHistory = await getOutletMacVersionHistory.call(fastify.knex, {
      input: {
        filters: {
          where: {
            [OUTLET_MAC_VERSION_HISTORY.COLUMNS.OUTLET_MAC_VERSION_HISTORY_ID]:
              outlet_mac_version_history_id
          }
        }
      }
    });

    if (_.isEmpty(outletMacVersionHistory)) {
      throw Errors.OutletMacVersionHistoryNotFoundError();
    }

    const deploymentHistory = _.first(outletMacVersionHistory);

    const existingOutletMacVersion = await getOutletMacVersion.call(fastify.knex, {
      filters: {
        where: {
          outlet_mac_version_id: deploymentHistory.outlet_mac_version_id
        }
      }
    });

    const existingDeployment = _.first(existingOutletMacVersion);

    const baseRecord = mapHistoryToBaseRecord({ deploymentHistory });

    const createdAudit = newAudit({ createdBy: audit?.created_by });
    const modifiedAudit = updatedAudit({ updatedBy: audit?.last_modified_by });

    const rollbackRecord = {
      ...baseRecord,
      status: DEPLOYMENT_STATUS.PENDING,
      ...createdAudit,
      ...modifiedAudit,
      is_rollbacked: true
    };

    const knexTrx = await fastify.knex.transaction();

    try {
      if (existingDeployment) {
        await createOutletMacVersionHistory.call(knexTrx, { input: existingDeployment });
      }

      await createOutletMacVersion.call(knexTrx, { input: rollbackRecord });

      await knexTrx.commit();
    } catch (err) {
      await knexTrx.rollback();
      throw err;
    }

    return SUCCESS_RESPONSE;
  };
}

module.exports = postOutletMacVersionRollbackService;
