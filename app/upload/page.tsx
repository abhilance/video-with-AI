import VideoUploadForm from "../components/VideoUploadForm";
import { Upload, Sparkles, Zap, Shield } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upload Your Video</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your content with AI-powered enhancement and professional-grade processing
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Enhancement</h3>
            <p className="text-gray-400 text-sm">
              Automatic quality optimization and intelligent content analysis
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fast Processing</h3>
            <p className="text-gray-400 text-sm">
              Lightning-fast upload and processing with global CDN delivery
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Secure Storage</h3>
            <p className="text-gray-400 text-sm">
              Enterprise-grade security with encrypted storage and backup
            </p>
          </div>
        </div>

        {/* Upload Form */}
        <VideoUploadForm />
      </div>
    </div>
  );
}