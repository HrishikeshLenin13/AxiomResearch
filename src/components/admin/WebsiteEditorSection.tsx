import { FormEvent, useEffect, useState } from "react";
import {
  loadWebsiteContent,
  updatePageContent,
  WEBSITE_PAGE_KEYS,
  type WebsitePageKey,
} from "../../lib/website-content";
import {
  saveWebsiteVersion,
  WEBSITE_CONTENT_CHANGED_EVENT,
} from "../../lib/website-versions";
import {
  blocksToSections,
  ContentBlockEditor,
  sectionsToBlocks,
  type ContentBlock,
} from "./WebsiteContentBlocks";
import {
  adminBlockCardClass,
  adminInputClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from "./constants";
import { AdminSectionPanel } from "./AdminSectionPanel";

const pageLabels: Record<WebsitePageKey, string> = {
  home: "Home",
  about: "About",
  programs: "Programs",
  course: "Course",
  volunteer: "Volunteer",
  careers: "Careers",
  research: "Research",
  faq: "FAQ",
  contact: "Contact",
};

export function WebsiteEditorSection() {
  const [selectedPage, setSelectedPage] = useState<WebsitePageKey>("home");
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [versionSavedLabel, setVersionSavedLabel] = useState<string | null>(null);

  function reloadPageContent() {
    const page = loadWebsiteContent()[selectedPage];
    setTitle(page.title);
    setBlocks(sectionsToBlocks(page.sections));
  }

  useEffect(() => {
    reloadPageContent();
    setSavedAt(null);
    setVersionSavedLabel(null);
  }, [selectedPage]);

  useEffect(() => {
    function handleContentChanged() {
      reloadPageContent();
      setSavedAt(null);
    }
    window.addEventListener(WEBSITE_CONTENT_CHANGED_EVENT, handleContentChanged);
    return () => window.removeEventListener(WEBSITE_CONTENT_CHANGED_EVENT, handleContentChanged);
  }, [selectedPage]);

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updated = {
      title: title.trim(),
      sections: blocksToSections(blocks),
    };
    updatePageContent(selectedPage, updated);
    setTitle(updated.title);
    setBlocks(sectionsToBlocks(updated.sections));
    setSavedAt(new Date().toLocaleTimeString());
    setVersionSavedLabel(null);
  }

  function handleSaveVersion() {
    const version = saveWebsiteVersion();
    setVersionSavedLabel(version.label);
    setSavedAt(null);
  }

  return (
    <AdminSectionPanel
      id="website-editor"
      title="Website Editor"
      description="Structured content blocks for each public page."
    >
      <form onSubmit={handleSave} className="space-y-6">
        <section className="rounded-xl border border-border bg-white/30 p-4">
          <label className="block text-xs font-medium uppercase tracking-wide text-muted-foreground" htmlFor="website-editor-page">
            Select page
          </label>
          <select
            id="website-editor-page"
            value={selectedPage}
            onChange={(event) => setSelectedPage(event.target.value as WebsitePageKey)}
            className={`${adminInputClass} mt-2`}
          >
            {WEBSITE_PAGE_KEYS.map((key) => (
              <option key={key} value={key}>
                {pageLabels[key]}
              </option>
            ))}
          </select>
        </section>

        <header className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">Currently editing</p>
          <h4 className="mt-1 text-lg font-semibold">{pageLabels[selectedPage]}</h4>
        </header>

        <section className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold">Page structure</h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Title and blocks below are saved to the existing CMS format.
            </p>
          </div>

          <article className={adminBlockCardClass}>
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                Title
              </span>
              <span className="text-xs text-muted-foreground">Hero headline on the public page</span>
            </div>
            <input
              id="website-editor-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Page title"
              className={adminInputClass}
            />
          </article>

          <ContentBlockEditor blocks={blocks} onBlocksChange={setBlocks} />
        </section>

        <footer className="rounded-xl border border-border bg-white/35 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">Publish changes</p>
              <p className="text-xs text-muted-foreground">
                Save updates the live CMS. Save Version creates a rollback snapshot.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="submit" className={adminPrimaryButtonClass}>
                Save content
              </button>
              <button type="button" onClick={handleSaveVersion} className={adminSecondaryButtonClass}>
                Save Version
              </button>
            </div>
          </div>
          {(savedAt || versionSavedLabel) && (
            <div className="mt-3 border-t border-border/70 pt-3 text-sm text-muted-foreground">
              {savedAt && <p>Content saved locally at {savedAt}.</p>}
              {versionSavedLabel && <p>{versionSavedLabel} saved to version history.</p>}
            </div>
          )}
        </footer>
      </form>
    </AdminSectionPanel>
  );
}
