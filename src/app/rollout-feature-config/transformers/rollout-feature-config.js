const { dbToApi } = require("../mappers/audit-mapper");

const transformRolloutFeatureConfigs = ({ rolloutFeatureConfigs }) => {
  const transformedRolloutFeatureConfigs = rolloutFeatureConfigs.map(config => {
    const {
      created_at,
      last_modified_at,
      created_by,
      last_modified_by,
      api_version,
      ...restConfig
    } = config;
    const audit = dbToApi({
      created_at,
      last_modified_at,
      created_by,
      last_modified_by,
      api_version
    });
    return { ...restConfig, ...audit };
  });
  return transformedRolloutFeatureConfigs;
};

module.exports = { transformRolloutFeatureConfigs };
