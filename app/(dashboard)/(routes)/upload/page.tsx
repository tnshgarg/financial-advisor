// pages/upload.js
"use client";
import axios from "axios";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload file to your backend (create a separate API route)
      const response = await axios.post("/api/storage-upload", formData);

      // Handle response from backend
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={() => handleUpload(file)}>Upload</button>
    </div>
  );
}
