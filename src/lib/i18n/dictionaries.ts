const en = {
	nav: {
		signIn: "Sign In",
		postJob: "Post a Job",
		menu: "Menu",
		openMenu: "Open menu",
		closeMenu: "Close menu",
		switchTo: "العربية",
	},
	hero: {
		title: "Find Trusted Service Professionals Near You",
		subtitle:
			"Describe your request, receive offers from skilled professionals, and choose the best one for your needs.",
		searchPrompt: "What service do you need today?",
		searchPlaceholder: "Search for a service or area",
		search: "Search",
		badgeTrusted: "Trusted Workers",
		badgeOffers: "Real Offers",
		becomeWorker: "Become a Worker",
		imageAlt: "A verified Shakoshy professional at work",
	},
	howItWorks: {
		headingPrefix: "How ",
		brand: "Shakoshy",
		headingSuffix: " Works",
		subtitle:
			"Shakoshy connects customers with trusted local workers in a simple, fast, and transparent way.",
		steps: [
			{
				title: "1. Post Your Job",
				description:
					"Tell us what you need, describe your service request, add your location, and provide any details that help workers understand the job.",
			},
			{
				title: "2. Receive Real Offers",
				description:
					"Nearby verified professionals send you real offers with their price, so you can compare options within minutes.",
			},
			{
				title: "3. Choose the Best Worker",
				description:
					"Review profiles, ratings, and genuine customer reviews, then pick the professional you trust at the price that fits.",
			},
			{
				title: "4. Get the Job Done",
				description:
					"Track and communicate. Chat with the worker, follow the job progress, and complete the service with confidence.",
			},
		],
	},
	whyChoose: {
		headingPrefix: "Why Choose ",
		brand: "Shakoshy",
		headingSuffix: "?",
		cards: [
			{
				title: "Verified Professionals",
				description:
					"All professionals are reviewed and verified before joining the platform.",
			},
			{
				title: "Transparent Pricing",
				description:
					"Compare multiple offers and choose what fits your budget.",
			},
			{
				title: "Fast Response Times",
				description: "Receive offers and responses within minutes.",
			},
			{
				title: "Secure Communication",
				description: "Chat safely with professionals through the platform.",
			},
			{
				title: "Real Customer Reviews",
				description:
					"Make informed decisions based on genuine customer experiences.",
			},
			{
				title: "Available Across",
				description:
					"Find trusted professionals in your city and nearby areas.",
			},
		],
	},
	getJobDone: {
		tabs: {
			customers: {
				label: "For Customers",
				headingPrefix: "Get Your Job Done ",
				headingHighlight: "with Confidence",
				cta: "Post a Job",
				benefits: [
					"Post your request for free.",
					"Receive multiple offers.",
					"Compare professionals and prices.",
					"Track your request easily.",
				],
			},
			workers: {
				label: "For Workers",
				headingPrefix: "Grow Your Business ",
				headingHighlight: "with Confidence",
				cta: "Join as a Worker",
				benefits: [
					"Receive job opportunities near you.",
					"Send your offers and set your price.",
					"Build your reputation with reviews.",
					"Track your jobs easily.",
				],
			},
		},
	},
	services: {
		headingPrefix: "",
		headingHighlight: "Our Service",
		headingSuffix: " Categories",
		subtitle: "Shakoshy supports a wide range of services, including:",
		items: [
			"Plumbing",
			"Electrical Works",
			"AC Services",
			"Cleaning",
			"Carpentry",
			"Painting",
			"Aluminum & Glass",
			"Moving & Transport",
			"Flooring & Tiling",
			"Roof Repair",
		],
	},
	popularTopics: {
		heading: "Popular Topics",
		estimatedCost: "Estimated cost:",
		readMore: "Read More",
		articles: [
			{
				title: "How Much Does Plumbing Repair Cost?",
				description:
					"Plumbing costs vary based on the issue, parts needed, and urgency. Learn what affects the price of leaks, faucets, drains, and pipe repairs.",
				estimate: "200–1200 EGP",
				category: "Plumbing",
				readTime: "4 min read",
			},
			{
				title: "What to Expect from an AC Service Visit",
				description:
					"From routine cleaning to gas refills and full installs, here's how AC pricing works and how to spot a fair offer before you book.",
				estimate: "150–900 EGP",
				category: "AC Services",
				readTime: "5 min read",
			},
			{
				title: "Hiring an Electrician: A Quick Cost Guide",
				description:
					"Wiring faults, new outlets, and panel upgrades each carry different rates. Understand what drives the price of safe electrical work.",
				estimate: "100–800 EGP",
				category: "Electrical Works",
				readTime: "3 min read",
			},
		],
	},
	downloadApp: {
		headingPrefix: "Everything You Need in ",
		headingHighlight: "One App",
		subtitle: "Available for both customers and worker",
		customerLabel: "Customer App",
		customerDescription:
			"Post requests, receive offers, and hire the best professional.",
		workerLabel: "Worker App",
		workerDescription:
			"Receive job opportunities, send offers, and grow your business.",
		download: "Download",
	},
	footer: {
		links: {
			howItWorks: "How it Works",
			categories: "Categories",
			professionals: "Professionals",
			about: "About",
			contact: "Contact",
		},
	},
};

type Dictionary = typeof en;

const ar: Dictionary = {
	nav: {
		signIn: "تسجيل الدخول",
		postJob: "اطلب خدمة",
		menu: "القائمة",
		openMenu: "فتح القائمة",
		closeMenu: "إغلاق القائمة",
		switchTo: "EN",
	},
	hero: {
		title: "اعثر على محترفي خدمات موثوقين بالقرب منك",
		subtitle:
			"صِف طلبك، واستقبل عروضًا من محترفين مهرة، واختر الأفضل لاحتياجاتك.",
		searchPrompt: "ما الخدمة التي تحتاجها اليوم؟",
		searchPlaceholder: "ابحث عن خدمة أو منطقة",
		search: "بحث",
		badgeTrusted: "عمال موثوقون",
		badgeOffers: "عروض حقيقية",
		becomeWorker: "سجّل كعامل",
		imageAlt: "محترف موثوق من شاكوشي أثناء العمل",
	},
	howItWorks: {
		headingPrefix: "كيف يعمل ",
		brand: "شاكوشي",
		headingSuffix: "",
		subtitle:
			"تربط شاكوشي العملاء بعمال محليين موثوقين بطريقة بسيطة وسريعة وشفافة.",
		steps: [
			{
				title: "١. انشر طلبك",
				description:
					"أخبرنا بما تحتاجه، وصِف طلب الخدمة، وأضف موقعك، وقدّم أي تفاصيل تساعد العمال على فهم المهمة.",
			},
			{
				title: "٢. استقبل عروضًا حقيقية",
				description:
					"يرسل لك المحترفون الموثوقون القريبون عروضًا حقيقية بأسعارهم، لتقارن بين الخيارات خلال دقائق.",
			},
			{
				title: "٣. اختر أفضل عامل",
				description:
					"اطّلع على الملفات والتقييمات وآراء العملاء الحقيقية، ثم اختر المحترف الذي تثق به بالسعر الذي يناسبك.",
			},
			{
				title: "٤. أنجز المهمة",
				description:
					"تابع وتواصل. تحدّث مع العامل، وتابع تقدم العمل، وأكمل الخدمة بثقة.",
			},
		],
	},
	whyChoose: {
		headingPrefix: "لماذا تختار ",
		brand: "شاكوشي",
		headingSuffix: "؟",
		cards: [
			{
				title: "محترفون موثوقون",
				description:
					"تتم مراجعة جميع المحترفين والتحقق منهم قبل الانضمام إلى المنصة.",
			},
			{
				title: "أسعار شفافة",
				description: "قارن بين عدة عروض واختر ما يناسب ميزانيتك.",
			},
			{
				title: "أوقات استجابة سريعة",
				description: "استقبل العروض والردود خلال دقائق.",
			},
			{
				title: "تواصل آمن",
				description: "تحدّث بأمان مع المحترفين عبر المنصة.",
			},
			{
				title: "تقييمات حقيقية من العملاء",
				description: "اتخذ قرارات مدروسة بناءً على تجارب حقيقية للعملاء.",
			},
			{
				title: "متوفر في كل مكان",
				description: "اعثر على محترفين موثوقين في مدينتك والمناطق القريبة.",
			},
		],
	},
	getJobDone: {
		tabs: {
			customers: {
				label: "للعملاء",
				headingPrefix: "أنجز مهمتك ",
				headingHighlight: "بكل ثقة",
				cta: "اطلب خدمة",
				benefits: [
					"انشر طلبك مجانًا.",
					"استقبل عدة عروض.",
					"قارن بين المحترفين والأسعار.",
					"تابع طلبك بسهولة.",
				],
			},
			workers: {
				label: "للعمال",
				headingPrefix: "نمِّ أعمالك ",
				headingHighlight: "بكل ثقة",
				cta: "انضم كعامل",
				benefits: [
					"استقبل فرص عمل بالقرب منك.",
					"أرسل عروضك وحدّد سعرك.",
					"ابنِ سمعتك من خلال التقييمات.",
					"تابع أعمالك بسهولة.",
				],
			},
		},
	},
	services: {
		headingPrefix: "فئات ",
		headingHighlight: "خدماتنا",
		headingSuffix: "",
		subtitle: "تدعم شاكوشي مجموعة واسعة من الخدمات، منها:",
		items: [
			"السباكة",
			"الأعمال الكهربائية",
			"خدمات التكييف",
			"التنظيف",
			"النجارة",
			"الدهان",
			"الألمنيوم والزجاج",
			"النقل والترحيل",
			"الأرضيات والبلاط",
			"إصلاح الأسطح",
		],
	},
	popularTopics: {
		heading: "مواضيع شائعة",
		estimatedCost: "التكلفة التقديرية:",
		readMore: "اقرأ المزيد",
		articles: [
			{
				title: "كم تكلفة إصلاح السباكة؟",
				description:
					"تختلف تكاليف السباكة حسب المشكلة والقطع المطلوبة ومدى الإلحاح. تعرّف على ما يؤثر في سعر إصلاح التسريبات والحنفيات والمصارف والأنابيب.",
				estimate: "٢٠٠–١٢٠٠ ج.م",
				category: "السباكة",
				readTime: "قراءة ٤ دقائق",
			},
			{
				title: "ماذا تتوقع من زيارة صيانة التكييف؟",
				description:
					"من التنظيف الدوري إلى شحن الغاز والتركيب الكامل، إليك كيف تُحتسب أسعار التكييف وكيف تميّز العرض العادل قبل الحجز.",
				estimate: "١٥٠–٩٠٠ ج.م",
				category: "خدمات التكييف",
				readTime: "قراءة ٥ دقائق",
			},
			{
				title: "توظيف كهربائي: دليل سريع للتكلفة",
				description:
					"أعطال الأسلاك والمنافذ الجديدة وترقية اللوحات لكل منها سعره. افهم ما يحدد تكلفة الأعمال الكهربائية الآمنة.",
				estimate: "١٠٠–٨٠٠ ج.م",
				category: "الأعمال الكهربائية",
				readTime: "قراءة ٣ دقائق",
			},
		],
	},
	downloadApp: {
		headingPrefix: "كل ما تحتاجه في ",
		headingHighlight: "تطبيق واحد",
		subtitle: "متوفر لكل من العملاء والعمال",
		customerLabel: "تطبيق العميل",
		customerDescription: "انشر الطلبات، واستقبل العروض، ووظّف أفضل محترف.",
		workerLabel: "تطبيق العامل",
		workerDescription: "استقبل فرص العمل، وأرسل العروض، ونمِّ أعمالك.",
		download: "تحميل",
	},
	footer: {
		links: {
			howItWorks: "كيف يعمل",
			categories: "الفئات",
			professionals: "المحترفون",
			about: "من نحن",
			contact: "تواصل معنا",
		},
	},
};

export const dictionaries = { en, ar };

export type Locale = keyof typeof dictionaries;
export type { Dictionary };
