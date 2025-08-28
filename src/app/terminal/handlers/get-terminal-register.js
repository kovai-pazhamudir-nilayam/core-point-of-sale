const { getTerminalRegisterService } = require("../services");

function getTerminalRegisterHandler(fastify) {
  const getTerminalRegister = getTerminalRegisterService(fastify);

  return async (request, reply) => {
    const { query } = request;

    const response = await getTerminalRegister({ query });
    return reply.code(200).send(response);
  };
}

module.exports = getTerminalRegisterHandler;
