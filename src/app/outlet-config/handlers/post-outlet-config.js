const { OK } = require("http-status-codes").StatusCodes;
const { postOutletConfigService } = require("../services");

function postOutletConfigHandler(fastify) {
  const postOutletConfig = postOutletConfigService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postOutletConfig({ body });
    return reply.code(OK).send(response);
  };
}

module.exports = postOutletConfigHandler;
