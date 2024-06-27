const ProfileController = require("../Controllers/profileController");
const { verifyToken } = require("../Middlewares/authMiddleware");
const upload = require("../Middlewares/multerMiddleware");

const profileRouter = require("express").Router();

profileRouter.get("/", verifyToken, ProfileController.index);
profileRouter.patch(
  "/:id",
  verifyToken,
  upload.single("profileImage"),
  ProfileController.update
);

module.exports = profileRouter;
