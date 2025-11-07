"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutGrid, Menu, Users } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Groups",
    href: "/",
    icon: LayoutGrid,
  },
  {
    label: "Members",
    href: "/members",
    icon: Users,
    disabled: true,
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen">
      <aside
        className={cn(
          "glass-panel fixed inset-y-4 left-4 z-30 hidden w-64 flex-col rounded-3xl p-6 lg:flex",
        )}
      >
        <BrandHeader />
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-brand-500/15 text-brand-700 shadow-inner"
                    : "text-gray-600 hover:bg-white/70 hover:text-brand-700",
                  item.disabled && "cursor-not-allowed opacity-50"
                )}
                onClick={() => setMobileOpen(false)}
                aria-disabled={item.disabled}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl bg-gradient-card p-4 text-xs text-brand-900/70">
          <p className="font-semibold">Need insights?</p>
          <p className="mt-1 text-brand-900/60">
            Track sankalp progress and member engagement directly from Joyletter Admin.
          </p>
        </div>
      </aside>

      <div className="flex w-full flex-1 flex-col lg:pl-72">
        <header className="sticky top-0 z-20 backdrop-blur-md">
          <div className="glass-panel mx-4 mt-4 flex items-center justify-between rounded-3xl px-5 py-4">
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 text-brand-700 shadow-sm"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
              <BrandHeader compact />
            </div>
            <div className="hidden lg:block">
              <BrandHeader />
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2 text-xs font-medium text-brand-700 shadow-inner">
              Joyletter Admin
            </div>
          </div>
          {isMobileOpen ? (
            <nav className="glass-panel mx-4 mt-2 flex flex-col gap-1 rounded-3xl p-3 lg:hidden">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.disabled ? "#" : item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-brand-500/15 text-brand-700 shadow-inner"
                        : "text-gray-600 hover:bg-white/70 hover:text-brand-700",
                      item.disabled && "cursor-not-allowed opacity-50"
                    )}
                    onClick={() => setMobileOpen(false)}
                    aria-disabled={item.disabled}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </header>

        <main className="relative z-10 flex-1 px-4 pb-12 pt-6 lg:px-10 lg:pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}

function BrandHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-card text-brand-700 shadow-inner">
        <span className="text-lg font-semibold">J</span>
      </div>
      <div className={cn("leading-tight", compact && "text-sm")}>
        <p className="font-semibold text-brand-800">Joyletter</p>
        <p className="text-xs text-brand-700/70">Admin Dashboard</p>
      </div>
    </div>
  );
}

