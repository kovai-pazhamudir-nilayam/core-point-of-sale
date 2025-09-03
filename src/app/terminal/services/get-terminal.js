const _ = require("lodash");
const Errors = require("../../errorHandler/domain/errors");
const { TerminalRepo, TERMINAL } = require("../repository/terminal");

const getTerminalFilters = ({ input }) => {
  const { outlet_id, terminal_id, mac_address } = input;
  const filters = {};

  if (outlet_id && terminal_id) {
    filters[TERMINAL.COLUMNS.OUTLET_ID] = outlet_id;
    filters[TERMINAL.COLUMNS.TERMINAL_ID] = terminal_id;
  }
  if (mac_address) {
    filters[TERMINAL.COLUMNS.MAC_ADDRESS] = mac_address.toLowerCase();
  }

  return filters;
};

function getTerminalService(fastify) {
  const { getTerminal } = TerminalRepo();

  return async ({ query }) => {
    const terminalFilters = getTerminalFilters({ input: query });

    const repoResponse = await getTerminal.call(fastify.knex, {
      filters: { where: terminalFilters }
    });

    if (_.isEmpty(repoResponse)) {
      throw Errors.TerminalNotFoundError();
    }

    const { created_at, created_by, last_modified_at, last_modified_by, ...restRepoResponse } =
      repoResponse[0];

    return {
      ...restRepoResponse,
      audit: { created_at, created_by, last_modified_at, last_modified_by }
    };
  };
}
module.exports = getTerminalService;
