const { SUCCESS_RESPONSE } = require("../../outlet-config/commons/constants");
const { PosModesRepo } = require("../repository/pos_modes");

function postPosModeService(fastify) {
  const { createPosMode } = PosModesRepo();

  return async ({ body }) => {
    const { pos_mode, category_ids } = body;

    await createPosMode.call(fastify.knex, {
      input: {
        pos_mode,
        category_ids: JSON.stringify(category_ids)
      }
    });

    return SUCCESS_RESPONSE;
  };
}
module.exports = postPosModeService;
