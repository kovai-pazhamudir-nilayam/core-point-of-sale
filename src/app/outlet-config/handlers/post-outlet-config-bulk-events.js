const { OK } = require("http-status-codes").StatusCodes;
const { postOutletConfigBulkEventsService } = require("../services");

function postOutletConfigBulkEventsHandler(fastify) {
  const postOutletConfigBulkEvents = postOutletConfigBulkEventsService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postOutletConfigBulkEvents({ input: body });
    return reply.code(OK).send(response);
  };
}

module.exports = postOutletConfigBulkEventsHandler;
