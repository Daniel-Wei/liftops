import { BookOpenCheck } from "lucide-react";
import type { EvidenceType } from "../types/operations";
import { StatusBadge } from "./StatusBadge";

type EvidenceNoteProps = {
  type: EvidenceType;
  title?: string;
  titleZh?: string;
  children: string;
  childrenZh: string;
};

export function EvidenceNote({
  type,
  title = "Evidence note",
  titleZh = "证据说明",
  children,
  childrenZh,
}: EvidenceNoteProps) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
          <BookOpenCheck size={17} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold text-slate-950">{title}</p>
            <StatusBadge evidenceType={type} label={type} labelZh="标签" />
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{children}</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">{childrenZh}</p>
        </div>
      </div>
    </aside>
  );
}
