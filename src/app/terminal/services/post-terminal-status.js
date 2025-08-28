const _ = require("lodash");
const errors = require("../../errorHandler/domain/errors");
const { SUCCESS_RESPONSE } = require("../../outlet-config/commons/constants");
const { TerminalRepo, TERMINAL } = require("../repository/terminal");

function postTerminalStatusService(fastify) {
  const { updateTerminal } = TerminalRepo();

  return async ({ body }) => {
    const { outlet_id, terminal_id, status } = body;

    const repoResponse = await updateTerminal.call(fastify.knex, {
      filters: {
        where: {
          [TERMINAL.COLUMNS.OUTLET_ID]: outlet_id,
          [TERMINAL.COLUMNS.TERMINAL_ID]: terminal_id
        }
      },
      input: { status }
    });

    if (_.isEmpty(repoResponse)) {
      throw errors.TerminalNotFoundError();
    }

    return SUCCESS_RESPONSE;
  };
}
module.exports = postTerminalStatusService;
