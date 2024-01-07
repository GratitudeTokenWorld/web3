/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const nextConfig =
{
    images:
    {
        remotePatterns:
        [
            {
                protocol: 'https',
                hostname: '**'
            },
            {
                protocol: 'http',
                hostname: '**'
            }
        ]
    }
};

module.exports = nextConfig;
