const { OutletMacVersionRepo } = require("../repository/outlet_mac-version");

function fetchAllOutletDeploymentVersionsService(fastify) {
  const { getOutletMacVersion } = OutletMacVersionRepo();

  return async ({ input }) => {
    const allOutletDeploymentVersions = await getOutletMacVersion.call(fastify.knex, {
      filters: { where: { ...input } }
    });

    return allOutletDeploymentVersions;
  };
}
module.exports = fetchAllOutletDeploymentVersionsService;
