const fetchAllOutletDeploymentVersionsService = require("./fetch-all-outlet-deployment-versions");
const fetchOutletMacVersionService = require("./fetch-outlet-mac-version");
const postFetchOutletMacVersionHistoryService = require("./post-fetch-outlet-mac-version-history");
const postOutletMacVersionService = require("./post-outlet-mac-version");
const postOutletMacVersionDeploymentStatusService = require("./post-outlet-mac-version-deployment-status");
const postOutletMacVersionBulkService = require("./post-outlet-mac-version-bulk");
const postOutletMacVersionRollbackService = require("./post-outlet-mac-version-rollback");

module.exports = {
  postOutletMacVersionService,
  fetchOutletMacVersionService,
  fetchAllOutletDeploymentVersionsService,
  postFetchOutletMacVersionHistoryService,
  postOutletMacVersionDeploymentStatusService,
  postOutletMacVersionBulkService,
  postOutletMacVersionRollbackService
};
