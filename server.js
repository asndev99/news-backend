const express = require("express");
const errorMiddleware = require("./Middlewares/errorMiddleware");
const rootRouter = require("./Routes");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    data: "server is running",
  });
});
//middlewares
app.use(express.json());
app.use("/api", rootRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
