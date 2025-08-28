const { logQuery } = require("../../commons/helpers");

const TERMINAL_USAGE = {
  NAME: "terminal_usage",
  COLUMNS: {
    TERMINAL_USAGE_ID: "terminal_usage_id",
    OUTLET_ID: "outlet_id",
    TERMINAL_ID: "terminal_id",
    USER_ID: "user_id",
    LOGGED_IN_AT: "logged_in_at",
    LOGGED_OUT_AT: "logged_out_at",
    FORCED_LOGOUT_BY: "forced_logout_by",
    AUDIT: "audit"
  }
};

function TerminalUsageRepo() {
  async function getTerminalUsage({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;
    const {
      where: whereClause,
      whereNull: whereNullClause,
      whereNotNull: whereNotNullClause,
      count
    } = filters;
    const query = knex(TERMINAL_USAGE.NAME);
    if (whereClause) {
      query.where(whereClause);
    }

    if (whereNullClause) {
      query.whereNull(whereNullClause);
    }

    if (whereNotNullClause) {
      query.whereNotNull(whereNotNullClause);
    }

    if (count) {
      query.count();
    } else {
      query.select(fieldsToReturn);
    }

    logQuery({ query, context: "Get Terminal Usage" });
    const terminal = await query;
    return terminal;
  }

  async function createTerminalUsage({ input }) {
    const knex = this;
    const query = knex(TERMINAL_USAGE.NAME)
      .returning("*")
      .insert(input)
      .onConflict(TERMINAL_USAGE.COLUMNS.TERMINAL_USAGE_ID)
      .merge();
    logQuery({ query, context: "Create Terminal Usage" });
    const [terminalUsage] = await query;
    return terminalUsage;
  }

  async function updateTerminalUsage({ input }) {
    const knex = this;
    const { terminalUsage, filters = {} } = input;
    const { where: whereClause } = filters;
    const query = knex(TERMINAL_USAGE.NAME).returning("*").update(terminalUsage);
    if (whereClause) {
      query.where(whereClause);
    }
    logQuery({ query, context: "Update Terminal Usage" });
    const [updatedTerminal] = await query;
    return updatedTerminal;
  }

  async function deleteTerminalUsage({ filters = {} }) {
    const knex = this;
    const { where: whereClause, whereIn: whereInClause } = filters;
    const query = knex(TERMINAL_USAGE.NAME).delete();
    if (whereClause) {
      query.where(whereClause);
    }
    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }
    logQuery({ query, context: "Delete Terminal Usage" });
    const deletedTerminal = await query;
    return deletedTerminal;
  }

  return {
    getTerminalUsage,
    createTerminalUsage,
    updateTerminalUsage,
    deleteTerminalUsage
  };
}

module.exports = { TerminalUsageRepo, TERMINAL_USAGE };
