const { getFeatureConfigurationByIdService } = require("../services");

function getFeatureConfigurationByIdHandler(fastify) {
  const getFeatureConfigurationById = getFeatureConfigurationByIdService(fastify);

  return async (request, reply) => {
    const { params } = request;
    const input = { ...params };
    const response = await getFeatureConfigurationById({ input });
    return reply.code(200).send(response);
  };
}

module.exports = getFeatureConfigurationByIdHandler;
