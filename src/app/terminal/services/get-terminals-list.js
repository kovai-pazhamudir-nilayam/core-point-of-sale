const { TerminalRepo, TERMINAL } = require("../repository/terminal");

function getTerminalsListService(fastify) {
  const { getTerminalsGroupedByOutlet } = TerminalRepo();

  return async ({ query }) => {
    const { outlet_id } = query;

    // Get terminals grouped by outlet_id
    const terminalFilters = {};

    if (outlet_id) {
      terminalFilters.where = {
        [TERMINAL.COLUMNS.OUTLET_ID]: outlet_id
      };
    }

    const groupedTerminals = await getTerminalsGroupedByOutlet.call(fastify.knex, {
      filters: terminalFilters
    });

    return groupedTerminals;
  };
}

module.exports = getTerminalsListService;
