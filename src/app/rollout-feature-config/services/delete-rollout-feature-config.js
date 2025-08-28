const _ = require("lodash");
const { ROLLOUT_FEATURE_CONFIG_EVENT_TYPES, SUCCESS_RESPONSE } = require("../commons/constants");
const { RolloutFeatureConfigRepo } = require("../repository/rollout-feature-config");
const { emitRolloutFeatureConfigEventService } = require("./rollout-feature-config-event");
const errors = require("../../errorHandler/domain/errors");

function deleteRolloutFeatureConfigService(fastify) {
  const { getRolloutFeatureConfig, deleteRolloutFeatureConfig } = RolloutFeatureConfigRepo();
  const emitRolloutFeatureConfigEvent = emitRolloutFeatureConfigEventService(fastify);

  return async ({ input }) => {
    const { rollout_feature_config_id } = input;
    const rolloutFeatureConfigsResponse = await getRolloutFeatureConfig.call(fastify.knex, {
      filters: { where: { rollout_feature_config_id } }
    });

    if (_.isEmpty(rolloutFeatureConfigsResponse)) {
      throw errors.RolloutFeatureConfigNotFoundError({ rollout_feature_config_id });
    }

    await deleteRolloutFeatureConfig.call(fastify.knex, {
      filters: { where: { rollout_feature_config_id } }
    });

    emitRolloutFeatureConfigEvent({
      outletId: rolloutFeatureConfigsResponse.outlet_id,
      eventType: ROLLOUT_FEATURE_CONFIG_EVENT_TYPES.ROLLOUT_FEATURE_CONFIG_EVENT_TYPES_UPDATED
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = deleteRolloutFeatureConfigService;
