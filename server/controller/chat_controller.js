import { Message } from "../module/chat.js";

// Upload media
export const uploadMedia = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
};

// Get messages of a group
export const getMessages = async (req, res) => {
  try {
 
    const messages = await Message.find().populate("sender","username profileimage");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save & emit message
export const sendMessage = async (io, data) => {
  try {
    const { group, sender, message, media } = data;

    const newMessage = new Message({ group, sender, message, media });
   await newMessage.save()
   const populatedMsg = await Message.findById(newMessage._id).populate("sender", "username profileimage");


    io.emit("receive-message",populatedMsg );
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
