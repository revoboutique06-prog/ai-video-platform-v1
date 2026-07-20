const express = require("express");
const router = express.Router();

// مثال بسيط — استبدله بقاعدة بيانات لاحقًا
const users = [
  { email: "test@gmail.com", password: "123456" }
];

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    return res.json({ success: true });
  }

  res.json({ success: false });
});

module.exports = router;
