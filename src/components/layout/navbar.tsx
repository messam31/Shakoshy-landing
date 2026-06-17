"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/dictionaries";
import { useLanguage } from "@/lib/i18n/language-provider";

const LANGUAGES: { code: Locale; label: string }[] = [
	{ code: "en", label: "English" },
	{ code: "ar", label: "العربية" },
];

function LanguageDropdown({ className }: { className?: string }) {
	const { locale, setLocale } = useLanguage();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onPointerDown = (e: PointerEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, [open]);

	const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

	const choose = (code: Locale) => {
		if (code !== locale) setLocale(code);
		setOpen(false);
	};

	return (
		<div ref={ref} className={`relative ${className ?? ""}`}>
			<Button
				variant="ghost"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="listbox"
				aria-expanded={open}
				className="text-foreground flex items-center gap-1.5 rounded-full font-normal lg:px-6 lg:text-base xl:text-lg"
			>
				{current.label}
				<ChevronDown
					className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
				/>
			</Button>
			{open && (
				<ul
					role="listbox"
					className="shadow-card absolute end-0 z-50 mt-2 min-w-36 overflow-hidden rounded-2xl border border-border bg-white py-1"
				>
					{LANGUAGES.map((l) => (
						<li key={l.code}>
							<button
								type="button"
								role="option"
								aria-selected={l.code === locale}
								onClick={() => choose(l.code)}
								className={`hover:bg-surface-cream flex w-full items-center px-4 py-2 text-start text-sm ${l.code === locale ? "text-primary font-medium" : "text-foreground"}`}
							>
								{l.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 px-4 pt-6 pb-2">
			<nav className="font-poppins mx-auto flex h-nav max-w-5xl items-center justify-between rounded-full border-0 bg-white px-4 font-normal md:px-6 lg:max-w-6xl lg:px-8">
				<Link href="/" aria-label="Shakoshy home">
					<Image src="/logo.svg" alt="Shakoshy" width={172} height={34} className="h-7 w-auto md:h-8 lg:h-9 xl:h-10" priority />
				</Link>

				<LanguageDropdown />
			</nav>
		</header>
	);
}
