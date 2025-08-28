const { postFeatureConfigurationService } = require("../services");

function postFeatureConfigurationHandler(fastify) {
  const postFeatureConfiguration = postFeatureConfigurationService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await postFeatureConfiguration({ input: body });
    return reply.code(200).send(response);
  };
}

module.exports = postFeatureConfigurationHandler;
