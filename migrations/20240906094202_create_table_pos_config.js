exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("pos_config");
  if (!tableExists) {
    await knex.schema.createTable("pos_config", table => {
      table.string("pos_mode");
      table.jsonb("category_ids");
    });
  }
};

exports.down = knex => {
  return knex.schema.dropTable("pos_config");
};
