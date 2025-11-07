"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api, type CreateGroupPayload } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type FormState = {
  error?: string;
  success?: string;
};

export function CreateGroupForm() {
  const router = useRouter();
  const [isExpanded, setExpanded] = useState(false);
  const [state, setState] = useState<FormState>({});
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData, formElement: HTMLFormElement) {
    const payload: CreateGroupPayload = {
      name: String(formData.get("name") ?? "").trim(),
      description:
        String(formData.get("description") ?? "").trim() || undefined,
    };

    if (!payload.name) {
      setState({ error: "Group name is required." });
      return;
    }

    startTransition(async () => {
      try {
        await api.createGroup(payload);
        setState({ success: "Group created successfully." });
        formElement.reset();
        router.refresh();
      } catch (error) {
        setState({
          error:
            error instanceof Error ? error.message : "Something went wrong.",
        });
      }
    });
  }

  return (
    <div
      id="create-group"
      className="glass-panel relative overflow-hidden rounded-3xl p-6"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-card opacity-80" />
      <div className="relative flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-brand-800">
            Create a new group
          </h2>
          <p className="text-sm text-brand-900/70">
            Organize members into focused communities to track sankalps
            effectively.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant={isExpanded ? "soft" : "primary"}
            onClick={() => setExpanded((prev) => !prev)}
            className="w-full justify-center sm:w-auto"
          >
            {isExpanded ? "Hide form" : "New group"}
          </Button>
        </div>
        <form
          id="create-group-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(
              new FormData(event.currentTarget),
              event.currentTarget
            );
          }}
          className={cn(
            "grid gap-4 transition-all duration-300",
            isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs font-medium uppercase tracking-wide text-brand-700/90"
                >
                  Group name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Morning Japa"
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-xs font-medium uppercase tracking-wide text-brand-700/90"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Daily meditation circle"
                  rows={3}
                  disabled={isPending}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-brand-900/70">
                {state.error && (
                  <span className="text-red-600">{state.error}</span>
                )}
                {state.success && (
                  <span className="text-brand-700">{state.success}</span>
                )}
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating…" : "Create group"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
