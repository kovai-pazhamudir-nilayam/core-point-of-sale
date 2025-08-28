const { getOutletConfigService } = require("../services");

function getOutletConfigHandler(fastify) {
  const getOutletConfig = getOutletConfigService(fastify);

  return async (request, reply) => {
    const { query } = request;

    const response = await getOutletConfig({ query });

    return reply.code(200).send(response);
  };
}

module.exports = getOutletConfigHandler;
