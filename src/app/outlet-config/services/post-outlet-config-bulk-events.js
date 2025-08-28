const { OUTLET_CONFIG_EVENT_TYPES, SUCCESS_RESPONSE } = require("../commons/constants");
const { OutletConfigRepo, OUTLET_CONFIG } = require("../repository/outlet-config");
const emitOutletConfigEventService = require("./outlet-config-event");

function postTerminalBuklEventsService(fastify) {
  const { getOutletConfig } = OutletConfigRepo();
  const emitOutletConfigEvent = emitOutletConfigEventService(fastify);

  return async ({ input, logTrace }) => {
    const { outlet_ids } = input;

    const outletFilters = {
      columns: [OUTLET_CONFIG.COLUMNS.OUTLET_ID],
      values: outlet_ids
    };

    const outletConfigs = await getOutletConfig.call(fastify.knex, {
      filters: { whereIn: outletFilters }
    });

    const outletIds = outletConfigs.map(ele => ele.outlet_id);

    outletIds.forEach(outletId => {
      emitOutletConfigEvent({
        outletId,
        eventType: OUTLET_CONFIG_EVENT_TYPES.OUTLET_CONFIG_BULK_DATA_UPDATED,
        logTrace
      });
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = postTerminalBuklEventsService;
