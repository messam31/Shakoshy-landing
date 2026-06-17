"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { MotionConfig } from "motion/react";

import { dictionaries, type Dictionary, type Locale } from "./dictionaries";

const STORAGE_KEY = "shakoshy-locale";

type LanguageContextValue = {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	toggle: () => void;
	t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyDocumentLocale(locale: Locale) {
	const root = document.documentElement;
	root.lang = locale;
	root.dir = locale === "ar" ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>("en");

	useEffect(() => {
		// localStorage is unavailable during SSR, so the stored locale must be
		// read after mount and synced into state to avoid a hydration mismatch.
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === "en" || stored === "ar") {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setLocaleState(stored);
			applyDocumentLocale(stored);
		}
	}, []);

	const setLocale = useCallback((next: Locale) => {
		setLocaleState(next);
		window.localStorage.setItem(STORAGE_KEY, next);
		applyDocumentLocale(next);
	}, []);

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
