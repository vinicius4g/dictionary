import { Database } from "sqlite";
import { openDb } from "../database/config";

async function createTableIfNotExists() {
    const db: Database = await openDb();
    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS USER (
                id INTEGER PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating user');
    } finally {
        await db.close();
    }
}

export async function create(username: string, password: string) {
    const db: Database = await openDb();

    await createTableIfNotExists()

    try {
        await db.run(
            `INSERT INTO USER (username, password) values (?, ?)`,
            [username, password]
        );

        const user = await db.get(
            `SELECT * FROM USER WHERE username = ? AND password = ?`,
            [username, password]
        );

    
        if(user){
            return user;
        }

        throw new Error('Error while creating user');
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the user');
    } finally {
        await db.close();
    }
}

export async function login(username: string, password: string) {
    const db: Database = await openDb();

    try {
        const user = await db.get(
            `SELECT * FROM USER WHERE username = ? AND password = ?`,
            [username, password]
        );

      

        if(user){
            return user;
        }

        throw new Error('Invalid username or password');
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred when logging in');
    } finally {
        await db.close();
    }
}