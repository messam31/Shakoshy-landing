import type { Locale } from "@/lib/i18n/dictionaries";

export type LegalBlock =
	| { p: string }
	| { ul: string[] }
	| { deleteLink: string };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type PrivacyContent = {
	backToHome: string;
	title: string;
	lastUpdatedLabel: string;
	lastUpdated: string;
	intro: string;
	sections: LegalSection[];
};

export type DeleteAccountContent = {
	backToHome: string;
	title: string;
	intro: string;
	whatHeading: string;
	whatItems: string[];
	phoneLabel: string;
	phonePlaceholder: string;
	confirmLabel: string;
	submit: string;
	errorRequired: string;
	errorInvalid: string;
	errorConfirm: string;
	successTitle: string;
	successMessage: string;
};

const privacyEn: PrivacyContent = {
	backToHome: "Back to Home",
	title: "Privacy Policy",
	lastUpdatedLabel: "Last updated ·",
	lastUpdated: "June 6, 2026",
	intro:
		"How the Shakoshy mobile app handles your data, and the rights you have over it. If anything is unclear, email support@shakoshy.com.",
	sections: [
		{
			heading: "1. Who we are",
			blocks: [
				{
					p: 'The Shakoshy mobile app ("Shakoshy", "we", "us") is operated by **Muadh Ali Hassan Al-Eryani**, a sole proprietorship registered in the Arab Republic of Egypt. This policy explains what data the app collects, how we use it, and the rights you have. By using Shakoshy you accept this policy.',
				},
			],
		},
		{
			heading: "2. Data we collect",
			blocks: [
				{
					ul: [
						"**Account info:** name, email address, phone number, user account ID",
						"**Address:** street, city, postal code, country",
						"**Location:** approximate and precise location when you grant permission, used to show nearby workers and display maps",
						"**Photos:** profile photo and any photos you attach to a job request",
						"**Device identifiers:** Firebase Cloud Messaging (FCM) token for push notifications",
					],
				},
				{
					p: "We **do not** collect payment information, contacts, calendar, browsing history, audio, health, or message content.",
				},
			],
		},
		{
			heading: "3. How we use your data",
			blocks: [
				{
					ul: [
						"Create and manage your account",
						"Send transactional emails (confirmations, service updates)",
						"Deliver service requests to nearby workers and match you with offers",
						"Show photos to workers as part of your job request",
						"Send push notifications about offers, messages, and job status",
						"Prevent fraud and abuse",
					],
				},
				{
					p: "We do not use your data for advertising, profiling, or sale to third parties.",
				},
			],
		},
		{
			heading: "4. Service providers",
			blocks: [
				{
					p: "We rely on the following service providers, who process limited data on our behalf:",
				},
				{
					ul: [
						"**Google Firebase Cloud Messaging** — push notifications",
						"**Google Maps Platform** — map display and geocoding",
						"**Cloud hosting provider** — backend infrastructure",
					],
				},
			],
		},
		{
			heading: "5. Data sharing",
			blocks: [
				{
					p: "We do not sell, rent, or share your personal data with third parties for their own marketing. When you post a job request, nearby workers see only what is needed to respond (description, general area, photos). Your full address is shared only after you accept a worker's offer.",
				},
			],
		},
		{
			heading: "6. Data retention & deletion",
			blocks: [
				{
					p: "We keep your data while your account is active. You can request deletion at any time:",
				},
				{ deleteLink: "Request account deletion" },
				{
					ul: [
						"Profile, addresses, job requests, uploaded photos, and FCM token are deleted within **30 days**",
						"Anonymized records (with no identifying information) may be retained up to **12 months** for fraud prevention and legal compliance",
						"Backups are purged within **90 days** of deletion",
					],
				},
			],
		},
		{
			heading: "7. Your rights",
			blocks: [
				{
					p: "Under Egyptian Personal Data Protection Law No. 151 of 2020, you have the right to:",
				},
				{
					ul: [
						"Access your personal data and request a copy",
						"Correct inaccurate data",
						"Delete your data",
						"Withdraw consent for any optional processing",
						"Lodge a complaint with the Personal Data Protection Center",
					],
				},
				{ p: "To exercise these rights, email support@shakoshy.com." },
			],
		},
		{
			heading: "8. Security",
			blocks: [
				{
					p: "We protect your data with industry-standard measures: all traffic between the app and our servers is encrypted with TLS (HTTPS); passwords and authentication tokens are stored in the platform's secure storage (Keychain on iOS, EncryptedSharedPreferences on Android); backend access follows least-privilege controls. If we ever detect a breach that affects your data, we will notify you without undue delay.",
				},
			],
		},
		{
			heading: "9. Children's privacy",
			blocks: [
				{
					p: "Shakoshy is not directed at children under 16, and we do not knowingly collect data from anyone under that age. If you believe we have, email support@shakoshy.com and we will delete it.",
				},
			],
		},
		{
			heading: "10. International data transfers",
			blocks: [
				{
					p: "Our backend infrastructure is hosted in Europe. Some data may also be processed by Google in regions covered by their standard terms. We rely on standard contractual clauses to keep data protected when it leaves Egypt.",
				},
			],
		},
		{
			heading: "11. Changes to this policy",
			blocks: [
				{
					p: 'We may update this policy. The "Last updated" date at the top of the page reflects the most recent change. For material changes we will notify you in the app.',
				},
			],
		},
		{
			heading: "12. Contact",
			blocks: [
				{
					p: '**Data controller:**\nMuadh Ali Hassan Al-Eryani\nTrading as "Shakoshy"\nRegistered in: Egypt\nEmail: support@shakoshy.com',
				},
			],
		},
	],
};

const privacyAr: PrivacyContent = {
	backToHome: "العودة إلى الرئيسية",
	title: "سياسة الخصوصية",
	lastUpdatedLabel: "آخر تحديث ·",
	lastUpdated: "٦ يونيو ٢٠٢٦",
	intro:
		"كيف يتعامل تطبيق شاكوشي مع بياناتك، وما هي حقوقك المتعلقة بها. إذا كان أي شيء غير واضح، راسلنا على support@shakoshy.com.",
	sections: [
		{
			heading: "١. من نحن",
			blocks: [
				{
					p: 'تطبيق شاكوشي ("شاكوشي"، "نحن") يديره **مُعاذ علي حسن الإرياني**، منشأة فردية مسجلة في جمهورية مصر العربية. توضح هذه السياسة البيانات التي يجمعها التطبيق وكيف نستخدمها وحقوقك المتعلقة بها. باستخدامك التطبيق فإنك توافق على هذه السياسة.',
				},
			],
		},
		{
			heading: "٢. البيانات التي نجمعها",
			blocks: [
				{
					ul: [
						"**معلومات الحساب:** الاسم، البريد الإلكتروني، رقم الهاتف، معرف المستخدم",
						"**العنوان:** الشارع، المدينة، الرمز البريدي، الدولة",
						"**الموقع:** الموقع التقريبي والدقيق عند منح الإذن، لعرض العمال القريبين والخرائط",
						"**الصور:** صورة الملف الشخصي وأي صور تُرفقها بطلب العمل",
						"**معرفات الجهاز:** رمز Firebase Cloud Messaging (FCM) لإشعارات الدفع",
					],
				},
				{
					p: "نحن **لا نجمع** معلومات الدفع، أو جهات الاتصال، أو التقويم، أو سجل التصفح، أو الصوت، أو بيانات الصحة، أو محتوى الرسائل.",
				},
			],
		},
		{
			heading: "٣. كيف نستخدم بياناتك",
			blocks: [
				{
					ul: [
						"إنشاء حسابك وإدارته",
						"إرسال رسائل بريد إلكتروني خاصة بالحساب (تأكيدات، تحديثات الخدمة)",
						"إيصال طلبات الخدمة للعمال القريبين ومطابقتك مع العروض",
						"عرض الصور للعمال كجزء من طلب العمل",
						"إرسال إشعارات الدفع عن العروض والرسائل وحالة الطلب",
						"منع الاحتيال وإساءة الاستخدام",
					],
				},
				{
					p: "لا نستخدم بياناتك للإعلان أو التنميط أو البيع لأطراف ثالثة.",
				},
			],
		},
		{
			heading: "٤. مقدمو الخدمة",
			blocks: [
				{
					p: "نعتمد على مقدمي الخدمة التاليين، الذين يعالجون بيانات محدودة نيابةً عنا:",
				},
				{
					ul: [
						"**Google Firebase Cloud Messaging** — إشعارات الدفع",
						"**Google Maps Platform** — عرض الخرائط وتحديد المواقع",
						"**مزود استضافة سحابية** — البنية التحتية الخلفية",
					],
				},
			],
		},
		{
			heading: "٥. مشاركة البيانات",
			blocks: [
				{
					p: "نحن لا نبيع أو نؤجر أو نشارك بياناتك الشخصية مع أطراف ثالثة لأغراضهم التسويقية. عند نشر طلب عمل، يرى العمال القريبون فقط ما يلزم للرد (الوصف، المنطقة العامة، الصور). لا يتم مشاركة عنوانك الكامل إلا بعد قبولك لعرض أحد العمال.",
				},
			],
		},
		{
			heading: "٦. الاحتفاظ بالبيانات وحذفها",
			blocks: [
				{
					p: "نحتفظ ببياناتك طالما أن حسابك نشط. يمكنك طلب الحذف في أي وقت عبر:",
				},
				{ deleteLink: "طلب حذف الحساب" },
				{
					ul: [
						"يتم حذف الملف الشخصي والعناوين وطلبات العمل والصور المرفوعة ورمز FCM خلال **30 يومًا**",
						"قد نحتفظ بسجلات مجهولة الهوية (دون أي معلومات تعريفية) لمدة تصل إلى **12 شهرًا** لمنع الاحتيال والامتثال القانوني",
						"يتم حذف النسخ الاحتياطية خلال **90 يومًا** من الحذف",
					],
				},
			],
		},
		{
			heading: "٧. حقوقك",
			blocks: [
				{
					p: "بموجب قانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020، لديك الحق في:",
				},
				{
					ul: [
						"الوصول إلى بياناتك الشخصية وطلب نسخة منها",
						"تصحيح البيانات غير الدقيقة",
						"حذف بياناتك",
						"سحب موافقتك على أي معالجة اختيارية",
						"تقديم شكوى لمركز حماية البيانات الشخصية",
					],
				},
				{
					p: "لممارسة هذه الحقوق، تواصل عبر support@shakoshy.com.",
				},
			],
		},
		{
			heading: "٨. الأمان",
			blocks: [
				{
					p: "نحمي بياناتك بإجراءات معيارية في الصناعة: جميع حركة المرور بين التطبيق وخوادمنا مشفّرة باستخدام TLS (HTTPS)؛ كلمات المرور ورموز المصادقة مخزّنة في التخزين الآمن للنظام (Keychain على iOS و EncryptedSharedPreferences على Android)؛ الوصول للنظام الخلفي يتبع مبدأ أقل الامتيازات. في حال اكتشاف اختراق يؤثر على بياناتك، سنخطرك دون تأخير غير مبرر.",
				},
			],
		},
		{
			heading: "٩. خصوصية الأطفال",
			blocks: [
				{
					p: "شاكوشي ليس موجّهًا للأطفال دون 16 عامًا، ولا نجمع بيانات عن قصد من أي شخص دون هذا السن. إذا كنت تعتقد أننا فعلنا ذلك، راسلنا على support@shakoshy.com وسنحذفها.",
				},
			],
		},
		{
			heading: "١٠. نقل البيانات دوليًا",
			blocks: [
				{
					p: "بنيتنا التحتية الخلفية مستضافة في أوروبا. قد تعالج Google بعض البيانات في مناطق مشمولة بشروطها القياسية. نعتمد على البنود التعاقدية القياسية لحماية البيانات عند مغادرتها مصر.",
				},
			],
		},
		{
			heading: "١١. التغييرات على هذه السياسة",
			blocks: [
				{
					p: 'قد نُحدّث هذه السياسة. يعكس تاريخ "آخر تحديث" في أعلى الصفحة آخر تغيير. في حال إجراء تغييرات جوهرية سنخطرك داخل التطبيق.',
				},
			],
		},
		{
			heading: "١٢. التواصل",
			blocks: [
				{
					p: '**المسؤول عن البيانات:**\nمُعاذ علي حسن الإرياني\nيعمل تحت اسم "شاكوشي"\nمسجل في: مصر\nالبريد: support@shakoshy.com',
				},
			],
		},
	],
};

const deleteAccountEn: DeleteAccountContent = {
	backToHome: "Back to Home",
	title: "Delete your account",
	intro:
		"Request deletion of your Shakoshy account and the data linked to it. Enter the phone number registered on your account and confirm — we'll process the request.",
	whatHeading: "What gets deleted",
	whatItems: [
		"Profile, addresses, job requests, uploaded photos, and FCM token are deleted within 30 days",
		"Anonymized records (with no identifying information) may be retained up to 12 months for fraud prevention and legal compliance",
		"Backups are purged within 90 days of deletion",
	],
	phoneLabel: "Phone number",
	phonePlaceholder: "01012345678",
	confirmLabel:
		"I understand this will permanently delete my account and data.",
	submit: "Request deletion",
	errorRequired: "Please enter your phone number.",
	errorInvalid: "Enter a valid Egyptian mobile number (e.g. 01012345678).",
	errorConfirm: "Please confirm you understand.",
	successTitle: "Request received",
	successMessage:
		"Your account deletion request has been received. Your data will be removed within 30 days. For anything urgent, email support@shakoshy.com.",
};

const deleteAccountAr: DeleteAccountContent = {
	backToHome: "العودة إلى الرئيسية",
	title: "حذف حسابك",
	intro:
		"اطلب حذف حساب شاكوشي والبيانات المرتبطة به. أدخل رقم الهاتف المسجّل في حسابك وأكّد، وسنعالج الطلب.",
	whatHeading: "ما الذي سيُحذف",
	whatItems: [
		"يتم حذف الملف الشخصي والعناوين وطلبات العمل والصور المرفوعة ورمز FCM خلال 30 يومًا",
		"قد نحتفظ بسجلات مجهولة الهوية (دون أي معلومات تعريفية) لمدة تصل إلى 12 شهرًا لمنع الاحتيال والامتثال القانوني",
		"يتم حذف النسخ الاحتياطية خلال 90 يومًا من الحذف",
	],
	phoneLabel: "رقم الهاتف",
	phonePlaceholder: "01012345678",
	confirmLabel: "أفهم أن هذا سيحذف حسابي وبياناتي نهائيًا.",
	submit: "طلب الحذف",
	errorRequired: "يرجى إدخال رقم هاتفك.",
	errorInvalid: "أدخل رقم هاتف مصري صحيح (مثل 01012345678).",
	errorConfirm: "يرجى تأكيد فهمك.",
	successTitle: "تم استلام الطلب",
	successMessage:
		"تم استلام طلب حذف حسابك. ستتم إزالة بياناتك خلال 30 يومًا. لأي أمر عاجل، راسلنا على support@shakoshy.com.",
};

export const privacy: Record<Locale, PrivacyContent> = {
	en: privacyEn,
	ar: privacyAr,
};

export const deleteAccount: Record<Locale, DeleteAccountContent> = {
	en: deleteAccountEn,
	ar: deleteAccountAr,
};
