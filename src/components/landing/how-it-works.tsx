"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Highlighter } from "@/components/ui/highlighter";
import { useT } from "@/lib/i18n/language-provider";

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(() =>
		typeof window !== "undefined"
			? window.matchMedia("(max-width: 639px)").matches
			: false,
	);
	useEffect(() => {
		const mq = window.matchMedia("(max-width: 639px)");
		const update = () => setIsMobile(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);
	return isMobile;
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
				<div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
					<Image
						src={image}
						alt={title}
						fill
						sizes="(max-width: 768px) 50vw, 25vw"
						className="object-contain p-0"
					/>
				</div>
			</div>
			<h3 className="text-xl font-semibold">{title}</h3>
			<p className="text-muted-foreground text-sm">{description}</p>
		</div>
	);
}

export function HowItWorks() {
	const isMobile = useIsMobile();
	const t = useT();
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
				<p className="mx-auto mt-4 w-4/5 font-normal text-foreground lg:w-auto lg:whitespace-nowrap">
					{t.howItWorks.subtitle}
				</p>
			</div>

			<div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
				{t.howItWorks.steps.map((step, i) => (
					<StepCard
						key={i}
						title={step.title}
						description={step.description}
						image={STEP_IMAGES[i]}
					/>
				))}
			</div>
		</section>
	);
}
