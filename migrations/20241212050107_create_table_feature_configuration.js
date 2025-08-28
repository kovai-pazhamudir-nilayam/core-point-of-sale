exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("feature_configuration");
  if (!tableExists) {
    await knex.schema.createTable("feature_configuration", table => {
      table
        .uuid("feature_configuration_id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("feature_group");
      table.string("feature");
      table.string("execution_mode");
      table.string("fallback_mode");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("created_by");
      table.timestamp("last_modified_at");
      table.string("last_modified_by");
      table.string("api_version");

      table.unique(["feature"]);
    });
  }
};

exports.down = knex => {
  return knex.schema.dropTable("feature_configuration");
};
