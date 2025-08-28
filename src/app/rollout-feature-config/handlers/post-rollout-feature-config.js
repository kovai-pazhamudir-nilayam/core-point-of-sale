const { OK } = require("http-status-codes").StatusCodes;
const { postRolloutFeatureConfigService } = require("../services");

function postRolloutFeatureConfigHandler(fastify) {
  const postRolloutFeatureConfig = postRolloutFeatureConfigService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postRolloutFeatureConfig({ input: body });
    return reply.code(OK).send(response);
  };
}

module.exports = postRolloutFeatureConfigHandler;
