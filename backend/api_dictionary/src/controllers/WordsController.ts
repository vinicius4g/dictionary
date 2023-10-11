const axios = require('axios');
import { Database } from "sqlite";
import { openDb } from "../database/config";

async function createTableIfNotExists(db: Database) {
    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS WORDS (
                id INTEGER PRIMARY KEY,
                word VARCHAR(255) NOT NULL
            );
        `);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating table');
    }
}

export async function fetchWords() {
    const db: Database = await openDb();
    await createTableIfNotExists(db);

    try {
        const response = await axios.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json');
        
        if (response.data) {
            const words = Object.keys(response.data);
            const batchSize = 999; 

            for (let i = 0; i < words.length; i += batchSize) {
                const batch = words.slice(i, i + batchSize);
                await insertWords(db, batch);
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error while fetching words');
    } finally {
        await db.close();
    }
}

async function insertWords(db: Database, words: string[]) {
    try {
        const placeholders = words.map(() => '(?)').join(',');
        await db.run(`INSERT INTO WORDS (word) VALUES ${placeholders}`, words);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while inserting words');
    }
}

export async function list(page: number, pageSize: number, user_id: number) {
    const db: Database = await openDb();
    
    try {
        const offset = (page - 1) * pageSize;
        const query = `SELECT * FROM WORDS LIMIT ? OFFSET ?`;

        const response = await db.all(query, [pageSize, offset]);
        
        const listWordsFavorite = await db.all(
            `SELECT * FROM FAVORITES WHERE user_id = ?`,
            [user_id]
        );
      
        const result = response?.map((word) => {
            const isFavorite = listWordsFavorite?.some((favorite) => favorite.word_id === word.id);
            return { ...word, isFavorite };
        });

        return result;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching words');
    }
}

export async function search(name: string, user_id: number) {
    const db: Database = await openDb();

    try {
        const query = `SELECT * FROM WORDS WHERE word LIKE ?`;
        const searchTerm = `%${name}%`;

        const response = await db.all(query, [searchTerm]);

        if(!response) return []

        const listWordsFavorite = await db.all(
            `SELECT * FROM FAVORITES WHERE user_id = ?`,
            [user_id]
        );

        const result = response?.map((item)=> {
            const isFavorite = listWordsFavorite?.some((favorite) => favorite.word_id === item.id);
            return { word: item.word, id: item.id, isFavorite }
        })

       
        return result;
        // const isFavorite = listWordsFavorite?.some((favorite) => favorite.word_id === response.id);
        //return [{ word: response.word, id: response.id, isFavorite }]

    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while searching for words');
    }
}
