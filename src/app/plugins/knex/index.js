const fp = require("fastify-plugin");
const getKnexClient = require("./setup");

const knexPlugin = async (fastify, options) => {
  try {
    const db = await getKnexClient({ options });
    fastify.decorate("knex", db);
  } catch (e) {
    fastify.log.error(`DB connection failed`);
    throw Error(`Connection Failed ${e}`);
  }
};

module.exports = fp(knexPlugin);
