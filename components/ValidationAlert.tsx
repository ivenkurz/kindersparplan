"use client";

interface ValidationAlertProps {
  message: string;
}

export default function ValidationAlert({ message }: ValidationAlertProps) {
  return (
    <div
      role="alert"
      className="rounded-ds-lg border border-ds-orange-60 bg-ds-orange-30/50 px-4 py-3 text-ds-orange-90 font-medium text-sm"
    >
      {message}
    </div>
  );
}
