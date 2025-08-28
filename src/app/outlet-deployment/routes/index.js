const OutletDeploymentRoutes = require("./outlet-deployment");

module.exports = async fastify => {
  fastify.register(OutletDeploymentRoutes, { prefix: "" });
};
