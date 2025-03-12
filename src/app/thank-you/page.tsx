"use client";

import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

export default function ThankYou() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">Thank You!</h1>
        <p className="text-gray-600 mt-2">
          Your submission has been received successfully.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-[#ff9e39] text-white px-6 py-2 rounded hover:bg-[#ea9030] transition-all"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
