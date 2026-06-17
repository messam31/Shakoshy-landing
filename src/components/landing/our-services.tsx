"use client";

import Image from "next/image";

import { Highlighter } from "@/components/ui/highlighter";
import { useT } from "@/lib/i18n/language-provider";

const serviceImages = [
  "/service-plumbing.webp",
  "/service-electrical.webp",
  "/service-ac.webp",
  "/service-cleaning.webp",
  "/service-carpentry.webp",
  "/service-painting.webp",
  "/service-aluminum-glass.webp",
  "/service-moving.webp",
  "/service-flooring.webp",
  "/service-roof.webp",
];

function ServiceCard({ label, src }: { label: string; src: string }) {
  return (
    <div className="flex flex-1 justify-center lg:basis-0">
      <div className="border-card-border flex w-full max-w-52 flex-col items-center gap-1 rounded-2xl border border-dashed bg-white py-4 md:max-w-none lg:px-6 lg:py-6">
        <div className="relative h-28 w-full">
          <Image src={src} alt={label} fill sizes="(max-width: 1440px) 20vw, 220px" className="object-contain" />
        </div>
        <span className="font-poppins text-foreground text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}

export function OurServices() {
  const t = useT();
  const services = t.services.items.map((label, i) => ({
    label,
    src: serviceImages[i],
  }));
  const row1 = services.slice(0, 5);
  const row2 = services.slice(5);
  return (
    <section id="categories" className="bg-surface-cream scroll-mt-nav py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-poppins text-2xl font-semibold tracking-tight xl:text-h2">
            {t.services.headingPrefix}
            <Highlighter
              action="underline"
              color="#F07C0D"
              padding={6}
              animationDuration={1500}
              isView
            >
              <span className="text-primary">{t.services.headingHighlight}</span>
            </Highlighter>
            {t.services.headingSuffix}
          </h2>
          <p className="font-poppins mt-4 font-normal text-foreground">
            {t.services.subtitle}
          </p>
        </div>

        {/* Mobile: one flat 2-column flow (group wrappers collapse via display:contents).
            lg+: two rows of 5, first row shifted 52px to the right. */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:flex lg:flex-col">
          {/* Row 1 — shifted on desktop */}
          <div className="contents lg:ms-13 lg:flex lg:flex-nowrap lg:gap-6">
            {row1.map((item) => (
              <ServiceCard key={item.label} {...item} />
            ))}
          </div>
          {/* Row 2 */}
          <div className="contents lg:flex lg:flex-nowrap lg:gap-6">
            {row2.map((item) => (
              <ServiceCard key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
