"use client";

import { IVideo } from "@/models/Video";
import { useState, useRef } from "react";
import { Trash2, Play, Pause, MoreVertical } from "lucide-react";
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
  const [showMenu, setShowMenu] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  // Smart thumbnail (AI auto-crop)
  const getSmartThumbnailUrl = () => {
    if (!video.thumbnailUrl) return "";
    return `${video.thumbnailUrl}?tr=w-400,h-600,c-smart_crop,fo-auto`;
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
    e.preventDefault();
    e.stopPropagation();
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
        setIsHovered(false);
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
    <div className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-300">
      <div 
        className="relative aspect-[9/16] bg-gray-800 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Video/Thumbnail */}
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={handleVideoClick}
        >
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
              muted={!isPlaying}
              loop={false}
              controls={isPlaying}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnd}
              preload="metadata"
            />
          )}

          {/* Play/Pause Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <div className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-0.5" />
              )}
            </div>
          </div>

          {/* Status Indicators */}
          {isHovered && !isPlaying && (
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              Preview
            </div>
          )}

          {isPlaying && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
              LIVE
            </div>
          )}

          {/* Menu Button */}
          {session && (
            <div className="absolute top-3 right-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="w-8 h-8 bg-black/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 top-10 w-40 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowDeleteConfirm(true);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2">
          {video.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {video.description}
        </p>

        {/* Tags */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full border border-purple-600/30">
            AI Enhanced
          </span>
          <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full border border-gray-700">
            {video.transformation?.quality || 100}% Quality
          </span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-white mb-4">Delete Video?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete "{video.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close menu when clicking outside */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-[5]" 
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </div>
  );
}
