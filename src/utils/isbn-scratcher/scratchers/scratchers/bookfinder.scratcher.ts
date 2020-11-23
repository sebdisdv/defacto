import { Scratcher } from '../..';

export const scratcher: Scratcher = {
    priority: 0,
    async scratch(isbn, page) {
        await page.goto(`https://www.bookfinder.com/search/?isbn=${isbn}&st=sr&ac=qr`);
        await page.waitForSelector('span[itemprop="name"]');
        await page.waitForSelector('span[itemprop="author"]');
        await page.waitForSelector('span[itemprop="publisher"]');
        await page.waitForSelector('img#coverImage');

        const titleElement = await page.$('span[itemprop="name"]');
        const title = await page.evaluate(el =>  el?.textContent, titleElement);

        const authorElement = await page.$('span[itemprop="author"]');
        const authorRaw = await page.evaluate(el =>  el?.textContent, authorElement);
        const author = authorRaw.split(', ').reverse().join(' ');

        const publisherElement = await page.$('span[itemprop="publisher"]');
        const publisherRaw = await page.evaluate(el =>  el?.textContent, publisherElement);
        const [publisher, publicationYear] = publisherRaw.split(', ');

        const pictureElement = await page.$('img#coverImage');
        const picture = await page.evaluate(el =>  el?.src, pictureElement);

        return {title, author, publisher, publicationYear, picture};
    }
};