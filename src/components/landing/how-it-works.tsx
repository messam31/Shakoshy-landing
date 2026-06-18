"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Highlighter } from "@/components/ui/highlighter";
import { Reveal } from "@/components/ui/reveal";
import { useT } from "@/lib/i18n/language-provider";

type StepLayout = "vertical" | "grid" | "horizontal";

function useStepLayout(): StepLayout {
	const [layout, setLayout] = useState<StepLayout>("grid");
	useEffect(() => {
		const mqV = window.matchMedia("(max-width: 639px)");
		const mqH = window.matchMedia("(min-width: 1280px)");
		const update = () =>
			setLayout(mqV.matches ? "vertical" : mqH.matches ? "horizontal" : "grid");
		update();
		mqV.addEventListener("change", update);
		mqH.addEventListener("change", update);
		return () => {
			mqV.removeEventListener("change", update);
			mqH.removeEventListener("change", update);
		};
	}, []);
	return layout;
}

const STEP_IMAGES = [
	"/works-1.webp",
	"/works-2.webp",
	"/works-3.webp",
	"/works-4.webp",
];

type Step = { title: string; description: string; image: string };

function StepCard({ title, description, image }: Step) {
	return (
		<div className="flex flex-col items-center gap-4 text-center">
			<div className="w-full rounded-2xl bg-surface-peach-soft p-8">
				<div className="relative aspect-square w-full overflow-hidden rounded-xl bg-card">
					<Image
						src={image}
						alt=""
						fill
						sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
						className="object-contain"
					/>
				</div>
			</div>
			<h3 className="text-card-title font-semibold">{title}</h3>
			<p className="text-muted-foreground text-card-body">{description}</p>
		</div>
	);
}

function StepPath({
	layout,
	rtl,
}: {
	layout: "vertical" | "horizontal";
	rtl: boolean;
}) {
	const reduce = useReducedMotion();
	const horizontal = layout === "horizontal";
	// Mirror the horizontal draw direction for RTL (draw end -> start).
	const x1 = horizontal ? (rtl ? 94 : 6) : 50;
	const x2 = horizontal ? (rtl ? 6 : 94) : 50;
	const y1 = horizontal ? 22 : 6;
	const y2 = horizontal ? 22 : 94;
	return (
		<svg
			aria-hidden
			className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
			preserveAspectRatio="none"
			viewBox="0 0 100 100"
		>
			<motion.line
				x1={x1}
				y1={y1}
				x2={x2}
				y2={y2}
				stroke="var(--color-primary)"
				strokeOpacity={0.45}
				strokeWidth={2}
				strokeLinecap="round"
				vectorEffect="non-scaling-stroke"
				initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={reduce ? { duration: 0 } : { duration: 1.2, ease: "easeInOut" }}
			/>
		</svg>
	);
}

export function HowItWorks() {
	const layout = useStepLayout();
	const isMobile = layout === "vertical";
	const t = useT();
	const rtl = t.nav.switchTo === "EN";
	return (
		<section
			id="how-it-works"
			className="font-poppins mx-auto max-w-7xl scroll-mt-nav px-6 py-section"
		>
			<div className="mx-auto mb-14 max-w-2xl text-center">
				<h2 className="text-h2 font-bold tracking-tight">
					{t.howItWorks.headingPrefix}
					<Highlighter
						action="underline"
						color="#F07C0D"
						padding={isMobile ? 3 : 8}
						animationDuration={1500}
						isView
					>
						<span className="text-primary">{t.howItWorks.brand}</span>
					</Highlighter>
					{t.howItWorks.headingSuffix}
				</h2>
				<p className="mx-auto mt-4 w-4/5 font-normal text-balance text-foreground lg:w-auto">
					{t.howItWorks.subtitle}
				</p>
			</div>

			<div className="relative grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
				{layout !== "grid" && <StepPath layout={layout} rtl={rtl} />}
				{t.howItWorks.steps.map((step, i) => (
					<Reveal key={i} delay={i * 0.12}>
						<StepCard
							title={step.title}
							description={step.description}
							image={STEP_IMAGES[i]}
						/>
					</Reveal>
				))}
			</div>
		</section>
	);
}
