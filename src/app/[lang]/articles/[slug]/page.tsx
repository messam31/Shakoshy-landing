import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/articles/article-body";
import { ArticleCard } from "@/components/articles/article-card";
import { ArticleCta } from "@/components/articles/article-cta";
import { ArticleHero } from "@/components/articles/article-hero";
import {
	getAllSlugs,
	getArticle,
	getRelatedArticles,
} from "@/lib/articles";
import { dictionaries, hasLocale, locales } from "@/lib/i18n/dictionaries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shakoshy.com";

export function generateStaticParams() {
	return locales.flatMap((lang) =>
		getAllSlugs().map((slug) => ({ lang, slug })),
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
	const { lang, slug } = await params;
	if (!hasLocale(lang)) return {};
	const article = getArticle(slug, lang);
	if (!article) return {};
	const path = `/${lang}/articles/${slug}`;
	const enPath = `/en/articles/${slug}`;
	const arPath = `/ar/articles/${slug}`;
	return {
		title: article.title,
		description: article.excerpt,
		alternates: {
			canonical: path,
			languages: { en: enPath, ar: arPath, "x-default": arPath },
		},
		openGraph: {
			type: "article",
			url: path,
			siteName: "Shakoshy",
			title: article.title,
			description: article.excerpt,
			locale: lang === "ar" ? "ar_EG" : "en_US",
			images: [{ url: article.meta.heroImage, alt: article.title }],
		},
		twitter: {
			card: "summary_large_image",
			site: "@shakoshyllc",
			title: article.title,
			description: article.excerpt,
			images: [article.meta.heroImage],
		},
	};
}

export default async function ArticlePage({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}) {
	const { lang, slug } = await params;
	if (!hasLocale(lang)) notFound();
	const article = getArticle(slug, lang);
	if (!article) notFound();

	const related = getRelatedArticles(slug, lang);
	const t = dictionaries[lang].popularTopics;
	const relatedHeading =
		lang === "ar" ? "مواضيع مقترحة ذات صلة" : "Related Suggested Topics";

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: article.title,
		description: article.excerpt,
		author: { "@type": "Organization", name: article.author },
		datePublished: article.meta.datePublished,
		image: `${siteUrl}${article.meta.heroImage}`,
		inLanguage: lang,
		publisher: {
			"@type": "Organization",
			name: "Shakoshy",
			logo: `${siteUrl}/logo.svg`,
		},
		mainEntityOfPage: `${siteUrl}/${lang}/articles/${slug}`,
	};

	return (
		<>
			<script type="application/ld+json">
				{JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
			</script>
			<ArticleHero
				locale={lang}
				category={article.category}
				title={article.title}
				author={article.author}
				date={article.date}
				readTime={article.readTime}
			/>
			<article className="mx-auto max-w-3xl px-4 sm:px-6">
				<ArticleBody blocks={article.body} />
				<ArticleCta locale={lang} />
			</article>
			<section className="bg-surface-muted font-poppins py-section">
				<div className="mx-auto max-w-7xl px-4 sm:px-6">
					<h2 className="mb-10 text-2xl font-semibold tracking-tight">
						{relatedHeading}
					</h2>
					<div className="grid gap-8 md:grid-cols-2">
						{related.map((card) => (
							<ArticleCard
								key={card.slug}
								article={card}
								href={`/${lang}/articles/${card.slug}`}
								estimatedCostLabel={t.estimatedCost}
								readMoreLabel={t.readMore}
							/>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
