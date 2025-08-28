const { FeatureConfigurationRepo } = require("../repository/feature-configuration");

function getFeatureConfigurationByIdService(fastify) {
  const { getFeatureConfigurations } = FeatureConfigurationRepo();

  return async ({ input }) => {
    const { feature_configuration_id } = input;
    const filters = { where: { feature_configuration_id } };

    const repoResponse = await getFeatureConfigurations.call(fastify.knex, { filters });
    return repoResponse[0];
  };
}
module.exports = getFeatureConfigurationByIdService;
