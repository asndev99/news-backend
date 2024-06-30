const NewsController = require("../Controllers/newsController");
const { verifyToken } = require("../Middlewares/authMiddleware");
const upload = require("../Middlewares/multerMiddleware");
const validateSchema = require("../Middlewares/validationMiddleware");
const createNewsSchema = require("../Schemas/createNewsSchema");

const newsRouter = require("express").Router();

newsRouter.get("/", NewsController.index);
newsRouter.post(
  "/",
  verifyToken,
  upload.single("postImage"),
  validateSchema(createNewsSchema),
  NewsController.store
);

module.exports = newsRouter;
