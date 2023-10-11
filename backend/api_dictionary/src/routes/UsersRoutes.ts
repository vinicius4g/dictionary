import express, { Request, Response } from 'express';
import { create, login } from '../controllers/UsersController';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const returnObj = await create(username, password);
        res.status(200).send(returnObj);
    } catch (error) {
        res.status(500).json({ error: 'Error while create user' });
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const returnObj = await login(username, password);
        res.status(200).send(returnObj);
    } catch (error) {
        res.status(500).json({ error: 'Error when logging in' });
    }
})

module.exports = router;