const schemas = require("../schemas");
const {
  postRolloutFeatureConfig,
  getRolloutFeatureConfig,
  deleteRolloutFeatureConfig,
  rolloutFeatureConfigBulkEvents
} = require("../handlers");

module.exports = async fastify => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: schemas.postRolloutFeatureConfig,
    handler: postRolloutFeatureConfig(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/bulk-events",
    schema: schemas.rolloutFeatureConfigBulkEvents,
    handler: rolloutFeatureConfigBulkEvents(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: schemas.getRolloutFeatureConfig,
    handler: getRolloutFeatureConfig(fastify)
  });

  fastify.route({
    method: "DELETE",
    url: "/:rollout_feature_config_id",
    schema: schemas.deleteRolloutFeatureConfig,
    handler: deleteRolloutFeatureConfig(fastify)
  });
};
