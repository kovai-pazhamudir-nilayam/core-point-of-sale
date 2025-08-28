const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postRolloutFeatureConfig = {
  tags: ["ROLLOUT-FEATURE-CONFIG"],
  summary: "This API is to upsert Rollout Feature Config",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["feature_name", "outlet_id", "is_active", "audit"],
    additionalProperties: false,
    properties: {
      feature_name: { type: "string", minLength: 1 },
      outlet_id: { type: "string", minLength: 1 },
      terminal_ids: {
        type: "array",
        nullable: true,
        items: { type: "string", minLength: 1 }
      },
      is_active: { type: "boolean" },
      audit: {
        type: "object",
        required: ["submitted_by"],
        additionalProperties: false,
        properties: { submitted_by: { type: "string" } }
      }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        rollout_feature_config_id: { type: "string" }
      }
    },
    ...errorSchemas
  }
};

module.exports = postRolloutFeatureConfig;
