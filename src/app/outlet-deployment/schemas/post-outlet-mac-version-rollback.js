const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postOutletMacVersionRollback = {
  tags: ["Outlet Deployment"],
  summary: "This API is to rollbacked outlet mac version from history",
  body: {
    type: "object",
    required: ["outlet_mac_version_history_id", "audit"],
    additionalProperties: false,
    properties: {
      outlet_mac_version_history_id: { type: "string", format: "uuid" },
      audit: { $ref: "request-audit#" }
    }
  },
  response: {
    200: {
      type: "object",
      properties: { success: { type: "boolean" } }
    },
    ...errorSchemas
  }
};

module.exports = postOutletMacVersionRollback;
