const { getTerminalService } = require("../services");

function getTerminalHandler(fastify) {
  const getTerminal = getTerminalService(fastify);

  return async (request, reply) => {
    const { query } = request;

    const response = await getTerminal({ query });
    return reply.code(200).send(response);
  };
}

module.exports = getTerminalHandler;
