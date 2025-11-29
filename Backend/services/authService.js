// src/services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/userRepository");

async function register({ name, age, email, password }) {
  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("El correo ya está registrado");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userRepo.createUser({ name, age, email, passwordHash });
  return user;
}

async function login({ email, password }) {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Credenciales inválidas");

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error("Credenciales inválidas");

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, userId: user.id };
}

module.exports = { register, login };
