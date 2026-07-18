document.querySelector("button").addEventListener("click", function() {
    let text = document.getElementById("textInput").value;

    if (text.trim() === "") {
        alert("الرجاء إدخال نص قبل إنشاء الفيديو.");
        return;
    }

    // الانتقال إلى صفحة الانتظار
    window.location.href = "loading.html";
});
