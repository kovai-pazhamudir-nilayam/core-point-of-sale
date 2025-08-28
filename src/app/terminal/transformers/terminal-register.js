const mapper = require("object-mapper");
const { getCurrentTimeStamp, apiToDb, updatedAudit } = require("../mappers/audit-mapper");
const { TERMINAL_REGISTER_STATUS } = require("../commons/constants");

const terminalRegisterOpenMapping = {
  "input.outlet_id": "outlet_id",
  "input.register_id": "register_id",
  "input.register_transaction_id": "register_transaction_id",
  "input.terminal_id": "terminal_id",
  register_status: { key: "register_status", transform: () => TERMINAL_REGISTER_STATUS.OPEN },
  action_at: {
    key: "action_at",
    transform: () => getCurrentTimeStamp()
  },
  "input.float_cash": "float_cash",
  "input.user_id": "register_open_by",
  register_open_at: {
    key: "register_open_at",
    transform: () => getCurrentTimeStamp()
  },
  register_transaction_summary: {
    key: "register_transaction_summary",
    transform: () => JSON.stringify([])
  }
};

const terminalRegisterCloseMapping = {
  register_status: { key: "register_status", transform: () => TERMINAL_REGISTER_STATUS.CLOSE },
  action_at: {
    key: "action_at",
    transform: () => getCurrentTimeStamp()
  },
  "input.user_id": "register_close_by",
  register_close_at: {
    key: "register_close_at",
    transform: () => getCurrentTimeStamp()
  },
  "input.register_transaction_summary": {
    key: "register_transaction_summary",
    transform: transactionSummary => JSON.stringify(transactionSummary)
  },
  "input.closing_float_cash": "closing_float_cash"
};

const terminalRegisterHoldMapping = {
  register_status: { key: "register_status", transform: () => TERMINAL_REGISTER_STATUS.HOLD },
  action_at: {
    key: "action_at",
    transform: () => getCurrentTimeStamp()
  }
};

const terminalRegisterHoldAuditMapping = {
  "input.register_id": "register_id",
  "input.user_id": "register_hold_by",
  register_hold_at: {
    key: "register_hold_at",
    transform: () => getCurrentTimeStamp()
  }
};

const terminalRegisterResumeMapping = {
  register_status: { key: "register_status", transform: () => TERMINAL_REGISTER_STATUS.RESUME },
  action_at: {
    key: "action_at",
    transform: () => getCurrentTimeStamp()
  }
};

const terminalRegisterResumeAuditMapping = {
  "input.user_id": "register_resume_by",
  register_hold_at: {
    key: "register_resume_at",
    transform: () => getCurrentTimeStamp()
  }
};

const mapTerminalRegisterOpen = ({ input }) => {
  return {
    ...mapper({ input }, terminalRegisterOpenMapping),
    ...apiToDb({ audit: input.audit })
  };
};

const mapTerminalRegisterClose = ({ input }) => {
  return {
    ...mapper({ input }, terminalRegisterCloseMapping),
    ...apiToDb({ audit: input.audit })
  };
};

const mapTerminalRegisterHold = ({ input }) => {
  return {
    ...mapper({ input }, terminalRegisterHoldMapping),
    ...apiToDb({ audit: input.audit })
  };
};

const mapTerminalRegisterResume = ({ input }) => {
  return {
    ...mapper({ input }, terminalRegisterResumeMapping),
    ...apiToDb({ audit: input.audit })
  };
};

const mapTerminalRegisterHoldAudit = ({ input }) => {
  return {
    ...mapper({ input }, terminalRegisterHoldAuditMapping),
    ...apiToDb({})
  };
};

const mapTerminalRegisterResumeAudit = ({ input }) => {
  return {
    ...mapper({ input }, terminalRegisterResumeAuditMapping),
    ...updatedAudit({ updatedBy: input?.audit?.last_modified_by })
  };
};

module.exports = {
  mapTerminalRegisterOpen,
  mapTerminalRegisterClose,
  mapTerminalRegisterHold,
  mapTerminalRegisterResume,
  mapTerminalRegisterHoldAudit,
  mapTerminalRegisterResumeAudit
};
