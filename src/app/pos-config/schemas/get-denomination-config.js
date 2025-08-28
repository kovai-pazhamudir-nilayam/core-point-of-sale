const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getDenominationConfig = {
  tags: ["Pos-Config"],
  summary: "This API is to get denomination config",
  headers: { $ref: "request-headers#" },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          denomination_config_id: { type: "string", format: "uuid" },
          denomination_amount: { type: "number" },
          type: { type: "string" },
          is_active: { type: "boolean" },
          audit: {
            type: "object",
            properties: {
              created_by: { type: "string" },
              created_at: { type: "string", format: "date-time" },
              last_modified_by: { type: "string" },
              last_modified_at: { type: "string", format: "date-time" },
              api_version: { type: "string" }
            }
          }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = getDenominationConfig;
