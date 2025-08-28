const _ = require("lodash");
const Errors = require("../../errorHandler/domain/errors");
const {
  TerminalRegisterRepo,
  TERMINAL_REGISTER: { COLUMNS }
} = require("../repository/terminal-register");
const { TerminalRegisterHoldRepo } = require("../repository/terminal-register-hold");
const {
  mapTerminalRegisterOpen,
  mapTerminalRegisterClose,
  mapTerminalRegisterHold,
  mapTerminalRegisterHoldAudit,
  mapTerminalRegisterResume,
  mapTerminalRegisterResumeAudit
} = require("../transformers/terminal-register");
const {
  TERMINAL_REGISTER_STATUS,
  TERMINAL_REGISTER_EVENT_TYPES,
  SUCCESS_RESPONSE
} = require("../commons/constants");
const { emitTerminalRegisterEventService } = require("./terminal-event");

const openTerminalRegister = async ({ fastify, input, register }) => {
  const { createTerminalRegister } = TerminalRegisterRepo();
  const emitTerminalRegisterEvent = emitTerminalRegisterEventService(fastify);
  if (register) return register;
  const mappedTerminalRegister = mapTerminalRegisterOpen({ input });
  const createdTerminalRegister = await createTerminalRegister.call(fastify.knex, {
    input: mappedTerminalRegister
  });

  emitTerminalRegisterEvent({
    terminalRegisterId: createdTerminalRegister.register_id,
    eventType: TERMINAL_REGISTER_EVENT_TYPES.TERMINAL_REGISTER_UPDATED
  });

  return createdTerminalRegister;
};

const closeTerminalRegister = async ({ fastify, input, register }) => {
  const { updateTerminalRegister } = TerminalRegisterRepo();
  const emitTerminalRegisterEvent = emitTerminalRegisterEventService(fastify);
  const { register_id } = register;
  const updateWhereFilters = { register_id };
  const mappedTerminalRegister = mapTerminalRegisterClose({ input });
  const updatedTerminalRegister = await updateTerminalRegister.call(fastify.knex, {
    input: { filters: { where: updateWhereFilters }, terminalRegister: mappedTerminalRegister }
  });

  emitTerminalRegisterEvent({
    terminalRegisterId: updatedTerminalRegister.register_id,
    eventType: TERMINAL_REGISTER_EVENT_TYPES.TERMINAL_REGISTER_UPDATED
  });

  return SUCCESS_RESPONSE;
};

const holdTerminalRegister = async ({ fastify, input, register }) => {
  const { updateTerminalRegister } = TerminalRegisterRepo();
  const { createTerminalRegisterHold } = TerminalRegisterHoldRepo();
  const { register_id } = register;
  const updateWhereFilters = { register_id };
  const mappedTerminalRegister = mapTerminalRegisterHold({ input });
  const mappedTerminalRegisterHold = mapTerminalRegisterHoldAudit({ input });
  const updateTerminalRegisterPromise = updateTerminalRegister.call(fastify.knex, {
    input: { filters: { where: updateWhereFilters }, terminalRegister: mappedTerminalRegister }
  });
  const createTerminalRegisterHoldPromise = createTerminalRegisterHold.call(fastify.knex, {
    input: mappedTerminalRegisterHold
  });
  await Promise.all([updateTerminalRegisterPromise, createTerminalRegisterHoldPromise]);
  return register;
};

const resumeTerminalRegister = async ({ fastify, input, register }) => {
  const { updateTerminalRegister } = TerminalRegisterRepo();
  const { updateTerminalRegisterHold } = TerminalRegisterHoldRepo();
  const { register_id } = register;
  const updateWhereFilters = { register_id };
  const mappedTerminalRegister = mapTerminalRegisterResume({ input });
  const mappedTerminalRegisterResume = mapTerminalRegisterResumeAudit({ input });
  const updateTerminalRegisterPromise = updateTerminalRegister.call(fastify.knex, {
    input: { filters: { where: updateWhereFilters }, terminalRegister: mappedTerminalRegister }
  });
  const updateTerminalRegisterHoldPromise = updateTerminalRegisterHold.call(fastify.knex, {
    input: {
      filters: { where: { ...updateWhereFilters, register_resume_by: null } },
      terminalRegisterHold: mappedTerminalRegisterResume
    }
  });
  await Promise.all([updateTerminalRegisterPromise, updateTerminalRegisterHoldPromise]);
  return register;
};

// eslint-disable-next-line complexity
const validateRegisterAction = async ({ fastify, input }) => {
  const { getTerminalRegister } = TerminalRegisterRepo();
  const { outlet_id, terminal_id, register_id, register_action } = input;

  const getTerminalRegisterFilters = register_id
    ? { [COLUMNS.REGISTER_ID]: register_id }
    : {
        [COLUMNS.OUTLET_ID]: outlet_id,
        [COLUMNS.TERMINAL_ID]: terminal_id,
        [COLUMNS.REGISTER_STATUS]: TERMINAL_REGISTER_STATUS.OPEN
      };

  const terminalRegisters = await getTerminalRegister.call(fastify.knex, {
    filters: { where: getTerminalRegisterFilters }
  });
  const [register] = terminalRegisters;

  if (register_id && _.isEmpty(register) && register_action !== "OPEN")
    // TODO use constant
    throw Errors.TerminalRegisterNotFoundError();

  if (register_action === register?.register_status) return { register, is_valid: false };

  return { register, is_valid: true };
};

const REGISTER_ACTION_MAPPER = {
  OPEN: openTerminalRegister,
  CLOSE: closeTerminalRegister,
  HOLD: holdTerminalRegister,
  RESUME: resumeTerminalRegister
};

function postTerminalRegisterService(fastify) {
  return async ({ input }) => {
    const { register_action } = input;
    const { register, is_valid } = await validateRegisterAction({ fastify, input });
    if (!is_valid) return register;
    const terminalRegister = await REGISTER_ACTION_MAPPER[register_action]({
      fastify,
      input,
      register
    });
    return terminalRegister;
  };
}

module.exports = postTerminalRegisterService;
