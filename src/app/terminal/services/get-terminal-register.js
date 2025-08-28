const { TerminalRegisterRepo, TERMINAL_REGISTER } = require("../repository/terminal-register");

function getTerminalRegisterService(fastify) {
  const { getTerminalRegister } = TerminalRegisterRepo();

  return async ({ query }) => {
    const { register_id } = query;

    const repoResponse = await getTerminalRegister.call(fastify.knex, {
      filters: {
        where: {
          [TERMINAL_REGISTER.COLUMNS.REGISTER_ID]: register_id
        }
      }
    });

    return repoResponse[0];
  };
}
module.exports = getTerminalRegisterService;
