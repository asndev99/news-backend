const { ValidationError } = require("../customErrors");
const { ZodError } = require("zod");

const formatZodErrors = (zodError) => {
  const formattedErrors = zodError.issues.map((issue) => {
    return {
      path: issue.path.join("."),
      message: issue.message,
    };
  });

  return formattedErrors;
};

const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = formatZodErrors(error);
        const validationErrorInstance = new ValidationError(errors);
        next(validationErrorInstance);
      } else {
        next(error);
      }
    }
  };
};

module.exports = validateSchema;
