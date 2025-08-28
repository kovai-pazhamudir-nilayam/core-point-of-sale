const { postTerminalRegisterReconFetchService } = require("../services");

function postTerminalRegisterReconFetchHandler(fastify) {
  const postTerminalRegisterReconFetch = postTerminalRegisterReconFetchService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await postTerminalRegisterReconFetch({ body });
    return reply.code(200).send(response);
  };
}

module.exports = postTerminalRegisterReconFetchHandler;
