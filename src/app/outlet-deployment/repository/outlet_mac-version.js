const { logQuery } = require("../../commons/helpers");

const OUTLET_MAC_VERSION = {
  NAME: "outlet_mac_version",
  COLUMNS: {
    OUTLET_MAC_VERSION_ID: "outlet_mac_version_id",
    OUTLET_ID: "outlet_id",
    TERMINAL_ID: "terminal_id",
    TYPE: "type",
    MAC_ADDRESS: "mac_address",
    SERVICE: "service",
    STATUS: "status",
    DEPLOYMENT_HASH: "deployment_hash",
    VERSION: "version",
    CREATED_AT: "created_at",
    CREATED_BY: "created_by",
    LAST_MODIFIED_AT: "last_modified_at",
    LAST_MODIFIED_BY: "last_modified_by",
    API_VERSION: "api_version",
    IS_ROLLBACKED: "is_rollbacked"
  }
};

function OutletMacVersionRepo() {
  async function getOutletMacVersion({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(OUTLET_MAC_VERSION.NAME).select(fieldsToReturn);
    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause) {
      // Multiple Keys and Values
      Object.entries(whereInClause).forEach(([key, values]) => {
        if (Array.isArray(values) && values.length > 0) {
          query.whereIn(key, values);
        }
      });
    }

    logQuery({ query, context: "Get outlet mac version" });

    const response = await query;

    return response;
  }

  async function createOutletMacVersion({ input }) {
    const knex = this;

    // Normalize to array
    const rows = Array.isArray(input) ? input : [input];

    const query = knex(OUTLET_MAC_VERSION.NAME)
      .insert(rows)
      .onConflict(OUTLET_MAC_VERSION.COLUMNS.OUTLET_MAC_VERSION_ID)
      .merge()
      .returning("*");

    logQuery({ query, context: "Create outlet mac version" });

    const result = await query;

    return Array.isArray(input) ? result : result[0];
  }

  async function updateOutletMacVersion({ input, filters = {} }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(OUTLET_MAC_VERSION.NAME).returning("*").update(input);

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Update outlet mac version" });

    const result = await query;

    return result;
  }

  return {
    getOutletMacVersion,
    createOutletMacVersion,
    updateOutletMacVersion
  };
}

module.exports = { OutletMacVersionRepo, OUTLET_MAC_VERSION };
