"use client";

import { Video } from "@imagekit/next";   // ImageKit SDK
import { IVideo } from "@/models/Video";  // Your type/interface
import { useState, useRef } from "react";
import { Trash2, Play, Pause } from "lucide-react";
import { useSession } from "next-auth/react";
import { useNotification } from "./Notification";

interface VideoComponentProps {
  video: IVideo;
  onVideoDeleted?: (videoId: string) => void;
}

export default function VideoComponent({ video, onVideoDeleted }: VideoComponentProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  // Smart thumbnail (AI auto-crop)
  const getSmartThumbnailUrl = () => {
    if (!video.thumbnailUrl) return "";
    return `${video.thumbnailUrl}?tr=w-540,h-960,c-smart_crop,fo-auto`;
  };

  const smartThumbnailUrl = getSmartThumbnailUrl();

  // Handle video preview on hover (5-second preview)
  const handleMouseEnter = () => {
    if (!isPlaying) {
      setIsHovered(true);
      setTimeout(() => {
        if (videoRef.current && !isPlaying) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(console.error);
        }
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    if (!isPlaying) {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  // Handle video time update for 5-second preview
  const handleTimeUpdate = () => {
    if (videoRef.current && !isPlaying && videoRef.current.currentTime >= 5) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      if (isHovered) {
        setTimeout(() => {
          if (videoRef.current && isHovered && !isPlaying) {
            videoRef.current.play().catch(console.error);
          }
        }, 500);
      }
    }
  };

  // Handle click to play/pause video
  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.currentTime = 0; // Start from beginning
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
        setIsHovered(false); // Stop hover preview mode
      }
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Delete video functionality
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/video/${video._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete video");
      }

      showNotification("Video deleted successfully!", "success");
      onVideoDeleted?.(video._id?.toString() || "");
    } catch (error) {
      console.error("Delete error:", error);
      showNotification("Failed to delete video", "error");
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure 
        className="relative px-4 pt-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full bg-gray-200 cursor-pointer"
            style={{ aspectRatio: "9/16" }}
            onClick={handleVideoClick}
          >
            {/* Show thumbnail when not hovered and not playing */}
            {!isHovered && !isPlaying ? (
              <img
                src={imageError ? video.thumbnailUrl : smartThumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <video
                ref={videoRef}
                src={video.videoUrl}
                muted={!isPlaying} // Unmuted when playing, muted during preview
                loop={false}
                controls={isPlaying} // Show controls only when actually playing
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
                preload="metadata"
              />
            )}

            {/* Play/Pause button overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-gray-800" />
                ) : (
                  <Play className="w-6 h-6 text-gray-800 ml-1" />
                )}
              </div>
            </div>

            {/* Preview indicator */}
            {isHovered && !isPlaying && (
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                5s Preview
              </div>
            )}

            {/* Playing indicator */}
            {isPlaying && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded animate-pulse">
                ● LIVE
              </div>
            )}
          </div>

          {/* Delete button - only show if user is logged in */}
          {session && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDeleteConfirm(true);
              }}
              className="absolute top-2 left-2 w-8 h-8 bg-red-500/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete video"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </figure>

      <div className="card-body p-4">
        {/* Title */}
        <h2 className="card-title text-lg line-clamp-2">{video.title}</h2>

        {/* Description */}
        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>

        {/* Badges */}
        <div className="flex items-center gap-2 mt-3">
          <span className="badge badge-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            AI Enhanced
          </span>
          <span className="badge badge-outline badge-sm">Smart Crop</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4">
            <h3 className="text-lg font-bold mb-4">Delete Video?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{video.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-outline"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-error"
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

