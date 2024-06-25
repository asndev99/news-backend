const bcrypt = require("bcryptjs");
const prisma = require("../db/db.config");
const { ValidationError } = require("../customErrors");

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
        throw new ValidationError("User with this email already exists");
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
}

module.exports = AuthController;
