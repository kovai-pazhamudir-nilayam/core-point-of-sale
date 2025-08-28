const schemas = require("../schemas");
const DenominationConfigHandler = require("../handlers");

module.exports = async fastify => {
  const {
    postDenominationConfigHandler,
    getDenominationConfigHandler,
    denominationConfigBulkEventsHandler
  } = DenominationConfigHandler;

  fastify.route({
    method: "POST",
    url: "/denomination-config",
    schema: schemas.postDenominationConfig,
    handler: postDenominationConfigHandler(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/denomination-config",
    schema: schemas.getDenominationConfig,
    handler: getDenominationConfigHandler(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/denomination-config/bulk-events",
    schema: schemas.denominationConfigBulkEvents,
    handler: denominationConfigBulkEventsHandler(fastify)
  });
};
