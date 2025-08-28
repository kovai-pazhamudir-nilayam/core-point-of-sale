const { postOutletMacVersionService } = require("../services");

function postOutletMacVersionHandler(fastify) {
  const postOutletMacVersion = postOutletMacVersionService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await postOutletMacVersion({ input: body });
    return reply.code(201).send(response);
  };
}

module.exports = postOutletMacVersionHandler;
