const mapOutletConfig = ({ outlet, outletConfig, denominationConfig, rolloutConfigs }) => {
  const {
    name,
    short_name,
    zone_id,
    zone_short_code,
    address,
    cluster_outlet_ids,
    gstin,
    fssai,
    emails,
    phone_numbers,
    calendar,
    outlet_grading
  } = outlet;

  const cluster_id = cluster_outlet_ids?.[0];

  const denominations = denominationConfig.map(config => {
    const { denomination_config_id, denomination_amount, type, is_active } = config;
    return { denomination_config_id, denomination_amount, type, is_active };
  });

  const isDenominationEnabled = rolloutConfigs.ENABLE_DENOMINATIONS;

  return {
    ...outletConfig,
    name,
    short_name,
    zone_id,
    zone_short_code,
    address,
    gstin,
    fssai,
    emails,
    phone_numbers,
    calendar,
    outlet_grading,
    cluster_id,
    ...(isDenominationEnabled && { denominations }),
    ...(isDenominationEnabled && { enable_closing_float_cash: true })
  };
};

module.exports = { mapOutletConfig };
