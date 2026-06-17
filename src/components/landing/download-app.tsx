"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { motion, type Variants } from "motion/react";

import { Highlighter } from "@/components/ui/highlighter";
import { useLanguage } from "@/lib/i18n/language-provider";
import {
	type AppKind,
	type MobilePlatform,
	storeLinks,
} from "@/lib/store-links";

const appBadges: { platform: MobilePlatform; src: string; alt: string }[] = [
	{ platform: "ios", src: "/badge-app-store.webp", alt: "Download on the App Store" },
	{ platform: "android", src: "/badge-google-play.webp", alt: "Get it on Google Play" },
];

const rowVariants: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.15 } },
};

const slideFrom = (x: number): Variants => ({
	hidden: { opacity: 0, x },
	show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
});

const slideUp: Variants = {
	hidden: { opacity: 0, y: 48 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(max-width: 639px)");
		const update = () => setIsMobile(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);
	return isMobile;
}

type AppShowcaseProps = {
	app: AppKind;
	phone: string;
	phoneAlt: string;
	ratio: string;
	arrow: string;
	label: string;
	description: string;
	flip?: boolean;
};

function AppShowcase({
	app,
	phone,
	phoneAlt,
	ratio,
	arrow,
	label,
	description,
	flip = false,
}: AppShowcaseProps) {
	const isMobile = useIsMobile();
	const textVariant = isMobile ? slideFrom(flip ? 80 : -80) : slideUp;
	const imageVariant = isMobile ? slideFrom(flip ? -80 : 80) : slideUp;

	return (
		<motion.div
			key={isMobile ? "mobile" : "desktop"}
			className={`flex items-end max-md:gap-3 ${flip ? "flex-row-reverse" : ""}`}
			variants={rowVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: "-80px" }}
		>
			<motion.div
				className={`pb-4 sm:pb-14 md:max-lg:pb-2 ${flip ? "md:max-lg:translate-x-4 lg:max-xl:-translate-x-4" : "max-md:translate-y-6 md:max-lg:-translate-x-4 lg:max-xl:translate-x-4"}`}
				variants={textVariant}
			>
				<div className="flex max-w-48 flex-col items-center gap-1 text-center md:max-lg:max-w-32 lg:max-xl:max-w-56">
					<Image
						src={arrow}
						alt=""
						aria-hidden
						width={96}
						height={96}
						className="h-auto w-20"
					/>
					<span className="text-base font-medium lg:max-xl:text-lg">
						{label}
					</span>
					<p className="max-w-32 text-xs font-normal text-white/80 sm:max-w-none lg:max-xl:text-sm">
						{description}
					</p>
					<div className="mt-3 flex flex-col items-center gap-1">
						{appBadges.map(({ platform, src, alt }) => (
							<a
								key={platform}
								href={storeLinks[app][platform]}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={alt}
								className="flex min-h-11 w-28 items-center py-2 lg:max-xl:w-32"
							>
								<span className="relative block h-8 w-full lg:max-xl:h-9">
									<Image
										src={src}
										alt={alt}
										fill
										sizes="128px"
										className="object-contain"
									/>
								</span>
							</a>
						))}
					</div>
				</div>
			</motion.div>
			<motion.div
				className={`relative w-phone max-md:w-44 md:max-lg:w-48 lg:max-xl:w-72 xl:w-phone-xl ${ratio}`}
				variants={imageVariant}
			>
				<Image
					src={phone}
					alt={phoneAlt}
					fill
					sizes="(max-width: 640px) 16rem, (max-width: 1024px) 20rem, 24rem"
					className="object-contain"
				/>
			</motion.div>
		</motion.div>
	);
}

export function DownloadApp() {
	const { t, locale } = useLanguage();
	return (
		<section
			dir="ltr"
			className="bg-surface-dark font-poppins overflow-hidden pt-section pb-0 text-white"
		>
			<div className="mx-auto flex max-w-7xl flex-col items-center px-6 xl:flex-row xl:items-end xl:justify-between">
				{/* Heading + subtitle */}
				<div className="flex w-full flex-col items-center gap-4 pb-10 text-center md:pb-10 xl:max-w-sm xl:items-start xl:pr-4 xl:pb-28 xl:pl-2 xl:text-left">
					<h2
						dir={locale === "ar" ? "rtl" : "ltr"}
						className="text-h2 font-bold tracking-tight lg:leading-snug"
					>
						{t.downloadApp.headingPrefix}
						<Highlighter
							action="highlight"
							color="#F07C0D"
							animationDuration={1200}
							isView
						>
							{t.downloadApp.headingHighlight}
						</Highlighter>
					</h2>
					<p
						dir={locale === "ar" ? "rtl" : "ltr"}
						className="font-normal text-white/80"
					>
						{t.downloadApp.subtitle}
					</p>
				</div>

				{/* Phones cluster */}
				<div className="flex w-full flex-col items-center justify-center gap-14 md:flex-row md:items-end md:gap-1 xl:w-auto">
					<AppShowcase
						app="customer"
						phone="/app-customer.webp"
						phoneAlt="Shakoshy Customer app screen"
						ratio="aspect-phone"
						arrow="/arrow-customer.svg"
						label={t.downloadApp.customerLabel}
						description={t.downloadApp.customerDescription}
					/>
					<AppShowcase
						app="worker"
						flip
						phone="/app-worker.webp"
						phoneAlt="Shakoshy Worker app screen"
						ratio="aspect-phone"
						arrow="/arrow-worker.svg"
						label={t.downloadApp.workerLabel}
						description={t.downloadApp.workerDescription}
					/>
				</div>
			</div>
		</section>
	);
}
