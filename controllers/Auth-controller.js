const HttpError = require("../error-handle/Http-Error");
const userSchema = require("../schema/user-schema");
const bycrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");
require("dotenv").config();
const SecretKey = process.env.JWT_SECRET;


const signUp = async (req, res,next) => {
    const {name,email,password} = req.body;
    try {
        await userSchema.find({email}).then((user) => {
            if(user.length > 0){
                return  res.status(400).json({
                    message: "User already exists"
                })
            }
        } 
        )
        let hashedPassword;
        try {
            hashedPassword = await bycrypt.hash(password, 10);
        } catch (error) {
            return next(new HttpError("Password not hashed", 500))
        }
        let newUser;
        try {
            newUser = await userSchema.create({
                name,
                email,
                password: hashedPassword
            })
        } catch (error) {
            return next(new HttpError("User not created", 500))
        }
        return res.status(201).json({
            message: "User created successfully",
           
        })
    } catch (error) {
        return next(new HttpError(error, 500))
    }
}


const login = async (req, res,next) => {
    const {email,password} = req.body;

    let user;

    try {
        user = await userSchema.findOne({email});
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            }
        )
        } 
        let matchPassword;
        try {
            matchPassword = await bycrypt.compare(password, user.password);
        } catch (error) {
            return next(new HttpError("Password not matched", 500))
        }
      
       if (!matchPassword) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
      let token= jwt.sign({
            userId: user._id,
            email: user.email
        }, SecretKey, {
            expiresIn: "1d"
        })
        if (!token) {
            return next(new HttpError("Token not created", 500))
        }
        return res.status(200).json({
            message: "User logged in successfully",
            token
        })
    } catch (error) {
        return next(new HttpError(error, 500))
    }
}
exports.signUp = signUp;
exports.login = login;