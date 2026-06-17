"use client";

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

/** Tablet and mobile: centered, single-column layout with a stacked search card. */
export function HeroMobile({ className }: { className?: string }) {
	const t = useT();
	return (
		<div className={className}>
			<div className="relative z-10 mx-auto grid max-w-7xl items-stretch gap-12 px-6 pt-16 pb-20 md:gap-20">
				{/* Text + stacked search */}
				<motion.div
					className="flex h-full flex-col gap-6"
					variants={container}
					initial="hidden"
					animate="show"
				>
					<motion.h1
						variants={item}
						className="font-poppins text-start text-h1 font-bold tracking-tight text-balance text-foreground leading-tight"
					>
						{t.hero.title}
					</motion.h1>

					<motion.p
						variants={item}
						className="text-foreground pb-6 text-start text-lg"
					>
						{t.hero.subtitle}
					</motion.p>

					{/* Search disabled for now — not yet functional.
					<motion.div variants={item} className="mt-auto">
						<div className="bg-background shadow-card flex w-full flex-col gap-5 rounded-2xl p-2">
							<span className="text-primary font-poppins text-start text-lg font-bold sm:text-xl">
								{t.hero.searchPrompt}
							</span>
							<div className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
								<Search className="text-muted-foreground size-5 shrink-0" />
								<input
									placeholder={t.hero.searchPlaceholder}
									className="placeholder:text-placeholder w-full bg-transparent text-base font-medium outline-none"
								/>
							</div>
							<Button className="w-full py-5 font-poppins text-base sm:py-6">
								{t.hero.search}
							</Button>
						</div>
					</motion.div>
					*/}
				</motion.div>

				{/* Illustration */}
				<HeroMedia />
			</div>
		</div>
	);
}
