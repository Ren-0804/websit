import Link from "next/link"
import { getAllPosts } from "@/lib/markdown"
import { format } from "date-fns"
import { ArrowRight, Calendar, ChevronRight } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Latest News | LandSea International",
    description: "Read the latest news, updates, and articles from LandSea International Supply Chain.",
}

export default function NewsPage() {
    const posts = getAllPosts()

    return (
        <main className="min-h-screen pt-24 pb-16 bg-[#f4f4f4]">
            {/* Header Banner */}
            <div className="bg-[#0f1c2d] py-16 mb-12 border-t-4 border-[#e3000f]">
                <div className="container mx-auto px-6">
                    <div className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <span className="text-white">News & Insights</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white">Latest <span className="text-[#e3000f]">News</span></h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl font-medium">
                        Stay up to date with the newest developments in international logistics, block train operations, and supply chain strategies.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="bg-white p-12 text-center rounded-sm shadow-md border-t-4 border-gray-300">
                            <h2 className="text-2xl font-bold text-[#0f1c2d] mb-2">No news published yet</h2>
                            <p className="text-gray-500 font-medium">Check back later for updates or visit the admin panel to create a post.</p>
                            <Link href="/admin/publish" className="inline-block mt-6 text-[#e3000f] font-bold uppercase tracking-wider hover:underline">
                                Go to Publisher
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-8">
                            {posts.map((post) => (
                                <article
                                    key={post.slug}
                                    className="bg-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border-b-4 border-transparent hover:border-[#e3000f] flex flex-col md:flex-row"
                                >
                                    <div className="p-8 md:w-3/4 flex flex-col">
                                        <div className="flex items-center text-sm font-bold text-gray-400 mb-4 tracking-wider uppercase">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            {format(new Date(post.date), "MMMM d, yyyy")}
                                        </div>
                                        <Link href={`/news/${post.slug}`}>
                                            <h2 className="text-2xl md:text-3xl font-black text-[#0f1c2d] mb-4 hover:text-[#e3000f] transition-colors leading-tight">
                                                {post.title}
                                            </h2>
                                        </Link>
                                        <p className="text-gray-600 mb-6 font-medium leading-relaxed flex-grow">
                                            {post.summary || "Click to read more about this article."}
                                        </p>
                                        <div className="mt-auto">
                                            <Link
                                                href={`/news/${post.slug}`}
                                                className="inline-flex items-center text-[#0f1c2d] font-bold uppercase tracking-wider text-sm hover:text-[#e3000f] transition-colors group"
                                            >
                                                Read More
                                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
