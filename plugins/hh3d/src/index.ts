import { 
    MultimediaItem, 
    Episode, 
    StreamResult, 
    SkyStream, 
    ContentType 
} from 'skystream-sdk';

export default {
    async getHome(cb: (items: MultimediaItem[]) => void) {
        const doc = await SkyStream.fetchAndParse(`${manifest.baseUrl}/`);
        const items = doc.select('.list-item .item').map(el => new MultimediaItem({
            id: el.select('a').attr('href'),
            displayName: el.select('.name').text().trim(),
            verticalImageUrl: el.select('img').attr('src'),
            type: ContentType.Anime
        }));
        cb(items);
    },

    async search(query: string, cb: (items: MultimediaItem[]) => void) {
        const doc = await SkyStream.fetchAndParse(`${manifest.baseUrl}/search/${encodeURIComponent(query)}`);
        const items = doc.select('.list-item .item').map(el => new MultimediaItem({
            id: el.select('a').attr('href'),
            displayName: el.select('.name').text().trim(),
            verticalImageUrl: el.select('img').attr('src'),
            type: ContentType.Anime
        }));
        cb(items);
    },

    async load(url: string, cb: (data: any) => void) {
        const doc = await SkyStream.fetchAndParse(url);
        const episodes = doc.select('.episodes a').map(el => new Episode({
            url: el.attr('href'),
            title: el.text().trim(),
            episode: parseInt(el.text().match(/\d+/)?.[0] || '1'),
            season: 1
        }));
        cb({
            displayName: doc.select('h1').text().trim(),
            description: doc.select('.summary').text().trim(),
            episodes: episodes
        });
    },

    async loadStreams(url: string, cb: (streams: StreamResult[]) => void) {
        const html = await SkyStream.fetchText(url);
        const results = SkyStream.extractStreams(html);
        cb(results.map(r => new StreamResult({ url: r.url, quality: '720p' })));
    }
};
