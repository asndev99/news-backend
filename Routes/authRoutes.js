const AuthController = require("../Controllers/authController");
const validateSchema = require("../Middlewares/validationMiddleware");
const { registerSchema, signinSchema } = require("../Schemas/authSchema");

const authRouter = require("express").Router();

authRouter.post(
  "/signup",
  validateSchema(registerSchema),
  AuthController.register
);

authRouter.post("/signin", validateSchema(signinSchema), AuthController.login);

module.exports = authRouter;
