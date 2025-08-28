const _ = require("lodash");
const { TerminalRepo, TERMINAL } = require("../repository/terminal");
const Errors = require("../../errorHandler/domain/errors");

function getTerminalUsageService(fastify) {
  const { getTerminal } = TerminalRepo();

  return async ({ query }) => {
    const { terminal_id, outlet_id } = query;

    const repoResponse = await getTerminal.call(fastify.knex, {
      filters: {
        where: {
          [TERMINAL.COLUMNS.TERMINAL_ID]: terminal_id,
          [TERMINAL.COLUMNS.OUTLET_ID]: outlet_id
        }
      },
      fieldsToReturn: TERMINAL.COLUMNS.LAST_USAGE
    });

    if (_.isEmpty(repoResponse)) {
      throw Errors.TerminalNotFoundError();
    }

    const { last_usage } = repoResponse[0];

    return {
      terminal_id,
      outlet_id,
      ...last_usage
    };
  };
}
module.exports = getTerminalUsageService;
