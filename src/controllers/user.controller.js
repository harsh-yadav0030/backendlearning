import { asyncHandler } from "../utils/asychandler.js"
import { ApiError } from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res)=>{
    //get user detail from frontend
    //validation - not empty
    //check if user already exists or not
    // check for images avatar
    // upload them to clodinary
    // create user object - entry in db
    //remove password and refresh token from response
    // check for user creation 
    //return res

  // checking for fields not to be empty
  const {fullname,email,username,password}=req.body
  
  if([fullname,email,username,password].some((field)=>
    field?.trim() === "")
){
     throw new ApiError("404","fullname field is empty")
  }


  const existedUser=User.findOne({
    $or :[{username},{email}]
  })

  if(existedUser){
    throw new ApiError("409","User Already exist ")
  }
  
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(avatarLocalPath){
  throw new ApiError(400,"avatar file is required")
}

const avatar=await uploadOnCloudinary(avatarLocalPath)
const coverImage= await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
  throw new ApiError(400,"avatar file is required")
}


const user=await User.create({
  fullname,
  avatar : avatar.url,
  coverImage:coverImage?.url||"",
  email,
  password,
  username:username.toLowerCase()
})

const createdUser=await User.findById(user._id).select(
  "-password -refreshToken"
)
if(!createdUser){
  console.log("Something went wrong while registering the user")
}

return res.status(201).json(
  new ApiResponse("2  00",createdUser,"user registered successfully")
) 

})

export {registerUser}