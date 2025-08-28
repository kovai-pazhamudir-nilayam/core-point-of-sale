const { FEATURE_CONFIGURATION_EVENT_TYPES } = require("../commons/constants");
const { mapInputRequest } = require("../mapper/feature-config");
const { FeatureConfigurationRepo } = require("../repository/feature-configuration");
const emitFeatureConfigurationEventService = require("./feature-configuration-event");

function postFeatureConfigurationService(fastify) {
  const { createFeatureConfiguration } = FeatureConfigurationRepo();
  const emitFeatureConfigurationEvent = emitFeatureConfigurationEventService(fastify);

  return async ({ input, logTrace }) => {
    const modifiedInput = mapInputRequest({ input });

    const repoResponse = await createFeatureConfiguration.call(fastify.knex, {
      input: modifiedInput
    });

    const featureConfigurationIds = repoResponse.map(ele => ele.feature_configuration_id);

    featureConfigurationIds.forEach(feature_configuration_id => {
      emitFeatureConfigurationEvent({
        feature_configuration_id,
        event_type: FEATURE_CONFIGURATION_EVENT_TYPES.FEATURE_CONFIGURATION_UPDATED,
        logTrace
      });
    });

    return repoResponse;
  };
}
module.exports = postFeatureConfigurationService;
