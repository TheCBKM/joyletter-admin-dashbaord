import Link from "next/link";
import { notFound } from "next/navigation";

import { CreateSankalpForm } from "@/components/sankalps/create-sankalp-form";
import { SankalpList } from "@/components/sankalps/sankalp-list";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { ArrowLeft, Users } from "lucide-react";

type PageProps = {
  params: { groupId: string };
};

export default async function GroupDetailPage({ params }: PageProps) {
  const { groupId } = params;

  const [groupsResult, sankalpsResult, membersResult] =
    await Promise.allSettled([
      api.listGroups(),
      api.listSankalps(groupId),
      api.listMembers(groupId),
    ]);

  const groups = groupsResult.status === "fulfilled" ? groupsResult.value : [];
  const sankalps =
    sankalpsResult.status === "fulfilled" ? sankalpsResult.value : [];
  const sankalpError =
    sankalpsResult.status === "rejected"
      ? "Unable to load sankalps right now."
      : null;
  const members =
    membersResult.status === "fulfilled" ? membersResult.value : [];
  const memberError =
    membersResult.status === "rejected"
      ? "Unable to load members right now."
      : null;

  const group = groups.find((item) => item.id === groupId);

  if (!group) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="glass-panel space-y-4 rounded-4xl px-6 py-7 lg:px-10 lg:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 transition hover:text-brand-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to groups
            </Link>
            <h1 className="text-3xl font-semibold text-brand-900">
              {group.name}
            </h1>
            {group.description ? (
              <p className="max-w-2xl text-sm text-brand-900/70">
                {group.description}
              </p>
            ) : (
              <p className="text-sm italic text-brand-900/40">
                No description provided.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="soft"
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href={`/groups/${groupId}/members`}>View members</Link>
            </Button>
            <div className="rounded-2xl bg-white/70 px-4 py-3 text-sm text-brand-700 shadow-inner">
              <Users className="mr-2 hidden h-4 w-4 sm:inline" />
              {members.length} members
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-brand-900">Members</h2>
        </header>
        {memberError ? (
          <p className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">
            {memberError}
          </p>
        ) : (
          <div className="rounded-3xl border border-white/40 bg-white/70 p-6 text-sm text-brand-900/70 shadow-inner">
            <p className="font-medium text-brand-900">Manage members</p>
            <p className="mt-2">
              {members.length > 0
                ? "Review roles and contact details on the members page."
                : "No members yet. Head over to the members page to invite the first participant."}
            </p>
            <Button asChild variant="primary" size="sm" className="mt-4">
              <Link href={`/groups/${groupId}/members`}>Open members page</Link>
            </Button>
          </div>
        )}
      </section>

      <div className="space-y-6">
        <section className="space-y-4" id="sankalps">
          <header className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-brand-900">Sankalps</h2>
          </header>
          {sankalpError ? (
            <p className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">
              {sankalpError}
            </p>
          ) : null}
          <SankalpList sankalps={sankalps} groupId={groupId} />
        </section>
        <CreateSankalpForm groupId={groupId} />
      </div>
    </div>
  );
}
