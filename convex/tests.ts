import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTests = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tests").collect();
  },
});

export const addTest = mutation({
  args: {
    testId: v.string(),
    automated: v.boolean(),
    createdBy: v.string(),
    createdByImg: v.string(),
    desc: v.string(),
    lastTested: v.string(),
    status: v.string(),
    priority: v.string(),
    label: v.string(),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    const testId = await ctx.db.insert("tests", args);
  },
});
