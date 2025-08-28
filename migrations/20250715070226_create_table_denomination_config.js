exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("denomination_config");
  if (!tableExists) {
    await knex.schema.createTable("denomination_config", table => {
      table.uuid("denomination_config_id").primary();
      table.string("denomination_amount").notNullable();
      table.string("type").notNullable();
      table.boolean("is_active");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("created_by");
      table.timestamp("last_modified_at");
      table.string("last_modified_by");
      table.string("api_version");
      table.index(["is_active"], "idx_denomination_config_is_active");
    });
  }
};
exports.down = knex => {
  return knex.schema.dropTable("denomination_config");
};
