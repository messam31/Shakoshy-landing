import type { Locale } from "@/lib/i18n/dictionaries";

export function ArticleCta({ locale }: { locale: Locale }) {
	const isAr = locale === "ar";
	const heading = isAr
		? "جاهز للإصلاح؟ وظّف محترفًا اليوم."
		: "Ready to fix it? Hire a Pro Today.";
	const body = isAr
		? "انشر طلبك على شكوشي واحصل على عروض تنافسية من محترفين موثوقين في منطقتك خلال دقائق."
		: "Post your job on Shakoshy and get competitive quotes from verified professionals in your area within minutes.";
	const cta = isAr ? "انشر طلبًا" : "Post a Request";
	return (
		<div className="bg-brand-dark my-12 flex flex-col items-start gap-6 rounded-2xl p-8 text-start sm:p-10">
			<div className="space-y-3">
				<h2 className="text-2xl font-bold text-white">{heading}</h2>
				<p className="max-w-2xl text-base leading-7 text-white/80">{body}</p>
			</div>
			<a
				href="#"
				className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-md px-6 py-3 text-base font-semibold transition-colors"
			>
				{cta}
			</a>
		</div>
	);
}
