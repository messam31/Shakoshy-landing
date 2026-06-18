import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { ArticleCardSummary } from "@/lib/articles";

export function ArticleCard({
	article,
	href,
	estimatedCostLabel,
	readMoreLabel,
}: {
	article: ArticleCardSummary;
	href: string;
	estimatedCostLabel: string;
	readMoreLabel: string;
}) {
	return (
		<article className="shadow-card flex h-full flex-col overflow-hidden rounded-2xl bg-card">
			<Link href={href} className="relative aspect-16/10 w-full">
				<Image
					src={article.cardImage}
					alt={article.title}
					fill
					sizes="(max-width: 768px) 100vw, 33vw"
					className="object-cover"
				/>
			</Link>
			<div className="flex flex-1 flex-col gap-4 p-5">
				<h3 className="text-lg font-semibold">
					<Link href={href} className="hover:text-primary transition-colors">
						{article.title}
					</Link>
				</h3>
				<p className="text-muted-foreground text-sm font-normal">
					{article.description}
				</p>
				<p className="text-muted-foreground text-sm">
					{estimatedCostLabel}{" "}
					<span className="text-foreground font-semibold">
						{article.estimate}
					</span>
				</p>
				<p className="text-sm font-medium">
					<span className="text-foreground">{article.category}:</span>{" "}
					<span className="text-muted-foreground">{article.readTime}</span>
				</p>
				<div className="mt-auto flex px-1 pt-2">
					<Button
						className="h-auto w-full rounded-sm py-3"
						nativeButton={false}
						render={<Link href={href} />}
					>
						{readMoreLabel}
					</Button>
				</div>
			</div>
		</article>
	);
}
