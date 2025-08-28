const RolloutFeatureConfig = require("./rollout-feature-config");

module.exports = async fastify => {
  fastify.register(RolloutFeatureConfig, { prefix: "/rollout-feature-config" });
};
