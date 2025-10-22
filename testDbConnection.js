import { pool } from "./database.js";

async function testConnection() {
  let client;
  try {
    client = await pool.connect();
    const res = await client.query("SELECT NOW() AS now");
    console.log(" Database connected successfully:", res.rows[0].now);
  } catch (err) {
    console.error(" Failed to connect to database:", err);
  } finally {
    if (client) client.release();
    pool.end(); 
  }
}

testConnection();
