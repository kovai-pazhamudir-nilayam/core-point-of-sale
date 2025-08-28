const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postFeatureConfigurationCloneSchema = {
  tags: ["Feature-Config"],
  summary: "This API is to clone Feature Configuration",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["from_outlet", "to_outlet", "audit"],
    properties: {
      from_outlet: { type: "string" },
      to_outlet: { type: "string" },
      audit: { $ref: "request-audit#", required: ["created_by"] }
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

module.exports = postFeatureConfigurationCloneSchema;
