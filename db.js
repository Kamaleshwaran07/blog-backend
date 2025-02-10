import mysql from 'mysql2';
import dotenv from "dotenv"
dotenv.config()
export const db = mysql.createConnection({
    host: process.env.connectionstring,
    user:process.env.dbuser,
    password: process.env.dbPassword,
    database: process.env.db,
    port: process.env.dbport
    
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});