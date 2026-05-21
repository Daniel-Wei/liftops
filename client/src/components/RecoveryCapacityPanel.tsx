import { BatteryMedium } from "lucide-react";
import type { CapacitySummary } from "../types/operations";
import { EvidenceNote } from "./EvidenceNote";
import { StatusBadge } from "./StatusBadge";

type RecoveryCapacityPanelProps = {
  capacity: CapacitySummary;
};

export function RecoveryCapacityPanel({ capacity }: RecoveryCapacityPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Capacity</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">Recovery Capacity Proxy / 恢复容量 Proxy</h2>
        </div>
        <StatusBadge status={capacity.status} label={capacity.status} labelZh="状态" />
      </div>

      <div className="mt-6 flex items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-950 text-emerald-300">
          <BatteryMedium size={34} />
        </div>
        <div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-slate-950">{capacity.recoveryCapacityProxy}</span>
            <span className="pb-2 text-sm font-bold text-slate-500">/100 proxy</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">Capacity gap: {capacity.capacityGap} points / 容量缺口</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Planned load index</p>
          <p className="mt-1 text-2xl font-black text-slate-950">{capacity.plannedLoadIndex}</p>
        </div>
        <div className="rounded-xl bg-amber-50 p-3">
          <p className="text-amber-700">Capacity gap</p>
          <p className="mt-1 text-2xl font-black text-amber-800">{capacity.capacityGap}</p>
        </div>
      </div>

      <div className="mt-4">
        <EvidenceNote type="proxy" childrenZh="这是基于 wellness 自评的训练容量 proxy，不是医学诊断或精确生理测量。">
          This is a wellness-based training capacity proxy, not a diagnosis or exact physiological measurement.
        </EvidenceNote>
      </div>
    </section>
  );
}
