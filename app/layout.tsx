import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evergreen Sparplan-Rechner",
  description: "Berechne deine Vermögensentwicklung mit dem Sparplan-Rechner",
};

const saans = localFont({
  src: [
    { path: "../public/fonts/SaansLight.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/SaansRegular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/SaansSemiBold.otf", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-saans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${saans.variable} ${saans.className} min-h-screen bg-ds-app-bg text-ds-neutral-100 antialiased font-saans pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]`}
      >
        {children}
      </body>
    </html>
  );
}
