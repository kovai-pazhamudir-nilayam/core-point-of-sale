const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postTerminalRegisterReconFetch = {
  tags: ["Terminal-Register"],
  summary: "This API is to get only where registers have closed",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["outlet_id", "date_from", "date_to"],
    properties: {
      outlet_id: { type: "string" },
      date_from: { type: "string" },
      date_to: { type: "string" }
    }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          outlet_id: { type: "string" },
          terminal_id: { type: "string" },
          register_id: { type: "string" },
          action_at: { type: "string" },
          float_cash: { type: "number" },
          transaction_count: { type: "number" },
          total_transaction_amount: {
            type: "object",
            properties: {
              currency: { type: "string" },
              cent_amount: { type: "number" },
              fraction: { type: "number" }
            }
          },
          user_id: { type: "string" },
          user_name: { type: "string" }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = postTerminalRegisterReconFetch;
