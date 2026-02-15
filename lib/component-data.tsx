import { ComponentEntry, ProjectEntry } from "@/lib/component-registry"

// Component metadata (server-safe)
export const componentsMetadata: ComponentEntry[] = [
    {
        id: "button",
        name: "Button",
        slug: "button",
        category: "Inputs",
        description: "Single button component with variants (primary, secondary, outline, ghost, destructive, success, warning).",
        component: () => null, // Placeholder for server-side
        sourcePath: "components/ui/buttons/button-workbench.tsx",
        sourceCode: "// Source code available in component-registry.tsx",
        status: "production-ready",
        tags: ["input", "button", "click", "action"],
        stacks: {
            web: {
                version: "1.0.0",
                status: "stable",
                lastUpdated: "2024-01-15",
                notes: "Fully accessible with keyboard navigation and ARIA support"
            },
            "react-native": {
                version: "0.8.0",
                status: "alpha",
                lastUpdated: "2024-01-15",
                notes: "React Native version planned"
            }
        },
        usage: {
            whenToUse: [
                "User actions and interactions",
                "Form submissions",
                "Navigation triggers",
                "Call-to-action buttons"
            ],
            whenNotToUse: [
                "Navigation links (use Link component)",
                "When you need multi-state toggles",
                "For complex interactions"
            ],
            props: [
                { name: "variant", type: "string", description: "Button style variant", defaultValue: "primary" },
                { name: "size", type: "string", description: "Button size", defaultValue: "md" },
                { name: "children", type: "ReactNode", description: "Button content", defaultValue: null },
                { name: "hasIcon", type: "boolean", description: "Whether button has an icon", defaultValue: "false" },
                { name: "iconPack", type: "string", description: "Icon pack to use", defaultValue: "lucide" },
                { name: "iconName", type: "string", description: "Name of the icon", defaultValue: "none" },
                { name: "iconPosition", type: "string", description: "Position of the icon", defaultValue: "right" }
            ]
        },
        notes: {
            decisions: [
                "Used semantic HTML button element for accessibility",
                "Implemented comprehensive keyboard navigation",
                "Added multiple variants for different use cases",
                "Included icon support with multiple icon packs"
            ],
            performance: "Optimized with CSS-in-JS and minimal re-renders. Icon loading is lazy and cached."
        },
        changelog: [
            {
                version: "1.0.0",
                date: "2024-01-15",
                stack: "web",
                changes: [
                    "Initial release with 7 variants",
                    "Icon support with multiple packs",
                    "Full accessibility implementation",
                    "Animation support integration"
                ]
            }
        ],
        updatedAt: "2024-01-15",
        reuseCount: 24,
        isFeatured: true
    },
    {
        id: "basic-card",
        name: "Basic Card",
        slug: "basic-card",
        category: "Layout",
        description: "A versatile card component for displaying content in a structured layout.",
        component: () => null, // Placeholder for server-side
        sourcePath: "components/ui/cards/basic-card-workbench.tsx",
        sourceCode: "// Source code available in component-registry.tsx",
        status: "production-ready",
        tags: ["layout", "card", "container", "content"],
        stacks: {
            web: {
                version: "1.0.0",
                status: "stable",
                lastUpdated: "2024-01-15",
                notes: "Responsive design with multiple layout options"
            },
            "react-native": {
                version: "0.8.0",
                status: "alpha",
                lastUpdated: "2024-01-15",
                notes: "React Native version planned"
            }
        },
        usage: {
            whenToUse: [
                "Content grouping",
                "Product displays",
                "Dashboard widgets",
                "Information cards"
            ],
            whenNotToUse: [
                "For complex layouts (use grid system)",
                "When you need interactive elements inside",
                "For full-page layouts"
            ],
            props: [
                { name: "title", type: "string", description: "Card title", defaultValue: null },
                { name: "description", type: "string", description: "Card description", defaultValue: null }
            ]
        },
        notes: {
            decisions: [
                "Used semantic article element for content",
                "Implemented responsive design patterns",
                "Added multiple visual variants"
            ],
            performance: "Optimized with CSS Grid and Flexbox for layout efficiency."
        },
        changelog: [
            {
                version: "1.0.0",
                date: "2024-01-15",
                stack: "web",
                changes: [
                    "Initial release with basic layout",
                    "Responsive design implementation",
                    "Multiple visual variants"
                ]
            }
        ],
        updatedAt: "2024-01-15",
        reuseCount: 15
    },
    {
        id: "toggle",
        name: "Toggle",
        slug: "toggle",
        category: "Inputs",
        description: "A versatile toggle switch component with multiple variants (default, outline, ghost, gradient, minimal) and labeled option.",
        component: () => null, // Placeholder for server-side
        sourcePath: "components/ui/toggle.tsx",
        sourceCode: "// Source code available in component-registry.tsx",
        status: "production-ready",
        tags: ["input", "switch", "toggle", "control", "accessibility"],
        stacks: {
            web: {
                version: "1.0.0",
                status: "stable",
                lastUpdated: "2024-01-15",
                notes: "Fully accessible with keyboard navigation and ARIA support"
            },
            "react-native": {
                version: "0.8.0",
                status: "alpha",
                lastUpdated: "2024-01-15",
                notes: "React Native version planned"
            }
        },
        usage: {
            whenToUse: [
                "Binary on/off settings and preferences",
                "Feature flags and configuration options",
                "Mode switching (dark/light, etc.)",
                "Form controls with exactly two states",
                "Settings panels and user preferences"
            ],
            whenNotToUse: [
                "Multiple choice options (use dropdown instead)",
                "Complex state management with more than two states",
                "When you need numerical input (use slider or input)",
                "Very long lists of options (use autocomplete)"
            ],
            props: [
                { name: "checked", type: "boolean", description: "Whether the toggle is on or off", defaultValue: "false" },
                { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback function when toggle state changes", defaultValue: null },
                { name: "disabled", type: "boolean", description: "Whether the toggle is disabled and non-interactive", defaultValue: "false" },
                { name: "variant", type: "ToggleVariant", description: "Visual style variant (default, outline, ghost, gradient, minimal)", defaultValue: "default" },
                { name: "className", type: "string", description: "Additional CSS classes for styling", defaultValue: null },
                { name: "id", type: "string", description: "Unique identifier for the toggle", defaultValue: null },
                { name: "aria-label", type: "string", description: "Accessibility label for screen readers", defaultValue: null },
                { name: "label", type: "string", description: "Label text for ToggleWithLabel component", defaultValue: null },
                { name: "description", type: "string", description: "Optional description text for ToggleWithLabel", defaultValue: null },
                { name: "labelPosition", type: "'left' | 'right'", description: "Position of label relative to toggle", defaultValue: "right" }
            ]
        },
        notes: {
            decisions: [
                "Used semantic HTML button with role='switch' for accessibility",
                "Implemented full keyboard navigation (Space, Enter, Escape)",
                "Added smooth transitions for all state changes",
                "Created multiple variants for different design contexts",
                "Included ToggleWithLabel for common use cases with labels"
            ],
            performance: "Optimized with CSS transitions instead of JavaScript animations for better performance. Component re-renders only when state changes."
        },
        changelog: [
            {
                version: "1.0.0",
                date: "2024-01-15",
                stack: "web",
                changes: [
                    "Initial release with 5 variants (default, outline, ghost, gradient, minimal)",
                    "Full accessibility support with ARIA attributes",
                    "Keyboard navigation implementation",
                    "ToggleWithLabel wrapper component",
                    "Smooth CSS transitions and hover states"
                ]
            }
        ],
        updatedAt: "2024-01-15",
        reuseCount: 18,
        hideFromWorkbench: true
    },
    {
        id: "dropdown",
        name: "Dropdown",
        slug: "dropdown",
        category: "Inputs",
        description: "A flexible dropdown component with multiple variants (default, outline, ghost, gradient, minimal) and full keyboard navigation.",
        component: () => null, // Placeholder for server-side
        sourcePath: "components/ui/dropdown.tsx",
        sourceCode: "// Source code available in component-registry.tsx",
        status: "production-ready",
        tags: ["input", "select", "dropdown", "control", "form", "accessibility", "keyboard"],
        stacks: {
            web: {
                version: "1.0.0",
                status: "stable",
                lastUpdated: "2024-01-15",
                notes: "Fully accessible with keyboard navigation, screen reader support, and ARIA compliance"
            },
            "react-native": {
                version: "0.8.0",
                status: "alpha",
                lastUpdated: "2024-01-15",
                notes: "React Native version planned with native picker integration"
            }
        },
        usage: {
            whenToUse: [
                "Selecting from a list of predefined options",
                "Form inputs with multiple choice options",
                "Settings and configuration panels",
                "Navigation menus and filters",
                "When you need a space-efficient selection interface"
            ],
            whenNotToUse: [
                "Very long lists (use autocomplete or search instead)",
                "When users need to input custom values (use input field)",
                "Binary choices (use toggle instead)",
                "When you need multi-select capability (use checkbox group)"
            ],
            props: [
                { name: "value", type: "string", description: "Currently selected option value", defaultValue: "" },
                { name: "onValueChange", type: "(value: string) => void", description: "Callback function when selection changes", defaultValue: null },
                { name: "options", type: "DropdownOption[]", description: "Array of option objects with value, label, and optional disabled flag", defaultValue: "[]" },
                { name: "placeholder", type: "string", description: "Placeholder text when no value is selected", defaultValue: "Select..." },
                { name: "disabled", type: "boolean", description: "Whether the dropdown is disabled and non-interactive", defaultValue: "false" },
                { name: "variant", type: "DropdownVariant", description: "Visual style variant (default, outline, ghost, gradient, minimal)", defaultValue: "default" },
                { name: "className", type: "string", description: "Additional CSS classes for styling", defaultValue: null },
                { name: "id", type: "string", description: "Unique identifier for the dropdown", defaultValue: null },
                { name: "aria-label", type: "string", description: "Accessibility label for screen readers", defaultValue: null }
            ]
        },
        notes: {
            decisions: [
                "Used semantic HTML with proper ARIA attributes for accessibility",
                "Implemented full keyboard navigation (arrows, enter, space, escape)",
                "Added click outside functionality for better UX",
                "Created 5 distinct visual variants for different contexts",
                "Used fixed positioning with dynamic calculation to avoid viewport issues",
                "Included visual indicators for selected items",
                "Added smooth transitions and micro-interactions"
            ],
            performance: "Optimized with efficient event listeners and state management. Dropdown position is calculated only when opening. Uses CSS transitions for smooth animations."
        },
        changelog: [
            {
                version: "1.0.0",
                date: "2024-01-15",
                stack: "web",
                changes: [
                    "Initial release with 5 variants (default, outline, ghost, gradient, minimal)",
                    "Full accessibility support with ARIA attributes and roles",
                    "Complete keyboard navigation implementation",
                    "Click outside to close functionality",
                    "Dynamic positioning to avoid viewport edges",
                    "Visual selection indicators",
                    "Smooth transitions and hover states",
                    "Disabled state handling for options"
                ]
            }
        ],
        updatedAt: "2024-01-15",
        reuseCount: 32,
        hideFromWorkbench: true
    }
]

// Projects data (server-safe)
export const projectsData: ProjectEntry[] = [
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
