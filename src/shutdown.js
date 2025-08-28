const { logger } = require("./app/utils/logger");

function setTrapForUncaughtExceptions() {
  process.on("uncaughtException", err => {
    // eslint-disable-next-line no-console
    console.error(
      "[UNCAUGHT_EXCEPTION]",
      `${new Date().toUTCString()}: Process will now exit. UncaughtException:`,
      err.message,
      err.stack
    );
    process.exit(1);
  });
}

module.exports = function setupAllShutdownHandlers({ fastify }) {
  async function closeDbConnection() {
    logger.info({ message: "Closing DB connection..." });
    try {
      // TODO: Close Data Store Connection
      logger.info({ message: "DB connection successfully closed!" });
    } catch (err) {
      logger.error({ message: "SERVER_SHUTDOWN closeDbConnection", err });
    }
  }

  async function closeServer() {
    logger.info({ message: "Closing server connection..." });
    try {
      await fastify.close();
      logger.info({ message: "Server successfully closed!" });
    } catch (err) {
      logger.error({ message: "SERVER_SHUTDOWN closeServer", err });
    }
  }

  function setupShutdownHandlersFor(signal) {
    process.on(signal, async function onSigterm() {
      try {
        logger.info({
          message: `Got ${signal}. Graceful shutdown start ${new Date().toISOString()}`
        });
        await closeDbConnection();
        await closeServer();
      } catch (err) {
        logger.error({
          message: "SERVER_SHUTDOWN signalHandler Could not shutdown everything cleanly!",
          err
        });
      } finally {
        process.exit();
      }
    });
  }

  setupShutdownHandlersFor("SIGINT");
  setupShutdownHandlersFor("SIGTERM");
  setTrapForUncaughtExceptions();
};
