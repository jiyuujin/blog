export interface OGPData {
  title?: string;
  description?: string;
  image?: string;
  url: string;
}

const ogpCache = new Map<string, OGPData>();

export async function fetchOGP(url: string): Promise<OGPData> {
  if (ogpCache.has(url)) {
    return ogpCache.get(url)!;
  }

  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();

    const og = (name: string) => {
      const match = html.match(
        new RegExp(
          `<meta property=["']og:${name}["'] content=["']([^"']+)["']`,
          "i",
        ),
      );
      return match?.[1];
    };

    const data: OGPData = {
      title: og("title") ?? "",
      description: og("description") ?? "",
      image: og("image") ?? "",
      url,
    };

    ogpCache.set(url, data);
    return data;
  } catch (_err) {
    return {
      title: "",
      description: "",
      image: "",
      url,
    };
  }
}
