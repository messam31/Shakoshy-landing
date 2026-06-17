import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shakoshy.com";

const languages = {
	en: `${siteUrl}/en`,
	ar: `${siteUrl}/ar`,
};

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();
	return [
		{
			url: `${siteUrl}/en`,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
			alternates: { languages },
		},
		{
			url: `${siteUrl}/ar`,
			lastModified,
			changeFrequency: "weekly",
			priority: 1,
			alternates: { languages },
		},
	];
}
