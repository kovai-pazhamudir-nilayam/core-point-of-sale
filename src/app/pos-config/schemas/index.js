const getDenominationConfig = require("./get-denomination-config");
const getPosModes = require("./get-pos-modes");
const postDenominationConfig = require("./post-denomination-config");
const denominationConfigBulkEvents = require("./post-denomination-config-bulk-events");
const postPosModes = require("./post-pos-modes");

module.exports = {
  getPosModes,
  postPosModes,
  getDenominationConfig,
  postDenominationConfig,
  denominationConfigBulkEvents
};
