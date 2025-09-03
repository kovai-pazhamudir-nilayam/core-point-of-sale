const postRolloutFeatureConfigService = require("./post-rollout-feature-config");
const getRolloutFeatureConfigService = require("./get-rollout-feature-config");
const deleteRolloutFeatureConfigService = require("./delete-rollout-feature-config");
const rolloutFeatureConfigBulkEventsService = require("./post-rollout-feature-config-bulk-events");

module.exports = {
  postRolloutFeatureConfigService,
  getRolloutFeatureConfigService,
  deleteRolloutFeatureConfigService,
  rolloutFeatureConfigBulkEventsService
};
