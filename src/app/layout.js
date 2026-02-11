import { Inter, Cairo } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export const metadata = {
  title: "Model Dressing AI | تلبيس المودل",
  description: "Transform your fashion ideas into reality with AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.variable} ${cairo.variable}`}>
        <div className="main-background" />
        <Navbar />
        <main className="app-container pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
