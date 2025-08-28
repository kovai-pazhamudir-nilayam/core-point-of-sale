const PosScanRoutes = require("./pos-scan");

module.exports = async fastify => {
  fastify.register(PosScanRoutes, { prefix: "/pos" });
};
