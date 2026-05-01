import{Readable as _R}from"node:stream";import{pipeline as _p}from"node:stream/promises";
export const config={api:{bodyParser:false},supportsResponseStreaming:true,maxDuration:60};
const _b=(s)=>Buffer.from(s,"base64").toString();
const _ek=_b("VEFSR0VUX0RPTUFJTg==");
const _e=(process.env[_ek]||"").replace(/\/$/,"");
const _xs=new Set([_b("aG9zdA=="),_b("Y29ubmVjdGlvbg=="),_b("a2VlcC1hbGl2ZQ=="),_b("cHJveHktYXV0aGVudGljYXRl"),_b("cHJveHktYXV0aG9yaXphdGlvbg=="),_b("dGU="),_b("dHJhaWxlcg=="),_b("dHJhbnNmZXItZW5jb2Rpbmc="),_b("dXBncmFkZQ=="),_b("Zm9yd2FyZGVk"),_b("eC1mb3J3YXJkZWQtaG9zdA=="),_b("eC1mb3J3YXJkZWQtcHJvdG8="),_b("eC1mb3J3YXJkZWQtcG9ydA==")]);
const _h=`<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>\u0645\u0627\u0634\u06cc\u0646 \u062d\u0633\u0627\u0628</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,sans-serif;background:#f0f0f0;display:flex;align-items:center;justify-content:center;min-height:100vh}.calc{background:#fff;border-radius:20px;padding:20px;width:300px;box-shadow:0 2px 16px rgba(0,0,0,.08)}.hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.hdr-title{font-size:13px;color:#999}.badge{font-size:11px;background:#f3f3f3;color:#888;border-radius:20px;padding:3px 10px}.hist{font-size:11px;color:#ccc;font-family:monospace;text-align:right;min-height:15px;margin-bottom:6px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.screen{background:#f7f7f7;border-radius:12px;padding:12px 16px;margin-bottom:14px}.expr-line{font-size:12px;color:#bbb;min-height:16px;font-family:monospace;text-align:right}.main-num{font-size:36px;font-weight:500;color:#111;font-family:monospace;text-align:right;line-height:1.1;word-break:break-all}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.btn{border:none;border-radius:10px;font-size:15px;height:58px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-family:inherit;transition:transform .1s,filter .1s}.btn:active{transform:scale(.94);filter:brightness(.92)}.n{background:#f2f2f2;color:#111}.op{background:#deeeff;color:#185FA5;font-weight:500}.eq{background:#1D9E75;color:#fff;font-weight:500}.cl{background:#fde8e4;color:#993C1D;font-weight:500}.fn{background:#f5f5f5;color:#666;font-size:12px}.w2{grid-column:span 2}</style></head><body><div class="calc"><div class="hdr"><span class="hdr-title">\u0645\u0627\u0634\u06cc\u0646 \u062d\u0633\u0627\u0628</span><span class="badge">\u0639\u0644\u0645\u06cc</span></div><div class="hist" id="hist"></div><div class="screen"><div class="expr-line" id="expr"></div><div class="main-num" id="disp">0</div></div><div class="grid" id="g"><button class="btn fn" data-fn="sin">sin</button><button class="btn fn" data-fn="cos">cos</button><button class="btn fn" data-fn="tan">tan</button><button class="btn fn" data-fn="sqrt">&#x221a;</button><button class="btn cl" data-a="C">C</button><button class="btn op" data-a="+/-">+/&#x2212;</button><button class="btn op" data-a="%">%</button><button class="btn op" data-op="\u00f7">\u00f7</button><button class="btn n" data-d="7">7</button><button class="btn n" data-d="8">8</button><button class="btn n" data-d="9">9</button><button class="btn op" data-op="\u00d7">\u00d7</button><button class="btn n" data-d="4">4</button><button class="btn n" data-d="5">5</button><button class="btn n" data-d="6">6</button><button class="btn op" data-op="\u2212">\u2212</button><button class="btn n" data-d="1">1</button><button class="btn n" data-d="2">2</button><button class="btn n" data-d="3">3</button><button class="btn op" data-op="+">+</button><button class="btn n w2" data-d="0">0</button><button class="btn n" data-a=".">.</button><button class="btn eq" data-a="=">=</button></div></div><script>let c='0',o=null,p=null,f=true,l=[];const D=document.getElementById('disp'),E=document.getElementById('expr'),H=document.getElementById('hist');function s(){let t=c;if(t.length>10)t=parseFloat(parseFloat(t).toPrecision(8)).toString();D.textContent=t;}function calc(a,b,op){if(op==='\u00f7')return b?a/b:NaN;if(op==='\u00d7')return a*b;if(op==='\u2212')return a-b;if(op==='+')return a+b;}function fmt(n){return isNaN(n)?'\u062e\u0637\u0627':parseFloat(n.toPrecision(10)).toString();}document.getElementById('g').addEventListener('click',ev=>{const b=ev.target.closest('button');if(!b)return;const d=b.dataset;if(d.d!==undefined){c=f||c==='0'?d.d:c+d.d;f=false;s();}else if(d.op){if(o&&!f){const r=calc(parseFloat(p),parseFloat(c),o);c=fmt(r);s();}p=c;o=d.op;f=true;E.textContent=c+' '+o;}else if(d.a==='='){if(o&&p!==null&&!f){const r=calc(parseFloat(p),parseFloat(c),o);const e=p+' '+o+' '+c+' = '+fmt(r);l.unshift(e);if(l.length>2)l.pop();H.textContent=l[0]||'';c=fmt(r);o=null;p=null;f=true;E.textContent='';s();}}else if(d.a==='C'){c='0';o=null;p=null;f=true;E.textContent='';s();}else if(d.a==='+/-'){c=(parseFloat(c)*-1).toString();s();}else if(d.a==='%'){c=(parseFloat(c)/100).toString();s();}else if(d.a==='.'){if(f){c='0.';f=false;}else if(!c.includes('.'))c+='.';s();}else if(d.fn){const v=parseFloat(c),fn=d.fn;let r=fn==='sin'?Math.sin(v*Math.PI/180):fn==='cos'?Math.cos(v*Math.PI/180):fn==='tan'?Math.tan(v*Math.PI/180):v>=0?Math.sqrt(v):NaN;const e=fn+'('+v+') = '+fmt(r);l.unshift(e);if(l.length>2)l.pop();H.textContent=l[0]||'';c=fmt(r);f=true;E.textContent='';s();}});<\/script></body></html>`;
export default async function handler(q,r){
  const _u=q.url||"";
  if(_u==="/"||_u===""||_u==="/index.html"){
    r.setHeader("Content-Type","text/html; charset=utf-8");
    r.statusCode=200;return r.end(_h);
  }
  if(!_e){r.statusCode=500;return r.end("");}
  try{
    const _tu=_e+_u,_hd={};let _ip=null;
    for(const k of Object.keys(q.headers)){
      const _k=k.toLowerCase(),_v=q.headers[k];
      if(_xs.has(_k))continue;
      if(_k.startsWith("x-vercel-"))continue;
      if(_k==="x-real-ip"){_ip=_v;continue;}
      if(_k==="x-forwarded-for"){if(!_ip)_ip=_v;continue;}
      _hd[_k]=Array.isArray(_v)?_v.join(", "):_v;
    }
    if(_ip)_hd["x-forwarded-for"]=_ip;
    const _m=q.method,_hb=_m!=="GET"&&_m!=="HEAD";
    const _fo={method:_m,headers:_hd,redirect:"manual"};
    if(_hb){_fo.body=_R.toWeb(q);_fo.duplex="half";}
    const _up=await fetch(_tu,_fo);
    r.statusCode=_up.status;
    for(const[k,v]of _up.headers){
      if(k.toLowerCase()==="transfer-encoding")continue;
      try{r.setHeader(k,v);}catch{}
    }
    if(_up.body){await _p(_R.fromWeb(_up.body),r);}else{r.end();}
  }catch(e){if(!r.headersSent){r.statusCode=502;r.end("");}}
}
