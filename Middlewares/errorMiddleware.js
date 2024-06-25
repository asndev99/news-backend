const errorMiddleware = (err, req, res, next) => {
  return res.status(err.status ?? 500).json({
    success: false,
    data: null,
    message: err.message ?? "Something went wrong",
  });
};

module.exports = errorMiddleware;
