const schemas = require("../schemas");
const OutletConfigHandler = require("../handlers");

module.exports = async fastify => {
  const { getOutletConfig, postOutletConfig, postOutletConfigBulkEvents } = OutletConfigHandler;

  fastify.route({
    method: "POST",
    url: "/",
    schema: schemas.postOutletConfig,
    handler: postOutletConfig(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: schemas.getOutletConfig,
    handler: getOutletConfig(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/bulk-events",
    schema: schemas.postOutletConfigBulkEvents,
    handler: postOutletConfigBulkEvents(fastify)
  });
};
