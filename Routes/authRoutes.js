const AuthController = require("../Controllers/authController");
const validateSchema = require("../Middlewares/validationMiddleware");
const { registerSchema } = require("../Schemas/authSchema");

const authRouter = require("express").Router();

authRouter.post("/", validateSchema(registerSchema), AuthController.register);

module.exports = authRouter;
