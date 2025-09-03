const postOutletDeviceService = require("./post-outlet-device");
const getOutletDeviceService = require("./get-outlet-device");
const deleteOutletDeviceService = require("./delete-outlet-device");
const outletDeviceBulkEventsService = require("./post-outlet-device-bulk-events");

module.exports = {
  postOutletDeviceService,
  getOutletDeviceService,
  deleteOutletDeviceService,
  outletDeviceBulkEventsService
};
