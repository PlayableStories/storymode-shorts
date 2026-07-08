import ReactMarkdown from "react-markdown";

/**
 * Renders a game's description body. The content stays pure markdown/prose;
 * all styling is applied here in the component layer via the `.prose-body`
 * class (see app/globals.css), never in the content files.
 *
 * We do NOT enable rehype-raw, so any embedded HTML in content is ignored —
 * safe for public content, and it keeps content presentation-free.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-body">
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
