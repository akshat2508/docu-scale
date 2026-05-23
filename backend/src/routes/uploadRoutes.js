const express = require("express");
const multer = require("multer");
const pool = require("../config/db");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const filename = req.file.originalname;

    await pool.query(
      "INSERT INTO files (filename) VALUES ($1)",
      [filename]
    );

    res.json({
      message: "File uploaded successfully",
      filename,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Upload failed",
    });
  }
});

module.exports = router;