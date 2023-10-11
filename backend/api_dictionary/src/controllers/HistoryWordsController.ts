import { Database } from "sqlite";
import { openDb } from "../database/config";

async function createTableIfNotExists() {
    const db: Database = await openDb();
    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS HISTORY (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                word_id INTEGER NOT NULL,
                word VARCHAR(255) NOT NULL
            );
        `);
        
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating history');
    } finally {
        await db.close();
    }
}

export async function createHistoryWord(user_id: number, word_id: number, word: string) {
    const db: Database = await openDb();

    await createTableIfNotExists();

    try {
        const existingHistory = await db.get(
            `SELECT * FROM HISTORY WHERE user_id = ? AND word_id = ?`,
            [user_id, word_id]
        );
    
        if (existingHistory) {
            throw new Error('Error: Word already exists in history for this user.');
        }

        await db.run(
            `INSERT INTO HISTORY (user_id, word_id, word) values (?, ?, ?)`,
            [user_id, word_id, word]
        );

    
        return 'Success in creating word history';

    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the history word');
    } finally {
        await db.close();
    }
}

export async function removeHistoryWord(user_id: number, word_id: number) {
    const db: Database = await openDb();

    await createTableIfNotExists();

    try {
        const existingHistory = await db.get(
            `SELECT * FROM HISTORY WHERE user_id = ? AND word_id = ?`,
            [user_id, word_id]
        );
    
        if (!existingHistory) {
            throw new Error('Error: this word not exist in history for this user.');
        }

        await db.run(
            `DELETE FROM HISTORY WHERE user_id = ? AND word_id = ?`,
            [user_id, word_id]
        );
    
        return 'Success in remove word history';

    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while remove word from history');
    } finally {
        await db.close();
    }
}

export async function listHistoryWords(user_id: number) {
    const db: Database = await openDb();

    try {
        const listHistoric = await db.all(
            `SELECT * FROM HISTORY WHERE user_id = ?`,
            [user_id]
        );

        const listWordsFavorite = await db.all(
            `SELECT * FROM FAVORITES WHERE user_id = ?`,
            [user_id]
        );
 

        const result = listHistoric?.map((item)=> {
            const isFavorite = listWordsFavorite?.some((favorite) => favorite.word_id === item.word_id);
            return { word: item.word, word_id: item.word_id, isFavorite }
        })
      
  
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching history words');
    } finally {
        await db.close();
    }
}