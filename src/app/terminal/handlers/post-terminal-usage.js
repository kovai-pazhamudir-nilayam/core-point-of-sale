const { postTerminalUsageService } = require("../services");

function postTerminalUsageHandler(fastify) {
  const postTerminalUsage = postTerminalUsageService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await postTerminalUsage({ input: body });
    return reply.code(201).send(response);
  };
}

module.exports = postTerminalUsageHandler;
