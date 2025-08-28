const { OK } = require("http-status-codes").StatusCodes;
const postTerminalRegisterSyncService = require("../services/post-terminal-register-sync");

function postTerminalRegisterSyncHandler(fastify) {
  const postTerminalRegisterSync = postTerminalRegisterSyncService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postTerminalRegisterSync({ input: body });
    return reply.code(OK).send(response);
  };
}

module.exports = postTerminalRegisterSyncHandler;
