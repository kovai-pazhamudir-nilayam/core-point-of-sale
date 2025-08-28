const moment = require("moment");
const { SUCCESS_RESPONSE } = require("../commons/constants");
const { TerminalUsageRepo } = require("../repository/terminal-usage");
const { TerminalRepo, TERMINAL } = require("../repository/terminal");

const mapTerminalUsage = ({ input }) => {
  return {
    terminal_usage_id: input.terminal_usage_id,
    outlet_id: input.outlet_id,
    terminal_id: input.terminal_id,
    user_id: input.user_id,
    pos_mode: input.pos_mode,
    logged_in_at: input.logged_in_at,
    logged_out_at: input.logged_out_at,
    forced_logout_by: input.forced_logout_by,
    created_at: input.created_at,
    last_modified_at: input.last_modified_at,
    api_version: input.api_version
  };
};

function postTerminalUsageSyncService(fastify) {
  return async ({ input }) => {
    const { terminal, terminal_usage } = input;
    const { createTerminalUsage, getTerminalUsage } = TerminalUsageRepo();
    const { updateTerminal } = TerminalRepo();

    const { terminal_usage_id } = terminal_usage;
    const [terminalUsage] = await getTerminalUsage.call(fastify.knex, {
      filters: { where: { terminal_usage_id } }
    });

    const lastModifiedAt = terminalUsage?.last_modified_at;

    if (lastModifiedAt && moment(lastModifiedAt).isAfter(moment(terminal_usage.last_modified_at))) {
      return SUCCESS_RESPONSE;
    }

    const terminalFilters = {
      [TERMINAL.COLUMNS.OUTLET_ID]: terminal_usage.outlet_id,
      [TERMINAL.COLUMNS.TERMINAL_ID]: terminal_usage.terminal_id
    };

    const { status, last_usage, last_modified_at } = terminal;

    const mappedTerminal = {
      [TERMINAL.COLUMNS.STATUS]: status,
      [TERMINAL.COLUMNS.LAST_USAGE]: last_usage,
      [TERMINAL.COLUMNS.LAST_MODIFIED_AT]: last_modified_at
    };

    await updateTerminal.call(fastify.knex, {
      input: { filters: { where: terminalFilters }, terminal: mappedTerminal }
    });

    const mappedTerminalUsage = mapTerminalUsage({ input: terminal_usage });
    await createTerminalUsage.call(fastify.knex, { input: mappedTerminalUsage });
    return SUCCESS_RESPONSE;
  };
}

module.exports = postTerminalUsageSyncService;
