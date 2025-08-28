const { logQuery } = require("../../commons/helpers");

const TERMINAL = {
  NAME: "terminal",
  COLUMNS: {
    TERMINAL_ID: "terminal_id",
    TERMINAL_NAME: "terminal_name",
    OUTLET_ID: "outlet_id",
    STATUS: "status",
    IS_EDC_INTEGRATED: "is_edc_integrated",
    EDC_DEVICE: "edc_device",
    PRINTER_DEVICE: "printer_device",
    IS_ACTIVE: "is_active",
    LAST_USAGE: "last_usage",
    CUSTOM_INFO: "custom_info",
    AUDIT: "audit",
    LAST_MODIFIED_AT: "last_modified_at"
  }
};

function TerminalRepo() {
  async function getTerminal({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(TERMINAL.NAME).select(fieldsToReturn);

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.outlet_ids?.length) {
      query.whereIn(TERMINAL.COLUMNS.OUTLET_ID, whereInClause.outlet_ids);
    }

    if (whereInClause?.terminal_ids?.length) {
      query.whereIn(TERMINAL.COLUMNS.TERMINAL_ID, whereInClause.terminal_ids);
    }

    logQuery({ query, context: "Get Terminal" });

    const terminal = await query;

    return terminal;
  }

  async function createTerminal({ input }) {
    const knex = this;
    const query = knex(TERMINAL.NAME)
      .returning("*")
      .insert(input)
      .onConflict([TERMINAL.COLUMNS.OUTLET_ID, TERMINAL.COLUMNS.TERMINAL_ID])
      .merge();
    logQuery({ query, context: "Create Terminal" });
    return query;
  }

  async function updateTerminal({ input }) {
    const knex = this;
    const { filters, terminal } = input;
    const { where: whereClause } = filters;
    const query = knex(TERMINAL.NAME).returning("*").update(terminal);
    if (whereClause) {
      query.where(whereClause);
    }
    logQuery({ query, context: "Update Terminal" });
    const [updatedTerminal] = await query;
    return updatedTerminal;
  }

  async function deleteTerminal({ filters = {} }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(TERMINAL.NAME).delete();

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Delete Terminal" });

    const deletedTerminal = await query;

    return deletedTerminal;
  }

  return {
    getTerminal,
    createTerminal,
    updateTerminal,
    deleteTerminal
  };
}

module.exports = { TerminalRepo, TERMINAL };
