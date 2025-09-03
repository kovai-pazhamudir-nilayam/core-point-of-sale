const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getOutletDevice = {
  tags: ["Outlet-Device"],
  summary: "This API is to get outlet Device",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",
    additionalProperties: true,
    properties: {
      outlet_id: { type: "string", minLength: 1 },
      type: { type: "string", minLength: 1, enum: ["POS", "SERVER", "POS_HHT"] }
    }
  },

  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          outlet_device_register_id: { type: "string" },
          outlet_id: { type: "string" },
          type: { type: "string" },
          mac_address: { type: "string" },
          mac_short_name: { type: "string" },
          is_active: { type: "boolean" },
          audit: { type: "object", additionalProperties: true }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = getOutletDevice;
