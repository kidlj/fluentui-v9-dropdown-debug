/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
	// assetPrefix: isProd ? 'https://static.jeeves.modelbest.co' : undefined,
	rewrites: isProd ? undefined : () => {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:8090/api/:path*' // Proxy to Backend
			},
			{
				source: '/auth/:path*',
				destination: 'http://localhost:8090/auth/:path*' // Proxy to Backend
			},
		]
	}
}

export default nextConfig;
