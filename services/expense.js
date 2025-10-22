import { pool } from "../database.js";


export async function addExpenseService(userId, header, description, category, cost, date) {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO expense (user_id, header, description, category, cost, date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [userId, header, description, category, cost, date];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error(" addExpenseService error:", err);
    throw new Error("Database error");
  } finally {
    client.release();
  }
}

export async function filter(userId, from, to) {
  let query = `SELECT category, SUM(cost)::float AS total FROM expense WHERE user_id = $1`;
  const params = [userId];

  if (from && to) {
    query += ` AND date >= $2 AND date <= $3`;
    params.push(from, to);
  }

  query += ` GROUP BY category`;

  const result = await pool.query(query, params);
  return result.rows;
}





export async function getExpensesService(userId, from, to) {
    const client = await pool.connect();
  let query = `
    SELECT id, header, description, category, cost, date
    FROM expense
    WHERE user_id = $1
  `;
  const params = [userId];

  if (from && to) {
    query += ` AND date BETWEEN $2 AND $3 ORDER BY date DESC`;
    params.push(from, to);
  } else {
    query += ` ORDER BY date DESC`;
  }

  const { rows } = await client.query(query, params);
  client.release();
  return rows;
}
