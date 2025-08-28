exports.seed = async knex => {
  await knex("feature_configuration").del();
  await knex("feature_configuration").insert([
    {
      feature_group: "AUTH",
      feature: "LOGIN",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "AUTH",
      feature: "LOGOUT",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "AUTH",
      feature: "AUTHORISE",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "POS",
      feature: "GET_OUTLET_DETAILS",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "POS",
      feature: "TERMINAL_SELECTION",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "POS",
      feature: "REGISTER_OPEN",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "POS",
      feature: "REGISTER_CLOSE",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "CUSTOMER",
      feature: "GET_CUSTOMER",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "CUSTOMER",
      feature: "FETCH_CUSTOMER",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "CATALOG",
      feature: "SCAN_PRODCUT",
      execution_mode: "LOCAL",
      fallback_mode: "REMOTE"
    },
    {
      feature_group: "CHECKOUT",
      feature: "POST_CART_ITEMS",
      execution_mode: "LOCAL",
      fallback_mode: "REMOTE"
    },
    {
      feature_group: "CHECKOUT",
      feature: "FETCH_CART",
      execution_mode: "LOCAL",
      fallback_mode: "REMOTE"
    },
    {
      feature_group: "CHECKOUT",
      feature: "PATCH_CART_LINE",
      execution_mode: "LOCAL",
      fallback_mode: "REMOTE"
    },
    {
      feature_group: "CHECKOUT",
      feature: "DELETE_CART_LINE",
      execution_mode: "LOCAL",
      fallback_mode: "REMOTE"
    },
    {
      feature_group: "CHECKOUT",
      feature: "HOLD_CART",
      execution_mode: "LOCAL",
      fallback_mode: ""
    },
    {
      feature_group: "CHECKOUT",
      feature: "RESUME_CART",
      execution_mode: "LOCAL",
      fallback_mode: ""
    },
    {
      feature_group: "CHECKOUT",
      feature: "FETCH_HOLD_CART",
      execution_mode: "LOCAL",
      fallback_mode: ""
    },
    {
      feature_group: "CHECKOUT",
      feature: "FETCH_PAYMENT_SUMMARY",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "CHECKOUT",
      feature: "PLACE_ORDER",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "CHECKOUT",
      feature: "CLEAR_CART",
      execution_mode: "LOCAL",
      fallback_mode: "REMOTE"
    },
    {
      feature_group: "CHECKOUT",
      feature: "MERGE_CART",
      execution_mode: "LOCAL",
      fallback_mode: "LOCAL"
    },
    {
      feature_group: "CHECKOUT",
      feature: "PRICE_OVERRIDE",
      execution_mode: "REMOTE",
      fallback_mode: "LOCAL"
    }
  ]);
};
