import { Router } from "express";
import multer from "multer"
import { uploadPhoto, uploadVideo } from "../controllers/upload.mjs";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'bucket/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
    }
})
  
const upload = multer({ storage: storage })

router.post("/photo", upload.single("photo"), uploadPhoto)

router.post("/video", upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), uploadVideo)

export default router