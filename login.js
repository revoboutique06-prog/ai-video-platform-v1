const express = require("express");
const router = express.Router();

const users = []; // نفس مصفوفة المستخدمين الموجودة في signup.js

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.json({ success: false, message: "الإيميل أو كلمة المرور غير صحيحة" });
  }

  res.json({ success: true, message: "تم تسجيل الدخول بنجاح" });
});

module.exports = router;
