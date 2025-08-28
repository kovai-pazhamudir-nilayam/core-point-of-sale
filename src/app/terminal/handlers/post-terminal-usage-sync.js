const { OK } = require("http-status-codes").StatusCodes;
const postTerminalUsageSyncService = require("../services/post-terminal-usage-sync");

function postTerminalUsageSyncHandler(fastify) {
  const postTerminalUsageSync = postTerminalUsageSyncService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await postTerminalUsageSync({ input: body });
    return reply.code(OK).send(response);
  };
}

module.exports = postTerminalUsageSyncHandler;
