const { FeatureConfigurationRepo } = require("../repository/feature-configuration");

function emitFeatureConfigurationEventService(fastify) {
  const { getFeatureConfigurations } = FeatureConfigurationRepo(fastify);

  return async ({ feature_configuration_id, event_type, logTrace }) => {
    try {
      const featureConfigurationResponse = await getFeatureConfigurations.call(fastify.knex, {
        filters: { where: { feature_configuration_id } }
      });

      await fastify.publishEvent({
        data: featureConfigurationResponse[0],
        event_info: {
          entity_type: "FEATURE_CONFIGURATION", // [TODO]
          event_type,
          topic_name: fastify.config.POINT_OF_SALE_EVENT_TOPIC,
          outlet_id: featureConfigurationResponse[0].outlet_id
        },
        logTrace
      });
    } catch (error) {
      fastify.log.error({
        message: "Error While Raising Event For Feature Configuration",
        error,
        log_trace: logTrace
      });
    }
  };
}
module.exports = emitFeatureConfigurationEventService;
