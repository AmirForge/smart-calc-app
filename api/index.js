export const config = {
  runtime: "nodejs",
  api: { bodyParser: false },
  maxDuration: 30,
};

const TARGET = (process.env.TARGET_DOMAIN || "").replace(/\/$/, "");

// rate limit ساده (در حافظه)
const RATE = new Map();
const LIMIT = 30; // حداکثر 30 درخواست
const WINDOW = 60 * 1000; // در 1 دقیقه

function allow(ip) {
  const now = Date.now();
  const rec = RATE.get(ip) || { count: 0, time: now };

  if (now - rec.time > WINDOW) {
    rec.count = 0;
    rec.time = now;
  }

  rec.count++;
  RATE.set(ip, rec);

  return rec.count <= LIMIT;
}

// ماشین حساب ساده (کاور)
function page() {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Calculator</title>
</head>
<body style="font-family:sans-serif;text-align:center;margin-top:100px">
<h2>ماشین حساب</h2>
<input id="a" placeholder="عدد اول">
<input id="b" placeholder="عدد دوم">
<br><br>
<button onclick="calc()">جمع</button>
<p id="r"></p>
<script>
function calc(){
  let x = parseFloat(document.getElementById('a').value)||0;
  let y = parseFloat(document.getElementById('b').value)||0;
  document.getElementById('r').innerText = x + y;
}
</script>
</body>
</html>`;
}

export default async function handler(req, res) {
  // صفحه اصلی
  if (req.url === "/" || req.url === "") {
    res.setHeader("content-type", "text/html; charset=utf-8");
    res.setHeader("cache-control", "public, max-age=300");
    return res.end(page());
  }

  if (!TARGET) {
    res.statusCode = 500;
    return res.end("Config error");
  }

  // IP کاربر
  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket?.remoteAddress ||
    "0.0.0.0";

  // rate limit
  if (!allow(ip)) {
    res.statusCode = 429;
    return res.end("Too many requests");
  }

  try {
    const url = TARGET + req.url;

    // هدرها
    const headers = {};
    for (const [k, v] of Object.entries(req.headers)) {
      const key = k.toLowerCase();
      if (
        key === "host" ||
        key === "connection" ||
        key === "content-length" ||
        key.startsWith("x-vercel")
      ) continue;

      headers[key] = v;
    }

    // درخواست به مقصد
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s

    const response = await fetch(url, {
      method: req.method,
      headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    res.statusCode = response.status;

    response.headers.forEach((v, k) => {
      if (k === "transfer-encoding") return;
      try { res.setHeader(k, v); } catch {}
    });

    const data = await response.arrayBuffer();
    res.end(Buffer.from(data));

  } catch (e) {
    res.statusCode = 502;
    res.end("Bad gateway");
  }
}
