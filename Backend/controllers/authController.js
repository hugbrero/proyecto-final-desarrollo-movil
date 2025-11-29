// src/controllers/authController.js
const authService = require("../services/authService");

async function register(req, res) {
  try {
    const { name, age, email, password } = req.body;
    const user = await authService.register({ name, age, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { register, login };
