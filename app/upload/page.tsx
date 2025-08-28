import VideoUploadForm from "../components/VideoUploadForm";

export default function UploadPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Upload a Video</h1>
      <VideoUploadForm />
    </div>
  );
}