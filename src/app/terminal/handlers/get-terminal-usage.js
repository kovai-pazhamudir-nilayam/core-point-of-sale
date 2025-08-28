const { getTerminalUsageService } = require("../services");

function getTerminalUsageHandler(fastify) {
  const getTerminalUsage = getTerminalUsageService(fastify);

  return async (request, reply) => {
    const { query } = request;

    const response = await getTerminalUsage({ query });
    return reply.code(200).send(response);
  };
}

module.exports = getTerminalUsageHandler;
