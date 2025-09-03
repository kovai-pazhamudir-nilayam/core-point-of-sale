const { OK } = require("http-status-codes").StatusCodes;
const { postOutletDeviceService } = require("../services");

function postOutletDeviceHandler(fastify) {
  const postOutletDevice = postOutletDeviceService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postOutletDevice({ body });
    return reply.code(OK).send(response);
  };
}

module.exports = postOutletDeviceHandler;
