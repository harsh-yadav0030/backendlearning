import multer from "multer"; // import multer

// configure storage which storage we are using 
const storage = multer.diskStorage({
  // where to store files
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // folder path
  },

  // how to name files
  filename: function (req, file, cb) {
    // create unique suffix using timestamp + random number
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    // append original name to avoid overwrite
    cb(null, uniqueSuffix + "-" + file.originalname);
  }

});

// create upload middleware
export const upload = multer({ storage });