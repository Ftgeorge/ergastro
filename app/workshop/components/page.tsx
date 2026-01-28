import { WorkshopGallery } from "@/components/workshop/workshop-gallery"
import Link from "next/link"

export default function WorkshopPage() {
    return (
        <div className="min-h-screen bg-zinc-950 py-16 text-zinc-100">
            <div className="container mx-auto max-w-6xl px-4">
                <header className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="flex flex-col gap-3">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                            Personal UI Toolbox
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter sm:text-6xl">
                            Workshop Inventory
                        </h1>
                        <p className="max-w-xl text-lg text-zinc-500 leading-relaxed font-medium">
                            A curated collection of production-ready components and experimental interface patterns.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/workbench"
                            className="rounded-lg border border-zinc-900 bg-zinc-900/50 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:border-accent/50 hover:text-accent"
                        >
                            Workbench
                        </Link>
                    </div>
                </header>

                <WorkshopGallery />
            </div>
        </div>
    )
}
