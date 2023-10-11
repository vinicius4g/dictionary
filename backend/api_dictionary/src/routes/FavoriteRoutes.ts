import express, { Request, Response } from 'express';
import { createFavoriteWord, listFavoriteWords, removeFavoriteWord } from '../controllers/FavoritesWordsController';

const router = express.Router();

router.post('/createFavoriteWord', async (req: Request, res: Response) => {
    try {
        const { user_id, word_id, word } = req.body;

        const returnObj = await createFavoriteWord(user_id, word_id, word);
        res.status(200).send(returnObj);
    } catch (error) {
        res.status(500).json({ error: 'Error while favorite word' });
    }
})

router.delete('/removeFavoriteWord', async (req: Request, res: Response) => {
    try {
        const user_id  = req.query.user_id;
        const word_id  = req.query.word_id;

        const returnObj = await removeFavoriteWord(Number(user_id), Number(word_id));
        res.status(200).send(returnObj);
    } catch (error) {
        res.status(500).json({ error: 'Error while remove word favorites' });
    }
})

router.get('/listFavoriteWords', async (req: Request, res: Response) => {
    try {
        const user_id  = req.query.user_id;

        const returnObj = await listFavoriteWords(Number(user_id));
        res.status(200).send(returnObj);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching words favorites' });
    }
})



module.exports = router;