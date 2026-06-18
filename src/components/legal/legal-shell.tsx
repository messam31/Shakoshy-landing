import Link from "next/link";

import { Navbar } from "@/components/layout/navbar";
import type { Locale } from "@/lib/i18n/dictionaries";

export function LegalShell({
	lang,
	backLabel,
	title,
	meta,
	children,
}: {
	lang: Locale;
	backLabel: string;
	title: string;
	meta?: string;
	children: React.ReactNode;
}) {
	const arrow = lang === "ar" ? "→ " : "← ";
	return (
		<>
			<section className="from-brand-light to-background font-poppins bg-gradient-to-b">
				<Navbar />
				<div className="mx-auto max-w-3xl px-4 pt-8 pb-12 sm:px-6">
					<Link
						href={`/${lang}`}
						className="text-muted-foreground hover:text-primary mb-6 inline-block text-sm transition-colors"
					>
						{arrow}
						{backLabel}
					</Link>
					<h1 className="text-foreground text-h2 font-semibold tracking-tight">
						{title}
					</h1>
					{meta ? (
						<p className="text-muted-foreground mt-3 text-sm">{meta}</p>
					) : null}
				</div>
			</section>
			<div className="font-poppins mx-auto max-w-3xl px-4 pb-20 sm:px-6">
				{children}
			</div>
		</>
	);
}
