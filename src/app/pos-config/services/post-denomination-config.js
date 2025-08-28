const { v5: uuidV5 } = require("uuid");
const { SUCCESS_RESPONSE } = require("../../outlet-config/commons/constants");
const { DenominationConfigRepo } = require("../repository/denomination-config");
const { apiToDb } = require("../mappers/audit-mapper");
const { emitDenominationConfigEventService } = require("./denomination-event");
const { POS_CONFIG_EVENT_TYPES } = require("../commons/constants");

function postDenominationConfigService(fastify) {
  const { createDenominationConfig } = DenominationConfigRepo();
  const emitDenominationConfigEvent = emitDenominationConfigEventService(fastify);
  return async ({ body }) => {
    body.map(async ({ denomination_id, denomination_amount, type, audit, ...rest }) => {
      const denominationConfigId =
        denomination_id || uuidV5(`${denomination_amount}_${type}`, uuidV5.URL);

      const payload = {
        denomination_config_id: denominationConfigId,
        denomination_amount,
        type,
        ...rest,
        ...apiToDb({ audit })
      };
      await createDenominationConfig.call(fastify.knex, { input: payload });
      return SUCCESS_RESPONSE;
    });
    emitDenominationConfigEvent({
      eventType: POS_CONFIG_EVENT_TYPES.POS_CONFIGURATION_UPDATED
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = postDenominationConfigService;
