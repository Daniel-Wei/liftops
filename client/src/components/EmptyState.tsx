import type { ReactNode } from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
};

export function EmptyState({ icon, title, titleZh, description, descriptionZh }: EmptyStateProps) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center">
      {icon ? (
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg font-black text-slate-950">{title}</h3>
      <p className="text-sm text-slate-500">{titleZh}</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">{descriptionZh}</p>
    </section>
  );
}
