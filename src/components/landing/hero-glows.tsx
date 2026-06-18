"use client";

import { motion } from "motion/react";

/** Continuous, subtle "breathing" drift on the hero's decorative lamp glows.
 *  Each glow runs a different cycle so they never move in lockstep. Under
 *  prefers-reduced-motion the global MotionConfig disables these transform
 *  animations, so the glows render static (matching the previous design).
 *
 *  The center glow keeps its Tailwind `-translate-x-1/2` centering: in
 *  Tailwind v4 that compiles to the CSS `translate` property, which composes
 *  with motion's `transform`, so we only animate y/scale on it (never x). */
export function HeroGlows() {
	return (
		<>
			{/* Lamp: far top-left corner */}
			<motion.div
				aria-hidden
				className="bg-brand/30 pointer-events-none absolute top-0 -start-glow-edge size-glow rounded-full blur-glow xl:top-glow-top"
				animate={{ x: [0, 24, 0], y: [0, 16, 0], scale: [1, 1.06, 1] }}
				transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
			/>
			{/* Lamp: far top-right corner */}
			<motion.div
				aria-hidden
				className="bg-brand/30 pointer-events-none absolute top-0 -end-glow-edge size-glow rounded-full blur-glow xl:top-glow-top"
				animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 1.05, 1] }}
				transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
			/>
			{/* Lamp: center glow (only y/scale — x would fight the centering) */}
			<motion.div
				aria-hidden
				className="bg-brand/20 pointer-events-none absolute top-0 start-1/2 size-glow -translate-x-1/2 rounded-full blur-glow xl:top-glow-top-mid"
				animate={{ y: [0, 24, 0], scale: [1, 1.08, 1] }}
				transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
			/>
		</>
	);
}
