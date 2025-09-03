const outletDevice = require("./outlet_device");

module.exports = async fastify => {
  fastify.register(outletDevice, { prefix: "/outlet-device" });
};
