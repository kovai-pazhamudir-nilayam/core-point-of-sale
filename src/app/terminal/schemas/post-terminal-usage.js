const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postTerminalUsage = {
  tags: ["Terminal"],
  summary: "This API is to Create Terminal Usage",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["outlet_id", "terminal_id", "user_id", "pos_mode", "action"],
    additionalProperties: false,
    properties: {
      terminal_usage_id: { type: "string" },
      outlet_id: { type: "string", minLength: 1 },
      terminal_id: { type: "string", minLength: 1 },
      user_id: { type: "string", minLength: 1, format: "uuid" },
      pos_mode: { type: "string" },
      action: { type: "string", enum: ["LOGIN", "LOGOUT", "FORCED_LOGOUT", "HOLD", "RESUME"] },
      forced_logout_by: { type: "string", format: "uuid", minLength: 1 },
      audit: { $ref: "response-audit#" }
    }
  },

  response: {
    201: {
      type: "object",
      properties: { terminal_usage_id: { type: "string" } }
    },
    ...errorSchemas
  }
};

module.exports = postTerminalUsage;
