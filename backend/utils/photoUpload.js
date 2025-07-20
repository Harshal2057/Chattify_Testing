import cloudinaryConnect from "../config/cloudinary.js";
import { v2 as cloudinary } from 'cloudinary';
import message from "../models/message.js";

function isFileTypeSupported(supportedFileType ,fileType ){

    const valid = supportedFileType.includes(fileType);
     return valid;
}

async function uploadToCloudinary(file , folder) {
  const option = {folder};

  return await cloudinary.uploader.upload(file.tempFilePath , option)
}

const uploadPhoto = async(image , folder) => {

    const supportedFileType = ["jpeg" , "png" , "jpg"];
    const fileType = image.name.split(".")[1].toLowerCase();

    try {
        
        //Checking whether the fileType is valid
        if (!isFileTypeSupported(supportedFileType , fileType)) {
              throw new Error("file type not supported");   
        }

        //Upload to cloudinary
        const uploadResponse = await uploadToCloudinary(image , folder)

        if (uploadResponse) {
            return uploadResponse;
        }

    } catch (error) {
        throw new Error(`${error}`);
    }

}

export default uploadPhoto;