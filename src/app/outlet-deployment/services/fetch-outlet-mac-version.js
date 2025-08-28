const { v5: uuidV5 } = require("uuid");
const { OutletMacVersionRepo } = require("../repository/outlet_mac-version");

function fetchOutletMacVersionService(fastify) {
  const { getOutletMacVersion } = OutletMacVersionRepo();

  return async ({ input }) => {
    const { outlet_id, type, mac_address, service = "" } = input;
    const outletMacVersionId = uuidV5(`${outlet_id}-${type}-${mac_address}-${service}`, uuidV5.URL);
    const [outletMacVersion] = await getOutletMacVersion.call(fastify.knex, {
      filters: { where: { outlet_mac_version_id: outletMacVersionId } }
    });

    return {
      version: outletMacVersion?.version,
      deployment_hash: outletMacVersion?.deployment_hash,
      outlet_id: outletMacVersion?.outlet_id,
      terminal_id: outletMacVersion?.terminal_id
    };
  };
}
module.exports = fetchOutletMacVersionService;
