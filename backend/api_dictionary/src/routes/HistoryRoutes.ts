import express, { Request, Response } from 'express';
import { createHistoryWord, listHistoryWords, removeHistoryWord } from '../controllers/HistoryWordsController';

const router = express.Router();

router.post('/createHistoryWord', async (req: Request, res: Response) => {
    try {
        const { user_id, word_id, word } = req.body;

        const returnObj = await createHistoryWord(user_id, word_id, word);
        res.status(200).send(returnObj);
    } catch (error) {
        res.status(500).json({ error: 'Error when creating history' });
    }
})

router.delete('/removeHistoryWord', async (req: Request, res: Response) => {
    try {
        const user_id  = req.query.user_id;
        const word_id  = req.query.word_id;
        

        const returnObj = await removeHistoryWord(Number(user_id), Number(word_id));
        res.status(200).send(returnObj);
    } catch (error) {
        res.status(500).json({ error: 'Error while remove word history' });
    }
})


router.get('/listHistoryWords', async (req: Request, res: Response) => {
    try {
        const user_id  = req.query.user_id;

        const returnObj = await listHistoryWords(Number(user_id));
        res.status(200).send(returnObj);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching history words' });
    }
})

module.exports = router;