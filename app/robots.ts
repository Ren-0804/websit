import { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/i18n'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/auth/'],
        },
        sitemap: `${siteUrl}/sitemap.xml`,
    }
}
