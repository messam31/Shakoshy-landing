export type AppKind = "customer" | "worker";
export type MobilePlatform = "ios" | "android";

// TODO: replace the iOS links once the App Store listings are live.
export const storeLinks: Record<AppKind, Record<MobilePlatform, string>> = {
  customer: {
    ios: "#",
    android:
      "https://play.google.com/store/apps/details?id=com.shakoshy.app",
  },
  worker: {
    ios: "#",
    android:
      "https://play.google.com/store/apps/details?id=com.shakoshy.worker",
  },
};

/** Detect the visitor's mobile platform from the user agent. */
export function detectMobilePlatform(): MobilePlatform | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    return "ios";
  }
  return null;
}

/**
 * Send the visitor to the right store for their device. Used by single
 * ambiguous CTAs (e.g. "Join as Worker"/"Join as Customer"). Desktop and
 * unknown platforms do nothing.
 */
export function openAppStore(app: AppKind) {
  const platform = detectMobilePlatform();
  if (!platform) return;
  window.open(storeLinks[app][platform], "_blank", "noopener,noreferrer");
}
