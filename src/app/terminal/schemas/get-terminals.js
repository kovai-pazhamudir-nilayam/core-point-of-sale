const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getTerminals = {
  tags: ["Terminal"],
  summary: "This API is to Create Terminal",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",
    required: ["outlet_id"],
    additionalProperties: false,
    properties: {
      outlet_id: { type: "string", minLength: 1 }
    }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          outlet_id: { type: "string" },
          terminal_id: { type: "string" },
          mac_address: { type: "string" },
          terminal_name: { type: "string" },
          status: { type: "string" },
          is_edc_integrated: { type: "boolean" },
          is_static_qr_code_enabled: { type: "boolean" },
          non_integrated_edc_allowed_mode: { type: "string" },
          edc_device: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: true,
              properties: {
                psp_id: { type: "string" },
                device_type: { type: "string" },
                app_key: { type: "string" },
                username: { type: "string" },
                device_id: { type: "string" }
              }
            }
          },
          weighing_scale_device: {
            type: "object",
            properties: {
              weighing_scale_port: { type: "string" }
            }
          },
          printer_device: {
            type: "object",
            properties: {
              printer_type: { type: "string" },
              printer_device_url: { type: "string" },
              printer_device_name: { type: "string" },
              printer_device_model: { type: "string" }
            }
          },
          user_id: { type: "string", nullable: true },
          logged_in_at: { type: "string", nullable: true },
          terminal_register: {
            type: "object",
            properties: {
              register_id: { type: "string" },
              register_transaction_id: { type: "string" }
            },
            nullable: true
          },
          is_active: { type: "boolean" },
          audit: { $ref: "response-audit#" }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = getTerminals;
