"use client";

import { CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { HeroMedia } from "@/components/landing/hero-media";
import { useT } from "@/lib/i18n/language-provider";

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.2, delayChildren: 0.15 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 28 },
	show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

/** Laptop and larger: two-column layout with an inline search bar. */
export function HeroDesktop({ className }: { className?: string }) {
	const t = useT();
	return (
		<div className={className}>
			<div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 items-stretch gap-20 px-6 pt-16 pb-28">
				{/* Left: text + inline search */}
				<motion.div
					className="flex h-full flex-col gap-6"
					variants={container}
					initial="hidden"
					animate="show"
				>
					<motion.h1
						variants={item}
						className="font-poppins text-h1 font-bold tracking-tight text-balance text-foreground leading-tight"
					>
						{t.hero.title}
					</motion.h1>

					<ul className="flex max-w-md flex-col gap-4 pb-6 lg:max-w-lg">
						{t.hero.points.map((point) => (
							<motion.li
								key={point.highlight}
								variants={item}
								className="text-muted-foreground flex items-start gap-3 text-lg lg:text-xl xl:text-2xl"
							>
								<CheckCircle2 className="text-primary mt-1 size-5 shrink-0 lg:size-6" />
								<span>
									{point.text}
									<span className="text-primary font-bold">
										{point.highlight}
									</span>
								</span>
							</motion.li>
						))}
					</ul>

					{/* Search disabled for now — not yet functional.
					<motion.div variants={item} className="mt-auto flex flex-col gap-5">
						<span className="text-primary font-poppins text-xl font-bold">
							{t.hero.searchPrompt}
						</span>
						<div className="bg-background shadow-card flex items-center gap-2 rounded-2xl border border-border p-2">
							<div className="flex flex-1 items-center gap-3 px-4">
								<Search className="text-muted-foreground size-5 shrink-0" />
								<input
									placeholder={t.hero.searchPlaceholder}
									className="placeholder:text-placeholder w-full bg-transparent text-base font-medium outline-none"
								/>
							</div>
							<Button className="font-poppins h-auto shrink-0 rounded-xl px-10 py-4 text-base">
								{t.hero.search}
							</Button>
						</div>
					</motion.div>
					*/}
				</motion.div>

				{/* Right: illustration */}
				<HeroMedia />
			</div>
		</div>
	);
}
