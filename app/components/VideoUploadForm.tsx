"use client";
import React, { useState } from "react";
import FileUpload from "./fileupload";

const VideoUploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  const videoData = {
    title,        // Make sure this matches your API expectation
    description,
    videoUrl,
    thumbnailUrl,
  };
  
  console.log("Sending video data:", videoData); // DEBUG LOG
  
  try {
    const res = await fetch("/api/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(videoData),
    });
    
    const responseData = await res.json();
    console.log("API Response:", responseData); // DEBUG LOG
    
    if (!res.ok) throw new Error(responseData.error || "Failed to upload video");
    
    alert("Video uploaded successfully!");
    // Clear form...
  } catch (err: any) {
    console.error("Upload error:", err); // DEBUG LOG
    alert(err.message || "Upload failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 border rounded bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Video</h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Video File</label>
        <FileUpload
          fileType="video"
          onSuccess={res => setVideoUrl(res.url)}
        />
        {videoUrl && (
          <video src={videoUrl} controls className="mt-2 w-full max-h-48" />
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Thumbnail Image</label>
        <FileUpload
          fileType="image"
          onSuccess={res => setThumbnailUrl(res.url)}
        />
        {thumbnailUrl && (
          <img src={thumbnailUrl} alt="Thumbnail" className="mt-2 w-32 h-20 object-cover" />
        )}
      </div>
      <button
        type="submit"
        disabled={loading || !videoUrl || !thumbnailUrl}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
};

export default VideoUploadForm;
