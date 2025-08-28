const { getRolloutFeatureConfigService } = require("../services");

function getRolloutFeatureConfigHandler(fastify) {
  const getRolloutFeatureConfig = getRolloutFeatureConfigService(fastify);

  return async (request, reply) => {
    const { headers, params, query } = request;
    const input = {
      ...query,
      ...params,
      channel: headers["x-channel-id"],
      device_id: headers["x-app-id"]
    };
    const response = await getRolloutFeatureConfig({ input });
    return reply.code(200).send(response);
  };
}

module.exports = getRolloutFeatureConfigHandler;
