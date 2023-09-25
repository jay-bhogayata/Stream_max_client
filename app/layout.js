"use client";
import { useParams, usePathname, useRouter } from "next/navigation.js";
import Navbar from "./components/Navbar.jsx";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "stream max",
//   description: "best app for streaming video",
// };

export default function RootLayout({ children }) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {pathName.startsWith("/admin") ? "" : <Navbar />}
        {children}
      </body>
    </html>
  );
}
