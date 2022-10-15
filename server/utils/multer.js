const multer = require("multer");
const path = require("path");

module.exports = multer({storage: multer.diskStorage({}),
fileFilter: (req, file, cb) => {

 let upload = path.extname(file.originalname);  

if ( upload !== ".jpeg" &&  upload !== ".jpg" &&  upload !== ".png" ) {

    cb(new Error("The image type is not allowed"), false);
    
     return;
    }

    cb(null, true);

  },})