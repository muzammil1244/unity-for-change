import { Router } from "express";
import { CommentToNews, Delete_comment, GetAllPost, Getnews, LikedMainPOst, LikedUsersNews, Report, Suggestion, Comment_main_post, unlike_main_post, Delete_main_comment, user_profile, update_profile, likePost_admin, addComment, add_main_Comment, get_all_post_by_id } from "../controller/UserController.js";
import { Authmiddleware } from "../midlleware/authmidlleware.js";
import { NewsPos, UpdatePost, DeletePost, Get_your_liked_video, Get_your_comment, Unlike_Post_news, GetallUserList } from "../controller/AdminController.js";
import { upload } from "../midlleware/Multer.js";
import { Get_all_POST } from "../controller/MainPostcontroller.js";
const router = Router()


router.get("/client/all/news", Getnews)
router.post("/client/news", Authmiddleware, upload.array("file", 3), NewsPos)
router.patch("/client/:postid/updatenews", Authmiddleware, upload.single("file"), UpdatePost)
router.delete("/client/:postid/delete", Authmiddleware, upload.single("file"), DeletePost)
router.post("/client/suggest", Authmiddleware, Suggestion)
router.post("/client/report/:user", Authmiddleware, Report)
router.post("/client/like/:post", Authmiddleware, LikedUsersNews)
router.post("/client/comment/:post", Authmiddleware, CommentToNews)
router.get("/client/all/post",Authmiddleware, GetAllPost)
router.get("/client/all/likes", Authmiddleware, Get_your_liked_video)
router.get("/client/all/comment", Authmiddleware, Get_your_comment)
router.patch("/client/:post/unlike", Authmiddleware, Unlike_Post_news)
router.patch("/client/:post/Delete/comment", Authmiddleware, Delete_comment)
router.get("/client/user", Authmiddleware, GetallUserList)
// main post handle
router.get("/client/all/main/post", Authmiddleware, Get_all_POST)
router.post("/client/like/main/:post", Authmiddleware, LikedMainPOst)
router.post("/client/comment/mainpost/:post", Authmiddleware, add_main_Comment)
router.patch("/client/unlike/main/:post", Authmiddleware, unlike_main_post)
router.delete("/client/post/:postId/comment/:commentId", Authmiddleware, Delete_main_comment);
router.get("/client/specific_user/:userId", get_all_post_by_id)

// handle profile

router.get("/client/profile", Authmiddleware, user_profile)
router.put(
    "/client/update_profile",
    Authmiddleware,
    upload.fields([
        { name: "profileimage", maxCount: 1 },
        { name: "cover_image", maxCount: 1 },
    ]),
    update_profile
);


// main post admin

router.post("/client/:postId/like", likePost_admin);
router.post("/client/:postId/comment", addComment);






export default router