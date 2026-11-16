import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Memory App",
  description: "Minimalist task manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-200 dark:bg-black flex justify-center antialiased transition-colors">
        <div className="w-full max-w-md min-h-screen flex flex-col bg-theme-main shadow-2xl relative overflow-hidden">
          <Header />
          <main className="flex-1 flex flex-col px-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
