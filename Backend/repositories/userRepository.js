// src/repositories/userRepository.js
const pool = require("../config/db");

async function createUser({ name, age, email, passwordHash }) {
  const result = await pool.query(
    `INSERT INTO users (name, age, email, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, age, email, profile_image`,
    [name, age, email, passwordHash]
  );
  return result.rows[0];
}

async function findByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(
    "SELECT id, name, age, email, profile_image FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

async function updateProfileImage(id, base64Image) {
  const result = await pool.query(
    `UPDATE users SET profile_image = $1 WHERE id = $2
     RETURNING id, name, age, email, profile_image`,
    [base64Image, id]
  );
  return result.rows[0];
}

module.exports = {
  createUser,
  findByEmail,
  findById,
  updateProfileImage,
};
