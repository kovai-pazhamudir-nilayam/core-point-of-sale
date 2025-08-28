exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_config");
  if (tableExists) {
    await knex.schema.table("outlet_config", table => {
      table.boolean("is_digital_invoice_enabled");
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_config");
  if (tableExists) {
    await knex.schema.table("outlet_config", table => {
      table.dropColumn("is_digital_invoice_enabled");
    });
  }
};
