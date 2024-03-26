import { query } from "./_generated/server";

export const getTests = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tests").collect();
  },
});
