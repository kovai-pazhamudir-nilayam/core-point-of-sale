const { TerminalRegisterRepo, TERMINAL_REGISTER } = require("../repository/terminal-register");

function postTerminalRegisterReconFetchService(fastify) {
  const { getTerminalRegister } = TerminalRegisterRepo();

  return async ({ body }) => {
    // eslint-disable-next-line no-unused-vars
    const { outlet_id, date_from, date_to } = body;

    const repoResponse = await getTerminalRegister.call(fastify.knex, {
      filters: {
        where: {
          [TERMINAL_REGISTER.COLUMNS.OUTLET_ID]: outlet_id
          // [TERMINAL_REGISTER.COLUMNS.TERMINAL_ID]: date_from,
          // [TERMINAL_REGISTER.COLUMNS.TERMINAL_ID]: date_to
        }
      }
    });

    return repoResponse;
  };
}
module.exports = postTerminalRegisterReconFetchService;
