const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getTerminalRegisterDayend = {
  tags: ["Terminal-Register-Dayend"],
  summary: "This API is to Get Terminal Register Dayend by transaction_id",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",
    required: ["transaction_id"],
    additionalProperties: false,
    properties: {
      transaction_id: { type: "string" }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        register_transaction_id: { type: "string" },
        outlet_id: { type: "string" },
        terminal_id: { type: "string" },
        terminal_name: { type: "string" },
        register_id: { type: "string" },
        register_open_by: { type: "string" },
        register_open_at: { type: "string", format: "date-time" },
        register_close_by: { type: "string" },
        register_close_at: { type: "string", format: "date-time" },
        reconciliation_close_by: { type: "string" },
        reconciliation_close_at: { type: "string", format: "date-time" },
        float_cash: {
          type: "object",
          properties: {
            currency: { type: "string" },
            cent_amount: { type: "number" },
            fraction: { type: "number" }
          }
        },
        closing_float_cash: {
          type: "object",
          nullable: true,
          properties: {
            currency: { type: "string" },
            cent_amount: { type: "number" },
            fraction: { type: "number" }
          }
        },
        register_transaction_summary: {
          type: "array",
          items: {
            type: "object",
            properties: {
              payment_option_id: { type: "string", format: "uuid" },
              payment_option_name: { type: "string" },
              psp_id: { type: "string", format: "uuid" },
              psp_name: { type: "string" },
              payment_option_code: { type: "string" },
              user_declared_transaction_count: { type: "number" },
              total_reconciliation_transaction_count: { type: "number" },
              total_transaction_amount: {
                type: "object",
                properties: {
                  currency: { type: "string" },
                  cent_amount: { type: "number" },
                  fraction: { type: "number" }
                }
              },
              is_aggregated: { type: "boolean", default: false },
              total_user_declared_amount: {
                type: "object",
                properties: {
                  currency: { type: "string" },
                  cent_amount: { type: "number" },
                  fraction: { type: "number" }
                }
              },
              total_reconciliation_amount: {
                type: "object",
                properties: {
                  currency: { type: "string" },
                  cent_amount: { type: "number" },
                  fraction: { type: "number" }
                }
              },
              user_declared_denomination_details: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    denomination_config_id: { type: "string", format: "uuid" },
                    denomination_amount: { type: "string" },
                    type: { type: "string" },
                    count: { type: "string" }
                  }
                }
              },
              reconciliation_denomination_details: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    denomination_config_id: { type: "string", format: "uuid" },
                    denomination_amount: { type: "string" },
                    type: { type: "string" },
                    count: { type: "string" }
                  }
                }
              }
            }
          }
        },
        reconciliation_notes: { type: "string" },
        reconciliation_status: { type: "string", enum: ["PENDING", "CLOSED"] }
      }
    },
    ...errorSchemas
  }
};

module.exports = getTerminalRegisterDayend;
