"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api, type CreateSankalpPayload } from "@/lib/api";
import { useRouter } from "next/navigation";

type Props = {
  groupId: string;
};

type FormState = {
  error?: string;
  success?: string;
};

export function CreateSankalpForm({ groupId }: Props) {
  const router = useRouter();
  const [state, setState] = useState<FormState>({});
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData, formElement: HTMLFormElement) {
    const payload: CreateSankalpPayload = {
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim() || undefined,
      startDate: String(formData.get("startDate") ?? "").trim() || undefined,
      endDate: String(formData.get("endDate") ?? "").trim() || undefined,
      targetMalaCount: formData.get("targetMalaCount")
        ? Number(formData.get("targetMalaCount"))
        : undefined,
    };

    if (!payload.title) {
      setState({ error: "Sankalp title is required." });
      return;
    }

    startTransition(async () => {
      try {
        await api.createSankalp(groupId, payload);
        setState({ success: "Sankalp created." });
        formElement.reset();
        router.refresh();
      } catch (error) {
        setState({ error: error instanceof Error ? error.message : "Failed to create sankalp." });
      }
    });
  }

  return (
    <form
      id="create-sankalp-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(new FormData(event.currentTarget), event.currentTarget);
      }}
      className="glass-panel space-y-4 rounded-3xl p-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-brand-900">Add a new sankalp</h3>
        <p className="text-sm text-brand-900/70">
          Define a time-bound intention for this community to pursue together.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="title" className="text-xs font-semibold uppercase tracking-wide text-brand-700/80">
            Title
          </label>
          <Input id="title" name="title" placeholder="108 Malas" disabled={isPending} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="description"
            className="text-xs font-semibold uppercase tracking-wide text-brand-700/80"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Collective goal details"
            rows={3}
            disabled={isPending}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="startDate" className="text-xs font-semibold uppercase tracking-wide text-brand-700/80">
            Start date
          </label>
          <Input id="startDate" name="startDate" type="date" disabled={isPending} />
        </div>
        <div className="space-y-2">
          <label htmlFor="endDate" className="text-xs font-semibold uppercase tracking-wide text-brand-700/80">
            End date
          </label>
          <Input id="endDate" name="endDate" type="date" disabled={isPending} />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="targetMalaCount"
            className="text-xs font-semibold uppercase tracking-wide text-brand-700/80"
          >
            Target malas
          </label>
          <Input
            id="targetMalaCount"
            name="targetMalaCount"
            type="number"
            min={0}
            placeholder="108"
            disabled={isPending}
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 text-sm">
        <span className="text-brand-900/70">
          {state.error && <span className="text-red-600">{state.error}</span>}
          {state.success && <span className="text-brand-700">{state.success}</span>}
        </span>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Create sankalp"}
        </Button>
      </div>
    </form>
  );
}

