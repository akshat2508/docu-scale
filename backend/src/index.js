const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db");
const uploadRoutes = require("./routes/uploadRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

const PORT = process.env.PORT || 3000;
app.use("/upload", uploadRoutes);
pool.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error(err));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});