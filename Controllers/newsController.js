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
          where: {
            deleted_at: false,
          },
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

        prisma.news.count({ where: { deleted_at: false } }),
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

  static async show(req, res, next) {
    try {
      const { id } = req.params;
      const news = await prisma.news.findUnique({
        where: {
          id: Number(id),
          deleted_at: false,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              Profile: true,
            },
          },
        },
      });
      return res.status(200).json({
        success: true,
        data: news,
        message: null,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;

      const news = await prisma.news.findUnique({
        where: {
          id: Number(id),
          user: {
            id: user.userId,
          },
        },
      });
      if (!news) {
        return res.status(404).json({
          success: false,
          data: null,
          message: "Record Not Found",
        });
      }
      let updatedPayload = {
        ...req.body,
      };
      if (req.file) {
        updatedPayload.image = req.file.filename;
      }
      const updatedNews = await prisma.news.update({
        where: {
          id: news.id,
        },
        data: {
          ...updatedPayload,
        },
      });

      return res.status(200).json({
        success: true,
        data: updatedNews,
        message: "news updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req.user;
      const deletedNews = await prisma.news.updateMany({
        where: {
          id: Number(id),
          deleted_at: false,
          user: {
            id: userId,
          },
        },
        data: {
          deleted_at: true,
        },
      });
      console.log(deletedNews);
      if (deletedNews.count !== 1) {
        return res.status(404).json({
          success: false,
          data: null,
          message: "Record Not Found To Delete",
        });
      }
      return res.status(200).json({
        success: true,
        data: null,
        message: "Data Deleted Successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NewsController;
