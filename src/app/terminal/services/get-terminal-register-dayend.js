const { DenominationConfigRepo } = require("../../pos-config/repository/denomination-config");
const { TerminalRepo } = require("../repository/terminal");
const { TerminalRegisterRepo } = require("../repository/terminal-register");
const { TerminalRegisterDayendRepo } = require("../repository/terminal-register-dayend");
const { TerminalTransactionRepo } = require("../repository/terminal_transaction");
const {
  terminalRegisterDayendResponseMapper
} = require("../transformers/terminal-register-dayend");

function getTerminalRegisterDayendService(fastify) {
  return async ({ input }) => {
    const { getTerminalRegister } = TerminalRegisterRepo();
    const { getTerminalRegisterDayend } = TerminalRegisterDayendRepo();
    const { getTerminalTransaction } = TerminalTransactionRepo();
    const { getTerminal } = TerminalRepo();
    const { getDenominationConfig } = DenominationConfigRepo();
    const { transaction_id } = input;
    const terminalRegister = await getTerminalRegister.call(fastify.knex, {
      filters: { where: { register_transaction_id: transaction_id } }
    });

    const { outlet_id } = terminalRegister[0];

    const terminals = await getTerminal.call(fastify.knex, {
      filters: { where: { outlet_id } }
    });

    const terminalsMap = terminals.reduce((acc, terminal) => {
      const { terminal_id } = terminal;
      acc[terminal_id] = terminal;
      return acc;
    }, {});

    const denominationConfig = await getDenominationConfig.call(fastify.knex, {});

    const denominationsMap = denominationConfig.reduce((acc, config) => {
      const { denomination_config_id, denomination_amount, type } = config;
      acc[denomination_config_id] = { denomination_amount, type };
      return acc;
    }, {});

    const terminalDayend = await getTerminalRegisterDayend.call(fastify.knex, {
      filters: { where: { register_transaction_id: transaction_id } }
    });

    const terminalTransactions = await getTerminalTransaction.call(fastify.knex, {
      filters: {
        where: { register_transaction_id: transaction_id }
      }
    });

    const terminalRegisterDayendResponse = terminalRegisterDayendResponseMapper({
      terminalRegister,
      terminalDayend,
      terminalTransactions,
      terminalsMap,
      denominationsMap
    });
    return terminalRegisterDayendResponse;
  };
}

module.exports = getTerminalRegisterDayendService;
