import Link from "next/link";

import { Navbar } from "@/components/layout/navbar";
import type { Locale } from "@/lib/i18n/dictionaries";

export function ArticleHero({
	locale,
	category,
	title,
	author,
	date,
	readTime,
}: {
	locale: Locale;
	category: string;
	title: string;
	author: string;
	date: string;
	readTime: string;
}) {
	const backLabel = locale === "ar" ? "العودة إلى الرئيسية" : "Back to Home";
	const byLabel = locale === "ar" ? "بقلم" : "By";
	const arrow = locale === "ar" ? "→ " : "← ";
	return (
		<section className="from-brand-light to-background font-poppins bg-gradient-to-b">
			<Navbar />
			<div className="mx-auto max-w-3xl px-4 pt-8 pb-12 sm:px-6">
				<Link
					href={`/${locale}`}
					className="text-muted-foreground hover:text-primary mb-6 inline-block text-sm transition-colors"
				>
					{arrow}
					{backLabel}
				</Link>
				<p className="text-primary mb-3 text-sm font-semibold">{category}</p>
				<h1 className="text-foreground text-h2 font-semibold tracking-tight">
					{title}
				</h1>
				<p className="text-muted-foreground mt-4 text-sm">
					{byLabel} {author} · {date} · {readTime}
				</p>
			</div>
		</section>
	);
}
