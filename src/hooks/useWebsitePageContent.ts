import { useEffect, useState } from "react";
import { loadWebsiteContent, type WebsitePageKey } from "../lib/website-content";
import { WEBSITE_CONTENT_CHANGED_EVENT } from "../lib/website-versions";

type PageContentFallback = {
  title: string;
  sub: string;
};

type PageContentState = PageContentFallback & {
  hasCustomTitle: boolean;
  hasCustomSub: boolean;
};

export function useWebsitePageContent(pageKey: WebsitePageKey, fallback: PageContentFallback) {
  const [content, setContent] = useState<PageContentState>({
    title: fallback.title,
    sub: fallback.sub,
    hasCustomTitle: false,
    hasCustomSub: false,
  });

  useEffect(() => {
    function apply() {
      try {
        if (typeof window === "undefined") return;
        const page = loadWebsiteContent()[pageKey];
        const cmsTitle = page.title.trim();
        const cmsSub = page.sections[0]?.body?.trim() ?? "";
        setContent({
          title: cmsTitle || fallback.title,
          sub: cmsSub || fallback.sub,
          hasCustomTitle: Boolean(cmsTitle),
          hasCustomSub: Boolean(cmsSub),
        });
      } catch {
        setContent({
          title: fallback.title,
          sub: fallback.sub,
          hasCustomTitle: false,
          hasCustomSub: false,
        });
      }
    }

    apply();
    window.addEventListener("storage", apply);
    window.addEventListener("focus", apply);
    window.addEventListener(WEBSITE_CONTENT_CHANGED_EVENT, apply);
    return () => {
      window.removeEventListener("storage", apply);
      window.removeEventListener("focus", apply);
      window.removeEventListener(WEBSITE_CONTENT_CHANGED_EVENT, apply);
    };
  }, [pageKey, fallback.title, fallback.sub]);

  return content;
}
