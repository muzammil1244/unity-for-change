import express, { Router }  from "express"
import { Route } from "react-router-dom"
import {NewsPos, Post, UpdatePost,DeletePost, ReportMessage , Suggestion, GetallUserList, ReportAction, Add_message_to_usres} from "../controller/AdminController.js"
import { upload } from "../midlleware/Multer.js"
import { Authmiddleware } from "../midlleware/authmidlleware.js"
const route = Router()

// route.get("admin",Post)
 route.post("/admin/news",Authmiddleware,upload.single("file"),NewsPos)
 route.patch("/admin/:postid/updatenews",Authmiddleware,upload.single("file"),UpdatePost)
 route.delete("/admin/:postid/delete",Authmiddleware,upload.single("file"),DeletePost)
route.get("/admin/all/report",Authmiddleware,ReportMessage)
route.get("/admin/all/suggestion", Authmiddleware,Suggestion)
route.get("/admin/all/users", Authmiddleware,GetallUserList)
route.delete("/admin/:userpostid/news", Authmiddleware,ReportAction)
route.post("/admin/:userid/message",Authmiddleware,Add_message_to_usres)

 export default route ;