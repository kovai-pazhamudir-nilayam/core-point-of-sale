const { OUTLET_DEVICE_EVENT_TYPES, SUCCESS_RESPONSE } = require("../commons/constants");
const { emitOutletDeviceEventService } = require("./outlet-device-event");

function outletDeviceBulkEventsService(fastify) {
  return async ({ body }) => {
    const emitOutletDeviceEvent = emitOutletDeviceEventService(fastify);

    const { outlet_ids } = body;

    outlet_ids.forEach(outlet_id => {
      emitOutletDeviceEvent({
        eventType: OUTLET_DEVICE_EVENT_TYPES.OUTLET_DEVICE_BULK_DATA_UPDATED,
        outlet_id
      });
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = outletDeviceBulkEventsService;
