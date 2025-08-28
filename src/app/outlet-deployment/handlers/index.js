const fetchAllOutletDeploymentVersions = require("./fetch-all-outlet-deployment-versions");
const fetchOutletMacVersion = require("./fetch-outlet-mac-version");
const postOutletMacVersion = require("./post-outlet-mac-version");

module.exports = {
  postOutletMacVersion,
  fetchOutletMacVersion,
  fetchAllOutletDeploymentVersions
};
