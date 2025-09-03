const { OK } = require("http-status-codes").StatusCodes;
const { outletDeviceBulkEventsService } = require("../services");

function postOutletDeviceBulkEventsHandler(fastify) {
  const postOutletDeviceBulkEvents = outletDeviceBulkEventsService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postOutletDeviceBulkEvents({ input: body });
    return reply.code(OK).send(response);
  };
}

module.exports = postOutletDeviceBulkEventsHandler;
