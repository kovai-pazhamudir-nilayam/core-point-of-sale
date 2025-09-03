exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal");
  if (tableExists) {
    await knex.schema.table("terminal", table => {
      table.string("mac_address");
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("terminal");
  if (tableExists) {
    await knex.schema.table("terminal", table => {
      table.dropColumn("mac_address");
    });
  }
};
