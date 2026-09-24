import type { Metadata } from "next";
import { FeaturedProjects } from "@/components/portfolio/FeaturedProjects";
import { PortfolioBrowse } from "@/components/portfolio/PortfolioBrowse";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import ConsultationSection from "@/components/ConsultationEncourageSection";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHeader />
      <FeaturedProjects />
      <PortfolioBrowse />
      <ConsultationSection />
    </>
  );
}
