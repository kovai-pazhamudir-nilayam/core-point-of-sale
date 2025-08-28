const { STANDARD_FRACTION, ZERO_AMOUNT } = require("../../commons/constant");
const Errors = require("../../errorHandler/domain/errors");
const { DenominationConfigRepo } = require("../../pos-config/repository/denomination-config");
const Amount = require("../../utils/amount");
const { newAudit } = require("../mappers/audit-mapper");
const { TerminalRegisterDayendRepo } = require("../repository/terminal-register-dayend");

function postTerminalRegisterDayendService(fastify) {
  return async ({ input }) => {
    const { createTerminalRegisterDayend } = TerminalRegisterDayendRepo();
    const { getDenominationConfig } = DenominationConfigRepo();
    const { reconciliation_close_by, register_transaction_summary } = input;

    const denominationConfig = await getDenominationConfig.call(fastify.knex, {});

    const denominations = denominationConfig.reduce((acc, config) => {
      const { denomination_config_id, denomination_amount } = config;
      acc[denomination_config_id] = denomination_amount;
      return acc;
    }, {});

    const cashTransactions = register_transaction_summary.find(
      transaction => transaction.payment_option_code === "CASH"
    );

    if (cashTransactions && cashTransactions?.reconciliation_denomination_details) {
      const declaredCashDenominations = cashTransactions.reconciliation_denomination_details
        .reduce((acc, { denomination_config_id, count }) => {
          const centAmount = denominations[denomination_config_id] * count;
          const amountObject = Amount({
            cent_amount: centAmount * STANDARD_FRACTION
          });
          return acc.add(amountObject);
        }, Amount(ZERO_AMOUNT))
        .asNumeric();

      if (
        Math.abs(
          Amount(cashTransactions.total_reconciliation_amount).asNumeric() -
            declaredCashDenominations
        ) > 1
      ) {
        throw Errors.DenominationMismatchError();
      }
    }

    const registerTransactionSummary = JSON.stringify(register_transaction_summary);
    const registerDayendBody = {
      ...input,
      register_transaction_summary: registerTransactionSummary,
      ...newAudit({ createdBy: reconciliation_close_by })
    };
    await createTerminalRegisterDayend.call(fastify.knex, { input: registerDayendBody });
    return { success: true };
  };
}

module.exports = postTerminalRegisterDayendService;
