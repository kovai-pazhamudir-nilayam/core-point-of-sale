const { StatusCodes } = require("http-status-codes");
const { postOutletMacVersionRollbackService } = require("../services");

function postOutletMacVersionRollbackHandler(fastify) {
  const postOutletMacVersionRollback = postOutletMacVersionRollbackService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await postOutletMacVersionRollback({ input: body });
    return reply.code(StatusCodes.OK).send(response);
  };
}

module.exports = postOutletMacVersionRollbackHandler;
