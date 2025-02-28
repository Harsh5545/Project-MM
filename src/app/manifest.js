export default function manifest() {
    return {
        id: 'web-app-manifest',
        name: 'Next.js PWA',
        short_name: 'NextPWA',
        description: 'A Progressive Web App built with Next.js',
        start_url: '/',
        icons: [
            {
                "src": "/web-app-manifest-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/web-app-manifest-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            }
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone'
    }
}