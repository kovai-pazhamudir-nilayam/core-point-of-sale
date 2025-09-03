const { OK } = require("http-status-codes").StatusCodes;
const { rolloutFeatureConfigBulkEventsService } = require("../services");

function rolloutFeatureConfigBulkEventsHandler(fastify) {
  const rolloutFeatureConfigBulkEvents = rolloutFeatureConfigBulkEventsService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await rolloutFeatureConfigBulkEvents({ body });
    return reply.code(OK).send(response);
  };
}

module.exports = rolloutFeatureConfigBulkEventsHandler;
