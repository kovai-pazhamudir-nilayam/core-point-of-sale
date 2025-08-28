const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const getTerminalRegisterDayendList = {
  tags: ["Terminal-Register-Dayend"],
  summary: "This API is to Get Terminal Register Dayend List by outlet_id",
  headers: { $ref: "request-headers#" },
  query: {
    type: "object",
    required: ["outlet_id"],
    additionalProperties: true,
    properties: {
      outlet_id: { type: "string" },
      date_from: { type: "string", format: "date-time" },
      date_to: { type: "string", format: "date-time" }
    }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          register_transaction_id: { type: "string" },
          outlet_id: { type: "string" },
          register_id: { type: "string" },
          terminal_name: { type: "string" },
          terminal_id: { type: "string" },
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
          total_transaction_amount: {
            type: "object",
            properties: {
              currency: { type: "string" },
              cent_amount: { type: "number" },
              fraction: { type: "number" }
            },
            required: ["currency", "cent_amount", "fraction"]
          },
          total_user_declared_amount: {
            type: "object",
            properties: {
              currency: { type: "string" },
              cent_amount: { type: "number" },
              fraction: { type: "number" }
            },
            required: ["currency", "cent_amount", "fraction"]
          },
          total_reconciliation_amount: {
            type: "object",
            properties: {
              currency: { type: "string" },
              cent_amount: { type: "number" },
              fraction: { type: "number" }
            },
            required: ["currency", "cent_amount", "fraction"]
          },
          register_transaction_summary: {
            type: "array",
            items: {
              type: "object",
              properties: {
                payment_option_id: { type: "string" },
                payment_option_code: { type: "string" },
                psp_id: { type: "string" },
                psp_name: { type: "string" },
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
                      denomination_config_id: { type: "string" },
                      denomination_amount: { type: "number" },
                      type: { type: "string", enum: ["NOTE", "COIN"] },
                      count: { type: "number" }
                    }
                  }
                },
                reconciliation_denomination_details: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      denomination_config_id: { type: "string" },
                      denomination_amount: { type: "number" },
                      type: { type: "string", enum: ["NOTE", "COIN"] },
                      count: { type: "number" }
                    }
                  }
                }
              }
            }
          },
          reconciliation_notes: { type: "string" },
          reconciliation_status: { type: "string", enum: ["PENDING", "CLOSED"] }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = getTerminalRegisterDayendList;
