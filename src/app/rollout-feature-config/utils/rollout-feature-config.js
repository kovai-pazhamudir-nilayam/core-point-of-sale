const _ = require("lodash");
const { RolloutFeatureConfigRepo } = require("../repository/rollout-feature-config");

const fetchRolloutFeatureConfig = async ({ fastify, outlet_id, terminal_id }) => {
  const { getRolloutFeatureConfigs } = RolloutFeatureConfigRepo();

  const featureConfigs = await getRolloutFeatureConfigs.call(fastify.knex, {
    filters: { where: { outlet_id } }
  });

  const rolloutConfigs = featureConfigs.reduce((acc, config) => {
    const { feature_name, is_active, terminal_ids } = config;
    const isActive = is_active && (_.isEmpty(terminal_ids) || terminal_ids?.includes(terminal_id));
    acc[feature_name] = isActive;
    return acc;
  }, {});

  return rolloutConfigs;
};

module.exports = { fetchRolloutFeatureConfig };
