'use client';

import { useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div className="items-center flex justify-center flex-col h-screen gap-5">
      <FaExclamationTriangle className="text-red-500 text-4xl mb-2" />
      <h2 className="dark:text-white text-black font-semibold text-3xl">
        Something went wrong!
      </h2>
      <button
        className="dark:text-white dark:hover:text-slate-300 underline transition-colors duration-300"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
