const { SUCCESS_RESPONSE } = require("../../commons/constant");
const { getCurrentTimeStamp } = require("../mappers/audit-mapper");
const { OutletMacVersionRepo, OUTLET_MAC_VERSION } = require("../repository/outlet_mac-version");

function postOutletMacVersionDeploymentStatusService(fastify) {
  const { updateOutletMacVersion } = OutletMacVersionRepo();

  return async ({ input }) => {
    const { mac_address, status } = input;

    const body = {
      [OUTLET_MAC_VERSION.COLUMNS.STATUS]: status,
      [OUTLET_MAC_VERSION.COLUMNS.LAST_MODIFIED_AT]: getCurrentTimeStamp()
    };

    await updateOutletMacVersion.call(fastify.knex, {
      input: body,
      filters: { where: { mac_address } }
    });

    return SUCCESS_RESPONSE;
  };
}

module.exports = postOutletMacVersionDeploymentStatusService;
