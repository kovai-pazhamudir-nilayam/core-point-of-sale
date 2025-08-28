const _ = require("lodash");
const {
  TerminalRegisterRepo,
  TERMINAL_REGISTER: { COLUMNS }
} = require("../repository/terminal-register");
const {
  TERMINAL_REGISTER_STATUS: { OPEN }
} = require("../commons/constants");

function getTerminalRegisterByTerminalIdService(fastify) {
  const { getTerminalRegister } = TerminalRegisterRepo();

  return async ({ input }) => {
    const { terminal_id, outlet_id, user_id: userId } = input;

    const [terminalRegister] = await getTerminalRegister.call(fastify.knex, {
      filters: {
        where: {
          [COLUMNS.TERMINAL_ID]: terminal_id,
          [COLUMNS.REGISTER_STATUS]: OPEN,
          [COLUMNS.OUTLET_ID]: outlet_id,
          [COLUMNS.USER_ID]: userId
        }
      }
    });

    if (_.isEmpty(terminalRegister)) return { register_id: null };
    const { register_id, register_transaction_id, user_id, user_name } = terminalRegister;
    const mappedTerminalRegister = {
      outlet_id,
      terminal_id,
      register_id,
      register_transaction_id,
      user_id,
      user_name
    };
    return mappedTerminalRegister;
  };
}
module.exports = getTerminalRegisterByTerminalIdService;
