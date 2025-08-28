const getTerminalUsage = require("./get-terminal-usage");
const getTerminal = require("./get-terminal");
const getTerminals = require("./get-terminals");
const postTerminalStatus = require("./post-terminal-status");
const postTerminalUsage = require("./post-terminal-usage");
const postTerminal = require("./post-terminal");
const getTerminalRegisterByRegisterId = require("./get-terminal-register");
const getTerminalRegisterByTerminalId = require("./get-terminal-register-by-terminal_id");
const postTerminalRegister = require("./post-terminal-register");
const postTerminalRegisterReconFetch = require("./post-terminal-register-recon-fetch");
const postTerminalRegisterDayend = require("./post-terminal-register-dayend");
const orderEvents = require("./order-events");
const getTerminalRegisterDayendList = require("./get-terminal-register-dayend-list");
const getTerminalRegisterDayend = require("./get-terminal-register-dayend");
const postTerminalUsageSync = require("./post-terminal-usage-sync");
const postTerminalRegisterSync = require("./post-terminal-register-sync");
const getTerminalTransaction = require("./get-terminal-transaction");
const postTerminalBulkEvents = require("./post-terminal-bulk-events");

module.exports = {
  getTerminalUsage,
  getTerminal,
  getTerminals,
  postTerminalStatus,
  postTerminalUsage,
  postTerminalUsageSync,
  postTerminal,
  getTerminalRegisterByRegisterId,
  getTerminalRegisterByTerminalId,
  postTerminalRegister,
  postTerminalRegisterSync,
  postTerminalRegisterDayend,
  postTerminalRegisterReconFetch,
  orderEvents,
  getTerminalRegisterDayendList,
  getTerminalRegisterDayend,
  getTerminalTransaction,
  postTerminalBulkEvents
};
