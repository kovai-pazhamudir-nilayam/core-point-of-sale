const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getTerminalsList = {
  tags: ["Terminal"],
  summary: "Get terminals grouped by outlet_id",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",
    additionalProperties: false,
    properties: {
      outlet_id: { type: "string", minLength: 1 }
    }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          outlet_id: { type: "string" },
          terminals: {
            type: "array",
            items: {
              type: "object",
              properties: {
                terminal_id: { type: "string" },
                terminal_name: { type: "string" },
                mac_address: { type: "string" },
                status: { type: "string" }
              }
            }
          }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = getTerminalsList;
