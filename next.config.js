/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		domains: ['figma-alpha-api.s3.us-west-2.amazonaws.com'],
		minimumCacheTTL: 60 * 60 * 24
	}
};

module.exports = nextConfig;
