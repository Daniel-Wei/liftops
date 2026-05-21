import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  titleZh?: string;
  eyebrow?: string;
  children: ReactNode;
};

export function SectionCard({ title, titleZh, eyebrow, children }: SectionCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {eyebrow ? <p className="text-xs font-black uppercase tracking-wide text-slate-500">{eyebrow}</p> : null}
      <div className="mb-4">
        <h2 className="text-xl font-black text-slate-950">{title}</h2>
        {titleZh ? <p className="mt-1 text-sm text-slate-500">{titleZh}</p> : null}
      </div>
      {children}
    </section>
  );
}
