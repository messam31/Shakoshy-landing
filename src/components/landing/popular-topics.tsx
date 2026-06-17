"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useT } from "@/lib/i18n/language-provider";

const articleImages = ["/article-1.webp", "/article-2.webp", "/article-3.webp"];

export function PopularTopics() {
	const t = useT();
	const articles = t.popularTopics.articles.map((article, i) => ({
		...article,
		image: articleImages[i],
	}));
	return (
		<section className="bg-surface-muted font-poppins overflow-hidden py-section">
			<div className="mx-auto max-w-7xl px-4 sm:px-6">
				<h2 className="mb-14 text-center text-h2 font-semibold tracking-tight">
					{t.popularTopics.heading}
				</h2>

				<div className="grid gap-8 md:grid-cols-3">
					{articles.map((article, i) => (
						<Reveal key={i} x={80} y={0} delay={i * 0.15} className="h-full">
							<article className="shadow-card flex h-full flex-col overflow-hidden rounded-2xl bg-white">
							<div className="relative aspect-16/10 w-full">
								<Image
									src={article.image}
									alt={article.title}
									fill
									sizes="(max-width: 768px) 100vw, 33vw"
									className="object-cover"
								/>
							</div>
							<div className="flex flex-1 flex-col gap-4 p-5">
								<h3 className="text-lg font-semibold">{article.title}</h3>
								<p className="text-placeholder text-sm font-normal">
									{article.description}
								</p>
								<p className="text-placeholder text-sm">
									{t.popularTopics.estimatedCost}{" "}
									<span className="text-foreground font-semibold">
										{article.estimate}
									</span>
								</p>
								<p className="text-sm font-medium">
									<span className="text-foreground">{article.category}:</span>{" "}
									<span className="text-placeholder">{article.readTime}</span>
								</p>
								<div className="mt-auto flex px-1 pt-2">
									<Button className="h-auto w-full rounded-sm py-3">
										{t.popularTopics.readMore}
									</Button>
								</div>
							</div>
							</article>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
