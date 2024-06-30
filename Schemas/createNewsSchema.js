const z = require("zod");

const createNewsSchema = z.object({
  title: z
    .string({ message: "title must be string" })
    .min(5)
    .max(100)
    .nonempty({ message: "title cannot be left empty" }),
  content: z.string({ message: "content must be string" }).min(10).max(30000),
});

module.exports = createNewsSchema;
