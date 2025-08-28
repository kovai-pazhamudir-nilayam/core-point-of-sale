const { logger } = require("../../utils/logger");
const {
  RolloutFeatureConfigRepo,
  ROLLOUT_FEATURE_CONFIG
} = require("../repository/rollout-feature-config");

function emitRolloutFeatureConfigEventService(fastify) {
  const { getRolloutFeatureConfigs } = RolloutFeatureConfigRepo();

  return async ({ outletId, eventType }) => {
    try {
      const rolloutFeatureConfigsResponse = await getRolloutFeatureConfigs.call(fastify.knex, {
        filters: { where: { [ROLLOUT_FEATURE_CONFIG.COLUMNS.OUTLET_ID]: outletId } }
      });

      const payload = { outlet_id: outletId, data: rolloutFeatureConfigsResponse };

      await fastify.publishEvent({
        data: payload,
        event_info: {
          entity_type: "ROLLOUT_FEATURE_CONFIG",
          event_type: eventType,
          topic_name: fastify.config.POINT_OF_SALE_EVENT_TOPIC,
          outlet_id: outletId
        }
      });
    } catch (error) {
      logger.error({
        message: "Error While Raising Event For Rollout feature config",
        error
      });
    }
  };
}

module.exports = { emitRolloutFeatureConfigEventService };
