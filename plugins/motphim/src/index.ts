import { 
    MultimediaItem, 
    Episode, 
    StreamResult, 
    SkyStream, 
    ContentType
} from "skystream-sdk";
import extractors from "skystream-extractors";

export default {
    async getHome(cb: (items: MultimediaItem[]) => void) {
        const doc = await SkyStream.fetchAndParse(`${manifest.baseUrl}/`);
        const items = doc.select(".list-movie .item").map(el => new MultimediaItem({
            id: el.select("a").attr("href"),
            displayName: el.select(".title").text().trim(),
            verticalImageUrl: el.select("img").attr("src"),
            type: ContentType.Movie
        }));
        cb(items);
    },

    async search(query: string, cb: (items: MultimediaItem[]) => void) {
        const doc = await SkyStream.fetchAndParse(`${manifest.baseUrl}/tim-kiem/${encodeURIComponent(query)}`);
        const items = doc.select(".list-movie .item").map(el => new MultimediaItem({
            id: el.select("a").attr("href"),
            displayName: el.select(".title").text().trim(),
            verticalImageUrl: el.select("img").attr("src"),
            type: ContentType.Movie
        }));
        cb(items);
    },

    async load(url: string, cb: (detail: any) => void) {
        const doc = await SkyStream.fetchAndParse(url);
        const episodes = doc.select("#list_episodes a").map(el => new Episode({
            url: el.attr("href"),
            title: el.text().trim(),
            episode: parseInt(el.text().match(/\d+/)?.[0] || "1"),
            season: 1
        }));

        cb({
            displayName: doc.select("h1.title").text().trim(),
            description: doc.select(".content").text().trim(),
            episodes: episodes
        });
    },

    async loadStreams(url: string, cb: (streams: StreamResult[]) => void) {
        const html = await SkyStream.fetchText(url);
        const iframes = SkyStream.findIframes(html);
        const streams: StreamResult[] = [];

        for (const iframeUrl of iframes) {
            const extracted = await extractors.auto(iframeUrl);
            if (extracted) {
                extracted.forEach(s => streams.push(new StreamResult({
                    url: s.url,
                    quality: s.quality || "720p"
                })));
            }
        }
        cb(streams);
    }
};
