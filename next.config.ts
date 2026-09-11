import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: process.env.NEXT_PUBLIC_LOCAL_IP ? [process.env.NEXT_PUBLIC_LOCAL_IP] : [],
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: '*.licdn.com' },
      { hostname: 'media.licdn.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

const bundleAnalyzed = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig)

export default withSentryConfig(bundleAnalyzed, {
  silent: true,
  sourcemaps: { disable: true },
  telemetry: false,
})
