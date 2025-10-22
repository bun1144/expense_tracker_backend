import { pool } from "../database.js";
import { comparePassword, createToken } from "../encryption.js";

export async function loginUser(username, password) {
  let client;
  try {
   
    client = await pool.connect();

    
    const query = "SELECT * FROM users WHERE username = $1";
    const values = [username];

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return { success: false, error: "ไม่พบผู้ใช้" };
    }

    const user = result.rows[0];

    
    const match = await comparePassword(password, user.password);
    if (!match) {
      return { success: false, error: "รหัสผ่านไม่ถูกต้อง" };
    }

   
    const token = createToken({ id: user.id, username: user.username });

    return { success: true, token };
  } catch (err) {
    console.error(err);
    return { success: false, error: "เกิดข้อผิดพลาด" };
  } finally {
   
    if (client) client.release();
  }
}
