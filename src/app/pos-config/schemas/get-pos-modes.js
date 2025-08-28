const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getPosModes = {
  tags: ["Pos-Config"],
  summary: "This API is to get pos modes",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",

    additionalProperties: false,

    properties: {
      mode: { type: "string", minLength: 1 }
    }
  },

  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          pos_mode: { type: "string" },
          category_ids: {
            type: "array",
            items: {
              type: "string"
            }
          }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = getPosModes;
