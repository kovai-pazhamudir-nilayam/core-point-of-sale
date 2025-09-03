/* eslint-disable complexity */
const { OutletMacVersionHistoryRepo } = require("../repository/outlet-mac-version-history");

function postFetchOutletMacVersionHistoryService(fastify) {
  const { getOutletMacVersionHistory } = OutletMacVersionHistoryRepo();

  return async ({ input }) => {
    const with_pagination = Object.hasOwnProperty.call(input?.meta || {}, "with_pagination")
      ? input.meta.with_pagination
      : true;

    const { meta, ...rest } = input;

    const response = await getOutletMacVersionHistory.call(fastify.knex, {
      input: {
        current_page: input?.meta?.pagination?.current_page,
        page_size: input?.meta?.pagination?.page_size,
        filters: { where: { ...rest } },
        with_pagination
      }
    });

    return with_pagination ? { data: response.data, meta: response.meta } : response;
  };
}

module.exports = postFetchOutletMacVersionHistoryService;
