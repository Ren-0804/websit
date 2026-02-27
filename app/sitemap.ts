import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/markdown'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://landsea.cc'
    const posts = getAllPosts()

    // Base routes
    const routes = [
        '',
        '/about',
        '/services',
        '/network',
        '/contact',
        '/news',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic news routes
    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/news/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...routes, ...postRoutes]
}
