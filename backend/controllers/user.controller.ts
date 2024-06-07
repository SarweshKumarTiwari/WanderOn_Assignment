import asyncHandler from "../handlers/asyncHandler";
import { AppError } from "../handlers/errorHandler";
import { isStrongPassword,isEmail} from "validator";
import usersEntity from "../models/users.entity";
import jwt, { JwtPayload } from "jsonwebtoken"
import { CookieOptions } from "express";

interface payload extends JwtPayload{
    id:string
}

const cookieOptions:CookieOptions={
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    path:'/'
}



// registerUser() is used to register user
// asyncHandler is a wrapper which handels async function errors
export const registerUser = asyncHandler(async (req,res)=>{
    const body=req.body

    // parameters verification
    if (!(body.username&&body.email&&body.password)) {
        throw new AppError("Please provide given params",400)
    }

    // checking if password or email is strong
    if (!isStrongPassword(body.password)||!isEmail(body.email)) {
        throw new AppError("Your password is not strong or email is not valid",400)
    }
    // revert if user already exists
    if (await usersEntity.findOne({email:body.email})) {
        throw new AppError("user already exists",400)
    }

    // used user.pre() to encrypt password using bcrypt in ../model/users.entity
    // saving user in database
    const user=await new usersEntity(body).save();

    // used user.methods.accessToken() in ../model/users.entity with JWT
    const access_token=user.accessToken();

    // used httpOny cookies to prevent XSS attack
    res.cookie("access_token",access_token,cookieOptions);
    res.status(200).json({success:"user registered successfully"})
});



// authorise() is used to logged user in
export const authorise = asyncHandler(async (req,res)=>{
    const body=req.body;
    if (!(body.email&&body.password)) {
        throw new AppError("No email or password provided",400);
    }
    const user=await usersEntity.findOne({$or:[{username:body.email},{email:body.email}]});
    if (!user) {
        throw new AppError("No user found",400)
    }

    // user.compare() is used to compare password wth hashed password in ../model/users.entity with bcrypt
    if (!await user.compare(body.password)) {
        throw new AppError("password incorrect",400)
    }

    // used user.methods.accessToken()  in ../model/users.entity with JWT
    const access_token=user.accessToken();

    // used httpOny cookies to prevent XSS attack
    res.cookie("access_token",access_token,cookieOptions);
    res.status(200).json({success:"user logged"});
});



// authenticate() is used to authenticate user 
export const authenticate = asyncHandler(async (req,res,next) => {
    if (!req.cookies.access_token) {
        throw new AppError("No token bad request",400);
    }

    // verify token to get get user information 
    req.uid=(jwt.verify(req.cookies.access_token,process.env.ACCESS_TOKEN as string)as payload).id;
    next();
})



// getLoggedUser() is used get user  details if user is authentic
export const getLoggedUser = asyncHandler(async (req,res) => {
    if (!req.uid) {
        throw new AppError("User not authentic",400)
    }
    const user=await usersEntity.findById(req.uid).select("-password -refresh_token")
    res.status(200).json({success:user})
})



//logoutUser() use to logout user
export const logoutUser = asyncHandler(async (req,res) => {
    if (!req.uid) {
        throw new AppError("User not authentic",400)
    }
    res.clearCookie("access_token");
    res.status(200).json({success:"logged out"})
})
