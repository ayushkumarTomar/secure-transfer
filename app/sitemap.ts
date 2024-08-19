import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://securetransfer.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 1,
    },
    {
      url: 'https://securetransfer.vercel.app/send',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.9,
    }
  ]
}