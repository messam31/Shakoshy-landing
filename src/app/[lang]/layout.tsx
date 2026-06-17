import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cairo, Geist, Geist_Mono, Poppins } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { dictionaries, hasLocale, locales } from "@/lib/i18n/dictionaries";
import { LanguageProvider } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";
import "../globals.css";

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

export function generateStaticParams() {
	return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	if (!hasLocale(lang)) return {};
	const m = dictionaries[lang].meta;
	const isAr = lang === "ar";
	return {
		metadataBase: new URL(siteUrl),
		title: { default: m.title, template: "%s | Shakoshy" },
		description: m.description,
		applicationName: "Shakoshy",
		authors: [{ name: "Shakoshy" }],
		creator: "Shakoshy",
		publisher: "Shakoshy",
		formatDetection: { email: false, address: false, telephone: false },
		alternates: {
			canonical: `/${lang}`,
			languages: { en: "/en", ar: "/ar", "x-default": "/en" },
		},
		openGraph: {
			type: "website",
			url: `/${lang}`,
			siteName: "Shakoshy",
			title: m.ogTitle,
			description: m.ogDescription,
			locale: isAr ? "ar_EG" : "en_US",
			alternateLocale: isAr ? "en_US" : "ar_EG",
		},
		twitter: {
			card: "summary_large_image",
			site: "@shakoshyllc",
			creator: "@shakoshyllc",
			title: m.ogTitle,
			description: m.ogDescription,
		},
		robots: {
			index: true,
			follow: true,
			googleBot: { index: true, follow: true },
		},
	};
}

export default async function LangLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();

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
				url: `${siteUrl}/${lang}`,
				name: "Shakoshy",
				inLanguage: lang,
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

	return (
		<html
			lang={lang}
			dir={lang === "ar" ? "rtl" : "ltr"}
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
				<LanguageProvider locale={lang}>
					<main className="flex-1">{children}</main>
					<Footer />
				</LanguageProvider>
			</body>
		</html>
	);
}
