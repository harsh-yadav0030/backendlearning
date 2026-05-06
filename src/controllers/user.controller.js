import { asyncHandler } from "../utils/asychandler.js"


const registerUser = asyncHandler( async (req,res)=>{
     res.status(300).json({
        message:"ok"
     })
})

export {registerUser}