const knex = require("knex");
const setupPaginator = require("./paginator");
const { connectionCheck } = require("../../commons/helpers");
const { logger } = require("../../utils/logger");

const getKnexClient = async ({ options }) => {
  try {
    const db = knex({ ...options });
    setupPaginator(db);
    await connectionCheck(db);
    return db;
  } catch (e) {
    logger.error({ message: `DB connection failed`, err: e });
    throw Error(`Connection Failed ${e}`);
  }
};

module.exports = getKnexClient;
