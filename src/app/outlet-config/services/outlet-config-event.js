const { OutletConfigRepo, OUTLET_CONFIG } = require("../repository/outlet-config");

function emitOutletConfigEventService(fastify) {
  const { getOutletConfig } = OutletConfigRepo(fastify);

  return async ({ outletId, eventType, logTrace }) => {
    try {
      const [outletConfigResponse] = await getOutletConfig.call(fastify.knex, {
        filters: {
          where: { [OUTLET_CONFIG.COLUMNS.OUTLET_ID]: outletId }
        }
      });

      await fastify.publishEvent({
        data: outletConfigResponse,
        event_info: {
          entity_type: "OUTLET_CONFIG",
          event_type: eventType,
          outlet_id: outletConfigResponse.outlet_id,
          topic_name: fastify.config.POINT_OF_SALE_EVENT_TOPIC
        },
        logTrace
      });
    } catch (error) {
      fastify.log.error({
        message: "Error While Raising Event For Outlet Config",
        error,
        log_trace: logTrace
      });
    }
  };
}

module.exports = emitOutletConfigEventService;
