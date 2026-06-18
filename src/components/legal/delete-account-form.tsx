"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { DeleteAccountContent } from "@/lib/legal/content";

// Egyptian mobile numbers: 11 digits — leading 0, then 1, then a valid
// operator prefix (0,1,2,5) and 8 more digits (e.g. 01012345678).
const EG_MOBILE = /^01[0125]\d{8}$/;

export function DeleteAccountForm({ t }: { t: DeleteAccountContent }) {
	const [phone, setPhone] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [done, setDone] = useState(false);

	if (done) {
		return (
			<div
				role="status"
				className="border-border bg-surface-cream rounded-2xl border p-6"
			>
				<h2 className="text-foreground text-lg font-semibold">
					{t.successTitle}
				</h2>
				<p className="text-muted-foreground mt-2 leading-7">
					{t.successMessage}
				</p>
			</div>
		);
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!phone) {
			setError(t.errorRequired);
			return;
		}
		if (!EG_MOBILE.test(phone)) {
			setError(t.errorInvalid);
			return;
		}
		if (!confirmed) {
			setError(t.errorConfirm);
			return;
		}
		// Fake delete: no API call yet — just confirm the request was received.
		setError(null);
		setDone(true);
	}

	return (
		<form onSubmit={onSubmit} noValidate className="space-y-5">
			<div>
				<label
					htmlFor="delete-phone"
					className="text-foreground mb-1.5 block text-sm font-medium"
				>
					{t.phoneLabel}
				</label>
				<input
					id="delete-phone"
					type="tel"
					inputMode="numeric"
					autoComplete="tel"
					dir="ltr"
					maxLength={11}
					value={phone}
					// Keep digits only and cap at 11 — Egyptian mobile length.
					onChange={(e) =>
						setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
					}
					placeholder={t.phonePlaceholder}
					aria-invalid={error ? true : undefined}
					className="border-border bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-lg border px-3 text-base outline-none focus-visible:ring-3"
				/>
			</div>

			<label className="flex items-start gap-2.5 text-sm">
				<input
					type="checkbox"
					checked={confirmed}
					onChange={(e) => setConfirmed(e.target.checked)}
					className="accent-primary mt-0.5 size-4 shrink-0"
				/>
				<span className="text-muted-foreground leading-6">
					{t.confirmLabel}
				</span>
			</label>

			{error ? (
				<p role="alert" className="text-destructive text-sm">
					{error}
				</p>
			) : null}

			<Button
				type="submit"
				variant="destructive"
				size="lg"
				className="h-11 px-6 text-base"
			>
				{t.submit}
			</Button>
		</form>
	);
}
