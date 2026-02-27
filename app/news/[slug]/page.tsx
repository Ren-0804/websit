import { getPostBySlug, getPostSlugs } from "@/lib/markdown"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { format } from "date-fns"
import { Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"

interface PostProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: PostProps) {
    const p = await params
    const post = getPostBySlug(p.slug)
    if (!post) {
        return { title: 'Post Not Found | LandSea' }
    }
    return {
        title: `${post.title} | LandSea News`,
        description: post.summary
    }
}

export async function generateStaticParams() {
    const slugs = getPostSlugs()
    return slugs.map((slug) => ({
        slug: slug.replace(/\.md$/, ""),
    }))
}

export default async function PostPage({ params }: PostProps) {
    const p = await params
    const post = getPostBySlug(p.slug)

    if (!post) {
        notFound()
    }

    return (
        <main className="min-h-screen pt-24 pb-24 bg-[#f4f4f4]">
            {/* Header Banner */}
            <div className="bg-[#0f1c2d] py-16 mb-12 border-t-4 border-[#e3000f]">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <Link href="/news" className="hover:text-white transition-colors">News</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <span className="text-white truncate max-w-[200px]">{post.title}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
                        {post.title}
                    </h1>

                    <div className="flex items-center text-gray-300 font-bold tracking-wider uppercase">
                        <Calendar className="h-5 w-5 mr-3" />
                        {format(new Date(post.date), "MMMM d, yyyy")}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <article className="max-w-4xl mx-auto bg-white p-8 md:p-12 lg:p-16 rounded-md shadow-lg border-t-[6px] border-[#e3000f]">
                    {post.summary && (
                        <div className="text-xl text-gray-600 font-medium leading-relaxed mb-12 pb-12 border-b-2 border-gray-100">
                            {post.summary}
                        </div>
                    )}

                    <div className="prose prose-lg max-w-none prose-headings:text-[#0f1c2d] prose-headings:font-black prose-a:text-[#e3000f] hover:prose-a:text-[#c8000d] prose-strong:text-[#0f1c2d] prose-img:rounded-sm prose-img:shadow-md border-gray-200">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </main>
    )
}
