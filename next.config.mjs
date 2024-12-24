/** @type {import('next').NextConfig} */
const nextConfig = {
    dangerouslyAllowSVG: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
};

export default nextConfig;
