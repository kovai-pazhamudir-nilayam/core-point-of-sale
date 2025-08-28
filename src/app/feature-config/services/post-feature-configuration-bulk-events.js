const { FEATURE_CONFIGURATION_EVENT_TYPES, SUCCESS_RESPONSE } = require("../commons/constants");
const {
  FeatureConfigurationRepo,
  FEATURE_CONFIGURATION
} = require("../repository/feature-configuration");
const emitFeatureConfigurationEventService = require("./feature-configuration-event");

function postFeatureConfigurationBuklEventsService(fastify) {
  const { getFeatureConfigurations } = FeatureConfigurationRepo();
  const emitFeatureConfigurationEvent = emitFeatureConfigurationEventService(fastify);

  return async ({ input, logTrace }) => {
    const { outlet_ids } = input;

    const outletFilters = {
      columns: [FEATURE_CONFIGURATION.COLUMNS.OUTLET_ID],
      values: outlet_ids
    };

    const featureConfigs = await getFeatureConfigurations.call(fastify.knex, {
      filters: { whereIn: outletFilters }
    });

    const featureConfigurationIds = featureConfigs.map(ele => ele.feature_configuration_id);

    featureConfigurationIds.forEach(feature_configuration_id => {
      emitFeatureConfigurationEvent({
        feature_configuration_id,
        event_type: FEATURE_CONFIGURATION_EVENT_TYPES.FEATURE_CONFIGURATION_BULK_DATA_UPDATED,
        logTrace
      });
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = postFeatureConfigurationBuklEventsService;
