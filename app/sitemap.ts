import { MetadataRoute } from 'next'
import { citySlugs, serviceSlugs, siteUrl } from '@/lib/i18n'
import { getAllPosts } from '@/lib/markdown'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = getAllPosts()

    const routes = [
        '',
        '/about',
        '/services',
        '/regions',
        '/contact',
        '/news',
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const serviceRoutes = serviceSlugs.map((slug) => ({
        url: `${siteUrl}/services/${slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const cityRoutes = citySlugs.map((slug) => ({
        url: `${siteUrl}/regions/${slug}`,
        lastModified: new Date().toISOString(),
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
