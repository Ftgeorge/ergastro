"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { components, ComponentStatus } from "@/lib/component-registry"
import { WorkshopCard } from "@/components/workshop/workshop-card"
import { ComponentListItem } from "@/components/workshop/component-list-item"
import { cn } from "@/lib/utils"
import { Search, Filter, SortDesc, FlaskConical, LayoutGrid, List } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type SortOption = "recency" | "stability" | "reuse" | "alphabetical"
type ViewMode = "list" | "grid"

export function WorkshopGallery() {
    const [activeCategory, setActiveCategory] = useState<string>("All")
    const [activeStatus, setActiveStatus] = useState<ComponentStatus | "All">("All")
    const [activeProject, setActiveProject] = useState<string>("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortOption>("recency")
    const [viewMode, setViewMode] = useState<ViewMode>(() => {
        if (typeof window !== "undefined") {
            const savedView = localStorage.getItem("Dextr-view-mode") as ViewMode
            return savedView || "list"
        }
        return "list"
    })
    const searchInputRef = useRef<HTMLInputElement>(null)

    const toggleView = (mode: ViewMode) => {
        setViewMode(mode)
        localStorage.setItem("Dextr-view-mode", mode)
    }

    // Keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
                e.preventDefault()
                searchInputRef.current?.focus()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    const categories = ["All", ...Array.from(new Set(components.map((c) => c.category)))]
    const statuses: (ComponentStatus | "All")[] = ["All", "production-ready", "experimental", "in-progress"]

    const filteredComponents = useMemo(() => {
        return components
            .filter(c => {
                const matchesCategory = activeCategory === "All" || c.category === activeCategory
                const matchesStatus = activeStatus === "All" || c.status === activeStatus
                const matchesProject = activeProject === "All" || (c.relatedProjects?.includes(activeProject) || false)
                const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                return matchesCategory && matchesStatus && matchesSearch && matchesProject
            })
            .sort((a, b) => {
                if (sortBy === "recency") return b.updatedAt.localeCompare(a.updatedAt)
                if (sortBy === "reuse") return b.reuseCount - a.reuseCount
                if (sortBy === "alphabetical") return a.name.localeCompare(b.name)
                if (sortBy === "stability") {
                    const order = { "production-ready": 0, "experimental": 1, "in-progress": 2 }
                    return order[a.status] - order[b.status]
                }
                return 0
            })
    }, [activeCategory, activeStatus, activeProject, searchQuery, sortBy])

    return (
        <div className="flex flex-col gap-8 lg:gap-12">
            {/* Search and Navigation - Developer Tool Header */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-2xl group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-accent transition-colors" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Find implementation... (press / to focus)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-2xl border border-zinc-900 bg-zinc-900/30 py-4 pl-12 pr-12 text-sm font-medium text-zinc-100 outline-none ring-accent/10 transition-all focus:border-accent/40 focus:bg-zinc-900/50 focus:ring-4"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-[10px] font-black text-zinc-600">
                            /
                        </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-zinc-900 bg-zinc-900/30 p-1">
                        <button
                            onClick={() => toggleView("list")}
                            className={cn(
                                "flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-all",
                                viewMode === "list" ? "bg-zinc-800 text-accent" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <List size={14} />
                            List
                        </button>
                        <button
                            onClick={() => toggleView("grid")}
                            className={cn(
                                "flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-all",
                                viewMode === "grid" ? "bg-zinc-800 text-accent" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            <LayoutGrid size={14} />
                            Grid
                        </button>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-4 border-b border-zinc-900 pb-6">
                    <div className="flex items-center gap-4 pr-4 border-r border-zinc-900">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 flex items-center gap-2">
                            <Filter size={12} />
                            Status:
                        </span>
                        <div className="flex gap-1">
                            {statuses.map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setActiveStatus(status)}
                                    className={cn(
                                        "rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all",
                                        activeStatus === status ? "bg-zinc-800 text-accent" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                                    )}
                                >
                                    {status.split("-")[0]}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Category:</span>
                        <select
                            value={activeCategory}
                            onChange={(e) => setActiveCategory(e.target.value)}
                            className="bg-transparent text-[10px] font-black uppercase tracking-widest text-zinc-400 outline-none cursor-pointer hover:text-zinc-200"
                        >
                            {categories.map(c => (
                                <option key={c} value={c} className="bg-zinc-950 font-sans">{c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 flex items-center gap-2">
                            <SortDesc size={12} />
                            Sort:
                        </span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="bg-transparent text-[10px] font-black uppercase tracking-widest text-zinc-400 outline-none cursor-pointer hover:text-zinc-200"
                        >
                            <option value="recency" className="bg-zinc-950 font-sans">Recently Updated</option>
                            <option value="stability" className="bg-zinc-950 font-sans">Stable First</option>
                            <option value="reuse" className="bg-zinc-950 font-sans">Most Reused</option>
                            <option value="alphabetical" className="bg-zinc-950 font-sans">Alphabetical</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 px-4">
                    <span>{filteredComponents.length} Implementations</span>
                    {viewMode === "list" && (
                        <div className="hidden sm:flex items-center gap-4">
                            <span className="w-24 text-left">Category</span>
                            <span className="w-32 text-left">Status</span>
                            <span className="w-20 text-center">Usage</span>
                            <span className="w-24 text-right">Updated</span>
                            <span className="w-4"></span>
                        </div>
                    )}
                </div>

                <div className={cn(
                    "min-h-100",
                    viewMode === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col rounded-2xl border border-zinc-900 overflow-hidden"
                )}>
                    <AnimatePresence mode="popLayout">
                        {filteredComponents.map((component) => (
                            <motion.div
                                layout
                                key={component.slug}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                {viewMode === "grid" ? (
                                    <WorkshopCard
                                        name={component.name}
                                        slug={component.slug}
                                        category={component.category}
                                        description={component.description}
                                        preview={<component.component />}
                                        status={component.status}
                                        tags={component.tags}
                                    />
                                ) : (
                                    <ComponentListItem
                                        name={component.name}
                                        slug={component.slug}
                                        category={component.category}
                                        status={component.status}
                                        reuseCount={component.reuseCount}
                                        updatedAt={component.updatedAt}
                                        description={component.description}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredComponents.length === 0 && (
                        <div className="flex h-80 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-900 bg-zinc-900/10 text-zinc-700">
                            <FlaskConical size={48} className="mb-6 opacity-10" />
                            <p className="text-center text-xs font-black uppercase tracking-[0.3em]">No implementations match criteria</p>
                            <button
                                onClick={() => {
                                    setActiveCategory("All");
                                    setActiveStatus("All");
                                    setSearchQuery("");
                                    setActiveProject("All");
                                }}
                                className="mt-6 text-[10px] font-black uppercase tracking-widest text-accent hover:underline decoration-2 underline-offset-8"
                            >
                                Reset Workshop
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
