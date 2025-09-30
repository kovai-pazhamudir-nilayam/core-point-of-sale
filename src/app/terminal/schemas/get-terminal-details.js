const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getTerminalDetails = {
  tags: ["Terminal"],
  summary: "This API is to get terminal by mac_address",
  headers: { $ref: "request-headers#" },
  params: {
    type: "object",
    additionalProperties: false,
    properties: {
      mac_address: { type: "string", minLength: 1 }
    }
  },

  response: {
    200: {
      type: "object",
      additionalProperties: false,
      properties: {
        outlet_id: { type: "string" },
        terminal_id: { type: "string", default: "" },
        mac_address: { type: "string" },
        terminal_name: { type: "string", default: "" },
        environment: { type: "string" },
        deployment_type: { type: "string" },
        audit: { $ref: "response-audit#" }
      }
    },
    ...errorSchemas
  }
};

module.exports = getTerminalDetails;
