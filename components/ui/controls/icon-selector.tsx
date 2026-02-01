"use client"

import { Dropdown } from "@/components/ui/dropdown"
import { Toggle } from "@/components/ui/toggle"
import { getAvailableIcons, AVAILABLE_ICON_PACKS } from "@/components/ui/buttons/button-workbench"

interface IconSelectorProps {
    hasIcon: boolean
    onHasIconChange: (hasIcon: boolean) => void
    iconPosition: string
    onIconPositionChange: (position: string) => void
    iconPack: string
    onIconPackChange: (pack: string) => void
    iconName: string
    onIconNameChange: (name: string) => void
    disabled?: boolean
}

const iconPositionOptions = [
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
]

const iconPackOptions = AVAILABLE_ICON_PACKS.map(pack => ({
    value: pack,
    label: pack.charAt(0).toUpperCase() + pack.slice(1)
}))

const getIconOptions = (pack: string) => {
    const availableIcons = getAvailableIcons(pack as any)
    return [
        { value: 'none', label: 'None' },
        ...availableIcons.map(icon => ({ value: icon, label: icon }))
    ]
}

export function IconSelector({
    hasIcon,
    onHasIconChange,
    iconPosition,
    onIconPositionChange,
    iconPack,
    onIconPackChange,
    iconName,
    onIconNameChange,
    disabled = false
}: IconSelectorProps) {
    return (
        <div className="space-y-0.5 relative z-50">
            {/* Has Icon Toggle */}
            <div className="group flex items-center gap-3 px-4 py-2.5 transition-all hover:bg-zinc-900/20">
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate text-zinc-300 group-hover:text-zinc-100 transition-colors">
                        hasIcon
                    </div>
                    <div className="text-[9px] font-medium text-zinc-600 truncate">
                        boolean
                    </div>
                </div>
                <Toggle
                    checked={hasIcon}
                    onCheckedChange={onHasIconChange}
                    variant="default"
                    aria-label="Toggle hasIcon"
                    disabled={disabled}
                />
            </div>

            {/* Icon Position */}
            <div className="group flex items-center gap-3 px-4 py-2.5 transition-all hover:bg-zinc-900/20">
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate text-zinc-300 group-hover:text-zinc-100 transition-colors">
                        iconPosition
                    </div>
                    <div className="text-[9px] font-medium text-zinc-600 truncate">
                        string
                    </div>
                </div>
                <Dropdown
                    value={iconPosition || "left"}
                    onValueChange={onIconPositionChange}
                    options={iconPositionOptions}
                    variant="default"
                    disabled={!hasIcon || disabled}
                    aria-label="Select icon position"
                />
            </div>

            {/* Icon Pack */}
            <div className="group flex items-center gap-3 px-4 py-2.5 transition-all hover:bg-zinc-900/20">
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate text-zinc-300 group-hover:text-zinc-100 transition-colors">
                        iconPack
                    </div>
                    <div className="text-[9px] font-medium text-zinc-600 truncate">
                        string
                    </div>
                </div>
                <Dropdown
                    value={iconPack || "lucide"}
                    onValueChange={onIconPackChange}
                    options={iconPackOptions}
                    variant="default"
                    disabled={!hasIcon || disabled}
                    aria-label="Select icon pack"
                />
            </div>

            {/* Icon Name */}
            <div className="group flex items-center gap-3 px-4 py-2.5 transition-all hover:bg-zinc-900/20">
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate text-zinc-300 group-hover:text-zinc-100 transition-colors">
                        iconName
                    </div>
                    <div className="text-[9px] font-medium text-zinc-600 truncate">
                        string
                    </div>
                </div>
                <Dropdown
                    value={iconName || "none"}
                    onValueChange={(value: string) => {
                        onIconNameChange(value)
                    }}
                    options={getIconOptions(iconPack)}
                    variant="default"
                    disabled={!hasIcon || disabled}
                    aria-label="Select icon name"
                />
            </div>
        </div>
    )
}
