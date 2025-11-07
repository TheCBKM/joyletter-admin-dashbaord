# Joyletter Admin

Purple-themed Joyletter super-admin dashboard built with Next.js (App Router), Tailwind CSS, and TypeScript.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file if you need to override the API endpoint:
   ```bash
   echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:3000" >> .env.local
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to view the dashboard. The UI is responsive and adapts from mobile to desktop layouts.

## Manual Testing Checklist

- **Groups overview**
  - Load `/` and confirm groups table renders with existing data from `GET /super-admin/groups`.
  - Use the “New group” toggle, create a group, and verify the list refreshes.
- **Group detail**
  - Open `/groups/{groupId}` and confirm sankalps and members load from their respective endpoints.
  - Create a sankalp and confirm it appears immediately after form submission.
  - Add a member and confirm the member list refreshes.
- **Error handling**
  - Stop the API server and ensure the UI shows graceful error states for sankalps/members.
- **Mobile**
  - Resize to a small viewport and verify the drawer navigation and stacked cards remain usable.

## Tech Stack

- Next.js 14 App Router + React 18
- Tailwind CSS with custom purple palette and glassmorphism accenting
- Lucide icons and lightweight UI primitives

## Project Structure

- `src/app` – App Router routes, layouts, and loading states
- `src/components` – Reusable UI, groups, sankalps, and members widgets
- `src/lib/api.ts` – REST helpers for the Joyletter backend

