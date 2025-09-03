const { OutletDeviceRepo } = require("../repository/outlet-device");
const { transformOutletDevice } = require("../transformers/outlet-device");

function getOutletDeviceService(fastify) {
  const { getOutletDevice } = OutletDeviceRepo();

  return async ({ query }) => {
    const { outlet_id, type } = query;

    const outletDevicesResponse = await getOutletDevice.call(fastify.knex, {
      filters: {
        where: { ...(outlet_id && { outlet_id }), ...(type && { type }) }
      }
    });

    const transformedResponse = transformOutletDevice({ outletDevicesResponse });

    return transformedResponse;
  };
}
module.exports = getOutletDeviceService;
