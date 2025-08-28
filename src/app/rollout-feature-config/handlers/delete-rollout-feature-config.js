const { deleteRolloutFeatureConfigService } = require("../services");

function deleteRolloutFeatureConfigHandler(fastify) {
  const deleteRolloutFeatureConfig = deleteRolloutFeatureConfigService(fastify);

  return async (request, reply) => {
    const { headers, params } = request;
    const input = {
      ...params,
      channel: headers["x-channel-id"],
      device_id: headers["x-app-id"]
    };
    const response = await deleteRolloutFeatureConfig({ input });
    return reply.code(200).send(response);
  };
}

module.exports = deleteRolloutFeatureConfigHandler;
