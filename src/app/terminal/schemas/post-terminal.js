const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postTerminal = {
  tags: ["Terminal"],
  summary: "This API is to Create Terminal",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["outlet_id", "terminal_id"],
    additionalProperties: false,
    properties: {
      outlet_id: { type: "string", minLength: 1 },
      terminal_id: { type: "string", minLength: 1 },
      terminal_name: { type: "string" },
      mac_address: { type: "string" },
      status: { type: "string", enum: ["BUSY", "AVAILABLE", "SUSPENDED"] },
      is_edc_integrated: { type: "boolean" },
      is_static_qr_code_enabled: { type: "boolean" },
      non_integrated_edc_allowed_mode: {
        type: "string",
        enum: ["ENABLED", "ENABLED_WITH_AUTH", "DISABLED"]
      },
      training_allowed_mode: {
        type: "string",
        enum: ["ENABLED", "ENABLED_WITH_AUTH", "DISABLED"]
      },
      returns_enabled_mode: {
        type: "string",
        enum: ["ENABLED", "ENABLED_WITH_AUTH", "DISABLED"]
      },
      edc_device: {
        type: "array",
        items: {
          type: "object",
          required: ["psp_id", "device_type"],
          additionalProperties: false,
          properties: {
            config: {
              type: "object",
              properties: {
                app_key: { type: "string" },
                username: { type: "string" },
                device_id: { type: "string" },
                merchant_id: { type: "string" },
                edc_channel_id: { type: "string" },
                edc_terminal_id: { type: "string" },
                edc_version: { type: "string" },
                api_key: { type: "string" }
              }
            },
            is_active: { type: "boolean" },
            psp_id: { type: "string", format: "uuid" },
            device_type: { type: "string" },
            provider: { type: "string" }
          }
        }
      },
      weighing_scale_device: {
        type: "object",
        required: ["weighing_scale_port"],
        additionalProperties: false,
        properties: {
          weighing_scale_port: { type: "string" }
        }
      },
      printer_device: {
        type: "object",
        required: [
          "printer_type",
          "printer_device_url",
          "printer_device_name",
          "printer_device_model"
        ],
        additionalProperties: false,
        properties: {
          printer_type: { type: "string" },
          printer_device_url: { type: "string" },
          printer_device_name: { type: "string" },
          printer_device_model: { type: "string" }
        }
      },
      is_active: { type: "boolean" },
      audit: { $ref: "request-audit#" }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        terminal_id: { type: "string" }
      }
    },
    ...errorSchemas
  }
};

module.exports = postTerminal;
