const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    data: "server is running",
  });
});
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
