import type { ReactNode } from "react";
import type { WebsitePageKey } from "../lib/website-content";
import { useWebsitePageContent } from "../hooks/useWebsitePageContent";
import { PageHero } from "./PageShell";

type CmsPageHeroProps = {
  pageKey: WebsitePageKey;
  eyebrow: string;
  fallbackTitle: ReactNode;
  fallbackTitleText: string;
  fallbackSub: string;
};

export function CmsPageHero({
  pageKey,
  eyebrow,
  fallbackTitle,
  fallbackTitleText,
  fallbackSub,
}: CmsPageHeroProps) {
  const cms = useWebsitePageContent(pageKey, {
    title: fallbackTitleText,
    sub: fallbackSub,
  });

  return (
    <PageHero
      eyebrow={eyebrow}
      title={cms.hasCustomTitle ? cms.title : fallbackTitle}
      sub={cms.sub}
    />
  );
}
