const { logQuery } = require("../../commons/helpers");

const OUTLET_MAC_VERSION_HISTORY = {
  NAME: "outlet_mac_version_history",
  COLUMNS: {
    OUTLET_MAC_VERSION_HISTORY_ID: "outlet_mac_version_history_id",
    OUTLET_MAC_VERSION_ID: "outlet_mac_version_id",
    OUTLET_ID: "outlet_id",
    TERMINAL_ID: "terminal_id",
    TYPE: "type",
    MAC_ADDRESS: "mac_address",
    SERVICE: "service",
    VERSION: "version",
    DEPLOYMENT_HASH: "deployment_hash",
    CREATED_AT: "created_at",
    CREATED_BY: "created_by",
    LAST_MODIFIED_AT: "last_modified_at",
    LAST_MODIFIED_BY: "last_modified_by",
    API_VERSION: "api_version",
    STATUS: "status",
    IS_ROLLBACKED: "is_rollbacked"
  }
};

function OutletMacVersionHistoryRepo() {
  async function getOutletMacVersionHistory({ input }) {
    const knex = this;

    const { current_page, page_size, filters = {}, fieldsToReturn = "*", with_pagination } = input;

    const { where: whereClause, whereIn: whereInClause } = filters;

    let query = knex(OUTLET_MAC_VERSION_HISTORY.NAME).select(fieldsToReturn);
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

    logQuery({ query, context: "Get outlet mac version history" });

    if (with_pagination) {
      query = query.orderBy(OUTLET_MAC_VERSION_HISTORY.COLUMNS.CREATED_AT, "desc").paginate({
        pageSize: page_size,
        currentPage: current_page
      });
      return query;
    }

    return query;
  }

  async function createOutletMacVersionHistory({ input }) {
    const knex = this;

    // Normalize to array
    const rows = Array.isArray(input) ? input : [input];

    const query = knex(OUTLET_MAC_VERSION_HISTORY.NAME).insert(rows).returning("*");

    logQuery({ query, context: "Create outlet mac version history" });

    const result = await query;

    return Array.isArray(input) ? result : result[0];
  }

  return {
    getOutletMacVersionHistory,
    createOutletMacVersionHistory
  };
}

module.exports = { OutletMacVersionHistoryRepo, OUTLET_MAC_VERSION_HISTORY };
