const { postPosModeService } = require("../services");

function postPosModeHandler(fastify) {
  const postPosMode = postPosModeService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await postPosMode({ body });
    return reply.code(201).send(response);
  };
}

module.exports = postPosModeHandler;
