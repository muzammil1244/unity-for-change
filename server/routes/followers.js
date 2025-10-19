
import express, { Router } from "express"
import { Authmiddleware } from "../midlleware/authmidlleware.js"
import { follow_to_user, followers_List, following_list, remove_follower, remove_following } from "../controller/UserController.js"

const route = Router()

route.get("/user/followers",Authmiddleware,followers_List)
route.get("/user/following",Authmiddleware,following_list)
route.post("/user/follow_to/:userId",Authmiddleware,follow_to_user)
route.post("/user/remove_following/:userId",Authmiddleware,remove_following)
route.post("/user/remove_follower/:userId",Authmiddleware,remove_follower)

export default route