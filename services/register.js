// register.js
import { pool } from "../database.js";
import { hashPassword } from "../encryption.js";


export async function registerUser(username, password) {
  let client;

  try {
    client = await pool.connect();

    
    const checkQuery = "SELECT * FROM users WHERE username = $1";
    const checkResult = await client.query(checkQuery, [username]);

    if (checkResult.rows.length > 0) {
      return { success: false, error: "Username นี้ถูกใช้งานแล้ว" };
    }

    
    const hashedPassword = await hashPassword(password);

    
    const insertQuery =
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username";
    const insertResult = await client.query(insertQuery, [username, hashedPassword]);

    return { success: true, user: insertResult.rows[0] };
  } catch (err) {
    console.error(err);
    return { success: false, error: "เกิดข้อผิดพลาด" };
  } finally {
    if (client) client.release();
  }
}
