const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postTerminalRegister = {
  tags: ["Terminal-Register"],
  summary: "This API is to Post Terminal Register",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["outlet_id", "terminal_id", "user_id", "register_action"],
    properties: {
      register_transaction_id: { type: "string" },
      outlet_id: { type: "string" },
      terminal_id: { type: "string" },
      register_id: { type: "string" },
      register_action: {
        type: "string",
        enum: ["OPEN", "CLOSE", "HOLD", "RESUME"]
      },
      float_cash: { $ref: "request-amount#" },
      closing_float_cash: { $ref: "request-amount#" },
      register_transaction_summary: {
        type: "array",
        items: {
          type: "object",
          required: [
            "payment_option_id",
            "payment_option_code",
            "psp_name",
            "psp_id",
            "transaction_count",
            "total_transaction_amount"
          ],
          properties: {
            payment_option_id: { type: "string", format: "uuid" },
            payment_option_code: { type: "string" },
            psp_id: { type: "string", format: "uuid" },
            psp_name: { type: "string" },
            transaction_count: { type: "number" },
            total_transaction_amount: { $ref: "request-amount#" },
            denomination_details: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  denomination_config_id: { type: "string", format: "uuid" },
                  count: { type: "number" }
                }
              }
            }
          }
        }
      },
      user_id: { type: "string", format: "uuid" },
      audit: { $ref: "request-audit#" }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        register_id: { type: "string" },
        register_transaction_id: { type: "string" }
      }
    },
    ...errorSchemas
  }
};

module.exports = postTerminalRegister;
