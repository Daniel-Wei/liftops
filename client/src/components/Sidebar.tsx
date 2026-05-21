import type { LucideIcon } from "lucide-react";

export type NavItem<PageKey extends string = string> = {
  key: PageKey;
  label: string;
  labelZh: string;
  icon: LucideIcon;
};

type SidebarProps<PageKey extends string = string> = {
  navItems: NavItem<PageKey>[];
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
};

export function Sidebar<PageKey extends string>({
  navItems,
  currentPage,
  onNavigate,
}: SidebarProps<PageKey>) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-800 bg-[#070b12] p-4 text-white lg:flex lg:flex-col">
      <button
        type="button"
        onClick={() => onNavigate(navItems[0].key)}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400 text-lg font-black text-slate-950">
            LO
          </span>
          <span>
            <span className="block text-xl font-black">LiftOps</span>
            <span className="text-xs text-slate-400">Training operations</span>
          </span>
        </div>
      </button>

      <nav className="mt-5 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.key === currentPage;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                active
                  ? "bg-white text-slate-950"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>
                <span className="block">{item.label}</span>
                <span className={active ? "text-xs text-slate-500" : "text-xs text-slate-500"}>
                  {item.labelZh}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-400">
        <p className="font-bold text-white">Phase 1</p>
        <p>Static UI with mock data only.</p>
        <p>仅静态 UI 与 mock 数据。</p>
      </div>
    </aside>
  );
}
