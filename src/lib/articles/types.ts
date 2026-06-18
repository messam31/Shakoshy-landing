import type { Locale } from "@/lib/i18n/dictionaries";

export type Block =
	| { type: "paragraph"; text: string }
	| { type: "heading"; level: 2 | 3; text: string }
	| { type: "image"; src: string; alt: string }
	| { type: "list"; ordered?: boolean; items: string[] }
	| { type: "table"; headers: string[]; rows: string[][] };

export interface ArticleContent {
	title: string;
	excerpt: string;
	author: string;
	date: string;
	category: string;
	readTime: string;
	estimate: string;
	body: Block[];
}

export interface Article {
	slug: string;
	heroImage: string;
	cardImage: string;
	inlineImage?: string;
	datePublished: string;
	en: ArticleContent;
	ar: ArticleContent;
}

export interface ArticleCardSummary {
	slug: string;
	title: string;
	description: string;
	estimate: string;
	category: string;
	readTime: string;
	cardImage: string;
}

export type { Locale };
