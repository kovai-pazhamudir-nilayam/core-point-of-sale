const getFeatureConfiguration = require("./get-feature-configuration");
const postFeatureConfiguration = require("./post-feature-configuration");
const getFeatureConfigurationById = require("./get-feature-configuration-by-id");
const postFeatureConfigurationBulkEvents = require("./post-feature-configuration-bulk-events");
const postFeatureConfigurationClone = require("./post-feature-configuration-clone");

module.exports = {
  getFeatureConfiguration,
  postFeatureConfiguration,
  getFeatureConfigurationById,
  postFeatureConfigurationBulkEvents,
  postFeatureConfigurationClone
};
