const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postDenominationConfig = {
  tags: ["Pos-Config"],
  summary: "This API is to post denomination config",
  headers: { $ref: "request-headers#" },
  body: {
    type: "array",
    items: {
      type: "object",
      required: ["denomination_amount", "type"],
      additionalProperties: false,
      properties: {
        denomination_config_id: { type: "string", format: "uuid" },
        denomination_amount: { type: "number" },
        type: { type: "string", enum: ["NOTE", "COIN"] },
        is_active: { type: "boolean", default: true },
        audit: {
          type: "object",
          properties: {
            created_by: { type: "string" },
            last_modified_by: { type: "string" }
          }
        }
      }
    }
  },

  response: {
    201: {
      type: "object",
      properties: { success: { type: "boolean" } }
    },
    ...errorSchemas
  }
};

module.exports = postDenominationConfig;
