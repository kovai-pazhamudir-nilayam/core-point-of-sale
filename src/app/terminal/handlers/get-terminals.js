const { getTerminalsService } = require("../services");

function getTerminalsHandler(fastify) {
  const getTerminals = getTerminalsService(fastify);

  return async (request, reply) => {
    const { query } = request;

    const response = await getTerminals({ query });
    return reply.code(200).send(response);
  };
}

module.exports = getTerminalsHandler;
