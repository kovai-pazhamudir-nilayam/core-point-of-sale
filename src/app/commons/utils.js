const decodeEventData = ({ event }) => {
  const { data } = event.message;
  const decodedEvent = Buffer.from(data, "base64").toString();
  const eventData = JSON.parse(decodedEvent);
  return eventData;
};

module.exports = {
  decodeEventData
};
