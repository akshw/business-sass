import mysql from "mysql2/promise";

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "akash_og",
    database: "business_app",
  })
  .promise();

const result = await pool.query("SELECT * FROM business_app");
console.log(result);
