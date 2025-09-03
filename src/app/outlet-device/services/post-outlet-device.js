const { OUTLET_DEVICE_EVENT_TYPES } = require("../commons/constants");
const { apiToDb } = require("../mappers/audit-mapper");
const { OutletDeviceRepo } = require("../repository/outlet-device");
const { emitOutletDeviceEventService } = require("./outlet-device-event");

function postOutletDeviceService(fastify) {
  const { createOutletDevice } = OutletDeviceRepo();

  return async ({ body }) => {
    const emitOutletDeviceEvent = emitOutletDeviceEventService(fastify);
    const { audit, ...rest } = body;

    const outletDevicePayload = { ...rest, ...apiToDb({ audit }) };

    const { outlet_device_register_id, outlet_id } = await createOutletDevice.call(fastify.knex, {
      input: outletDevicePayload
    });

    emitOutletDeviceEvent({
      eventType: OUTLET_DEVICE_EVENT_TYPES.OUTLET_DEVICE_UPDATED,
      outlet_id
    });

    return { outlet_device_register_id };
  };
}
module.exports = postOutletDeviceService;
