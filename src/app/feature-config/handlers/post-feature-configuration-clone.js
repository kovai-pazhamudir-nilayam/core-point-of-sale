const { postFeatureConfigurationCloneService } = require("../services");

function postFeatureConfigurationCloneHandler(fastify) {
  const postFeatureConfigurationClone = postFeatureConfigurationCloneService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postFeatureConfigurationClone({ input: body });
    return reply.code(200).send(response);
  };
}

module.exports = postFeatureConfigurationCloneHandler;
