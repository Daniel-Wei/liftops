import { Search } from "lucide-react";
import type { NavItem } from "./Sidebar";

type TopBarProps<PageKey extends string = string> = {
  navItems: NavItem<PageKey>[];
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
};

export function TopBar<PageKey extends string>({
  navItems,
  currentPage,
  onNavigate,
}: TopBarProps<PageKey>) {
  const active = navItems.find((item) => item.key === currentPage) ?? navItems[0];

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:ml-72 lg:px-7">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-slate-500">LiftOps</p>
            <h1 className="truncate text-base font-black text-slate-950">{active.label}</h1>
          </div>
          <div className="hidden min-w-64 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex">
            <Search size={16} />
            <span>Search metrics, risks, phases</span>
          </div>
          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
            {active.labelZh}
          </span>
        </div>
      </header>

      <nav className="fixed inset-x-3 bottom-3 z-30 flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl shadow-slate-300/70 backdrop-blur lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === currentPage;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              title={`${item.label} / ${item.labelZh}`}
              className={`flex min-h-14 min-w-[4.75rem] flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold transition ${
                isActive ? "bg-slate-950 text-white" : "text-slate-500"
              }`}
            >
              <Icon size={18} />
              <span className="max-w-full truncate px-1">{item.labelZh}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
