import { 
    MultimediaItem, 
    Episode, 
    StreamResult, 
    SkyStream, 
    ContentType
} from "skystream-sdk";

export default {
    async getHome(cb: (items: MultimediaItem[]) => void) {
        const doc = await SkyStream.fetchAndParse(`${manifest.baseUrl}/`);
        const items = doc.select(".list-films .item").map(el => new MultimediaItem({
            id: el.select("a").attr("href"),
            displayName: el.select(".title").text().trim(),
            verticalImageUrl: el.select("img").attr("src"),
            type: ContentType.Movie
        }));
        cb(items);
    },

    async search(query: string, cb: (items: MultimediaItem[]) => void) {
        const doc = await SkyStream.fetchAndParse(`${manifest.baseUrl}/tim-kiem/${encodeURIComponent(query)}`);
        const items = doc.select(".list-films .item").map(el => new MultimediaItem({
            id: el.select("a").attr("href"),
            displayName: el.select(".title").text().trim(),
            verticalImageUrl: el.select("img").attr("src"),
            type: ContentType.Movie
        }));
        cb(items);
    },

    async load(url: string, cb: (detail: any) => void) {
        const doc = await SkyStream.fetchAndParse(url);
        const episodes = doc.select(".list-episodes a").map(el => new Episode({
            url: el.attr("href"),
            title: el.text().trim(),
            episode: parseInt(el.text().match(/\d+/)?.[0] || "1"),
            season: 1
        }));

        cb({
            displayName: doc.select(".name").text().trim(),
            description: doc.select(".description").text().trim(),
            episodes: episodes
        });
    },

    async loadStreams(url: string, cb: (streams: StreamResult[]) => void) {
        const html = await SkyStream.fetchText(url);
        const links = SkyStream.extractLinks(html);
        cb(links.map(l => new StreamResult({ url: l.url, quality: 'HD' })));
    }
};
