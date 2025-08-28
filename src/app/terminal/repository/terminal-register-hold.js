const { logQuery } = require("../../commons/helpers");

const TERMINAL_REGISTER_HOLD = {
  NAME: "terminal_register_hold",
  COLUMNS: {
    REGISTER_HOLD_BY: "register_hold_by",
    REGISTER_HOLD_AT: "register_hold_at",
    REGISTER_RESUME_AT: "register_resume_at",
    REGISTER_RESUME_BY: "register_resume_by"
  }
};

function TerminalRegisterHoldRepo() {
  async function getTerminalRegisterHold({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(TERMINAL_REGISTER_HOLD.NAME).select(fieldsToReturn);

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause) {
      query.whereIn(whereInClause);
    }

    logQuery({ query, context: "Get Terminal Register Hold" });

    const terminalRegisterHold = await query;

    return terminalRegisterHold;
  }

  async function createTerminalRegisterHold({ input }) {
    const knex = this;

    const query = knex(TERMINAL_REGISTER_HOLD.NAME).returning("*").insert(input);

    logQuery({ query, context: "Create Terminal Register Hold" });

    const [response] = await query;

    return response;
  }

  async function updateTerminalRegisterHold({ input }) {
    const knex = this;
    const { filters = {}, terminalRegisterHold } = input;
    const { where: whereClause } = filters;

    const query = knex(TERMINAL_REGISTER_HOLD.NAME).returning("*").update(terminalRegisterHold);

    if (whereClause) {
      query.where(whereClause);
    }

    logQuery({ query, context: "Update Terminal Register Hold" });

    const [updatedTerminalRegisterHold] = await query;

    return updatedTerminalRegisterHold;
  }

  async function deleteTerminalRegisterHold({ filters = {} }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(TERMINAL_REGISTER_HOLD.NAME).delete();

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Delete Terminal Register Hold" });

    const deletedTerminalRegisterHold = await query;

    return deletedTerminalRegisterHold;
  }

  return {
    getTerminalRegisterHold,
    createTerminalRegisterHold,
    updateTerminalRegisterHold,
    deleteTerminalRegisterHold
  };
}

module.exports = { TerminalRegisterHoldRepo, TERMINAL_REGISTER_HOLD };
