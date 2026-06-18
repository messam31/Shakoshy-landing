import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DeleteAccountForm } from "@/components/legal/delete-account-form";
import { LegalShell } from "@/components/legal/legal-shell";
import { hasLocale, locales } from "@/lib/i18n/dictionaries";
import { deleteAccount } from "@/lib/legal/content";

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
	const c = deleteAccount[lang];
	const path = `/${lang}/delete-account`;
	return {
		title: c.title,
		description: c.intro,
		alternates: {
			canonical: path,
			languages: {
				en: "/en/delete-account",
				ar: "/ar/delete-account",
				"x-default": "/en/delete-account",
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

export default async function DeleteAccountPage({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();
	const c = deleteAccount[lang];
	return (
		<LegalShell lang={lang} backLabel={c.backToHome} title={c.title}>
			<p className="text-muted-foreground mb-8 leading-7">{c.intro}</p>
			<div className="border-border bg-surface-muted mb-10 rounded-2xl border p-6">
				<h2 className="text-foreground mb-3 text-base font-semibold">
					{c.whatHeading}
				</h2>
				<ul className="text-muted-foreground list-disc space-y-2 ps-6 leading-7">
					{c.whatItems.map((item, i) => (
						<li key={i}>{item}</li>
					))}
				</ul>
			</div>
			<DeleteAccountForm t={c} />
		</LegalShell>
	);
}
