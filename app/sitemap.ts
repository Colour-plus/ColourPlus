import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://colourplus.in";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/technology`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/clients`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/downloads`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/colour-chart`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
  ];
}