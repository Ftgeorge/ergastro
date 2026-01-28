"use client"

import { useState, useMemo } from "react"
import { components, ComponentStatus, projects } from "@/lib/component-registry"
import { WorkshopCard } from "@/components/workshop/workshop-card"
import { cn } from "@/lib/utils"
import { Search, Filter, Layers, SortDesc, Clock, Zap, Star, Repeat, FlaskConical } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type SortOption = "recency" | "stability" | "reuse"

export function WorkshopGallery() {
    const [activeCategory, setActiveCategory] = useState<string>("All")
    const [activeStatus, setActiveStatus] = useState<ComponentStatus | "All">("All")
    const [activeProject, setActiveProject] = useState<string>("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortOption>("recency")

    const categories = ["All", ...Array.from(new Set(components.map((c) => c.category)))]
    const projectList = ["All", ...projects.map(p => p.slug)]
    const statuses: (ComponentStatus | "All")[] = ["All", "production-ready", "experimental", "in-progress"]

    const filteredComponents = useMemo(() => {
        return components
            .filter(c => {
                const matchesCategory = activeCategory === "All" || c.category === activeCategory
                const matchesStatus = activeStatus === "All" || c.status === activeStatus
                const matchesProject = activeProject === "All" || (c.relatedProjects?.includes(activeProject) || false)
                const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                return matchesCategory && matchesStatus && matchesSearch && matchesProject
            })
            .sort((a, b) => {
                if (sortBy === "recency") return b.updatedAt.localeCompare(a.updatedAt)
                if (sortBy === "reuse") return b.reuseCount - a.reuseCount
                if (sortBy === "stability") {
                    const order = { "production-ready": 0, "experimental": 1, "in-progress": 2 }
                    return order[a.status] - order[b.status]
                }
                return 0
            })
    }, [activeCategory, activeStatus, activeProject, searchQuery, sortBy])

    return (
        <div className="flex flex-col gap-12 lg:flex-row">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex flex-col gap-10">
                {/* Search Input - Search-first UX */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Quick Search</h3>
                    <div className="relative group">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-accent transition-colors" />
                        <input
                            type="text"
                            placeholder="Find implementation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-zinc-900 bg-zinc-900/50 py-3 pl-12 pr-4 text-xs font-bold text-zinc-200 outline-none ring-accent/20 transition-all focus:border-accent focus:ring-4"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Categories</h3>
                    <div className="flex flex-col gap-1">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "flex items-center justify-between rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-all",
                                    activeCategory === category
                                        ? "bg-zinc-900 text-accent"
                                        : "text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300"
                                )}
                            >
                                {category}
                                {activeCategory === category && <div className="h-1 w-1 rounded-full bg-accent" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">System Status</h3>
                    <div className="flex flex-col gap-1">
                        {statuses.map((status) => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-all",
                                    activeStatus === status
                                        ? "bg-zinc-900 text-accent"
                                        : "text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300"
                                )}
                            >
                                <div className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    status === "production-ready" ? "bg-emerald-500" :
                                        status === "experimental" ? "bg-amber-500" :
                                            status === "in-progress" ? "bg-blue-500" : "bg-zinc-800"
                                )} />
                                {status.replace("-", " ")}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Contextual Usage</h3>
                    <select
                        value={activeProject}
                        onChange={(e) => setActiveProject(e.target.value)}
                        className="w-full rounded-xl border border-zinc-900 bg-zinc-900/50 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400 outline-none appearance-none focus:border-accent"
                    >
                        <option value="All">All Applied Projects</option>
                        {projects.map(p => (
                            <option key={p.slug} value={p.slug}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </aside>

            {/* Grid Content */}
            <div className="flex-1 flex flex-col gap-8">
                {/* Sort Controls */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-900 pb-6">
                    <div className="text-xs font-bold text-zinc-500">
                        Showing <span className="text-zinc-100">{filteredComponents.length}</span> System Patterns
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Sort By:</span>
                        <div className="flex gap-1 rounded-lg bg-zinc-900/50 p-1">
                            {[
                                { id: "recency", label: "Recent", icon: Clock },
                                { id: "stability", label: "Stable", icon: Star },
                                { id: "reuse", label: "Reuse", icon: Repeat }
                            ].map(opt => {
                                const Icon = opt.icon
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => setSortBy(opt.id as SortOption)}
                                        className={cn(
                                            "flex items-center gap-2 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all",
                                            sortBy === opt.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-600 hover:text-zinc-400"
                                        )}
                                    >
                                        <Icon size={10} />
                                        {opt.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                        {filteredComponents.map((component) => (
                            <motion.div
                                layout
                                key={component.slug}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <WorkshopCard
                                    name={component.name}
                                    slug={component.slug}
                                    category={component.category}
                                    description={component.description}
                                    preview={<component.component />}
                                    status={component.status}
                                    tags={component.tags}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredComponents.length === 0 && (
                        <div className="col-span-full flex h-80 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-900 bg-zinc-900/10 text-zinc-700">
                            <FlaskConical size={48} className="mb-6 opacity-10" />
                            <p className="text-center text-xs font-black uppercase tracking-[0.3em]">No system patterns match your search criteria</p>
                            <button
                                onClick={() => {
                                    setActiveCategory("All");
                                    setActiveStatus("All");
                                    setSearchQuery("");
                                    setActiveProject("All");
                                }}
                                className="mt-6 text-[10px] font-black uppercase tracking-widest text-accent hover:underline decoration-2 underline-offset-8"
                            >
                                Reset Workshop Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
