const { StatusCodes } = require("http-status-codes");
const { postOutletMacVersionDeploymentStatusService } = require("../services");

function postOutletMacVersionDeploymentStatusHandler(fastify) {
  const postOutletMacVersionDeploymentStatus = postOutletMacVersionDeploymentStatusService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await postOutletMacVersionDeploymentStatus({ input: body });
    return reply.code(StatusCodes.OK).send(response);
  };
}

module.exports = postOutletMacVersionDeploymentStatusHandler;
