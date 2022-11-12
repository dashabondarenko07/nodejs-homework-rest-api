const { RequestError } = require("../helpers/index");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestError(400, "Missing required name field"));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
