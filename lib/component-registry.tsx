import { ButtonWorkbench } from "@/components/ui/buttons/button-workbench"
import { BasicCardWorkbench } from "@/components/ui/cards/basic-card-workbench"
import { ComingSoon } from "@/components/ui/coming-soon"
import React, { ReactNode } from "react"

export type ComponentStatus = "production-ready" | "experimental" | "in-progress"
export type StackStatus = "stable" | "beta" | "alpha" | "deprecated"

export interface StackVersion {
    version: string
    status: StackStatus
    lastUpdated: string
    notes?: string
}

export interface ComponentStacks {
    web: StackVersion
    "react-native": StackVersion
}

export interface ComponentEntry {
    id: string
    name: string
    slug: string
    category: string
    description: string
    component: (props?: Record<string, unknown>) => ReactNode
    sourcePath: string
    status: ComponentStatus
    tags: string[]
    stacks: ComponentStacks
    usage?: {
        whenToUse: string[]
        whenNotToUse: string[]
        props: { name: string; type: string; description: string }[]
    }
    notes?: {
        decisions: string[]
        performance?: string
    }
    changelog?: {
        version: string
        date: string
        stack: "web" | "react-native"
        changes: string[]
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
        id: "button",
        name: "Button",
        slug: "button",
        category: "Inputs",
        description: "Single button component with variants (primary, secondary, outline, ghost, destructive, success, warning).",
        component: (props) => <ButtonWorkbench {...(props as Record<string, unknown>)} />,
        sourcePath: "components/ui/buttons/button.tsx",
        status: "production-ready",
        tags: ["interactive", "button", "variants"],
        stacks: {
            web: {
                version: "1.0.0",
                status: "stable",
                lastUpdated: "2026-01-29",
                notes: "Production-ready with all variants"
            },
            "react-native": {
                version: "0.9.0",
                status: "beta",
                lastUpdated: "2026-01-29",
                notes: "React Native version in development"
            }
        },
        usage: {
            whenToUse: [
                "Primary actions (primary variant).",
                "Secondary actions (secondary, outline, or ghost variants).",
                "Status/feedback actions (success, warning, destructive variants).",
                "Any place you need a consistent button API across projects."
            ],
            whenNotToUse: [
                "As a link (use an anchor or Link component instead).",
                "For navigation between routes (use Link/navigation components instead).",
                "When the only state is loading (consider disabling the whole UI section instead)."
            ],
            props: [
                { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning' | 'icon'", description: "Visual style variant." },
                { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", description: "Button size." },
                { name: "isLoading", type: "boolean", description: "Shows a spinner and disables the button." },
                { name: "fullWidth", type: "boolean", description: "Expands button to full container width." },
                { name: "children", type: "ReactNode", description: "Label content for the button." },
                { name: "hasIcon", type: "boolean", description: "Whether to show an icon with the button." },
                { name: "iconPosition", type: "'left' | 'right'", description: "Position of the icon relative to text." },
                { name: "iconPack", type: "'lucide' | 'fontawesome' | 'heroicons' | 'feather'", description: "Icon pack to choose from." },
                { name: "iconName", type: "string", description: "Name of the icon from selected pack." },
                { name: "leftIcon", type: "ReactNode", description: "Left icon component." },
                { name: "rightIcon", type: "ReactNode", description: "Right icon component." }
            ]
        },
        notes: {
            decisions: [
                "Implemented as a forwardRef button to support composition and focus management.",
                "Unified variants and sizes via lookup maps to keep the API stable and prevent class sprawl.",
                "Loading state disables the button and swaps icons for a spinner to avoid layout jitter.",
                "Uses focus ring + offset for accessible keyboard navigation."
            ],
            performance: "Zero-dependency component; class merging via cn() and constant style maps."
        },
        changelog: [
            {
                version: "1.0.0",
                date: "2026-01-29",
                stack: "web",
                changes: ["Initial production release", "All variants implemented", "Loading state added"]
            }
        ],
        updatedAt: "2026-01-29",
        reuseCount: 0,
        isFeatured: true
    },
    {
        id: "basic-card",
        name: "Basic Card",
        slug: "basic-card",
        category: "Containers",
        description: "A versatile container with subtle border and zinc background.",
        component: BasicCardWorkbench,
        sourcePath: "components/ui/cards/basic-card.tsx",
        status: "production-ready",
        tags: ["layout", "container", "card"],
        stacks: {
            web: {
                version: "1.0.0",
                status: "stable",
                lastUpdated: "2024-01-15",
                notes: "Stable container component"
            },
            "react-native": {
                version: "0.8.0",
                status: "alpha",
                lastUpdated: "2024-01-15",
                notes: "React Native version planned"
            }
        },
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
        componentsUsed: ["button", "basic-card"]
    },
    {
        name: "Dextr Marketing",
        slug: "Dextr-marketing",
        description: "Waitlist and feature landing page for the Dextr ecosystem.",
        status: "In Progress",
        problemStatement: "Needed a high-performance landing page that showcases the workshop aesthetic.",
        outcome: "Currently achieving 98+ Lighthouse scores and 15% conversion rate on early traffic.",
        componentsUsed: ["button"]
    }
]
