exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal");
  if (tableExists) {
    await knex.schema.table("terminal", table => {
      table.string("non_integrated_edc_allowed_mode").defaultTo("DISABLED");
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("terminal");
  if (tableExists) {
    await knex.schema.table("terminal", table => {
      table.dropColumn("non_integrated_edc_allowed_mode");
    });
  }
};
