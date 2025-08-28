const { OK } = require("http-status-codes").StatusCodes;
const { postDenominationConfigService } = require("../services");

function postDenominationConfigHandler(fastify) {
  const postDenominationConfig = postDenominationConfigService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await postDenominationConfig({ body });
    return reply.code(OK).send(response);
  };
}

module.exports = postDenominationConfigHandler;
