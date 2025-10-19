import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Manual __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Save in uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// ✅ File filter (accept only images & videos)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "video/mp4",
    "video/mov",
    "video/webm",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // ✅ Accept file
  } else {
    cb(new Error("Only image and video files are allowed!"), false); // ❌ Reject file
  }
};

// ✅ Final multer configuration
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit (optional)
  },
});
