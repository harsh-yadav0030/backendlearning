import dotenv from "dotenv";
import express from "express";

import connectDb from "./db/index.js";

dotenv.config({
    path:'./.env'
})

connectDb();
























// database connection with backend method 1
/* const app = express();
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on(error,(error)=>{
            console.log("Error : ",error)
            throw error
        })

       app.listen(process.env.PORT , ()=>{
          console.log(`App listening on ${process.env.PORT}`)
       })

    }catch(error){
     console.error("ERROR : ",error);
     throw error
    }

})(); // function and instantly called that function */

