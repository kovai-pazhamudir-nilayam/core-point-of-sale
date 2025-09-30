const schemas = require("../schemas");
const TerminalHandler = require("../handlers");

module.exports = async fastify => {
  const {
    postTerminal,
    getTerminal,
    getTerminals,
    getTerminalsList,
    postTerminalStatus,
    postTerminalUsage,
    getTerminalUsage,
    getTerminalRegisterByRegisterId,
    getTerminalRegisterByTerminalId,
    postTerminalRegister,
    postTerminalRegisterReconFetch,
    getTerminalRegisterDayendList,
    getTerminalRegisterDayend,
    getTerminalTransaction,
    postTerminalBulkEvents,
    getTerminalDetails
  } = TerminalHandler;

  fastify.route({
    method: "POST",
    url: "/terminal",
    schema: schemas.postTerminal,
    handler: postTerminal(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/terminal",
    schema: schemas.getTerminal,
    handler: getTerminal(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/terminal/details/:mac_address",
    schema: schemas.getTerminalDetails,
    handler: getTerminalDetails(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/terminals",
    schema: schemas.getTerminals,
    handler: getTerminals(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/terminals/list",
    schema: schemas.getTerminalsList,
    handler: getTerminalsList(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/terminal/status",
    schema: schemas.postTerminalStatus,
    handler: postTerminalStatus(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/terminal-usage",
    schema: schemas.postTerminalUsage,
    handler: postTerminalUsage(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/terminal-usage",
    schema: schemas.getTerminalUsage,
    handler: getTerminalUsage(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/terminal/register",
    schema: schemas.getTerminalRegisterByRegisterId,
    handler: getTerminalRegisterByRegisterId(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/terminal/:terminal_id/register",
    schema: schemas.getTerminalRegisterByTerminalId,
    handler: getTerminalRegisterByTerminalId(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/terminal/register",
    schema: schemas.postTerminalRegister,
    handler: postTerminalRegister(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/terminal/register/dayend",
    schema: schemas.postTerminalRegisterDayend,
    handler: TerminalHandler.postTerminalRegisterDayend(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/order/events",
    schema: schemas.orderEvents,
    handler: TerminalHandler.orderEvents(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/terminal/register/recon/fetch",
    schema: schemas.postTerminalRegisterReconFetch,
    handler: postTerminalRegisterReconFetch(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/terminal/register/dayend/list",
    schema: schemas.getTerminalRegisterDayendList,
    handler: getTerminalRegisterDayendList(fastify)
  });

  fastify.route({
    method: "GET",
    url: "/terminal/register/dayend",
    schema: schemas.getTerminalRegisterDayend,
    handler: getTerminalRegisterDayend(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/terminal-usage/sync",
    schema: schemas.postTerminalUsageSync,
    handler: TerminalHandler.postTerminalUsageSync(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/terminal/register/sync",
    schema: schemas.postTerminalRegisterSync,
    handler: TerminalHandler.postTerminalRegisterSync(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/terminal-transactions/fetch",
    schema: schemas.getTerminalTransaction,
    handler: getTerminalTransaction(fastify)
  });

  fastify.route({
    method: "POST",
    url: "/terminal/bulk-events",
    schema: schemas.postTerminalBulkEvents,
    handler: postTerminalBulkEvents(fastify)
  });
};
