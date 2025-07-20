import { getReceiverSocketId } from "../config/socket.js";
import User from "../models/User.js"
import Message from "../models/message.js";
import uploadPhoto from "../utils/photoUpload.js";
import { io } from "../config/socket.js";


const getAllUsers = async(req , res) => {
    try {
        
        const loggedInUser = req.user._id;

        const fillteredUser = await User.find({_id:{$ne:loggedInUser}}).select("-password");

        return res.status(200).json({fillteredUser})

    } catch (error) {
        console.log(`Error occured while fetching all the user => ${error}`);

        return res.status(500).json({
            success:false,
            message:`Error occured while fetching all the user => ${error}`,
        })
        
    }
}

const getMessages = async(req ,res) => {
    try {

        console.log("in get messages");
        

        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const getMessages = await Message.find({
            $or:[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId}
            ]
        })

        // if (getMessages) {
        //     console.log("messages in backend => " , getMessages);
            
        // }

        return res.status(200).json({
            success:true,
            message:"Messages fetched from database successfully",
            getMessages
        })
    } catch (error) {
        console.log(`Error occured while fetching messages from database => ${error}`);

        return res.status(500).json({
            success:false,
            message:`Error occured while fetching messages from database => ${error}`
        })
        
    }
}

const sendMessage = async(req , res) => {
    try {

        console.log("in send message in backend");
        

        const {text} = req.body;//messageData
          const image = req.files?.image; 
        const {id : receiverId }= req.params;//params along with base url
        const senderId = req.user._id;//from protected route

        let imageUrl;

        if (image) {
            console.log("Image is present");
            
            const uploadResponse = await uploadPhoto(image , "messageImage");

            if (uploadResponse) {
                imageUrl = uploadResponse.secure_url
            }
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            images:imageUrl
        })

        //todo : realtime functionality using socket.io
        const receiversocketid = getReceiverSocketId(receiverId);

        if (receiversocketid) {
            io.to(receiversocketid).emit("newMessage" , newMessage)
        }

          return res.status(200).json({
            success:true,
            message:"Success from Send Message",
            newMessage
        })
    } catch (error) {
        console.log(`Error occured while sending meassage => ${error}`);

        return res.status(500).json({
            success:false,
            message:`Error occured while sending meassage => ${error}`
        })
        
    }
}

export {getAllUsers , getMessages , sendMessage} ;