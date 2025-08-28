exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_config");
  if (!tableExists) {
    await knex.schema.createTable("outlet_config", table => {
      table.string("outlet_id").primary().notNullable();
      table.uuid("zone_id");
      table.string("zone_short_code");
      table.jsonb("allowed_pos_ips");
      table.jsonb("allowed_pos_modes");
      table.string("quantity_edit_mode");
      table.string("line_delete_mode");
      table.string("enable_hold_cart_mode");
      table.string("price_edit_mode");
      table.string("outlet_customer_proxy_phone_number");
      table.string("sales_associate_link");
      table.boolean("is_active");
    });
  }
};

exports.down = knex => {
  return knex.schema.dropTable("outlet_config");
};
