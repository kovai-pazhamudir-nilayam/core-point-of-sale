const mapTerminalTransactionToDb = ({ details, paymentDetails }) => {
  const { outlet_id, order_channel, order_number } = details;
  const { channel_info } = order_channel;
  const channelInfo = channel_info?.reduce((acc, info) => {
    const [values] = info.values;
    acc[info.name] = values;
    return acc;
  }, {});

  const { audit, amount, payment_intent_methods } = paymentDetails;
  const payment_methods = payment_intent_methods.reduce((acc, method) => {
    const { payment_option, payment_service_provider, total_amount } = method;
    acc.push({
      payment_option_id: payment_option.payment_option_id,
      payment_option_code: payment_option.code,
      psp_id: payment_service_provider.psp_id,
      psp_name: payment_service_provider.name,
      amount: total_amount
    });
    return acc;
  }, []);

  const terminalTransactionBody = {
    outlet_id,
    terminal_id: channelInfo?.terminal_id,
    register_transaction_id: channelInfo?.register_transaction_id,
    register_id: channelInfo?.register_id,
    user_id: channelInfo?.cashier_id,
    order_number,
    order_amount: amount,
    payment_methods: JSON.stringify(payment_methods),
    created_at: audit.created_at,
    last_modified_at: audit.last_modified_at
  };

  return terminalTransactionBody;
};

module.exports = { mapTerminalTransactionToDb };
