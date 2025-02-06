module.exports = {
    // ...nextConfig,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
        unoptimized: true,
    }
};