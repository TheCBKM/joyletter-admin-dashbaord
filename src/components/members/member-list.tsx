"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { type MemberResponse } from "@/lib/api";
import { UserRound } from "lucide-react";

export function MemberList({ members }: { members: MemberResponse[] }) {
  const [nameQuery, setNameQuery] = useState("");
  const [mobileQuery, setMobileQuery] = useState("");

  const filteredMembers = useMemo(() => {
    const normalizedName = nameQuery.trim().toLowerCase();
    const normalizedMobile = mobileQuery.trim().replace(/\s+/g, "");

    return members.filter((member) => {
      const displayName = (member.user?.name || "").toLowerCase();
      const phone = (member.user?.mobileNumber || "").replace(/\s+/g, "");

      const matchesName = normalizedName
        ? displayName.includes(normalizedName)
        : true;
      const matchesMobile = normalizedMobile
        ? phone.includes(normalizedMobile)
        : true;

      return matchesName && matchesMobile;
    });
  }, [members, nameQuery, mobileQuery]);

  if (members.length === 0) {
    return (
      <div className="glass-panel flex flex-col items-center gap-3 rounded-3xl p-8 text-center text-sm text-brand-900/70">
        <UserRound className="h-8 w-8 text-brand-500" />
        <p>
          No members yet. Invite participants to begin tracking their progress.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={nameQuery}
          onChange={(event) => setNameQuery(event.target.value)}
          placeholder="Search by name"
          className="rounded-2xl border-white/50 bg-white/70 px-4 py-3 text-sm text-brand-900 shadow-inner focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-300/60"
        />
        <Input
          value={mobileQuery}
          onChange={(event) => setMobileQuery(event.target.value)}
          placeholder="Search by mobile number"
          className="rounded-2xl border-white/50 bg-white/70 px-4 py-3 text-sm text-brand-900 shadow-inner focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-300/60"
        />
      </div>

      {filteredMembers.length === 0 ? (
        <div className="glass-panel rounded-3xl p-6 text-sm text-brand-900/70">
          No members match your search.
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/75 shadow-inner">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-brand-500/15 text-sm text-brand-900">
              <thead className="bg-brand-500/10 text-left text-xs font-semibold uppercase tracking-wide text-brand-700">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Mobile number
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-500/10">
                {filteredMembers.map((member) => {
                  const displayName = member.user?.name || "Unnamed member";
                  const phone = member.user?.mobileNumber;

                  return (
                    <tr
                      key={member.id}
                      className="transition hover:bg-brand-500/5"
                    >
                      <td className="px-4 py-3 font-medium">{displayName}</td>
                      <td className="px-4 py-3 text-brand-900/70">
                        {phone ? (
                          <span>{phone}</span>
                        ) : (
                          <span className="text-brand-900/40">
                            Not provided
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-brand-700/70">
                        {member.role ?? "MEMBER"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
