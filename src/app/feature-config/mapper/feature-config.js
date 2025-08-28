const mapInputRequest = ({ input }) => {
  const modifiedInput = input.map(config => {
    const { audit, ...other } = config;
    return { ...other, ...audit };
  });

  const uniqueInput = modifiedInput.reduce((acc, curr) => {
    if (!acc[curr.feature]) {
      acc[curr.feature] = curr;
    }
    return acc;
  }, {});

  const uniqueInputArray = Object.values(uniqueInput);

  return uniqueInputArray;
};

module.exports = { mapInputRequest };
