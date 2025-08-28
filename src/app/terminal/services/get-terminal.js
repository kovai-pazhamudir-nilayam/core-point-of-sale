const _ = require("lodash");
const Errors = require("../../errorHandler/domain/errors");
const { TerminalRepo, TERMINAL } = require("../repository/terminal");

function getTerminalService(fastify) {
  const { getTerminal } = TerminalRepo();

  return async ({ query }) => {
    const { terminal_id, outlet_id } = query;

    const repoResponse = await getTerminal.call(fastify.knex, {
      filters: {
        where: {
          [TERMINAL.COLUMNS.OUTLET_ID]: outlet_id,
          [TERMINAL.COLUMNS.TERMINAL_ID]: terminal_id
        }
      }
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
