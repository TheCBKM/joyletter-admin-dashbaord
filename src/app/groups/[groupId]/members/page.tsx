import Link from "next/link";
import { notFound } from "next/navigation";

import { CreateMemberForm } from "@/components/members/create-member-form";
import { MemberList } from "@/components/members/member-list";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { Users } from "lucide-react";

type PageProps = {
  params: { groupId: string };
};

export default async function GroupMembersPage({ params }: PageProps) {
  const { groupId } = params;

  const [groupsResult, membersResult] = await Promise.allSettled([
    api.listGroups(),
    api.listMembers(groupId),
  ]);

  const groups = groupsResult.status === "fulfilled" ? groupsResult.value : [];
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
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-4xl px-6 py-7 lg:px-10 lg:py-10">
        <div className="space-y-2">
          <Link
            href={`/groups/${groupId}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 transition hover:text-brand-500"
          >
            ← Back to group
          </Link>
          <h1 className="text-3xl font-semibold text-brand-900">Members</h1>
          <p className="max-w-2xl text-sm text-brand-900/70">
            Manage the roster for{" "}
            <span className="font-semibold text-brand-700">{group.name}</span>{" "}
            and add new participants.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/70 px-5 py-3 text-sm text-brand-700 shadow-inner">
          <Users className="hidden h-4 w-4 sm:inline" />
          {members.length} members
        </div>
      </div>

      <section className="space-y-4">
        <header>
          <h2 className="text-xl font-semibold text-brand-900">Add member</h2>
          <p className="text-sm text-brand-900/70">
            Invite someone new to this group. They will appear in the table
            below after creation.
          </p>
        </header>
        <CreateMemberForm groupId={groupId} />
      </section>

      <section className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-brand-900">
              Member directory
            </h2>
            <p className="text-sm text-brand-900/70">
              Review contact details for every member.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href={`/groups/${groupId}`}>Back to summary</Link>
          </Button>
        </header>
        {memberError ? (
          <p className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">
            {memberError}
          </p>
        ) : (
          <MemberList members={members} />
        )}
      </section>
    </div>
  );
}
