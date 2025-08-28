const _ = require("lodash");
const mapper = require("object-mapper");
const { apiToDb } = require("../mappers/audit-mapper");
const { TERMINAL_USAGE_TERMINAL_STATUS_MAPPER } = require("../commons/constants");

const terminalStatusMapping = {
  "terminalUsage.terminal_usage_id": "last_usage.terminal_usage_id",
  "terminalUsage.user_id": "last_usage.user_id",
  "terminalUsage.logged_in_at": "last_usage.logged_in_at",
  "terminalUsage.logged_out_at": "last_usage.logged_out_at",
  last_usage: {
    key: "last_usage?",
    // eslint-disable-next-line consistent-return
    transform: (lastUsgae, src) => {
      if (_.isEmpty(src.terminalUsage)) return null;
    }
  },
  "input.action": {
    key: "status",
    transform: action => TERMINAL_USAGE_TERMINAL_STATUS_MAPPER[action]
  }
};

const mapTerminalStatus = ({ input, terminalUsage }) => {
  return {
    ...mapper({ input, terminalUsage }, terminalStatusMapping),
    ...apiToDb({ audit: input.audit })
  };
};

const mapTerminalAndTerminalRegister = ({ terminalResponse, terminalRegisterResponse }) => {
  const mappedTerminalRegisterWithTerminalId = terminalRegisterResponse.reduce((acc, curr) => {
    if (!acc[curr.terminal_id]) {
      acc[curr.terminal_id] = curr;
    }
    return acc;
  }, {});

  const terminal = terminalResponse.map(ele => {
    const { last_usage, created_at, created_by, last_modified_at, last_modified_by } = ele;
    return {
      ...ele,
      terminal_register: mappedTerminalRegisterWithTerminalId[ele.terminal_id]
        ? {
            register_id: mappedTerminalRegisterWithTerminalId[ele.terminal_id].register_id,
            register_transaction_id:
              mappedTerminalRegisterWithTerminalId[ele.terminal_id].register_transaction_id
          }
        : null,
      user_id: last_usage?.user_id || null,
      logged_in_at: last_usage?.logged_in_at || null,
      audit: {
        created_at,
        created_by,
        last_modified_at,
        last_modified_by
      }
    };
  });

  return terminal;
};

module.exports = { mapTerminalStatus, mapTerminalAndTerminalRegister };
