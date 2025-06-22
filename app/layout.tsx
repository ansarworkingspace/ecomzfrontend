import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ecomz - Discover the Future of Shopping",
  description:
    "Premium quality products with cutting-edge technology. From electronics to lifestyle essentials, we've curated the best for you.",
  keywords: "ecommerce, shopping, electronics, technology, premium products",
  authors: [{ name: "Ecomz Team" }],
  creator: "Ecomz",
  publisher: "Ecomz",
  openGraph: {
    title: "Ecomz - Discover the Future of Shopping",
    description: "Premium quality products with cutting-edge technology.",
    url: "https://ecomz.com",
    siteName: "Ecomz",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ecomz - Premium Shopping Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecomz - Discover the Future of Shopping",
    description: "Premium quality products with cutting-edge technology.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body
        className={`${poppins.className} antialiased bg-black text-white min-h-screen`}
      >
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
