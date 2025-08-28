const PosModesRoutes = require("./pos-modes");
const DenominationConfigRoutes = require("./denomination-config");

module.exports = async fastify => {
  fastify.register(PosModesRoutes, { prefix: "" });
  fastify.register(DenominationConfigRoutes, { prefix: "" });
};
