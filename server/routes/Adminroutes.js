import express, { Router }  from "express"
import {NewsPos,Get_your_liked_video, UpdatePost,DeletePost, ReportMessage , Suggestion, GetallUserList, ReportAction, Add_message_to_usres, Get_your_comment, Unlike_Post_news, createPost, getPosts, updatePost, deletePost, deleteSuggestion, deleteReport} from "../controller/AdminController.js"
import { upload } from "../midlleware/Multer.js"
import { Authmiddleware } from "../midlleware/authmidlleware.js"
import { Delete_comment } from "../controller/UserController.js"
import { Create, Delete, Update,Get_all_POST } from "../controller/MainPostcontroller.js"
import { isAdmin } from "../midlleware/isAdmin.js"
const route = Router()

//main post 

route.post("/admin/main_post", upload.array("images", 5), createPost);

// get all posts
route.get("/admin/get_post", getPosts);

// update post
route.put("/admin/update_post/:id", upload.array("images", 5), updatePost);

// delete post
route.delete("/admin/delete_post/:id", deletePost);

// route.get("admin",Post)
 route.post("/admin/news",Authmiddleware,upload.single("file"),NewsPos)
 route.patch("/admin/:postid/updatenews",Authmiddleware,upload.single("file"),UpdatePost)
 route.delete("/admin/:postid/delete",DeletePost)
route.get("/admin/suggestions", Suggestion);
route.delete("/admin/:suggestionId", deleteSuggestion);

route.get("/admin/reports", ReportMessage);
route.delete("/admin/:userpostid/message", deleteReport);

route.get("/admin/all/users",GetallUserList)
route.delete("/admin/:userpostid/news",ReportAction)
route.post("/admin/:userid/message",Add_message_to_usres)
route.get("/admin/all/likes",Authmiddleware,Get_your_liked_video)
route.get("/admin/all/comment",Authmiddleware,Get_your_comment)
route.patch("/admin/:post/unlike",Authmiddleware,Unlike_Post_news)
route.patch("/admin/:post/Delete/comment",Authmiddleware,Delete_comment)



// main post routes

route.post("/admin/create-post", upload.array("Images", 10), Authmiddleware,isAdmin,Create);
route.patch("/admin/update-post/:id",Authmiddleware, upload.array("Images", 10), isAdmin,Update);
route.delete("/admin/delete-post/:id", Authmiddleware,isAdmin,Delete);
route.get("/admin/getall/post",Get_all_POST)
 export default route ;