const bcrypt = require("bcryptjs");
const prisma = require("../db/db.config");
const {
  ValidationError,
  ConflictError,
  UnauthorizedError,
} = require("../customErrors");
const { generateToken } = require("../Middlewares/authMiddleware");

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, name, password } = req.body;
      //check if user exists with same email or not.
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (existingUser) {
        throw new ConflictError("User with this email already exists");
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashPassword,
        },
      });
      return res.status(200).json({
        success: true,
        data: user,
        message: "Account created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      const isPassword = bcrypt.compareSync(password, user.password);
      if (!user || !isPassword) {
        throw new UnauthorizedError("Please enter correct credentials");
      }
      const token = generateToken({
        userId: user.id,
        email,
        name: user.name,
        profile: user.Profile,
      });

      return res.status(200).json({
        success: true,
        data: { ...user, token },
        message: "Successfully logged in.",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
