import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff"
};
export const metadata: Metadata = {
  title: "Secure Transfer",
  description: "Securely transfer your files with our peer-to-peer encrypted file transfer service. Encrypt and manage your files efficiently.",
  keywords: ["file transfer", "secure transfer", "P2P file transfer", "encrypt files" , "file sharing" , "sharing", "p2p","peer to peer"] ,
  metadataBase: new URL('https://securetransfer.vercel.app'),
  robots: "index, follow , cache",
  alternates:{
    canonical:'https://securetransfer.vercel.app'
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <Toaster position="bottom-center" />
        <NextTopLoader />
        {children}
        <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Secure Transfer",
        url: "https://securetransfer.vercel.app",
        description: "Securely transfer your files with our peer-to-peer encrypted file transfer service. Encrypt and manage your files efficiently.",
      }),
    }}
  />
      </body>
    </html>
  );
}
