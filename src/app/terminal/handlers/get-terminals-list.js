const { getTerminalsListService } = require("../services");

function getTerminalsListHandler(fastify) {
  const getTerminalsList = getTerminalsListService(fastify);

  return async (request, reply) => {
    const { query } = request;

    const response = await getTerminalsList({ query });
    return reply.code(200).send(response);
  };
}

module.exports = getTerminalsListHandler;
