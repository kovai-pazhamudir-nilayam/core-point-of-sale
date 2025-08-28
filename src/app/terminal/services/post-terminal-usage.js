const _ = require("lodash");
const { TerminalRepo, TERMINAL } = require("../repository/terminal");
const { TerminalUsageRepo, TERMINAL_USAGE } = require("../repository/terminal-usage");
const { OutletConfigRepo, OUTLET_CONFIG } = require("../../outlet-config/repository/outlet-config");
const { mapTerminalUsageByAction } = require("../transformers/terminal-usage");
const Errors = require("../../errorHandler/domain/errors");
const {
  TERMINAL_STATUS: { AVAILABLE, BUSY, SUSPENDED },
  TERMINAL_USAGE_ACTION: { LOGIN, LOGOUT, FORCED_LOGOUT },
  TERMINAL_REGISTER_STATUS,
  TERMINAL_USAGE_EVENT_TYPES
} = require("../commons/constants");
const { mapTerminalStatus } = require("../transformers/terminal");
const { TerminalRegisterRepo } = require("../repository/terminal-register");
const { emitTerminalUsageEventService } = require("./terminal-event");

// eslint-disable-next-line complexity
const loginTerminalUsage = async ({ fastify, input, terminal, terminalUsage }) => {
  const { updateTerminal } = TerminalRepo();
  const { createTerminalUsage } = TerminalUsageRepo();
  const emitTerminalUsageEvent = emitTerminalUsageEventService(fastify);

  const { user_id, outlet_id, terminal_id } = input;
  const { status, last_usage } = terminal;

  if (
    (terminalUsage &&
      input.terminal_usage_id &&
      terminalUsage.terminal_usage_id === input.terminal_usage_id) ||
    (terminalUsage &&
      status === BUSY &&
      user_id === last_usage.user_id &&
      terminal_id === terminal.terminal_id &&
      outlet_id === terminal.outlet_id)
  ) {
    return { terminal_usage_id: terminalUsage?.terminal_usage_id };
  }

  if (
    user_id === terminalUsage?.user_id &&
    outlet_id === terminalUsage?.outlet_id &&
    terminal_id !== terminalUsage?.terminal_id
  ) {
    throw Errors.AlreadyLoggedInTerminalError({ terminal_id: terminalUsage?.terminal_id });
  }

  if ([BUSY, SUSPENDED].includes(status)) throw Errors.TerminalSelectionError();

  const mappedTerminalUsage = mapTerminalUsageByAction({ input });
  const terminalUsageResponse = await createTerminalUsage.call(fastify.knex, {
    input: mappedTerminalUsage
  });

  const mappedTerminal = mapTerminalStatus({ input, terminalUsage: terminalUsageResponse });
  const updateTerminalFilters = {
    where: {
      [TERMINAL.COLUMNS.OUTLET_ID]: outlet_id,
      [TERMINAL.COLUMNS.TERMINAL_ID]: terminal_id
    }
  };

  const updatedTerminal = await updateTerminal.call(fastify.knex, {
    input: { filters: updateTerminalFilters, terminal: mappedTerminal }
  });

  emitTerminalUsageEvent({
    terminalUsageId: terminalUsageResponse.terminal_usage_id,
    terminal: updatedTerminal,
    eventType: TERMINAL_USAGE_EVENT_TYPES.TERMINAL_USAGE_UPDATED
  });
  return { terminal_usage_id: terminalUsageResponse.terminal_usage_id };
};

const logoutTerminalUsage = async ({ fastify, input, terminal, terminalUsage }) => {
  const { OUTLET_ID, TERMINAL_ID } = TERMINAL.COLUMNS;
  const { updateTerminal } = TerminalRepo();
  const { updateTerminalUsage } = TerminalUsageRepo();
  const { getOutletConfig } = OutletConfigRepo();
  const { getTerminalRegister } = TerminalRegisterRepo();
  const emitTerminalUsageEvent = emitTerminalUsageEventService(fastify);

  const { outlet_id, terminal_id } = input;
  const { status } = terminal;
  if ([AVAILABLE].includes(status)) throw Errors.ActionNotAllowedError();

  const getOutletConfigFilters = {
    where: { [OUTLET_CONFIG.COLUMNS.OUTLET_ID]: outlet_id }
  };
  const [outletConfig] = await getOutletConfig.call(fastify.knex, {
    filters: getOutletConfigFilters
  });

  const terminalRegister = await getTerminalRegister.call(fastify.knex, {
    filters: {
      where: { terminal_id, outlet_id, register_status: TERMINAL_REGISTER_STATUS.OPEN }
    }
  });

  const register_status = _.get(terminalRegister[0], "register_status");
  if (
    register_status === TERMINAL_REGISTER_STATUS.OPEN &&
    outletConfig.mandate_register_close_on_logout === "ENABLED"
  )
    throw Errors.TerminalRegisterOpenError();

  const { terminal_usage_id } = terminalUsage;

  const mappedTerminalUsage = mapTerminalUsageByAction({ input });
  const updatedTerminalUsageFilters = { where: { terminal_usage_id } };
  await updateTerminalUsage.call(fastify.knex, {
    input: { filters: updatedTerminalUsageFilters, terminalUsage: mappedTerminalUsage }
  });

  const mappedTerminal = mapTerminalStatus({ input });
  const updateTerminalFilters = {
    where: { [OUTLET_ID]: outlet_id, [TERMINAL_ID]: terminal_id }
  };
  const updatedTerminal = await updateTerminal.call(fastify.knex, {
    input: { terminal: mappedTerminal, filters: updateTerminalFilters }
  });

  emitTerminalUsageEvent({
    terminalUsageId: terminal_usage_id,
    terminal: updatedTerminal,
    eventType: TERMINAL_USAGE_EVENT_TYPES.TERMINAL_USAGE_UPDATED
  });

  return { terminal_usage_id };
};

const TERMINAL_USAGE_ACTION_MAPPER = {
  [LOGIN]: loginTerminalUsage,
  [LOGOUT]: logoutTerminalUsage,
  [FORCED_LOGOUT]: logoutTerminalUsage
};

function postTerminalUsageService(fastify) {
  return async ({ input }) => {
    const { OUTLET_ID, TERMINAL_ID } = TERMINAL.COLUMNS;
    const { USER_ID, LOGGED_IN_AT, LOGGED_OUT_AT } = TERMINAL_USAGE.COLUMNS;
    const { getTerminal } = TerminalRepo();
    const { getTerminalUsage } = TerminalUsageRepo();

    const { outlet_id, terminal_id, user_id, action } = input;

    const terminals = await getTerminal.call(fastify.knex, {
      filters: { where: { [OUTLET_ID]: outlet_id, [TERMINAL_ID]: terminal_id } },
      fieldsToReturn: [
        TERMINAL.COLUMNS.STATUS,
        TERMINAL.COLUMNS.LAST_USAGE,
        TERMINAL.COLUMNS.TERMINAL_ID,
        TERMINAL.COLUMNS.OUTLET_ID
      ]
    });
    if (_.isEmpty(terminals)) throw Errors.TerminalNotFoundError();

    const [terminal] = terminals;

    const terminalUsageFilters = {
      where: { [USER_ID]: user_id, [LOGGED_OUT_AT]: null },
      whereNotNull: LOGGED_IN_AT
    };
    const [terminalUsage] = await getTerminalUsage.call(fastify.knex, {
      filters: terminalUsageFilters
    });

    const response = await TERMINAL_USAGE_ACTION_MAPPER[action]({
      fastify,
      input,
      terminal,
      terminalUsage
    });

    return response;
  };
}

module.exports = postTerminalUsageService;
