
"use client";

import Link from "next/link";
import { Video } from "@imagekit/next";   // ImageKit SDK
import { IVideo } from "@/models/Video";  // Your type/interface
import { useState } from "react";

export default function VideoComponent({ video }: { video: IVideo }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Smart thumbnail (AI auto-crop)
  const getSmartThumbnailUrl = () => {
    if (!video.thumbnailUrl) return "";
    return `${video.thumbnailUrl}?tr=w-540,h-960,c-smart_crop,fo-auto`;
  };

  const smartThumbnailUrl = getSmartThumbnailUrl();

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure 
        className="relative px-4 pt-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full bg-gray-200"
            style={{ aspectRatio: "9/16" }}
          >
            {/* Show thumbnail normally → play video preview on hover */}
            {!isHovered ? (
              <img
                src={imageError ? video.thumbnailUrl : smartThumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <Video
                src={video.videoUrl}
                width={540}
                height={960}
                autoPlay
                muted={false}
                loop
                controls={video.controls}
                className="w-full h-full object-cover"
              />
            )}

            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-6 h-6 text-gray-800 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 5v10l8-5z" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        {/* Title */}
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg line-clamp-2">{video.title}</h2>
        </Link>

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
    </div>
  );
}

