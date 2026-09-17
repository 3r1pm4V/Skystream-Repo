import { PluginData } from "../types";

export const PLUGINS: PluginData[] = [
  {
    id: "com.h0dev.phimmoi",
    name: "PhimMoiChill",
    description: "Provider for phimmoichill.net, one of the most popular movie sites in Vietnam.",
    author: "h0dev",
    version: "2.1.0",
    type: "movie",
    icon: "https://phimmoichill.net/favicon.ico",
    files: [
      {
        name: "plugin.json",
        language: "json",
        content: `{
  "name": "PhimMoi",
  "id": "com.h0dev.phimmoi",
  "version": "2.1.0",
  "author": "h0dev",
  "type": "movie",
  "icon": "https://phimmoichill.net/favicon.ico",
  "domains": ["phimmoichill.net", "phimmoichillv2.net"]
}`
      },
      {
        name: "src/index.ts",
        language: "typescript",
        content: `import { SkyStream, Extractor } from 'skystream-sdk';

export default class PhimMoiProvider extends SkyStream.Provider {
  /**
   * Search for movies based on query
   */
  async search(query: string): Promise<SkyStream.SearchResult[]> {
    const url = \`\${this.manifest.baseUrl}/tim-kiem/\${encodeURIComponent(query)}\`;
    const response = await SkyStream.fetch(url);
    const html = await response.text();
    const doc = SkyStream.parseHtml(html);
    
    return doc.select('.list-films .item').map(el => ({
      title: el.select('.title').text().trim(),
      url: el.select('a').attr('href'),
      poster: el.select('img').attr('src'),
      type: SkyStream.ContentType.Movie
    }));
  }

  /**
   * Get detailed info and episodes
   */
  async load(url: string): Promise<SkyStream.LoadResult> {
    const response = await SkyStream.fetch(url);
    const html = await response.text();
    const doc = SkyStream.parseHtml(html);
    
    const title = doc.select('.name').text().trim();
    const description = doc.select('.description').text().trim();
    
    const episodes = doc.select('.list-episodes a').map(el => ({
      name: el.text().trim(),
      url: el.attr('href')
    }));

    return {
      title,
      description,
      episodes: episodes.length > 0 ? episodes : [{ name: 'Full', url }]
    };
  }

  /**
   * Extract video links from an episode URL
   */
  async extract(url: string): Promise<SkyStream.VideoSource[]> {
    const response = await SkyStream.fetch(url);
    const html = await response.text();
    
    // PhimMoi often uses a common player like Filemoon or StreamTape
    const sources: SkyStream.VideoSource[] = [];
    
    // Example logic for finding iframe sources
    const iframes = SkyStream.findIframes(html);
    for (const iframeUrl of iframes) {
      const extracted = await Extractor.auto(iframeUrl);
      if (extracted) sources.push(...extracted);
    }

    return sources;
  }
}`
      }
    ]
  },
  {
    id: "com.h0dev.motphim",
    name: "MotPhim",
    description: "Provider for motphimtv.me, featuring high-quality Vietnamese subbed content.",
    author: "h0dev",
    version: "1.0.5",
    type: "movie",
    icon: "https://motphimtv.me/favicon.ico",
    files: [
      {
        name: "plugin.json",
        language: "json",
        content: `{
  "name": "MotPhim",
  "id": "com.h0dev.motphim",
  "version": "1.0.5",
  "author": "h0dev",
  "type": "movie",
  "icon": "https://motphimtv.me/favicon.ico",
  "domains": ["motphimtv.me", "motphimtv.vip"]
}`
      },
      {
        name: "src/index.ts",
        language: "typescript",
        content: `import { SkyStream, Extractor } from 'skystream-sdk';

export default class MotPhimProvider extends SkyStream.Provider {
  async search(query: string) {
    const url = \`\${this.manifest.baseUrl}/tim-kiem/\${query}\`;
    const doc = await SkyStream.fetchAndParse(url);
    
    return doc.select('.list-movie .movie-item').map(item => ({
      title: item.select('.movie-title').text(),
      url: item.select('a').attr('href'),
      poster: item.select('img').attr('data-src')
    }));
  }

  async load(url: string) {
    const doc = await SkyStream.fetchAndParse(url);
    return {
      title: doc.select('h1.title').text(),
      description: doc.select('.content').text(),
      episodes: doc.select('#list_episodes a').map(ep => ({
        name: ep.text(),
        url: ep.attr('href')
      }))
    };
  }

  async extract(url: string) {
    const html = await SkyStream.fetchText(url);
    // MotPhim typically uses custom player logic or common hosts
    return await Extractor.autoFromHtml(html);
  }
}`
      }
    ]
  }
];
