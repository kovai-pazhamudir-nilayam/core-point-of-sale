const schemas = require("../schemas");
const OutletMacVersionHandler = require("../handlers");

module.exports = async fastify => {
  const { postOutletMacVersion, fetchOutletMacVersion, fetchAllOutletDeploymentVersions } =
    OutletMacVersionHandler;

  fastify.route({
    method: "POST",
    url: "/outlet-mac-version",
    schema: schemas.postOutletMacVersion,
    handler: postOutletMacVersion(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/outlet-mac-version/fetch",
    schema: schemas.fetchOutletMacVersion,
    handler: fetchOutletMacVersion(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/outlet-mac-version/deployment/fetch",
    schema: schemas.fetchAllOutletDeploymentVersions,
    handler: fetchAllOutletDeploymentVersions(fastify)
  });
};
