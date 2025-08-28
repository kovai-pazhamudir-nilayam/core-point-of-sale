const { getFeatureConfigurationService } = require("../services");

function getFeatureConfigurationHandler(fastify) {
  const getFeatureConfiguration = getFeatureConfigurationService(fastify);

  return async (request, reply) => {
    const { query } = request;
    const input = { ...query };
    const response = await getFeatureConfiguration({ input });
    return reply.code(200).send(response);
  };
}

module.exports = getFeatureConfigurationHandler;
