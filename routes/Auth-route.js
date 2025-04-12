const { Router } = require("express");
const { signUp,login } = require("../controllers/Auth-controller");
const { signUpValidation } = require("../middleware/Validations");


authRouter = Router();



authRouter.post("/signup", signUpValidation,signUp);
authRouter.post("/login",login)


module.exports = authRouter;