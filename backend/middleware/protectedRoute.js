import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import User from "../models/User.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const protectedRoute = async(req , res , next) => {

    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(400).json({
                success:false,
                message:"No token found"
            })
        }
        
        const decodeToken =  jwt.verify(token , JWT_SECRET)

        if (!decodeToken) {
            return res.status(400).json({
                success:false,
                message:"Unauthorized token"
            })
        }

        const user = await User.findById(decodeToken.id).select("-password")

        if (!user) {
            return res.status(400).json({
                success:false,
                 message:"User not found in Protected route"
            })
        }

        req.user = user;

        next();

    } catch (error) {
            console.log(`Error occured while verifying token => ${error}`);
            

        return res.status(400).json({
            success:false,
            message:`Error occured in Proteced route => ${error}`
        })
    }

}

export default protectedRoute;