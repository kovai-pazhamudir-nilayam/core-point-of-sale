const { logQuery } = require("../../commons/helpers");

const POS_MODES = {
  NAME: "pos_config",
  COLUMNS: {
    POS_MODE: "pos_mode",
    CATEGORY_IDS: "category_ids"
  }
};

function PosModesRepo() {
  async function getPosModes({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(POS_MODES.NAME).select(fieldsToReturn);

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause) {
      query.whereIn(whereInClause);
    }

    logQuery({ query, context: "Get Pos Modes" });

    const terminal = await query;

    return terminal;
  }

  async function createPosMode({ input }) {
    const knex = this;

    const query = knex(POS_MODES.NAME).returning("*").insert(input);

    logQuery({ query, context: "Create Pos Mode" });

    const [response] = await query;

    return response;
  }

  async function updatePosMode({ input, filters = {} }) {
    const knex = this;

    const { where: whereClause } = filters;

    const query = knex(POS_MODES.NAME).returning("*").update(input);

    if (whereClause) {
      query.where(whereClause);
    }

    logQuery({ query, context: "Update Pos Mode" });

    const [updatedTerminal] = await query;

    return updatedTerminal;
  }

  async function deletePosMode({ filters = {} }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(POS_MODES.NAME).delete();

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Delete Pos Mode" });

    const deletedTerminal = await query;

    return deletedTerminal;
  }

  return {
    getPosModes,
    updatePosMode,
    deletePosMode,
    createPosMode
  };
}
module.exports = { PosModesRepo, POS_MODES };
