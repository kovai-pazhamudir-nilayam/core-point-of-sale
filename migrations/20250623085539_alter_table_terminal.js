exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal");
  if (tableExists) {
    await knex.schema.table("terminal", table => {
      table.string("returns_enabled_mode");
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("terminal");
  if (tableExists) {
    await knex.schema.table("terminal", table => {
      table.dropColumn("returns_enabled_mode");
    });
  }
};
