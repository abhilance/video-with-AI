"use client";
import { useEffect, useState } from "react";
import VideoFeed from "../components/VideoFeed";

export default function VideoFeedPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/video")
      .then(res => res.json())
      .then(setVideos);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">All Videos</h1>
      <VideoFeed videos={videos} />
    </div>
  );
}