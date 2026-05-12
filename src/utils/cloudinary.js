import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log("cloud:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("key:", process.env.CLOUDINARY_API_KEY);
// console.log("secret:", process.env.CLOUDINARY_API_SECRET);


const uploadOnCloudinary = async (localFilePath) => {
  try {

    if (!localFilePath) return null;

    // upload file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // remove local temp file
    fs.unlinkSync(localFilePath); 
    return response;


  } catch (error) {

    console.log("Cloudinary upload error:", error);

    // remove temp file if exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };