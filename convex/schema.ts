import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tests: defineTable({
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
  }),
});
