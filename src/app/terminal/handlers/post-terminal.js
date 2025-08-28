const { OK } = require("http-status-codes").StatusCodes;
const { postTerminalService } = require("../services");

function postTerminalHandler(fastify) {
  const postTerminal = postTerminalService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postTerminal({ input: body });
    return reply.code(OK).send(response);
  };
}

module.exports = postTerminalHandler;
