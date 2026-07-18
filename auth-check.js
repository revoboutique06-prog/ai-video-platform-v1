async function checkAuth() {
  try {
    const response = await fetch("/auth/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();

    // إذا المستخدم غير مسجل دخول → رجّعه لصفحة تسجيل الدخول
    if (!data.loggedIn) {
      window.location.href = "login.html";
    }

  } catch (error) {
    console.error("خطأ في التحقق من تسجيل الدخول:", error);
    window.location.href = "login.html";
  }
}
