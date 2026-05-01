import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

export const config = {
  api: { bodyParser: false },
  supportsResponseStreaming: true,
  maxDuration: 60,
};

const TARGET_BASE = (process.env.TARGET_DOMAIN || "").replace(/\/$/, "");

const STRIP_HEADERS = new Set([
  "host", "connection", "keep-alive",
  "proxy-authenticate", "proxy-authorization",
  "te", "trailer", "transfer-encoding", "upgrade",
  "forwarded", "x-forwarded-host", "x-forwarded-proto", "x-forwarded-port",
]);

const CALCULATOR_HTML = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ماشین حساب پیشرفته</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, sans-serif; background: #f5f5f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  .calc { background: #fff; border-radius: 20px; padding: 24px; width: 320px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .title { font-size: 14px; color: #888; }
  .badge { font-size: 11px; background: #f0f0f0; color: #666; border-radius: 20px; padding: 3px 10px; }
  .history { font-size: 12px; color: #bbb; font-family: monospace; text-align: right; min-height: 16px; margin-bottom: 8px; }
  .display { background: #f8f8f8; border-radius: 12px; padding: 16px; margin-bottom: 16px; text-align: right; }
  .expr { font-size: 13px; color: #bbb; min-height: 18px; font-family: monospace; }
  .num { font-size: 32px; font-weight: 500; color: #111; font-family: monospace; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  button { border: none; border-radius: 10px; font-size: 16px; height: 56px; cursor: pointer; transition: transform 0.1s, opacity 0.1s; font-family: inherit; }
  button:active { transform: scale(0.95); opacity: 0.8; }
  .n { background: #f0f0f0; color: #111; }
  .o { background: #deeeff; color: #1a5fa8; font-weight: 500; }
  .eq { background: #1D9E75; color: #fff; font-weight: 500; }
  .cl { background: #ffeae6; color: #b03a1d; }
  .fn { background: #f5f5f5; color: #666; font-size: 13px; }
  .wide { grid-column: span 2; }
</style>
</head>
<body>
<div class="calc">
  <div class="header">
    <span class="title">ماشین حساب</span>
    <span class="badge">علمی</span>
  </div>
  <div class="history" id="hist"></div>
  <div class="display">
    <div class="expr" id="expr"></div>
    <div class="num" id="disp">0</div>
  </div>
  <div class="grid">
    <button class="fn" data-fn="sin">sin</button>
    <button class="fn" data-fn="cos">cos</button>
    <button class="fn" data-fn="tan">tan</button>
    <button class="fn" data-fn="sqrt">√</button>
    <button class="cl" data-a="clear">C</button>
    <button class="o" data-a="sign">+/−</button>
    <button class="o" data-a="pct">%</button>
    <button class="o" data-op="÷">÷</button>
    <button class="n" data-d="7">7</button>
    <button class="n" data-d="8">8</button>
    <button class="n" data-d="9">9</button>
    <button class="o" data-op="×">×</button>
    <button class="n" data-d="4">4</button>
    <button class="n" data-d="5">5</button>
    <button class="n" data-d="6">6</button>
    <button class="o" data-op="−">−</button>
    <button class="n" data-d="1">1</button>
    <button class="n" data-d="2">2</button>
    <button class="n" data-d="3">3</button>
    <button class="o" data-op="+">+</button>
    <button class="n wide" data-d="0">0</button>
    <button class="n" data-a="dot">.</button>
    <button class="eq" data-a="eq">=</button>
  </div>
</div>
<script>
let cur='0',op=null,prev=null,newIn=true,hist=[];
const D=document.getElementById('disp');
const E=document.getElementById('expr');
const H=document.getElementById('hist');
function upd(){let t=cur;if(t.length>12)t=parseFloat(parseFloat(t).toPrecision(9)).toString();D.textContent=t;}
function calc(a,b,o){if(o==='+')return a+b;if(o==='−')return a-b;if(o==='×')return a*b;if(o==='÷')return b!==0?a/b:'خطا';}
document.querySelector('.grid').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.d!==undefined){if(newIn){cur=b.dataset.d;newIn=false;}else cur=cur==='0'?b.dataset.d:cur+b.dataset.d;upd();}
  else if(b.dataset.op){const s=b.dataset.op;if(op&&!newIn){const r=calc(parseFloat(prev),parseFloat(cur),op);cur=typeof r==='number'?parseFloat(r.toPrecision(10)).toString():r;upd();}prev=cur;op=s;newIn=true;E.textContent=cur+' '+s;}
  else if(b.dataset.a==='eq'){if(op&&prev!==null&&!newIn){const r=calc(parseFloat(prev),parseFloat(cur),op);const en=prev+' '+op+' '+cur+' = '+(typeof r==='number'?parseFloat(r.toPrecision(10)):r);hist.unshift(en);if(hist.length>2)hist.pop();H.textContent=hist[0]||'';cur=typeof r==='number'?parseFloat(r.toPrecision(10)).toString():r;op=null;prev=null;newIn=true;E.textContent='';upd();}}
  else if(b.dataset.a==='clear'){cur='0';op=null;prev=null;newIn=true;E.textContent='';upd();}
  else if(b.dataset.a==='sign'){cur=(parseFloat(cur)*-1).toString();upd();}
  else if(b.dataset.a==='pct'){cur=(parseFloat(cur)/100).toString();upd();}
  else if(b.dataset.a==='dot'){if(newIn){cur='0.';newIn=false;}else if(!cur.includes('.'))cur+='.';upd();}
  else if(b.dataset.fn){const v=parseFloat(cur);let r;if(b.dataset.fn==='sin')r=Math.sin(v*Math.PI/180);else if(b.dataset.fn==='cos')r=Math.cos(v*Math.PI/180);else if(b.dataset.fn==='tan')r=Math.tan(v*Math.PI/180);else if(b.dataset.fn==='sqrt')r=v>=0?Math.sqrt(v):'خطا';const en=b.dataset.fn+'('+v+') = '+(typeof r==='number'?parseFloat(r.toPrecision(6)):r);hist.unshift(en);if(hist.length>2)hist.pop();H.textContent=hist[0]||'';cur=typeof r==='number'?parseFloat(r.toPrecision(10)).toString():r;newIn=true;E.textContent='';upd();}
});
</script>
</body>
</html>`;

export default async function handler(req, res) {
  // اگه درخواست برای صفحه اصلی بود، ماشین حساب نشون بده
  if (req.url === "/" || req.url === "") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.statusCode = 200;
    return res.end(CALCULATOR_HTML);
  }

  // بقیه درخواست‌ها → proxy
  if (!TARGET_BASE) {
    res.statusCode = 500;
    return res.end("Misconfigured: TARGET_DOMAIN is not set");
  }

  try {
    const targetUrl = TARGET_BASE + req.url;
    const headers = {};
    let clientIp = null;

    for (const key of Object.keys(req.headers)) {
      const k = key.toLowerCase();
      const v = req.headers[key];
      if (STRIP_HEADERS.has(k)) continue;
      if (k.startsWith("x-vercel-")) continue;
      if (k === "x-real-ip") { clientIp = v; continue; }
      if (k === "x-forwarded-for") { if (!clientIp) clientIp = v; continue; }
      headers[k] = Array.isArray(v) ? v.join(", ") : v;
    }

    if (clientIp) headers["x-forwarded-for"] = clientIp;

    const method = req.method;
    const hasBody = method !== "GET" && method !== "HEAD";
    const fetchOpts = { method, headers, redirect: "manual" };

    if (hasBody) {
      fetchOpts.body = Readable.toWeb(req);
      fetchOpts.duplex = "half";
    }

    const upstream = await fetch(targetUrl, fetchOpts);
    res.statusCode = upstream.status;

    for (const [k, v] of upstream.headers) {
      if (k.toLowerCase() === "transfer-encoding") continue;
      try { res.setHeader(k, v); } catch {}
    }

    if (upstream.body) {
      await pipeline(Readable.fromWeb(upstream.body), res);
    } else {
      res.end();
    }
  } catch (err) {
    console.error("relay error:", err);
    if (!res.headersSent) {
      res.statusCode = 502;
      res.end("Bad Gateway: Tunnel Failed");
    }
  }
}
