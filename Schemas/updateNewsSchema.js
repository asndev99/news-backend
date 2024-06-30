const z = require("zod");

const updateNewsSchema = z.object({
  title: z
    .string({ message: "title must be string" })
    .min(5)
    .max(100)
    .nullable(),
  content: z
    .string({ message: "content must be string" })
    .min(10)
    .max(30000)
    .nullable(),
});

module.exports = updateNewsSchema;
