const { getTerminalTransactionService } = require("../services");

function getTerminalTransactionHandler(fastify) {
  const getTerminalTransaction = getTerminalTransactionService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await getTerminalTransaction({ body });
    return reply.code(200).send(response);
  };
}

module.exports = getTerminalTransactionHandler;
