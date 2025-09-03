require("dotenv").config();
const fastifyEnv = require("@fastify/env");
const fastifyHealthcheck = require("fastify-healthcheck");
const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");
const fastifyMetrics = require("fastify-metrics");

const { envSchema: schema } = require("./app/commons/schemas/envSchemas");
const { knexConfig } = require("../config/index");

// import routes
const terminalRoutes = require("./app/terminal/routes");
const posModesRoutes = require("./app/pos-config/routes");
const posScanRoutes = require("./app/pos-scan/routes");
const outletConfigRoutes = require("./app/outlet-config/routes");
const FeatureConfigurationRoutes = require("./app/feature-config/routes");
const OutletDeploymentRoutes = require("./app/outlet-deployment/routes");
const RolloutFeatureConfigRoutes = require("./app/rollout-feature-config/routes");
const PostOutletDeviceRoutes = require("./app/outlet-device/routes");

// PLUGINS
const ajv = require("./app/plugins/ajv");
const knex = require("./app/plugins/knex");
const httpClient = require("./app/plugins/httpClient");
const pubsub = require("./app/plugins/pubsub");

const {
  extractLogTrace,
  requestLogging,
  responseLogging,
  setChildLogger
} = require("./app/hooks/logging");

const {
  SWAGGER_CONFIGS,
  // SWAGGER_UI_CONFIGS,
  SERVER_CONFIGS
} = require("./app/commons/configs");
const { METRICS_CONFIGS } = require("./app/commons/metrics.config");

const { errorHandler } = require("./app/errorHandler");

const setupAllShutdownHandlers = require("./shutdown");

async function create() {
  // eslint-disable-next-line global-require
  const fastify = require("fastify")(SERVER_CONFIGS);

  // Env vars plugin
  await fastify.register(fastifyEnv, { dotenv: true, schema });

  fastify.setErrorHandler(errorHandler());
  fastify.register(fastifyHealthcheck);

  // HOOKS
  fastify.addHook("onRequest", extractLogTrace);
  fastify.addHook("preValidation", requestLogging);
  fastify.addHook("preValidation", setChildLogger);
  fastify.addHook("onSend", responseLogging);

  // PLUGINS
  fastify.register(ajv);
  fastify.register(httpClient);
  fastify.register(knex, knexConfig);
  await fastify.register(pubsub);

  if (process.env.ENVIRONMENT !== "PROD") {
    fastify.register(swagger, SWAGGER_CONFIGS);
    fastify.register(swaggerUi, SWAGGER_CONFIGS);
  }

  // ROUTES
  fastify.register(terminalRoutes, { prefix: "/v1" });
  fastify.register(posModesRoutes, { prefix: "/v1" });
  fastify.register(outletConfigRoutes, { prefix: "/v1" });
  fastify.register(posScanRoutes, { prefix: "/v1" });
  fastify.register(FeatureConfigurationRoutes, { prefix: "/v1" });
  fastify.register(OutletDeploymentRoutes, { prefix: "/v1" });
  fastify.register(RolloutFeatureConfigRoutes, { prefix: "/v1" });
  fastify.register(PostOutletDeviceRoutes, { prefix: "/v1" });

  if (process.env.NODE_ENV !== "test") {
    fastify.register(fastifyMetrics, METRICS_CONFIGS);
  }

  return fastify;
}

async function start() {
  const fastify = await create();
  await fastify.ready();

  setupAllShutdownHandlers({ fastify });

  // Run the server!
  fastify.listen({ port: fastify?.config?.PORT, host: fastify?.config?.HOST }, (err, address) => {
    /* istanbul ignore next */
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    // eslint-disable-next-line no-console
    console.log(`server listening on ${address}`);
    // eslint-disable-next-line no-console
    // console.log("Environment Variables:", JSON.stringify(fastify.config));
  });
}

if (process.env.NODE_ENV !== "test") start();

module.exports = {
  create,
  start
};
