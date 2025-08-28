const getDenominationConfigHandler = require("./get-denomination-config");
const getPosModesHandler = require("./get-pos-modes");
const postDenominationConfigHandler = require("./post-denomination-config");
const denominationConfigBulkEventsHandler = require("./post-denomination-config-bulk-events");
const postPosModeHandler = require("./post-pos-mode");

module.exports = {
  getPosModesHandler,
  postPosModeHandler,
  getDenominationConfigHandler,
  postDenominationConfigHandler,
  denominationConfigBulkEventsHandler
};
