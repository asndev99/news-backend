const authRouter = require("./authRoutes");

const rootRouter = require("express").Router();

rootRouter.use("/auth", authRouter);
rootRouter.route("*", (req, res) => {
  return res.status(404).json({
    success: false,
    data: null,
    message: "Route Not Found",
  });
});

module.exports = rootRouter;
