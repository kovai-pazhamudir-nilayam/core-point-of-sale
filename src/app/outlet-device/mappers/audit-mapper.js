const mapper = require("object-mapper");
const moment = require("moment");
const _ = require("lodash");

const auditApiToDbMapping = {
  "audit.created_at": "created_at",
  "audit.last_modified_at": {
    key: "last_modified_at",
    transform: lastModifiedAt => {
      return !_.isEmpty(lastModifiedAt) ? lastModifiedAt : moment().toISOString();
    }
  },
  "audit.created_by": "created_by",
  "audit.last_modified_by": "last_modified_by",
  "audit.api_version": "api_version"
};

const auditDbToApiMapping = {
  created_at: "audit.created_at",
  last_modified_at: "audit.last_modified_at",
  created_by: "audit.created_by",
  last_modified_by: "audit.last_modified_by",
  api_version: "audit.api_version"
};

const newAudit = ({ createdBy }) => {
  return mapper(
    {
      audit: {
        created_at: moment().toISOString(),
        last_modified_at: moment().toISOString(),
        created_by: createdBy
      }
    },
    auditApiToDbMapping
  );
};

const apiToDb = ({ audit }) => {
  return !_.isEmpty(audit)
    ? mapper({ audit: { ...audit, api_version: "v1" } }, auditApiToDbMapping)
    : newAudit({});
};

const dbToApi = dbObject => {
  return mapper(dbObject, auditDbToApiMapping);
};

const updatedAudit = ({ updatedBy }) => {
  return {
    last_modified_by: updatedBy,
    last_modified_at: moment().toISOString()
  };
};

const apiToDbPlainAudit = ({ audit }) => {
  return !_.isEmpty(audit)
    ? mapper({ audit }, auditApiToDbMapping)
    : { created_at: moment().toISOString(), last_modified_at: moment().toISOString() };
};

const apiToDbUpdatePlainAudit = () => {
  return { last_modified_at: moment().toISOString() };
};

const getCurrentTimeStamp = () => moment().toISOString();

module.exports = {
  newAudit,
  apiToDb,
  dbToApi,
  updatedAudit,
  apiToDbPlainAudit,
  getCurrentTimeStamp,
  apiToDbUpdatePlainAudit
};
