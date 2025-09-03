const { logger } = require("../../utils/logger");
const { OutletDeviceRepo } = require("../repository/outlet-device");

function emitOutletDeviceEventService(fastify) {
  const { getOutletDevice } = OutletDeviceRepo();

  return async ({ outlet_id, eventType }) => {
    try {
      const outletDevices = await getOutletDevice.call(fastify.knex, {
        where: { outlet_id }
      });

      const payload = { outlet_id, data: outletDevices };

      await fastify.publishEvent({
        data: payload,
        event_info: {
          entity_type: "OUTLET_DEVICE",
          event_type: eventType,
          outlet_id,
          topic_name: fastify.config.POINT_OF_SALE_EVENT_TOPIC
        }
      });
    } catch (error) {
      logger.error({
        message: "Error While Raising Event For Outlet devices",
        error
      });
    }
  };
}

module.exports = { emitOutletDeviceEventService };
