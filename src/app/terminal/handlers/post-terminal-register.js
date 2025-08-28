const { OK } = require("http-status-codes").StatusCodes;
const { postTerminalRegisterService } = require("../services");

function postTerminalRegisterHandler(fastify) {
  const postTerminalRegister = postTerminalRegisterService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postTerminalRegister({ input: body });
    return reply.code(OK).send(response);
  };
}

module.exports = postTerminalRegisterHandler;
