import express from "express";
import pool from "../db/pool.js";

const router = express.Router();

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Db connection sucessfull");
    connection.release();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

testConnection().then((connected) => {
  if (connected) {
    console.log("Connected");
  } else {
    console.log("Connection failed");
    process.exit(1);
  }
});

router.get("/", (req, res) => {
  res.send("v1 home");
});

router.post("/signup/otp", async (req, res) => {});

//todo - implement zod-validation, JWT - auth

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const {
      email,
      phone_no,
      name,
      business_name,
      business_type,
      business_details,
    } = req.body;
    const [result] = await pool.query(
      `INSERT INTO users (email, phone_no, name, business_name, business_type, business_details ) VALUES (?, ?, ?, ?, ?, ?)`,
      [email, phone_no, name, business_name, business_type, business_details]
    );

    res.status(201).json({ id: result.insertId, name, email });
    console.log("registerd");
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ err: "Db error" });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.json({
        message: "Authorization failed",
      });
    }
    const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    res.json(result);
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ err });
  }
});

router.get("/home", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.json({
        message: "Authorization failed",
      });
    }
    const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    res.json(result);
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ err });
  }
});

router.put("/update", async (req, res) => {});

router.post("/share", async (req, res) => {});

export default router;
