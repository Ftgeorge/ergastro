"use client"

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
                top: rect.top + window.scrollY, // Use top instead of bottom
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
                    aria-activedescendant={highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined}
                    className={cn(
                        "fixed z-9999 max-h-60 overflow-auto rounded-md",
                        "focus:outline-none",
                        listVariants[variant]
                    )}
                    style={{
                        top: `${dropdownPosition.top - 200}px`, // Move up by dropdown height
                        left: `${dropdownPosition.left}px`,
                        width: `${dropdownPosition.width}px`
                    }}
                >
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            id={`${id}-option-${index}`}
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
}