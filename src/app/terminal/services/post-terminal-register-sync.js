const moment = require("moment");
const { SUCCESS_RESPONSE } = require("../commons/constants");
const { TerminalRegisterRepo } = require("../repository/terminal-register");

const mapTerminalRegister = ({ input }) => {
  return {
    register_id: input.register_id,
    outlet_id: input.outlet_id,
    terminal_id: input.terminal_id,
    register_status: input.register_status,
    action_at: input.action_at,
    float_cash: input.float_cash,
    closing_float_cash: input.closing_float_cash,
    register_transaction_summary: JSON.stringify(input.register_transaction_summary),
    register_open_by: input.register_open_by,
    register_open_at: input.register_open_at,
    register_close_by: input.register_close_by,
    register_close_at: input.register_close_at,
    register_hold: input.register_hold,
    forced_close_by: input.forced_close_by,
    created_at: input.created_at,
    created_by: input.created_by,
    last_modified_at: input.last_modified_at,
    last_modified_by: input.last_modified_by,
    api_version: input.api_version,
    register_transaction_id: input.register_transaction_id
  };
};

function postTerminalRegisterSyncService(fastify) {
  return async ({ input }) => {
    const { createTerminalRegister, getTerminalRegister } = TerminalRegisterRepo();
    const { register_id } = input;
    const [terminalRegister] = await getTerminalRegister.call(fastify.knex, {
      filters: { where: { register_id } }
    });

    const lastModifiedAt = terminalRegister?.last_modified_at;

    if (lastModifiedAt && moment(lastModifiedAt).isAfter(moment(input.last_modified_at))) {
      return SUCCESS_RESPONSE;
    }
    const mappedTerminalRegister = mapTerminalRegister({ input });
    await createTerminalRegister.call(fastify.knex, { input: mappedTerminalRegister });
    return SUCCESS_RESPONSE;
  };
}

module.exports = postTerminalRegisterSyncService;
