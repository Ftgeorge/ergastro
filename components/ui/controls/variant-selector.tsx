"use client"

import { CompactDropdown } from "./compact-dropdown"

interface VariantSelectorProps {
    value: string
    onValueChange: (value: string) => void
    disabled?: boolean
    ariaLabel?: string
}

const variantOptions = [
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
    { value: "outline", label: "Outline" },
    { value: "ghost", label: "Ghost" },
    { value: "destructive", label: "Destructive" },
    { value: "success", label: "Success" },
    { value: "warning", label: "Warning" },
    { value: "icon", label: "Icon" },
]

export function VariantSelector({ value, onValueChange, disabled, ariaLabel }: VariantSelectorProps) {
    return (
        <CompactDropdown
            value={value || "primary"}
            onValueChange={onValueChange}
            options={variantOptions}
            width="lg"
            disabled={disabled}
            ariaLabel={ariaLabel || "Select variant"}
        />
    )
}
