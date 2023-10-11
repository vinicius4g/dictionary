import { Database } from "sqlite";
import { openDb } from "../database/config";

async function createTableIfNotExists() {
    const db: Database = await openDb();
    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS FAVORITES (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                word_id INTEGER NOT NULL,
                word VARCHAR(255) NOT NULL
            );
        `);
        
    } catch (error) {
        console.error(error);
        throw new Error('Error while creating favorite word');
    } finally {
        await db.close();
    }
}

export async function createFavoriteWord(user_id: number, word_id: number, word: string) {
    const db: Database = await openDb();

    await createTableIfNotExists();

    try {
        const existingFavorite = await db.get(
            `SELECT * FROM FAVORITES WHERE user_id = ? AND word_id = ?`,
            [user_id, word_id]
        );
    
        if (existingFavorite) {
            throw new Error('Error: Word already exists in favorites for this user.');
        }

        await db.run(
            `INSERT INTO FAVORITES (user_id, word_id, word) values (?, ?, ?)`,
            [user_id, word_id, word]
        );

    
        return 'Success when favorite a word';

    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the favorite word');
    } finally {
        await db.close();
    }
}

export async function removeFavoriteWord(user_id: number, word_id: number) {
    const db: Database = await openDb();

    await createTableIfNotExists();

    try {

        const existingFavorite = await db.get(
            `SELECT * FROM FAVORITES WHERE user_id = ? AND word_id = ?`,
            [user_id, word_id]
        );

        if (!existingFavorite) {
            throw new Error('Error: this word not exist in favorites for this user.');
        }

        await db.run(
            `DELETE FROM FAVORITES WHERE user_id = ? AND word_id = ?`,
            [user_id, word_id]
        );

    
        return 'Success when remove favorite a word';

    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while remove favorite word');
    } finally {
        await db.close();
    }
}

export async function listFavoriteWords(user_id: number) {
    const db: Database = await openDb();

    try {
        const list = await db.all(
            `SELECT * FROM FAVORITES WHERE user_id = ?`,
            [user_id]
        );

       
        const result = list?.map((item)=> {
            return { word: item.word, word_id: item.word_id, isFavorite: true }
        })
      
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching words');
    } finally {
        await db.close();
    }
}
