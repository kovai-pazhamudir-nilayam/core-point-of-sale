const getDenominationConfigService = require("./get-denomination-config");
const getPosModesService = require("./get-pos-modes");
const postDenominationConfigService = require("./post-denomination-config");
const denominationConfigBulkEventsService = require("./post-denomination-config-bulk-events");
const postPosModeService = require("./post-pos-mode");

module.exports = {
  getPosModesService,
  postPosModeService,
  getDenominationConfigService,
  postDenominationConfigService,
  denominationConfigBulkEventsService
};
