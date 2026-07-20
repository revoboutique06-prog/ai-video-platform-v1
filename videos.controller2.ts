<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8">
  <title>الفيديوهات - RevoAI</title>
  <style>
    body { background:#0d0d0d; color:white; font-family:Arial; direction:rtl; text-align:center; }
    h2 { margin-top:40px; color:#4a90e2; }

    .video-box {
      background:#111;
      padding:20px;
      margin:20px auto;
      border-radius:10px;
      width:90%;
      max-width:500px;
    }

    video {
      width:100%;
      border-radius:10px;
    }

    .btn {
      display:block;
      width:200px;
      margin:20px auto;
      padding:12px;
      background:#4a90e2;
      color:white;
      border:none;
      border-radius:8px;
      font-size:18px;
      cursor:pointer;
      text-decoration:none;
    }

    .btn:hover { background:#357ac8; }
  </style>
</head>
<body>

  <h2>الفيديوهات المولدة</h2>

  <div id="videosContainer"></div>

  <a class="btn" href="dashboard.html">🔙 رجوع للوحة التحكم</a>

  <script>
    // فيديوهات تجريبية – لاحقًا تربطها مع قاعدة بيانات أو API
    const videos = [
      "video1.mp4",
      "video2.mp4",
      "video3.mp4"
    ];

    const container = document.getElementById("videosContainer");

    videos.forEach(url => {
      const box = document.createElement("div");
      box.className = "video-box";

      box.innerHTML = `
        <video controls>
          <source src="${url}" type="video/mp4">
        </video>
      `;

      container.appendChild(box);
    });
  </script>

</body>
</html>
