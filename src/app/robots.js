export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/','/user/'
      },
      sitemap: 'https://acme.com/sitemap.xml',
    }
  }