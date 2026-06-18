import Link from "next/link";

import type { Locale } from "@/lib/i18n/dictionaries";
import type { LegalBlock, LegalSection } from "@/lib/legal/content";

const INLINE = /\*\*(.+?)\*\*|(support@shakoshy\.com)/g;

function renderTokens(text: string, keyPrefix: string): React.ReactNode[] {
	const nodes: React.ReactNode[] = [];
	let last = 0;
	let i = 0;
	let match: RegExpExecArray | null;
	INLINE.lastIndex = 0;
	while ((match = INLINE.exec(text)) !== null) {
		if (match.index > last) nodes.push(text.slice(last, match.index));
		if (match[1] !== undefined) {
			nodes.push(
				<strong key={`${keyPrefix}-b${i}`} className="text-foreground font-semibold">
					{match[1]}
				</strong>,
			);
		} else if (match[2]) {
			nodes.push(
				<a
					key={`${keyPrefix}-a${i}`}
					href={`mailto:${match[2]}`}
					className="text-primary hover:underline"
				>
					{match[2]}
				</a>,
			);
		}
		last = match.index + match[0].length;
		i++;
	}
	if (last < text.length) nodes.push(text.slice(last));
	return nodes;
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
	const lines = text.split("\n");
	return lines.flatMap((line, li) => {
		const tokens = renderTokens(line, `${keyPrefix}-l${li}`);
		return li < lines.length - 1
			? [...tokens, <br key={`${keyPrefix}-br${li}`} />]
			: tokens;
	});
}

export function LegalText({ text }: { text: string }) {
	return <>{renderInline(text, "intro")}</>;
}

function Block({
	lang,
	block,
	keyPrefix,
}: {
	lang: Locale;
	block: LegalBlock;
	keyPrefix: string;
}) {
	if ("p" in block) {
		return (
			<p className="text-muted-foreground my-3 leading-7">
				{renderInline(block.p, keyPrefix)}
			</p>
		);
	}
	if ("ul" in block) {
		return (
			<ul className="text-muted-foreground my-3 list-disc space-y-2 ps-6 leading-7">
				{block.ul.map((item, k) => (
					<li key={k}>{renderInline(item, `${keyPrefix}-${k}`)}</li>
				))}
			</ul>
		);
	}
	return (
		<p className="my-3">
			<Link
				href={`/${lang}/delete-account`}
				className="text-primary font-medium hover:underline"
			>
				{block.deleteLink}
			</Link>
		</p>
	);
}

export function LegalSections({
	lang,
	sections,
}: {
	lang: Locale;
	sections: LegalSection[];
}) {
	return (
		<div className="text-foreground space-y-10">
			{sections.map((section, i) => (
				<section key={i}>
					<h2 className="mb-3 text-xl font-semibold tracking-tight">
						{section.heading}
					</h2>
					{section.blocks.map((block, j) => (
						<Block key={j} lang={lang} block={block} keyPrefix={`s${i}b${j}`} />
					))}
				</section>
			))}
		</div>
	);
}
