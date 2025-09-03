const { v5: uuidV5 } = require("uuid");
const { getCurrentTimeStamp } = require("../mappers/audit-mapper");
const { OutletMacVersionRepo } = require("../repository/outlet_mac-version");
const { SUCCESS_RESPONSE } = require("../../commons/constant");
const { DEPLOYMENT_STATUS } = require("../commons/constants");

function postOutletMacVersionService(fastify) {
  const { createOutletMacVersion } = OutletMacVersionRepo();

  return async ({ input }) => {
    const { outlet_id, type, mac_address, terminal_id, service = "", audit, ...rest } = input;

    const macAddress = mac_address.toLowerCase();

    const outletMacVersionId = uuidV5(`${outlet_id}-${type}-${macAddress}-${service}`, uuidV5.URL);
    const currentTimeStamp = getCurrentTimeStamp();
    const body = {
      outlet_mac_version_id: outletMacVersionId,
      outlet_id,
      terminal_id,
      type,
      mac_address,
      service,
      status: DEPLOYMENT_STATUS.PENDING,
      ...rest,
      audit: { created_at: currentTimeStamp, created_by: audit?.created_by },
      updateAudit: {
        last_modified_at: currentTimeStamp,
        last_modified_by: audit?.last_modified_by
      },
      api_version: "v1"
    };

    await createOutletMacVersion.call(fastify.knex, { input: body });

    return SUCCESS_RESPONSE;
  };
}
module.exports = postOutletMacVersionService;
