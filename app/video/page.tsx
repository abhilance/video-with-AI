"use client";
import { useEffect, useState } from "react";
import VideoFeed from "../components/VideoFeed";
import { IVideo } from "@/models/Video";
import { Search, Filter, Grid, List } from "lucide-react";

export default function VideoFeedPage() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVideos, setFilteredVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    // Filter videos based on search term
    if (searchTerm.trim() === "") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [searchTerm, videos]);

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/video");
      const data = await res.json();
      setVideos(data);
      setFilteredVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoDeleted = (videoId: string) => {
    const updatedVideos = videos.filter(video => video._id?.toString() !== videoId);
    setVideos(updatedVideos);
    setFilteredVideos(updatedVideos.filter(video =>
      searchTerm.trim() === "" ||
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gray-700 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading videos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Video Gallery</h1>
          <p className="text-gray-400 text-lg">
            Discover amazing AI-enhanced videos from our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>
                {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
                {searchTerm && ` found for "${searchTerm}"`}
              </span>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-600/30 hover:bg-purple-600/30 transition-colors">
              All Videos
            </button>
            <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:bg-gray-700 transition-colors">
              AI Enhanced
            </button>
            <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:bg-gray-700 transition-colors">
              4K Quality
            </button>
            <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:bg-gray-700 transition-colors">
              Recently Added
            </button>
          </div>
        </div>

        {/* Video Feed */}
        <VideoFeed videos={filteredVideos} onVideoDeleted={handleVideoDeleted} />

        {/* Load More (Placeholder for pagination) */}
        {filteredVideos.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-6 py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Load More Videos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}