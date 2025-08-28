const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getPosModes = {
  tags: ["Pos-Scan"],
  summary: "This API is to get pos Scan Product",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",
    required: ["code", "outlet_id", "quantity"],
    additionalProperties: false,
    properties: {
      code: { type: "string" },
      outlet_id: { type: "string" },
      quantity: { type: "string" }
    }
  },

  response: {
    200: {
      type: "object",
      properties: {
        sku_code: { type: "string" },
        sku_title: { type: "string" },
        pack_of: { type: "number" },
        product_type: { type: "string" },
        is_mrp_relevant: { type: "boolean" },
        is_weighed_item: { type: "boolean" },
        mrp_list: {
          type: "array",
          items: {
            type: "object",
            properties: {
              mrp_id: { type: "string" },
              mrp: {
                type: "object",
                properties: {
                  cent_amount: { type: "number" },
                  fraction: { type: "number" },
                  currency: { type: "string" }
                }
              }
            }
          }
        },
        price: {
          type: "object",
          properties: {
            cent_amount: { type: "number" },
            currency: { type: "string" },
            fraction: { type: "number" }
          }
        },
        bundle_configuration: {
          type: "array",
          items: {
            type: "object",
            properties: {
              sku_code: { type: "string" },
              quantity: {
                type: "object",
                properties: {
                  quantity_number: { type: "string" },
                  quantity_uom: { type: "string" }
                }
              }
            },
            required: ["sku_code", "quantity"]
          }
        },
        media_url: { type: "string" },
        freebie_info: {
          type: "object",
          properties: {
            has_freebies: { type: "boolean" },
            freebie_products: {
              type: "array",
              items: { type: "string" }
            },
            freebie_description: { type: "string" }
          }
        },
        is_active: { type: "boolean" }
      }
    },
    ...errorSchemas
  }
};

module.exports = getPosModes;
