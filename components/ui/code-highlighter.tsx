"use client"

import { useEffect, useState } from "react"
import { createHighlighter } from "shiki"

interface CodeHighlighterProps {
    code: string
    language?: string
    theme?: string
}

export function CodeHighlighter({ code, language = "tsx", theme = "github-dark" }: CodeHighlighterProps) {
    const [highlightedCode, setHighlightedCode] = useState<string>("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const highlightCode = async () => {
            try {
                setLoading(true)
                const highlighter = await createHighlighter({
                    themes: [theme],
                    langs: [language],
                })

                const html = highlighter.codeToHtml(code, {
                    lang: language,
                    theme: theme,
                })

                setHighlightedCode(html)
            } catch (error) {
                console.error("Error highlighting code:", error)
                // Fallback to plain code if highlighting fails
                setHighlightedCode(`<pre class="whitespace-pre-wrap break-all"><code>${code}</code></pre>`)
            } finally {
                setLoading(false)
            }
        }

        highlightCode()
    }, [code, language, theme])

    if (loading) {
        return (
            <div className="rounded-md bg-zinc-950 border border-zinc-800 p-4 font-mono text-sm text-zinc-300">
                <pre className="whitespace-pre-wrap break-all">
                    {code}
                </pre>
            </div>
        )
    }

    return (
        <div 
            className="rounded-md bg-zinc-950 border border-zinc-800 p-4 text-sm"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                maxWidth: '100%'
            }}
        />
    )
}
