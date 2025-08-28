const { SUCCESS_RESPONSE, POS_CONFIG_EVENT_TYPES } = require("../commons/constants");
const { emitDenominationConfigEventService } = require("./denomination-event");

function denominationConfigBulkEventsService(fastify) {
  return async ({ body }) => {
    const emitDenominationConfigEvent = emitDenominationConfigEventService(fastify);

    const { outlet_ids } = body;

    emitDenominationConfigEvent({
      eventType: POS_CONFIG_EVENT_TYPES.POS_CONFIGURATION_BULK_DATA_UPDATE,
      outlet_ids
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = denominationConfigBulkEventsService;
