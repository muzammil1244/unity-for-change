import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Manual __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Storage configuration
const storage = multer.memoryStorage()

// ✅ File filter (accept only images & videos)

// ✅ Final multer configuration
export const upload = multer({
  storage: storage,
 
});
