export default function SectionHeading({ eyebrow, title, copy, dark = false }: { eyebrow: string; title: string; copy: string; dark?: boolean }) {
  return <div className={`section-heading ${dark ? "dark" : ""}`}><div><p className="eyebrow">{eyebrow}</p><h2 className="h2 section-title">{title}</h2></div><p className="section-copy">{copy}</p></div>;
}
