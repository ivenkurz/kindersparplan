"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="min-h-[200px] flex flex-col items-center justify-center gap-4 p-6 bg-[#FFF9EB] font-saans">
      <h2 className="text-lg font-semibold text-ds-neutral-100">Etwas ist schiefgelaufen</h2>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 rounded-ds-16 bg-ds-orange-60 text-white font-semibold hover:bg-ds-orange-70 transition-colors"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
