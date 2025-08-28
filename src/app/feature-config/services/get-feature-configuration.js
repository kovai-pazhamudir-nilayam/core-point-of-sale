const { FeatureConfigurationRepo } = require("../repository/feature-configuration");

function getFeatureConfigurationService(fastify) {
  const { getFeatureConfigurations } = FeatureConfigurationRepo();

  return async ({ input }) => {
    const { outlet_id } = input;
    const filters = { where: { outlet_id } };
    const repoResponse = await getFeatureConfigurations.call(fastify.knex, { filters });
    return repoResponse;
  };
}
module.exports = getFeatureConfigurationService;
