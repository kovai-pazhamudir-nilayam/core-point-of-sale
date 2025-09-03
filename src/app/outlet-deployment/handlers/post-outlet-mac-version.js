const { StatusCodes } = require("http-status-codes");
const { postOutletMacVersionService } = require("../services");

function postOutletMacVersionHandler(fastify) {
  const postOutletMacVersion = postOutletMacVersionService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await postOutletMacVersion({ input: body });
    return reply.code(StatusCodes.CREATED).send(response);
  };
}

module.exports = postOutletMacVersionHandler;
