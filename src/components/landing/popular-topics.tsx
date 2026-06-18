"use client";

import { ArticleCard } from "@/components/articles/article-card";
import { Reveal } from "@/components/ui/reveal";
import { getArticleCards } from "@/lib/articles";
import { useLanguage } from "@/lib/i18n/language-provider";

export function PopularTopics() {
	const { locale, t } = useLanguage();
	const cards = getArticleCards(locale);
	return (
		<section className="bg-surface-muted font-poppins overflow-hidden py-section">
			<div className="mx-auto max-w-7xl px-4 sm:px-6">
				<h2 className="mb-14 text-center text-h2 font-semibold tracking-tight">
					{t.popularTopics.heading}
				</h2>

				<div className="grid gap-8 md:grid-cols-3">
					{cards.map((card, i) => (
						<Reveal
							key={card.slug}
							x={80}
							y={0}
							delay={i * 0.15}
							className="h-full"
						>
							<ArticleCard
								article={card}
								href={`/${locale}/articles/${card.slug}`}
								estimatedCostLabel={t.popularTopics.estimatedCost}
								readMoreLabel={t.popularTopics.readMore}
							/>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
