import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  titleZh?: string;
  eyebrow?: string;
  className?: string;
  children: ReactNode;
};

export function SectionCard({ title, titleZh, eyebrow, className, children }: SectionCardProps) {
  return (
    <section className={["section-card", className].filter(Boolean).join(" ")}>
      <div className="section-header">
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
        <h2 className="section-title">{title}</h2>
        {titleZh ? <p className="section-title-zh">{titleZh}</p> : null}
      </div>
      {children}
    </section>
  );
}
