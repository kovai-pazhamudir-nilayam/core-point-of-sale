const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postOutletDevice = {
  tags: ["Outlet-Device"],
  summary: "This API is to post outlet Device",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["outlet_id", "type", "mac_address", "mac_short_name", "is_active", "audit"],
    additionalProperties: false,
    properties: {
      outlet_device_register_id: { type: "string" },
      outlet_id: { type: "string" },
      type: { type: "string", enum: ["POS", "SERVER", "POS_HHT"] },
      mac_address: { type: "string" },
      mac_short_name: { type: "string" },
      is_active: { type: "boolean" },
      audit: { $ref: "response-audit#" }
    },
    allOf: [
      {
        if: {
          required: ["outlet_device_register_id"]
        },
        then: {
          properties: {
            audit: {
              type: "object",
              required: ["last_modified_by"]
            }
          }
        },
        else: {
          properties: {
            audit: {
              type: "object",
              required: ["created_by"]
            }
          }
        }
      }
    ]
  },
  response: {
    200: {
      type: "object",
      properties: {
        outlet_device_register_id: { type: "string" }
      }
    },
    ...errorSchemas
  }
};

module.exports = postOutletDevice;
