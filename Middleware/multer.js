import multer from 'multer'
import path from 'path';
import dotenv from 'dotenv'
dotenv.config()

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //images are stored in Frontend uploads folder
        cb(null,process.env.UPLOAD_PATH)
    },
    filename: function(req, file, cb){
        cb(null, file.originalname); 
    }
})
export const upload = multer({storage: storage})