const { OutletConfigRepo } = require("../../outlet-config/repository/outlet-config");
const { logger } = require("../../utils/logger");
const { DenominationConfigRepo } = require("../repository/denomination-config");

function emitDenominationConfigEventService(fastify) {
  const { getDenominationConfig } = DenominationConfigRepo();
  const { getOutletConfig } = OutletConfigRepo();
  return async ({ outlet_ids, eventType }) => {
    try {
      const denominationConfig = await getDenominationConfig.call(fastify.knex, {});
      const outlets = await getOutletConfig.call(fastify.knex, { fieldsToReturn: ["outlet_id"] });

      const outletsIds = outlet_ids ?? outlets;

      await Promise.all(
        outletsIds.map(async outlet => {
          const outletId = outlet?.outlet_id || outlet;
          const eventPayload = { outlet_id: outletId, data: denominationConfig };
          await fastify.publishEvent({
            data: eventPayload,
            event_info: {
              entity_type: "DENOMINATION",
              event_type: eventType,
              outlet_id: outletId,
              topic_name: fastify.config.POINT_OF_SALE_EVENT_TOPIC
            }
          });
        })
      );
    } catch (error) {
      logger.error({
        message: "Error While Raising Event For Denomination Config",
        error
      });
    }
  };
}

module.exports = { emitDenominationConfigEventService };
