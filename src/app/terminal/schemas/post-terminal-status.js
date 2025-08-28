const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postTerminalStatus = {
  tags: ["Terminal"],
  summary: "This API is to Create Terminal Usage",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["outlet_id", "terminal_id", "status"],
    additionalProperties: false,
    properties: {
      outlet_id: { type: "string", minLength: 1 },
      terminal_id: { type: "string", minLength: 1 },
      status: { type: "string", enum: ["SUSPENDED", "BUSY", "AVAILABLE"] },
      audit: { $ref: "response-audit#" }
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

module.exports = postTerminalStatus;
