"use client";
import React, { useState } from "react";
import FileUpload from "./fileupload";
import { Upload, Video, Image, Check, AlertCircle } from "lucide-react";

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
      title,
      description,
      videoUrl,
      thumbnailUrl,
    };
    
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(videoData),
      });
      
      const responseData = await res.json();
      
      if (!res.ok) throw new Error(responseData.error || "Failed to upload video");
      
      // Success - clear form
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      
      // Show success message (you could use your notification system here)
      alert("Video uploaded successfully!");
      
    } catch (err: any) {
      console.error("Upload error:", err);
      alert(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Upload Video</h2>
            <p className="text-gray-400">
              Share your content with AI enhancement and professional quality
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Video Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter a compelling title for your video"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                placeholder="Describe your video content, style, and key features"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Video File *
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 bg-gray-800/50 hover:border-gray-600 transition-colors">
                {!videoUrl ? (
                  <div className="text-center">
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="mb-4">
                      <FileUpload
                        fileType="video"
                        onSuccess={(res) => setVideoUrl(res.url)}
                      />
                    </div>
                    <p className="text-sm text-gray-400">
                      Upload MP4, MOV, AVI up to 100MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-green-400">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Video uploaded successfully</span>
                    </div>
                    <video 
                      src={videoUrl} 
                      controls 
                      className="w-full max-h-64 rounded-lg bg-black"
                    />
                    <button
                      type="button"
                      onClick={() => setVideoUrl("")}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Change video
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Thumbnail Image *
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 bg-gray-800/50 hover:border-gray-600 transition-colors">
                {!thumbnailUrl ? (
                  <div className="text-center">
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="mb-4">
                      <FileUpload
                        fileType="image"
                        onSuccess={(res) => setThumbnailUrl(res.url)}
                      />
                    </div>
                    <p className="text-sm text-gray-400">
                      Upload JPG, PNG, WebP up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-green-400">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Thumbnail uploaded successfully</span>
                    </div>
                    <img 
                      src={thumbnailUrl} 
                      alt="Thumbnail preview" 
                      className="w-full max-w-xs mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setThumbnailUrl("")}
                      className="text-sm text-gray-400 hover:text-white transition-colors block mx-auto"
                    >
                      Change thumbnail
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* AI Enhancement Info */}
            <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-purple-300 mb-1">AI Enhancement</h4>
                  <p className="text-sm text-purple-200/80">
                    Your video will be automatically enhanced with AI-powered quality optimization, 
                    smart cropping, and intelligent compression for the best viewing experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !videoUrl || !thumbnailUrl || !title || !description}
              className="w-full bg-white text-black py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Video
                </>
              )}
            </button>

            {/* Requirements */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                By uploading, you agree to our Terms of Service and confirm you own the rights to this content.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadForm;
