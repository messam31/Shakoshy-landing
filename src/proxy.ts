import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, locales } from "@/lib/i18n/dictionaries";

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const hasLocalePrefix = locales.some(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
	);
	if (hasLocalePrefix) return;

	request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	// Skip Next internals and any path with a file extension (assets,
	// sitemap.xml, robots.txt, opengraph-image, icon.svg, logo.svg, etc.).
	matcher: ["/((?!_next/|.*\\..*).*)"],
};
