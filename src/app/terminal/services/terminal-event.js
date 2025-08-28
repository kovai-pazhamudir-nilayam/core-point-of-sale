const { logger } = require("../../utils/logger");
const { TerminalRepo, TERMINAL } = require("../repository/terminal");
const { TerminalRegisterRepo, TERMINAL_REGISTER } = require("../repository/terminal-register");
const { TerminalUsageRepo, TERMINAL_USAGE } = require("../repository/terminal-usage");

function emitTerminalEventService(fastify) {
  const { getTerminal } = TerminalRepo(fastify);

  return async ({ terminalId, outletId, eventType }) => {
    try {
      const terminalFilters = {
        [TERMINAL.COLUMNS.TERMINAL_ID]: terminalId,
        [TERMINAL.COLUMNS.OUTLET_ID]: outletId
      };
      const [terminalResponse] = await getTerminal.call(fastify.knex, {
        filters: { where: terminalFilters }
      });

      await fastify.publishEvent({
        data: terminalResponse,
        event_info: {
          entity_type: "TERMINAL",
          event_type: eventType,
          topic_name: fastify.config.POINT_OF_SALE_EVENT_TOPIC,
          outlet_id: terminalResponse.outlet_id
        }
      });

      if (fastify.config.IS_AUDIT_ENALBLED) {
        const { created_at, created_by, last_modified_at, last_modified_by, ...rest } =
          terminalResponse;
        const event_data = {
          updated_by: last_modified_by || created_by,
          updated_at: last_modified_at || created_at,
          ...rest
        };
        await fastify.publishEvent({
          data: event_data,
          event_info: {
            entity_type: "TERMINAL",
            event_type: eventType,
            topic_name: fastify.config.AUDIT_EVENT_TOPIC,
            outlet_id: terminalResponse.outlet_id
          }
        });
      }
    } catch (error) {
      logger.error({
        message: "Error While Raising Event For Terminal",
        error
      });
    }
  };
}

function emitTerminalRegisterEventService(fastify) {
  const { getTerminalRegister } = TerminalRegisterRepo(fastify);

  return async ({ terminalRegisterId, eventType }) => {
    try {
      const terminalRegisterFilters = {
        [TERMINAL_REGISTER.COLUMNS.REGISTER_ID]: terminalRegisterId
      };
      const [terminalRegisterResponse] = await getTerminalRegister.call(fastify.knex, {
        filters: { where: terminalRegisterFilters }
      });

      await fastify.publishEvent({
        data: terminalRegisterResponse,
        event_info: {
          entity_type: "TERMINAL_REGISTER",
          event_type: eventType,
          topic_name: fastify.config.POINT_OF_SALE_EVENT_TOPIC,
          outlet_id: terminalRegisterResponse.outlet_id
        }
      });
    } catch (error) {
      logger.error({
        message: "Error While Raising Event For Terminal Register",
        error
      });
    }
  };
}

function emitTerminalUsageEventService(fastify) {
  const { getTerminalUsage } = TerminalUsageRepo(fastify);

  return async ({ eventType, terminalUsageId, terminal }) => {
    try {
      const terminalUsageFilters = {
        [TERMINAL_USAGE.COLUMNS.TERMINAL_USAGE_ID]: terminalUsageId
      };
      const [terminalUsage] = await getTerminalUsage.call(fastify.knex, {
        filters: { where: terminalUsageFilters }
      });

      await fastify.publishEvent({
        data: { terminal_usage: terminalUsage, terminal, outlet_id: terminalUsage.outlet_id },
        event_info: {
          entity_type: "TERMINAL_USAGE",
          event_type: eventType,
          topic_name: fastify.config.POINT_OF_SALE_EVENT_TOPIC,
          outlet_id: terminalUsage.outlet_id
        }
      });
    } catch (error) {
      logger.error({
        message: "Error While Raising Event For Terminal Usage",
        error
      });
    }
  };
}

module.exports = {
  emitTerminalEventService,
  emitTerminalRegisterEventService,
  emitTerminalUsageEventService
};
