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
newsRouter.get("/:id", NewsController.show);
newsRouter.patch(
  "/:id",
  verifyToken,
  upload.single("postImage"),
  NewsController.update
);
newsRouter.delete("/:id", verifyToken, NewsController.destroy);

module.exports = newsRouter;
