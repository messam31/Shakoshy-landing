import type { Metadata } from "next";
import { Cairo, Geist, Geist_Mono, Poppins } from "next/font/google";

import { LanguageProvider } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shakoshy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: "Shakoshy — Find Trusted Service Professionals Near You",
    template: "%s | Shakoshy",
  },
  description:
    "Shakoshy connects you with verified local professionals for plumbing, electrical, AC, cleaning, carpentry and more. Post your request, receive real offers, and hire with confidence.",
  applicationName: "Shakoshy",
  keywords: [
    "Shakoshy",
    "home services",
    "service professionals",
    "plumbing",
    "electrical",
    "AC services",
    "cleaning",
    "carpentry",
    "handyman",
    "Egypt",
  ],
  authors: [{ name: "Shakoshy" }],
  creator: "Shakoshy",
  publisher: "Shakoshy",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Shakoshy",
    title: "Shakoshy — Find Trusted Service Professionals Near You",
    description:
      "Post your request, receive offers from verified professionals, and choose the best one for your needs.",
    locale: "en_US",
    alternateLocale: "ar_EG",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shakoshyllc",
    creator: "@shakoshyllc",
    title: "Shakoshy — Find Trusted Service Professionals Near You",
    description:
      "Post your request, receive offers from verified professionals, and choose the best one for your needs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const serviceTypes = [
  "Plumbing",
  "Electrical Works",
  "AC Services",
  "Cleaning",
  "Carpentry",
  "Painting",
  "Aluminum & Glass",
  "Moving & Transport",
  "Flooring & Tiling",
  "Roof Repair",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Shakoshy",
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
      description:
        "Shakoshy connects customers with verified local service professionals across Egypt — from plumbing and electrical to AC, cleaning and carpentry.",
      areaServed: { "@type": "Country", name: "Egypt" },
      sameAs: [
        "https://x.com/shakoshyllc",
        "https://www.instagram.com/shakoshy.eg",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Shakoshy",
      inLanguage: ["en", "ar"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service`,
      serviceType: serviceTypes,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "Egypt" },
      description:
        "On-demand household services from verified professionals: post a request, receive real offers, and hire with confidence.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        poppins.variable,
        cairo.variable,
        "h-full antialiased",
      )}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
