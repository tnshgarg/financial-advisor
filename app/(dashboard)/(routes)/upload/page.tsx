// pages/upload.js
"use client";
import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacyStatus, setPrivacyStatus] = useState("public");
  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("privacyStatus", privacyStatus);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response.data);
      // Handle success, show a success message, or redirect the user
    } catch (error) {
      console.error("Error uploading video:", error);
      // Handle error, show an error message to the user
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Privacy Status:
          <select
            value={privacyStatus}
            onChange={(e) => setPrivacyStatus(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="unlisted">Unlisted</option>
          </select>
        </label>
        <br />
        <label>
          Video File:
          <input type="file" accept="video/*" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
