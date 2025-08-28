const { postTerminalStatusService } = require("../services");

function postTerminalStatusHandler(fastify) {
  const postTerminalStatus = postTerminalStatusService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await postTerminalStatus({ body });
    return reply.code(201).send(response);
  };
}

module.exports = postTerminalStatusHandler;
