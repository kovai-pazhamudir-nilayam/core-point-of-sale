const _ = require("lodash");
const Amount = require("../../utils/amount");
const { ZERO_AMOUNT } = require("../../commons/constant");
const { PAYMENT_OPTION_CODES } = require("../commons/constants");

function terminalRegisterDayendResponseMapper({
  terminalRegister,
  terminalDayend,
  terminalTransactions,
  terminalsMap,
  denominationsMap
}) {
  const {
    register_transaction_id,
    outlet_id,
    terminal_id,
    register_id,
    register_open_by,
    register_open_at,
    register_close_by,
    register_close_at,
    float_cash,
    closing_float_cash,
    register_transaction_summary: userDeclaredAmount
  } = terminalRegister[0];

  const {
    reconciliation_close_by,
    reconciliation_close_at,
    reconciliation_notes,
    reconciliation_status,
    register_transaction_summary: reconciliationAmount
  } = terminalDayend?.[0] || {};

  const totalReconciliationAmount = reconciliationAmount?.reduce((acc, option) => {
    acc[`${option.payment_option_id}_${option.psp_id}`] = option;
    return acc;
  }, {});

  const groupedTerminalTransactions = _.groupBy(
    terminalTransactions.flatMap(terminalTransaction => terminalTransaction.payment_methods),
    terminalTransaction => `${terminalTransaction.payment_option_id}_${terminalTransaction.psp_id}`
  );

  const totalTerminalTransactionAmounts = Object.entries(groupedTerminalTransactions).reduce(
    (acc, [key, value]) => {
      const totalTransactionAmount = value
        .map(v => Amount(v.amount))
        .reduce((totalAmount, amount) => totalAmount.add(amount), Amount(ZERO_AMOUNT));
      acc[key] = { amount: totalTransactionAmount.toJSON() };
      return acc;
    },
    {}
  );

  const registerTransactionSummary = userDeclaredAmount.map(method => {
    const {
      payment_option_id,
      psp_id,
      payment_option_code,
      psp_name,
      transaction_count,
      total_transaction_amount,
      denomination_details
    } = method;
    const userDeclaredDenominationDetails = denomination_details?.map(denomination => {
      const { denomination_config_id, count } = denomination;
      const denominationObject = denominationsMap[denomination_config_id];
      return {
        denomination_config_id,
        denomination_amount: denominationObject.denomination_amount,
        type: denominationObject.type,
        count
      };
    });
    const modeOfPayment = `${payment_option_id}_${psp_id}`;
    const transactionRegisterDayEnd =
      totalReconciliationAmount?.[modeOfPayment]?.total_reconciliation_amount;

    const reconciliationDenominationDetails = totalReconciliationAmount?.[
      modeOfPayment
    ]?.reconciliation_denomination_details?.map(denomination => {
      const { denomination_config_id, count } = denomination;
      const denominationObject = denominationsMap[denomination_config_id];
      return {
        denomination_config_id,
        denomination_amount: denominationObject.denomination_amount,
        type: denominationObject.type,
        count
      };
    });

    const terminalTransaction = totalTerminalTransactionAmounts[modeOfPayment]?.amount;
    return {
      payment_option_id,
      payment_option_code,
      psp_id,
      psp_name,
      user_declared_transaction_count: transaction_count,
      total_reconciliation_transaction_count:
        totalReconciliationAmount?.[modeOfPayment]?.transaction_count,
      total_transaction_amount: terminalTransaction,
      total_user_declared_amount: total_transaction_amount,
      total_reconciliation_amount: transactionRegisterDayEnd,
      user_declared_denomination_details: userDeclaredDenominationDetails,
      reconciliation_denomination_details: reconciliationDenominationDetails
    };
  });

  const terminal_name = terminalsMap[terminal_id]?.terminal_name || "";

  return {
    register_transaction_id,
    outlet_id,
    terminal_id,
    terminal_name,
    register_id,
    register_open_by,
    register_open_at,
    register_close_by,
    register_close_at,
    reconciliation_close_by,
    reconciliation_close_at,
    float_cash,
    closing_float_cash,
    register_transaction_summary: registerTransactionSummary,
    reconciliation_notes,
    reconciliation_status
  };
}

function terminalRegisterDayendListResponseMapper({
  terminalRegisters,
  terminalDayend,
  terminalTransactions,
  terminalsMap,
  denominationsMap
}) {
  return terminalRegisters.map(terminalRegister => {
    const {
      register_transaction_id,
      terminal_id,
      outlet_id,
      register_id,
      register_open_by,
      register_open_at,
      register_close_by,
      register_close_at,
      float_cash,
      closing_float_cash,
      register_transaction_summary: userDeclaredAmount
    } = terminalRegister;

    const matchedTerminalDayend =
      terminalDayend.find(dayend => dayend.register_transaction_id === register_transaction_id) ||
      {};

    const {
      created_by: reconciliation_close_by,
      created_at: reconciliation_close_at,
      reconciliation_notes,
      reconciliation_status,
      register_transaction_summary: reconciliationAmount
    } = matchedTerminalDayend;

    const totalUserDeclaredAmount = userDeclaredAmount
      .map(method => Amount(method.total_transaction_amount))
      .reduce((acc, amount) => acc.add(amount), Amount(ZERO_AMOUNT))
      .toJSON();

    const totalReconciliationAmount = reconciliationAmount
      ?.map(method => Amount(method.total_reconciliation_amount))
      .reduce((acc, amount) => acc.add(amount), Amount(ZERO_AMOUNT))
      .toJSON();

    const matchedTerminalTransactions = terminalTransactions.reduce((acc, transaction) => {
      if (transaction.register_transaction_id === register_transaction_id) {
        const filteredTransaction = {
          ...transaction,
          payment_methods: transaction.payment_methods.filter(
            method => method.payment_option_code !== PAYMENT_OPTION_CODES.WALLET
          )
        };
        acc.push(filteredTransaction);
      }
      return acc;
    }, []);

    const totalTransactionAmount = matchedTerminalTransactions
      .flatMap(transaction => {
        return transaction.payment_methods.map(method => Amount(method.amount));
      })
      .reduce((acc, amount) => acc.add(amount), Amount(ZERO_AMOUNT))
      .toJSON();

    const terminal_name = terminalsMap[terminal_id]?.terminal_name || "";

    const terminalDayendMatchedTerminalRegister = terminalDayend.find(
      dayend => dayend.register_transaction_id === terminalRegister.register_transaction_id
    );

    const terminalTransactionsMatchedTerminalRegister = terminalTransactions.filter(
      transaction =>
        transaction.register_transaction_id === terminalRegister.register_transaction_id
    );

    const { register_transaction_summary } = terminalRegisterDayendResponseMapper({
      terminalRegister: [terminalRegister],
      terminalDayend: [terminalDayendMatchedTerminalRegister],
      terminalTransactions: terminalTransactionsMatchedTerminalRegister,
      terminalsMap,
      denominationsMap
    });

    return {
      register_transaction_id,
      outlet_id,
      register_id,
      terminal_name,
      terminal_id,
      register_open_by,
      register_open_at,
      register_close_by,
      register_close_at,
      reconciliation_close_by,
      reconciliation_close_at,
      float_cash,
      closing_float_cash: closing_float_cash || null,
      total_transaction_amount: totalTransactionAmount,
      total_user_declared_amount: totalUserDeclaredAmount,
      total_reconciliation_amount: totalReconciliationAmount,
      register_transaction_summary,
      reconciliation_notes,
      reconciliation_status
    };
  });
}

module.exports = { terminalRegisterDayendListResponseMapper, terminalRegisterDayendResponseMapper };
