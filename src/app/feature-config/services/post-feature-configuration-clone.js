const { SUCCESS_RESPONSE } = require("../commons/constants");
const { FeatureConfigurationRepo } = require("../repository/feature-configuration");
const postFeatureConfigurationService = require("./post-feature-configuration");

function postFeatureConfigurationCloneService(fastify) {
  const { getFeatureConfigurations } = FeatureConfigurationRepo();
  const postFeatureConfiguration = postFeatureConfigurationService(fastify);

  return async ({ input }) => {
    const { from_outlet, to_outlet, audit } = input;
    const filters = { where: { outlet_id: from_outlet } };

    const featureConfigs = await getFeatureConfigurations.call(fastify.knex, { filters });

    const createFeatureConfigPayload = featureConfigs.map(
      ({ feature_group, feature, execution_mode, fallback_mode }) => {
        return {
          feature_group,
          feature,
          execution_mode,
          fallback_mode,
          outlet_id: to_outlet,
          audit
        };
      }
    );

    await postFeatureConfiguration({
      input: createFeatureConfigPayload
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = postFeatureConfigurationCloneService;
