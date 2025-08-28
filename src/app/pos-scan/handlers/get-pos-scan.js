const { getPosScanService } = require("../services");

function getPosScanHandler(fastify) {
  const getPosScan = getPosScanService(fastify);

  return async (request, reply) => {
    const { query } = request;

    const response = await getPosScan({ query });
    return reply.code(200).send(response);
  };
}

module.exports = getPosScanHandler;
