import { Navbar } from "@/components/layout/navbar";
import { HeroDesktop } from "@/components/landing/hero-desktop";
import { HeroMobile } from "@/components/landing/hero-mobile";
import { HeroGlows } from "@/components/landing/hero-glows";

export function Hero() {
	return (
		<section id="top" className="bg-background relative overflow-hidden">
			<HeroGlows />
			{/* Fade to full white toward the bottom */}
			<div className="bg-linear-to-b pointer-events-none absolute inset-0 from-transparent to-background" />

			<Navbar />

			<HeroDesktop className="hidden xl:block" />
			<HeroMobile className="xl:hidden" />
		</section>
	);
}
