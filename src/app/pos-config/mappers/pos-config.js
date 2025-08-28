const mapper = require("object-mapper");

const mapDenominationConfigToResponse = {
  denomination_config_id: "denomination_config_id",
  denomination_amount: "denomination_amount",
  type: "type",
  is_active: "is_active",
  created_by: "audit.created_by",
  created_at: "audit.created_at",
  last_modified_by: "audit.last_modified_by",
  last_modified_at: "audit.last_modified_at",
  api_version: "audit.api_version"
};

function mapDenominationConfig({ input }) {
  return input.map(config => mapper(config, mapDenominationConfigToResponse));
}

module.exports = { mapDenominationConfig };
