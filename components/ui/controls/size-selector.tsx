"use client"

import { CompactDropdown } from "./compact-dropdown"

interface SizeSelectorProps {
    value: string
    onValueChange: (value: string) => void
    disabled?: boolean
    ariaLabel?: string
}

const sizeOptions = [
    { value: "xs", label: "XS" },
    { value: "sm", label: "SM" },
    { value: "md", label: "MD" },
    { value: "lg", label: "LG" },
    { value: "xl", label: "XL" },
]

export function SizeSelector({ value, onValueChange, disabled, ariaLabel }: SizeSelectorProps) {
    return (
        <CompactDropdown
            value={value || "md"}
            onValueChange={onValueChange}
            options={sizeOptions}
            width="sm"
            disabled={disabled}
            ariaLabel={ariaLabel || "Select size"}
        />
    )
}
