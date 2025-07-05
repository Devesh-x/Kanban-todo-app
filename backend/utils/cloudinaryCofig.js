// backend/cloudinaryConfig.js
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;

import dotenv from "dotenv";
dotenv.config(); // dont know why it was not working without this 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
