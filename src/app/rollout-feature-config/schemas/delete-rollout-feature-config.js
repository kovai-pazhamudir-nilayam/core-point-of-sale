const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const deleteRolloutFeatureConfig = {
  tags: ["ROLLOUT-FEATURE-CONFIG"],
  summary: "This API is to delete Rollout Feature Config by id",
  headers: { $ref: "request-headers#" },
  params: {
    type: "object",
    required: ["rollout_feature_config_id"],
    additionalProperties: false,
    properties: {
      rollout_feature_config_id: { type: "string", minLength: 1 }
    }
  },
  response: {
    200: { success: { type: "boolean" } },
    ...errorSchemas
  }
};

module.exports = deleteRolloutFeatureConfig;
