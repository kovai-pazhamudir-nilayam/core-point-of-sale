exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("feature_configuration");
  if (tableExists) {
    await knex.schema.table("feature_configuration", table => {
      table.string("outlet_id");
    });
  }
};
exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("feature_configuration");
  if (tableExists) {
    await knex.schema.table("feature_configuration", table => {
      table.dropColumn("outlet_id");
    });
  }
};
