import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
  "/api/upload",
  formData
);

      setMessage(res.data.message);

    } catch (error) {
      console.error(error);
      setMessage("Upload failed");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>CloudDocs</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload File
      </button>

      <p>{message}</p>
    </div>
  );
}

export default App;