const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const fetchAllOutletDeploymentVersions = {
  tags: ["Outlet Deployment"],
  summary: "This API is to fetch all Outlet deployment versions",
  body: {
    type: "object",
    additionalProperties: true,
    properties: {
      outlet_id: { type: "string" }
    }
  },
  response: {
    200: {
      type: "array",
      additionalProperties: true
    },
    ...errorSchemas
  }
};

module.exports = fetchAllOutletDeploymentVersions;
