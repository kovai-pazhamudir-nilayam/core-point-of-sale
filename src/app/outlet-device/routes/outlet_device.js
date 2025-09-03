const schemas = require("../schemas");
const {
  postOutletDevice,
  getOutletDevice,
  deleteOutletDevice,
  postOutletDeviceBulkEvents
} = require("../handlers");

module.exports = async fastify => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: schemas.postOutletDevice,
    handler: postOutletDevice(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/bulk-events",
    schema: schemas.postOutletDeviceBulkEvents,
    handler: postOutletDeviceBulkEvents(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: schemas.getOutletDevice,
    handler: getOutletDevice(fastify)
  });

  fastify.route({
    method: "DELETE",
    url: "/:outlet_device_register_id",
    schema: schemas.deleteOutletDevice,
    handler: deleteOutletDevice(fastify)
  });
};
