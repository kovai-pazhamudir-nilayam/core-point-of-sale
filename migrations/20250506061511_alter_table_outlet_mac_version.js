exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_mac_version");
  if (tableExists) {
    await knex.schema.table("outlet_mac_version", table => {
      table.string("terminal_id");
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_mac_version");
  if (tableExists) {
    await knex.schema.table("outlet_mac_version", table => {
      table.dropColumn("terminal_id");
    });
  }
};
