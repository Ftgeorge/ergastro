"use client"

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
}