const {
  TERMINAL_USAGE_ACTION: { LOGIN, LOGOUT, FORCED_LOGOUT }
} = require("../commons/constants");
const { getCurrentTimeStamp, apiToDb, updatedAudit } = require("../mappers/audit-mapper");

const loginAction = ({ input }) => {
  const currentTimeStamp = getCurrentTimeStamp();
  const { user_id, outlet_id, terminal_id, pos_mode } = input;
  return {
    terminal_usage_id: input?.terminal_usage_id,
    outlet_id,
    terminal_id,
    user_id,
    pos_mode,
    logged_in_at: currentTimeStamp,
    ...apiToDb({})
  };
};

const logoutAction = ({ input }) => {
  const { forced_logout_by } = input;
  const currentTimeStamp = getCurrentTimeStamp();
  return {
    logged_out_at: currentTimeStamp,
    forced_logout_by,
    ...updatedAudit({})
  };
};

const TERMINAL_USAGE_ACTION_MAPPER = {
  [LOGIN]: loginAction,
  [LOGOUT]: logoutAction,
  [FORCED_LOGOUT]: logoutAction
};

const mapTerminalUsageByAction = ({ input }) => {
  return TERMINAL_USAGE_ACTION_MAPPER[input.action]({ input });
};

module.exports = { mapTerminalUsageByAction };
