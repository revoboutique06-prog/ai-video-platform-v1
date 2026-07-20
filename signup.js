const express = require("express");
const router = express.Router();

const users = [];

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.json({ success: false, message: "الإيميل مستخدم مسبقًا" });
  }

  users.push({ name, email, password });

  res.json({ success: true });
});

module.exports = router;
