import "./globals.css";
import { ReactNode } from "react";
import { QueryProvider } from "../providers/QueryProvider"; // Correct named import
import { ThemeProvider } from "../providers/ThemeProvider";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <ThemeProvider>
            <Navbar />
            <main className="min-h-screen p-4">{children}</main>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
