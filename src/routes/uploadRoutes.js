const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../controllers/UploadController');

const upload = multer({ dest: 'uploads/' }); // simpan sementara

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;
