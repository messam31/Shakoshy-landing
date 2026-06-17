import { DownloadApp } from "@/components/landing/download-app";
import { GetJobDone } from "@/components/landing/get-job-done";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { OurServices } from "@/components/landing/our-services";
import { PopularTopics } from "@/components/landing/popular-topics";
import { WhyChooseShakoshy } from "@/components/landing/why-choose-shakoshy";

export function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyChooseShakoshy />
      <GetJobDone />
      <OurServices />
      <PopularTopics />
      <DownloadApp />
    </>
  );
}
