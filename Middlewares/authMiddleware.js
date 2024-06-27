const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../customErrors");
module.exports = {
  generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  },

  verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Please login to continue");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new UnauthorizedError("Please login to continue");
      }

      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        const unAuthorizedInstance = new UnauthorizedError(
          "Please login to continue"
        );
        next(unAuthorizedInstance);
      }
      next(error);
    }
  },
};
