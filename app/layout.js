import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me A Chai - Fund your projects with chai",
  description: "This website is a crowdfunding platform for creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-cover
 text-white`}
      >
        <SessionWrapper>
          <Navbar />

          <div className="min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-cover
 text-white">
            {children}
          </div>
bg-cover

          <div
            className="absolute inset-0 -z-10 h-full w-full px-5 py-24
            [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
          ></div>

          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}

