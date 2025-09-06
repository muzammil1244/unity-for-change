import express, { Router }  from "express"
import { Route } from "react-router-dom"
import {NewsPos, Post, UpdatePost,DeletePost, ReportMessage , Suggestion, GetallUserList, ReportAction, Add_message_to_usres} from "../controller/AdminController.js"
import { upload } from "../midlleware/Multer.js"
const route = Router()

// route.get("admin",Post)
 route.post("/admin/news",upload.single("file"),NewsPos)
 route.patch("/admin/:postid/updatenews",upload.single("file"),UpdatePost)
 route.delete("/admin/:postid/delete",upload.single("file"),DeletePost)
route.get("/admin/all/report",ReportMessage)
route.get("/admin/all/suggestion", Suggestion)
route.get("/admin/all/users", GetallUserList)
route.delete("/admin/:userpostid/news", ReportAction)
route.post("/admin/:userid/message",Add_message_to_usres)

 export default route ;