const postTerminalService = require("./post-terminal");
const getTerminalService = require("./get-terminal");
const getTerminalsService = require("./get-terminals");
const postTerminalStatusService = require("./post-terminal-status");
const postTerminalUsageService = require("./post-terminal-usage");
const getTerminalUsageService = require("./get-terminal-usage");
const getTerminalRegisterService = require("./get-terminal-register");
const getTerminalRegisterByTerminalIdService = require("./get-terminal-register-by-terninal-id");
const postTerminalRegisterService = require("./post-terminal-register");
const postTerminalRegisterReconFetchService = require("./post-terminal-register-recon-fetch");
const postTerminalRegisterDayendService = require("./post-terminal-register-dayend");
const fulfilmentOrderCreatedEventService = require("./fulfilment-order-created");
const getTerminalRegisterDayendListService = require("./get-terminal-register-dayend-list");
const getTerminalRegisterDayendService = require("./get-terminal-register-dayend");
const getTerminalTransactionService = require("./get-terminal-transaction");
const postTerminalBulkEventsService = require("./post-terminal-bulk-events");

module.exports = {
  postTerminalService,
  getTerminalService,
  getTerminalsService,
  postTerminalStatusService,
  getTerminalUsageService,
  postTerminalUsageService,
  getTerminalRegisterService,
  getTerminalRegisterByTerminalIdService,
  postTerminalRegisterService,
  postTerminalRegisterDayendService,
  postTerminalRegisterReconFetchService,
  fulfilmentOrderCreatedEventService,
  getTerminalRegisterDayendListService,
  getTerminalRegisterDayendService,
  getTerminalTransactionService,
  postTerminalBulkEventsService
};
