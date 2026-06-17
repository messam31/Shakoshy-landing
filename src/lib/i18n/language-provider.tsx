"use client";

import { createContext, useCallback, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MotionConfig } from "motion/react";

import {
	dictionaries,
	swapLocaleInPath,
	type Dictionary,
	type Locale,
} from "./dictionaries";

type LanguageContextValue = {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	toggle: () => void;
	t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
	locale,
	children,
}: {
	locale: Locale;
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();

	const setLocale = useCallback(
		(next: Locale) => {
			if (next === locale) return;
			router.push(swapLocaleInPath(pathname, next));
		},
		[locale, pathname, router],
	);

	const toggle = useCallback(() => {
		setLocale(locale === "en" ? "ar" : "en");
	}, [locale, setLocale]);

	return (
		<LanguageContext.Provider
			value={{ locale, setLocale, toggle, t: dictionaries[locale] }}
		>
			<MotionConfig reducedMotion="user">{children}</MotionConfig>
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const ctx = useContext(LanguageContext);
	if (!ctx) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return ctx;
}

export function useT() {
	return useLanguage().t;
}
