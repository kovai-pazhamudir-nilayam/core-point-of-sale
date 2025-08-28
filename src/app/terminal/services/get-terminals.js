const { TerminalRepo, TERMINAL } = require("../repository/terminal");
const { TerminalRegisterRepo, TERMINAL_REGISTER } = require("../repository/terminal-register");
const { mapTerminalAndTerminalRegister } = require("../transformers/terminal");

function getTerminalsService(fastify) {
  const { getTerminal } = TerminalRepo();
  const { getTerminalRegister } = TerminalRegisterRepo();

  return async ({ query }) => {
    const { outlet_id } = query;

    const terminalResponse = await getTerminal.call(fastify.knex, {
      filters: {
        where: {
          [TERMINAL.COLUMNS.OUTLET_ID]: outlet_id
        }
      }
    });

    const terminalRegisterResponse = await getTerminalRegister.call(fastify.knex, {
      filters: {
        where: {
          [TERMINAL_REGISTER.COLUMNS.OUTLET_ID]: outlet_id,
          [TERMINAL_REGISTER.COLUMNS.REGISTER_STATUS]: "OPEN"
        }
      }
    });

    const mappedResponse = mapTerminalAndTerminalRegister({
      terminalResponse,
      terminalRegisterResponse
    });

    return mappedResponse;
  };
}
module.exports = getTerminalsService;
