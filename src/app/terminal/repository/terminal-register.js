const { logQuery } = require("../../commons/helpers");

const TERMINAL_REGISTER = {
  NAME: "terminal_register",
  COLUMNS: {
    REGISTER_TRANSACTION_ID: "register_transaction_id",
    OUTLET_ID: "outlet_id",
    TERMINAL_ID: "terminal_id",
    REGISTER_ID: "register_id",
    REGISTER_STATUS: "register_status",
    ACTION_AT: "action_at",
    FLOAT_CASH: "float_cash",
    USER_ID: "user_id",
    REGISTER_OPEN_AT: "register_open_at",
    REGISTER_CLOSE_AT: "register_close_at",
    FORCED_CLOSE_BY: "forced_close_by"
  }
};

function TerminalRegisterRepo() {
  // eslint-disable-next-line complexity
  async function getTerminalRegister({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(TERMINAL_REGISTER.NAME).select(fieldsToReturn);

    if (whereClause.terminal_id) {
      query.where(TERMINAL_REGISTER.COLUMNS.TERMINAL_ID, whereClause.terminal_id);
    }

    if (whereClause.register_status) {
      query.where(TERMINAL_REGISTER.COLUMNS.REGISTER_STATUS, whereClause.register_status);
    }

    if (whereClause.register_transaction_id) {
      query.where(
        TERMINAL_REGISTER.COLUMNS.REGISTER_TRANSACTION_ID,
        whereClause.register_transaction_id
      );
    }

    if (whereClause.register_id) {
      query.where(TERMINAL_REGISTER.COLUMNS.REGISTER_ID, whereClause.register_id);
    }

    if (whereClause.outlet_id) {
      query.where(TERMINAL_REGISTER.COLUMNS.OUTLET_ID, whereClause.outlet_id);
    }

    if (whereClause.register_open_at) {
      query.whereBetween(TERMINAL_REGISTER.COLUMNS.REGISTER_OPEN_AT, whereClause.register_open_at);
    }

    if (whereInClause) {
      query.whereIn(whereInClause);
    }

    logQuery({ query, context: "Get Terminal Register" });

    const terminalRegister = await query;

    return terminalRegister;
  }

  async function createTerminalRegister({ input }) {
    const knex = this;

    const query = knex(TERMINAL_REGISTER.NAME)
      .returning("*")
      .insert(input)
      .onConflict(TERMINAL_REGISTER.COLUMNS.REGISTER_ID)
      .merge();

    logQuery({ query, context: "Create Terminal Register" });

    const [response] = await query;

    return response;
  }

  async function updateTerminalRegister({ input }) {
    const knex = this;
    const { filters, terminalRegister } = input;
    const { where: whereClause } = filters;
    const query = knex(TERMINAL_REGISTER.NAME).returning("*").update(terminalRegister);
    if (whereClause) {
      query.where(whereClause);
    }
    logQuery({ query, context: "Update Terminal Register" });
    const [updatedTerminalRegister] = await query;
    return updatedTerminalRegister;
  }

  async function deleteTerminalRegister({ filters = {} }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(TERMINAL_REGISTER.NAME).delete();

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Delete Terminal Register" });

    const deletedTerminalRegister = await query;

    return deletedTerminalRegister;
  }

  return {
    getTerminalRegister,
    createTerminalRegister,
    updateTerminalRegister,
    deleteTerminalRegister
  };
}

module.exports = { TerminalRegisterRepo, TERMINAL_REGISTER };
