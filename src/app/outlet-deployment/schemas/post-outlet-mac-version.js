const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postOutletMacVersion = {
  tags: ["Outlet Deployment"],
  summary: "This API is to Create Outlet mac version deployment",
  body: {
    type: "object",
    required: ["outlet_id", "type", "mac_address", "deployment_hash"],
    additionalProperties: false,
    properties: {
      outlet_id: { type: "string" },
      type: { type: "string", enum: ["SERVER", "CLIENT", "UI"] },
      mac_address: { type: "string" },
      service: { type: "string" },
      deployment_hash: { type: "string" },
      version: { type: "string" },
      terminal_id: { type: "string" },
      audit: { $ref: "request-audit#" }
    },
    allOf: [
      {
        if: {
          properties: {
            type: { const: "SERVER" }
          }
        },
        then: {
          required: ["service"]
        }
      }
    ]
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

module.exports = postOutletMacVersion;
