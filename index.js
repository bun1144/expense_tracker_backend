import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import expenseRoutes from "./routes/expense.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
// Middleware
const corsOptions = {
  origin:"https://expense-tracker-ytqd.onrender.com/",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
