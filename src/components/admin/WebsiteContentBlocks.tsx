import type { WebsiteContentSection } from "../../lib/website-content";
import { adminBlockCardClass, adminGhostButtonClass, adminInputClass } from "./constants";

export type ContentBlockType = "heading" | "paragraph";

export type ContentBlock = {
  id: string;
  type: ContentBlockType;
  text: string;
};

const blockTypeLabels: Record<ContentBlockType, string> = {
  heading: "Heading",
  paragraph: "Paragraph",
};

const blockTypeHints: Record<ContentBlockType, string> = {
  heading: "Section heading shown in structured page areas.",
  paragraph: "Body copy. The first paragraph maps to the page hero subtitle.",
};

export function sectionsToBlocks(sections: WebsiteContentSection[]): ContentBlock[] {
  if (!sections.length) {
    return [{ id: crypto.randomUUID(), type: "paragraph", text: "" }];
  }

  return sections.map((section) => {
    if (section.heading.trim()) {
      return { id: crypto.randomUUID(), type: "heading", text: section.heading };
    }
    return { id: crypto.randomUUID(), type: "paragraph", text: section.body };
  });
}

export function blocksToSections(blocks: ContentBlock[]): WebsiteContentSection[] {
  const sections = blocks.map((block) =>
    block.type === "heading"
      ? { heading: block.text.trim(), body: "" }
      : { heading: "", body: block.text.trim() },
  );

  return sections.length > 0 ? sections : [{ heading: "", body: "" }];
}

type ContentBlockEditorProps = {
  blocks: ContentBlock[];
  onBlocksChange: (blocks: ContentBlock[]) => void;
};

export function ContentBlockEditor({ blocks, onBlocksChange }: ContentBlockEditorProps) {
  function updateBlock(id: string, text: string) {
    onBlocksChange(blocks.map((block) => (block.id === id ? { ...block, text } : block)));
  }

  function removeBlock(id: string) {
    if (blocks.length <= 1) return;
    onBlocksChange(blocks.filter((block) => block.id !== id));
  }

  function addBlock(type: ContentBlockType) {
    onBlocksChange([...blocks, { id: crypto.randomUUID(), type, text: "" }]);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
        <div>
          <h4 className="text-sm font-semibold">Content blocks</h4>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Build the page with headings and paragraphs. Order is preserved on save.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => addBlock("heading")} className={adminGhostButtonClass}>
            + Heading
          </button>
          <button type="button" onClick={() => addBlock("paragraph")} className={adminGhostButtonClass}>
            + Paragraph
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {blocks.map((block, index) => (
          <article key={block.id} className={adminBlockCardClass}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {blockTypeLabels[block.type]}
                  </span>
                  <span className="text-xs text-muted-foreground">Block {index + 1}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{blockTypeHints[block.type]}</p>
              </div>
              {blocks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition"
                >
                  Remove
                </button>
              )}
            </div>

            {block.type === "heading" ? (
              <input
                value={block.text}
                onChange={(event) => updateBlock(block.id, event.target.value)}
                placeholder="Enter heading text"
                className={adminInputClass}
              />
            ) : (
              <textarea
                value={block.text}
                onChange={(event) => updateBlock(block.id, event.target.value)}
                placeholder="Enter paragraph text"
                rows={4}
                className={`${adminInputClass} min-h-28 resize-y`}
              />
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
