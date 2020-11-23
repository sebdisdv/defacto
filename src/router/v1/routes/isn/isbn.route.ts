import { Router } from "express";

import { getIsbnInfo } from '@/utils/isbn-scratcher';
import { aceInTheHole } from '@/utils/various';


export function route(router: Router): void {

    router.get('/isbn/:isbn', async (req, res) => {
        await aceInTheHole(res, async () => {
            const isbn = req.params.isbn;
            const bookInfo = await getIsbnInfo(isbn);

            if (!bookInfo) {
                throw new Error('Error in retrieving information from isbn service');
            }

            res.send(bookInfo);
        });
    });

}