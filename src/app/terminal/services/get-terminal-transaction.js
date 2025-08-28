const { STANDARD_FRACTION, ZERO_AMOUNT } = require("../../commons/constant");
const Amount = require("../../utils/amount");
const { formatNumber } = require("../../utils/quantity");
const { TerminalTransactionRepo } = require("../repository/terminal_transaction");
const { OutletConfigRepo } = require("../../outlet-config/repository/outlet-config");

function getTerminalTransactionService(fastify) {
  const { getTerminalTransactionLite } = TerminalTransactionRepo();
  const { getOutletConfig } = OutletConfigRepo();

  return async ({ body }) => {
    const terminalTransactionsPromise = getTerminalTransactionLite.call(fastify.knex, {
      filters: {
        where: body
      },
      fieldsToReturn: [
        fastify.knex.raw(`pm.payment_method->>'payment_option_id' AS payment_option_id`),
        fastify.knex.raw(`pm.payment_method->>'psp_id' AS psp_id`),
        fastify.knex.raw(`ap.payment_mode->>'psp_name' AS psp_name`),
        fastify.knex.raw(`ap.payment_mode->>'payment_option_code' AS payment_option_code`),
        fastify.knex.raw(`COUNT(*) AS total_transaction_count`),
        fastify.knex.raw(
          `SUM((pm.payment_method->'amount'->>'cent_amount')::numeric/(pm.payment_method->'amount'->>'fraction')::numeric) AS total_transaction_amount`
        )
      ]
    });
    const outletConfigPromise = getOutletConfig.call(fastify.knex, {
      filters: { where: { outlet_id: body.outlet_id } }
    });

    const [terminalTransactions, [outletConfig]] = await Promise.all([
      terminalTransactionsPromise,
      outletConfigPromise
    ]);

    const { allowed_payment_modes } = outletConfig;

    const allowedPaymentModesMap = allowed_payment_modes.reduce((acc, allowedPaymentMode) => {
      const { payment_option_id } = allowedPaymentMode;
      acc[payment_option_id] = allowedPaymentMode;
      return acc;
    }, {});

    const terminalTransactionsMap = terminalTransactions.reduce((acc, terminalTransaction) => {
      const { payment_option_id } = terminalTransaction;
      acc[payment_option_id] = terminalTransaction;
      return acc;
    }, {});

    const transformTerminalTransactions = {
      terminal_transactions: body?.payment_methods?.reduce((acc, paymentMethod) => {
        const transaction = terminalTransactionsMap[paymentMethod];
        acc.push({
          ...allowedPaymentModesMap[paymentMethod],
          total_transaction_amount: transaction
            ? Amount({
                cent_amount: formatNumber(transaction.total_transaction_amount * STANDARD_FRACTION)
              })
            : ZERO_AMOUNT,
          total_transaction_count: transaction ? Number(transaction.total_transaction_count) : 0
        });
        return acc;
      }, [])
    };

    return transformTerminalTransactions;
  };
}

module.exports = getTerminalTransactionService;
