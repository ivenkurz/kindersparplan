import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evergreen Sparplan-Rechner",
  description: "Berechne deine Vermögensentwicklung mit dem Sparplan-Rechner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-ds-neutral-0 text-ds-neutral-100 antialiased font-saans">
        {children}
      </body>
    </html>
  );
}
