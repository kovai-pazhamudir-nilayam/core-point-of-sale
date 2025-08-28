const { logQuery } = require("../../commons/helpers");

const TERMINAL_TRANSACTION = {
  NAME: "terminal_transaction",
  COLUMNS: {
    OUTLET_ID: "outlet_id",
    REGISTER_ID: "register_id",
    REGISTER_TRANSACTION_ID: "register_transaction_id",
    TERMINAL_ID: "terminal_id",
    USER_ID: "user_id",
    ORDER_NUMBER: "order_number",
    ORDER_AMOUNT: "order_amount",
    CREATED_AT: "created_at",
    LAST_MODIFIED_AT: "last_modified_at"
  }
};

function TerminalTransactionRepo() {
  async function getTerminalTransaction({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(TERMINAL_TRANSACTION.NAME).select(fieldsToReturn);

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause) {
      const [column, values] = whereInClause;
      query.whereIn(column, values);
    }

    const response = await query;

    return response;
  }

  // eslint-disable-next-line complexity
  async function getTerminalTransactionLite({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;
    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex
      .select(fieldsToReturn)
      .from("terminal_transaction as tt")
      .leftJoin(
        knex.raw("LATERAL jsonb_array_elements(tt.payment_methods) AS pm(payment_method) ON true")
      )
      .leftJoin("outlet_config as oc", "tt.outlet_id", "=", "oc.outlet_id")
      .leftJoin(
        knex.raw(
          "LATERAL jsonb_array_elements(oc.allowed_payment_modes) AS ap(payment_mode) " +
            "ON pm.payment_method->>'payment_option_id' = ap.payment_mode->>'payment_option_id'"
        )
      );

    if (whereClause) {
      if (whereClause.payment_methods && whereClause.payment_methods.length > 0) {
        query.whereRaw(
          `pm.payment_method->>'payment_option_id' IN (${whereClause.payment_methods
            .map(() => "?")
            .join(", ")})`,
          whereClause.payment_methods
        );
      }
      if (whereClause.register_id) {
        query.where("tt.register_id", whereClause.register_id);
      }
      if (whereClause.register_transaction_id) {
        query.where("tt.register_transaction_id", whereClause.register_transaction_id);
      }
      if (whereClause.terminal_id) {
        query.where("tt.terminal_id", whereClause.terminal_id);
      }
      if (whereClause.outlet_id) {
        query.where("tt.outlet_id", whereClause.outlet_id);
      }
    }

    if (whereInClause) {
      const [column, values] = whereInClause;
      query.whereIn(column, values);
    }

    query.groupBy([
      knex.raw("pm.payment_method->>'payment_option_id'"),
      knex.raw("pm.payment_method->>'psp_id'"),
      knex.raw("ap.payment_mode->>'psp_name'"),
      knex.raw("ap.payment_mode->>'payment_option_code'")
    ]);

    const response = await query;
    return response;
  }

  async function createTerminalTrasaction({ input }) {
    const knex = this;

    const query = knex(TERMINAL_TRANSACTION.NAME)
      .returning("*")
      .insert(input)
      .onConflict([
        TERMINAL_TRANSACTION.COLUMNS.ORDER_NUMBER,
        TERMINAL_TRANSACTION.COLUMNS.OUTLET_ID
      ])
      .merge();

    logQuery({ query, context: "Create Terminal Transaction" });

    const [response] = await query;

    return response;
  }

  return {
    getTerminalTransaction,
    createTerminalTrasaction,
    getTerminalTransactionLite
  };
}

module.exports = { TerminalTransactionRepo, TERMINAL_TRANSACTION };
