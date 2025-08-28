const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const fetchOutletMacVersion = {
  tags: ["Outlet Deployment"],
  summary: "This API is to fetch Outlet mac version deployment",
  body: {
    type: "object",
    additionalProperties: true
  },
  response: {
    200: {
      type: "object",
      properties: {
        version: { type: "string" },
        deployment_hash: { type: "string" },
        outlet_id: { type: "string" },
        terminal_id: { type: "string" }
      }
    },
    ...errorSchemas
  }
};

module.exports = fetchOutletMacVersion;
