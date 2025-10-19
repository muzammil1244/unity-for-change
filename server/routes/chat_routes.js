import express from "express";
import { uploadMedia, getMessages } from "../controller/chat_controller.js"
import { upload } from "../midlleware/Multer.js";

const router = express.Router();


router.post("/upload", upload.single("media"), uploadMedia);

// Get messages of a group
router.get("/messages", getMessages);

export default router;