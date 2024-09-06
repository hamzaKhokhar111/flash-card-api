"use client";
import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Link 
        href="/flash" 
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
      >
        Go to Flash Card Logic Page
      </Link>
    </div>
  );
}
