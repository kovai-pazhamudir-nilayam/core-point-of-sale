exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("rollout_feature_config");
  if (!tableExists) {
    await knex.schema.createTable("rollout_feature_config", table => {
      table.uuid("rollout_feature_config_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("feature_name");
      table.string("outlet_id");
      table.jsonb("terminal_ids").nullable();
      table.boolean("is_active");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("created_by");
      table.timestamp("last_modified_at");
      table.string("last_modified_by");
      table.string("api_version");

      table.unique(["feature_name", "outlet_id"]);
    });
  }
};

exports.down = knex => {
  return knex.schema.dropTable("rollout_feature_config");
};
