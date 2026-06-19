import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalSections, LegalText } from "@/components/legal/legal-sections";
import { LegalShell } from "@/components/legal/legal-shell";
import { hasLocale, locales } from "@/lib/i18n/dictionaries";
import { privacy } from "@/lib/legal/content";

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
	const c = privacy[lang];
	const path = `/${lang}/privacy`;
	return {
		title: c.title,
		description: c.intro,
		alternates: {
			canonical: path,
			languages: {
				en: "/en/privacy",
				ar: "/ar/privacy",
				"x-default": "/ar/privacy",
			},
		},
		openGraph: {
			type: "website",
			url: path,
			siteName: "Shakoshy",
			title: c.title,
			description: c.intro,
			locale: lang === "ar" ? "ar_EG" : "en_US",
		},
	};
}

export default async function PrivacyPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();
	const c = privacy[lang];
	return (
		<LegalShell
			lang={lang}
			backLabel={c.backToHome}
			title={c.title}
			meta={`${c.lastUpdatedLabel} ${c.lastUpdated}`}
		>
			<p className="text-muted-foreground mb-8 leading-7">
				<LegalText text={c.intro} />
			</p>
			<LegalSections lang={lang} sections={c.sections} />
		</LegalShell>
	);
}
