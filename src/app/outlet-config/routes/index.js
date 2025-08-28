const OutletConfigRoutes = require("./outlet-config");

module.exports = async fastify => {
  fastify.register(OutletConfigRoutes, { prefix: "/outlet-config" });
};
