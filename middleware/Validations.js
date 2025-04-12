const {body, validationResult}  = require("express-validator");

const signUpValidation = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({min: 3})
        .withMessage("Name must be at least 3 characters long"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min: 6})
        .withMessage("Password must be at least 6 characters long"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

exports.signUpValidation = signUpValidation;



