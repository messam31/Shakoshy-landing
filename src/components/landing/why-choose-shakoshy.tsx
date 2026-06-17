"use client";

import Image from "next/image";

import { Highlighter } from "@/components/ui/highlighter";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/lib/i18n/language-provider";

export function WhyChooseShakoshy() {
	const { t, locale } = useLanguage();
	const cards = t.whyChoose.cards;
	// Arabic card-1 description: break after the 4th word on bigger screens
	const card1Words = cards[0].description.split(" ");
	return (
		<section className="bg-surface-muted py-section">
			<div className="font-poppins mx-auto max-w-7xl px-4 sm:px-6">
			<div className="mx-auto mb-14 max-w-2xl text-center">
				<h2 className="text-h2-sm font-bold tracking-tight">
					{t.whyChoose.headingPrefix}
					<Highlighter
						action="underline"
						color="#F07C0D"
						padding={6}
						animationDuration={1500}
						isView
					>
						<span className="text-primary font-semibold">
							{t.whyChoose.brand}
						</span>
					</Highlighter>
					<span className="text-primary font-semibold">
						{t.whyChoose.headingSuffix}
					</span>
				</h2>
			</div>

			{/* Mobile: single full-width column. Tablet: 2-column grid (row wrappers
          collapse via display:contents). At 1440px+: two bento rows of 3. */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:flex xl:flex-col">
				{/* Row 1 */}
				<div className="contents xl:grid xl:grid-cols-12 xl:gap-6 xl:h-bento-row">
					{/* Card 1 — text full-block, image absolute bottom-right */}
					<Reveal
						delay={0}
						className="bg-background shadow-card relative flex flex-col overflow-hidden rounded-2xl p-5 xl:col-span-4 xl:p-6 xl:aspect-auto xl:block"
					>
						{/* Text Stack: Removed max-w from here so the heading has full runway */}
						<div className="flex flex-1 flex-col gap-4 z-10 relative">
							{/* Heading remains completely free to stay on one line */}
							<h3 className="text-card-title font-bold w-full leading-tight xl:whitespace-nowrap">
								{cards[0].title}
							</h3>

							{/* Paragraph: Added a strict max-w so it wraps nicely exactly like the mockup */}
							<p className="text-muted-foreground text-sm md:text-xl xl:text-xs leading-loose xl:leading-relaxed max-w-[58%] xl:max-w-[60%] rtl:max-w-[50%] xl:rtl:max-w-[52%] my-auto xl:my-0">
								{locale === "ar" ? (
									<>
										{card1Words.slice(0, 4).join(" ")}
										<br className="hidden xl:block" />{" "}
										{card1Words.slice(4).join(" ")}
									</>
								) : (
									cards[0].description
								)}
							</p>
						</div>

						{/* Image Container */}
						<div className="absolute end-0 bottom-0 h-full w-[42%] sm:w-[52%] xl:w-[46%] sm:rtl:w-[46%] xl:rtl:w-[42%] pointer-events-none z-0">
							<Image
								src="/WorkerFinalImage.webp"
								alt={cards[0].title}
								fill
								sizes="(min-width: 1280px) 22vw, (min-width: 640px) 20vw, 40vw"
								className="object-contain object-right-bottom rtl:object-left-bottom"
							/>
						</div>
					</Reveal>
					{/* Card 2 — stacked (image below) — 343:263 */}
					<Reveal
						delay={0.08}
						className="bg-background shadow-card flex aspect-card flex-col gap-4 overflow-hidden rounded-2xl p-5 pb-2 xl:col-span-3 xl:p-6 xl:aspect-auto"
					>
						<div className="flex flex-col gap-4">
							<h3 className="text-card-title font-bold">
								{cards[1].title}
							</h3>
							<p className="text-muted-foreground text-sm md:text-xl xl:text-xs">
								{cards[1].description}
							</p>
						</div>
						<div className="relative mt-1 w-full flex-1 overflow-hidden xl:mt-2">
							<Image
								src="/choose-2.webp"
								alt={cards[1].title}
								fill
								sizes="(min-width: 1280px) 343px, (min-width: 640px) 50vw, 100vw"
								className="object-contain object-bottom scale-100"
							/>
						</div>
					</Reveal>

					{/* Card 3 — stacked (image below) — 470:263 */}
					<Reveal
						delay={0.16}
						className="bg-background shadow-card flex aspect-card flex-col overflow-hidden rounded-2xl p-5 pb-2 xl:col-span-5 xl:p-6 xl:aspect-auto"
					>
						<div className="flex flex-col gap-4">
							<h3 className="text-card-title font-bold">
								{cards[2].title}
							</h3>
							<p className="text-muted-foreground text-sm md:text-xl xl:text-xs">
								{cards[2].description}
							</p>
						</div>
						<div className="relative w-full flex-1 overflow-hidden">
							<Image
								src="/choose-3.webp"
								alt={cards[2].title}
								fill
								sizes="(min-width: 1280px) 470px, (min-width: 640px) 50vw, 100vw"
								className="object-contain object-bottom scale-100"
							/>
						</div>
					</Reveal>
				</div>

				{/* Row 2 */}
				<div className=" contents xl:grid xl:grid-cols-12 xl:gap-6 xl:h-bento-row">
					{/* Card 4 — white card; title on top, text + image side by side */}
					<Reveal
						delay={0}
						className="shadow-card flex flex-col gap-4 overflow-hidden rounded-2xl bg-surface-peach p-3 xl:col-span-3 xl:p-4 xl:aspect-auto min-h-50"
					>
						<h3 className="text-card-title font-bold md:whitespace-nowrap xl:whitespace-normal">
							{cards[3].title}
						</h3>
						{/* Text + image side by side, sharing the width, centered */}
						<div className="flex flex-1 items-center gap-4">
							<p className="font-poppins flex-1 text-foreground text-card-body font-medium leading-loose xl:text-sm">
								{cards[3].description}
							</p>

							{/* Image */}
							<div className="relative aspect-square w-1/2 shrink-0">
								<Image
									src="/choose-4.webp"
									alt={cards[3].title}
									fill
									sizes="(min-width: 1280px) 181px, (min-width: 640px) 25vw, 50vw"
									className="object-contain"
								/>
							</div>
						</div>
					</Reveal>

					{/* Card 5 — stacked (image below) — 500:263 */}
					<Reveal
						delay={0.08}
						className="bg-background shadow-card flex aspect-card flex-col gap-4 overflow-hidden rounded-2xl p-4 pb-2 xl:col-span-5 xl:p-6 xl:aspect-auto"
					>
						<div className="flex flex-col gap-4">
							<h3 className="text-card-title font-bold">
								{cards[4].title}
							</h3>
							<p className="text-muted-foreground text-sm leading-loose md:text-xl xl:text-xs xl:leading-normal">
								{cards[4].description}
							</p>
						</div>
						<div className="relative mt-2 w-full flex-1 overflow-hidden">
							<Image
								src="/choose-5.webp"
								alt={cards[4].title}
								fill
								sizes="(min-width: 1280px) 286px, (min-width: 640px) 50vw, 100vw"
								className="object-contain"
							/>
						</div>
					</Reveal>

					{/* Card 6 — image absolute bottom-right — black background, white text */}
					<Reveal
						delay={0.16}
						className="shadow-card relative overflow-hidden rounded-2xl bg-surface-dark p-6 xl:col-span-4 xl:aspect-auto min-h-bento-row"
					>
						<div className="flex w-1/2 flex-col gap-4 md:w-4/5 xl:w-full">
							<h3 className="text-card-title font-bold text-white xl:whitespace-nowrap">
								{cards[5].title}
							</h3>
							<p className="text-sm text-white leading-loose md:text-xl md:ltr:leading-snug xl:text-xs xl:leading-normal">
								{cards[5].description}
							</p>
						</div>

						{/* Image box: size is % of card so it scales */}
						<div className="absolute -end-2 -bottom-2 z-10 h-3/5 w-3/5 overflow-hidden">
							<Image
								src="/choose-6.webp"
								alt={cards[5].title}
								fill
								sizes="(min-width: 1280px) 415px, (min-width: 640px) 40vw, 80vw"
								className="object-contain"
								style={{
									objectPosition:
										locale === "ar" ? "left bottom" : "right bottom",
								}}
							/>
						</div>
					</Reveal>
				</div>
			</div>
			</div>
		</section>
	);
}
