const { getTerminalRegisterByTerminalIdService } = require("../services");

function getTerminalRegisterByTerminalIdHandler(fastify) {
  const getTerminalByRegisterIdRegister = getTerminalRegisterByTerminalIdService(fastify);

  return async (request, reply) => {
    const { headers, params, query, body } = request;
    const input = {
      ...body,
      ...query,
      ...params,
      channel: headers["x-channel-id"],
      device_id: headers["x-app-id"]
    };
    const response = await getTerminalByRegisterIdRegister({ input });
    return reply.code(200).send(response);
  };
}

module.exports = getTerminalRegisterByTerminalIdHandler;
