export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/','/user/'],
        },
        sitemap: 'https://modernmannerism.com/sitemap.xml',
    }
}