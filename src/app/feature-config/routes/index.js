const FeatureConfigurationRoutes = require("./feature-configuration");

module.exports = async fastify => {
  fastify.register(FeatureConfigurationRoutes, { prefix: "" });
};
