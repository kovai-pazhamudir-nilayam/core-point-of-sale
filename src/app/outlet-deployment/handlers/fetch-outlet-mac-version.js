const { fetchOutletMacVersionService } = require("../services");

function fetchOutletMacVersionHandler(fastify) {
  const fetchOutletMacVersion = fetchOutletMacVersionService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await fetchOutletMacVersion({ input: body });
    return reply.code(200).send(response);
  };
}

module.exports = fetchOutletMacVersionHandler;
