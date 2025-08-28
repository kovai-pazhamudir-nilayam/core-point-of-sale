const { getTerminalRegisterDayendListService } = require("../services");

function getTerminalRegisterDayendListHandler(fastify) {
  const getTerminalRegisterDayendList = getTerminalRegisterDayendListService(fastify);

  return async (request, reply) => {
    const { headers, params, query, body } = request;
    const input = {
      ...body,
      ...query,
      ...params,
      channel: headers["x-channel-id"],
      device_id: headers["x-app-id"]
    };
    const response = await getTerminalRegisterDayendList({ input });
    return reply.code(200).send(response);
  };
}

module.exports = getTerminalRegisterDayendListHandler;
