exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_mac_version");
  if (tableExists) {
    await knex.schema.table("outlet_mac_version", table => {
      table.string("status");
      table.timestamp("last_deployed_at");
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_mac_version");
  if (tableExists) {
    await knex.schema.table("outlet_mac_version", table => {
      table.dropColumn("status");
      table.dropColumn("last_deployed_at");
    });
  }
};
