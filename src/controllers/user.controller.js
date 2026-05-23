import { asyncHandler } from "../utils/asychandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = user.generateAccessToken;
    const refreshToken =user.generateRefreshToken;

    // optional: save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };

  } catch (error) {
    throw new ApiError(500,"Something went wrong while generating access and refresh token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
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
  const { fullname, email, username, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(404, "fullname field is empty");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  console.log(req.files);
  console.log(req.body);

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar file is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body se data le aao
  // username,email
  // check username
  // password check
  // access token and refresh token
  // send cookie

  const { email, username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "Username or Password is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Password is incorrect");
  }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser=await user.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly : true,
      Secure : true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, accessToken,
          refreshToken
        },
        "User logged in successfully"
      ))
});

const logoutUser = asyncHandler( async (req,res)=>{
       
})



export { registerUser, loginUser };
