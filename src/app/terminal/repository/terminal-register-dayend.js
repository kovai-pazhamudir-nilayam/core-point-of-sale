const { logQuery } = require("../../commons/helpers");

const TERMINAL_REGISTER_DAYEND = {
  NAME: "terminal_register_dayend",
  COLUMNS: {
    REGISTER_TRANSACTION_ID: "register_transaction_id",
    REGISTER_TRANSACTION_SUMMARY: "register_transaction_summary",
    RECONCILIATION_CLOSE_BY: "reconciliation_close_by",
    RECONCILIATION_NOTES: "reconciliation_notes",
    RECONCILIATION_STATUS: "reconciliation_status",
    API_VERSION: "api_version",
    CREATED_AT: "created_at",
    CREATED_BY: "created_by",
    LAST_MODIFIED_AT: "last_modified_at",
    LAST_MODIFIED_BY: "last_modified_by"
  }
};

function TerminalRegisterDayendRepo() {
  async function getTerminalRegisterDayend({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(TERMINAL_REGISTER_DAYEND.NAME).select(fieldsToReturn);

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause) {
      const [column, values] = whereInClause;
      query.whereIn(column, values);
    }

    logQuery({ query, context: "Get Terminal Register Dayend" });

    const terminalRegisterDayend = await query;

    return terminalRegisterDayend;
  }

  async function createTerminalRegisterDayend({ input }) {
    const knex = this;

    const query = knex(TERMINAL_REGISTER_DAYEND.NAME).returning("*").insert(input);

    logQuery({ query, context: "Create Terminal Register Dayend" });

    const [response] = await query;

    return response;
  }

  return {
    getTerminalRegisterDayend,
    createTerminalRegisterDayend
  };
}

module.exports = { TerminalRegisterDayendRepo, TERMINAL_REGISTER_DAYEND };
