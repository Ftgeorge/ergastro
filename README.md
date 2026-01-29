# Ergastro

Ergastro is my personal UI component workshop — a place where I design, test, refine, and maintain reusable interface components before they ship into real production websites.

It’s not a demo gallery.
It’s not a Storybook clone.
It’s the workspace I rely on to build faster, stay consistent, and avoid rewriting UI from scratch across projects.

The name Ergastro is derived from the Greek εργαστήρι (ergastíri), meaning workshop or place of work.

## Why Ergastro Exists

When you build multiple websites over time, UI work tends to fragment:

- components get re-written slightly differently
- styles drift across projects
- small design decisions pile up
- reuse becomes risky instead of effortless

Ergastro exists to solve that quietly.

It gives me a single, dependable place to:

- shape components properly
- view them in isolation
- refine them over time
- and reuse them confidently in production

Most components in Ergastro eventually ship somewhere real.

## What Ergastro Is (and Isn’t)

**Ergastro is:**
- a personal UI workshop
- a reusable component lab
- a staging ground for production-ready UI
- opinionated, but flexible
- built to evolve alongside real projects

**Ergastro is not:**
- a public component library (yet)
- a marketing site
- Storybook
- a playground for throwaway experiments

If a component lives here, it’s expected to earn its keep.

## Features

- 📦 **Central component registry** (single source of truth)
- 🧱 **Live component previews** in isolation
- 🧭 **Category-based browsing**
- 📄 **Dedicated pages** per component
- 🎨 **Neutral, shadcn-inspired design system**
- 🌗 **Light & dark mode support**
- 🚀 **Built with the Next.js App Router**
- 🧠 **Code-first, minimal abstractions**

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Minimal custom utilities**
- **No external UI frameworks**

Everything lives close to the code that actually uses it.

## Project Structure

```bash
app/
 ├─ workshop/
 │   ├─ page.tsx              # Component gallery
 │   └─ [slug]/page.tsx       # Single component view
components/
 ├─ ui/
 │   ├─ buttons/
 │   ├─ cards/
 │   ├─ layout/
 │   └─ ...
 ├─ workshop/
 │   ├─ component-preview.tsx
 │   ├─ workshop-card.tsx
 │   └─ code-block.tsx
lib/
 └─ component-registry.ts
```

## The Component Registry

All components are registered in a single file: `lib/component-registry.ts`

Each entry defines:
- component name
- slug
- category
- description
- component reference
- source path

The workshop UI is generated entirely from this registry. If it’s not registered, it doesn’t exist in Ergastro.

## How to Use Ergastro

### 1. Install & Run Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/ergastro.git
cd ergastro
npm install
npm run dev
```

Open: [http://localhost:3000/workshop](http://localhost:3000/workshop)

This is the main workshop view.

### 2. Browsing Components

- Visit `/workshop` to see all registered components
- Components are grouped by category
- Each card shows a live preview
- Click a component to view it in isolation

### 3. Viewing a Component

Each component has its own page:
- Large preview
- Description and usage notes
- Code reference
- Clear source location

This mirrors how components are actually consumed in production.

### 4. Adding a New Component

To add a new component:

1. Create the component in `components/ui`
   ```tsx
   // components/ui/buttons/button.tsx
   export function Button() {
     return (
       <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white">
         Button
       </button>
     )
   }
   ```

2. Register it in the component registry:
   ```ts
   // lib/component-registry.ts
   import { Button } from "@/components/ui/buttons/button"

   export const components = [
     {
       name: "Button",
       slug: "button",
       category: "Buttons",
       description: "Button used across layouts",
       component: Button,
       sourcePath: "components/ui/buttons/button.tsx",
     },
   ]
   ```

3. Restart the dev server (if needed)

The component will automatically appear in the workshop.

### 5. Using Components in Real Projects

Ergastro is not locked in. Components are plain React components with clean Tailwind styles and are copy-paste friendly.

You can:
- import them directly into other projects
- adapt them to project-specific needs
- evolve them inside Ergastro as requirements change

Ergastro is the source — production is the destination.

## Design Principles

- Neutral zinc/slate color palette
- One accent color (indigo)
- Minimal chrome, no visual noise
- No gradients, no flashy effects
- Components should stand on their own

If the UI becomes noticeable, it’s doing too much.

## Non-Goals

Ergastro intentionally avoids:
- Authentication
- Databases
- CMSs
- Analytics
- Heavy abstractions
- Publishing pipelines

This keeps the workshop fast, portable, and long-lived.

## How Ergastro Evolves

Most components follow this lifecycle:
1. Start as a rough idea
2. Get refined in isolation
3. Gain consistency and polish
4. Ship into production projects
5. Return for improvements

Ergastro grows as real needs emerge.

## Philosophy

Build once. Refine often. Reuse without hesitation.

## Status

Ergastro is an active personal project used in real work. It’s not trying to be everything — just reliable.
