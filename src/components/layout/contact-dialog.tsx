"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/language-provider";

const CONTACT_EMAIL = "noman@kaiizn.com";

export function ContactDialog() {
	const t = useT();
	const [copied, setCopied] = useState(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(CONTACT_EMAIL);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard unavailable (e.g. insecure context) — the mailto link
			// above remains the fallback.
		}
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger className="text-muted-foreground hover:text-foreground inline-flex min-h-11 cursor-pointer items-center text-base">
				{t.footer.links.contact}
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
				<Dialog.Popup className="font-poppins bg-background fixed start-1/2 top-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-2xl p-6 text-start shadow-xl transition-all duration-200 rtl:translate-x-1/2 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 sm:p-8">
					<Dialog.Close
						aria-label={t.contact.close}
						className="text-muted-foreground hover:bg-muted hover:text-foreground absolute end-4 top-4 flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors"
					>
						<svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
							<path
								d="M6 6l12 12M18 6L6 18"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</Dialog.Close>

					<Dialog.Title className="text-foreground text-2xl font-semibold">
						{t.contact.title}
					</Dialog.Title>
					<Dialog.Description className="text-muted-foreground text-base leading-7">
						{t.contact.message}
					</Dialog.Description>

					<a
						href={`mailto:${CONTACT_EMAIL}`}
						className="text-primary hover:text-primary/80 text-lg font-medium break-all underline-offset-4 hover:underline"
					>
						{CONTACT_EMAIL}
					</a>

					<Button
						type="button"
						onClick={copyEmail}
						className="h-auto w-full rounded-lg py-3"
					>
						<span aria-live="polite">{copied ? t.contact.copied : t.contact.copyEmail}</span>
					</Button>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
