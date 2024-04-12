import { MetadataRoute } from "next";
import { baseUrl } from "@/actions/baseurl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    return [
      {
        url: `${baseUrl}`,
      },
      {
        url: `${baseUrl}/privacy`,
      },
      {
        url: `${baseUrl}/about`,
      },
      {
        url: `${baseUrl}/request`,
      },
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    return [
      {
        url: `${baseUrl}`,
      },
      {
        url: `${baseUrl}/privacy`,
      },
      {
        url: `${baseUrl}/about`,
      },
      {
        url: `${baseUrl}/request`,
      },
    ];
  }
}
