const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getFeatureConfiguration = {
  tags: ["Pos-Config"],
  summary: "This API is to get Feature Configuration by Id",
  headers: { $ref: "request-headers#" },
  params: {
    type: "object",
    required: ["feature_configuration_id"],
    properties: {
      feature_configuration_id: { type: "string", format: "uuid" }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        feature_configuration_id: { type: "string" },
        feature_group: { type: "string" },
        feature: { type: "string" },
        execution_mode: { type: "string" },
        fallback_mode: { type: "string" },
        created_by: { type: "string" },
        created_at: { type: "string" },
        last_modified_by: { type: "string" },
        last_modified_at: { type: "string" },
        api_version: { type: "string" },
        outlet_id: { type: "string" }
      }
    },
    ...errorSchemas
  }
};

module.exports = getFeatureConfiguration;
