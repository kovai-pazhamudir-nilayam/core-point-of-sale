const { PosScanRepo, POS_SCAN } = require("../repository/pos_scan");

function getPosScanService(fastify) {
  const { getPosScan } = PosScanRepo();

  return async ({ query }) => {
    const { mode } = query;

    const repoResponse = await getPosScan.call(fastify.knex, {
      filters: {
        where: { [POS_SCAN.COLUMNS.POS_MODE]: mode || "POS" }
      }
    });

    return repoResponse;
  };
}
module.exports = getPosScanService;
