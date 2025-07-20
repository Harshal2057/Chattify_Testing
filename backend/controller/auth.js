import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import cloudinaryConnect from "../config/cloudinary.js";
import { v2 as cloudinary } from 'cloudinary';
import uploadPhoto from "../utils/photoUpload.js";




const signUp = async (req, res) => {
  const saltRounds = 10;

  try {
    const { name, email, password } = req.body;

    // 1. Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields !!",
      });
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // 3. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // 4. Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 characters long",
      });
    }

    // 5. Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 6. Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 7. Generate token and send response
    await generateToken(newUser._id, res);

    return res.status(201).json({
      success: true,
      message: "User signed up successfully!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error(`Error occurred while signing up => ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async(req , res) => {

    try {
        const {email , password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success:false,
                message:"Please enter all the field"
            })
        }

        //1. Fetching user from database using email
        const user = await User.findOne({email});

        //2. Checking whether user exists
        if (!user) {
            return res.status(400).json({
                success:false,
                message:"No user found  , try signing in"
            })
        }
        
          
        //3. Verifying password
        const checkPassword = await bcrypt.compare(password , user.password);

        if (!checkPassword) {
          
            return res.status(400).json({
                success:false,
                message:"Password doesnt matches !!"
            })
        }

        //4. Generate Token for the user
        const token = await generateToken(user._id , res);

      
            return res.status(200).json({
                success:true,
                message:"User logged in successfully !!",
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email
                },
                token:token
            })
        
        

    } catch (error) {
        console.log(`Error occured while logging in the user => ${error}`);

        return res.status(500).json({
            success:false,
            message:`Error occured while logging in the user => ${error}`
        })
        
    }

}

const logOut = async(req , res) => {

    try {
        
        res.cookie("jwt" , "" , {maxAge:0});
        
        return res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })

    } catch (error) {
        console.log(`Error occured while logging out the user => ${error}`);

        return res.status(500).json({
            success:false,
            message:`Error occured while logging out the user => ${error}`
        })
        
    }

}

const checkAuth = async(req ,res) => {

    try {
        
      return  res.status(200).json({
            success:true,
            user:req.user
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:`Error occured while checkauth => ${error}`
        })
    }

}

const updateProfilePic = async(req , res) => {

  try {
    
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success:false,
        message:"Unauthorized user"
      })
    }

    //might change imageFile to profilePic
    const image = req.files.imageFile;

    if (!image) {
      return res.status(400).json({
        success:false,
        message:"No image file uploaded"
      })
    }

    const uploadResponse = await uploadPhoto(image , "Profile_pic")
   
      const profilePic = await User.findByIdAndUpdate(user._id , {
        $set:{
          profilePic:uploadResponse.secure_url
        }
      },
    {new:true}
    )
    

     res.status(200).json({
          profilePic,
            success:true,
            message:"Image uploaded successfully"
        })

  } catch (error) {
      return   res.status(400).json({
            success:false,
            message: error.message || `Error occured while uploading profilepic => ${error}`
  })
}
}


export  {signUp , logOut , login , checkAuth , updateProfilePic};
