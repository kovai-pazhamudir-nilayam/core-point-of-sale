const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getTerminalRegisterByTerminalId = {
  tags: ["Terminal-Register"],
  summary: "This API is to Get Terminal Register By Register Id",
  headers: { $ref: "request-headers#" },
  params: {
    type: "object",
    required: ["terminal_id"],
    additionalProperties: false,
    properties: {
      terminal_id: { type: "string", minLength: 1 }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        outlet_id: { type: "string" },
        terminal_id: { type: "string" },
        register_id: { type: "string" },
        register_transaction_id: { type: "string" },
        user_id: { type: "string" },
        user_name: { type: "string" }
      }
    },
    ...errorSchemas
  }
};

module.exports = getTerminalRegisterByTerminalId;
