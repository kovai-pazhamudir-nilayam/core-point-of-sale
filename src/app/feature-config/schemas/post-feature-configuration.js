const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postFeatureConfiguration = {
  tags: ["Pos-Config"],
  summary: "This API is to Post Feature Configuration",
  headers: { $ref: "request-headers#" },

  body: {
    type: "array",
    minItems: 1,
    items: {
      type: "object",
      required: ["feature_group", "feature", "execution_mode", "fallback_mode", "audit"],
      additionalProperties: false,
      properties: {
        feature_group: { type: "string", minLength: 1 },
        feature: { type: "string", minLength: 1 },
        execution_mode: { type: "string", enum: ["REMOTE", "LOCAL"] },
        fallback_mode: {
          type: "string",
          enum: ["REMOTE", "LOCAL", ""],
          description: 'Example values: "REMOTE","LOCAL" or empty string ("") '
        },
        outlet_id: { type: "string" },
        audit: {
          type: "object",
          required: ["created_by", "last_modified_by"],
          additionalProperties: false,
          properties: {
            created_by: { type: "string", minLength: 1 },
            last_modified_by: { type: "string", minLength: 1 }
          }
        }
      }
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

module.exports = postFeatureConfiguration;
