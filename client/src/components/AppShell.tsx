import type { ReactNode } from "react";
import { Sidebar, type NavItem } from "./Sidebar";
import { TopBar } from "./TopBar";

type AppShellProps<PageKey extends string = string> = {
  navItems: NavItem<PageKey>[];
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  children: ReactNode;
  immersive?: boolean;
};

export function AppShell<PageKey extends string>({
  navItems,
  currentPage,
  onNavigate,
  children,
  immersive = false,
}: AppShellProps<PageKey>) {
  if (immersive) {
    return <div className="min-h-screen bg-[#070b12]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-950">
      <Sidebar navItems={navItems} currentPage={currentPage} onNavigate={onNavigate} />
      <TopBar navItems={navItems} currentPage={currentPage} onNavigate={onNavigate} />
      <main className="px-4 pb-28 pt-5 lg:ml-72 lg:px-7 lg:pb-10">{children}</main>
    </div>
  );
}
