export default async function handler(req, res) {
  // صفحه ماشین حساب
  if (req.url === "/" || req.url === "") {
    res.setHeader("content-type", "text/html; charset=utf-8");
    return res.end(`
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Calculator</title>
</head>
<body style="font-family:sans-serif;text-align:center;margin-top:100px">
<h2>ماشین حساب ساده</h2>

<input id="a" placeholder="عدد اول" />
<input id="b" placeholder="عدد دوم" />
<br><br>

<button onclick="calc()">جمع</button>

<p id="r"></p>

<script>
function calc(){
  let a = parseFloat(document.getElementById('a').value || 0);
  let b = parseFloat(document.getElementById('b').value || 0);
  document.getElementById('r').innerText = a + b;
}
</script>

</body>
</html>
    `);
  }

  // پاسخ پیش‌فرض برای بقیه مسیرها
  res.statusCode = 200;
  res.end("OK");
}
