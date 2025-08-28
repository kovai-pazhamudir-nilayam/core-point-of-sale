const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getTerminalUsage = {
  tags: ["Terminal"],
  summary: "This API is to get terminal usage by outlet_id and terminal_id",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",
    required: ["outlet_id", "terminal_id"],
    additionalProperties: false,
    properties: {
      outlet_id: { type: "string", minLength: 1 },
      terminal_id: { type: "string", minLength: 1 }
    }
  },

  response: {
    200: {
      type: "object",
      properties: {
        outlet_id: { type: "string" },
        terminal_id: { type: "string" },
        user_id: { type: "string" },
        user_name: { type: "string" },
        pos_mode: { type: "string" },
        logged_in_at: { type: "string", format: "date-time" },
        logged_out_at: { type: "string" }
      }
    },
    ...errorSchemas
  }
};

module.exports = getTerminalUsage;
