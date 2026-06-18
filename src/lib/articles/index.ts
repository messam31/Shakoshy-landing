import type { Locale } from "@/lib/i18n/dictionaries";

import { articles } from "./content";
import type { Article, ArticleCardSummary, ArticleContent } from "./types";

export type { Article, ArticleCardSummary, ArticleContent };
export type { Block } from "./types";

export function getAllSlugs(): string[] {
	return articles.map((a) => a.slug);
}

export function getArticle(
	slug: string,
	locale: Locale,
): (ArticleContent & { meta: Article }) | undefined {
	const article = articles.find((a) => a.slug === slug);
	if (!article) return undefined;
	return { ...article[locale], meta: article };
}

function toCard(article: Article, locale: Locale): ArticleCardSummary {
	const c = article[locale];
	return {
		slug: article.slug,
		title: c.title,
		description: c.excerpt,
		estimate: c.estimate,
		category: c.category,
		readTime: c.readTime,
		cardImage: article.cardImage,
	};
}

export function getArticleCards(locale: Locale): ArticleCardSummary[] {
	return articles.map((a) => toCard(a, locale));
}

export function getRelatedArticles(
	slug: string,
	locale: Locale,
): ArticleCardSummary[] {
	return articles.filter((a) => a.slug !== slug).map((a) => toCard(a, locale));
}
