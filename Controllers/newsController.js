const { ValidationError } = require("../customErrors");
const prisma = require("../db/db.config");

class NewsController {
  static async index(req, res, next) {
    try {
      let page = Number(req.query.page) || 1;
      let limit = Number(req.query.limit) || 1;

      if (page < 0) {
        page = 1;
      }
      if (limit <= 0 || limit > 100) {
        limit = 1;
      }

      const skip = (page - 1) * limit;
      const [data, count] = await Promise.all([
        prisma.news.findMany({
          skip,
          take: limit,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                Profile: true,
              },
            },
          },
        }),

        prisma.news.count(),
      ]);
      return res.status(200).json({
        success: true,
        data,
        metadata: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        },
        message: "",
      });
    } catch (error) {
      next(error);
    }
  }

  static async store(req, res, next) {
    try {
      if (!req.file) {
        throw new ValidationError("Please select image");
      }
      const { userId } = req.user;
      const newsPayload = {
        user_id: userId,
        title: req.body.title,
        content: req.body.content,
        image: req.file.filename,
      };
      const news = await prisma.news.create({
        data: newsPayload,
      });
      return res.status(200).json({
        success: true,
        data: news,
        message: "news created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async show(req, res) {}

  static async update(req, res) {}

  static async destroy(req, res) {}
}

module.exports = NewsController;
