const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postFetchOutletMacVersionHistory = {
  tags: ["Outlet Deployment"],
  summary: "Fetch Outlet mac version history with pagination (POST)",

  body: {
    type: "object",
    properties: {
      outlet_mac_version_id: { type: "string", format: "uuid" },
      outlet_id: { type: "string" },
      meta: {
        type: "object",
        properties: {
          with_pagination: { type: "boolean", default: true },
          pagination: {
            type: "object",
            properties: {
              current_page: { type: "integer", default: 1 },
              page_size: { type: "integer", default: 10 }
            }
          }
        }
      }
    }
  },

  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              outlet_mac_version_history_id: { type: "string", format: "uuid" },
              outlet_mac_version_id: { type: "string", format: "uuid" },
              outlet_id: { type: "string" },
              terminal_id: { type: "string" },
              type: { type: "string" },
              mac_address: { type: "string" },
              service: { type: "string" },
              version: { type: "string" },
              deployment_hash: { type: "string" },
              created_at: { type: "string" },
              created_by: { type: "string" },
              last_modified_at: { type: "string" },
              last_modified_by: { type: "string" },
              api_version: { type: "string" },
              status: { type: "string" }
            }
          }
        },
        meta: {
          type: "object",
          properties: {
            pagination: { $ref: "response-pagination#" }
          }
        }
      }
    },
    ...errorSchemas
  }
};

module.exports = postFetchOutletMacVersionHistory;
