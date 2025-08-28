const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postOutletConfigBulkEventsSchema = {
  tags: ["OUTLET"],
  summary: "This API is to raise bulk events for Outlet Config",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    additionalProperties: false,
    properties: {
      outlet_ids: {
        type: "array",
        minItems: 1,
        uniqueItems: true,
        maxItems: 1000,
        items: {
          type: "string",
          minLength: 1
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

module.exports = postOutletConfigBulkEventsSchema;
