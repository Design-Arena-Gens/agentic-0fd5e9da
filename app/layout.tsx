import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentic YouTube Growth Strategist",
  description: "Autonomous psychology-driven YouTube growth agent that crafts bold, curiosity-fueled scripts."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
