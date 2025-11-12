const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.uploadImage = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer; 
    const base64String = `data:${req.file.mimetype};base64,${fileBuffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'eventease',
    });

    res.json({
      message: 'Upload berhasil',
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

