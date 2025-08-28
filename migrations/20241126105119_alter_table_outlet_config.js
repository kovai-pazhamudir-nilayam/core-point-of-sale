exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_config");
  if (tableExists) {
    await knex.schema.table("outlet_config", table => {
      table.jsonb("allowed_payment_modes");
      table.string("mandate_register_close_on_logout");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("created_by");
      table.timestamp("last_modified_at");
      table.string("last_modified_by");
      table.string("api_version");
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_config");
  if (tableExists) {
    await knex.schema.table("outlet_config", table => {
      table.dropColumn("allowed_payment_modes");
      table.dropColumn("mandate_register_close_on_logout");
      table.dropColumn("created_at");
      table.dropColumn("created_by");
      table.dropColumn("last_modified_at");
      table.dropColumn("last_modified_by");
      table.dropColumn("api_version");
    });
  }
};
