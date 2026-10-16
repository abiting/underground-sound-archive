import type { ReactNode } from "react";

function renderInlineLinks(text: string): ReactNode {
  const pattern = /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    const [markdown, label, href] = match;
    nodes.push(<a key={`${match.index}-${href}`} href={href} target="_blank" rel="noopener noreferrer">{label}</a>);
    cursor = match.index + markdown.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes.length ? nodes : text;
}

export default function EditorialBody({ content }: { content: string }) {
  return (
    <div className="editorial-body">
      {content.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 12)}`}>{renderInlineLinks(paragraph)}</p>
      ))}
    </div>
  );
}
