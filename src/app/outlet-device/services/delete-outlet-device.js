const { SUCCESS_RESPONSE } = require("../../commons/constant");
const Errors = require("../../errorHandler/domain/errors");
const { OUTLET_DEVICE_EVENT_TYPES } = require("../commons/constants");
const { OutletDeviceRepo } = require("../repository/outlet-device");
const { emitOutletDeviceEventService } = require("./outlet-device-event");

function deleteOutletDeviceService(fastify) {
  const { getOutletDevice, deleteOutletDevice } = OutletDeviceRepo();
  const emitOutletDeviceEvent = emitOutletDeviceEventService(fastify);
  return async ({ params }) => {
    const { outlet_device_register_id } = params;

    const outletDeviceResponse = await getOutletDevice.call(fastify.knex, {
      filters: {
        where: { outlet_device_register_id }
      }
    });
    if (!outletDeviceResponse.length) {
      throw Errors.OutletDeviceNotFoundError({ outlet_device_register_id });
    }

    const { outlet_id } = await deleteOutletDevice.call(fastify.knex, {
      filters: {
        where: { outlet_device_register_id }
      }
    });

    emitOutletDeviceEvent({
      eventType: OUTLET_DEVICE_EVENT_TYPES.OUTLET_DEVICE_UPDATED,
      outlet_id
    });
    return SUCCESS_RESPONSE;
  };
}
module.exports = deleteOutletDeviceService;
