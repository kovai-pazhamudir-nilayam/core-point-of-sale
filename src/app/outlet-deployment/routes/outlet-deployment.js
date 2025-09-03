const schemas = require("../schemas");
const OutletMacVersionHandler = require("../handlers");

module.exports = async fastify => {
  const {
    postOutletMacVersion,
    postOutletMacVersionBulk,
    postOutletMacVersionDeploymentStatus,
    fetchOutletMacVersion,
    fetchAllOutletDeploymentVersions,
    postFetchOutletMacVersionHistory,
    postOutletMacVersionRollback
  } = OutletMacVersionHandler;

  fastify.route({
    method: "POST",
    url: "/outlet-mac-version",
    schema: schemas.postOutletMacVersion,
    handler: postOutletMacVersion(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/outlet-mac-version/deployment/bulk",
    schema: schemas.postOutletMacVersionBulk,
    handler: postOutletMacVersionBulk(fastify)
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

  fastify.route({
    method: "POST",
    url: "/outlet-mac-version/deployment/status",
    schema: schemas.postOutletMacVersionDeploymentStatus,
    handler: postOutletMacVersionDeploymentStatus(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/outlet-mac-version/deployment/rollback",
    schema: schemas.postOutletMacVersionRollback,
    handler: postOutletMacVersionRollback(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/outlet-mac-version/deployment/history/fetch",
    schema: schemas.postFetchOutletMacVersionHistory,
    handler: postFetchOutletMacVersionHistory(fastify)
  });
};
