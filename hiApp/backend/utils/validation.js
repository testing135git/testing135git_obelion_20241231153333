const { check, validationResult } = require('express-validator');

const profileValidationRules = () => {
  return [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('phone').notEmpty().withMessage('Phone is required')
  ];
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
}

module.exports = {
  profileValidationRules,
  validate,
};
