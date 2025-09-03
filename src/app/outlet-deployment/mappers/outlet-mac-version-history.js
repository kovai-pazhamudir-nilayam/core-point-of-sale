const mapHistoryToBaseRecord = ({ deploymentHistory = {} }) => {
  const {
    created_at,
    created_by,
    last_modified_at,
    last_modified_by,
    outlet_mac_version_history_id,
    ...rest
  } = deploymentHistory;

  return rest;
};

module.exports = { mapHistoryToBaseRecord };
