const express = require("express");
const multer = require("multer");
const pool = require("../config/db");

const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

router.post("/", upload.single("file"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const filename = `${Date.now()}-${req.file.originalname}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;

    await pool.query(
      "INSERT INTO uploads (filename) VALUES ($1)",
      [fileUrl]
    );

    res.json({
      message: "File uploaded successfully",
      fileUrl,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Upload failed",
    });
  }
});

module.exports = router;