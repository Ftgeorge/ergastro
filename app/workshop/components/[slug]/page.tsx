import { components } from "@/lib/component-registry"
import { notFound } from "next/navigation"
import Link from "next/link"
import fs from "fs"
import path from "path"
import { ComponentDetail } from "@/components/workshop/component-detail"
import { codeToHtml } from "shiki"

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function ComponentPage({ params }: PageProps) {
    const { slug } = await params
    const componentEntry = components.find((c) => c.slug === slug)

    if (!componentEntry) {
        notFound()
    }

    const { name, description, sourcePath } = componentEntry

    let sourceCode = ""
    let highlightedCode = ""
    try {
        const fullPath = path.join(process.cwd(), sourcePath)
        sourceCode = fs.readFileSync(fullPath, "utf-8")

        highlightedCode = await codeToHtml(sourceCode, {
            lang: 'tsx',
            theme: 'github-dark-dimmed'
        })
    } catch (error) {
        console.error(`Failed to read source code for ${name}:`, error)
        sourceCode = "// Failed to load source code"
        highlightedCode = "<pre><code>// Failed to load source code</code></pre>"
    }

    return (
        <div className="min-h-screen bg-zinc-950 py-12 text-zinc-100">
            <div className="container mx-auto max-w-5xl px-4">
                <header className="mb-12">
                    <Link
                        href="/workshop/components"
                        className="group mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors hover:text-accent"
                    >
                        <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
                        Workshop Inventory
                    </Link>

                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                            {name}
                        </h1>
                        <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed font-medium">
                            {description}
                        </p>
                    </div>
                </header>

                <ComponentDetail
                    slug={slug}
                    sourceCode={sourceCode}
                    highlightedCode={highlightedCode}
                    basename={path.basename(sourcePath)}
                />
            </div>
        </div>
    )
}
