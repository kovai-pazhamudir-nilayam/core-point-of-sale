const { PosModesRepo, POS_MODES } = require("../repository/pos_modes");

function getPosModesService(fastify) {
  const { getPosModes } = PosModesRepo();

  return async ({ query }) => {
    const { mode } = query;

    const repoResponse = await getPosModes.call(fastify.knex, {
      filters: {
        where: { [POS_MODES.COLUMNS.POS_MODE]: mode || "POS" }
      }
    });

    return repoResponse;
  };
}
module.exports = getPosModesService;
