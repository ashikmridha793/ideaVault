import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-indigo-600 mb-2">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
        The page you are looking for does not exist or was moved.
      </p>
      <Link
        href="/"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
