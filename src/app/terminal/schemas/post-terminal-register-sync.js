const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postTerminalRegisterSync = {
  tags: ["Terminal-Register"],
  summary: "This API is to Sync Terminal Register ",
  body: {
    type: "object",
    additionalProperties: true,
    required: ["outlet_id", "terminal_id", "register_id"],
    properties: {
      outlet_id: { type: "string" },
      terminal_id: { type: "string" },
      register_id: { type: "string", format: "uuid" }
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

module.exports = postTerminalRegisterSync;
