const TerminalRoutes = require("./terminal");

module.exports = async fastify => {
  fastify.register(TerminalRoutes, { prefix: "" });
};
