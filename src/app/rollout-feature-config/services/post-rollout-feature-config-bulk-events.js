const { SUCCESS_RESPONSE, ROLLOUT_FEATURE_CONFIG_EVENT_TYPES } = require("../commons/constants");
const { emitRolloutFeatureConfigEventService } = require("./rollout-feature-config-event");

function rolloutFeatureConfigBulkEventsService(fastify) {
  return async ({ body }) => {
    const emitrolloutFeatureConfigEvent = emitRolloutFeatureConfigEventService(fastify);

    const { outlet_ids } = body;

    outlet_ids.forEach(outlet_id => {
      emitrolloutFeatureConfigEvent({
        eventType: ROLLOUT_FEATURE_CONFIG_EVENT_TYPES.ROLLOUT_FEATURE_CONFIG_BULK_DATA_UPDATED,
        outletId: outlet_id
      });
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = rolloutFeatureConfigBulkEventsService;
