const { OK } = require("http-status-codes").StatusCodes;
const { postFeatureConfigurationBulkEventsService } = require("../services");

function postFeatureConfigurationBulkEventsHandler(fastify) {
  const postFeatureConfigurationBulkEvents = postFeatureConfigurationBulkEventsService(fastify);

  return async (request, reply) => {
    const { body } = request;
    const response = await postFeatureConfigurationBulkEvents({ input: body });
    return reply.code(OK).send(response);
  };
}

module.exports = postFeatureConfigurationBulkEventsHandler;
