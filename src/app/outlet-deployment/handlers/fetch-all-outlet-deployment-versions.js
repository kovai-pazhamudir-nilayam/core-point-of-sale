const { fetchAllOutletDeploymentVersionsService } = require("../services");

function fetchAllOutletDeploymentVersionsHandler(fastify) {
  const fetchAllOutletDeploymentVersions = fetchAllOutletDeploymentVersionsService(fastify);

  return async (request, reply) => {
    const { body } = request;

    const response = await fetchAllOutletDeploymentVersions({ input: body });
    return reply.code(200).send(response);
  };
}

module.exports = fetchAllOutletDeploymentVersionsHandler;
