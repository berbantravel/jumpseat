import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    domains: [
      'cdn.airalo.com',
      'sandbox.airalo.com', 
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media-exp1.licdn.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'airalo.com',
        pathname: '**',
      }
    ],
  },
  env: {
    NEXT_PUBLIC_IPAY88_MERCHANT_CODE: process.env.IPAY88_MERCHANT_CODE,
    NEXT_PUBLIC_IPAY88_CURRENCY: process.env.IPAY88_CURRENCY,
    NEXT_PUBLIC_IPAY88_LANG: process.env.IPAY88_LANG,
    NEXT_PUBLIC_IPAY88_SIGNATURE_TYPE: process.env.IPAY88_SIGNATURE_TYPE,
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)