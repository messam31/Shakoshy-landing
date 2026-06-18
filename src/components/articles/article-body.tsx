import Image from "next/image";

import { ArticleTable } from "@/components/articles/article-table";
import type { Block } from "@/lib/articles";

export function ArticleBody({ blocks }: { blocks: Block[] }) {
	return (
		<div className="font-poppins text-foreground">
			{blocks.map((block, i) => {
				switch (block.type) {
					case "paragraph":
						return (
							<p key={i} className="text-article-muted my-5 text-base leading-7">
								{block.text}
							</p>
						);
					case "heading":
						return block.level === 2 ? (
							<h2 key={i} className="mt-10 mb-4 text-2xl font-semibold tracking-tight">
								{block.text}
							</h2>
						) : (
							<h3 key={i} className="mt-8 mb-3 text-xl font-semibold tracking-tight">
								{block.text}
							</h3>
						);
					case "image":
						return (
							<div key={i} className="relative my-8 aspect-16/7 w-full overflow-hidden rounded-2xl">
								<Image
									src={block.src}
									alt={block.alt}
									fill
									sizes="(max-width: 768px) 100vw, 768px"
									className="object-cover"
								/>
							</div>
						);
					case "list":
						return block.ordered ? (
							<ol key={i} className="text-article-muted my-5 list-decimal space-y-2 ps-6 leading-7">
								{block.items.map((item, j) => (
									<li key={j}>{item}</li>
								))}
							</ol>
						) : (
							<ul key={i} className="text-article-muted my-5 list-disc space-y-2 ps-6 leading-7">
								{block.items.map((item, j) => (
									<li key={j}>{item}</li>
								))}
							</ul>
						);
					case "table":
						return (
							<ArticleTable key={i} headers={block.headers} rows={block.rows} />
						);
				}
			})}
		</div>
	);
}
