const { getPosModesService } = require("../services");

function getPosModesHandler(fastify) {
  const getPosModes = getPosModesService(fastify);

  return async (request, reply) => {
    const { query } = request;

    const response = await getPosModes({ query });
    return reply.code(200).send(response);
  };
}

module.exports = getPosModesHandler;
