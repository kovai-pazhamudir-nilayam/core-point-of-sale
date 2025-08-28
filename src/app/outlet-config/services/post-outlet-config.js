const emitOutletConfigEventService = require("./outlet-config-event");
const { SUCCESS_RESPONSE, OUTLET_CONFIG_EVENT_TYPES } = require("../commons/constants");
const { OutletConfigRepo } = require("../repository/outlet-config");

function postOutletConfigService(fastify) {
  const { createOutletConfig } = OutletConfigRepo();
  const emitOutletConfigEvent = emitOutletConfigEventService(fastify);

  return async ({ logTrace, body }) => {
    const { allowed_pos_modes = [], allowed_payment_modes = [] } = body;

    const outletConfigs = await createOutletConfig.call(fastify.knex, {
      input: {
        ...body,
        allowed_pos_modes: JSON.stringify(allowed_pos_modes),
        allowed_payment_modes: JSON.stringify(allowed_payment_modes)
      }
    });

    const outletIds = outletConfigs.map(ele => ele.outlet_id);

    outletIds.forEach(outletId => {
      emitOutletConfigEvent({
        outletId,
        eventType: OUTLET_CONFIG_EVENT_TYPES.OUTLET_CONFIG_UPDATED,
        logTrace
      });
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = postOutletConfigService;
