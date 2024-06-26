class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status ? status : 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 422);
  }
}

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

class ConflictError extends AppError {
  constructor(message) {
    super(message, 409);
  }
}

module.exports = {
  ValidationError,
  UnauthorizedError,
  ConflictError,
};
