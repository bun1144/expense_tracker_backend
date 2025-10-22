import express from "express";
import { authenticateToken } from "../encryption.js";
import { addExpense, getExpenses,getFilter } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/add", authenticateToken, addExpense);
router.get("/list", authenticateToken, getExpenses);

router.get("/summary",authenticateToken, getFilter)


export default router;
