"use client"

import { CompactDropdown } from "./compact-dropdown"
import { CompactToggle } from "./compact-toggle"
import { LucideIcon } from "lucide-react"

interface IconSelectorProps {
    hasIcon: boolean
    onHasIconChange: (hasIcon: boolean) => void
    iconPosition: string
    onIconPositionChange: (position: string) => void
    iconPack: string
    onIconPackChange: (pack: string) => void
    iconName: string
    onIconNameChange: (name: string) => void
    leftIcon: LucideIcon | null
    onLeftIconChange: (icon: LucideIcon | null) => void
    rightIcon: LucideIcon | null
    onRightIconChange: (icon: LucideIcon | null) => void
    getIconComponent: (iconName: string) => LucideIcon | null
    disabled?: boolean
}

const iconPositionOptions = [
    { value: "left", label: "Left" },
    { value: "right", label: "Right" },
]

const iconPackOptions = [
    { value: "lucide", label: "Lucide" },
    { value: "fontawesome", label: "FA" },
    { value: "heroicons", label: "Hero" },
    { value: "feather", label: "Feather" },
]

const iconOptions = [
    { value: 'none', label: 'None' },
    { value: 'Search', label: 'Search' },
    { value: 'Menu', label: 'Menu' },
    { value: 'X', label: 'Close' },
    { value: 'ChevronLeft', label: 'Chevron Left' },
    { value: 'ChevronRight', label: 'Chevron Right' },
    { value: 'ChevronDown', label: 'Chevron Down' },
    { value: 'ChevronUp', label: 'Chevron Up' },
    { value: 'Heart', label: 'Heart' },
    { value: 'Star', label: 'Star' },
    { value: 'Download', label: 'Download' },
    { value: 'Upload', label: 'Upload' },
    { value: 'Settings', label: 'Settings' },
    { value: 'Plus', label: 'Plus' },
    { value: 'Minus', label: 'Minus' },
    { value: 'Check', label: 'Check' },
    { value: 'Copy', label: 'Copy' },
    { value: 'Trash', label: 'Trash' },
    { value: 'Edit', label: 'Edit' },
    { value: 'Eye', label: 'Eye' },
    { value: 'EyeOff', label: 'Eye Off' },
    { value: 'Lock', label: 'Lock' },
    { value: 'Unlock', label: 'Unlock' },
    { value: 'Bell', label: 'Bell' },
    { value: 'Mail', label: 'Mail' },
    { value: 'User', label: 'User' },
    { value: 'Users', label: 'Users' },
    { value: 'Home', label: 'Home' },
    { value: 'Folder', label: 'Folder' },
    { value: 'File', label: 'File' },
    { value: 'Calendar', label: 'Calendar' },
    { value: 'Clock', label: 'Clock' },
    { value: 'Play', label: 'Play' },
    { value: 'Pause', label: 'Pause' },
]

export function IconSelector({
    hasIcon,
    onHasIconChange,
    iconPosition,
    onIconPositionChange,
    iconPack,
    onIconPackChange,
    iconName,
    onIconNameChange,
    leftIcon,
    onLeftIconChange,
    rightIcon,
    onRightIconChange,
    getIconComponent,
    disabled = false
}: IconSelectorProps) {
    return (
        <div className="space-y-0.5">
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
                <CompactToggle
                    checked={hasIcon}
                    onCheckedChange={onHasIconChange}
                    size="md"
                    color="emerald"
                    ariaLabel="Toggle hasIcon"
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
                <CompactDropdown
                    value={iconPosition || "left"}
                    onValueChange={onIconPositionChange}
                    options={iconPositionOptions}
                    width="sm"
                    disabled={!hasIcon || disabled}
                    ariaLabel="Select icon position"
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
                <CompactDropdown
                    value={iconPack || "lucide"}
                    onValueChange={onIconPackChange}
                    options={iconPackOptions}
                    width="md"
                    disabled={!hasIcon || disabled}
                    ariaLabel="Select icon pack"
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
                <CompactDropdown
                    value={iconName || "none"}
                    onValueChange={(value) => {
                        const iconComponent = value === 'none' ? null : getIconComponent(value)
                        onIconNameChange(value)
                        const position = iconPosition || "left"
                        if (position === "left") {
                            onLeftIconChange(iconComponent)
                            onRightIconChange(null)
                        } else {
                            onRightIconChange(iconComponent)
                            onLeftIconChange(null)
                        }
                    }}
                    options={iconOptions}
                    width="md"
                    disabled={!hasIcon || disabled}
                    ariaLabel="Select icon name"
                />
            </div>

            {/* Left Icon */}
            <div className="group flex items-center gap-3 px-4 py-2.5 transition-all hover:bg-zinc-900/20">
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate text-zinc-300 group-hover:text-zinc-100 transition-colors">
                        leftIcon
                    </div>
                    <div className="text-[9px] font-medium text-zinc-600 truncate">
                        LucideIcon
                    </div>
                </div>
                <CompactDropdown
                    value={leftIcon ? 'selected' : 'none'}
                    onValueChange={(value) => {
                        const iconComponent = value === 'none' ? null : getIconComponent('Search')
                        onLeftIconChange(iconComponent)
                    }}
                    options={iconOptions.slice(0, 8)}
                    width="md"
                    disabled={disabled}
                    ariaLabel="Select left icon"
                />
            </div>

            {/* Right Icon */}
            <div className="group flex items-center gap-3 px-4 py-2.5 transition-all hover:bg-zinc-900/20">
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate text-zinc-300 group-hover:text-zinc-100 transition-colors">
                        rightIcon
                    </div>
                    <div className="text-[9px] font-medium text-zinc-600 truncate">
                        LucideIcon
                    </div>
                </div>
                <CompactDropdown
                    value={rightIcon ? 'selected' : 'none'}
                    onValueChange={(value) => {
                        const iconComponent = value === 'none' ? null : getIconComponent('Search')
                        onRightIconChange(iconComponent)
                    }}
                    options={iconOptions.slice(0, 8)}
                    width="md"
                    disabled={disabled}
                    ariaLabel="Select right icon"
                />
            </div>
        </div>
    )
}
