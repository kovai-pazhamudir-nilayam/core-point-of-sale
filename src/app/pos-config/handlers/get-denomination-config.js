const { OK } = require("http-status-codes").StatusCodes;
const { getDenominationConfigService } = require("../services");

function getDenominationConfigHandler(fastify) {
  const getDenominationConfig = getDenominationConfigService(fastify);

  return async (request, reply) => {
    const { query } = request;
    const response = await getDenominationConfig({ query });
    return reply.code(OK).send(response);
  };
}

module.exports = getDenominationConfigHandler;
