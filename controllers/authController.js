import { loginUser } from "../services/login.js";
import { registerUser } from "../services/register.js";

export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "กรุณากรอก username และ password" });

  const result = await loginUser(username, password);
  if (result.success) res.json({ token: result.token });
  else res.status(401).json({ error: result.error });
}

export async function register(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "กรุณากรอก username และ password" });

  const result = await registerUser(username, password);
  if (result.success) res.status(201).json({ user: result.user });
  else res.status(400).json({ error: result.error });
}
