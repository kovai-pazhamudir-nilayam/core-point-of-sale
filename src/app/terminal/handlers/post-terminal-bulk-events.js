const { OK } = require("http-status-codes").StatusCodes;
const postTerminalBuklEventsService = require("../services/post-terminal-bulk-events");

function postTerminalBulkEventsHandler(fastify) {
  const postTerminalBulkEvents = postTerminalBuklEventsService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postTerminalBulkEvents({ input: body });
    return reply.code(OK).send(response);
  };
}

module.exports = postTerminalBulkEventsHandler;
