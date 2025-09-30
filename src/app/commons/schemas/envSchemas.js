exports.envSchema = {
  type: "object",
  properties: {
    HOST: { type: "string", default: "0.0.0.0" },
    PORT: { type: "integer", default: 4444 },
    LOG_LEVEL: { type: "string" },

    DB_USER: { type: "string", default: "postgres" },
    DB_PASSWORD: { type: "string", default: "postgres" },
    DB_NAME: { type: "string", default: "postgres" },
    DB_HOST: { type: "string", default: "localhost" },
    DB_PORT: { type: "string", default: "5432" },

    CORE_NETWORK_SERVICE_URI: { type: "string" },
    CORE_PAYMENT_SERVICE_URI: { type: "string" },
    AUTH_TOKEN: { type: "string" },
    POINT_OF_SALE_EVENT_TOPIC: { type: "string" },
    AUDIT_EVENT_TOPIC: { type: "string" },
    IS_AUDIT_ENALBLED: { type: "string" },
    ENVIRONMENT: { type: "string" }
  }
};
