import { Router } from "express";
import { GetAllPost, Getnews, LikedUsersNews, Report, Suggestion } from "../controller/UserController.js";
import { Authmiddleware } from "../midlleware/authmidlleware.js";
import { NewsPos, UpdatePost, DeletePost } from "../controller/AdminController.js";
import { upload } from "../midlleware/Multer.js";
const router = Router()


router.get("/client/all/news", Authmiddleware, Getnews)
router.post("/client/news", Authmiddleware, upload.single("file"), NewsPos)
router.patch("/client/:postid/updatenews", Authmiddleware, upload.single("file"), UpdatePost)
router.delete("/client/:postid/delete", Authmiddleware, upload.single("file"), DeletePost)
router.post("/client/suggest", Authmiddleware, Suggestion)
router.post("/client/report/:user", Authmiddleware, Report)
router.post("/client/like/:post", Authmiddleware, LikedUsersNews)
export default router