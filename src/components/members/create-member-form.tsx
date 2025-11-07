"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, type CreateMemberPayload } from "@/lib/api";
import { useRouter } from "next/navigation";

type Props = {
  groupId: string;
};

type FormState = {
  error?: string;
  success?: string;
};

export function CreateMemberForm({ groupId }: Props) {
  const router = useRouter();
  const [state, setState] = useState<FormState>({});
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData, formElement: HTMLFormElement) {
    const payload: CreateMemberPayload = {
      name: String(formData.get("name") ?? "").trim(),
      mobileNumber: String(formData.get("mobileNumber") ?? "").trim() || undefined,
      role: "MEMBER",
    };

    if (!payload.name) {
      setState({ error: "Member name is required." });
      return;
    }

    startTransition(async () => {
      try {
        await api.createMember(groupId, payload);
        setState({ success: "Member added." });
        formElement.reset();
        router.refresh();
      } catch (error) {
        setState({ error: error instanceof Error ? error.message : "Failed to add member." });
      }
    });
  }

  return (
    <form
      id="create-member-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(new FormData(event.currentTarget), event.currentTarget);
      }}
      className="glass-panel space-y-4 rounded-3xl p-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-brand-900">Invite a member</h3>
        <p className="text-sm text-brand-900/70">Add participants to keep them accountable to the sankalp.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-brand-700/80">
            Full name
          </label>
          <Input id="name" name="name" placeholder="John Doe" disabled={isPending} />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="mobileNumber"
            className="text-xs font-semibold uppercase tracking-wide text-brand-700/80"
          >
            Mobile number
          </label>
          <Input
            id="mobileNumber"
            name="mobileNumber"
            placeholder="+919340573858"
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
          {isPending ? "Adding…" : "Add member"}
        </Button>
      </div>
    </form>
  );
}

