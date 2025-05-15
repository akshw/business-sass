import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "akash_og",
  database: "business_sass",
  connectionLimit: "10",
});

export default pool;
