import type { Metadata } from "next";
import { Poppins, Poetsen_One, Fredoka } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poetsenOne = Poetsen_One({
  variable: "--font-poetsen",
  subsets: ["latin"],
  weight: ["400"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rescue Routes | Animal Rescue & Welfare",
  description:
    "Rescue Routes supports animal rescue, treatment, shelter care, and adoption through a compassionate community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${poetsenOne.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="font-sans bg-white text-foreground min-h-screen flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
