const { validationResult, check } = require('express-validator');

exports.validateCandidate = [
    check('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
          next();
        }
];