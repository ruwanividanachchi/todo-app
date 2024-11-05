import fs from 'fs'; 
import path from 'path';
import { pool } from './db.js';
import { createHash } from 'crypto';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

// Define __dirname for ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const initializeTestDb = () => {
    // Directly specify the path to the SQL file
    const sqlFilePath = path.resolve(__dirname, '..', 'test_todo.sql');

    // Check if the file exists before reading
    if (!fs.existsSync(sqlFilePath)) {
        console.error(`SQL file does not exist at path: ${sqlFilePath}`);
        return;
    }

    // Read the SQL file and execute the query
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    pool.query(sql, (error, result) => {
        if (error) {
            console.error('Error executing SQL script:', error);
        } else {
            console.log('Database initialized successfully');
        }
    });
}

// Insert a test user into the database with a hashed password
const insertTestUser = (email, password) => {
    const hashedPassword = createHash('sha256').update(password).digest('hex');
    pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', 
        [email, hashedPassword], (error, result) => {
            if (error) {
                console.error('Error inserting user:', error);
            } else {
                console.log('Test user inserted successfully:', email);
            }
        }
    );
}

// Generate a JWT token for the given email
const getToken = (email) => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY must be defined in your environment variables.");
    }
    return sign({ user: email }, process.env.JWT_SECRET_KEY);
}

export { initializeTestDb, insertTestUser, getToken };
