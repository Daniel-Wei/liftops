import type { ReactNode } from "react";
import type { NavItem, PageKey } from "../types/appTypes";

type AppShellProps = {
  navItems: NavItem[];
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  children: ReactNode;
};

export function AppShell({ navItems, currentPage, onNavigate, children }: AppShellProps) {
  if (currentPage === "landing") {
    return <>{children}</>;
  }

  const appNavItems = navItems.filter((item) => item.key !== "landing");
  const activeItem = navItems.find((item) => item.key === currentPage);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-800 bg-slate-950 p-5 text-white lg:block">
        <button
          type="button"
          onClick={() => onNavigate("landing")}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left"
        >
          <p className="text-2xl font-black">LiftOps</p>
          <p className="mt-1 text-xs text-slate-400">Training operations dashboard</p>
        </button>

        <nav className="mt-6 space-y-1">
          {appNavItems.map((item) => {
            const isActive = item.key === currentPage;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.key)}
                className={`w-full rounded-xl px-3 py-3 text-left text-sm font-bold transition ${
                  isActive ? "bg-white text-slate-950" : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="block">{item.label}</span>
                <span className="text-xs opacity-70">{item.labelZh}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
          <p className="font-black">Phase 1</p>
          <p className="mt-1 text-emerald-100/80">Static UI with mock data only.</p>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:ml-72 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">LiftOps</p>
            <h1 className="text-lg font-black text-slate-950">{activeItem?.label}</h1>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("landing")}
            className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white"
          >
            Home
          </button>
        </div>
      </header>

      <main className="px-4 pb-28 pt-5 lg:ml-72 lg:px-8 lg:pb-10">{children}</main>

      <nav className="fixed inset-x-3 bottom-3 z-30 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl lg:hidden">
        {appNavItems.map((item) => {
          const isActive = item.key === currentPage;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              className={`min-w-24 rounded-xl px-3 py-2 text-xs font-black ${
                isActive ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              <span className="block">{item.label}</span>
              <span className="text-[10px] opacity-70">{item.labelZh}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
