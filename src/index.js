import 'dotenv/config'

// console.log("cloud:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("key:", process.env.CLOUDINARY_API_KEY);
// console.log("secret:", process.env.CLOUDINARY_API_SECRET);

import { app } from './app.js'
import connectDb from "./db/index.js";

connectDb()
.then(() => {

    const server = app.listen(process.env.PORT || 8000, () => {
        console.log("Server is running at", process.env.PORT);
    })

    server.on("error", error => {
        console.log("Server failed : ", error);
    })

})
.catch((error) => {
    console.log("MongoDb connection failed !!: ", error);
})