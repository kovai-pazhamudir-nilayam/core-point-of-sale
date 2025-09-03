const { getOutletDeviceService } = require("../services");

function getOutletDeviceHandler(fastify) {
  const getOutletDevice = getOutletDeviceService(fastify);

  return async (request, reply) => {
    const { query } = request;

    const response = await getOutletDevice({ query });

    return reply.code(200).send(response);
  };
}

module.exports = getOutletDeviceHandler;
