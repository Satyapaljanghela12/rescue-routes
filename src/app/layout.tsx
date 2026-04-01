import type { Metadata } from "next";
import { Inter, Poppins, Poetsen_One, Fredoka } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poetsen = Poetsen_One({
  variable: "--font-poetsen",
  weight: "400",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Rescue Routes - Animal Rescue Foundation",
  description: "Rescue Routes rescues injured and abandoned animals, providing care, shelter, and love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${poetsen.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="font-sans bg-background text-foreground min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
