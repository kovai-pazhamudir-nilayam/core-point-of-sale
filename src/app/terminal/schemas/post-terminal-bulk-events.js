const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postTerminalBulkEventsSchema = {
  tags: ["TERMINAL"],
  summary: "This API is to raise bulk events for Terminal",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    additionalProperties: false,
    properties: {
      terminal_ids: {
        type: "array",
        minItems: 1,
        uniqueItems: true,
        maxItems: 1000,
        items: {
          type: "string",
          minLength: 1
        }
      },
      outlet_ids: {
        type: "array",
        uniqueItems: true,
        maxItems: 1000,
        items: {
          type: "string"
        }
      }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" }
      }
    },
    ...errorSchemas
  }
};

module.exports = postTerminalBulkEventsSchema;
