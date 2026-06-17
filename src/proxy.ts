import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, locales } from "@/lib/i18n/dictionaries";

/** Pick the best supported locale from the Accept-Language header. */
function detectLocale(request: NextRequest): string {
	const header = request.headers.get("accept-language");
	if (!header) return defaultLocale;
	// Prefer Arabic only when explicitly requested; otherwise default to en.
	const prefers = header
		.split(",")
		.map((part) => part.split(";")[0].trim().toLowerCase());
	for (const tag of prefers) {
		if (tag === "ar" || tag.startsWith("ar-")) return "ar";
		if (tag === "en" || tag.startsWith("en-")) return "en";
	}
	return defaultLocale;
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const hasLocalePrefix = locales.some(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
	);
	if (hasLocalePrefix) return;

	const locale = detectLocale(request);
	request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	// Skip Next internals and any path with a file extension (assets,
	// sitemap.xml, robots.txt, opengraph-image, icon.svg, logo.svg, etc.).
	matcher: ["/((?!_next/|.*\\..*).*)"],
};
