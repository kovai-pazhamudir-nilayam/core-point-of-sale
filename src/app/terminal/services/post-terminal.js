const { TERMINAL_EVENT_TYPES } = require("../commons/constants");
const { apiToDb } = require("../mappers/audit-mapper");
const { TerminalRepo } = require("../repository/terminal");
const { emitTerminalEventService } = require("./terminal-event");

function postTerminalService(fastify) {
  const { createTerminal } = TerminalRepo();
  const emitTerminalEvent = emitTerminalEventService(fastify);

  return async ({ input }) => {
    const { audit, edc_device, mac_address, ...restTerminal } = input;
    const terminal = {
      mac_address: mac_address.toLowerCase(),
      edc_device: JSON.stringify(edc_device),
      ...restTerminal,
      ...apiToDb({ audit })
    };
    const [createdTerminal] = await createTerminal.call(fastify.knex, { input: terminal });

    emitTerminalEvent({
      terminalId: createdTerminal.terminal_id,
      outletId: createdTerminal.outlet_id,
      eventType: TERMINAL_EVENT_TYPES.TERMINAL_UPDATED
    });

    return createdTerminal;
  };
}
module.exports = postTerminalService;
