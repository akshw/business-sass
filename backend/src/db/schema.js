import mysql from "mysql2/promise";

async function setupdb() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "akash_og",
  });

  const DB_NAME = "business_sass";

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    console.log(`Database ${DB_NAME} created`);

    await connection.query(`USE ${DB_NAME}`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255),
        phone_no INT,
        name VARCHAR(255),
        business_name VARCHAR(255),
        business_type ENUM('Manufacturer', 'Shop', 'Services', 'Dealer', 'Distributer', 'Others'),
        business_details TEXT,
        images_url TEXT,
        video_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS SharedDetails (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error setting up database:", err.message);
  } finally {
    await connection.end();
    console.log("DB setup completed");
  }
}

setupdb();
