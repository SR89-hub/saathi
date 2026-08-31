import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAATHI - Safety Co-Pilot UI Suite",
  description: "Your safety co-pilot. Because your safety shouldn't begin with an SOS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-slate-900 text-slate-100 flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
