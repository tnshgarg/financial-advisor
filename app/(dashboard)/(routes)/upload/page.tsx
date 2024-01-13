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

  const uploadVideo = async (file: any, title: any, description: any) => {
    const formData = new FormData();
    formData.append("videoFile", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        console.log("Video uploaded successfully. Video ID:", data.videoId);
      } else {
        console.error("Failed to upload video:", data.error);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    uploadVideo(file, title, description);
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
