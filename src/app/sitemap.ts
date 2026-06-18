import type { MetadataRoute } from "next";

import { getAllSlugs } from "@/lib/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shakoshy.com";

const homeLanguages = {
	en: `${siteUrl}/en`,
	ar: `${siteUrl}/ar`,
};

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	const home: MetadataRoute.Sitemap = [
		{
			url: `${siteUrl}/en`,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
			alternates: { languages: homeLanguages },
		},
		{
			url: `${siteUrl}/ar`,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
			alternates: { languages: homeLanguages },
		},
	];

	const articleEntries: MetadataRoute.Sitemap = getAllSlugs().flatMap((slug) => {
		const languages = {
			en: `${siteUrl}/en/articles/${slug}`,
			ar: `${siteUrl}/ar/articles/${slug}`,
		};
		return (["en", "ar"] as const).map((lang) => ({
			url: `${siteUrl}/${lang}/articles/${slug}`,
			lastModified,
			changeFrequency: "monthly" as const,
			priority: 0.8,
			alternates: { languages },
		}));
	});

	const legalEntries: MetadataRoute.Sitemap = [
		"privacy",
		"delete-account",
	].flatMap((path) => {
		const languages = {
			en: `${siteUrl}/en/${path}`,
			ar: `${siteUrl}/ar/${path}`,
		};
		return (["en", "ar"] as const).map((lang) => ({
			url: `${siteUrl}/${lang}/${path}`,
			lastModified,
			changeFrequency: "yearly" as const,
			priority: 0.3,
			alternates: { languages },
		}));
	});

	return [...home, ...articleEntries, ...legalEntries];
}
