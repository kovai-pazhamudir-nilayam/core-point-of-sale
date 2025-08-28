const schemas = require("../schemas");
const PosScanHandler = require("../handlers");

module.exports = async fastify => {
  const { getPosScan } = PosScanHandler;

  fastify.route({
    method: "GET",
    url: "/scan",
    schema: schemas.getPosScan,
    handler: getPosScan(fastify)
  });
};
