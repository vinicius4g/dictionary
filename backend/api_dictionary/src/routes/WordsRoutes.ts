import express, { Request, Response } from 'express';
import { fetchWords, list, search } from '../controllers/WordsController';

const router = express.Router();

router.get('/fetchAndSave', async (req: Request, res: Response) => {
    try {
        const returnObj = await fetchWords();
        res.status(200).send(returnObj);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetch words' });
    }
})

router.get('/', async (req: Request, res: Response) => {
    try {
        
        const page = Number(req.query.page) || 1; 
        const pageSize = Number(req.query.pageSize) || 100; 
        const user_id = Number(req.query.user_id) ||0; 

        const returnObj = await list(page, pageSize, user_id);
        res.status(200).send(returnObj);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching words' });
    }
});

router.get('/search', async (req: Request, res: Response) => {
    try {
        
        const searchItem = req.query.searchItem; 
        const user_id = req.query.user_id; 
   
        const returnObj = await search( String(searchItem), Number(user_id));
        res.status(200).send(returnObj);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching search' });
    }
});

module.exports = router;