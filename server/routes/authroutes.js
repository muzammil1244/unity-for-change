import { Router } from 'express'
import { Login, Register } from "../controller/authcontroller.js"
import { upload } from '../midlleware/Multer.js'


 const router = Router()

router.post("/register",upload.single("file"),Register)
router.post("/login",Login)



export default router


