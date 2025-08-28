const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postOutletConfig = {
  tags: ["Outlet-Config"],
  summary: "This API is to post outlet config",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: [
      "outlet_id",
      "zone_id",
      "zone_short_code",
      "allowed_pos_ips",
      "allowed_pos_modes",
      "quantity_edit_mode",
      "line_delete_mode",
      "is_active",
      "outlet_customer_proxy_phone_number",
      "enable_hold_cart_mode",
      "price_edit_mode",
      "sales_associate_link"
    ],
    additionalProperties: false,
    properties: {
      outlet_id: { type: "string" },
      zone_id: { type: "string" },
      zone_short_code: { type: "string" },
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
      quantity_edit_mode: { type: "string", enum: ["ENABLED", "ENABLED_WITH_AUTH", "DISABLED"] },
      line_delete_mode: { type: "string", enum: ["ENABLED", "ENABLED_WITH_AUTH", "DISABLED"] },
      enable_hold_cart_mode: { type: "string", enum: ["ENABLED", "ENABLED_WITH_AUTH", "DISABLED"] },
      price_edit_mode: { type: "string", enum: ["ENABLED", "ENABLED_WITH_AUTH", "DISABLED"] },
      sales_associate_link: { type: "string", enum: ["ENABLED", "ENABLED_WITH_AUTH", "DISABLED"] },
      mandate_register_close_on_logout: { type: "string", enum: ["ENABLED", "DISABLED"] },
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
      is_active: { type: "boolean" }
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

module.exports = postOutletConfig;
