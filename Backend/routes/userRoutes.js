// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.getUser);
router.put("/:id/profile-image", userController.updateProfileImage);

module.exports = router;
