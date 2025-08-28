const fetchAllOutletDeploymentVersionsService = require("./fetch-all-outlet-deployment-versions");
const fetchOutletMacVersionService = require("./fetch-outlet-mac-version");
const postOutletMacVersionService = require("./post-outlet-mac-version");

module.exports = {
  postOutletMacVersionService,
  fetchOutletMacVersionService,
  fetchAllOutletDeploymentVersionsService
};
