import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export function PortfolioHeader() {
  const { portfolioPage } = site;

  return (
    <PageHero
      eyebrow={portfolioPage.eyebrow}
      title={portfolioPage.headline}
      body={portfolioPage.body}
    />
  );
}
