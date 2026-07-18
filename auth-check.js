async function checkAuth() {
  const res = await fetch('/auth/check', { method: 'POST' });
  const data = await res.json();

  if (!data.loggedIn) {
    window.location.href = "/login.html";
  }
}
