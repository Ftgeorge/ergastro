interface CodeBlockProps {
    code: string
    filename?: string
}

export function CodeBlock({ code, filename }: CodeBlockProps) {
    return (
        <div className="relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
            {filename && (
                <div className="flex items-center border-b border-zinc-800 px-4 py-2 text-[10px] font-mono text-zinc-500">
                    {filename}
                </div>
            )}
            <div className="overflow-hidden p-4">
                <pre className="whitespace-pre-wrap wrap-break-word text-xs font-mono leading-relaxed text-zinc-300">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    )
}
