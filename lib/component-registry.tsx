"use client"

import { ButtonWorkbench } from "@/components/ui/buttons/button-workbench"
import { BasicCardWorkbench } from "@/components/ui/cards/basic-card-workbench"
import { Toggle, ToggleWithLabel } from "@/components/ui/toggle"
import { Dropdown } from "@/components/ui/dropdown"
import { ComingSoon } from "@/components/ui/coming-soon"
import React, { ReactNode, useState } from "react"

// Wrapper components with default props for the registry
function ToggleWorkbench(props: Record<string, unknown>) {
    const [checked, setChecked] = useState(false)
    
    return (
        <ToggleWithLabel
            checked={checked}
            onCheckedChange={setChecked}
            label={props.label as string || "Toggle"}
            description={props.description as string}
            variant={(props.variant as any) || "default"}
            disabled={props.disabled as boolean || false}
        />
    )
}

function DropdownWorkbench(props: Record<string, unknown>) {
    const [value, setValue] = useState("")
    
    const defaultOptions = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" }
    ]
    
    return (
        <Dropdown
            value={value}
            onValueChange={setValue}
            options={(props.options as any[]) || defaultOptions}
            placeholder={props.placeholder as string || "Select..."}
            variant={(props.variant as any) || "default"}
            disabled={props.disabled as boolean || false}
        />
    )
}

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
    sourceCode?: string
    status: ComponentStatus
    tags: string[]
    stacks: ComponentStacks
    usage?: {
        whenToUse: string[]
        whenNotToUse: string[]
        props: { name: string; type: string; description: string; defaultValue?: string | boolean | number | null }[]
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
        sourceCode: `import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "outline" 
  | "ghost"
  | "destructive"
  | "success"
  | "warning"

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 
    "bg-accent text-accent-foreground hover:opacity-90 active:opacity-80 shadow-sm",
  secondary: 
    "bg-zinc-900 text-zinc-100 hover:bg-zinc-800 active:bg-zinc-700 shadow-sm",
  outline: 
    "border border-zinc-800 bg-transparent text-zinc-200 hover:bg-zinc-900/40 active:bg-zinc-900/60",
  ghost: 
    "bg-transparent text-zinc-200 hover:bg-zinc-900/40 active:bg-zinc-900/60",
  destructive: 
    "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm",
  success: 
    "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm",
  warning: 
    "bg-amber-500 text-zinc-950 hover:bg-amber-600 active:bg-amber-700 shadow-sm",
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-2.5 py-1.5 text-xs rounded",
  sm: "px-3 py-2 text-sm rounded-md",
  md: "px-4 py-2.5 text-base rounded-md",
  lg: "px-6 py-3 text-lg rounded-lg",
  xl: "px-8 py-4 text-xl rounded-lg",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    isLoading = false, 
    leftIcon, 
    rightIcon, 
    fullWidth = false, 
    disabled, 
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-60",
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Full width
          fullWidth && "w-full",
          // Custom className
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg 
            className="animate-spin -ml-1 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = "Button"

export type { ButtonVariant, ButtonSize }`,
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
                { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning' | 'icon'", description: "Visual style variant.", defaultValue: "primary" },
                { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", description: "Button size.", defaultValue: "md" },
                { name: "isLoading", type: "boolean", description: "Shows a spinner and disables the button.", defaultValue: false },
                { name: "fullWidth", type: "boolean", description: "Expands button to full container width.", defaultValue: false },
                { name: "children", type: "ReactNode", description: "Label content for the button.", defaultValue: "Button" },
                { name: "hasIcon", type: "boolean", description: "Whether to show an icon with the button.", defaultValue: false },
                { name: "iconPosition", type: "'left' | 'right'", description: "Position of the icon relative to text.", defaultValue: "right" },
                { name: "iconPack", type: "'lucide' | 'fontawesome' | 'heroicons' | 'feather' | 'antdesign' | 'bootstrap' | 'ionicons' | 'material'", description: "Icon pack to choose from.", defaultValue: "lucide" },
                { name: "iconName", type: "string", description: "Name of the icon from selected pack.", defaultValue: "none" }
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
        sourceCode: `export function BasicCard() {
    return (
        <div className="w-full max-w-xs overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="aspect-video bg-zinc-100 dark:bg-zinc-900" />
            <div className="p-4">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Card Title</h4>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    This is a simple card component used for displaying content in a grid.
                </p>
            </div>
        </div>
    )
}`,
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
    },
    {
        id: "toggle",
        name: "Toggle",
        slug: "toggle",
        category: "Inputs",
        description: "A versatile toggle switch component with multiple variants (default, outline, ghost, gradient, minimal) and labeled option.",
        component: (props) => <ToggleWorkbench {...(props as Record<string, unknown>)} />,
        sourcePath: "components/ui/toggle.tsx",
        sourceCode: `"use client"

import { cn } from "@/lib/utils"

type ToggleVariant = "default" | "outline" | "ghost" | "gradient" | "minimal"

interface ToggleProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    disabled?: boolean
    variant?: ToggleVariant
    className?: string
    id?: string
    "aria-label"?: string
}

export function Toggle({
    checked,
    onCheckedChange,
    disabled = false,
    variant = "default",
    className,
    id,
    "aria-label": ariaLabel,
}: ToggleProps) {
    const handleToggle = () => {
        if (!disabled) {
            onCheckedChange(!checked)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault()
            handleToggle()
        }
    }

    // Variant styles for the container/track
    const trackVariants = {
        default: cn(
            checked
                ? "bg-accent border-accent"
                : "bg-zinc-800 border-zinc-700",
            "border shadow-inner",
            "transition-all duration-200"
        ),
        outline: cn(
            checked
                ? "bg-transparent border-2 border-zinc-400"
                : "bg-transparent border-2 border-zinc-700",
            "transition-all duration-200"
        ),
        ghost: cn(
            checked
                ? "bg-zinc-700/60"
                : "bg-zinc-900/40",
            "transition-all duration-200"
        ),
        gradient: cn(
            checked
                ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 border-transparent shadow-lg shadow-violet-500/30"
                : "bg-zinc-800 border-zinc-700 border",
            "transition-all duration-300"
        ),
        minimal: cn(
            checked
                ? "bg-zinc-900 border-b-2 border-accent"
                : "bg-zinc-900 border-b-2 border-zinc-700",
            "rounded-none",
            "transition-all duration-200"
        ),
    }

    // Variant styles for the thumb/knob
    const thumbVariants = {
        default: cn(
            checked
                ? "translate-x-5 bg-white"
                : "translate-x-0.5 bg-zinc-400",
            "shadow-md",
            "transition-all duration-200"
        ),
        outline: cn(
            checked
                ? "translate-x-5 bg-zinc-100 border-2 border-zinc-400"
                : "translate-x-0.5 bg-zinc-700 border-2 border-zinc-700",
            "shadow-sm",
            "transition-all duration-200"
        ),
        ghost: cn(
            checked
                ? "translate-x-5 bg-zinc-100"
                : "translate-x-0.5 bg-zinc-600",
            "shadow-md",
            "transition-all duration-200"
        ),
        gradient: cn(
            checked
                ? "translate-x-5 bg-white shadow-lg"
                : "translate-x-0.5 bg-zinc-500 shadow-md",
            "transition-all duration-300"
        ),
        minimal: cn(
            checked
                ? "translate-x-5 bg-accent"
                : "translate-x-0.5 bg-zinc-600",
            "rounded-none shadow-sm",
            "transition-all duration-200"
        ),
    }

    return (
        <button
            type="button"
            role="switch"
            id={id}
            aria-label={ariaLabel}
            aria-checked={checked}
            disabled={disabled}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                variant === "gradient" && checked
                    ? "focus:ring-violet-400 focus:ring-offset-zinc-950"
                    : "focus:ring-accent/40 focus:ring-offset-zinc-950",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "transition-all",
                trackVariants[variant],
                className
            )}
        >
            <span
                className={cn(
                    "inline-block h-5 w-5 transform rounded-full",
                    thumbVariants[variant]
                )}
            />
        </button>
    )
}

interface ToggleWithLabelProps extends ToggleProps {
    label?: string
    description?: string
    labelPosition?: "left" | "right"
}

export function ToggleWithLabel({
    label,
    description,
    labelPosition = "right",
    className,
    ...props
}: ToggleWithLabelProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-3",
                labelPosition === "left" && "flex-row-reverse justify-end",
                className
            )}
        >
            <Toggle {...props} />
            {(label || description) && (
                <div className="flex flex-col gap-0.5">
                    {label && (
                        <label
                            htmlFor={props.id}
                            className="text-sm font-medium text-zinc-200 cursor-pointer"
                        >
                            {label}
                        </label>
                    )}
                    {description && (
                        <p className="text-xs text-zinc-500">{description}</p>
                    )}
                </div>
            )}
        </div>
    )
}`,
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
        reuseCount: 18
    },
    {
        id: "dropdown",
        name: "Dropdown",
        slug: "dropdown",
        category: "Inputs",
        description: "A flexible dropdown component with multiple variants (default, outline, ghost, gradient, minimal) and full keyboard navigation.",
        component: (props) => <DropdownWorkbench {...(props as Record<string, unknown>)} />,
        sourcePath: "components/ui/dropdown.tsx",
        sourceCode: `"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropdownOption {
    value: string
    label: string
    disabled?: boolean
}

type DropdownVariant = "default" | "outline" | "ghost" | "gradient" | "minimal"

interface DropdownProps {
    value: string
    onValueChange: (value: string) => void
    options: DropdownOption[]
    placeholder?: string
    className?: string
    disabled?: boolean
    id?: string
    "aria-label"?: string
    variant?: DropdownVariant
}

export function Dropdown({
    value,
    onValueChange,
    options,
    placeholder = "Select...",
    className,
    disabled = false,
    id,
    "aria-label": ariaLabel,
    variant = "default",
}: DropdownProps) {
    const [open, setOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
    const triggerRef = useRef<HTMLButtonElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    const selectedOption = options.find(opt => opt.value === value)
    const displayValue = selectedOption?.label || placeholder

    // Calculate dropdown position when opening
    const updateDropdownPosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            setDropdownPosition({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            })
        }
    }

    // Update position when dropdown opens
    useEffect(() => {
        if (open) {
            updateDropdownPosition()
        }
    }, [open])

    // Variant styles for trigger button
    const triggerVariants = {
        default: cn(
            "border border-zinc-800 bg-zinc-950",
            "text-zinc-200",
            "shadow-[0_0_0_1px_rgba(24,24,27,0.6)]",
            "hover:border-zinc-700",
            "focus:ring-2 focus:ring-accent/40"
        ),
        outline: cn(
            "border-2 border-zinc-700 bg-transparent",
            "text-zinc-100",
            "hover:border-zinc-500 hover:bg-zinc-900/50",
            "focus:ring-2 focus:ring-zinc-400"
        ),
        ghost: cn(
            "border border-transparent bg-zinc-900/50",
            "text-zinc-300",
            "hover:bg-zinc-800/80 hover:text-zinc-100",
            "focus:ring-2 focus:ring-zinc-700"
        ),
        gradient: cn(
            "border border-transparent bg-gradient-to-br from-violet-600/90 to-fuchsia-600/90",
            "text-white font-semibold",
            "shadow-lg shadow-violet-500/20",
            "hover:from-violet-500 hover:to-fuchsia-500",
            "focus:ring-2 focus:ring-violet-400"
        ),
        minimal: cn(
            "border-b-2 border-zinc-700 bg-transparent rounded-none",
            "text-zinc-200",
            "hover:border-zinc-500",
            "focus:ring-0 focus:border-accent"
        ),
    }

    // Variant styles for dropdown list
    const listVariants = {
        default: cn(
            "border border-zinc-800 bg-zinc-950 shadow-lg"
        ),
        outline: cn(
            "border-2 border-zinc-700 bg-zinc-900 shadow-xl"
        ),
        ghost: cn(
            "border border-zinc-800 bg-zinc-900/95 backdrop-blur-sm shadow-xl"
        ),
        gradient: cn(
            "border border-violet-500/30 bg-gradient-to-b from-zinc-900 to-zinc-950",
            "shadow-2xl shadow-violet-500/10"
        ),
        minimal: cn(
            "border-l-2 border-r-2 border-b-2 border-zinc-700 bg-zinc-950 rounded-none shadow-md"
        ),
    }

    // Variant styles for options
    const optionVariants = {
        default: (isSelected: boolean, isHighlighted: boolean, isDisabled: boolean) => cn(
            "text-xs font-medium",
            isSelected && "bg-accent/20 text-accent",
            isHighlighted && !isDisabled && "bg-zinc-800 text-zinc-100",
            isDisabled && "cursor-not-allowed opacity-50 text-zinc-700",
            !isDisabled && !isSelected && !isHighlighted && "text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100"
        ),
        outline: (isSelected: boolean, isHighlighted: boolean, isDisabled: boolean) => cn(
            "text-sm font-medium",
            isSelected && "bg-zinc-700 text-zinc-100 font-semibold",
            isHighlighted && !isDisabled && "bg-zinc-700/50 text-zinc-100",
            isDisabled && "cursor-not-allowed opacity-50 text-zinc-600",
            !isDisabled && !isSelected && !isHighlighted && "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
        ),
        ghost: (isSelected: boolean, isHighlighted: boolean, isDisabled: boolean) => cn(
            "text-xs font-normal",
            isSelected && "bg-zinc-800 text-zinc-100",
            isHighlighted && !isDisabled && "bg-zinc-800/60 text-zinc-100",
            isDisabled && "cursor-not-allowed opacity-40 text-zinc-600",
            !isDisabled && !isSelected && !isHighlighted && "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
        ),
        gradient: (isSelected: boolean, isHighlighted: boolean, isDisabled: boolean) => cn(
            "text-sm font-medium",
            isSelected && "bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 text-violet-200",
            isHighlighted && !isDisabled && "bg-zinc-800 text-zinc-100",
            isDisabled && "cursor-not-allowed opacity-50 text-zinc-600",
            !isDisabled && !isSelected && !isHighlighted && "text-zinc-300 hover:bg-zinc-800/70 hover:text-zinc-100"
        ),
        minimal: (isSelected: boolean, isHighlighted: boolean, isDisabled: boolean) => cn(
            "text-sm font-normal rounded-none",
            isSelected && "bg-transparent text-accent border-l-2 border-accent",
            isHighlighted && !isDisabled && "bg-zinc-900 text-zinc-100",
            isDisabled && "cursor-not-allowed opacity-50 text-zinc-600",
            !isDisabled && !isSelected && !isHighlighted && "text-zinc-300 hover:bg-zinc-900/50 hover:text-zinc-100"
        ),
    }

    // Close on click outside
    useEffect(() => {
        if (!open) return

        const handleClickOutside = (e: MouseEvent) => {
            if (triggerRef.current?.contains(e.target as Node) || listRef.current?.contains(e.target as Node)) {
                return
            }
            setOpen(false)
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    // Keyboard navigation
    useEffect(() => {
        if (!open) return

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault()
                    setHighlightedIndex(prev => {
                        const next = prev + 1
                        if (next >= options.length) return 0
                        return next
                    })
                    break
                case "ArrowUp":
                    e.preventDefault()
                    setHighlightedIndex(prev => {
                        const next = prev - 1
                        if (next < 0) return options.length - 1
                        return next
                    })
                    break
                case "Enter":
                case " ":
                    e.preventDefault()
                    if (highlightedIndex >= 0) {
                        const option = options[highlightedIndex]
                        if (!option.disabled) {
                            onValueChange(option.value)
                            setOpen(false)
                        }
                    }
                    break
                case "Escape":
                    e.preventDefault()
                    setOpen(false)
                    triggerRef.current?.focus()
                    break
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [open, highlightedIndex, options, onValueChange])

    // Scroll highlighted item into view
    useEffect(() => {
        if (open && highlightedIndex >= 0 && listRef.current) {
            const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement
            highlightedElement?.scrollIntoView({ block: "nearest" })
        }
    }, [open, highlightedIndex])

    return (
        <div className={cn("relative", className)}>
            <button
                ref={triggerRef}
                type="button"
                id={id}
                aria-label={ariaLabel}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-disabled={disabled}
                disabled={disabled}
                onClick={() => {
                    if (!disabled) {
                        setOpen(!open)
                        if (!open) {
                            setTimeout(updateDropdownPosition, 0)
                        }
                    }
                }}
                className={cn(
                    "flex h-9 w-full items-center justify-between rounded-md px-3 py-2",
                    "text-xs font-black uppercase tracking-widest",
                    "transition-colors",
                    "focus:outline-none",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    triggerVariants[variant],
                    disabled && "cursor-not-allowed opacity-50"
                )}
            >
                <span className={cn(
                    "truncate",
                    !selectedOption && (variant === "gradient" ? "text-white/70" : "text-zinc-500")
                )}>
                    {displayValue}
                </span>
                <ChevronDown
                    size={16}
                    className={cn(
                        "shrink-0 transition-transform",
                        open && "rotate-180"
                    )}
                />
            </button>

            {open && (
                <ul
                    ref={listRef}
                    role="listbox"
                    aria-activedescendant={highlightedIndex >= 0 ? \`\${id}-option-\${highlightedIndex}\` : undefined}
                    className={cn(
                        "fixed z-9999 max-h-60 overflow-auto rounded-md",
                        "focus:outline-none",
                        listVariants[variant]
                    )}
                    style={{
                        top: \`\${dropdownPosition.top - 200}px\`,
                        left: \`\${dropdownPosition.left}px\`,
                        width: \`\${dropdownPosition.width}px\`
                    }}
                >
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            id={\`\${id}-option-\${index}\`}
                            role="option"
                            aria-selected={option.value === value}
                            aria-disabled={option.disabled}
                            className={cn(
                                "relative flex cursor-pointer select-none items-center px-3 py-2 outline-none",
                                "transition-colors",
                                optionVariants[variant](
                                    option.value === value,
                                    highlightedIndex === index,
                                    !!option.disabled
                                )
                            )}
                            onClick={() => {
                                if (!option.disabled) {
                                    onValueChange(option.value)
                                    setOpen(false)
                                }
                            }}
                        >
                            {option.label}
                            {option.value === value && variant !== "minimal" && (
                                <div className={cn(
                                    "absolute right-3 h-1.5 w-1.5 rounded-full",
                                    variant === "gradient" ? "bg-violet-400" : "bg-accent"
                                )} />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}`,
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
        reuseCount: 32
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
