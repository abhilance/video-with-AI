import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";
import { Video } from "lucide-react";

interface VideoFeedProps {
  videos: IVideo[];
  onVideoDeleted?: (videoId: string) => void;
}

export default function VideoFeed({ videos, onVideoDeleted }: VideoFeedProps) {
  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {videos.map((video) => (
          <VideoComponent 
            key={video._id?.toString()} 
            video={video} 
            onVideoDeleted={onVideoDeleted}
          />
        ))}
      </div>

      {/* Empty State */}
      {videos.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Videos Found</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            There are no videos to display at the moment. Be the first to upload and share your content!
          </p>
          <a 
            href="/upload"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            <Video className="w-4 h-4" />
            Upload First Video
          </a>
        </div>
      )}
    </div>
  );
}