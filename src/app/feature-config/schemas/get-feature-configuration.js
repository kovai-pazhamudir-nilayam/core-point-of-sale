const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getFeatureConfiguration = {
  tags: ["Pos-Config"],
  summary: "This API is to get Feature Configuration",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",
    properties: {
      outlet_id: { type: "string" }
    }
  },
  response: {
    200: {
      type: "array",
      items: {
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
      }
    },
    ...errorSchemas
  }
};

module.exports = getFeatureConfiguration;
