import { PrimaryButton } from "@/components/ui/buttons/primary-button"
import { SecondaryButton, OutlineButton } from "@/components/ui/buttons/variant-buttons"
import { BasicCard } from "@/components/ui/cards/basic-card"
import { ReactNode } from "react"

export type ComponentStatus = "production-ready" | "experimental" | "in-progress"

export interface ComponentEntry {
    name: string
    slug: string
    category: string
    description: string
    component: () => ReactNode
    sourcePath: string
    status: ComponentStatus
    tags: string[]
    usage?: {
        whenToUse: string[]
        whenNotToUse: string[]
        props: { name: string; type: string; description: string }[]
    }
    notes?: {
        decisions: string[]
        performance?: string
    }
    versions?: {
        version: string
        date: string
        status: "stable" | "deprecated" | "experimental"
        changelog: string
    }[]
    relatedProjects?: string[]
    updatedAt: string
    reuseCount: number
    isFeatured?: boolean
}

export interface ProjectEntry {
    name: string
    slug: string
    description: string
    status: string
    problemStatement: string
    outcome: string
    componentsUsed: string[]
}

export const components: ComponentEntry[] = [
    {
        name: "Primary Button",
        slug: "primary-button",
        category: "Inputs",
        description: "The primary action trigger for important user flows. High visibility with amber accent.",
        component: PrimaryButton,
        sourcePath: "components/ui/buttons/primary-button.tsx",
        status: "production-ready",
        tags: ["interactive", "button", "primary", "amber"],
        usage: {
            whenToUse: [
                "Main calls to action like 'Submit' or 'Continue'.",
                "Primary navigation triggers in forms.",
                "Whenever a single dominant action is required."
            ],
            whenNotToUse: [
                "Secondary actions (use secondary or outline variant instead).",
                "Within dense text blocks where it might be distracting.",
                "For destructive actions (use a red variant if available)."
            ],
            props: [
                { name: "children", type: "ReactNode", description: "Label content for the button." },
                { name: "onClick", type: "() => void", description: "Event handler for click interactions." },
                { name: "className", type: "string", description: "Optional CSS classes." }
            ]
        },
        notes: {
            decisions: [
                "Used amber-500 for high contrast against zinc-950 background.",
                "Implemented hover scale transform for tactile feedback.",
                "Ensured 44px minimum touch target for accessibility."
            ],
            performance: "Zero-dependency component using standard Tailwind transforms."
        },
        versions: [
            { version: "1.0.0", date: "2024-01-20", status: "stable", changelog: "Initial implementation with amber theme." }
        ],
        relatedProjects: ["admin-dashboard"],
        updatedAt: "2024-01-20",
        reuseCount: 12,
        isFeatured: true
    },
    {
        name: "Secondary Button",
        slug: "secondary-button",
        category: "Inputs",
        description: "A subtler action trigger for supplementary flows. Neutral zinc palette.",
        component: SecondaryButton,
        sourcePath: "components/ui/buttons/variant-buttons.tsx",
        status: "production-ready",
        tags: ["interactive", "button", "secondary"],
        updatedAt: "2024-01-21",
        reuseCount: 8,
        isFeatured: false
    },
    {
        name: "Outline Button",
        slug: "outline-button",
        category: "Inputs",
        description: "Minimalist action trigger with amber hover state. Best for tertiary actions.",
        component: OutlineButton,
        sourcePath: "components/ui/buttons/variant-buttons.tsx",
        status: "production-ready",
        tags: ["interactive", "button", "outline"],
        updatedAt: "2024-01-21",
        reuseCount: 15,
        isFeatured: true
    },
    {
        name: "Basic Card",
        slug: "basic-card",
        category: "Containers",
        description: "A versatile container with subtle border and zinc background.",
        component: BasicCard,
        sourcePath: "components/ui/cards/basic-card.tsx",
        status: "production-ready",
        tags: ["layout", "container", "card"],
        updatedAt: "2024-01-15",
        reuseCount: 24,
        isFeatured: true
    }
]

export const projects: ProjectEntry[] = [
    {
        name: "Admin Dashboard v2",
        slug: "admin-dashboard",
        description: "A complete overhaul of the internal management tool with a focus on data density and speed.",
        status: "Live",
        problemStatement: "The previous dashboard struggled with layout shifts under heavy data load and had inconsistent action cues.",
        outcome: "Improved user task completion time by 30% and unified the visual language across 14 internal pages.",
        componentsUsed: ["primary-button", "basic-card", "outline-button"]
    },
    {
        name: "Ergastro Marketing",
        slug: "ergastro-marketing",
        description: "Waitlist and feature landing page for the Ergastro ecosystem.",
        status: "In Progress",
        problemStatement: "Needed a high-performance landing page that showcases the workshop aesthetic.",
        outcome: "Currently achieving 98+ Lighthouse scores and 15% conversion rate on early traffic.",
        componentsUsed: ["primary-button", "outline-button"]
    }
]
