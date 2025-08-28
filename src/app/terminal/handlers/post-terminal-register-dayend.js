const { OK } = require("http-status-codes").StatusCodes;
const { postTerminalRegisterDayendService } = require("../services");

function postTerminalRegisterDayendHandler(fastify) {
  const postTerminalRegisterDayend = postTerminalRegisterDayendService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postTerminalRegisterDayend({ input: body });
    return reply.code(OK).send(response);
  };
}

module.exports = postTerminalRegisterDayendHandler;
