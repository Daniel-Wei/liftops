import type { ReactNode } from "react";
import type { EvidenceType } from "../types/appTypes";

type EvidenceNoteProps = {
  title: string;
  evidenceType: EvidenceType;
  children: ReactNode;
};

export function EvidenceNote({ title, evidenceType, children }: EvidenceNoteProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-950 px-2.5 py-1 text-xs font-black uppercase text-white">
          {evidenceType}
        </span>
        <p className="text-sm font-black text-slate-950">{title}</p>
      </div>
      <div className="mt-3 text-sm leading-6 text-slate-600">{children}</div>
    </div>
  );
}
