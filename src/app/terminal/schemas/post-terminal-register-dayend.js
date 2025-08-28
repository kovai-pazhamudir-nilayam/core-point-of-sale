const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postTerminalRegisterDayend = {
  tags: ["Terminal-Register-Dayend"],
  summary: "This API is to Post Terminal Register Dayend",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: [
      "register_transaction_id",
      "register_transaction_summary",
      "reconciliation_close_by"
    ],
    properties: {
      register_transaction_id: { type: "string" },
      reconciliation_close_by: { type: "string" },
      reconciliation_notes: { type: "string" },
      reconciliation_status: { type: "string", enum: ["PENDING", "CLOSED"] },
      register_transaction_summary: {
        type: "array",
        items: {
          type: "object",
          required: [
            "payment_option_id",
            "psp_id",
            "psp_name",
            "payment_option_code",
            // "transaction_count",
            "total_reconciliation_amount"
          ],
          properties: {
            payment_option_id: { type: "string", format: "uuid" },
            psp_id: { type: "string", format: "uuid" },
            payment_option_code: { type: "string" },
            psp_name: { type: "string" },
            transaction_count: { type: "number" },
            total_reconciliation_amount: { $ref: "request-amount#" },
            reconciliation_denomination_details: {
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
      audit: { $ref: "request-audit#" }
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

module.exports = postTerminalRegisterDayend;
