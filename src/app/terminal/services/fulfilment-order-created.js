const { SUCCESS_RESPONSE } = require("../commons/constants");
const { getPaymentDetails } = require("../repository/payment");
const { TerminalTransactionRepo } = require("../repository/terminal_transaction");
const { mapTerminalTransactionToDb } = require("../transformers/terminal-transaction");

function orderEventsService(fastify) {
  return async ({ input }) => {
    const { createTerminalTrasaction } = TerminalTransactionRepo();
    const { order_number } = input;

    const { data: paymentDetails, error: paymentDetailsError } = await getPaymentDetails({
      fastify,
      data: { order_number }
    });
    if (paymentDetailsError) throw paymentDetailsError;

    const transformedTerminalTransactionBody = mapTerminalTransactionToDb({
      details: input,
      paymentDetails
    });

    await createTerminalTrasaction.call(fastify.knex, {
      input: transformedTerminalTransactionBody
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = orderEventsService;
