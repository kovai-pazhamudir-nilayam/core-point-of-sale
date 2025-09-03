const { dbToApi } = require("../mappers/audit-mapper");

const transformOutletDevice = ({ outletDevicesResponse }) => {
  const transformedOutletDevice = outletDevicesResponse.map(config => {
    const { created_at, last_modified_at, created_by, last_modified_by, ...restConfig } = config;
    const audit = dbToApi({
      created_at,
      last_modified_at,
      created_by,
      last_modified_by
    });
    return { ...restConfig, ...audit };
  });
  return transformedOutletDevice;
};

module.exports = { transformOutletDevice };
