import mysql from "mysql2"

export const db = mysql.createConnection({
    //host:"ptfelibrary.mysql.database.azure.com",
    host: "localhost",
    password:"root",
    user:"root",
    database:"dbtravel_293"
})