const { deleteOutletDeviceService } = require("../services");

function deleteOutletDeviceHandler(fastify) {
  const deleteOutletDevice = deleteOutletDeviceService(fastify);

  return async (request, reply) => {
    const { params } = request;

    const response = await deleteOutletDevice({ params });

    return reply.code(200).send(response);
  };
}

module.exports = deleteOutletDeviceHandler;
