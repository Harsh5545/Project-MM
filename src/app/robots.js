export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
            disallow: '/user/',
        },
        sitemap: 'https://acme.com/sitemap.xml',
    }
}