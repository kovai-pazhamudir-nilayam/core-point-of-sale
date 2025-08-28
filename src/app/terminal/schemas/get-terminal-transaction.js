const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getTerminalTransaction = {
  tags: ["POS"],
  summary: "This api will be used to fetch all terminal transactions",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    additionalProperties: false,
    required: [
      "outlet_id",
      "terminal_id",
      "register_id",
      "register_transaction_id",
      "payment_methods"
    ],
    properties: {
      outlet_id: { type: "string" },
      terminal_id: { type: "string" },
      register_id: { type: "string", format: "uuid" },
      register_transaction_id: { type: "string", format: "uuid" },
      payment_methods: { type: "array", items: { type: "string" } }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        terminal_transactions: {
          type: "array",
          items: {
            payment_option_id: { type: "string", format: "uuid" },
            payment_option_name: { type: "string" },
            psp_id: { type: "string", format: "uuid" },
            psp_name: { type: "string" },
            payment_option_code: { type: "string" },
            total_transaction_amount: {
              type: "object",
              required: ["currency", "cent_amount", "fraction"],
              properties: {
                currency: { type: "string" },
                cent_amount: { type: "number" },
                fraction: { type: "number" }
              }
            },
            total_transaction_count: { type: "number" }
          }
        }
      }
    }
  },
  ...errorSchemas
};

module.exports = getTerminalTransaction;
