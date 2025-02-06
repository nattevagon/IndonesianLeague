module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  images: {
    domains: ['assets.klikindomaret.com', 'assets.klikindomaret.net', 'cdn.klikindomaret.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
    unoptimized: true,
  },
  theme: {
    container: {
      center: true, // Center the container by default
      padding: {
        DEFAULT: '2rem', // Default padding untuk semua breakpoint
        md: '4rem', // Padding khusus untuk breakpoint md (768px)
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [require('daisyui')],
};