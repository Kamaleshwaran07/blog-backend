import mysql from 'mysql2';
import dotenv from "dotenv"
dotenv.config()
export const db = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password: process.env.dbPassword,
    database: "blog",
    port: 3306
    
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});