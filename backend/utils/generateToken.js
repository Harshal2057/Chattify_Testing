import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = async(userId , res) => {

    try {
   
        const token = await jwt.sign({id:userId} , JWT_SECRET , {expiresIn:"7d"});

        // if (token) {
        //     console.log(`Token generated successfully => ${token}`); 
        // }

       res.cookie("jwt", token , {
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict",
         secure:process.env.NODE_ENV !== "development",
       })
    

    } catch (error) {
         console.error("Token generation error:", error);
        return res.status(400).json({
            success:"false",
            message:`Error occured while generating token => ${token}`
        })
    }

}