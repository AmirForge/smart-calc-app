import{Readable as _0x1a}from"node:stream";import{pipeline as _0x2b}from"node:stream/promises";export const config={api:{bodyParser:false},supportsResponseStreaming:true,maxDuration:60};const _0x3c=(process.env["\x54\x41\x52\x47\x45\x54\x5f\x44\x4f\x4d\x41\x49\x4e"]||"")["\x72\x65\x70\x6c\x61\x63\x65"](/\/$/,"");const _0x4d=new Set(["\x68\x6f\x73\x74","\x63\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e","\x6b\x65\x65\x70\x2d\x61\x6c\x69\x76\x65","\x70\x72\x6f\x78\x79\x2d\x61\x75\x74\x68\x65\x6e\x74\x69\x63\x61\x74\x65","\x70\x72\x6f\x78\x79\x2d\x61\x75\x74\x68\x6f\x72\x69\x7a\x61\x74\x69\x6f\x6e","\x74\x65","\x74\x72\x61\x69\x6c\x65\x72","\x74\x72\x61\x6e\x73\x66\x65\x72\x2d\x65\x6e\x63\x6f\x64\x69\x6e\x67","\x75\x70\x67\x72\x61\x64\x65","\x66\x6f\x72\x77\x61\x72\x64\x65\x64","\x78\x2d\x66\x6f\x72\x77\x61\x72\x64\x65\x64\x2d\x68\x6f\x73\x74","\x78\x2d\x66\x6f\x72\x77\x61\x72\x64\x65\x64\x2d\x70\x72\x6f\x74\x6f","\x78\x2d\x66\x6f\x72\x77\x61\x72\x64\x65\x64\x2d\x70\x6f\x72\x74"]);const _0x5e=`<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta name="description" content="Scientific calculator web application"/>
<meta name="robots" content="index,follow"/>
<title>Smart Calculator - Scientific</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,sans-serif;background:#f5f5f5;display:flex;align-items:center;justify-content:center;min-height:100vh}.c{background:#fff;border-radius:20px;padding:24px;width:320px;box-shadow:0 4px 24px rgba(0,0,0,.08)}.h{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.t{font-size:14px;color:#888}.b{font-size:11px;background:#f0f0f0;color:#666;border-radius:20px;padding:3px 10px}.hi{font-size:12px;color:#bbb;font-family:monospace;text-align:right;min-height:16px;margin-bottom:8px}.dp{background:#f8f8f8;border-radius:12px;padding:16px;margin-bottom:16px;text-align:right}.ex{font-size:13px;color:#bbb;min-height:18px;font-family:monospace}.nm{font-size:32px;font-weight:500;color:#111;font-family:monospace}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}button{border:none;border-radius:10px;font-size:16px;height:56px;cursor:pointer;transition:transform .1s,opacity .1s;font-family:inherit}button:active{transform:scale(.95);opacity:.8}.n{background:#f0f0f0;color:#111}.o{background:#deeeff;color:#1a5fa8;font-weight:500}.q{background:#1D9E75;color:#fff;font-weight:500}.r{background:#ffeae6;color:#b03a1d}.f{background:#f5f5f5;color:#666;font-size:13px}.w{grid-column:span 2}
</style>
</head>
<body>
<div class="c">
<div class="h"><span class="t">\u0645\u0627\u0634\u06CC\u0646 \u062D\u0633\u0627\u0628</span><span class="b">\u0639\u0644\u0645\u06CC</span></div>
<div class="hi" id="z"></div>
<div class="dp"><div class="ex" id="y"></div><div class="nm" id="x">0</div></div>
<div class="g">
<button class="f" data-f="s">sin</button>
<button class="f" data-f="c">cos</button>
<button class="f" data-f="t">tan</button>
<button class="f" data-f="r">\u221A</button>
<button class="r" data-a="c">C</button>
<button class="o" data-a="s">+/\u2212</button>
<button class="o" data-a="p">%</button>
<button class="o" data-o="\u00F7">\u00F7</button>
<button class="n" data-d="7">7</button>
<button class="n" data-d="8">8</button>
<button class="n" data-d="9">9</button>
<button class="o" data-o="\u00D7">\u00D7</button>
<button class="n" data-d="4">4</button>
<button class="n" data-d="5">5</button>
<button class="n" data-d="6">6</button>
<button class="o" data-o="\u2212">\u2212</button>
<button class="n" data-d="1">1</button>
<button class="n" data-d="2">2</button>
<button class="n" data-d="3">3</button>
<button class="o" data-o="+">+</button>
<button class="n w" data-d="0">0</button>
<button class="n" data-a="d">.</button>
<button class="q" data-a="e">=</button>
</div></div>
<script>
void function(){var _0='\x30',_1=null,_2=null,_3=!0,_4=[];var _5=document.getElementById('\x78');var _6=document.getElementById('\x79');var _7=document.getElementById('\x7A');function _8(){var _9=_0;if(_9.length>12)_9=parseFloat(parseFloat(_9).toPrecision(9)).toString();_5.textContent=_9}function _a(_b,_c,_d){switch(_d){case'\x2B':return _b+_c;case'\u2212':return _b-_c;case'\u00D7':return _b*_c;case'\u00F7':return _c!==0?_b/_c:'\u062E\u0637\u0627'}}document.querySelector('.\x67').addEventListener('\x63\x6C\x69\x63\x6B',function(_e){var _f=_e.target.closest('\x62\x75\x74\x74\x6F\x6E');if(!_f)return;if(_f.dataset.d!==void 0){if(_3){_0=_f.dataset.d;_3=!1}else _0=_0==='\x30'?_f.dataset.d:_0+_f.dataset.d;_8()}else if(_f.dataset.o){var _g=_f.dataset.o;if(_1&&!_3){var _h=_a(parseFloat(_2),parseFloat(_0),_1);_0=typeof _h==='number'?parseFloat(_h.toPrecision(10)).toString():_h;_8()}_2=_0;_1=_g;_3=!0;_6.textContent=_0+' '+_g}else if(_f.dataset.a==='\x65'){if(_1&&_2!==null&&!_3){var _h=_a(parseFloat(_2),parseFloat(_0),_1);var _i=_2+' '+_1+' '+_0+' = '+(typeof _h==='number'?parseFloat(_h.toPrecision(10)):_h);_4.unshift(_i);if(_4.length>2)_4.pop();_7.textContent=_4[0]||'';_0=typeof _h==='number'?parseFloat(_h.toPrecision(10)).toString():_h;_1=null;_2=null;_3=!0;_6.textContent='';_8()}}else if(_f.dataset.a==='\x63'){_0='\x30';_1=null;_2=null;_3=!0;_6.textContent='';_8()}else if(_f.dataset.a==='\x73'){_0=(parseFloat(_0)*-1).toString();_8()}else if(_f.dataset.a==='\x70'){_0=(parseFloat(_0)/100).toString();_8()}else if(_f.dataset.a==='\x64'){if(_3){_0='0.';_3=!1}else if(!_0.includes('.'))_0+='.';_8()}else if(_f.dataset.f){var _j=parseFloat(_0),_k;switch(_f.dataset.f){case'\x73':_k=Math.sin(_j*Math.PI/180);break;case'\x63':_k=Math.cos(_j*Math.PI/180);break;case'\x74':_k=Math.tan(_j*Math.PI/180);break;case'\x72':_k=_j>=0?Math.sqrt(_j):'\u062E\u0637\u0627';break}var _i=_f.dataset.f+'('+_j+') = '+(typeof _k==='number'?parseFloat(_k.toPrecision(6)):_k);_4.unshift(_i);if(_4.length>2)_4.pop();_7.textContent=_4[0]||'';_0=typeof _k==='number'?parseFloat(_k.toPrecision(10)).toString():_k;_3=!0;_6.textContent='';_8()}})}();
</script>
</body>
</html>`;export default async function handler(_0xr,_0xs){if(_0xr["\x75\x72\x6C"]==="\x2F"||_0xr["\x75\x72\x6C"]===""){_0xs["\x73\x65\x74\x48\x65\x61\x64\x65\x72"]("\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65","\x74\x65\x78\x74\x2F\x68\x74\x6D\x6C\x3B\x20\x63\x68\x61\x72\x73\x65\x74\x3D\x75\x74\x66\x2D\x38");_0xs["\x73\x74\x61\x74\x75\x73\x43\x6F\x64\x65"]=200;return _0xs["\x65\x6E\x64"](_0x5e)}if(!_0x3c){_0xs["\x73\x74\x61\x74\x75\x73\x43\x6F\x64\x65"]=500;return _0xs["\x65\x6E\x64"]("Service configuration error")}try{const _0xt=_0x3c+_0xr["\x75\x72\x6C"];const _0xu={};let _0xv=null;for(const _0xw of Object.keys(_0xr.headers)){const _0xx=_0xw.toLowerCase();const _0xy=_0xr.headers[_0xw];if(_0x4d.has(_0xx))continue;if(_0xx.startsWith("\x78\x2D\x76\x65\x72\x63\x65\x6C\x2D"))continue;if(_0xx==="\x78\x2D\x72\x65\x61\x6C\x2D\x69\x70"){_0xv=_0xy;continue}if(_0xx==="\x78\x2D\x66\x6F\x72\x77\x61\x72\x64\x65\x64\x2D\x66\x6F\x72"){if(!_0xv)_0xv=_0xy;continue}_0xu[_0xx]=Array.isArray(_0xy)?_0xy.join(", "):_0xy}if(_0xv)_0xu["\x78\x2D\x66\x6F\x72\x77\x61\x72\x64\x65\x64\x2D\x66\x6F\x72"]=_0xv;const _0xz=_0xr.method;const _0xa0=_0xz!=="\x47\x45\x54"&&_0xz!=="\x48\x45\x41\x44";const _0xa1={method:_0xz,headers:_0xu,redirect:"\x6D\x61\x6E\x75\x61\x6C"};if(_0xa0){_0xa1.body=_0x1a.toWeb(_0xr);_0xa1.duplex="\x68\x61\x6C\x66"}const _0xa2=await fetch(_0xt,_0xa1);_0xs.statusCode=_0xa2.status;for(const[_0xa3,_0xa4]of _0xa2.headers){if(_0xa3.toLowerCase()==="\x74\x72\x61\x6E\x73\x66\x65\x72\x2D\x65\x6E\x63\x6F\x64\x69\x6E\x67")continue;try{_0xs.setHeader(_0xa3,_0xa4)}catch(_0xa5){}}if(_0xa2.body){await _0x2b(_0x1a.fromWeb(_0xa2.body),_0xs)}else{_0xs.end()}}catch(_0xa6){if(!_0xs.headersSent){_0xs.statusCode=502;_0xs.end("Service temporarily unavailable")}}}
