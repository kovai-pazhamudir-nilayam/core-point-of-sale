const schemas = require("../schemas");
const PosModesHandler = require("../handlers");

module.exports = async fastify => {
  const { getPosModesHandler, postPosModeHandler } = PosModesHandler;

  fastify.route({
    method: "POST",
    url: "/pos-mode",
    schema: schemas.postPosModes,
    handler: postPosModeHandler(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/pos-modes",
    schema: schemas.getPosModes,
    handler: getPosModesHandler(fastify)
  });
};
