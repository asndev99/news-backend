const multer = require("multer");
const prisma = require("../db/db.config");

class ProfileController {
  static async index(req, res, next) {
    try {
      return res.status(200).json({
        success: true,
        data: req.user,
        message: "",
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      if (!req.file) {
        throw new Error("Please select file to upload");
      }
      const { id } = req.params;
      await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          Profile: req.file.filename,
        },
      });
      return res.status(200).json({
        success: true,
        data: null,
        message: "Profile picture updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
