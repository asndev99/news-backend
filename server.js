const express = require("express");
const errorMiddleware = require("./Middlewares/errorMiddleware");
const rootRouter = require("./Routes");
const app = express();
require("dotenv").config();

//health check
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    data: "server is running",
  });
});
//middlewares
app.use(express.json()); // To parse JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use("/api", rootRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
