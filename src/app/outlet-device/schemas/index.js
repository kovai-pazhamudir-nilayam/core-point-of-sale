const postOutletDevice = require("./post-outlet-device");
const getOutletDevice = require("./get-outlet-device");
const deleteOutletDevice = require("./delete-outlet-device");
const postOutletDeviceBulkEvents = require("./post-outlet-device-bulk-events");

module.exports = {
  getOutletDevice,
  postOutletDevice,
  deleteOutletDevice,
  postOutletDeviceBulkEvents
};
