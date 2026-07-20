import { MetadataRoute } from 'next'
import { citySlugs, serviceSlugs, siteUrl } from '@/lib/i18n'
import { getAllPosts } from '@/lib/markdown'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = getAllPosts()

    const routes = [
        { path: '', changeFrequency: 'weekly' as const, priority: 1 },
        { path: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
        { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9 },
        { path: '/regions', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/contact', changeFrequency: 'yearly' as const, priority: 0.7 },
        { path: '/news', changeFrequency: 'daily' as const, priority: 0.8 },
    ].map((route) => ({
        url: `${siteUrl}${route.path}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }))

    const serviceRoutes = serviceSlugs.map((slug) => ({
        url: `${siteUrl}/services/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const cityRoutes = citySlugs.map((slug) => ({
        url: `${siteUrl}/regions/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const postRoutes = posts.map((post) => ({
        url: `${siteUrl}/news/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...routes, ...serviceRoutes, ...cityRoutes, ...postRoutes]
}
