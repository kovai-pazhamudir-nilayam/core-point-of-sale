const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getOutletConfig = {
  tags: ["Outlet-Config"],
  summary: "This API is to get outlet config",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",
    required: ["outlet_id"],
    additionalProperties: false,
    properties: {
      outlet_id: { type: "string", minLength: 1 },
      terminal_id: { type: "string" }
    }
  },

  response: {
    200: {
      type: "object",
      properties: {
        outlet_id: { type: "string" },
        name: { type: "string" },
        short_name: { type: "string" },
        zone_id: { type: "string" },
        zone_short_code: { type: "string" },
        address: {
          type: "object",
          properties: {
            address_line1: { type: "string" },
            address_line2: { type: "string" },
            address_line3: { type: "string" },
            landmark: { type: "string" },
            municipal: { type: "string" },
            city: { type: "string" },
            state_code: { type: "string" },
            state: { type: "string" },
            country_code: { type: "string" },
            country: { type: "string" },
            post_code: { type: "string" },
            geo_location: {
              type: "object",
              properties: {
                latitude: { type: "number" },
                longitude: { type: "number" }
              }
            }
          }
        },
        cluster_id: { type: "string" },
        gstin: { type: "string" },
        fssai: {
          type: "object",
          properties: {
            fssai_number: { type: "string" },
            fssai_image_url: { type: "string" }
          }
        },
        emails: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string" },
              email_id: { type: "string" }
            }
          }
        },
        phone_numbers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string" },
              country_code: { type: "string" },
              number: { type: "string" },
              availability: { type: "boolean" }
            }
          }
        },
        calendar: {
          type: "object",
          properties: {
            week_start_from: { type: "string" },
            store_opening_time: { type: "string" },
            store_closing_time: { type: "string" },
            weekly_holidays: {
              type: "array",
              items: {
                type: "string"
              }
            },
            holidays: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        },
        outlet_grading: { type: "string" },
        allowed_pos_ips: {
          type: "object",
          properties: {
            enable_ip_restriction: { type: "boolean" },
            allowed_ip_list: {
              type: "array",
              items: {
                type: "string"
              }
            },
            allowed_ip_range: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        },
        outlet_customer_proxy_phone_number: { type: "string" },
        allowed_pos_modes: { type: "array", items: { type: "string" } },
        quantity_edit_mode: { type: "string" },
        line_delete_mode: { type: "string" },
        enable_hold_cart_mode: { type: "string" },
        price_edit_mode: { type: "string" },
        sales_associate_link: { type: "string" },
        mandate_register_close_on_logout: {
          type: "string",
          enum: ["ENABLED", "ENABLED_WITH_AUTH", "DISABLED"]
        },
        is_digital_invoice_enabled: { type: "boolean" },
        allowed_payment_modes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              payment_option_id: { type: "string", format: "uuid" },
              payment_option_code: { type: "string" },
              psp_id: { type: "string", format: "uuid" },
              psp_name: { type: "string" }
            }
          }
        },
        is_active: { type: "boolean" },
        denominations: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              denomination_config_id: { type: "string", format: "uuid" },
              denomination_amount: { type: "number" },
              type: { type: "string" },
              is_active: { type: "boolean" }
            }
          }
        },
        enable_closing_float_cash: { type: "boolean" }
      }
    },
    ...errorSchemas
  }
};

module.exports = getOutletConfig;
