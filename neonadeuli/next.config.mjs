/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'www.cha.go.kr',
          port: '',
          pathname: '/unisearch/images/history_site/**',
        },
        {
          protocol: 'http',
          hostname: 'www.cha.go.kr',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'zyyosrdkcdcm25870576.cdn.ntruss.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    async rewrites() {
        return [
            {
            source: '/api/v1/:path*',
            destination: `${process.env.API_URL || 'https://neonadeuli.life'}/api/v1/:path*`,
            }
        ];
    },
  };
  
  export default nextConfig;
  