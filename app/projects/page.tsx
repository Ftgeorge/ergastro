import { projects, components } from "@/lib/component-registry"
import Link from "next/link"
import { ExternalLink, Target, Layers } from "lucide-react"

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-zinc-950 py-16 text-zinc-100">
            <div className="container mx-auto max-w-5xl px-4">
                <header className="mb-20">
                    <Link
                        href="/workshop/components"
                        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-accent transition-colors"
                    >
                        ← Workshop Inventory
                    </Link>
                    <div className="flex flex-col gap-3">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                            Real World Application
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter">
                            Projects & Case Studies
                        </h1>
                        <p className="max-w-xl text-lg text-zinc-500 leading-relaxed font-medium">
                            Mapping our theoretical components to production-ready solutions and their impact.
                        </p>
                    </div>
                </header>

                <div className="flex flex-col gap-12">
                    {projects.map((project) => (
                        <div
                            key={project.slug}
                            className="group grid grid-cols-1 overflow-hidden rounded-md border border-zinc-900 bg-zinc-900/20 md:grid-cols-5"
                        >
                            <div className="col-span-3 flex flex-col p-10">
                                <div className="mb-4 flex items-center gap-2">
                                    <span className="rounded-md bg-accent/10 px-3 py-0.5 text-[10px] font-black uppercase tracking-tight text-accent">
                                        {project.status}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-black tracking-tight mb-4">
                                    {project.name}
                                </h2>
                                <p className="text-zinc-400 mb-8 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-auto">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-zinc-100 font-bold text-xs uppercase tracking-widest">
                                            <Target size={14} className="text-accent" />
                                            The Problem
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed italic border-l-2 border-zinc-800 pl-4 py-2">
                                            "{project.problemStatement}"
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-zinc-100 font-bold text-xs uppercase tracking-widest">
                                            <Target size={14} className="text-emerald-500" />
                                            Outcome
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed">
                                            {project.outcome}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 flex flex-col border-t border-zinc-900 bg-zinc-900/50 p-10 md:border-l md:border-t-0">
                                <div className="flex items-center gap-2 text-zinc-100 font-bold text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                    <Layers size={14} className="text-accent" />
                                    Inventory Implementations
                                </div>
                                <div className="flex flex-col gap-3">
                                    {project.componentsUsed.map(compSlug => {
                                        const comp = components.find(c => c.slug === compSlug)
                                        return (
                                            <Link
                                                key={compSlug}
                                                href={`/workshop/components/${compSlug}`}
                                                className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-950 p-4 transition-all hover:border-accent/40 group/item"
                                            >
                                                <span className="text-sm font-bold text-zinc-300 group-hover/item:text-accent transition-colors">
                                                    {comp?.name || compSlug}
                                                </span>
                                                <ExternalLink size={14} className="text-zinc-600 group-hover/item:text-zinc-400" />
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
