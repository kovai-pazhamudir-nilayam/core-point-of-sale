const schemas = require("../schemas");
const FeatureConfigurationHandler = require("../handlers");

module.exports = async fastify => {
  const {
    getFeatureConfigurationHandler,
    postFeatureConfigurationHandler,
    getFeatureConfigurationByIdHandler,
    postFeatureConfigurationBulkEventsHandler,
    postFeatureConfigurationCloneHandler
  } = FeatureConfigurationHandler;

  fastify.route({
    method: "GET",
    url: "/feature-configuration",
    schema: schemas.getFeatureConfiguration,
    handler: getFeatureConfigurationHandler(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/feature-configuration/:feature_configuration_id",
    schema: schemas.getFeatureConfigurationById,
    handler: getFeatureConfigurationByIdHandler(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/feature-configuration",
    schema: schemas.postFeatureConfiguration,
    handler: postFeatureConfigurationHandler(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/feature-configuration/bulk-events",
    schema: schemas.postFeatureConfigurationBulkEvents,
    handler: postFeatureConfigurationBulkEventsHandler(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/feature-configuration/clone",
    schema: schemas.postFeatureConfigurationClone,
    handler: postFeatureConfigurationCloneHandler(fastify)
  });
};
