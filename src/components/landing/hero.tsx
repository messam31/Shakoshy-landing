import { Navbar } from "@/components/layout/navbar";
import { HeroDesktop } from "@/components/landing/hero-desktop";
import { HeroMobile } from "@/components/landing/hero-mobile";

export function Hero() {
	return (
		<section id="top" className="bg-background relative overflow-hidden">
			{/* Lamp: far top-left corner */}
			<div className="bg-brand/30 pointer-events-none absolute top-0 -start-glow-edge size-glow rounded-full blur-glow xl:top-glow-top" />
			{/* Lamp: far top-right corner */}
			<div className="bg-brand/30 pointer-events-none absolute top-0 -end-glow-edge size-glow rounded-full blur-glow xl:top-glow-top" />
			{/* Lamp: center glow */}
			<div className="bg-brand/20 pointer-events-none absolute top-0 start-1/2 size-glow -translate-x-1/2 rounded-full blur-glow xl:top-glow-top-mid" />
			{/* Fade to full white toward the bottom */}
			<div className="bg-linear-to-b pointer-events-none absolute inset-0 from-transparent to-background" />

			<Navbar />

			<HeroDesktop className="hidden xl:block" />
			<HeroMobile className="xl:hidden" />
		</section>
	);
}
