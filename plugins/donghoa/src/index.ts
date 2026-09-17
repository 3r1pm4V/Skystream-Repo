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
        const items = doc.select('.list-anime .item').map(el => new MultimediaItem({
            id: el.select('a').attr('href'),
            displayName: el.select('.title').text().trim(),
            verticalImageUrl: el.select('img').attr('src'),
            type: ContentType.Anime
        }));
        cb(items);
    },

    async search(query: string, cb: (items: MultimediaItem[]) => void) {
        const doc = await SkyStream.fetchAndParse(`${manifest.baseUrl}/tim-kiem/${encodeURIComponent(query)}`);
        const items = doc.select('.list-anime .item').map(el => new MultimediaItem({
            id: el.select('a').attr('href'),
            displayName: el.select('.title').text().trim(),
            verticalImageUrl: el.select('img').attr('src'),
            type: ContentType.Anime
        }));
        cb(items);
    },

    async load(url: string, cb: (data: any) => void) {
        const doc = await SkyStream.fetchAndParse(url);
        const episodes = doc.select('.list-episode a').map(el => new Episode({
            url: el.attr('href'),
            title: el.text().trim(),
            episode: parseInt(el.text().match(/\d+/)?.[0] || '1'),
            season: 1
        }));
        cb({
            displayName: doc.select('.name').text().trim(),
            description: doc.select('.desc').text().trim(),
            episodes: episodes
        });
    },

    async loadStreams(url: string, cb: (streams: StreamResult[]) => void) {
        const html = await SkyStream.fetchText(url);
        const streams = SkyStream.extractStreams(html);
        cb(streams.map(s => new StreamResult({ url: s.url, quality: '1080p' })));
    }
};
