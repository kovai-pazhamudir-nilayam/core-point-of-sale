const { logQuery } = require("../../commons/helpers");

const TERMINAL = {
  NAME: "terminal",
  COLUMNS: {
    TERMINAL_ID: "terminal_id",
    TERMINAL_NAME: "terminal_name",
    MAC_ADDRESS: "mac_address",
    OUTLET_ID: "outlet_id",
    STATUS: "status",
    IS_EDC_INTEGRATED: "is_edc_integrated",
    NON_INTEGRATED_EDC_ALLOWED_MODE: "non_integrated_edc_allowed_mode",
    RETURNS_ENABLED_MODE: "returns_enabled_mode",
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

    if (whereInClause?.mac_addresses?.length) {
      query.whereIn(TERMINAL.COLUMNS.MAC_ADDRESS, whereInClause.mac_addresses);
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

  async function getTerminalsGroupedByOutlet({ filters = {} }) {
    const knex = this;

    const { where: whereClause } = filters;

    const query = knex(TERMINAL.NAME)
      .select(TERMINAL.COLUMNS.OUTLET_ID)
      .select(
        knex.raw(`
          json_agg(
            json_build_object(
              'terminal_id', ${TERMINAL.COLUMNS.TERMINAL_ID},
              'terminal_name', ${TERMINAL.COLUMNS.TERMINAL_NAME},
              'mac_address', ${TERMINAL.COLUMNS.MAC_ADDRESS},
              'status', ${TERMINAL.COLUMNS.STATUS}
            )
            ORDER BY ${TERMINAL.COLUMNS.TERMINAL_ID}
          ) as terminals
        `)
      )
      .groupBy(TERMINAL.COLUMNS.OUTLET_ID);

    if (whereClause) {
      query.where(whereClause);
    }

    logQuery({ query, context: "Get Terminals Grouped By Outlet" });

    const groupedTerminals = await query;

    return groupedTerminals;
  }

  return {
    getTerminal,
    createTerminal,
    updateTerminal,
    deleteTerminal,
    getTerminalsGroupedByOutlet
  };
}

module.exports = { TerminalRepo, TERMINAL };
