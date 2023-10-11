import express from 'express';
import { openDb } from './database/config';
import cors from 'cors';

const UsersRoutes = require('./routes/UsersRoutes');
const WordsRoutes = require('./routes/WordsRoutes');
const FavoriteRoutes = require('./routes/FavoriteRoutes');
const HistoryRoutes = require('./routes/HistoryRoutes');

export const app = express();

openDb()
    .then(() => {
        app.get('/', (req, res) => {
            res.send('Hello word');
        })
        app.use(cors());

        app.use(express.json());
        app.use('/api/users', UsersRoutes);
        app.use('/api/words', WordsRoutes);
        app.use('/api/favorites', FavoriteRoutes);
        app.use('/api/history', HistoryRoutes);
    })
    .catch((error) => console.log('Error connecting to database', error));