const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postOutletMacVersionBulk = {
  tags: ["Outlet Deployment"],
  summary: "Bulk create Outlet mac version deployments",
  body: {
    type: "object",
    required: ["outlets", "type", "deployment_hash", "audit"],
    additionalProperties: false,
    properties: {
      outlets: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          required: ["outlet_id", "mac_addresses"],
          additionalProperties: false,
          properties: {
            outlet_id: { type: "string" },
            mac_addresses: {
              type: "array",
              items: {
                type: "string"
              },
              minItems: 1
            }
          }
        }
      },
      type: { type: "string", enum: ["SERVER", "CLIENT", "UI"] },
      service: { type: "string" },
      deployment_hash: { type: "string" },
      version: { type: "string" },
      audit: { $ref: "request-audit#" }
    },
    allOf: [
      // If type = SERVER → service required
      {
        if: { properties: { type: { const: "SERVER" } } },
        then: { required: ["service"] }
      }
    ]
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

module.exports = postOutletMacVersionBulk;
