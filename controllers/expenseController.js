import { addExpenseService, getExpensesService,filter } from "../services/expense.js";


export async function addExpense(req, res) {
  const { header, description, category, cost, date } = req.body;
  const userId = req.user.userData.id;

  if (!header || !category || !cost || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const expense = await addExpenseService(userId, header, description, category, cost, date);
    res.status(201).json({ expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function getExpenses(req, res) {
  try {
    const userId = req.user.userData.id; // ได้จาก JWT
    const { from, to } = req.query;

    const expenses = await getExpensesService(userId, from, to);
    res.json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Server error" });
  }
}


export async function getFilter(req, res) {
  try {
    const userId = req.user.userData.id;
    const { from, to } = req.query; // รับจาก query string

    const summary = await filter(userId, from, to); // ส่งไป service
    res.json({ summary }); // ต้องตรงกับ frontend (summary)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
