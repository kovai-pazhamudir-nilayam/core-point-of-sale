const { OK } = require("http-status-codes").StatusCodes;
const { decodeEventData } = require("../../commons/helpers");
const { fulfilmentOrderCreatedEventService } = require("../services");

function orderEventsHandler(fastify) {
  return async (request, reply) => {
    const { body, logTrace } = request;
    const data = decodeEventData({ input: body });
    const eventHandlers = {
      "FULFILMENT-ORDER": {
        "ORDER-CREATED": fulfilmentOrderCreatedEventService(fastify)
      }
    };

    const { attributes } = body.message;
    const eventHandler = eventHandlers[attributes?.entity_type]?.[attributes?.event_type];

    if (eventHandler) return eventHandler.call(this, { logTrace, input: data });
    return reply.code(OK).send({ success: false });
  };
}

module.exports = orderEventsHandler;
