const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getRolloutFeatureConfig = {
  tags: ["ROLLOUT-FEATURE-CONFIG"],
  summary: "This API is to get rollout feature configs",
  headers: { $ref: "request-headers#" },

  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          rollout_feature_config_id: { type: "string" },
          feature_name: { type: "string" },
          outlet_id: { type: "string" },
          terminal_ids: { type: "array", items: { type: "string" } },
          is_active: { type: "boolean" },
          audit: { $ref: "response-audit#" }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = getRolloutFeatureConfig;
