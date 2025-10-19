import { Router } from "express";
import { Authmiddleware } from "../midlleware/authmidlleware.js"
import { AI_API } from "../controller/AI.js";

const router = Router()

router.post("/Ai",AI_API)


export default router;