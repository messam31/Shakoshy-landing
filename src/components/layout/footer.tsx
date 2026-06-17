"use client";

import Image from "next/image";
import Link from "next/link";

import { useT } from "@/lib/i18n/language-provider";

const FOOTER_LINKS = [
	{ href: "#how-it-works", key: "howItWorks" },
	{ href: "#categories", key: "categories" },
	{ href: "#professionals", key: "professionals" },
	{ href: "#top", key: "about" }, // #top = hero section (valid)
	// FIXME: no element with id="contact" exists on the page yet. Broken anchor.
	// Out of scope to add a contact section here; wire up once one exists.
	{ href: "#contact", key: "contact" },
] as const;

const SOCIALS = [
	{
		href: "https://x.com/shakoshyllc",
		label: "Shakoshy on X",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
			</svg>
		),
	},
	{
		href: "https://www.instagram.com/shakoshy.eg",
		label: "Shakoshy on Instagram",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
				<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
			</svg>
		),
	},
];

export function Footer() {
	const t = useT();
	return (
		<footer className="border-border bg-background border-t">
			<div className="font-poppins mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-14">
				<Link href="/" aria-label="Shakoshy home">
					<Image
						src="/logo.svg"
						alt="Shakoshy"
						width={172}
						height={34}
						className="h-8 w-auto"
					/>
				</Link>

				<nav className="flex max-w-md flex-wrap justify-center gap-x-10 gap-y-4 lg:max-w-none">
					{FOOTER_LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-muted-foreground hover:text-foreground inline-flex min-h-11 items-center text-base"
						>
							{t.footer.links[link.key]}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-4">
					{SOCIALS.map((social) => (
						<a
							key={social.label}
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.label}
							className="border-border text-foreground hover:bg-muted flex size-11 items-center justify-center rounded-full border transition-colors"
						>
							{social.icon}
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
