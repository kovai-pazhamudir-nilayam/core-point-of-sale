const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postPosModes = {
  tags: ["Pos-Config"],
  summary: "This API is to post pos mode",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["pos_mode", "category_ids"],
    additionalProperties: false,
    properties: {
      pos_mode: { type: "string", minLength: 1 },
      category_ids: {
        type: "array",
        minItems: 1,
        items: {
          type: "string"
        }
      }
    }
  },

  response: {
    201: {
      type: "object",
      properties: {
        success: { type: "boolean" }
      }
    },
    ...errorSchemas
  }
};

module.exports = postPosModes;
