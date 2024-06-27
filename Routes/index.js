const authRouter = require("./authRoutes");
const profileRouter = require("./profileRoutes");

const rootRouter = require("express").Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/profile", profileRouter);
rootRouter.route("*", (req, res) => {
  return res.status(404).json({
    success: false,
    data: null,
    message: "Route Not Found",
  });
});

module.exports = rootRouter;
