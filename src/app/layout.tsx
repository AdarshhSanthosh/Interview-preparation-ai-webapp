import type { Metadata } from "next";
import { AppStateProvider } from "@/context/AppStateContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "InterviewIQ",
  description: "Your AI-powered path to interview success.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-text font-body">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
