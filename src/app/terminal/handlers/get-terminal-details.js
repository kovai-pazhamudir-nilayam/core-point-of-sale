const { getTerminalDetailsService } = require("../services");

function getTerminalDetailsHandler(fastify) {
  const getTerminalDetails = getTerminalDetailsService(fastify);

  return async (request, reply) => {
    const { params } = request;

    const response = await getTerminalDetails({ params });
    return reply.code(200).send(response);
  };
}

module.exports = getTerminalDetailsHandler;
