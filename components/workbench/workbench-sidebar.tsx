"use client"

import { ComponentEntry, components } from "@/lib/component-registry"
import { cn } from "@/lib/utils"
import { 
    ChevronLeft, ChevronRight, ChevronDown, ChevronUp, 
    Search, Settings, Menu, X, HelpCircle, 
    CheckCircle2, AlertCircle, Wrench, 
    Heart, Star, Download, Upload,
    Plus, Minus, Check, Copy, Trash, Edit, 
    Eye, EyeOff, Lock, Unlock, Bell, Mail, 
    User, Users, Home, Folder, File, 
    Calendar, Clock, Play, Pause, Sparkles
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Dropdown } from "../ui/dropdown"
import { ComponentNode, useWorkbenchStore } from "@/lib/workbench-store"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Logo from "../ui/logo"
import { useTour } from "../tour/tour-provider"
import { CompactToggle, CompactInput, PropertyRow, VariantSelector, SizeSelector, IconSelector, AnimationSelector, CollapsibleSection } from "@/components/ui/controls"
import { motion } from "framer-motion"
import React from "react"

interface ComponentProp {
    name: string
    type: string
    description?: string
}

const statusIcons: Record<string, LucideIcon> = {
    "production-ready": CheckCircle2,
    "experimental": Wrench,
    "in-progress": AlertCircle,
}

type Framework = "react" | "react-native" | "flutter"

// Comprehensive icon registry for better organization
const iconOptions = [
    { value: 'none', label: 'No Icon', icon: null, category: 'None' },
    { value: 'Search', label: 'Search', icon: Search, category: 'Actions' },
    { value: 'Menu', label: 'Menu', icon: Menu, category: 'Navigation' },
    { value: 'X', label: 'Close', icon: X, category: 'Actions' },
    { value: 'ChevronLeft', label: 'Chevron Left', icon: ChevronLeft, category: 'Navigation' },
    { value: 'ChevronRight', label: 'Chevron Right', icon: ChevronRight, category: 'Navigation' },
    { value: 'ChevronDown', label: 'Chevron Down', icon: ChevronDown, category: 'Navigation' },
    { value: 'ChevronUp', label: 'Chevron Up', icon: ChevronUp, category: 'Navigation' },
    { value: 'Heart', label: 'Heart', icon: Heart, category: 'Social' },
    { value: 'Star', label: 'Star', icon: Star, category: 'Social' },
    { value: 'Download', label: 'Download', icon: Download, category: 'Actions' },
    { value: 'Upload', label: 'Upload', icon: Upload, category: 'Actions' },
    { value: 'Settings', label: 'Settings', icon: Settings, category: 'Actions' },
    { value: 'Plus', label: 'Plus', icon: Plus, category: 'Actions' },
    { value: 'Minus', label: 'Minus', icon: Minus, category: 'Actions' },
    { value: 'Check', label: 'Check', icon: Check, category: 'Status' },
    { value: 'Copy', label: 'Copy', icon: Copy, category: 'Actions' },
    { value: 'Trash', label: 'Trash', icon: Trash, category: 'Actions' },
    { value: 'Edit', label: 'Edit', icon: Edit, category: 'Actions' },
    { value: 'Eye', label: 'Eye', icon: Eye, category: 'Actions' },
    { value: 'EyeOff', label: 'Eye Off', icon: EyeOff, category: 'Actions' },
    { value: 'Lock', label: 'Lock', icon: Lock, category: 'Security' },
    { value: 'Unlock', label: 'Unlock', icon: Unlock, category: 'Security' },
    { value: 'Bell', label: 'Bell', icon: Bell, category: 'Social' },
    { value: 'Mail', label: 'Mail', icon: Mail, category: 'Social' },
    { value: 'User', label: 'User', icon: User, category: 'Users' },
    { value: 'Users', label: 'Users', icon: Users, category: 'Users' },
    { value: 'Home', label: 'Home', icon: Home, category: 'Navigation' },
    { value: 'Folder', label: 'Folder', icon: Folder, category: 'Files' },
    { value: 'File', label: 'File', icon: File, category: 'Files' },
    { value: 'Calendar', label: 'Calendar', icon: Calendar, category: 'Time' },
    { value: 'Clock', label: 'Clock', icon: Clock, category: 'Time' },
    { value: 'Play', label: 'Play', icon: Play, category: 'Media' },
    { value: 'Pause', label: 'Pause', icon: Pause, category: 'Media' },
]

export function WorkbenchSidebar() {
    const [searchQuery, setSearchQuery] = useState("")
    const [framework, setFramework] = useState<Framework>("react")
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['properties', 'animation']))
    const { startWorkbenchTour } = useTour()
    const searchInputRef = useRef<HTMLInputElement>(null)
    const scrollableRef = useRef<HTMLDivElement>(null)

    // Workbench store
    const {
        currentScene,
        setCurrentScene,
        createScene,
        addAnimation,
        animationPresets
    } = useWorkbenchStore()

    // Initialize with a default scene
    useEffect(() => {
        if (!currentScene) {
            const rootNode: ComponentNode = {
                id: 'root',
                type: 'button',
                props: {
                    variant: 'primary',
                    size: 'md',
                    isLoading: false,
                    fullWidth: false,
                    children: 'Button',
                    leftIcon: null,
                    rightIcon: null
                },
                children: [],
                metadata: {
                    version: "",
                    warnings: undefined,
                    presets: undefined,
                    category: undefined
                }
            }

            createScene('button', rootNode)

            const animation = {
                ...animationPresets['fade-in'],
                id: crypto.randomUUID(),
                targetComponentId: rootNode.id
            }
            addAnimation(animation)
        }
    }, [currentScene, createScene, addAnimation, animationPresets])

    const selectedComponent = currentScene 
        ? components.find((c: ComponentEntry) => c.id === currentScene.root.type) 
        : null

    const availableComponents = useMemo(
        () => components.filter((c: ComponentEntry) => c.status === "production-ready"),
        []
    )

    const filteredComponents = useMemo(() => {
        if (!searchQuery) return availableComponents
        const query = searchQuery.toLowerCase()
        return availableComponents.filter(c =>
            c.name.toLowerCase().includes(query) ||
            c.slug.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query) ||
            c.tags?.some(t => t.toLowerCase().includes(query))
        )
    }, [searchQuery, availableComponents])

    const handleComponentChange = (componentId: string) => {
        const component = components.find((c: ComponentEntry) => c.id === componentId)
        if (component && currentScene) {
            let defaultProps: Record<string, unknown> = {}

            if (componentId === "button") {
                defaultProps = {
                    variant: "primary",
                    size: "md",
                    isLoading: false,
                    fullWidth: false,
                    children: "Button",
                    leftIcon: null,
                    rightIcon: null
                }
            } else if (componentId === "basic-card") {
                defaultProps = {
                    title: "Card Title",
                    description: "Card description goes here.",
                    children: null
                }
            }

            const updatedRootNode = {
                ...currentScene.root,
                type: componentId,
                props: defaultProps
            }

            setCurrentScene({
                ...currentScene,
                root: updatedRootNode,
                metadata: {
                    ...currentScene.metadata,
                    updatedAt: new Date().toISOString()
                }
            })
        }
    }

    const handlePropChange = (propName: string, value: unknown) => {
        if (currentScene) {
            const updatedRootNode = {
                ...currentScene.root,
                props: {
                    ...currentScene.root.props,
                    [propName]: value
                }
            }

            setCurrentScene({
                ...currentScene,
                root: updatedRootNode,
                metadata: {
                    ...currentScene.metadata,
                    updatedAt: new Date().toISOString()
                }
            })
        }
    }

    const handleAnimationChange = (animationPresetId: string) => {
        if (currentScene) {
            const filteredAnimations = currentScene.animations.filter(
                anim => anim.targetComponentId !== currentScene.root.id
            )

            const newAnimation = {
                ...animationPresets[animationPresetId],
                id: animationPresetId,
                targetComponentId: currentScene.root.id
            }

            const updatedScene = {
                ...currentScene,
                animations: [...filteredAnimations, newAnimation],
                metadata: {
                    ...currentScene.metadata,
                    updatedAt: new Date().toISOString()
                }
            }

            setCurrentScene(updatedScene)
        }
    }

    const getCurrentAnimation = () => {
        if (!currentScene) return null
        return currentScene.animations.find(anim => anim.targetComponentId === currentScene.root.id)
    }

    const getIconComponent = (iconName: string) => {
        const iconOption = iconOptions.find(opt => opt.value === iconName)
        return iconOption?.icon || null
    }

    const toggleSection = (section: string) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev)
            if (newSet.has(section)) {
                newSet.delete(section)
            } else {
                newSet.add(section)
            }
            return newSet
        })
    }

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
                e.preventDefault()
                searchInputRef.current?.focus()
                return
            }

            if (e.key === "Escape") {
                setSearchQuery("")
                searchInputRef.current?.blur()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return (
        <aside
            id="dexter-sidebar"
            className="flex h-full flex-col bg-zinc-950 border-r border-zinc-900 w-80"
            role="navigation"
            aria-label="Workbench sidebar"
        >
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 border-b border-zinc-900 bg-zinc-950 p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <Link href="/workshop" className="flex items-center gap-3">
                        <Logo />
                    </Link>
                    <motion.button
                        onClick={() => startWorkbenchTour()}
                        className="rounded-full border border-zinc-800 bg-zinc-900/50 p-2 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        aria-label="Start workbench tour"
                    >
                        <HelpCircle size={14} />
                    </motion.button>
                </div>

                {/* Framework Switcher */}
                <div id="dexter-stack-switcher" className="w-full">
                    <div className="overflow-x-auto rounded-md border border-zinc-900 bg-zinc-900/30 p-1 [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex min-w-max items-center gap-1 whitespace-nowrap">
                            {(['react', 'react-native', 'flutter'] as Framework[]).map((fw) => (
                                <button
                                    key={fw}
                                    type="button"
                                    onClick={() => setFramework(fw)}
                                    className={cn(
                                        "shrink-0 rounded-sm px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all",
                                        framework === fw 
                                            ? "bg-zinc-800 text-accent" 
                                            : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                >
                                    {fw === 'react-native' ? 'React Native' : fw.charAt(0).toUpperCase() + fw.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Component Search & Selector */}
                <div className="space-y-3">
                    <div className="relative group" role="search">
                        <Search 
                            size={16} 
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-accent transition-colors" 
                        />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-md border border-zinc-900 bg-zinc-900/30 py-2.5 pl-10 pr-10 text-xs font-medium text-zinc-100 outline-none ring-accent/10 transition-all focus:border-accent/40 focus:bg-zinc-900/50 focus:ring-2"
                            aria-label="Search components"
                        />
                        <div 
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-[9px] font-black text-zinc-600" 
                            aria-hidden="true"
                        >
                            /
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-600" role="status" aria-live="polite">
                            {filteredComponents.length} Component{filteredComponents.length !== 1 ? 's' : ''}
                        </div>
                        {selectedComponent && (
                            <div className={cn(
                                "flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest",
                                selectedComponent.status === "production-ready" && "text-emerald-500",
                                selectedComponent.status === "experimental" && "text-amber-500",
                                selectedComponent.status === "in-progress" && "text-blue-500"
                            )}>
                                {React.createElement(statusIcons[selectedComponent.status] || AlertCircle, { size: 10 })}
                                <span>{selectedComponent.status.replace('-', ' ')}</span>
                            </div>
                        )}
                    </div>

                    <Dropdown
                        value={currentScene?.root.type || ''}
                        onValueChange={handleComponentChange}
                        options={filteredComponents.map((c: ComponentEntry) => ({ 
                            value: c.id, 
                            label: c.name 
                        }))}
                        aria-label="Select component"
                    />
                </div>
            </div>

            {/* Scrollable Content */}
            <div
                ref={scrollableRef}
                className="flex-1 overflow-y-auto"
                data-scrollable-content
            >
                {framework !== "react" ? (
                    <div className="p-8 text-center">
                        <Sparkles className="mx-auto mb-3 text-zinc-800" size={32} />
                        <p className="text-xs font-bold text-zinc-600 mb-1">Framework support coming soon</p>
                        <p className="text-[10px] text-zinc-700">Vue, React Native, and Flutter implementations</p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {/* Properties Section */}
                        <CollapsibleSection
                            id="properties"
                            title="Properties"
                            isExpanded={expandedSections.has('properties')}
                            onToggle={() => toggleSection('properties')}
                            count={selectedComponent?.usage?.props?.length}
                        >
                            {selectedComponent?.usage?.props?.length ? (
                                <div className="space-y-0.5">
                                    {selectedComponent.usage.props.map((prop: ComponentProp) => {
                                        const currentValue = currentScene?.root.props[prop.name]
                                        const isBoolean = prop.type.includes("boolean")
                                        const isVariant = prop.name === "variant"
                                        const isSize = prop.name === "size"
                                        const isChildren = prop.name === "children"

                                        // Handle icon-related props with the IconSelector component
                                        if (prop.name === "hasIcon" || prop.name === "iconPosition" || 
                                            prop.name === "iconPack" || prop.name === "iconName" ||
                                            prop.name === "leftIcon" || prop.name === "rightIcon") {
                                            return null // These are handled by IconSelector
                                        }

                                        return (
                                            <PropertyRow key={prop.name} name={prop.name} type={prop.type}>
                                                {isBoolean ? (
                                                    <CompactToggle
                                                        checked={Boolean(currentValue)}
                                                        onCheckedChange={(checked) => handlePropChange(prop.name, checked)}
                                                        size="md"
                                                        color="accent"
                                                        ariaLabel={`Toggle ${prop.name}`}
                                                    />
                                                ) : isVariant ? (
                                                    <VariantSelector
                                                        value={(currentValue as string) || "primary"}
                                                        onValueChange={(value) => handlePropChange(prop.name, value)}
                                                        ariaLabel={`Select ${prop.name}`}
                                                    />
                                                ) : isSize ? (
                                                    <SizeSelector
                                                        value={(currentValue as string) || "md"}
                                                        onValueChange={(value) => handlePropChange(prop.name, value)}
                                                        ariaLabel={`Select ${prop.name}`}
                                                    />
                                                ) : isChildren ? (
                                                    <CompactInput
                                                        value={(currentValue as string) || ""}
                                                        onChange={(value) => handlePropChange(prop.name, value)}
                                                        placeholder="Button text"
                                                        width="md"
                                                        ariaLabel={`Enter ${prop.name}`}
                                                    />
                                                ) : (
                                                    <CompactInput
                                                        value={(currentValue as string) || ""}
                                                        onChange={(value) => handlePropChange(prop.name, value)}
                                                        placeholder="Value"
                                                        width="md"
                                                        ariaLabel={`Enter ${prop.name}`}
                                                    />
                                                )}
                                            </PropertyRow>
                                        )
                                    })}
                                    
                                    {/* Add IconSelector if the component has icon-related props */}
                                    {selectedComponent.usage.props.some(prop => 
                                        prop.name.startsWith("icon") || prop.name === "hasIcon" || 
                                        prop.name === "leftIcon" || prop.name === "rightIcon"
                                    ) && (
                                        <IconSelector
                                            hasIcon={Boolean(currentScene?.root.props.hasIcon)}
                                            onHasIconChange={(checked) => {
                                                handlePropChange("hasIcon", checked)
                                                if (!checked) {
                                                    handlePropChange("iconPosition", "left")
                                                    handlePropChange("iconPack", "lucide")
                                                    handlePropChange("iconName", "none")
                                                }
                                            }}
                                            iconPosition={(currentScene?.root.props.iconPosition as string) || "left"}
                                            onIconPositionChange={(value) => handlePropChange("iconPosition", value)}
                                            iconPack={(currentScene?.root.props.iconPack as string) || "lucide"}
                                            onIconPackChange={(value) => {
                                                handlePropChange("iconPack", value)
                                                handlePropChange("iconName", "none")
                                            }}
                                            iconName={(currentScene?.root.props.iconName as string) || "none"}
                                            onIconNameChange={(value) => {
                                                const iconComponent = value === 'none' ? null : getIconComponent(value)
                                                handlePropChange("iconName", value)
                                                const position = currentScene?.root.props.iconPosition || "left"
                                                if (position === "left") {
                                                    handlePropChange("leftIcon", iconComponent)
                                                    handlePropChange("rightIcon", null)
                                                } else {
                                                    handlePropChange("rightIcon", iconComponent)
                                                    handlePropChange("leftIcon", null)
                                                }
                                            }}
                                            leftIcon={currentScene?.root.props.leftIcon as LucideIcon | null}
                                            onLeftIconChange={(icon) => handlePropChange("leftIcon", icon)}
                                            rightIcon={currentScene?.root.props.rightIcon as LucideIcon | null}
                                            onRightIconChange={(icon) => handlePropChange("rightIcon", icon)}
                                            getIconComponent={getIconComponent}
                                        />
                                    )}
                                </div>
                            ) : (
                                <div className="px-4 py-8 text-center">
                                    <p className="text-xs text-zinc-600">No properties available</p>
                                </div>
                            )}
                        </CollapsibleSection>

                        {/* Animation Section */}
                        <CollapsibleSection
                            id="animation"
                            title="Animation"
                            isExpanded={expandedSections.has('animation')}
                            onToggle={() => toggleSection('animation')}
                        >
                            <AnimationSelector
                                animation={getCurrentAnimation() || null}
                                onAnimationChange={(value) => {
                                    if (value === 'none') {
                                        if (currentScene) {
                                            const filteredAnimations = currentScene.animations.filter(
                                                anim => anim.targetComponentId !== currentScene.root.id
                                            )
                                            setCurrentScene({
                                                ...currentScene,
                                                animations: filteredAnimations,
                                                metadata: {
                                                    ...currentScene.metadata,
                                                    updatedAt: new Date().toISOString()
                                                }
                                            })
                                        }
                                    } else {
                                        handleAnimationChange(value)
                                    }
                                }}
                            />
                        </CollapsibleSection>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t border-zinc-900 bg-zinc-950 p-4">
                <Link
                    href="/workshop/components"
                    className="flex items-center justify-between rounded-md border border-zinc-900 bg-zinc-900/30 px-4 py-3 transition-all hover:border-accent/40 hover:bg-zinc-900/50 group"
                >
                    <div className="flex items-center gap-3">
                        <div className="rounded-md bg-zinc-800 p-1.5 transition-colors group-hover:bg-zinc-700">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                            </svg>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors">Workshop</span>
                            <span className="text-[9px] font-medium text-zinc-600">Components Gallery</span>
                        </div>
                    </div>
                    <ChevronRight size={14} className="text-zinc-700 transition-all group-hover:text-zinc-500 group-hover:translate-x-0.5" />
                </Link>
            </div>
        </aside>
    )
}