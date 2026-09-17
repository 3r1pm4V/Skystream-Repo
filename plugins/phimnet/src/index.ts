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
        const items = doc.select('.movie-item').map(el => new MultimediaItem({
            id: el.select('a').attr('href'),
            displayName: el.select('.movie-title').text().trim(),
            verticalImageUrl: el.select('img').attr('src'),
            type: ContentType.Movie
        }));
        cb(items);
    },

    async search(query: string, cb: (items: MultimediaItem[]) => void) {
        const doc = await SkyStream.fetchAndParse(`${manifest.baseUrl}/search?q=${encodeURIComponent(query)}`);
        const items = doc.select('.movie-item').map(el => new MultimediaItem({
            id: el.select('a').attr('href'),
            displayName: el.select('.movie-title').text().trim(),
            verticalImageUrl: el.select('img').attr('src'),
            type: ContentType.Movie
        }));
        cb(items);
    },

    async load(url: string, cb: (data: any) => void) {
        const doc = await SkyStream.fetchAndParse(url);
        const episodes = doc.select('.episode-link').map(el => new Episode({
            url: el.attr('href'),
            title: el.text().trim(),
            episode: parseInt(el.text().match(/\d+/)?.[0] || '1'),
            season: 1
        }));
        cb({
            displayName: doc.select('.title').text().trim(),
            description: doc.select('.desc').text().trim(),
            episodes: episodes
        });
    },

    async loadStreams(url: string, cb: (streams: StreamResult[]) => void) {
        const html = await SkyStream.fetchText(url);
        const streams = SkyStream.extractStreams(html);
        cb(streams.map(s => new StreamResult({ url: s.url, quality: 'HD' })));
    }
};
