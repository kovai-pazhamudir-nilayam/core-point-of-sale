const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const orderEvents = {
  tags: ["Order Events"],
  summary: "This API is to consume order events",
  body: {
    type: "object",
    additionalProperties: true,
    properties: {
      message: {
        type: "object",
        properties: {
          publishTime: { type: "string" },
          attributes: {
            type: "object",
            properties: {
              event_type: { type: "string" },
              entity_type: { type: "string" },
              event_id: { type: "string" },
              entity_id: { type: "string" },
              datetime: { type: "string" }
            }
          },
          message_id: { type: "string" },
          publish_time: { type: "string" },
          data: { type: "string" },
          messageId: { type: "string" }
        }
      },
      subscription: { type: "string" },
      deliveryAttempt: { type: "number" }
    }
  },
  response: {
    200: {
      properties: { success: { type: "boolean" } }
    },
    204: { type: "null", description: "No Content" },
    ...errorSchemas
  }
};

module.exports = orderEvents;
