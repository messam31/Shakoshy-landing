"use client";

import Image from "next/image";
import { useState } from "react";

import { motion } from "motion/react";
import {
	ArrowRight,
	Briefcase,
	CircleDollarSign,
	CirclePlay,
	ClipboardList,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import { useT } from "@/lib/i18n/language-provider";
import { openAppStore } from "@/lib/store-links";
import { cn } from "@/lib/utils";

const tabsMeta = {
	customers: {
		image: "/customer-section.webp",
		imageAlt: "Customer reviewing worker offers in the Shakoshy app",
		icons: [CirclePlay, Briefcase, CircleDollarSign, ClipboardList],
	},
	workers: {
		image: "/worker-section.webp",
		imageAlt: "Worker browsing job opportunities in the Shakoshy app",
		icons: [Briefcase, CircleDollarSign, CirclePlay, ClipboardList],
	},
} as const;

type TabId = keyof typeof tabsMeta;

export function GetJobDone() {
	const t = useT();
	const [active, setActive] = useState<TabId>("customers");
	// Redraw the heading underline only after the slide animation settles,
	// otherwise rough-notation measures a mid-animation (offset) position.
	const [settled, setSettled] = useState(false);
	const tabIds = Object.keys(tabsMeta) as TabId[];
	const tab = t.getJobDone.tabs[active];
	const meta = tabsMeta[active];
	const isWorker = active === "workers";

	return (
		<section
			id="professionals"
			className="font-poppins bg-white scroll-mt-nav py-section"
		>
			<div className="mx-auto flex max-w-7xl flex-col items-center gap-20 px-6">
				{/* Toggle */}
				<div
					role="tablist"
					className="bg-muted flex w-fit items-center gap-1 rounded-full p-1.5"
				>
					{tabIds.map((id) => (
						<button
							key={id}
							type="button"
							role="tab"
							id={`get-job-done-tab-${id}`}
							aria-selected={active === id}
							aria-controls={`get-job-done-panel-${id}`}
							onClick={() => {
								setSettled(false);
								setActive(id);
							}}
							className={cn(
								"flex min-h-11 w-40 cursor-pointer items-center justify-center rounded-full px-5 py-2 text-center text-base transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
								active === id
									? "bg-foreground text-background"
									: "text-foreground hover:text-foreground/70",
							)}
						>
							{t.getJobDone.tabs[id].label}
						</button>
					))}
				</div>

				{/* Panel */}
				<div
					role="tabpanel"
					id={`get-job-done-panel-${active}`}
					aria-labelledby={`get-job-done-tab-${active}`}
					className="grid w-full items-center gap-10 lg:grid-cols-2"
				>
					{/* Copy + CTA */}
					<motion.div
						key={`copy-${active}`}
						initial={{ opacity: 0, x: isWorker ? 24 : -24 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						onAnimationComplete={() => setSettled(true)}
						className={cn("flex flex-col gap-6", isWorker && "lg:order-2")}
					>
						<h2 className="text-h2 font-bold tracking-tight">
							{tab.headingPrefix}
							{settled ? (
								<Highlighter
									key={`hl-${active}`}
									action="underline"
									color="#F07C0D"
									padding={6}
									animationDuration={1500}
									isView
								>
									{tab.headingHighlight}
								</Highlighter>
							) : (
								<span className="inline-block">{tab.headingHighlight}</span>
							)}
						</h2>
						<ul className="flex flex-col gap-4">
							{tab.benefits.map((text, i) => {
								const Icon = meta.icons[i];
								return (
									<li key={text} className="flex items-center gap-3">
										<Icon className="text-primary size-6 shrink-0" />
										<span className="text-muted-foreground font-normal">
											{text}
										</span>
									</li>
								);
							})}
						</ul>
						<div className="flex justify-start">
							<Button
								onClick={() => openAppStore(isWorker ? "worker" : "customer")}
								className="h-auto rounded-full px-6 py-3.5 text-base font-medium"
							>
								{tab.cta}
								<ArrowRight className="rtl:rotate-180" />
							</Button>
						</div>
					</motion.div>

					{/* Image panel */}
					<motion.div
						key={`image-${active}`}
						initial={{ opacity: 0, x: isWorker ? -24 : 24 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						className={cn(
							"relative aspect-photo overflow-hidden rounded-3xl",
							isWorker ? "bg-white lg:order-1" : "bg-primary",
						)}
					>
						<Image
							src={meta.image}
							alt={meta.imageAlt}
							fill
							sizes="(max-width: 1024px) 100vw, 50vw"
							className={cn(
								"object-bottom",
								isWorker ? "object-cover" : "object-contain",
							)}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
