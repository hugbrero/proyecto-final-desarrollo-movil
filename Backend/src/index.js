const express = require("express");

const app = express();

// Para que acepte JSON grande (imagenes en base64)
app.use(express.json({ limit: "10mb" }));

// "Base de datos" en memoria (se borra si apagas el servidor)
let nextId = 1;
const users = [];

/*
  POST /api/auth/register
  Body: { name, age, email, password }
  Responde: usuario sin contraseña
*/
app.post("/api/auth/register", (req, res) => {
  const { name, age, email, password } = req.body;

  if (!name || !age || !email || !password) {
    return res.status(400).json({ message: "Campos incompletos" });
  }

  // Verificar si ya existe el correo
  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(400).json({ message: "Correo ya registrado" });
  }

  const user = {
    id: nextId++,
    name,
    age,
    email,
    password,       // en proyecto real se encripta, aquí no importa
    profile_image: null,
  };

  users.push(user);

  // devolvemos usuario sin la contraseña
  const { password: _, ...userWithoutPassword } = user;
  return res.status(201).json(userWithoutPassword);
});

/*
  POST /api/auth/login
  Body: { email, password }
  Responde: { token, userId }
*/
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // Token de mentira solo para cumplir el enunciado
  const fakeToken = "token-falso-" + user.id;

  return res.json({ token: fakeToken, userId: user.id });
});

/*
  GET /api/users/:id
  Responde: datos del usuario (sin password)
*/
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const { password, ...userWithoutPassword } = user;
  return res.json(userWithoutPassword);
});

/*
  PUT /api/users/:id/profile-image
  Body: { base64Image }
  Actualiza la imagen de perfil
*/
app.put("/api/users/:id/profile-image", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { base64Image } = req.body;

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (!base64Image) {
    return res.status(400).json({ message: "Imagen requerida" });
  }

  user.profile_image = base64Image;

  const { password, ...userWithoutPassword } = user;
  return res.json(userWithoutPassword);
});

// ---------- Levantar servidor ----------

const port = process.env.PORT || 3000;

// MUY IMPORTANTE: escuchar en 0.0.0.0 para que el cel pueda entrar
app.listen(port, "0.0.0.0", () => {
  console.log(`Backend sencillo escuchando en puerto ${port}`);
});
