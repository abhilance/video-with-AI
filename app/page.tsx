import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Video with AI</h1>
      <p className="mb-8 text-lg text-gray-700">
        Upload, share, and explore AI-powered videos!
      </p>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Register
          </button>
        </Link>
        <Link href="/video">
          <button className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
            Explore Videos
          </button>
        </Link>
        <Link href="/upload">
          <button className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">
            Upload Video
          </button>
        </Link>
      </div>
    </main>
  );
}
