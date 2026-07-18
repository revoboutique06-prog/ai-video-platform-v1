
document.querySelector("button").addEventListener("click", async function() {
    let text = document.getElementById("textInput").value;

    if (text.trim() === "") {
        alert("الرجاء إدخال نص قبل إنشاء الفيديو.");
        return;
    }

    // الانتقال لصفحة الانتظار
    window.location.href = "loading.html";

    // إرسال النص إلى API (سيتم تعديل الرابط لاحقاً)
    let response = await fetch("https://YOUR_API_URL/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text })
    });

    let data = await response.json();

    // حفظ رابط الفيديو داخل LocalStorage
    localStorage.setItem("video_url", data.video_url);
});
