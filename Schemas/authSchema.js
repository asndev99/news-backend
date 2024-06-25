const z = require("zod");

const registerSchema = z.object({
  name: z
    .string({ message: "name is required" })
    .nonempty({ message: "name cannot be empty" }),
  email: z
    .string({ message: "email is required" })
    .email({ message: "please enter valid email" }),
  password: z
    .string({ message: "password must consist of characters" })
    .min(8, { message: "password must be atleast 8 characters long" }),
});

module.exports = {
  registerSchema,
};
