"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	type KeyboardEvent as ReactKeyboardEvent,
	useEffect,
	useRef,
	useState,
} from "react";

import { ChevronDown } from "lucide-react";
import GB from "country-flag-icons/react/3x2/GB";
import SA from "country-flag-icons/react/3x2/SA";

import { Button } from "@/components/ui/button";
import { swapLocaleInPath, type Locale } from "@/lib/i18n/dictionaries";
import { useLanguage } from "@/lib/i18n/language-provider";

const LANGUAGES: { code: Locale; label: string; Flag: typeof GB }[] = [
	{ code: "en", label: "English", Flag: GB },
	{ code: "ar", label: "العربية", Flag: SA },
];

function LanguageDropdown({ className }: { className?: string }) {
	const { locale } = useLanguage();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (!open) return;
		const onPointerDown = (e: PointerEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpen(false);
				triggerRef.current?.focus();
			}
		};
		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	// On open, move focus to the currently selected option for keyboard users.
	useEffect(() => {
		if (!open) return;
		const items = listRef.current?.querySelectorAll<HTMLAnchorElement>(
			'[role="option"]',
		);
		if (!items?.length) return;
		const selected =
			Array.from(items).find(
				(el) => el.getAttribute("aria-selected") === "true",
			) ?? items[0];
		selected.focus();
	}, [open]);

	const onListKeyDown = (e: ReactKeyboardEvent<HTMLUListElement>) => {
		if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
		e.preventDefault();
		const items = Array.from(
			listRef.current?.querySelectorAll<HTMLAnchorElement>('[role="option"]') ??
				[],
		);
		if (!items.length) return;
		const active = document.activeElement as HTMLElement | null;
		const currentIndex = items.findIndex((el) => el === active);
		const delta = e.key === "ArrowDown" ? 1 : -1;
		const nextIndex = (currentIndex + delta + items.length) % items.length;
		items[nextIndex]?.focus();
	};

	const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];
	const CurrentFlag = current.Flag;

	return (
		<div ref={ref} className={`relative ${className ?? ""}`}>
			<Button
				ref={triggerRef}
				variant="ghost"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label={`Language: ${current.label}`}
				className="text-foreground flex items-center gap-1.5 rounded-full font-normal lg:px-6 lg:text-base xl:text-lg"
			>
				<CurrentFlag aria-hidden className="h-4 w-6 shrink-0 rounded-[3px]" />
				{current.label}
				<ChevronDown
					className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
				/>
			</Button>
			{open && (
				<ul
					ref={listRef}
					role="listbox"
					aria-label="Select language"
					onKeyDown={onListKeyDown}
					className="shadow-card bg-popover absolute end-0 z-50 mt-2 min-w-36 overflow-hidden rounded-2xl border border-border py-1"
				>
					{LANGUAGES.map((l) => {
						const Flag = l.Flag;
						return (
							<li key={l.code}>
								<Link
									href={swapLocaleInPath(pathname, l.code)}
									role="option"
									aria-selected={l.code === locale}
									onClick={() => setOpen(false)}
									className={`hover:bg-surface-cream flex min-h-11 w-full items-center gap-2.5 px-4 py-2 text-start text-sm ${l.code === locale ? "text-primary font-medium" : "text-foreground"}`}
								>
									<Flag aria-hidden className="h-4 w-6 shrink-0 rounded-[3px]" />
									{l.label}
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

export function Navbar() {
	const { locale } = useLanguage();
	const isArabic = locale === "ar";
	const logo = {
		src: isArabic ? "/ArabicLogo.svg" : "/logo.svg",
		alt: isArabic ? "شاكوشي" : "Shakoshy",
		width: isArabic ? 110 : 172,
		height: isArabic ? 40 : 34,
	};
	return (
		<header className="sticky top-0 z-50 px-4 pt-6 pb-2">
			<nav className="font-poppins bg-background mx-auto flex h-nav max-w-5xl items-center justify-between rounded-full border-0 px-4 font-normal md:px-6 lg:max-w-6xl lg:px-8">
				<Link href={`/${locale}`} aria-label="Shakoshy home">
					<Image
						src={logo.src}
						alt={logo.alt}
						width={logo.width}
						height={logo.height}
						className="h-7 w-auto md:h-8 lg:h-9 xl:h-10"
						priority
					/>
				</Link>

				<LanguageDropdown />
			</nav>
		</header>
	);
}
