import dotenv from "dotenv";
import {app} from './app.js'
import connectDb from "./db/index.js";

dotenv.config({
    path:'./.env'
})

connectDb()
.then(()=>{
    // server is a asynchronous code thats why we cant handle it with try catch
     const server= app.listen(process.env.PORT || 8000,()=>{
        console.log("Server is running at",process.env.PORT);
      })
    
    server.on("error",error=>{
       console.log("Server failed : ",error);
    })
     
   
})
.catch((error)=>{
    console.log("MongoDb conection failed !!: ",error);
})
























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

