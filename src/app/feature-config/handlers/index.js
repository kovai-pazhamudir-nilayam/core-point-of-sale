const getFeatureConfigurationHandler = require("./get-feature-configuration");
const getFeatureConfigurationByIdHandler = require("./get-feature-configuration-by-id");
const postFeatureConfigurationHandler = require("./post-feature-configuration");
const postFeatureConfigurationBulkEventsHandler = require("./post-feature-configuration-bulk-events");
const postFeatureConfigurationCloneHandler = require("./post-feature-configuration-clone");

module.exports = {
  getFeatureConfigurationHandler,
  getFeatureConfigurationByIdHandler,
  postFeatureConfigurationHandler,
  postFeatureConfigurationBulkEventsHandler,
  postFeatureConfigurationCloneHandler
};
