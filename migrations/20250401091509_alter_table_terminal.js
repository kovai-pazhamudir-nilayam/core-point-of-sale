exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal");
  if (tableExists) {
    await knex.schema.table("terminal", table => {
      table.boolean("is_static_qr_code_enabled").defaultTo(false);
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("terminal");
  if (tableExists) {
    await knex.schema.table("terminal", table => {
      table.dropColumn("is_static_qr_code_enabled");
    });
  }
};
