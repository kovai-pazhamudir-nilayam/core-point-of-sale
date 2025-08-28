const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postTerminalUsageSync = {
  tags: ["Terminal"],
  summary: "This API is to Sync Terminal Usage ",
  body: {
    type: "object",
    required: ["terminal", "terminal_usage"],
    additionalProperties: false,
    properties: {
      terminal: { type: "object", additionalProperties: true },
      terminal_usage: {
        type: "object",
        required: ["outlet_id", "terminal_id", "terminal_usage_id"],
        additionalProperties: true,
        properties: {
          outlet_id: { type: "string" },
          terminal_id: { type: "string" },
          terminal_usage_id: { type: "string", format: "uuid" }
        }
      },
      terminal_usage_id: { type: "string", format: "uuid" }
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

module.exports = postTerminalUsageSync;
