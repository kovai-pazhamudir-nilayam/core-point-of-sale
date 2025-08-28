const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getTerminalRegisterByRegisterId = {
  tags: ["Terminal-Register"],
  summary: "This API is to Get Terminal Register By Register Id",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",
    required: ["register_id"],
    additionalProperties: false,
    properties: {
      register_id: { type: "string", minLength: 1 }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        outlet_id: { type: "string" },
        terminal_id: { type: "string" },
        register_id: { type: "string", nullable: true },
        float_cash: { type: "number" },
        register_transaction_summary: {
          type: "array",
          items: {
            type: "object",
            properties: {
              payment_option_id: { type: "string", format: "uuid" },
              payment_option_code: { type: "string" },
              psp_id: { type: "string", format: "uuid" },
              psp_name: { type: "string" },
              transaction_count: { type: "number" },
              total_transaction_amount: {
                type: "object",
                properties: {
                  currency: { type: "string" },
                  cent_amount: { type: "number" },
                  fraction: { type: "number" }
                }
              }
            }
          }
        },
        user_id: { type: "string" },
        user_name: { type: "string" }
      }
    },
    ...errorSchemas
  }
};

module.exports = getTerminalRegisterByRegisterId;
