const { TERMINAL_EVENT_TYPES, SUCCESS_RESPONSE } = require("../commons/constants");
const { TerminalRepo } = require("../repository/terminal");
const { emitTerminalEventService } = require("./terminal-event");

function postTerminalBuklEventsService(fastify) {
  const { getTerminal } = TerminalRepo();
  const emitTerminalEvent = emitTerminalEventService(fastify);

  return async ({ input }) => {
    const { terminal_ids, outlet_ids } = input;

    const terminalDetails = await getTerminal.call(fastify.knex, {
      filters: { whereIn: { terminal_ids, outlet_ids } }
    });

    terminalDetails.forEach(item => {
      emitTerminalEvent({
        terminalId: item.terminal_id,
        outletId: item.outlet_id,
        eventType: TERMINAL_EVENT_TYPES.TERMINAL_BULK_DATA_UPDATE
      });
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = postTerminalBuklEventsService;
