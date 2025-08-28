const Dinero = require("dinero.js");
const { STANDARD_PRECISION, STANDARD_FRACTION } = require("../commons/constant");
const { formatNumber } = require("./quantity");

function Amount({ cent_amount, currency = "INR", fraction = STANDARD_FRACTION }) {
  const precisionFromFraction = amount_fraction => Math.floor(Math.log10(amount_fraction));

  const centAmount = formatNumber(cent_amount, precisionFromFraction(fraction));

  const dineroAmount = Dinero({
    amount: centAmount,
    precision: precisionFromFraction(fraction),
    currency
  }).convertPrecision(STANDARD_PRECISION);

  const toJSON = () => {
    return {
      cent_amount: dineroAmount.getAmount(),
      fraction: 10 ** dineroAmount.getPrecision(),
      currency: dineroAmount.getCurrency()
    };
  };

  const toObject = () => dineroAmount;

  const add = supplement => {
    const amount = dineroAmount.add(supplement.toObject());
    return Amount({
      cent_amount: amount.getAmount(),
      fraction: 10 ** amount.getPrecision(),
      currency: amount.getCurrency()
    });
  };

  const increaseByPercentage = percentage => {
    const amount = dineroAmount.multiply(percentage / 100);
    const percentageAmount = Amount({
      cent_amount: amount.getAmount(),
      fraction: 10 ** amount.getPrecision(),
      currency: amount.getCurrency()
    });
    return add(percentageAmount);
  };

  const subtract = other => {
    const amount = dineroAmount.subtract(other.toObject());
    return Amount({
      cent_amount: amount.getAmount(),
      fraction: 10 ** amount.getPrecision(),
      currency: amount.getCurrency()
    });
  };

  const multiply = multiplier => {
    const amount = dineroAmount.multiply(multiplier);
    return Amount({
      cent_amount: amount.getAmount(),
      fraction: 10 ** amount.getPrecision(),
      currency: amount.getCurrency()
    });
  };

  const modifyDecimalPlace = decimalPlace => {
    const amount = dineroAmount.convertPrecision(decimalPlace);
    return Amount({
      cent_amount: amount.getAmount(),
      fraction: 10 ** amount.getPrecision(),
      currency: amount.getCurrency()
    });
  };

  const divide = divider => {
    const amount = dineroAmount.divide(divider);
    return Amount({
      cent_amount: amount.getAmount(),
      fraction: 10 ** amount.getPrecision(),
      currency: amount.getCurrency()
    });
  };

  const getDecimalPlace = () => dineroAmount.getPrecision();

  const convertPrecision = precision => {
    const amount = dineroAmount.convertPrecision(precision);
    return Amount({
      cent_amount: amount.getAmount(),
      fraction: 10 ** amount.getPrecision(),
      currency: amount.getCurrency()
    });
  };

  const asNumeric = (precision = precisionFromFraction(fraction)) =>
    dineroAmount.toRoundedUnit(precision);

  return {
    add,
    subtract,
    toJSON,
    toObject,
    multiply,
    increaseByPercentage,
    modifyDecimalPlace,
    getDecimalPlace,
    divide,
    asNumeric,
    convertPrecision
  };
}

module.exports = Amount;
