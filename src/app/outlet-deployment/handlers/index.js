const fetchAllOutletDeploymentVersions = require("./fetch-all-outlet-deployment-versions");
const fetchOutletMacVersion = require("./fetch-outlet-mac-version");
const postFetchOutletMacVersionHistory = require("./post-fetch-outlet-mac-version-history");
const postOutletMacVersion = require("./post-outlet-mac-version");
const postOutletMacVersionDeploymentStatus = require("./post-outlet-mac-version-deployment-status");
const postOutletMacVersionBulk = require("./post-outlet-mac-version-bulk");
const postOutletMacVersionRollback = require("./post-outlet-mac-version-rollback");

module.exports = {
  postOutletMacVersion,
  fetchOutletMacVersion,
  fetchAllOutletDeploymentVersions,
  postFetchOutletMacVersionHistory,
  postOutletMacVersionDeploymentStatus,
  postOutletMacVersionBulk,
  postOutletMacVersionRollback
};
