import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./{components}/Nav";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ticket App",
  description: "Generated by Ronit S.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col h-screen">
          <Nav />
          <div className="flex-grow overflow-y-auto bg-white text-default-text">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
