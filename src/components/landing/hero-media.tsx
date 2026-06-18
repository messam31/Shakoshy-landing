"use client";

import { ArrowRight, Briefcase, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

import { useT } from "@/lib/i18n/language-provider";
import { openAppStore } from "@/lib/store-links";

/** Shared hero illustration: photo + floating badges + CTA. */
export function HeroMedia({ className }: { className?: string }) {
	const t = useT();
	return (
		<motion.div
			role="img"
			aria-label={t.hero.imageAlt}
			className={`@container relative aspect-photo w-full rounded-2xl bg-cover bg-center ${className ?? ""}`}
			style={{ backgroundImage: "url('/hero-worker.webp')" }}
			initial={{ opacity: 0, x: 40, y: 16 }}
			animate={{ opacity: 1, x: 0, y: 0 }}
			transition={{ type: "spring", stiffness: 55, damping: 13, delay: 0.25 }}
		>
			{/* Badges: stacked top-left */}
			<div className="absolute top-badge-top -left-badge-inset flex flex-col items-start gap-badge-gap rtl:items-end">
				<motion.div
					className="bg-background shadow-card ml-badge-1-ms flex w-fit items-center gap-badge-icon-gap rounded-full px-badge-px py-1"
					initial={{ opacity: 0, y: 14 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 200, damping: 12, delay: 1.0 }}
				>
					<ShieldCheck className="text-primary shrink-0 size-badge-icon" />
					<span className="font-poppins font-semibold md:font-medium text-xs xs:text-sm sm:text-base md:text-base">
						{t.hero.badgeTrusted}
					</span>
				</motion.div>
				<motion.div
					className="bg-background ml-badge-2-ms flex w-fit items-center gap-badge-icon-gap rounded-full px-badge-px py-1"
					initial={{ opacity: 0, y: 14 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 200, damping: 12, delay: 1.15 }}
				>
					<Briefcase className="text-primary shrink-0 size-badge-icon" />
					<span className="font-poppins font-semibold md:font-medium text-xs xs:text-sm sm:text-base md:text-base">
						{t.hero.badgeOffers}
					</span>
				</motion.div>
			</div>

			{/* CTA: anchored bottom-right; size is % of image so it scales with it */}
			<button
				type="button"
				onClick={() => openAppStore("worker")}
				className="font-poppins absolute bottom-0 right-0 z-10 flex h-[10%] w-[37%] cursor-pointer items-center justify-center gap-[0.4em] rounded-full bg-primary text-center text-[0.5rem] min-[22.5rem]:text-[0.6rem] xs:text-cta sm:min-h-11 text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-md"
			>
				{t.hero.becomeWorker}
				<ArrowRight className="size-[1.4em] shrink-0 sm:size-[1.1em] rtl:rotate-180" />
			</button>
		</motion.div>
	);
}
