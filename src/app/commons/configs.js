const { loggerPino } = require("../utils/logger");

const SWAGGER_CONFIGS = {
  routePrefix: "/documentation",
  openapi: {
    info: {
      title: "Point Of Sale",
      description: "API Docs for the Point Of Sale",
      version: "0.1.0"
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here"
    },
    host: "localhost:4444",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "Point Of Sale API's" }]
  },
  exposeRoute: true
};

const SERVER_CONFIGS = {
  loggerInstance: process.env.NODE_ENV !== "test" ? loggerPino : false,
  disableRequestLogging: true,
  keepAliveTimeout: 10000
};

module.exports = {
  SWAGGER_CONFIGS,
  SERVER_CONFIGS
};
