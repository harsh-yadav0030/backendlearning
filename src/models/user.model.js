import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true, // removes spaces from start & end
      index: true, // creates index for faster search
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String, //cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// this is pre hook(Hooks are functions that run automatically at specific points in a process.)
userSchema.pre("save", async function () {
  // Check if password field was modified or newly set
  // If NOT modified → skip hashing and go to next middleware
  if (!this.isModified("password")) return ;

  // Hash the password before saving to DB
  // bcrypt.hash(password, saltRounds)10 security level (high no slow code)
  this.password = await bcrypt.hash(this.password, 10);
 
  // Move to next middleware / complete save
});

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id : this._id,
      email : this.email,
      username : this.username,
      fullname : this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    },
  )
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    },
  )
}

export const User = mongoose.model("User", userSchema);
