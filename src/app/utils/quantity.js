const _ = require("lodash");

const getQuantity = ({ quantity }) => {
  if (!quantity) return 0;
  const { quantity_number = 0 } = quantity;
  if (
    _.isUndefined(quantity_number) ||
    Number.isNaN(quantity_number) ||
    Number(quantity_number) <= 0
  )
    return quantity_number;
  return Number(quantity_number);
};

const getQuantityBySKUCode = ({ linesMap, sku_code }) => _.get(linesMap, sku_code, 0);

const SKUCodeToQuantityMap = ({ lines }) => {
  if (_.isEmpty(lines)) return {};
  return lines.reduce((acc, line) => {
    const { sku_code } = line;
    const quantity = getQuantity({ quantity: line.quantity });
    if (quantity === 0) return acc;
    if (acc[sku_code]) {
      acc[sku_code] += quantity;
    } else {
      acc[sku_code] = quantity;
    }
    return acc;
  }, {});
};

const addQuantity = ({ existingQuantity, newQuantity }) => {
  return {
    ...existingQuantity,
    quantity_number:
      getQuantity({ quantity: existingQuantity }) + getQuantity({ quantity: newQuantity })
  };
};

const formatNumber = (value, precision = 2) => Number(Number(value).toFixed(precision));

module.exports = {
  getQuantity,
  addQuantity,
  getQuantityBySKUCode,
  SKUCodeToQuantityMap,
  formatNumber
};
