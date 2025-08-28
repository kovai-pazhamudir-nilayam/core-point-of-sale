const moment = require("moment");
const { logger } = require("../utils/logger");

exports.connectionCheck = db => db.raw("select 1+1 as result");

exports.logQuery = ({ query, context }) => {
  const SQLQueryObj = query.toSQL();
  logger.debug({
    message: `SQL Query: ${context}`,
    context,
    method: SQLQueryObj.method,
    query: SQLQueryObj.sql,
    bindings: SQLQueryObj.bindings
  });
};

exports.getAuditInfo = entity => {
  const { audit } = entity;
  const currentTimeStamp = new Date(Date.now()).toISOString();
  const obj = {
    created_at: currentTimeStamp,
    last_modified_at: currentTimeStamp
  };
  if (!audit) {
    return obj;
  }
  const { created_by, last_modified_by, api_version } = audit;
  return {
    ...(api_version && { api_version }),
    ...(created_by && { created_by }),
    ...(last_modified_by && { last_modified_by }),
    ...obj
  };
};

exports.decodeEventData = ({ input }) => {
  const { data } = input.message;
  const decodedEvent = Buffer.from(data, "base64").toString();
  const eventData = JSON.parse(decodedEvent);
  return eventData;
};

exports.getCurrentTimestamp = () => moment().toISOString();
