const { StatusCodes } = require("http-status-codes");

const { postOutletMacVersionBulkService } = require("../services");

function postOutletMacVersionBulk(fastify) {
  return async (request, reply) => {
    const service = postOutletMacVersionBulkService(fastify);
    const response = await service({ input: request.body });
    reply.code(StatusCodes.OK).send(response);
  };
}

module.exports = postOutletMacVersionBulk;
