"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Dot, Target, Timer, PencilLine } from "lucide-react";

import { api, type SankalpResponse } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SankalpListProps = {
  sankalps: SankalpResponse[];
  groupId: string;
};

export function SankalpList({ sankalps, groupId }: SankalpListProps) {
  if (sankalps.length === 0) {
    return (
      <div className="glass-panel flex flex-col items-center gap-3 rounded-3xl p-8 text-center text-sm text-brand-900/70">
        <Target className="h-8 w-8 text-brand-500" />
        <p>No sankalps yet. Create one to set a collective intention.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sankalps.map((sankalp) => (
        <SankalpCard key={sankalp.id} sankalp={sankalp} groupId={groupId} />
      ))}
    </div>
  );
}

type SankalpCardProps = {
  sankalp: SankalpResponse;
  groupId: string;
};

function SankalpCard({ sankalp, groupId }: SankalpCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ error?: string; success?: string }>({});

  function handleSubmit(formData: FormData) {
    const payload = {
      title: String(formData.get("title") ?? sankalp.title).trim(),
      description: String(formData.get("description") ?? "").trim() || undefined,
      startDate: String(formData.get("startDate") ?? "").trim() || undefined,
      endDate: String(formData.get("endDate") ?? "").trim() || undefined,
      targetMalaCount: formData.get("targetMalaCount")
        ? Number(formData.get("targetMalaCount"))
        : undefined,
      isActive: formData.get("isActive") === "on",
    };

    if (!payload.title) {
      setMessage({ error: "Title is required." });
      return;
    }

    startTransition(async () => {
      try {
        await api.updateSankalp(groupId, sankalp.id, payload);
        setMessage({ success: "Sankalp updated." });
        setIsEditing(false);
        router.refresh();
      } catch (error) {
        setMessage({ error: error instanceof Error ? error.message : "Failed to update sankalp." });
      }
    });
  }

  const formattedStartDate = sankalp.startDate?.slice(0, 10) ?? "";
  const formattedEndDate = sankalp.endDate?.slice(0, 10) ?? "";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-5 shadow-inner">
      <div className="absolute inset-0 bg-gradient-card opacity-0 transition group-hover:opacity-100" />
      <div className="relative space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-brand-900">{sankalp.title}</h3>
            {sankalp.description ? (
              <p className="text-sm text-brand-900/70 line-clamp-3">{sankalp.description}</p>
            ) : (
              <p className="text-sm italic text-brand-900/40">No description provided.</p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {typeof sankalp.progressPercentage === "number" && (
              <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-700">
                {Math.round(sankalp.progressPercentage)}% complete
              </span>
            )}
            {sankalp.isActive !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-700">
                <Dot className="h-4 w-4 text-brand-500" />
                {sankalp.isActive ? "Active" : "Inactive"}
              </span>
            )}
            <Button
              type="button"
              variant="soft"
              size="sm"
              onClick={() => {
                setMessage({});
                setIsEditing((prev) => !prev);
              }}
            >
              <PencilLine className="mr-2 h-4 w-4" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-brand-900/60">
          {sankalp.startDate && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(sankalp.startDate)}
            </span>
          )}
          {sankalp.endDate && (
            <span className="inline-flex items-center gap-1">
              <Timer className="h-4 w-4" />
              {formatDate(sankalp.endDate)}
            </span>
          )}
          {sankalp.targetMalaCount !== undefined && sankalp.targetMalaCount !== null && (
            <span className="inline-flex items-center gap-1">
              <Target className="h-4 w-4" />
              {sankalp.targetMalaCount} malas
            </span>
          )}
          {typeof sankalp.completedMalaCount === "number" && (
            <span className="inline-flex items-center gap-1 text-brand-700">
              Completed: {sankalp.completedMalaCount}
            </span>
          )}
        </div>

        {isEditing ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(new FormData(event.currentTarget));
            }}
            className="space-y-3 rounded-2xl border border-brand-500/15 bg-white/80 p-4"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-2 text-xs font-semibold uppercase tracking-wide text-brand-700/80">
                <span>Title</span>
                <Input name="title" defaultValue={sankalp.title} disabled={isPending} />
              </label>
              <label className="space-y-2 text-xs font-semibold uppercase tracking-wide text-brand-700/80">
                <span>Target malas</span>
                <Input
                  name="targetMalaCount"
                  type="number"
                  min={0}
                  defaultValue={sankalp.targetMalaCount ?? undefined}
                  disabled={isPending}
                />
              </label>
              <label className="space-y-2 text-xs font-semibold uppercase tracking-wide text-brand-700/80 sm:col-span-2">
                <span>Description</span>
                <Textarea
                  name="description"
                  rows={3}
                  defaultValue={sankalp.description ?? ""}
                  disabled={isPending}
                />
              </label>
              <label className="space-y-2 text-xs font-semibold uppercase tracking-wide text-brand-700/80">
                <span>Start date</span>
                <Input name="startDate" type="date" defaultValue={formattedStartDate} disabled={isPending} />
              </label>
              <label className="space-y-2 text-xs font-semibold uppercase tracking-wide text-brand-700/80">
                <span>End date</span>
                <Input name="endDate" type="date" defaultValue={formattedEndDate} disabled={isPending} />
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-700/80">
                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked={sankalp.isActive ?? true}
                  disabled={isPending}
                  className="h-4 w-4 rounded border border-brand-500/40 text-brand-600 focus:ring-brand-400"
                />
                <span>Active</span>
              </label>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="text-brand-900/70">
                {message.error && <span className="text-red-600">{message.error}</span>}
                {message.success && <span className="text-brand-700">{message.success}</span>}
              </span>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </form>
        ) : null}
      </div>
    </article>
  );
}

