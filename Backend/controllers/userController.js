// src/controllers/userController.js
const userRepo = require("../repositories/userRepository");

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await userRepo.findById(id);
    if (!user) return res.status(404).json({ error: "No encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
}

async function updateProfileImage(req, res) {
  try {
    const { id } = req.params;
    const { base64Image } = req.body;
    const user = await userRepo.updateProfileImage(id, base64Image);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
}

module.exports = { getUser, updateProfileImage };
