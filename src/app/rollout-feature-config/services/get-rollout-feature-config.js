const { RolloutFeatureConfigRepo } = require("../repository/rollout-feature-config");
const { transformRolloutFeatureConfigs } = require("../transformers/rollout-feature-config");

function getRolloutFeatureConfigService(fastify) {
  const { getRolloutFeatureConfigs } = RolloutFeatureConfigRepo();

  return async () => {
    const rolloutFeatureConfigs = await getRolloutFeatureConfigs.call(fastify.knex, {});
    const transformedRolloutFeatureConfigs = transformRolloutFeatureConfigs({
      rolloutFeatureConfigs
    });

    return transformedRolloutFeatureConfigs;
  };
}
module.exports = getRolloutFeatureConfigService;
