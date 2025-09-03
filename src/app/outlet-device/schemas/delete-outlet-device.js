const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const deleteOutletDevice = {
  tags: ["Outlet-Device"],
  summary: "This API is to delete outlet device",
  headers: { $ref: "request-headers#" },
  params: {
    type: "object",
    required: ["outlet_device_register_id"],
    additionalProperties: false,
    properties: {
      outlet_device_register_id: { type: "string", minLength: 1 }
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

module.exports = deleteOutletDevice;
