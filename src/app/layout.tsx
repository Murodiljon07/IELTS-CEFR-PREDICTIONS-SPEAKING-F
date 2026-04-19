import type { Metadata } from "next";
import "../css/global.css";

// SEO metadata
export const metadata: Metadata = {
  title: "GoodTesting - IELTS Official Test Center",
  description:
    "Master English with our comprehensive learning platform designed for IELTS success",
  keywords: "IELTS, English learning, test preparation, vocabulary, grammar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
