const multer = require('multer');
const { uploadImage } = require('../controllers/UploadController');

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadImage);