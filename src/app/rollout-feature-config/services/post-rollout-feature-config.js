const { ROLLOUT_FEATURE_CONFIG_EVENT_TYPES } = require("../commons/constants");
const { updatedAudit, newAudit } = require("../mappers/audit-mapper");
const { RolloutFeatureConfigRepo } = require("../repository/rollout-feature-config");
const { emitRolloutFeatureConfigEventService } = require("./rollout-feature-config-event");

function postRolloutFeatureConfigService(fastify) {
  const { createRolloutFeatureConfig } = RolloutFeatureConfigRepo();
  const emitRolloutFeatureConfigEvent = emitRolloutFeatureConfigEventService(fastify);

  return async ({ input }) => {
    const { audit, terminal_ids, outlet_id, ...rest } = input;

    const modifiedAudit = updatedAudit({ updatedBy: audit.submitted_by });
    const createdAudit = newAudit({ createdBy: audit.submitted_by });
    const rolloutFeatureConfigPayload = {
      terminal_ids: JSON.stringify(terminal_ids),
      outlet_id,
      ...rest
    };
    const [rolloutFeatureConfig] = await createRolloutFeatureConfig.call(fastify.knex, {
      input: { rolloutFeatureConfigPayload, modifiedAudit, createdAudit }
    });

    emitRolloutFeatureConfigEvent({
      outletId: outlet_id,
      eventType: ROLLOUT_FEATURE_CONFIG_EVENT_TYPES.ROLLOUT_FEATURE_CONFIG_EVENT_TYPES_UPDATED
    });

    return {
      rollout_feature_config_id: rolloutFeatureConfig.rollout_feature_config_id
    };
  };
}
module.exports = postRolloutFeatureConfigService;
