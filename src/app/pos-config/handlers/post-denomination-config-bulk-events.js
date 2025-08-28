const { OK } = require("http-status-codes").StatusCodes;
const { denominationConfigBulkEventsService } = require("../services");

function denominationConfigBulkEventsHandler(fastify) {
  const denominationConfigBulkEvents = denominationConfigBulkEventsService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await denominationConfigBulkEvents({ body });
    return reply.code(OK).send(response);
  };
}

module.exports = denominationConfigBulkEventsHandler;
