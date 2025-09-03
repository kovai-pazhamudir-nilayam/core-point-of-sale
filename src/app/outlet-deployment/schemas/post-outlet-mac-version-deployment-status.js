const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postOutletMacVersionDeploymentStatus = {
  tags: ["Outlet Deployment"],
  summary: "Update deployment status for outlet mac version",
  body: {
    type: "object",
    required: ["mac_address", "status"],
    additionalProperties: false,
    properties: {
      mac_address: { type: "string", minLength: 1 },
      status: {
        type: "string",
        enum: ["PENDING", "SUCCEEDED", "FAILED"],
        description: "Deployment status"
      }
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

module.exports = postOutletMacVersionDeploymentStatus;
