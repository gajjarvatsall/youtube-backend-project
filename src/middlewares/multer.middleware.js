import multer from "multer";

// Configure storage for uploaded files
const storage = multer.diskStorage({
    // Set the destination folder for temporary file uploads
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    // Set the filename to be the original name of the uploaded file
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
// Create the multer upload middleware using the defined storage settings
export const upload = multer({ 
    storage, 
})