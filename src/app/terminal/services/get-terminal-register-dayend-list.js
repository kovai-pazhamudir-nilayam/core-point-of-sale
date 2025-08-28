const { DenominationConfigRepo } = require("../../pos-config/repository/denomination-config");
const { TerminalRepo } = require("../repository/terminal");
const { TerminalRegisterRepo } = require("../repository/terminal-register");
const {
  TerminalRegisterDayendRepo,
  TERMINAL_REGISTER_DAYEND
} = require("../repository/terminal-register-dayend");
const {
  TerminalTransactionRepo,
  TERMINAL_TRANSACTION
} = require("../repository/terminal_transaction");
const {
  terminalRegisterDayendListResponseMapper
} = require("../transformers/terminal-register-dayend");

function getTerminalRegisterDayendListService(fastify) {
  return async ({ input }) => {
    const { getTerminalRegister } = TerminalRegisterRepo();
    const { getTerminalRegisterDayend } = TerminalRegisterDayendRepo();
    const { getTerminalTransaction } = TerminalTransactionRepo();
    const { getTerminal } = TerminalRepo();
    const { getDenominationConfig } = DenominationConfigRepo();
    const { outlet_id, date_from, date_to } = input;

    const dateFrom = new Date(date_from).toISOString();
    const dateTo = new Date(date_to).toISOString();

    const terminalRegisters = await getTerminalRegister.call(fastify.knex, {
      filters: {
        where: { outlet_id, register_open_at: [dateFrom, dateTo] }
      }
    });

    const terminals = await getTerminal.call(fastify.knex, { filters: { outlet_id } });

    const terminalsMap = terminals.reduce((acc, terminal) => {
      const { terminal_id } = terminal;
      acc[terminal_id] = terminal;
      return acc;
    }, {});

    const registerTransactionIds = terminalRegisters.reduce((acc, register) => {
      const { register_transaction_id } = register;
      acc.push(register_transaction_id);
      return acc;
    }, []);

    const terminalDayend = await getTerminalRegisterDayend.call(fastify.knex, {
      filters: {
        whereIn: [TERMINAL_REGISTER_DAYEND.COLUMNS.REGISTER_TRANSACTION_ID, registerTransactionIds]
      }
    });

    const terminalTransactions = await getTerminalTransaction.call(fastify.knex, {
      filters: {
        whereIn: [TERMINAL_TRANSACTION.COLUMNS.REGISTER_TRANSACTION_ID, registerTransactionIds]
      }
    });

    const denominationConfig = await getDenominationConfig.call(fastify.knex, {});

    const denominationsMap = denominationConfig.reduce((acc, config) => {
      const { denomination_config_id, denomination_amount, type } = config;
      acc[denomination_config_id] = { denomination_amount, type };
      return acc;
    }, {});

    const terminalRegisterDayendResponse = terminalRegisterDayendListResponseMapper({
      terminalRegisters,
      terminalDayend,
      terminalTransactions,
      terminalsMap,
      denominationsMap
    });
    return terminalRegisterDayendResponse;
  };
}

module.exports = getTerminalRegisterDayendListService;
