import Link from "next/link";

import { CreateGroupForm } from "@/components/groups/create-group-form";
import { Button } from "@/components/ui/button";
import { api, type GroupResponse } from "@/lib/api";
import { cn, formatDate } from "@/lib/utils";
import { ArrowRight, Users } from "lucide-react";

async function fetchGroups(): Promise<GroupResponse[]> {
  try {
    return await api.listGroups();
  } catch (error) {
    console.error("Failed to load groups", error);
    return [];
  }
}

export default async function HomePage() {
  const groups = await fetchGroups();

  return (
    <div className="space-y-8">
      <section className="glass-panel flex flex-col gap-4 rounded-3xl px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-brand-900">
          <span className="rounded-2xl bg-brand-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Active groups
          </span>
          <span className="text-2xl font-semibold text-brand-800">
            {groups.length}
          </span>
        </div>
        <Button asChild variant="ghost" className="self-end sm:self-auto">
          <Link href="#groups">View groups</Link>
        </Button>
      </section>

      <section id="groups" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-brand-900">Groups</h2>
          <span className="text-sm text-brand-900/60">
            {groups.length} total
          </span>
        </div>
        {groups.length === 0 ? (
          <div className="glass-panel flex flex-col items-center gap-4 rounded-3xl p-10 text-center">
            <Users className="h-8 w-8 text-brand-500" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-brand-800">
                No groups yet
              </p>
              <p className="text-sm text-brand-900/70">
                Create your first group to begin organising sankalps and
                inviting members.
              </p>
            </div>
            <Link
              href="#create-group"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-500/15 px-5 py-3 text-sm font-medium text-brand-700 transition hover:bg-brand-500/25"
            >
              Create a group
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
              <Link
                key={group.id}
                href={`/groups/${group.id}`}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-6 shadow-inner transition hover:-translate-y-1 hover:shadow-lg"
                )}
              >
                <div className="absolute inset-0 bg-gradient-card opacity-0 transition group-hover:opacity-100" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wide">
                    <span className="max-w-[65%] truncate rounded-full bg-brand-500/15 px-3 py-1 text-brand-700">
                      {group.activeSankalp?.title ?? "No active sankalp"}
                    </span>
                    <span className="flex items-center gap-1 text-brand-700/80">
                      <Users className="h-4 w-4" />
                      {group._count?.members ?? 0}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-brand-900">
                    {group.name}
                  </h3>
                  {group.description ? (
                    <p className="text-sm text-brand-900/70 line-clamp-3">
                      {group.description}
                    </p>
                  ) : (
                    <p className="text-sm italic text-brand-900/40">
                      No description
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-2 text-xs text-brand-900/60">
                    <span>Tap to manage</span>
                    <ArrowRight className="h-4 w-4 text-brand-600 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <CreateGroupForm />
    </div>
  );
}
