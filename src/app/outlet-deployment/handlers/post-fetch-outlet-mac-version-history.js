const { StatusCodes } = require("http-status-codes");

const { postFetchOutletMacVersionHistoryService } = require("../services");

function postFetchOutletMacVersionHistoryHandler(fastify) {
  const postFetchOutletMacVersionHistory = postFetchOutletMacVersionHistoryService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postFetchOutletMacVersionHistory({ input: body });
    return reply.code(StatusCodes.OK).send(response);
  };
}

module.exports = postFetchOutletMacVersionHistoryHandler;
