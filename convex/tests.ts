import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import test from "node:test";

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
    // Find the latest test using the index
    const lastTest = await ctx.db
      .query("tests")
      .withIndex("by_creation_time")
      .order("desc")
      .first();

    // Calculate the nextTestId
    const nextTestId = `TEST-${
      lastTest ? parseInt(lastTest.testId.slice(5)) + 1 : 1
    }`;

    // Insert the new test with the calculated testId
    await ctx.db.insert("tests", {
      ...args, // Spread the other arguments
      testId: nextTestId,
    });
  },
});

export const deleteTest = mutation({
  args: { id: v.id("tests") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
