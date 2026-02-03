"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-[#FFF9EB] font-sans antialiased">
        <h2 className="text-lg font-semibold text-gray-800">Etwas ist schiefgelaufen</h2>
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
        >
          Erneut versuchen
        </button>
      </body>
    </html>
  );
}
