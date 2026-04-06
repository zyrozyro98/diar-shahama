(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();var Er={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xo={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m=function(t,e){if(!t)throw kt(e)},kt=function(t){return new Error("Firebase Database ("+Xo.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zo=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Gc=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},ys={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),i.push(n[u],n[d],n[h],n[p])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Zo(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Gc(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||d==null)throw new Kc;const h=r<<2|a>>4;if(i.push(h),c!==64){const p=a<<4&240|c>>2;if(i.push(p),d!==64){const f=c<<6&192|d;i.push(f)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Kc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ea=function(t){const e=Zo(t);return ys.encodeByteArray(e,!0)},An=function(t){return ea(t).replace(/\./g,"")},xn=function(t){try{return ys.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yc(t){return ta(void 0,t)}function ta(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Qc(n)||(t[n]=ta(t[n],e[n]));return t}function Qc(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc=()=>Jc().__FIREBASE_DEFAULTS__,Zc=()=>{if(typeof process>"u"||typeof Er>"u")return;const t=Er.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},ed=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&xn(t[1]);return e&&JSON.parse(e)},vs=()=>{try{return Xc()||Zc()||ed()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},na=t=>{var e,n;return(n=(e=vs())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},ia=t=>{const e=na(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},sa=()=>{var t;return(t=vs())===null||t===void 0?void 0:t.config},ra=t=>{var e;return(e=vs())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oa(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[An(JSON.stringify(n)),An(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ws(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(X())}function td(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function aa(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function la(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function nd(){const t=X();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function id(){return Xo.NODE_ADMIN===!0}function ca(){try{return typeof indexedDB=="object"}catch{return!1}}function da(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(n){e(n)}})}function sd(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd="FirebaseError";class fe extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=rd,Object.setPrototypeOf(this,fe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,rt.prototype.create)}}class rt{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?od(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new fe(s,a,i)}}function od(t,e){return t.replace(ad,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const ad=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yt(t){return JSON.parse(t)}function q(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Yt(xn(r[0])||""),n=Yt(xn(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},ld=function(t){const e=ua(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},cd=function(t){const e=ua(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Qe(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function zi(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Nn(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function Qt(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(Tr(r)&&Tr(o)){if(!Qt(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function Tr(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Ut(t){const e={};return t.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function Bt(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)i[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let d=0;d<80;d++){d<40?d<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):d<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+c+l+u+i[d]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function ud(t,e){const n=new hd(t,e);return n.subscribe.bind(n)}class hd{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let s;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");fd(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:i},s.next===void 0&&(s.next=Ci),s.error===void 0&&(s.error=Ci),s.complete===void 0&&(s.complete=Ci);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function fd(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ci(){}function ei(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pd=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,m(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},ti=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md=1e3,gd=2,_d=4*60*60*1e3,yd=.5;function Sr(t,e=md,n=gd){const i=e*Math.pow(n,t),s=Math.round(yd*i*(Math.random()-.5)*2);return Math.min(_d,i+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(t){return t&&t._delegate?t._delegate:t}class oe{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Rt;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bd(e))try{this.getOrInitializeService({instanceIdentifier:qe})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=qe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=qe){return this.instances.has(e)}getOptions(e=qe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){var i;const s=this.normalizeInstanceIdentifier(n),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:wd(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=qe){return this.component?this.component.multipleInstances?e:qe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function wd(t){return t===qe?void 0:t}function bd(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new vd(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(x||(x={}));const Ed={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},Td=x.INFO,Sd={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},Cd=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=Sd[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ni{constructor(e){this.name=e,this._logLevel=Td,this._logHandler=Cd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ed[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}const kd=(t,e)=>e.some(n=>t instanceof n);let Cr,kr;function Rd(){return Cr||(Cr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ad(){return kr||(kr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ha=new WeakMap,Gi=new WeakMap,fa=new WeakMap,ki=new WeakMap,bs=new WeakMap;function xd(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Fe(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ha.set(n,t)}).catch(()=>{}),bs.set(e,t),e}function Nd(t){if(Gi.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Gi.set(t,e)}let Ki={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Gi.get(t);if(e==="objectStoreNames")return t.objectStoreNames||fa.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Fe(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Pd(t){Ki=t(Ki)}function Od(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(Ri(this),e,...n);return fa.set(i,e.sort?e.sort():[e]),Fe(i)}:Ad().includes(t)?function(...e){return t.apply(Ri(this),e),Fe(ha.get(this))}:function(...e){return Fe(t.apply(Ri(this),e))}}function Ld(t){return typeof t=="function"?Od(t):(t instanceof IDBTransaction&&Nd(t),kd(t,Rd())?new Proxy(t,Ki):t)}function Fe(t){if(t instanceof IDBRequest)return xd(t);if(ki.has(t))return ki.get(t);const e=Ld(t);return e!==t&&(ki.set(t,e),bs.set(e,t)),e}const Ri=t=>bs.get(t);function pa(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=Fe(o);return i&&o.addEventListener("upgradeneeded",l=>{i(Fe(o.result),l.oldVersion,l.newVersion,Fe(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Dd=["get","getKey","getAll","getAllKeys","count"],Md=["put","add","delete","clear"],Ai=new Map;function Rr(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ai.get(e))return Ai.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=Md.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Dd.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return Ai.set(e,r),r}Pd(t=>({...t,get:(e,n,i)=>Rr(e,n)||t.get(e,n,i),has:(e,n)=>!!Rr(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if($d(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function $d(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Yi="@firebase/app",Ar="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se=new ni("@firebase/app"),Ud="@firebase/app-compat",Bd="@firebase/analytics-compat",Wd="@firebase/analytics",Hd="@firebase/app-check-compat",Vd="@firebase/app-check",jd="@firebase/auth",qd="@firebase/auth-compat",zd="@firebase/database",Gd="@firebase/data-connect",Kd="@firebase/database-compat",Yd="@firebase/functions",Qd="@firebase/functions-compat",Jd="@firebase/installations",Xd="@firebase/installations-compat",Zd="@firebase/messaging",eu="@firebase/messaging-compat",tu="@firebase/performance",nu="@firebase/performance-compat",iu="@firebase/remote-config",su="@firebase/remote-config-compat",ru="@firebase/storage",ou="@firebase/storage-compat",au="@firebase/firestore",lu="@firebase/vertexai-preview",cu="@firebase/firestore-compat",du="firebase",uu="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qi="[DEFAULT]",hu={[Yi]:"fire-core",[Ud]:"fire-core-compat",[Wd]:"fire-analytics",[Bd]:"fire-analytics-compat",[Vd]:"fire-app-check",[Hd]:"fire-app-check-compat",[jd]:"fire-auth",[qd]:"fire-auth-compat",[zd]:"fire-rtdb",[Gd]:"fire-data-connect",[Kd]:"fire-rtdb-compat",[Yd]:"fire-fn",[Qd]:"fire-fn-compat",[Jd]:"fire-iid",[Xd]:"fire-iid-compat",[Zd]:"fire-fcm",[eu]:"fire-fcm-compat",[tu]:"fire-perf",[nu]:"fire-perf-compat",[iu]:"fire-rc",[su]:"fire-rc-compat",[ru]:"fire-gcs",[ou]:"fire-gcs-compat",[au]:"fire-fst",[cu]:"fire-fst-compat",[lu]:"fire-vertex","fire-js":"fire-js",[du]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn=new Map,fu=new Map,Ji=new Map;function xr(t,e){try{t.container.addComponent(e)}catch(n){Se.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ue(t){const e=t.name;if(Ji.has(e))return Se.debug(`There were multiple attempts to register component ${e}.`),!1;Ji.set(e,t);for(const n of Pn.values())xr(n,t);for(const n of fu.values())xr(n,t);return!0}function Ve(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function ve(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pu={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$e=new rt("app","Firebase",pu);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e,n,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new oe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $e.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot=uu;function ma(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Qi,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw $e.create("bad-app-name",{appName:String(s)});if(n||(n=sa()),!n)throw $e.create("no-options");const r=Pn.get(s);if(r){if(Qt(n,r.options)&&Qt(i,r.config))return r;throw $e.create("duplicate-app",{appName:s})}const o=new Id(s);for(const l of Ji.values())o.addComponent(l);const a=new mu(n,i,o);return Pn.set(s,a),a}function ii(t=Qi){const e=Pn.get(t);if(!e&&t===Qi&&sa())return ma();if(!e)throw $e.create("no-app",{appName:t});return e}function te(t,e,n){var i;let s=(i=hu[t])!==null&&i!==void 0?i:t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Se.warn(a.join(" "));return}ue(new oe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu="firebase-heartbeat-database",_u=1,Jt="firebase-heartbeat-store";let xi=null;function ga(){return xi||(xi=pa(gu,_u,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Jt)}catch(n){console.warn(n)}}}}).catch(t=>{throw $e.create("idb-open",{originalErrorMessage:t.message})})),xi}async function yu(t){try{const n=(await ga()).transaction(Jt),i=await n.objectStore(Jt).get(_a(t));return await n.done,i}catch(e){if(e instanceof fe)Se.warn(e.message);else{const n=$e.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Se.warn(n.message)}}}async function Nr(t,e){try{const i=(await ga()).transaction(Jt,"readwrite");await i.objectStore(Jt).put(e,_a(t)),await i.done}catch(n){if(n instanceof fe)Se.warn(n.message);else{const i=$e.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Se.warn(i.message)}}}function _a(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu=1024,wu=30*24*60*60*1e3;class bu{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Eu(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Pr();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=wu}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Se.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Pr(),{heartbeatsToSend:i,unsentEntries:s}=Iu(this._heartbeatsCache.heartbeats),r=An(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return Se.warn(n),""}}}function Pr(){return new Date().toISOString().substring(0,10)}function Iu(t,e=vu){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Or(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Or(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Eu{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ca()?da().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await yu(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Nr(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Nr(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Or(t){return An(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tu(t){ue(new oe("platform-logger",e=>new Fd(e),"PRIVATE")),ue(new oe("heartbeat",e=>new bu(e),"PRIVATE")),te(Yi,Ar,t),te(Yi,Ar,"esm2017"),te("fire-js","")}Tu("");var Su="firebase",Cu="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */te(Su,Cu,"app");var Lr={};const Dr="@firebase/database",Mr="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ya="";function ku(t){ya=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),q(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Yt(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return pe(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Ru(e)}}catch{}return new Au},Ge=va("localStorage"),xu=va("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt=new ni("@firebase/database"),wa=function(){let t=1;return function(){return t++}}(),ba=function(t){const e=pd(t),n=new dd;n.update(e);const i=n.digest();return ys.encodeByteArray(i)},cn=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=cn.apply(null,i):typeof i=="object"?e+=q(i):e+=i,e+=" "}return e};let Wt=null,Fr=!0;const Nu=function(t,e){m(!0,"Can't turn on custom loggers persistently."),mt.logLevel=x.VERBOSE,Wt=mt.log.bind(mt)},z=function(...t){if(Fr===!0&&(Fr=!1,Wt===null&&xu.get("logging_enabled")===!0&&Nu()),Wt){const e=cn.apply(null,t);Wt(e)}},dn=function(t){return function(...e){z(t,...e)}},Xi=function(...t){const e="FIREBASE INTERNAL ERROR: "+cn(...t);mt.error(e)},Ce=function(...t){const e=`FIREBASE FATAL ERROR: ${cn(...t)}`;throw mt.error(e),new Error(e)},J=function(...t){const e="FIREBASE WARNING: "+cn(...t);mt.warn(e)},Pu=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&J("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Is=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Ou=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},bt="[MIN_NAME]",Je="[MAX_NAME]",at=function(t,e){if(t===e)return 0;if(t===bt||e===Je)return-1;if(e===bt||t===Je)return 1;{const n=$r(t),i=$r(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},Lu=function(t,e){return t===e?0:t<e?-1:1},Lt=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+q(e))},Es=function(t){if(typeof t!="object"||t===null)return q(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=q(e[i]),n+=":",n+=Es(t[e[i]]);return n+="}",n},Ia=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function G(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Ea=function(t){m(!Is(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,l;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const u=c.join("");let d="";for(l=0;l<64;l+=8){let h=parseInt(u.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},Du=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Mu=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Fu(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const $u=new RegExp("^-?(0*)\\d{1,10}$"),Uu=-2147483648,Bu=2147483647,$r=function(t){if($u.test(t)){const e=Number(t);if(e>=Uu&&e<=Bu)return e}return null},xt=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw J("Exception was thrown by user callback.",n),e},Math.floor(0))}},Wu=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ht=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){J(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(z("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',J(e)}}class Tn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Tn.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ts="5",Ta="v",Sa="s",Ca="r",ka="f",Ra=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Aa="ls",xa="p",Zi="ac",Na="websocket",Pa="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e,n,i,s,r=!1,o="",a=!1,l=!1){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ge.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ge.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function ju(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function La(t,e,n){m(typeof e=="string","typeof type must == string"),m(typeof n=="object","typeof params must == object");let i;if(e===Na)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Pa)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);ju(t)&&(n.ns=t.namespace);const s=[];return G(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(){this.counters_={}}incrementCounter(e,n=1){pe(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Yc(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ni={},Pi={};function Ss(t){const e=t.toString();return Ni[e]||(Ni[e]=new qu),Ni[e]}function zu(t,e){const n=t.toString();return Pi[n]||(Pi[n]=e()),Pi[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&xt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur="start",Ku="close",Yu="pLPCommand",Qu="pRTLPCB",Da="id",Ma="pw",Fa="ser",Ju="cb",Xu="seg",Zu="ts",eh="d",th="dframe",$a=1870,Ua=30,nh=$a-Ua,ih=25e3,sh=3e4;class ft{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=dn(e),this.stats_=Ss(n),this.urlFn=l=>(this.appCheckToken&&(l[Zi]=this.appCheckToken),La(n,Pa,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Gu(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(sh)),Ou(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Cs((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ur)this.id=a,this.password=l;else if(o===Ku)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Ur]="t",i[Fa]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Ju]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Ta]=Ts,this.transportSessionId&&(i[Sa]=this.transportSessionId),this.lastSessionId&&(i[Aa]=this.lastSessionId),this.applicationId&&(i[xa]=this.applicationId),this.appCheckToken&&(i[Zi]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ra.test(location.hostname)&&(i[Ca]=ka);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ft.forceAllow_=!0}static forceDisallow(){ft.forceDisallow_=!0}static isAvailable(){return ft.forceAllow_?!0:!ft.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Du()&&!Mu()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=q(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=ea(n),s=Ia(i,nh);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[th]="t",i[Da]=e,i[Ma]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=q(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Cs{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=wa(),window[Yu+this.uniqueCallbackIdentifier]=e,window[Qu+this.uniqueCallbackIdentifier]=n,this.myIFrame=Cs.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){z("frame writing exception"),a.stack&&z(a.stack),z(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||z("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Da]=this.myID,e[Ma]=this.myPW,e[Fa]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Ua+i.length<=$a;){const o=this.pendingSegs.shift();i=i+"&"+Xu+s+"="+o.seg+"&"+Zu+s+"="+o.ts+"&"+eh+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(ih)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{z("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=16384,oh=45e3;let On=null;typeof MozWebSocket<"u"?On=MozWebSocket:typeof WebSocket<"u"&&(On=WebSocket);class le{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=dn(this.connId),this.stats_=Ss(n),this.connURL=le.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[Ta]=Ts,typeof location<"u"&&location.hostname&&Ra.test(location.hostname)&&(o[Ca]=ka),n&&(o[Sa]=n),i&&(o[Aa]=i),s&&(o[Zi]=s),r&&(o[xa]=r),La(e,Na,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ge.set("previous_websocket_failure",!0);try{let i;id(),this.mySock=new On(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){le.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&On!==null&&!le.forceDisallow_}static previouslyFailed(){return Ge.isInMemoryStorage||Ge.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ge.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Yt(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(m(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=q(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Ia(n,rh);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(oh))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}le.responsesRequiredToBeHealthy=2;le.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[ft,le]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=le&&le.isAvailable();let i=n&&!le.previouslyFailed();if(e.webSocketOnly&&(n||J("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[le];else{const s=this.transports_=[];for(const r of Xt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Xt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Xt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ah=6e4,lh=5e3,ch=10*1024,dh=100*1024,Oi="t",Br="d",uh="s",Wr="r",hh="e",Hr="o",Vr="a",jr="n",qr="p",fh="h";class ph{constructor(e,n,i,s,r,o,a,l,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=dn("c:"+this.id+":"),this.transportManager_=new Xt(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Ht(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>dh?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>ch?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Oi in e){const n=e[Oi];n===Vr?this.upgradeIfSecondaryHealthy_():n===Wr?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Hr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Lt("t",e),i=Lt("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:qr,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Vr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:jr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Lt("t",e),i=Lt("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Lt(Oi,e);if(Br in e){const i=e[Br];if(n===fh){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===jr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===uh?this.onConnectionShutdown_(i):n===Wr?this.onReset_(i):n===hh?Xi("Server Error: "+i):n===Hr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Xi("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Ts!==i&&J("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),Ht(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ah))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ht(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(lh))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:qr,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ge.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(e){this.allowedEvents_=e,this.listeners_={},m(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){m(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln extends Wa{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!ws()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Ln}getInitialEvent(e){return m(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr=32,Gr=768;class N{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function A(){return new N("")}function T(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function We(t){return t.pieces_.length-t.pieceNum_}function L(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new N(t.pieces_,e)}function ks(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function mh(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Zt(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Ha(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new N(e,0)}function U(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof N)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new N(n,0)}function C(t){return t.pieceNum_>=t.pieces_.length}function Z(t,e){const n=T(t),i=T(e);if(n===null)return e;if(n===i)return Z(L(t),L(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function gh(t,e){const n=Zt(t,0),i=Zt(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=at(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function Rs(t,e){if(We(t)!==We(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function re(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(We(t)>We(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class _h{constructor(e,n){this.errorPrefix_=n,this.parts_=Zt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=ti(this.parts_[i]);Va(this)}}function yh(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=ti(e),Va(t)}function vh(t){const e=t.parts_.pop();t.byteLength_-=ti(e),t.parts_.length>0&&(t.byteLength_-=1)}function Va(t){if(t.byteLength_>Gr)throw new Error(t.errorPrefix_+"has a key path longer than "+Gr+" bytes ("+t.byteLength_+").");if(t.parts_.length>zr)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+zr+") or object contains a cycle "+ze(t))}function ze(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As extends Wa{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new As}getInitialEvent(e){return m(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dt=1e3,wh=60*5*1e3,Kr=30*1e3,bh=1.3,Ih=3e4,Eh="server_kill",Yr=3;class Te extends Ba{constructor(e,n,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Te.nextPersistentConnectionId_++,this.log_=dn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Dt,this.maxReconnectDelay_=wh,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");As.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ln.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(q(r)),m(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Rt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),m(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),m(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Te.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&pe(e,"w")){const i=Qe(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();J(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||cd(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Kr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=ld(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),m(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+q(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Xi("Unrecognized action received from server: "+q(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){m(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Dt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Dt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Ih&&(this.reconnectDelay_=Dt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*bh)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Te.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(d){m(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?z("getToken() completed but was canceled"):(z("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new ph(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,p=>{J(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(Eh)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&J(d),l())}}}interrupt(e){z("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){z("Resuming connection for reason: "+e),delete this.interruptReasons_[e],zi(this.interruptReasons_)&&(this.reconnectDelay_=Dt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>Es(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new N(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){z("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Yr&&(this.reconnectDelay_=Kr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){z("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Yr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+ya.replace(/\./g,"-")]=1,ws()?e["framework.cordova"]=1:la()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ln.getInstance().currentlyOnline();return zi(this.interruptReasons_)&&e}}Te.nextPersistentConnectionId_=0;Te.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new S(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new S(bt,e),s=new S(bt,n);return this.compare(i,s)!==0}minPost(){return S.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vn;class ja extends si{static get __EMPTY_NODE(){return vn}static set __EMPTY_NODE(e){vn=e}compare(e,n){return at(e.name,n.name)}isDefinedOn(e){throw kt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return S.MIN}maxPost(){return new S(Je,vn)}makePost(e,n){return m(typeof e=="string","KeyIndex indexValue must always be a string."),new S(e,vn)}toString(){return".key"}}const gt=new ja;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class j{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??j.RED,this.left=s??ee.EMPTY_NODE,this.right=r??ee.EMPTY_NODE}copy(e,n,i,s,r){return new j(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return ee.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return ee.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,j.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,j.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}j.RED=!0;j.BLACK=!1;class Th{copy(e,n,i,s,r){return this}insert(e,n,i){return new j(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ee{constructor(e,n=ee.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ee(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,j.BLACK,null,null))}remove(e){return new ee(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,j.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new wn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new wn(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new wn(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new wn(this.root_,null,this.comparator_,!0,e)}}ee.EMPTY_NODE=new Th;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sh(t,e){return at(t.name,e.name)}function xs(t,e){return at(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let es;function Ch(t){es=t}const qa=function(t){return typeof t=="number"?"number:"+Ea(t):"string:"+t},za=function(t){if(t.isLeafNode()){const e=t.val();m(typeof e=="string"||typeof e=="number"||typeof e=="object"&&pe(e,".sv"),"Priority must be a string or number.")}else m(t===es||t.isEmpty(),"priority of unexpected type.");m(t===es||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qr;class V{constructor(e,n=V.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,m(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),za(this.priorityNode_)}static set __childrenNodeConstructor(e){Qr=e}static get __childrenNodeConstructor(){return Qr}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new V(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:V.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return C(e)?this:T(e)===".priority"?this.priorityNode_:V.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:V.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=T(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(m(i!==".priority"||We(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,V.__childrenNodeConstructor.EMPTY_NODE.updateChild(L(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+qa(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Ea(this.value_):e+=this.value_,this.lazyHash_=ba(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===V.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof V.__childrenNodeConstructor?-1:(m(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=V.VALUE_TYPE_ORDER.indexOf(n),r=V.VALUE_TYPE_ORDER.indexOf(i);return m(s>=0,"Unknown leaf type: "+n),m(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}V.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ga,Ka;function kh(t){Ga=t}function Rh(t){Ka=t}class Ah extends si{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?at(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return S.MIN}maxPost(){return new S(Je,new V("[PRIORITY-POST]",Ka))}makePost(e,n){const i=Ga(e);return new S(n,new V("[PRIORITY-POST]",i))}toString(){return".priority"}}const F=new Ah;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh=Math.log(2);class Nh{constructor(e){const n=r=>parseInt(Math.log(r)/xh,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Dn=function(t,e,n,i){t.sort(e);const s=function(l,c){const u=c-l;let d,h;if(u===0)return null;if(u===1)return d=t[l],h=n?n(d):d,new j(h,d.node,j.BLACK,null,null);{const p=parseInt(u/2,10)+l,f=s(l,p),g=s(p+1,c);return d=t[p],h=n?n(d):d,new j(h,d.node,j.BLACK,f,g)}},r=function(l){let c=null,u=null,d=t.length;const h=function(f,g){const _=d-f,y=d;d-=f;const v=s(_+1,y),w=t[_],E=n?n(w):w;p(new j(E,w.node,g,null,v))},p=function(f){c?(c.left=f,c=f):(u=f,c=f)};for(let f=0;f<l.count;++f){const g=l.nextBitIsOne(),_=Math.pow(2,l.count-(f+1));g?h(_,j.BLACK):(h(_,j.BLACK),h(_,j.RED))}return u},o=new Nh(t.length),a=r(o);return new ee(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Li;const ht={};class we{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return m(ht&&F,"ChildrenNode.ts has not been loaded"),Li=Li||new we({".priority":ht},{".priority":F}),Li}get(e){const n=Qe(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ee?n:null}hasIndex(e){return pe(this.indexSet_,e.toString())}addIndex(e,n){m(e!==gt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(S.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Dn(i,e.getCompare()):a=ht;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const u=Object.assign({},this.indexes_);return u[l]=a,new we(u,c)}addToIndexes(e,n){const i=Nn(this.indexes_,(s,r)=>{const o=Qe(this.indexSet_,r);if(m(o,"Missing index implementation for "+r),s===ht)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(S.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Dn(a,o.getCompare())}else return ht;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new S(e.name,a))),l.insert(e,e.node)}});return new we(i,this.indexSet_)}removeFromIndexes(e,n){const i=Nn(this.indexes_,s=>{if(s===ht)return s;{const r=n.get(e.name);return r?s.remove(new S(e.name,r)):s}});return new we(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mt;class b{constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&za(this.priorityNode_),this.children_.isEmpty()&&m(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Mt||(Mt=new b(new ee(xs),null,we.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Mt}updatePriority(e){return this.children_.isEmpty()?this:new b(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Mt:n}}getChild(e){const n=T(e);return n===null?this:this.getImmediateChild(n).getChild(L(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(m(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new S(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Mt:this.priorityNode_;return new b(s,o,r)}}updateChild(e,n){const i=T(e);if(i===null)return n;{m(T(e)!==".priority"||We(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(L(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(F,(o,a)=>{n[o]=a.val(e),i++,r&&b.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+qa(this.getPriority().val())+":"),this.forEachChild(F,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":ba(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new S(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new S(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new S(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,S.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,S.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===un?-1:0}withIndex(e){if(e===gt||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new b(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===gt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(F),s=n.getIterator(F);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===gt?null:this.indexMap_.get(e.toString())}}b.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Ph extends b{constructor(){super(new ee(xs),b.EMPTY_NODE,we.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return b.EMPTY_NODE}isEmpty(){return!1}}const un=new Ph;Object.defineProperties(S,{MIN:{value:new S(bt,b.EMPTY_NODE)},MAX:{value:new S(Je,un)}});ja.__EMPTY_NODE=b.EMPTY_NODE;V.__childrenNodeConstructor=b;Ch(un);Rh(un);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=!0;function H(t,e=null){if(t===null)return b.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),m(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new V(n,H(e))}if(!(t instanceof Array)&&Oh){const n=[];let i=!1;if(G(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=H(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new S(o,l)))}}),n.length===0)return b.EMPTY_NODE;const r=Dn(n,Sh,o=>o.name,xs);if(i){const o=Dn(n,F.getCompare());return new b(r,H(e),new we({".priority":o},{".priority":F}))}else return new b(r,H(e),we.Default)}else{let n=b.EMPTY_NODE;return G(t,(i,s)=>{if(pe(t,i)&&i.substring(0,1)!=="."){const r=H(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(H(e))}}kh(H);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lh extends si{constructor(e){super(),this.indexPath_=e,m(!C(e)&&T(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?at(e.name,n.name):r}makePost(e,n){const i=H(e),s=b.EMPTY_NODE.updateChild(this.indexPath_,i);return new S(n,s)}maxPost(){const e=b.EMPTY_NODE.updateChild(this.indexPath_,un);return new S(Je,e)}toString(){return Zt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh extends si{compare(e,n){const i=e.node.compareTo(n.node);return i===0?at(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return S.MIN}maxPost(){return S.MAX}makePost(e,n){const i=H(e);return new S(n,i)}toString(){return".value"}}const Mh=new Dh;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(t){return{type:"value",snapshotNode:t}}function It(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function en(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function tn(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Fh(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){m(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(en(n,a)):m(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(It(n,i)):o.trackChildChange(tn(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(F,(s,r)=>{n.hasChild(s)||i.trackChildChange(en(s,r))}),n.isLeafNode()||n.forEachChild(F,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(tn(s,r,o))}else i.trackChildChange(It(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?b.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e){this.indexedFilter_=new Ns(e.getIndex()),this.index_=e.getIndex(),this.startPost_=nn.getStartPost_(e),this.endPost_=nn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new S(n,i))||(i=b.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=b.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(b.EMPTY_NODE);const r=this;return n.forEachChild(F,(o,a)=>{r.matches(new S(o,a))||(s=s.updateImmediateChild(o,b.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new nn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new S(n,i))||(i=b.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=b.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=b.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(b.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,b.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,p)=>d(p,h)}else o=this.index_.getCompare();const a=e;m(a.numChildren()===this.limit_,"");const l=new S(n,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const p=h==null?1:o(h,l);if(u&&!i.isEmpty()&&p>=0)return r!=null&&r.trackChildChange(tn(n,i,d)),a.updateImmediateChild(n,i);{r!=null&&r.trackChildChange(en(n,d));const g=a.updateImmediateChild(n,b.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r!=null&&r.trackChildChange(It(h.name,h.node)),g.updateImmediateChild(h.name,h.node)):g}}else return i.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(en(c.name,c.node)),r.trackChildChange(It(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(c.name,b.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=F}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return m(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return m(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:bt}hasEnd(){return this.endSet_}getIndexEndValue(){return m(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return m(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Je}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return m(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===F}copy(){const e=new Ps;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Uh(t){return t.loadsAllData()?new Ns(t.getIndex()):t.hasLimit()?new $h(t):new nn(t)}function Jr(t){const e={};if(t.isDefault())return e;let n;if(t.index_===F?n="$priority":t.index_===Mh?n="$value":t.index_===gt?n="$key":(m(t.index_ instanceof Lh,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=q(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=q(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+q(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=q(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+q(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Xr(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==F&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn extends Ba{constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=dn("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(m(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Mn.getListenId_(e,i),a={};this.listens_[o]=a;const l=Jr(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let d=u;if(c===404&&(d=null,c=null),c===null&&this.onDataUpdate_(r,d,!1,i),Qe(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,n){const i=Mn.getListenId_(e,n);delete this.listens_[i]}get(e){const n=Jr(e._queryParams),i=e._path.toString(),s=new Rt;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+At(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Yt(a.responseText)}catch{J("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&J("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bh{constructor(){this.rootNode_=b.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(){return{value:null,children:new Map}}function Qa(t,e,n){if(C(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=T(e);t.children.has(i)||t.children.set(i,Fn());const s=t.children.get(i);e=L(e),Qa(s,e,n)}}function ts(t,e,n){t.value!==null?n(e,t.value):Wh(t,(i,s)=>{const r=new N(e.toString()+"/"+i);ts(s,r,n)})}function Wh(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&G(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr=10*1e3,Vh=30*1e3,jh=5*60*1e3;class qh{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Hh(e);const i=Zr+(Vh-Zr)*Math.random();Ht(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;G(e,(s,r)=>{r>0&&pe(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),Ht(this.reportStats_.bind(this),Math.floor(Math.random()*2*jh))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ce;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ce||(ce={}));function Os(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Ls(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ds(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=ce.ACK_USER_WRITE,this.source=Os()}operationForChild(e){if(C(this.path)){if(this.affectedTree.value!=null)return m(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new N(e));return new $n(A(),n,this.revert)}}else return m(T(this.path)===e,"operationForChild called for unrelated child."),new $n(L(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,n){this.source=e,this.path=n,this.type=ce.LISTEN_COMPLETE}operationForChild(e){return C(this.path)?new sn(this.source,A()):new sn(this.source,L(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=ce.OVERWRITE}operationForChild(e){return C(this.path)?new Xe(this.source,A(),this.snap.getImmediateChild(e)):new Xe(this.source,L(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=ce.MERGE}operationForChild(e){if(C(this.path)){const n=this.children.subtree(new N(e));return n.isEmpty()?null:n.value?new Xe(this.source,A(),n.value):new Et(this.source,A(),n)}else return m(T(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Et(this.source,L(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(C(e))return this.isFullyInitialized()&&!this.filtered_;const n=T(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Gh(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Fh(o.childName,o.snapshotNode))}),Ft(t,s,"child_removed",e,i,n),Ft(t,s,"child_added",e,i,n),Ft(t,s,"child_moved",r,i,n),Ft(t,s,"child_changed",e,i,n),Ft(t,s,"value",e,i,n),s}function Ft(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,l)=>Yh(t,a,l)),o.forEach(a=>{const l=Kh(t,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function Kh(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Yh(t,e,n){if(e.childName==null||n.childName==null)throw kt("Should only compare child_ events.");const i=new S(e.childName,e.snapshotNode),s=new S(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ri(t,e){return{eventCache:t,serverCache:e}}function Vt(t,e,n,i){return ri(new Ze(e,n,i),t.serverCache)}function Ja(t,e,n,i){return ri(t.eventCache,new Ze(e,n,i))}function ns(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function et(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Di;const Qh=()=>(Di||(Di=new ee(Lu)),Di);class O{constructor(e,n=Qh()){this.value=e,this.children=n}static fromObject(e){let n=new O(null);return G(e,(i,s)=>{n=n.set(new N(i),s)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:A(),value:this.value};if(C(e))return null;{const i=T(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(L(e),n);return r!=null?{path:U(new N(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(C(e))return this;{const n=T(e),i=this.children.get(n);return i!==null?i.subtree(L(e)):new O(null)}}set(e,n){if(C(e))return new O(n,this.children);{const i=T(e),r=(this.children.get(i)||new O(null)).set(L(e),n),o=this.children.insert(i,r);return new O(this.value,o)}}remove(e){if(C(e))return this.children.isEmpty()?new O(null):new O(null,this.children);{const n=T(e),i=this.children.get(n);if(i){const s=i.remove(L(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new O(null):new O(this.value,r)}else return this}}get(e){if(C(e))return this.value;{const n=T(e),i=this.children.get(n);return i?i.get(L(e)):null}}setTree(e,n){if(C(e))return n;{const i=T(e),r=(this.children.get(i)||new O(null)).setTree(L(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new O(this.value,o)}}fold(e){return this.fold_(A(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(U(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,A(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(C(e))return null;{const r=T(e),o=this.children.get(r);return o?o.findOnPath_(L(e),U(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,A(),n)}foreachOnPath_(e,n,i){if(C(e))return this;{this.value&&i(n,this.value);const s=T(e),r=this.children.get(s);return r?r.foreachOnPath_(L(e),U(n,s),i):new O(null)}}foreach(e){this.foreach_(A(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(U(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.writeTree_=e}static empty(){return new de(new O(null))}}function jt(t,e,n){if(C(e))return new de(new O(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=Z(s,e);return r=r.updateChild(o,n),new de(t.writeTree_.set(s,r))}else{const s=new O(n),r=t.writeTree_.setTree(e,s);return new de(r)}}}function is(t,e,n){let i=t;return G(n,(s,r)=>{i=jt(i,U(e,s),r)}),i}function eo(t,e){if(C(e))return de.empty();{const n=t.writeTree_.setTree(e,new O(null));return new de(n)}}function ss(t,e){return lt(t,e)!=null}function lt(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Z(n.path,e)):null}function to(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(F,(i,s)=>{e.push(new S(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new S(i,s.value))}),e}function Ue(t,e){if(C(e))return t;{const n=lt(t,e);return n!=null?new de(new O(n)):new de(t.writeTree_.subtree(e))}}function rs(t){return t.writeTree_.isEmpty()}function Tt(t,e){return Xa(A(),t.writeTree_,e)}function Xa(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(m(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Xa(U(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(U(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ms(t,e){return nl(e,t)}function Jh(t,e,n,i,s){m(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=jt(t.visibleWrites,e,n)),t.lastWriteId=i}function Xh(t,e,n,i){m(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=is(t.visibleWrites,e,n),t.lastWriteId=i}function Zh(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function ef(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);m(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&tf(a,i.path)?s=!1:re(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return nf(t),!0;if(i.snap)t.visibleWrites=eo(t.visibleWrites,i.path);else{const a=i.children;G(a,l=>{t.visibleWrites=eo(t.visibleWrites,U(i.path,l))})}return!0}else return!1}function tf(t,e){if(t.snap)return re(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&re(U(t.path,n),e))return!0;return!1}function nf(t){t.visibleWrites=Za(t.allWrites,sf,A()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function sf(t){return t.visible}function Za(t,e,n){let i=de.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)re(n,o)?(a=Z(n,o),i=jt(i,a,r.snap)):re(o,n)&&(a=Z(o,n),i=jt(i,A(),r.snap.getChild(a)));else if(r.children){if(re(n,o))a=Z(n,o),i=is(i,a,r.children);else if(re(o,n))if(a=Z(o,n),C(a))i=is(i,A(),r.children);else{const l=Qe(r.children,T(a));if(l){const c=l.getChild(L(a));i=jt(i,A(),c)}}}else throw kt("WriteRecord should have .snap or .children")}}return i}function el(t,e,n,i,s){if(!i&&!s){const r=lt(t.visibleWrites,e);if(r!=null)return r;{const o=Ue(t.visibleWrites,e);if(rs(o))return n;if(n==null&&!ss(o,A()))return null;{const a=n||b.EMPTY_NODE;return Tt(o,a)}}}else{const r=Ue(t.visibleWrites,e);if(!s&&rs(r))return n;if(!s&&n==null&&!ss(r,A()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(re(c.path,e)||re(e,c.path))},a=Za(t.allWrites,o,e),l=n||b.EMPTY_NODE;return Tt(a,l)}}}function rf(t,e,n){let i=b.EMPTY_NODE;const s=lt(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(F,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=Ue(t.visibleWrites,e);return n.forEachChild(F,(o,a)=>{const l=Tt(Ue(r,new N(o)),a);i=i.updateImmediateChild(o,l)}),to(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Ue(t.visibleWrites,e);return to(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function of(t,e,n,i,s){m(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=U(e,n);if(ss(t.visibleWrites,r))return null;{const o=Ue(t.visibleWrites,r);return rs(o)?s.getChild(n):Tt(o,s.getChild(n))}}function af(t,e,n,i){const s=U(e,n),r=lt(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=Ue(t.visibleWrites,s);return Tt(o,i.getNode().getImmediateChild(n))}else return null}function lf(t,e){return lt(t.visibleWrites,e)}function cf(t,e,n,i,s,r,o){let a;const l=Ue(t.visibleWrites,e),c=lt(l,A());if(c!=null)a=c;else if(n!=null)a=Tt(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=h.getNext();for(;p&&u.length<s;)d(p,i)!==0&&u.push(p),p=h.getNext();return u}else return[]}function df(){return{visibleWrites:de.empty(),allWrites:[],lastWriteId:-1}}function Un(t,e,n,i){return el(t.writeTree,t.treePath,e,n,i)}function Fs(t,e){return rf(t.writeTree,t.treePath,e)}function no(t,e,n,i){return of(t.writeTree,t.treePath,e,n,i)}function Bn(t,e){return lf(t.writeTree,U(t.treePath,e))}function uf(t,e,n,i,s,r){return cf(t.writeTree,t.treePath,e,n,i,s,r)}function $s(t,e,n){return af(t.writeTree,t.treePath,e,n)}function tl(t,e){return nl(U(t.treePath,e),t.writeTree)}function nl(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;m(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),m(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,tn(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,en(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,It(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,tn(i,e.snapshotNode,s.oldSnap));else throw kt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const il=new ff;class Us{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Ze(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return $s(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:et(this.viewCache_),r=uf(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(t){return{filter:t}}function mf(t,e){m(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),m(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function gf(t,e,n,i,s){const r=new hf;let o,a;if(n.type===ce.OVERWRITE){const c=n;c.source.fromUser?o=os(t,e,c.path,c.snap,i,s,r):(m(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!C(c.path),o=Wn(t,e,c.path,c.snap,i,s,a,r))}else if(n.type===ce.MERGE){const c=n;c.source.fromUser?o=yf(t,e,c.path,c.children,i,s,r):(m(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=as(t,e,c.path,c.children,i,s,a,r))}else if(n.type===ce.ACK_USER_WRITE){const c=n;c.revert?o=bf(t,e,c.path,i,s,r):o=vf(t,e,c.path,c.affectedTree,i,s,r)}else if(n.type===ce.LISTEN_COMPLETE)o=wf(t,e,n.path,i,r);else throw kt("Unknown operation type: "+n.type);const l=r.getChanges();return _f(e,o,l),{viewCache:o,changes:l}}function _f(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=ns(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(Ya(ns(e)))}}function sl(t,e,n,i,s,r){const o=e.eventCache;if(Bn(i,n)!=null)return e;{let a,l;if(C(n))if(m(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=et(e),u=c instanceof b?c:b.EMPTY_NODE,d=Fs(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const c=Un(i,et(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=T(n);if(c===".priority"){m(We(n)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const d=no(i,n,u,l);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=L(n);let d;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=no(i,n,o.getNode(),l);h!=null?d=o.getNode().getImmediateChild(c).updateChild(u,h):d=o.getNode().getImmediateChild(c)}else d=$s(i,c,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),c,d,u,s,r):a=o.getNode()}}return Vt(e,a,o.isFullyInitialized()||C(n),t.filter.filtersNodes())}}function Wn(t,e,n,i,s,r,o,a){const l=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(C(n))c=u.updateFullNode(l.getNode(),i,null);else if(u.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(n,i);c=u.updateFullNode(l.getNode(),p,null)}else{const p=T(n);if(!l.isCompleteForPath(n)&&We(n)>1)return e;const f=L(n),_=l.getNode().getImmediateChild(p).updateChild(f,i);p===".priority"?c=u.updatePriority(l.getNode(),_):c=u.updateChild(l.getNode(),p,_,f,il,null)}const d=Ja(e,c,l.isFullyInitialized()||C(n),u.filtersNodes()),h=new Us(s,d,r);return sl(t,d,n,s,h,a)}function os(t,e,n,i,s,r,o){const a=e.eventCache;let l,c;const u=new Us(s,e,r);if(C(n))c=t.filter.updateFullNode(e.eventCache.getNode(),i,o),l=Vt(e,c,!0,t.filter.filtersNodes());else{const d=T(n);if(d===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),i),l=Vt(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=L(n),p=a.getNode().getImmediateChild(d);let f;if(C(h))f=i;else{const g=u.getCompleteChild(d);g!=null?ks(h)===".priority"&&g.getChild(Ha(h)).isEmpty()?f=g:f=g.updateChild(h,i):f=b.EMPTY_NODE}if(p.equals(f))l=e;else{const g=t.filter.updateChild(a.getNode(),d,f,h,u,o);l=Vt(e,g,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function so(t,e){return t.eventCache.isCompleteForChild(e)}function yf(t,e,n,i,s,r,o){let a=e;return i.foreach((l,c)=>{const u=U(n,l);so(e,T(u))&&(a=os(t,a,u,c,s,r,o))}),i.foreach((l,c)=>{const u=U(n,l);so(e,T(u))||(a=os(t,a,u,c,s,r,o))}),a}function ro(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function as(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;C(n)?c=i:c=new O(null).setTree(n,i);const u=e.serverCache.getNode();return c.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const p=e.serverCache.getNode().getImmediateChild(d),f=ro(t,p,h);l=Wn(t,l,new N(d),f,s,r,o,a)}}),c.children.inorderTraversal((d,h)=>{const p=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!p){const f=e.serverCache.getNode().getImmediateChild(d),g=ro(t,f,h);l=Wn(t,l,new N(d),g,s,r,o,a)}}),l}function vf(t,e,n,i,s,r,o){if(Bn(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(C(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Wn(t,e,n,l.getNode().getChild(n),s,r,a,o);if(C(n)){let c=new O(null);return l.getNode().forEachChild(gt,(u,d)=>{c=c.set(new N(u),d)}),as(t,e,n,c,s,r,a,o)}else return e}else{let c=new O(null);return i.foreach((u,d)=>{const h=U(n,u);l.isCompleteForPath(h)&&(c=c.set(u,l.getNode().getChild(h)))}),as(t,e,n,c,s,r,a,o)}}function wf(t,e,n,i,s){const r=e.serverCache,o=Ja(e,r.getNode(),r.isFullyInitialized()||C(n),r.isFiltered());return sl(t,o,n,i,il,s)}function bf(t,e,n,i,s,r){let o;if(Bn(i,n)!=null)return e;{const a=new Us(i,e,s),l=e.eventCache.getNode();let c;if(C(n)||T(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Un(i,et(e));else{const d=e.serverCache.getNode();m(d instanceof b,"serverChildren would be complete if leaf node"),u=Fs(i,d)}u=u,c=t.filter.updateFullNode(l,u,r)}else{const u=T(n);let d=$s(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=l.getImmediateChild(u)),d!=null?c=t.filter.updateChild(l,u,d,L(n),a,r):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(l,u,b.EMPTY_NODE,L(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Un(i,et(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Bn(i,A())!=null,Vt(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Ns(i.getIndex()),r=Uh(i);this.processor_=pf(r);const o=n.serverCache,a=n.eventCache,l=s.updateFullNode(b.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(b.EMPTY_NODE,a.getNode(),null),u=new Ze(l,o.isFullyInitialized(),s.filtersNodes()),d=new Ze(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=ri(d,u),this.eventGenerator_=new zh(this.query_)}get query(){return this.query_}}function Ef(t){return t.viewCache_.serverCache.getNode()}function Tf(t,e){const n=et(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!C(e)&&!n.getImmediateChild(T(e)).isEmpty())?n.getChild(e):null}function oo(t){return t.eventRegistrations_.length===0}function Sf(t,e){t.eventRegistrations_.push(e)}function ao(t,e,n){const i=[];if(n){m(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function lo(t,e,n,i){e.type===ce.MERGE&&e.source.queryId!==null&&(m(et(t.viewCache_),"We should always have a full cache before handling merges"),m(ns(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=gf(t.processor_,s,e,n,i);return mf(t.processor_,r.viewCache),m(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,rl(t,r.changes,r.viewCache.eventCache.getNode(),null)}function Cf(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(F,(r,o)=>{i.push(It(r,o))}),n.isFullyInitialized()&&i.push(Ya(n.getNode())),rl(t,i,n.getNode(),e)}function rl(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return Gh(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hn;class kf{constructor(){this.views=new Map}}function Rf(t){m(!Hn,"__referenceConstructor has already been defined"),Hn=t}function Af(){return m(Hn,"Reference.ts has not been loaded"),Hn}function xf(t){return t.views.size===0}function Bs(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return m(r!=null,"SyncTree gave us an op for an invalid query."),lo(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(lo(o,e,n,i));return r}}function Nf(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=Un(n,s?i:null),l=!1;a?l=!0:i instanceof b?(a=Fs(n,i),l=!1):(a=b.EMPTY_NODE,l=!1);const c=ri(new Ze(a,l,!1),new Ze(i,s,!1));return new If(e,c)}return o}function Pf(t,e,n,i,s,r){const o=Nf(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),Sf(o,n),Cf(o,n)}function Of(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=He(t);if(s==="default")for(const[l,c]of t.views.entries())o=o.concat(ao(c,n,i)),oo(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(s);l&&(o=o.concat(ao(l,n,i)),oo(l)&&(t.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!He(t)&&r.push(new(Af())(e._repo,e._path)),{removed:r,events:o}}function ol(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function _t(t,e){let n=null;for(const i of t.views.values())n=n||Tf(i,e);return n}function al(t,e){if(e._queryParams.loadsAllData())return oi(t);{const i=e._queryIdentifier;return t.views.get(i)}}function ll(t,e){return al(t,e)!=null}function He(t){return oi(t)!=null}function oi(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vn;function Lf(t){m(!Vn,"__referenceConstructor has already been defined"),Vn=t}function Df(){return m(Vn,"Reference.ts has not been loaded"),Vn}let Mf=1;class co{constructor(e){this.listenProvider_=e,this.syncPointTree_=new O(null),this.pendingWriteTree_=df(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ws(t,e,n,i,s){return Jh(t.pendingWriteTree_,e,n,i,s),s?Nt(t,new Xe(Os(),e,n)):[]}function Ff(t,e,n,i){Xh(t.pendingWriteTree_,e,n,i);const s=O.fromObject(n);return Nt(t,new Et(Os(),e,s))}function Me(t,e,n=!1){const i=Zh(t.pendingWriteTree_,e);if(ef(t.pendingWriteTree_,e)){let r=new O(null);return i.snap!=null?r=r.set(A(),!0):G(i.children,o=>{r=r.set(new N(o),!0)}),Nt(t,new $n(i.path,r,n))}else return[]}function ai(t,e,n){return Nt(t,new Xe(Ls(),e,n))}function $f(t,e,n){const i=O.fromObject(n);return Nt(t,new Et(Ls(),e,i))}function Uf(t,e){return Nt(t,new sn(Ls(),e))}function Bf(t,e,n){const i=Hs(t,n);if(i){const s=Vs(i),r=s.path,o=s.queryId,a=Z(r,e),l=new sn(Ds(o),a);return js(t,r,l)}else return[]}function ls(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||ll(o,e))){const l=Of(o,e,n,i);xf(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const u=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(r,(h,p)=>He(p));if(u&&!d){const h=t.syncPointTree_.subtree(r);if(!h.isEmpty()){const p=Vf(h);for(let f=0;f<p.length;++f){const g=p[f],_=g.query,y=ul(t,g);t.listenProvider_.startListening(qt(_),jn(t,_),y.hashFn,y.onComplete)}}}!d&&c.length>0&&!i&&(u?t.listenProvider_.stopListening(qt(e),null):c.forEach(h=>{const p=t.queryToTagMap.get(ci(h));t.listenProvider_.stopListening(qt(h),p)}))}jf(t,c)}return a}function Wf(t,e,n,i){const s=Hs(t,i);if(s!=null){const r=Vs(s),o=r.path,a=r.queryId,l=Z(o,e),c=new Xe(Ds(a),l,n);return js(t,o,c)}else return[]}function Hf(t,e,n,i){const s=Hs(t,i);if(s){const r=Vs(s),o=r.path,a=r.queryId,l=Z(o,e),c=O.fromObject(n),u=new Et(Ds(a),l,c);return js(t,o,u)}else return[]}function uo(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(h,p)=>{const f=Z(h,s);r=r||_t(p,f),o=o||He(p)});let a=t.syncPointTree_.get(s);a?(o=o||He(a),r=r||_t(a,A())):(a=new kf,t.syncPointTree_=t.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=b.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((p,f)=>{const g=_t(f,A());g&&(r=r.updateImmediateChild(p,g))}));const c=ll(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=ci(e);m(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const p=qf();t.queryToTagMap.set(h,p),t.tagToQueryMap.set(p,h)}const u=Ms(t.pendingWriteTree_,s);let d=Pf(a,e,n,u,r,l);if(!c&&!o&&!i){const h=al(a,e);d=d.concat(zf(t,e,h))}return d}function li(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=Z(o,e),c=_t(a,l);if(c)return c});return el(s,e,r,n,!0)}function Nt(t,e){return cl(e,t.syncPointTree_,null,Ms(t.pendingWriteTree_,A()))}function cl(t,e,n,i){if(C(t.path))return dl(t,e,n,i);{const s=e.get(A());n==null&&s!=null&&(n=_t(s,A()));let r=[];const o=T(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,u=tl(i,o);r=r.concat(cl(a,l,c,u))}return s&&(r=r.concat(Bs(s,t,i,n))),r}}function dl(t,e,n,i){const s=e.get(A());n==null&&s!=null&&(n=_t(s,A()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=tl(i,o),u=t.operationForChild(o);u&&(r=r.concat(dl(u,a,l,c)))}),s&&(r=r.concat(Bs(s,t,i,n))),r}function ul(t,e){const n=e.query,i=jn(t,n);return{hashFn:()=>(Ef(e)||b.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Bf(t,n._path,i):Uf(t,n._path);{const r=Fu(s,n);return ls(t,n,null,r)}}}}function jn(t,e){const n=ci(e);return t.queryToTagMap.get(n)}function ci(t){return t._path.toString()+"$"+t._queryIdentifier}function Hs(t,e){return t.tagToQueryMap.get(e)}function Vs(t){const e=t.indexOf("$");return m(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new N(t.substr(0,e))}}function js(t,e,n){const i=t.syncPointTree_.get(e);m(i,"Missing sync point for query tag that we're tracking");const s=Ms(t.pendingWriteTree_,e);return Bs(i,n,s,null)}function Vf(t){return t.fold((e,n,i)=>{if(n&&He(n))return[oi(n)];{let s=[];return n&&(s=ol(n)),G(i,(r,o)=>{s=s.concat(o)}),s}})}function qt(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Df())(t._repo,t._path):t}function jf(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=ci(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function qf(){return Mf++}function zf(t,e,n){const i=e._path,s=jn(t,e),r=ul(t,n),o=t.listenProvider_.startListening(qt(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)m(!He(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,d)=>{if(!C(c)&&u&&He(u))return[oi(u).query];{let h=[];return u&&(h=h.concat(ol(u).map(p=>p.query))),G(d,(p,f)=>{h=h.concat(f)}),h}});for(let c=0;c<l.length;++c){const u=l[c];t.listenProvider_.stopListening(qt(u),jn(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new qs(n)}node(){return this.node_}}class zs{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=U(this.path_,e);return new zs(this.syncTree_,n)}node(){return li(this.syncTree_,this.path_)}}const Gf=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},ho=function(t,e,n){if(!t||typeof t!="object")return t;if(m(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return Kf(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Yf(t[".sv"],e);m(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},Kf=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:m(!1,"Unexpected server value: "+t)}},Yf=function(t,e,n){t.hasOwnProperty("increment")||m(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&m(!1,"Unexpected increment value: "+i);const s=e.node();if(m(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},hl=function(t,e,n,i){return Ks(e,new zs(n,t),i)},Gs=function(t,e,n){return Ks(t,new qs(e),n)};function Ks(t,e,n){const i=t.getPriority().val(),s=ho(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=ho(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new V(a,H(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new V(s))),o.forEachChild(F,(a,l)=>{const c=Ks(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function di(t,e){let n=e instanceof N?e:new N(e),i=t,s=T(n);for(;s!==null;){const r=Qe(i.node.children,s)||{children:{},childCount:0};i=new Ys(s,i,r),n=L(n),s=T(n)}return i}function ct(t){return t.node.value}function Qs(t,e){t.node.value=e,cs(t)}function fl(t){return t.node.childCount>0}function Qf(t){return ct(t)===void 0&&!fl(t)}function ui(t,e){G(t.node.children,(n,i)=>{e(new Ys(n,t,i))})}function pl(t,e,n,i){n&&e(t),ui(t,s=>{pl(s,e,!0)})}function Jf(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function hn(t){return new N(t.parent===null?t.name:hn(t.parent)+"/"+t.name)}function cs(t){t.parent!==null&&Xf(t.parent,t.name,t)}function Xf(t,e,n){const i=Qf(n),s=pe(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,cs(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,cs(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf=/[\[\].#$\/\u0000-\u001F\u007F]/,ep=/[\[\].#$\u0000-\u001F\u007F]/,Mi=10*1024*1024,Js=function(t){return typeof t=="string"&&t.length!==0&&!Zf.test(t)},ml=function(t){return typeof t=="string"&&t.length!==0&&!ep.test(t)},tp=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),ml(t)},gl=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Is(t)||t&&typeof t=="object"&&pe(t,".sv")},_l=function(t,e,n,i){i&&e===void 0||fn(ei(t,"value"),e,n)},fn=function(t,e,n){const i=n instanceof N?new _h(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+ze(i));if(typeof e=="function")throw new Error(t+"contains a function "+ze(i)+" with contents = "+e.toString());if(Is(e))throw new Error(t+"contains "+e.toString()+" "+ze(i));if(typeof e=="string"&&e.length>Mi/3&&ti(e)>Mi)throw new Error(t+"contains a string greater than "+Mi+" utf8 bytes "+ze(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(G(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Js(o)))throw new Error(t+" contains an invalid key ("+o+") "+ze(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);yh(i,o),fn(t,a,i),vh(i)}),s&&r)throw new Error(t+' contains ".value" child '+ze(i)+" in addition to actual children.")}},np=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Zt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Js(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(gh);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&re(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},ip=function(t,e,n,i){const s=ei(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];G(e,(o,a)=>{const l=new N(o);if(fn(s,a,U(n,l)),ks(l)===".priority"&&!gl(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),np(s,r)},yl=function(t,e,n,i){if(!ml(n))throw new Error(ei(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},sp=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),yl(t,e,n)},hi=function(t,e){if(T(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},rp=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Js(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!tp(n))throw new Error(ei(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class op{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function fi(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!Rs(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function vl(t,e,n){fi(t,n),wl(t,i=>Rs(i,e))}function ae(t,e,n){fi(t,n),wl(t,i=>re(i,e)||re(e,i))}function wl(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(ap(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function ap(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();Wt&&z("event: "+n.toString()),xt(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp="repo_interrupt",cp=25;class dp{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new op,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Fn(),this.transactionQueueTree_=new Ys,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function up(t,e,n){if(t.stats_=Ss(t.repoInfo_),t.forceRestClient_||Wu())t.server_=new Mn(t.repoInfo_,(i,s,r,o)=>{fo(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>po(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{q(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new Te(t.repoInfo_,e,(i,s,r,o)=>{fo(t,i,s,r,o)},i=>{po(t,i)},i=>{hp(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=zu(t.repoInfo_,()=>new qh(t.stats_,t.server_)),t.infoData_=new Bh,t.infoSyncTree_=new co({startListening:(i,s,r,o)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=ai(t.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Xs(t,"connected",!1),t.serverSyncTree_=new co({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);ae(t.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function bl(t){const n=t.infoData_.getNode(new N(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function pn(t){return Gf({timestamp:bl(t)})}function fo(t,e,n,i,s){t.dataUpdateCount++;const r=new N(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const l=Nn(n,c=>H(c));o=Hf(t.serverSyncTree_,r,l,s)}else{const l=H(n);o=Wf(t.serverSyncTree_,r,l,s)}else if(i){const l=Nn(n,c=>H(c));o=$f(t.serverSyncTree_,r,l)}else{const l=H(n);o=ai(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=St(t,r)),ae(t.eventQueue_,a,o)}function po(t,e){Xs(t,"connected",e),e===!1&&mp(t)}function hp(t,e){G(e,(n,i)=>{Xs(t,n,i)})}function Xs(t,e,n){const i=new N("/.info/"+e),s=H(n);t.infoData_.updateSnapshot(i,s);const r=ai(t.infoSyncTree_,i,s);ae(t.eventQueue_,i,r)}function pi(t){return t.nextWriteId_++}function fp(t,e,n,i,s){mn(t,"set",{path:e.toString(),value:n,priority:i});const r=pn(t),o=H(n,i),a=li(t.serverSyncTree_,e),l=Gs(o,a,r),c=pi(t),u=Ws(t.serverSyncTree_,e,l,c,!0);fi(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,p)=>{const f=h==="ok";f||J("set at "+e+" failed: "+h);const g=Me(t.serverSyncTree_,c,!f);ae(t.eventQueue_,e,g),ds(t,s,h,p)});const d=er(t,e);St(t,d),ae(t.eventQueue_,d,[])}function pp(t,e,n,i){mn(t,"update",{path:e.toString(),value:n});let s=!0;const r=pn(t),o={};if(G(n,(a,l)=>{s=!1,o[a]=hl(U(e,a),H(l),t.serverSyncTree_,r)}),s)z("update() called with empty data.  Don't do anything."),ds(t,i,"ok",void 0);else{const a=pi(t),l=Ff(t.serverSyncTree_,e,o,a);fi(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,u)=>{const d=c==="ok";d||J("update at "+e+" failed: "+c);const h=Me(t.serverSyncTree_,a,!d),p=h.length>0?St(t,e):e;ae(t.eventQueue_,p,h),ds(t,i,c,u)}),G(n,c=>{const u=er(t,U(e,c));St(t,u)}),ae(t.eventQueue_,e,[])}}function mp(t){mn(t,"onDisconnectEvents");const e=pn(t),n=Fn();ts(t.onDisconnect_,A(),(s,r)=>{const o=hl(s,r,t.serverSyncTree_,e);Qa(n,s,o)});let i=[];ts(n,A(),(s,r)=>{i=i.concat(ai(t.serverSyncTree_,s,r));const o=er(t,s);St(t,o)}),t.onDisconnect_=Fn(),ae(t.eventQueue_,A(),i)}function gp(t,e,n){let i;T(e._path)===".info"?i=uo(t.infoSyncTree_,e,n):i=uo(t.serverSyncTree_,e,n),vl(t.eventQueue_,e._path,i)}function mo(t,e,n){let i;T(e._path)===".info"?i=ls(t.infoSyncTree_,e,n):i=ls(t.serverSyncTree_,e,n),vl(t.eventQueue_,e._path,i)}function _p(t){t.persistentConnection_&&t.persistentConnection_.interrupt(lp)}function mn(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),z(n,...e)}function ds(t,e,n,i){e&&xt(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function yp(t,e,n,i,s,r){mn(t,"transaction on "+e);const o={path:e,update:n,onComplete:i,status:null,order:wa(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Zs(t,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{fn("transaction failed: Data returned ",l,o.path),o.status=0;const c=di(t.transactionQueueTree_,e),u=ct(c)||[];u.push(o),Qs(c,u);let d;typeof l=="object"&&l!==null&&pe(l,".priority")?(d=Qe(l,".priority"),m(gl(d),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):d=(li(t.serverSyncTree_,e)||b.EMPTY_NODE).getPriority().val();const h=pn(t),p=H(l,d),f=Gs(p,a,h);o.currentOutputSnapshotRaw=p,o.currentOutputSnapshotResolved=f,o.currentWriteId=pi(t);const g=Ws(t.serverSyncTree_,e,f,o.currentWriteId,o.applyLocally);ae(t.eventQueue_,e,g),mi(t,t.transactionQueueTree_)}}function Zs(t,e,n){return li(t.serverSyncTree_,e,n)||b.EMPTY_NODE}function mi(t,e=t.transactionQueueTree_){if(e||gi(t,e),ct(e)){const n=El(t,e);m(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&vp(t,hn(e),n)}else fl(e)&&ui(e,n=>{mi(t,n)})}function vp(t,e,n){const i=n.map(c=>c.currentWriteId),s=Zs(t,e,i);let r=s;const o=s.hash();for(let c=0;c<n.length;c++){const u=n[c];m(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=Z(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{mn(t,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(Me(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();gi(t,di(t.transactionQueueTree_,e)),mi(t,t.transactionQueueTree_),ae(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)xt(d[h])}else{if(c==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{J("transaction at "+l.toString()+" failed: "+c);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=c}St(t,e)}},o)}function St(t,e){const n=Il(t,e),i=hn(n),s=El(t,n);return wp(t,s,i),i}function wp(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=Z(n,l.path);let u=!1,d;if(m(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,d=l.abortReason,s=s.concat(Me(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=cp)u=!0,d="maxretry",s=s.concat(Me(t.serverSyncTree_,l.currentWriteId,!0));else{const h=Zs(t,l.path,o);l.currentInputSnapshot=h;const p=e[a].update(h.val());if(p!==void 0){fn("transaction failed: Data returned ",p,l.path);let f=H(p);typeof p=="object"&&p!=null&&pe(p,".priority")||(f=f.updatePriority(h.getPriority()));const _=l.currentWriteId,y=pn(t),v=Gs(f,h,y);l.currentOutputSnapshotRaw=f,l.currentOutputSnapshotResolved=v,l.currentWriteId=pi(t),o.splice(o.indexOf(_),1),s=s.concat(Ws(t.serverSyncTree_,l.path,v,l.currentWriteId,l.applyLocally)),s=s.concat(Me(t.serverSyncTree_,_,!0))}else u=!0,d="nodata",s=s.concat(Me(t.serverSyncTree_,l.currentWriteId,!0))}ae(t.eventQueue_,n,s),s=[],u&&(e[a].status=2,function(h){setTimeout(h,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}gi(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)xt(i[a]);mi(t,t.transactionQueueTree_)}function Il(t,e){let n,i=t.transactionQueueTree_;for(n=T(e);n!==null&&ct(i)===void 0;)i=di(i,n),e=L(e),n=T(e);return i}function El(t,e){const n=[];return Tl(t,e,n),n.sort((i,s)=>i.order-s.order),n}function Tl(t,e,n){const i=ct(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);ui(e,s=>{Tl(t,s,n)})}function gi(t,e){const n=ct(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,Qs(e,n.length>0?n:void 0)}ui(e,i=>{gi(t,i)})}function er(t,e){const n=hn(Il(t,e)),i=di(t.transactionQueueTree_,e);return Jf(i,s=>{Fi(t,s)}),Fi(t,i),pl(i,s=>{Fi(t,s)}),n}function Fi(t,e){const n=ct(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(m(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(m(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Me(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Qs(e,void 0):n.length=r+1,ae(t.eventQueue_,hn(e),s);for(let o=0;o<i.length;o++)xt(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bp(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Ip(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):J(`Invalid query segment '${n}' in query '${t}'`)}return e}const go=function(t,e){const n=Ep(t),i=n.namespace;n.domain==="firebase.com"&&Ce(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Ce("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Pu();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Oa(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new N(n.pathString)}},Ep=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(s=bp(t.substring(u,d)));const h=Ip(t.substring(Math.min(t.length,d)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")n="localhost";else if(p.split(".").length<=2)n=p;else{const f=e.indexOf(".");i=e.substring(0,f).toLowerCase(),n=e.substring(f+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _o="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Tp=function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=_o.charAt(n%64),n=Math.floor(n/64);m(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=_o.charAt(e[s]);return m(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+q(this.snapshot.exportVal())}}class Cp{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return m(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return C(this._path)?null:ks(this._path)}get ref(){return new Re(this._repo,this._path)}get _queryIdentifier(){const e=Xr(this._queryParams),n=Es(e);return n==="{}"?"default":n}get _queryObject(){return Xr(this._queryParams)}isEqual(e){if(e=$(e),!(e instanceof tr))return!1;const n=this._repo===e._repo,i=Rs(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+mh(this._path)}}class Re extends tr{constructor(e,n){super(e,n,new Ps,!1)}get parent(){const e=Ha(this._path);return e===null?null:new Re(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class rn{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new N(e),i=on(this.ref,e);return new rn(this._node.getChild(n),i,F)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new rn(s,on(this.ref,i),F)))}hasChild(e){const n=new N(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function K(t,e){return t=$(t),t._checkNotDeleted("ref"),e!==void 0?on(t._root,e):t._root}function on(t,e){return t=$(t),T(t._path)===null?sp("child","path",e):yl("child","path",e),new Re(t._repo,U(t._path,e))}function qn(t,e){t=$(t),hi("push",t._path),_l("push",e,t._path,!0);const n=bl(t._repo),i=Tp(n),s=on(t,i),r=on(t,i);let o;return e!=null?o=dt(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Rp(t){return hi("remove",t._path),dt(t,null)}function dt(t,e){t=$(t),hi("set",t._path),_l("set",e,t._path,!1);const n=new Rt;return fp(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function _i(t,e){ip("update",e,t._path);const n=new Rt;return pp(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}class nr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Sp("value",this,new rn(e.snapshotNode,new Re(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Cp(this,e,n):null}matches(e){return e instanceof nr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Ap(t,e,n,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=n,c=(u,d)=>{mo(t._repo,t,a),l(u,d)};c.userCallback=n.userCallback,c.context=n.context,n=c}const o=new kp(n,r||void 0),a=new nr(o);return gp(t._repo,t,a),()=>mo(t._repo,t,a)}function us(t,e,n,i){return Ap(t,"value",e,n,i)}Rf(Re);Lf(Re);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp="FIREBASE_DATABASE_EMULATOR_HOST",hs={};let Np=!1;function Pp(t,e,n,i){t.repoInfo_=new Oa(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),i&&(t.authTokenProvider_=i)}function Op(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||Ce("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),z("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=go(r,s),a=o.repoInfo,l;typeof process<"u"&&Lr&&(l=Lr[xp]),l?(r=`http://${l}?ns=${a.namespace}`,o=go(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Vu(t.name,t.options,e);rp("Invalid Firebase Database URL",o),C(o.path)||Ce("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Dp(a,t,c,new Hu(t.name,n));return new Mp(u,t)}function Lp(t,e){const n=hs[e];(!n||n[t.key]!==t)&&Ce(`Database ${e}(${t.repoInfo_}) has already been deleted.`),_p(t),delete n[t.key]}function Dp(t,e,n,i){let s=hs[e.name];s||(s={},hs[e.name]=s);let r=s[t.toURLString()];return r&&Ce("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new dp(t,Np,n,i),s[t.toURLString()]=r,r}class Mp{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(up(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Re(this._repo,A())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Lp(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ce("Cannot call "+e+" on a deleted database.")}}function Fp(t=ii(),e){const n=Ve(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=ia("database");i&&$p(n,...i)}return n}function $p(t,e,n,i={}){t=$(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Ce("Cannot call useEmulator() after instance has already been initialized.");const s=t._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&Ce('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Tn(Tn.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:oa(i.mockUserToken,t.app.options.projectId);r=new Tn(o)}Pp(s,e,n,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Up(t){ku(ot),ue(new oe("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Op(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),te(Dr,Mr,t),te(Dr,Mr,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function ir(t,e,n){var i;if(t=$(t),hi("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const s=(i=void 0)!==null&&i!==void 0?i:!0,r=new Rt,o=(l,c,u)=>{let d=null;l?r.reject(l):(d=new rn(u,new Re(t._repo,t._path),F),r.resolve(new Bp(c,d)))},a=us(t,()=>{});return yp(t._repo,t._path,e,o,a,s),r.promise}Te.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Te.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Up();function sr(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(t);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(t,i[s])&&(n[i[s]]=t[i[s]]);return n}function Sl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Wp=Sl,Cl=new rt("auth","Firebase",Sl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zn=new ni("@firebase/auth");function Hp(t,...e){zn.logLevel<=x.WARN&&zn.warn(`Auth (${ot}): ${t}`,...e)}function Sn(t,...e){zn.logLevel<=x.ERROR&&zn.error(`Auth (${ot}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function he(t,...e){throw rr(t,...e)}function _e(t,...e){return rr(t,...e)}function kl(t,e,n){const i=Object.assign(Object.assign({},Wp()),{[e]:n});return new rt("auth","Firebase",i).create(e,{appName:t.name})}function Be(t){return kl(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function rr(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return Cl.create(t,...e)}function I(t,e,...n){if(!t)throw rr(e,...n)}function be(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Sn(e),new Error(e)}function ke(t,e){t||be(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fs(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Vp(){return yo()==="http:"||yo()==="https:"}function yo(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Vp()||aa()||"connection"in navigator)?navigator.onLine:!0}function qp(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e,n){this.shortDelay=e,this.longDelay=n,ke(n>e,"Short delay should be less than long delay!"),this.isMobile=ws()||la()}get(){return jp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function or(t,e){ke(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;be("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;be("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;be("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gp=new gn(3e4,6e4);function ut(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function je(t,e,n,i,s={}){return Al(t,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=At(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:l},r);return td()||(c.referrerPolicy="no-referrer"),Rl.fetch()(xl(t,t.config.apiHost,n,a),c)})}async function Al(t,e,n){t._canInitEmulator=!1;const i=Object.assign(Object.assign({},zp),e);try{const s=new Yp(t),r=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw bn(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw bn(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw bn(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw bn(t,"user-disabled",o);const u=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw kl(t,u,c);he(t,u)}}catch(s){if(s instanceof fe)throw s;he(t,"network-request-failed",{message:String(s)})}}async function yi(t,e,n,i,s={}){const r=await je(t,e,n,i,s);return"mfaPendingCredential"in r&&he(t,"multi-factor-auth-required",{_serverResponse:r}),r}function xl(t,e,n,i){const s=`${e}${n}?${i}`;return t.config.emulator?or(t.config,s):`${t.config.apiScheme}://${s}`}function Kp(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Yp{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(_e(this.auth,"network-request-failed")),Gp.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function bn(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=_e(t,e,i);return s.customData._tokenResponse=n,s}function vo(t){return t!==void 0&&t.enterprise!==void 0}class Qp{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return Kp(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function Jp(t,e){return je(t,"GET","/v2/recaptchaConfig",ut(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xp(t,e){return je(t,"POST","/v1/accounts:delete",e)}async function Nl(t,e){return je(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Zp(t,e=!1){const n=$(t),i=await n.getIdToken(e),s=ar(i);I(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:zt($i(s.auth_time)),issuedAtTime:zt($i(s.iat)),expirationTime:zt($i(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function $i(t){return Number(t)*1e3}function ar(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return Sn("JWT malformed, contained fewer than 3 sections"),null;try{const s=xn(n);return s?JSON.parse(s):(Sn("Failed to decode base64 JWT payload"),null)}catch(s){return Sn("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function wo(t){const e=ar(t);return I(e,"internal-error"),I(typeof e.exp<"u","internal-error"),I(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function an(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof fe&&em(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function em({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=zt(this.lastLoginAt),this.creationTime=zt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gn(t){var e;const n=t.auth,i=await t.getIdToken(),s=await an(t,Nl(n,{idToken:i}));I(s==null?void 0:s.users.length,n,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?Pl(r.providerUserInfo):[],a=im(t.providerData,o),l=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!(a!=null&&a.length),u=l?c:!1,d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new ps(r.createdAt,r.lastLoginAt),isAnonymous:u};Object.assign(t,d)}async function nm(t){const e=$(t);await Gn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function im(t,e){return[...t.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Pl(t){return t.map(e=>{var{providerId:n}=e,i=sr(e,["providerId"]);return{providerId:n,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sm(t,e){const n=await Al(t,{},async()=>{const i=At({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,o=xl(t,s,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Rl.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function rm(t,e){return je(t,"POST","/v2/accounts:revokeToken",ut(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){I(e.idToken,"internal-error"),I(typeof e.idToken<"u","internal-error"),I(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):wo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){I(e.length!==0,"internal-error");const n=wo(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(I(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:s,expiresIn:r}=await sm(e,n);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:s,expirationTime:r}=n,o=new yt;return i&&(I(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(I(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(I(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new yt,this.toJSON())}_performRefresh(){return be("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(t,e){I(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Ie{constructor(e){var{uid:n,auth:i,stsTokenManager:s}=e,r=sr(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new tm(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new ps(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await an(this,this.stsTokenManager.getToken(this.auth,e));return I(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Zp(this,e)}reload(){return nm(this)}_assign(e){this!==e&&(I(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Ie(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){I(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await Gn(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ve(this.auth.app))return Promise.reject(Be(this.auth));const e=await this.getIdToken();return await an(this,Xp(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var i,s,r,o,a,l,c,u;const d=(i=n.displayName)!==null&&i!==void 0?i:void 0,h=(s=n.email)!==null&&s!==void 0?s:void 0,p=(r=n.phoneNumber)!==null&&r!==void 0?r:void 0,f=(o=n.photoURL)!==null&&o!==void 0?o:void 0,g=(a=n.tenantId)!==null&&a!==void 0?a:void 0,_=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,y=(c=n.createdAt)!==null&&c!==void 0?c:void 0,v=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:w,emailVerified:E,isAnonymous:D,providerData:R,stsTokenManager:k}=n;I(w&&k,e,"internal-error");const P=yt.fromJSON(this.name,k);I(typeof w=="string",e,"internal-error"),xe(d,e.name),xe(h,e.name),I(typeof E=="boolean",e,"internal-error"),I(typeof D=="boolean",e,"internal-error"),xe(p,e.name),xe(f,e.name),xe(g,e.name),xe(_,e.name),xe(y,e.name),xe(v,e.name);const me=new Ie({uid:w,auth:e,email:h,emailVerified:E,displayName:d,isAnonymous:D,photoURL:f,phoneNumber:p,tenantId:g,stsTokenManager:P,createdAt:y,lastLoginAt:v});return R&&Array.isArray(R)&&(me.providerData=R.map(Ae=>Object.assign({},Ae))),_&&(me._redirectEventId=_),me}static async _fromIdTokenResponse(e,n,i=!1){const s=new yt;s.updateFromServerResponse(n);const r=new Ie({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Gn(r),r}static async _fromGetAccountInfoResponse(e,n,i){const s=n.users[0];I(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Pl(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new yt;a.updateFromIdToken(i);const l=new Ie({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new ps(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bo=new Map;function Ee(t){ke(t instanceof Function,"Expected a class definition");let e=bo.get(t);return e?(ke(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,bo.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Ol.type="NONE";const Io=Ol;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cn(t,e,n){return`firebase:${t}:${e}:${n}`}class vt{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Cn(this.userKey,s.apiKey,r),this.fullPersistenceKey=Cn("persistence",s.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ie._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new vt(Ee(Io),e,i);const s=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||Ee(Io);const o=Cn(i,e.config.apiKey,e.name);let a=null;for(const c of n)try{const u=await c._get(o);if(u){const d=Ie._fromJSON(e,u);c!==r&&(a=d),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new vt(r,e,i):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new vt(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eo(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Fl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ll(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ul(e))return"Blackberry";if(Bl(e))return"Webos";if(Dl(e))return"Safari";if((e.includes("chrome/")||Ml(e))&&!e.includes("edge/"))return"Chrome";if($l(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Ll(t=X()){return/firefox\//i.test(t)}function Dl(t=X()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ml(t=X()){return/crios\//i.test(t)}function Fl(t=X()){return/iemobile/i.test(t)}function $l(t=X()){return/android/i.test(t)}function Ul(t=X()){return/blackberry/i.test(t)}function Bl(t=X()){return/webos/i.test(t)}function lr(t=X()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function om(t=X()){var e;return lr(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function am(){return nd()&&document.documentMode===10}function Wl(t=X()){return lr(t)||$l(t)||Bl(t)||Ul(t)||/windows phone/i.test(t)||Fl(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(t,e=[]){let n;switch(t){case"Browser":n=Eo(X());break;case"Worker":n=`${Eo(X())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ot}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});i.onAbort=n,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cm(t,e={}){return je(t,"GET","/v2/passwordPolicy",ut(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dm=6;class um{constructor(e){var n,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:dm,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,i,s,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(i=l.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e,n,i,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new To(this),this.idTokenSubscription=new To(this),this.beforeStateQueue=new lm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Cl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Ee(n)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await vt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Nl(this,{idToken:e}),i=await Ie._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(ve(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return I(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Gn(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=qp()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ve(this.app))return Promise.reject(Be(this));const n=e?$(e):null;return n&&I(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&I(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ve(this.app)?Promise.reject(Be(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ve(this.app)?Promise.reject(Be(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ee(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await cm(this),n=new um(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new rt("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await rm(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Ee(e)||this._popupRedirectResolver;I(n,this,"argument-error"),this.redirectPersistenceManager=await vt.create(this,[Ee(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,i;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,s){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(I(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,i,s);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return I(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Hl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(n["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&Hp(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Pt(t){return $(t)}class To{constructor(e){this.auth=e,this.observer=null,this.addObserver=ud(n=>this.observer=n)}get next(){return I(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function fm(t){vi=t}function Vl(t){return vi.loadJS(t)}function pm(){return vi.recaptchaEnterpriseScript}function mm(){return vi.gapiScript}function gm(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const _m="recaptcha-enterprise",ym="NO_RECAPTCHA";class vm{constructor(e){this.type=_m,this.auth=Pt(e)}async verify(e="verify",n=!1){async function i(r){if(!n){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,a)=>{Jp(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const c=new Qp(l);return r.tenantId==null?r._agentRecaptchaConfig=c:r._tenantRecaptchaConfigs[r.tenantId]=c,o(c.siteKey)}}).catch(l=>{a(l)})})}function s(r,o,a){const l=window.grecaptcha;vo(l)?l.enterprise.ready(()=>{l.enterprise.execute(r,{action:e}).then(c=>{o(c)}).catch(()=>{o(ym)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,o)=>{i(this.auth).then(a=>{if(!n&&vo(window.grecaptcha))s(a,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=pm();l.length!==0&&(l+=a),Vl(l).then(()=>{s(a,r,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}async function So(t,e,n,i=!1){const s=new vm(t);let r;try{r=await s.verify(n)}catch{r=await s.verify(n,!0)}const o=Object.assign({},e);return i?Object.assign(o,{captchaResp:r}):Object.assign(o,{captchaResponse:r}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Co(t,e,n,i){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await So(t,e,n,n==="getOobCode");return i(t,r)}else return i(t,e).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await So(t,e,n,n==="getOobCode");return i(t,o)}else return Promise.reject(r)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wm(t,e){const n=Ve(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(Qt(r,e??{}))return s;he(s,"already-initialized")}return n.initialize({options:e})}function bm(t,e){const n=(e==null?void 0:e.persistence)||[],i=(Array.isArray(n)?n:[n]).map(Ee);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function Im(t,e,n){const i=Pt(t);I(i._canInitEmulator,i,"emulator-config-failed"),I(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=jl(e),{host:o,port:a}=Em(e),l=a===null?"":`:${a}`;i.config.emulator={url:`${r}//${o}${l}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),Tm()}function jl(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Em(t){const e=jl(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:ko(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:ko(o)}}}function ko(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Tm(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return be("not implemented")}_getIdTokenResponse(e){return be("not implemented")}_linkToIdToken(e,n){return be("not implemented")}_getReauthenticationResolver(e){return be("not implemented")}}async function Sm(t,e){return je(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cm(t,e){return yi(t,"POST","/v1/accounts:signInWithPassword",ut(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function km(t,e){return yi(t,"POST","/v1/accounts:signInWithEmailLink",ut(t,e))}async function Rm(t,e){return yi(t,"POST","/v1/accounts:signInWithEmailLink",ut(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln extends cr{constructor(e,n,i,s=null){super("password",i),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new ln(e,n,"password")}static _fromEmailAndCode(e,n,i=null){return new ln(e,n,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Co(e,n,"signInWithPassword",Cm);case"emailLink":return km(e,{email:this._email,oobCode:this._password});default:he(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const i={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Co(e,i,"signUpPassword",Sm);case"emailLink":return Rm(e,{idToken:n,email:this._email,oobCode:this._password});default:he(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wt(t,e){return yi(t,"POST","/v1/accounts:signInWithIdp",ut(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Am="http://localhost";class tt extends cr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new tt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):he("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=n,r=sr(n,["providerId","signInMethod"]);if(!i||!s)return null;const o=new tt(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return wt(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,wt(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,wt(e,n)}buildRequest(){const e={requestUri:Am,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=At(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xm(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Nm(t){const e=Ut(Bt(t)).link,n=e?Ut(Bt(e)).deep_link_id:null,i=Ut(Bt(t)).deep_link_id;return(i?Ut(Bt(i)).link:null)||i||n||e||t}class dr{constructor(e){var n,i,s,r,o,a;const l=Ut(Bt(e)),c=(n=l.apiKey)!==null&&n!==void 0?n:null,u=(i=l.oobCode)!==null&&i!==void 0?i:null,d=xm((s=l.mode)!==null&&s!==void 0?s:null);I(c&&u&&d,"argument-error"),this.apiKey=c,this.operation=d,this.code=u,this.continueUrl=(r=l.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=Nm(e);try{return new dr(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(){this.providerId=Ot.PROVIDER_ID}static credential(e,n){return ln._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const i=dr.parseLink(n);return I(i,"argument-error"),ln._fromEmailAndCode(e,i.code,i.tenantId)}}Ot.PROVIDER_ID="password";Ot.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ot.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n extends ql{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne extends _n{constructor(){super("facebook.com")}static credential(e){return tt._fromParams({providerId:Ne.PROVIDER_ID,signInMethod:Ne.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ne.credentialFromTaggedObject(e)}static credentialFromError(e){return Ne.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ne.credential(e.oauthAccessToken)}catch{return null}}}Ne.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ne.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe extends _n{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return tt._fromParams({providerId:Pe.PROVIDER_ID,signInMethod:Pe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Pe.credentialFromTaggedObject(e)}static credentialFromError(e){return Pe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return Pe.credential(n,i)}catch{return null}}}Pe.GOOGLE_SIGN_IN_METHOD="google.com";Pe.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe extends _n{constructor(){super("github.com")}static credential(e){return tt._fromParams({providerId:Oe.PROVIDER_ID,signInMethod:Oe.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Oe.credentialFromTaggedObject(e)}static credentialFromError(e){return Oe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Oe.credential(e.oauthAccessToken)}catch{return null}}}Oe.GITHUB_SIGN_IN_METHOD="github.com";Oe.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le extends _n{constructor(){super("twitter.com")}static credential(e,n){return tt._fromParams({providerId:Le.PROVIDER_ID,signInMethod:Le.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Le.credentialFromTaggedObject(e)}static credentialFromError(e){return Le.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return Le.credential(n,i)}catch{return null}}}Le.TWITTER_SIGN_IN_METHOD="twitter.com";Le.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,s=!1){const r=await Ie._fromIdTokenResponse(e,i,s),o=Ro(i);return new Ct({user:r,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const s=Ro(i);return new Ct({user:e,providerId:s,_tokenResponse:i,operationType:n})}}function Ro(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn extends fe{constructor(e,n,i,s){var r;super(n.code,n.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Kn.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,s){return new Kn(e,n,i,s)}}function zl(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Kn._fromErrorAndOperation(t,r,e,i):r})}async function Pm(t,e,n=!1){const i=await an(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Ct._forOperation(t,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Om(t,e,n=!1){const{auth:i}=t;if(ve(i.app))return Promise.reject(Be(i));const s="reauthenticate";try{const r=await an(t,zl(i,s,e,t),n);I(r.idToken,i,"internal-error");const o=ar(r.idToken);I(o,i,"internal-error");const{sub:a}=o;return I(t.uid===a,i,"user-mismatch"),Ct._forOperation(t,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&he(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gl(t,e,n=!1){if(ve(t.app))return Promise.reject(Be(t));const i="signIn",s=await zl(t,i,e),r=await Ct._fromIdTokenResponse(t,i,s);return n||await t._updateCurrentUser(r.user),r}async function Lm(t,e){return Gl(Pt(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dm(t){const e=Pt(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Mm(t,e,n){return ve(t.app)?Promise.reject(Be(t)):Lm($(t),Ot.credential(e,n)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&Dm(t),i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fm(t,e){return $(t).setPersistence(e)}function $m(t,e,n,i){return $(t).onIdTokenChanged(e,n,i)}function Um(t,e,n){return $(t).beforeAuthStateChanged(e,n)}function Bm(t,e,n,i){return $(t).onAuthStateChanged(e,n,i)}function Wm(t){return $(t).signOut()}const Yn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Yn,"1"),this.storage.removeItem(Yn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hm=1e3,Vm=10;class Yl extends Kl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Wl(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),s=this.localCache[n];i!==s&&e(n,s,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const i=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);am()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Vm):s()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},Hm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Yl.type="LOCAL";const Ql=Yl;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl extends Kl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Jl.type="SESSION";const Xl=Jl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jm(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const i=new wi(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:s,data:r}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async c=>c(n.origin,r)),l=await jm(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}wi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ur(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qm{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=ur("",20);s.port1.start();const u=setTimeout(()=>{l(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===c)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(){return window}function zm(t){ye().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(){return typeof ye().WorkerGlobalScope<"u"&&typeof ye().importScripts=="function"}async function Gm(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Km(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Ym(){return Zl()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="firebaseLocalStorageDb",Qm=1,Qn="firebaseLocalStorage",tc="fbase_key";class yn{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function bi(t,e){return t.transaction([Qn],e?"readwrite":"readonly").objectStore(Qn)}function Jm(){const t=indexedDB.deleteDatabase(ec);return new yn(t).toPromise()}function ms(){const t=indexedDB.open(ec,Qm);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(Qn,{keyPath:tc})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(Qn)?e(i):(i.close(),await Jm(),e(await ms()))})})}async function Ao(t,e,n){const i=bi(t,!0).put({[tc]:e,value:n});return new yn(i).toPromise()}async function Xm(t,e){const n=bi(t,!1).get(e),i=await new yn(n).toPromise();return i===void 0?null:i.value}function xo(t,e){const n=bi(t,!0).delete(e);return new yn(n).toPromise()}const Zm=800,eg=3;class nc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ms(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>eg)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Zl()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=wi._getInstance(Ym()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Gm(),!this.activeServiceWorker)return;this.sender=new qm(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((n=i[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Km()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ms();return await Ao(e,Yn,"1"),await xo(e,Yn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>Ao(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>Xm(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>xo(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=bi(s,!1).getAll();return new yn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Zm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}nc.type="LOCAL";const tg=nc;new gn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ng(t,e){return e?Ee(e):(I(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr extends cr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return wt(e,this._buildIdpRequest())}_linkToIdToken(e,n){return wt(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return wt(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function ig(t){return Gl(t.auth,new hr(t),t.bypassAuthState)}function sg(t){const{auth:e,user:n}=t;return I(n,e,"internal-error"),Om(n,new hr(t),t.bypassAuthState)}async function rg(t){const{auth:e,user:n}=t;return I(n,e,"internal-error"),Pm(n,new hr(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(e,n,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ig;case"linkViaPopup":case"linkViaRedirect":return rg;case"reauthViaPopup":case"reauthViaRedirect":return sg;default:he(this.auth,"internal-error")}}resolve(e){ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const og=new gn(2e3,1e4);class pt extends ic{constructor(e,n,i,s,r){super(e,n,s,r),this.provider=i,this.authWindow=null,this.pollId=null,pt.currentPopupAction&&pt.currentPopupAction.cancel(),pt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return I(e,this.auth,"internal-error"),e}async onExecution(){ke(this.filter.length===1,"Popup operations only handle one event");const e=ur();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(_e(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(_e(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,pt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,i;if(!((i=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_e(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,og.get())};e()}}pt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ag="pendingRedirect",kn=new Map;class lg extends ic{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=kn.get(this.auth._key());if(!e){try{const i=await cg(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}kn.set(this.auth._key(),e)}return this.bypassAuthState||kn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function cg(t,e){const n=hg(e),i=ug(t);if(!await i._isAvailable())return!1;const s=await i._get(n)==="true";return await i._remove(n),s}function dg(t,e){kn.set(t._key(),e)}function ug(t){return Ee(t._redirectPersistence)}function hg(t){return Cn(ag,t.config.apiKey,t.name)}async function fg(t,e,n=!1){if(ve(t.app))return Promise.reject(Be(t));const i=Pt(t),s=ng(i,e),o=await new lg(i,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pg=10*60*1e3;class mg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!gg(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var i;if(e.error&&!sc(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";n.onError(_e(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=pg&&this.cachedEventUids.clear(),this.cachedEventUids.has(No(e))}saveEventToCache(e){this.cachedEventUids.add(No(e)),this.lastProcessedEventTime=Date.now()}}function No(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function sc({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function gg(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return sc(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _g(t,e={}){return je(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,vg=/^https?/;async function wg(t){if(t.config.emulator)return;const{authorizedDomains:e}=await _g(t);for(const n of e)try{if(bg(n))return}catch{}he(t,"unauthorized-domain")}function bg(t){const e=fs(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!vg.test(n))return!1;if(yg.test(t))return i===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ig=new gn(3e4,6e4);function Po(){const t=ye().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Eg(t){return new Promise((e,n)=>{var i,s,r;function o(){Po(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Po(),n(_e(t,"network-request-failed"))},timeout:Ig.get()})}if(!((s=(i=ye().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=ye().gapi)===null||r===void 0)&&r.load)o();else{const a=gm("iframefcb");return ye()[a]=()=>{gapi.load?o():n(_e(t,"network-request-failed"))},Vl(`${mm()}?onload=${a}`).catch(l=>n(l))}}).catch(e=>{throw Rn=null,e})}let Rn=null;function Tg(t){return Rn=Rn||Eg(t),Rn}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sg=new gn(5e3,15e3),Cg="__/auth/iframe",kg="emulator/auth/iframe",Rg={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ag=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function xg(t){const e=t.config;I(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?or(e,kg):`https://${t.config.authDomain}/${Cg}`,i={apiKey:e.apiKey,appName:t.name,v:ot},s=Ag.get(t.config.apiHost);s&&(i.eid=s);const r=t._getFrameworks();return r.length&&(i.fw=r.join(",")),`${n}?${At(i).slice(1)}`}async function Ng(t){const e=await Tg(t),n=ye().gapi;return I(n,t,"internal-error"),e.open({where:document.body,url:xg(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Rg,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=_e(t,"network-request-failed"),a=ye().setTimeout(()=>{r(o)},Sg.get());function l(){ye().clearTimeout(a),s(i)}i.ping(l).then(l,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Og=500,Lg=600,Dg="_blank",Mg="http://localhost";class Oo{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Fg(t,e,n,i=Og,s=Lg){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const l=Object.assign(Object.assign({},Pg),{width:i.toString(),height:s.toString(),top:r,left:o}),c=X().toLowerCase();n&&(a=Ml(c)?Dg:n),Ll(c)&&(e=e||Mg,l.scrollbars="yes");const u=Object.entries(l).reduce((h,[p,f])=>`${h}${p}=${f},`,"");if(om(c)&&a!=="_self")return $g(e||"",a),new Oo(null);const d=window.open(e||"",a,u);I(d,t,"popup-blocked");try{d.focus()}catch{}return new Oo(d)}function $g(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ug="__/auth/handler",Bg="emulator/auth/handler",Wg=encodeURIComponent("fac");async function Lo(t,e,n,i,s,r){I(t.config.authDomain,t,"auth-domain-config-required"),I(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:ot,eventId:s};if(e instanceof ql){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",zi(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof _n){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const l=await t._getAppCheckToken(),c=l?`#${Wg}=${encodeURIComponent(l)}`:"";return`${Hg(t)}?${At(a).slice(1)}${c}`}function Hg({config:t}){return t.emulator?or(t,Bg):`https://${t.authDomain}/${Ug}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ui="webStorageSupport";class Vg{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Xl,this._completeRedirectFn=fg,this._overrideRedirectResult=dg}async _openPopup(e,n,i,s){var r;ke((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Lo(e,n,i,fs(),s);return Fg(e,o,ur())}async _openRedirect(e,n,i,s){await this._originValidation(e);const r=await Lo(e,n,i,fs(),s);return zm(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:r}=this.eventManagers[n];return s?Promise.resolve(s):(ke(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await Ng(e),i=new mg(e);return n.register("authEvent",s=>(I(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ui,{type:Ui},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[Ui];o!==void 0&&n(!!o),he(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=wg(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Wl()||Dl()||lr()}}const jg=Vg;var Do="@firebase/auth",Mo="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){I(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zg(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Gg(t){ue(new oe("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;I(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Hl(t)},c=new hm(i,s,r,l);return bm(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),ue(new oe("auth-internal",e=>{const n=Pt(e.getProvider("auth").getImmediate());return(i=>new qg(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),te(Do,Mo,zg(t)),te(Do,Mo,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg=5*60,Yg=ra("authIdTokenMaxAge")||Kg;let Fo=null;const Qg=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>Yg)return;const s=n==null?void 0:n.token;Fo!==s&&(Fo=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Jg(t=ii()){const e=Ve(t,"auth");if(e.isInitialized())return e.getImmediate();const n=wm(t,{popupRedirectResolver:jg,persistence:[tg,Ql,Xl]}),i=ra("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=Qg(r.toString());Um(n,o,()=>o(n.currentUser)),$m(n,a=>o(a))}}const s=na("auth");return s&&Im(n,`http://${s}`),n}function Xg(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}fm({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=s=>{const r=_e("internal-error");r.customData=s,n(r)},i.type="text/javascript",i.charset="UTF-8",Xg().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Gg("Browser");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rc="firebasestorage.googleapis.com",oc="storageBucket",Zg=2*60*1e3,e_=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W extends fe{constructor(e,n,i=0){super(Bi(e),`Firebase Storage: ${n} (${Bi(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,W.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Bi(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var B;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(B||(B={}));function Bi(t){return"storage/"+t}function fr(){const t="An unknown error occurred, please check the error payload for server response.";return new W(B.UNKNOWN,t)}function t_(t){return new W(B.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function n_(t){return new W(B.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function i_(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new W(B.UNAUTHENTICATED,t)}function s_(){return new W(B.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function r_(t){return new W(B.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function o_(){return new W(B.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function a_(){return new W(B.CANCELED,"User canceled the upload/download.")}function l_(t){return new W(B.INVALID_URL,"Invalid URL '"+t+"'.")}function c_(t){return new W(B.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function d_(){return new W(B.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+oc+"' property when initializing the app?")}function u_(){return new W(B.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function h_(){return new W(B.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function f_(t){return new W(B.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function gs(t){return new W(B.INVALID_ARGUMENT,t)}function ac(){return new W(B.APP_DELETED,"The Firebase app was deleted.")}function p_(t){return new W(B.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Gt(t,e){return new W(B.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function $t(t){throw new W(B.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let i;try{i=ie.makeFromUrl(e,n)}catch{return new ie(e,"")}if(i.path==="")return i;throw c_(e)}static makeFromUrl(e,n){let i=null;const s="([A-Za-z0-9.\\-_]+)";function r(E){E.path.charAt(E.path.length-1)==="/"&&(E.path_=E.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+s+o,"i"),l={bucket:1,path:3};function c(E){E.path_=decodeURIComponent(E.path)}const u="v[A-Za-z0-9_]+",d=n.replace(/[.]/g,"\\."),h="(/([^?#]*).*)?$",p=new RegExp(`^https?://${d}/${u}/b/${s}/o${h}`,"i"),f={bucket:1,path:3},g=n===rc?"(?:storage.googleapis.com|storage.cloud.google.com)":n,_="([^?#]*)",y=new RegExp(`^https?://${g}/${s}/${_}`,"i"),w=[{regex:a,indices:l,postModify:r},{regex:p,indices:f,postModify:c},{regex:y,indices:{bucket:1,path:2},postModify:c}];for(let E=0;E<w.length;E++){const D=w[E],R=D.regex.exec(e);if(R){const k=R[D.indices.bucket];let P=R[D.indices.path];P||(P=""),i=new ie(k,P),D.postModify(i);break}}if(i==null)throw l_(e);return i}}class m_{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g_(t,e,n){let i=1,s=null,r=null,o=!1,a=0;function l(){return a===2}let c=!1;function u(..._){c||(c=!0,e.apply(null,_))}function d(_){s=setTimeout(()=>{s=null,t(p,l())},_)}function h(){r&&clearTimeout(r)}function p(_,...y){if(c){h();return}if(_){h(),u.call(null,_,...y);return}if(l()||o){h(),u.call(null,_,...y);return}i<64&&(i*=2);let w;a===1?(a=2,w=0):w=(i+Math.random())*1e3,d(w)}let f=!1;function g(_){f||(f=!0,h(),!c&&(s!==null?(_||(a=2),clearTimeout(s),d(0)):_||(a=1)))}return d(0),r=setTimeout(()=>{o=!0,g(!0)},n),g}function __(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y_(t){return t!==void 0}function v_(t){return typeof t=="object"&&!Array.isArray(t)}function pr(t){return typeof t=="string"||t instanceof String}function $o(t){return mr()&&t instanceof Blob}function mr(){return typeof Blob<"u"}function Uo(t,e,n,i){if(i<e)throw gs(`Invalid value for '${t}'. Expected ${e} or greater.`);if(i>n)throw gs(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gr(t,e,n){let i=e;return n==null&&(i=`https://${e}`),`${n}://${i}/v0${t}`}function lc(t){const e=encodeURIComponent;let n="?";for(const i in t)if(t.hasOwnProperty(i)){const s=e(i)+"="+e(t[i]);n=n+s+"&"}return n=n.slice(0,-1),n}var Ye;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Ye||(Ye={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w_(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,r=e.indexOf(t)!==-1;return n||s||r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b_{constructor(e,n,i,s,r,o,a,l,c,u,d,h=!0){this.url_=e,this.method_=n,this.headers_=i,this.body_=s,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=d,this.retry=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((p,f)=>{this.resolve_=p,this.reject_=f,this.start_()})}start_(){const e=(i,s)=>{if(s){i(!1,new In(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const a=r.getErrorCode()===Ye.NO_ERROR,l=r.getStatus();if(!a||w_(l,this.additionalRetryCodes_)&&this.retry){const u=r.getErrorCode()===Ye.ABORT;i(!1,new In(!1,null,u));return}const c=this.successCodes_.indexOf(l)!==-1;i(!0,new In(c,r))})},n=(i,s)=>{const r=this.resolve_,o=this.reject_,a=s.connection;if(s.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());y_(l)?r(l):r()}catch(l){o(l)}else if(a!==null){const l=fr();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(s.canceled){const l=this.appDelete_?ac():a_();o(l)}else{const l=o_();o(l)}};this.canceled_?n(!1,new In(!1,null,!0)):this.backoffId_=g_(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&__(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class In{constructor(e,n,i){this.wasSuccessCode=e,this.connection=n,this.canceled=!!i}}function I_(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function E_(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function T_(t,e){e&&(t["X-Firebase-GMPID"]=e)}function S_(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function C_(t,e,n,i,s,r,o=!0){const a=lc(t.urlParams),l=t.url+a,c=Object.assign({},t.headers);return T_(c,e),I_(c,n),E_(c,r),S_(c,i),new b_(l,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k_(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function R_(...t){const e=k_();if(e!==void 0){const n=new e;for(let i=0;i<t.length;i++)n.append(t[i]);return n.getBlob()}else{if(mr())return new Blob(t);throw new W(B.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function A_(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x_(t){if(typeof atob>"u")throw f_("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Wi{constructor(e,n){this.data=e,this.contentType=n||null}}function N_(t,e){switch(t){case ge.RAW:return new Wi(cc(e));case ge.BASE64:case ge.BASE64URL:return new Wi(dc(t,e));case ge.DATA_URL:return new Wi(O_(e),L_(e))}throw fr()}function cc(t){const e=[];for(let n=0;n<t.length;n++){let i=t.charCodeAt(n);if(i<=127)e.push(i);else if(i<=2047)e.push(192|i>>6,128|i&63);else if((i&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const r=i,o=t.charCodeAt(++n);i=65536|(r&1023)<<10|o&1023,e.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|i&63)}else(i&64512)===56320?e.push(239,191,189):e.push(224|i>>12,128|i>>6&63,128|i&63)}return new Uint8Array(e)}function P_(t){let e;try{e=decodeURIComponent(t)}catch{throw Gt(ge.DATA_URL,"Malformed data URL.")}return cc(e)}function dc(t,e){switch(t){case ge.BASE64:{const s=e.indexOf("-")!==-1,r=e.indexOf("_")!==-1;if(s||r)throw Gt(t,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case ge.BASE64URL:{const s=e.indexOf("+")!==-1,r=e.indexOf("/")!==-1;if(s||r)throw Gt(t,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=x_(e)}catch(s){throw s.message.includes("polyfill")?s:Gt(t,"Invalid character found")}const i=new Uint8Array(n.length);for(let s=0;s<n.length;s++)i[s]=n.charCodeAt(s);return i}class uc{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw Gt(ge.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const i=n[1]||null;i!=null&&(this.base64=D_(i,";base64"),this.contentType=this.base64?i.substring(0,i.length-7):i),this.rest=e.substring(e.indexOf(",")+1)}}function O_(t){const e=new uc(t);return e.base64?dc(ge.BASE64,e.rest):P_(e.rest)}function L_(t){return new uc(t).contentType}function D_(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e,n){let i=0,s="";$o(e)?(this.data_=e,i=e.size,s=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),i=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),i=e.length),this.size_=i,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,n){if($o(this.data_)){const i=this.data_,s=A_(i,e,n);return s===null?null:new De(s)}else{const i=new Uint8Array(this.data_.buffer,e,n-e);return new De(i,!0)}}static getBlob(...e){if(mr()){const n=e.map(i=>i instanceof De?i.data_:i);return new De(R_.apply(null,n))}else{const n=e.map(o=>pr(o)?N_(ge.RAW,o).data:o.data_);let i=0;n.forEach(o=>{i+=o.byteLength});const s=new Uint8Array(i);let r=0;return n.forEach(o=>{for(let a=0;a<o.length;a++)s[r++]=o[a]}),new De(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hc(t){let e;try{e=JSON.parse(t)}catch{return null}return v_(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M_(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function F_(t,e){const n=e.split("/").filter(i=>i.length>0).join("/");return t.length===0?n:t+"/"+n}function fc(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $_(t,e){return e}class Q{constructor(e,n,i,s){this.server=e,this.local=n||e,this.writable=!!i,this.xform=s||$_}}let En=null;function U_(t){return!pr(t)||t.length<2?t:fc(t)}function pc(){if(En)return En;const t=[];t.push(new Q("bucket")),t.push(new Q("generation")),t.push(new Q("metageneration")),t.push(new Q("name","fullPath",!0));function e(r,o){return U_(o)}const n=new Q("name");n.xform=e,t.push(n);function i(r,o){return o!==void 0?Number(o):o}const s=new Q("size");return s.xform=i,t.push(s),t.push(new Q("timeCreated")),t.push(new Q("updated")),t.push(new Q("md5Hash",null,!0)),t.push(new Q("cacheControl",null,!0)),t.push(new Q("contentDisposition",null,!0)),t.push(new Q("contentEncoding",null,!0)),t.push(new Q("contentLanguage",null,!0)),t.push(new Q("contentType",null,!0)),t.push(new Q("metadata","customMetadata",!0)),En=t,En}function B_(t,e){function n(){const i=t.bucket,s=t.fullPath,r=new ie(i,s);return e._makeStorageReference(r)}Object.defineProperty(t,"ref",{get:n})}function W_(t,e,n){const i={};i.type="file";const s=n.length;for(let r=0;r<s;r++){const o=n[r];i[o.local]=o.xform(i,e[o.server])}return B_(i,t),i}function mc(t,e,n){const i=hc(e);return i===null?null:W_(t,i,n)}function H_(t,e,n,i){const s=hc(e);if(s===null||!pr(s.downloadTokens))return null;const r=s.downloadTokens;if(r.length===0)return null;const o=encodeURIComponent;return r.split(",").map(c=>{const u=t.bucket,d=t.fullPath,h="/b/"+o(u)+"/o/"+o(d),p=gr(h,n,i),f=lc({alt:"media",token:c});return p+f})[0]}function V_(t,e){const n={},i=e.length;for(let s=0;s<i;s++){const r=e[s];r.writable&&(n[r.server]=t[r.local])}return JSON.stringify(n)}class gc{constructor(e,n,i,s){this.url=e,this.method=n,this.handler=i,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _c(t){if(!t)throw fr()}function j_(t,e){function n(i,s){const r=mc(t,s,e);return _c(r!==null),r}return n}function q_(t,e){function n(i,s){const r=mc(t,s,e);return _c(r!==null),H_(r,s,t.host,t._protocol)}return n}function yc(t){function e(n,i){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=s_():s=i_():n.getStatus()===402?s=n_(t.bucket):n.getStatus()===403?s=r_(t.path):s=i,s.status=n.getStatus(),s.serverResponse=i.serverResponse,s}return e}function z_(t){const e=yc(t);function n(i,s){let r=e(i,s);return i.getStatus()===404&&(r=t_(t.path)),r.serverResponse=s.serverResponse,r}return n}function G_(t,e,n){const i=e.fullServerUrl(),s=gr(i,t.host,t._protocol),r="GET",o=t.maxOperationRetryTime,a=new gc(s,r,q_(t,n),o);return a.errorHandler=z_(e),a}function K_(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function Y_(t,e,n){const i=Object.assign({},n);return i.fullPath=t.path,i.size=e.size(),i.contentType||(i.contentType=K_(null,e)),i}function Q_(t,e,n,i,s){const r=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let w="";for(let E=0;E<2;E++)w=w+Math.random().toString().slice(2);return w}const l=a();o["Content-Type"]="multipart/related; boundary="+l;const c=Y_(e,i,s),u=V_(c,n),d="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+u+`\r
--`+l+`\r
Content-Type: `+c.contentType+`\r
\r
`,h=`\r
--`+l+"--",p=De.getBlob(d,i,h);if(p===null)throw u_();const f={name:c.fullPath},g=gr(r,t.host,t._protocol),_="POST",y=t.maxUploadRetryTime,v=new gc(g,_,j_(t,n),y);return v.urlParams=f,v.headers=o,v.body=p.uploadData(),v.errorHandler=yc(e),v}class J_{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Ye.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Ye.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Ye.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,i,s){if(this.sent_)throw $t("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),s!==void 0)for(const r in s)s.hasOwnProperty(r)&&this.xhr_.setRequestHeader(r,s[r].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw $t("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw $t("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw $t("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw $t("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class X_ extends J_{initXhr(){this.xhr_.responseType="text"}}function vc(){return new X_}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,n){this._service=e,n instanceof ie?this._location=n:this._location=ie.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new nt(e,n)}get root(){const e=new ie(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return fc(this._location.path)}get storage(){return this._service}get parent(){const e=M_(this._location.path);if(e===null)return null;const n=new ie(this._location.bucket,e);return new nt(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw p_(e)}}function Z_(t,e,n){t._throwIfRoot("uploadBytes");const i=Q_(t.storage,t._location,pc(),new De(e,!0),n);return t.storage.makeRequestWithTokens(i,vc).then(s=>({metadata:s,ref:t}))}function ey(t){t._throwIfRoot("getDownloadURL");const e=G_(t.storage,t._location,pc());return t.storage.makeRequestWithTokens(e,vc).then(n=>{if(n===null)throw h_();return n})}function ty(t,e){const n=F_(t._location.path,e),i=new ie(t._location.bucket,n);return new nt(t.storage,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ny(t){return/^[A-Za-z]+:\/\//.test(t)}function iy(t,e){return new nt(t,e)}function wc(t,e){if(t instanceof _r){const n=t;if(n._bucket==null)throw d_();const i=new nt(n,n._bucket);return e!=null?wc(i,e):i}else return e!==void 0?ty(t,e):t}function sy(t,e){if(e&&ny(e)){if(t instanceof _r)return iy(t,e);throw gs("To use ref(service, url), the first argument must be a Storage instance.")}else return wc(t,e)}function Bo(t,e){const n=e==null?void 0:e[oc];return n==null?null:ie.makeFromBucketSpec(n,t)}function ry(t,e,n,i={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=i;s&&(t._overrideAuthToken=typeof s=="string"?s:oa(s,t.app.options.projectId))}class _r{constructor(e,n,i,s,r){this.app=e,this._authProvider=n,this._appCheckProvider=i,this._url=s,this._firebaseVersion=r,this._bucket=null,this._host=rc,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Zg,this._maxUploadRetryTime=e_,this._requests=new Set,s!=null?this._bucket=ie.makeFromBucketSpec(s,this._host):this._bucket=Bo(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=ie.makeFromBucketSpec(this._url,e):this._bucket=Bo(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Uo("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Uo("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new nt(this,e)}_makeRequest(e,n,i,s,r=!0){if(this._deleted)return new m_(ac());{const o=C_(e,this._appId,i,s,n,this._firebaseVersion,r);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[i,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,i,s).getPromise()}}const Wo="@firebase/storage",Ho="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bc="storage";function oy(t,e,n){return t=$(t),Z_(t,e,n)}function ay(t){return t=$(t),ey(t)}function ly(t,e){return t=$(t),sy(t,e)}function cy(t=ii(),e){t=$(t);const i=Ve(t,bc).getImmediate({identifier:e}),s=ia("storage");return s&&dy(i,...s),i}function dy(t,e,n,i={}){ry(t,e,n,i)}function uy(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new _r(n,i,s,e,ot)}function hy(){ue(new oe(bc,uy,"PUBLIC").setMultipleInstances(!0)),te(Wo,Ho,""),te(Wo,Ho,"esm2017")}hy();const Ic="@firebase/installations",yr="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ec=1e4,Tc=`w:${yr}`,Sc="FIS_v2",fy="https://firebaseinstallations.googleapis.com/v1",py=60*60*1e3,my="installations",gy="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _y={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},it=new rt(my,gy,_y);function Cc(t){return t instanceof fe&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kc({projectId:t}){return`${fy}/projects/${t}/installations`}function Rc(t){return{token:t.token,requestStatus:2,expiresIn:vy(t.expiresIn),creationTime:Date.now()}}async function Ac(t,e){const i=(await e.json()).error;return it.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function xc({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function yy(t,{refreshToken:e}){const n=xc(t);return n.append("Authorization",wy(e)),n}async function Nc(t){const e=await t();return e.status>=500&&e.status<600?t():e}function vy(t){return Number(t.replace("s","000"))}function wy(t){return`${Sc} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function by({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=kc(t),s=xc(t),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={fid:n,authVersion:Sc,appId:t.appId,sdkVersion:Tc},a={method:"POST",headers:s,body:JSON.stringify(o)},l=await Nc(()=>fetch(i,a));if(l.ok){const c=await l.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:Rc(c.authToken)}}else throw await Ac("Create Installation",l)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pc(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iy(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey=/^[cdef][\w-]{21}$/,_s="";function Ty(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=Sy(t);return Ey.test(n)?n:_s}catch{return _s}}function Sy(t){return Iy(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ii(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oc=new Map;function Lc(t,e){const n=Ii(t);Dc(n,e),Cy(n,e)}function Dc(t,e){const n=Oc.get(t);if(n)for(const i of n)i(e)}function Cy(t,e){const n=ky();n&&n.postMessage({key:t,fid:e}),Ry()}let Ke=null;function ky(){return!Ke&&"BroadcastChannel"in self&&(Ke=new BroadcastChannel("[Firebase] FID Change"),Ke.onmessage=t=>{Dc(t.data.key,t.data.fid)}),Ke}function Ry(){Oc.size===0&&Ke&&(Ke.close(),Ke=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ay="firebase-installations-database",xy=1,st="firebase-installations-store";let Hi=null;function vr(){return Hi||(Hi=pa(Ay,xy,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(st)}}})),Hi}async function Jn(t,e){const n=Ii(t),s=(await vr()).transaction(st,"readwrite"),r=s.objectStore(st),o=await r.get(n);return await r.put(e,n),await s.done,(!o||o.fid!==e.fid)&&Lc(t,e.fid),e}async function Mc(t){const e=Ii(t),i=(await vr()).transaction(st,"readwrite");await i.objectStore(st).delete(e),await i.done}async function Ei(t,e){const n=Ii(t),s=(await vr()).transaction(st,"readwrite"),r=s.objectStore(st),o=await r.get(n),a=e(o);return a===void 0?await r.delete(n):await r.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&Lc(t,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wr(t){let e;const n=await Ei(t.appConfig,i=>{const s=Ny(i),r=Py(t,s);return e=r.registrationPromise,r.installationEntry});return n.fid===_s?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function Ny(t){const e=t||{fid:Ty(),registrationStatus:0};return Fc(e)}function Py(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(it.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=Oy(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Ly(t)}:{installationEntry:e}}async function Oy(t,e){try{const n=await by(t,e);return Jn(t.appConfig,n)}catch(n){throw Cc(n)&&n.customData.serverCode===409?await Mc(t.appConfig):await Jn(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function Ly(t){let e=await Vo(t.appConfig);for(;e.registrationStatus===1;)await Pc(100),e=await Vo(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await wr(t);return i||n}return e}function Vo(t){return Ei(t,e=>{if(!e)throw it.create("installation-not-found");return Fc(e)})}function Fc(t){return Dy(t)?{fid:t.fid,registrationStatus:0}:t}function Dy(t){return t.registrationStatus===1&&t.registrationTime+Ec<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function My({appConfig:t,heartbeatServiceProvider:e},n){const i=Fy(t,n),s=yy(t,n),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={installation:{sdkVersion:Tc,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},l=await Nc(()=>fetch(i,a));if(l.ok){const c=await l.json();return Rc(c)}else throw await Ac("Generate Auth Token",l)}function Fy(t,{fid:e}){return`${kc(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function br(t,e=!1){let n;const i=await Ei(t.appConfig,r=>{if(!$c(r))throw it.create("not-registered");const o=r.authToken;if(!e&&By(o))return r;if(o.requestStatus===1)return n=$y(t,e),r;{if(!navigator.onLine)throw it.create("app-offline");const a=Hy(r);return n=Uy(t,a),a}});return n?await n:i.authToken}async function $y(t,e){let n=await jo(t.appConfig);for(;n.authToken.requestStatus===1;)await Pc(100),n=await jo(t.appConfig);const i=n.authToken;return i.requestStatus===0?br(t,e):i}function jo(t){return Ei(t,e=>{if(!$c(e))throw it.create("not-registered");const n=e.authToken;return Vy(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Uy(t,e){try{const n=await My(t,e),i=Object.assign(Object.assign({},e),{authToken:n});return await Jn(t.appConfig,i),n}catch(n){if(Cc(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Mc(t.appConfig);else{const i=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Jn(t.appConfig,i)}throw n}}function $c(t){return t!==void 0&&t.registrationStatus===2}function By(t){return t.requestStatus===2&&!Wy(t)}function Wy(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+py}function Hy(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Vy(t){return t.requestStatus===1&&t.requestTime+Ec<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jy(t){const e=t,{installationEntry:n,registrationPromise:i}=await wr(e);return i?i.catch(console.error):br(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qy(t,e=!1){const n=t;return await zy(n),(await br(n,e)).token}async function zy(t){const{registrationPromise:e}=await wr(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gy(t){if(!t||!t.options)throw Vi("App Configuration");if(!t.name)throw Vi("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Vi(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Vi(t){return it.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc="installations",Ky="installations-internal",Yy=t=>{const e=t.getProvider("app").getImmediate(),n=Gy(e),i=Ve(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},Qy=t=>{const e=t.getProvider("app").getImmediate(),n=Ve(e,Uc).getImmediate();return{getId:()=>jy(n),getToken:s=>qy(n,s)}};function Jy(){ue(new oe(Uc,Yy,"PUBLIC")),ue(new oe(Ky,Qy,"PRIVATE"))}Jy();te(Ic,yr);te(Ic,yr,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn="analytics",Xy="firebase_id",Zy="origin",ev=60*1e3,tv="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ir="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ne=new ni("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nv={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},se=new rt("analytics","Analytics",nv);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(t){if(!t.startsWith(Ir)){const e=se.create("invalid-gtag-resource",{gtagURL:t});return ne.warn(e.message),""}return t}function Bc(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function sv(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function rv(t,e){const n=sv("firebase-js-sdk-policy",{createScriptURL:iv}),i=document.createElement("script"),s=`${Ir}?l=${t}&id=${e}`;i.src=n?n==null?void 0:n.createScriptURL(s):s,i.async=!0,document.head.appendChild(i)}function ov(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function av(t,e,n,i,s,r){const o=i[s];try{if(o)await e[o];else{const l=(await Bc(n)).find(c=>c.measurementId===s);l&&await e[l.appId]}}catch(a){ne.error(a)}t("config",s,r)}async function lv(t,e,n,i,s){try{let r=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const a=await Bc(n);for(const l of o){const c=a.find(d=>d.measurementId===l),u=c&&e[c.appId];if(u)r.push(u);else{r=[];break}}}r.length===0&&(r=Object.values(e)),await Promise.all(r),t("event",i,s||{})}catch(r){ne.error(r)}}function cv(t,e,n,i){async function s(r,...o){try{if(r==="event"){const[a,l]=o;await lv(t,e,n,a,l)}else if(r==="config"){const[a,l]=o;await av(t,e,n,i,a,l)}else if(r==="consent"){const[a,l]=o;t("consent",a,l)}else if(r==="get"){const[a,l,c]=o;t("get",a,l,c)}else if(r==="set"){const[a]=o;t("set",a)}else t(r,...o)}catch(a){ne.error(a)}}return s}function dv(t,e,n,i,s){let r=function(...o){window[i].push(arguments)};return window[s]&&typeof window[s]=="function"&&(r=window[s]),window[s]=cv(r,t,e,n),{gtagCore:r,wrappedGtag:window[s]}}function uv(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Ir)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hv=30,fv=1e3;class pv{constructor(e={},n=fv){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Wc=new pv;function mv(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function gv(t){var e;const{appId:n,apiKey:i}=t,s={method:"GET",headers:mv(i)},r=tv.replace("{app-id}",n),o=await fetch(r,s);if(o.status!==200&&o.status!==304){let a="";try{const l=await o.json();!((e=l.error)===null||e===void 0)&&e.message&&(a=l.error.message)}catch{}throw se.create("config-fetch-failed",{httpStatus:o.status,responseMessage:a})}return o.json()}async function _v(t,e=Wc,n){const{appId:i,apiKey:s,measurementId:r}=t.options;if(!i)throw se.create("no-app-id");if(!s){if(r)return{measurementId:r,appId:i};throw se.create("no-api-key")}const o=e.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new wv;return setTimeout(async()=>{a.abort()},ev),Hc({appId:i,apiKey:s,measurementId:r},o,a,e)}async function Hc(t,{throttleEndTimeMillis:e,backoffCount:n},i,s=Wc){var r;const{appId:o,measurementId:a}=t;try{await yv(i,e)}catch(l){if(a)return ne.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:o,measurementId:a};throw l}try{const l=await gv(t);return s.deleteThrottleMetadata(o),l}catch(l){const c=l;if(!vv(c)){if(s.deleteThrottleMetadata(o),a)return ne.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:o,measurementId:a};throw l}const u=Number((r=c==null?void 0:c.customData)===null||r===void 0?void 0:r.httpStatus)===503?Sr(n,s.intervalMillis,hv):Sr(n,s.intervalMillis),d={throttleEndTimeMillis:Date.now()+u,backoffCount:n+1};return s.setThrottleMetadata(o,d),ne.debug(`Calling attemptFetch again in ${u} millis`),Hc(t,d,i,s)}}function yv(t,e){return new Promise((n,i)=>{const s=Math.max(e-Date.now(),0),r=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(r),i(se.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function vv(t){if(!(t instanceof fe)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class wv{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function bv(t,e,n,i,s){if(s&&s.global){t("event",n,i);return}else{const r=await e,o=Object.assign(Object.assign({},i),{send_to:r});t("event",n,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iv(){if(ca())try{await da()}catch(t){return ne.warn(se.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return ne.warn(se.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Ev(t,e,n,i,s,r,o){var a;const l=_v(t);l.then(p=>{n[p.measurementId]=p.appId,t.options.measurementId&&p.measurementId!==t.options.measurementId&&ne.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${p.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(p=>ne.error(p)),e.push(l);const c=Iv().then(p=>{if(p)return i.getId()}),[u,d]=await Promise.all([l,c]);uv(r)||rv(r,u.measurementId),s("js",new Date);const h=(a=o==null?void 0:o.config)!==null&&a!==void 0?a:{};return h[Zy]="firebase",h.update=!0,d!=null&&(h[Xy]=d),s("config",u.measurementId,h),u.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tv{constructor(e){this.app=e}_delete(){return delete Kt[this.app.options.appId],Promise.resolve()}}let Kt={},qo=[];const zo={};let ji="dataLayer",Sv="gtag",Go,Vc,Ko=!1;function Cv(){const t=[];if(aa()&&t.push("This is a browser extension environment."),sd()||t.push("Cookies are not available."),t.length>0){const e=t.map((i,s)=>`(${s+1}) ${i}`).join(" "),n=se.create("invalid-analytics-context",{errorInfo:e});ne.warn(n.message)}}function kv(t,e,n){Cv();const i=t.options.appId;if(!i)throw se.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)ne.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw se.create("no-api-key");if(Kt[i]!=null)throw se.create("already-exists",{id:i});if(!Ko){ov(ji);const{wrappedGtag:r,gtagCore:o}=dv(Kt,qo,zo,ji,Sv);Vc=r,Go=o,Ko=!0}return Kt[i]=Ev(t,qo,zo,e,Go,ji,n),new Tv(t)}function Rv(t=ii()){t=$(t);const e=Ve(t,Xn);return e.isInitialized()?e.getImmediate():Av(t)}function Av(t,e={}){const n=Ve(t,Xn);if(n.isInitialized()){const s=n.getImmediate();if(Qt(e,n.getOptions()))return s;throw se.create("already-initialized")}return n.initialize({options:e})}function xv(t,e,n,i){t=$(t),bv(Vc,Kt[t.app.options.appId],e,n,i).catch(s=>ne.error(s))}const Yo="@firebase/analytics",Qo="0.10.8";function Nv(){ue(new oe(Xn,(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return kv(i,s,n)},"PUBLIC")),ue(new oe("analytics-internal",t,"PRIVATE")),te(Yo,Qo),te(Yo,Qo,"esm2017");function t(e){try{const n=e.getProvider(Xn).getImmediate();return{logEvent:(i,s,r)=>xv(n,i,s,r)}}catch(n){throw se.create("interop-component-reg-failed",{reason:n})}}}Nv();const Pv={apiKey:"AIzaSyAhmJ3_2V0OOP26nZOMWMOyTDePiyI01Yk",authDomain:"diar-shahama-1088b.firebaseapp.com",projectId:"diar-shahama-1088b",storageBucket:"diar-shahama-1088b.firebasestorage.app",messagingSenderId:"887214900924",appId:"1:887214900924:web:0a265e755c852f0113b2b9",measurementId:"G-HB41E2SHWR",databaseURL:"https://diar-shahama-1088b-default-rtdb.firebaseio.com"},Ti=ma(Pv),Y=Fp(Ti),Zn=Jg(Ti),Ov=cy(Ti);Rv(Ti);window.state={cars:[],ads:[],bookings:[],users:[],notifications:[],logs:[],partners:[],locations:[],brands:[],agents:[],specs:[],packages:[],blogs:[],reviews:[],plates:[],sales:[],user:null,userProfile:null,settings:{},lang:localStorage.getItem("luxury_lang")||"ar",soundEnabled:localStorage.getItem("luxury_sound_enabled")!=="false",tempImages:[],bookingFilter:"all",bookingSubStatusFilter:"all",currentReportPeriod:"day",firstLoadDone:!1,inventoryPage:1,inventorySize:8,sliderIndex:0};const Lv={ar:{welcome:"مرحباً بك في عالم الفخامة",inventory:"مخزون السيارات المتاح",totalCars:"إجمالي السيارات",totalBookings:"إجمالي الطلبات",totalValue:"قيمة المخزون",searchPlaceholder:"ابحث عن سيارتك المثالية...",loading:"جاري التحميل...",noResults:"لم يتم العثور على نتائج تطابق بحثك",applyNow:"اطلبها الآن",details:"عرض التفاصيل",back:"رجوع",save:"حفظ",delete:"حذف",edit:"تعديل",cancel:"إلغاء",successMsg:"تمت العملية بنجاح",errorMsg:"حدث خطأ غير متوقع",staff:"قسم المبيعات والمتابعة",admin:"إدارة النظام",supervisor:"مشرف النظام"},en:{welcome:"Welcome to the World of Luxury",inventory:"Available Vehicle Inventory",totalCars:"Total Vehicles",totalBookings:"Total Bookings",totalValue:"Inventory Value",searchPlaceholder:"Search for your perfect car...",loading:"Loading...",noResults:"No results found matching your search",applyNow:"Request Now",details:"View Details",back:"Back",save:"Save",delete:"Delete",edit:"Edit",cancel:"Cancel",successMsg:"Operation successful",errorMsg:"An unexpected error occurred",staff:"Sales & Follow-up Department",admin:"System Administration",supervisor:"System Supervisor"}};window.showLuxuryToast=function(t,e="success"){const n=document.getElementById("toast-container");if(!n)return;const i=document.createElement("div");i.className=`toast-v2 ${e}`,i.style.cssText=`
    background: ${e==="success"?"rgba(16, 185, 129, 0.9)":"rgba(239, 68, 68, 0.9)"};
    color: white;
    padding: 12px 25px;
    border-radius: 50px;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    font-weight: 600;
    margin-bottom: 10px;
    animation: toast-in 0.4s ease-out;
    display: flex;
    align-items: center;
    gap: 10px;
  `;const s=e==="success"?"fa-check-circle":"fa-exclamation-circle";i.innerHTML=`<i class="fas ${s}"></i> <span>${t}</span>`,n.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateY(-20px)",i.style.transition="all 0.4s ease-in",setTimeout(()=>i.remove(),400)},4e3)};window.openModal=function(t){const e=document.getElementById(t);if(e){e.classList.remove("hidden"),document.body.style.overflow="hidden";const n=document.querySelectorAll(".modal:not(.hidden)");e.style.zIndex=2e3+n.length*10,Dv(`modal-${t}`)}};window.closeModal=function(t,e=!1){var i;const n=document.getElementById(t);n&&(n.classList.add("hidden"),n.style.zIndex="",!e&&((i=history.state)==null?void 0:i.type)===`modal-${t}`&&history.back(),document.querySelector(".modal:not(.hidden)")||(document.body.style.overflow="auto"))};window.setModalTitle=function(t,e){const n=document.getElementById(t+"-title");n&&(n.innerText=e)};window.switchLuxuryTab=function(t){const e=document.querySelectorAll(".pane, .admin-tab-content"),n=document.querySelectorAll(".dash-tab, .admin-sidebar-nav li");e.forEach(o=>o.classList.add("hidden")),n.forEach(o=>o.classList.remove("active"));const i=document.getElementById(t),s=document.querySelector(`[data-tab="${t}"]`);i&&(i.classList.remove("hidden"),i.classList.add("active"),i.style.animation="fade-up 0.5s ease-out forwards"),s&&s.classList.add("active");const r=document.getElementById("bookings-submenu");if(r&&r.classList.toggle("active",t==="bookings-mgmt"||t==="all-bookings"),window.innerWidth<1024){const o=document.querySelector(".dash-sidebar, .admin-sidebar-v2");o&&o.classList.remove("active")}t==="whatsapp-monitor-mgmt"&&window.initWhatsAppServer&&window.initWhatsAppServer(),t==="whatsapp-mgmt"&&window.startCurrentWASession()};function Dv(t){var e;((e=history.state)==null?void 0:e.type)!==t&&history.pushState({type:t},"")}window.normalizePhone=function(t){if(!t)return"";let e=t.toString().replace(/\D/g,"");return e.startsWith("0")?e="966"+e.substring(1):(e.startsWith("5")||!e.startsWith("966")&&e.length>0)&&(e="966"+e),e};document.addEventListener("DOMContentLoaded",()=>{Fv(),jc(),$v(),window.trackVisit(),Mv()});function Mv(){const t=document.querySelector(".mobile-btn"),e=document.querySelector(".nav-menu"),n=document.querySelector(".mobile-nav-overlay"),i=document.querySelector(".menu-close-btn"),s=(y=!1)=>{const v=y===!1?!e.classList.contains("active"):!1;e.classList.toggle("active",v),n.classList.toggle("active",v),document.body.style.overflow=v?"hidden":"";const w=t==null?void 0:t.querySelector("i");w&&(w.className=v?"fas fa-times":"fas fa-bars-staggered")};t&&(t.onclick=()=>s()),n&&(n.onclick=()=>s(!0)),i&&(i.onclick=()=>s(!0)),document.querySelectorAll(".nav-menu a").forEach(y=>{y.addEventListener("click",()=>s(!0))});const r=document.querySelector(".mobile-menu-header .dynamic-name-ar");r&&window.__DYNAMIC_NAME_AR__&&(r.innerText=window.__DYNAMIC_NAME_AR__);const o=document.getElementById("admin-trigger");o&&(o.onclick=y=>{y.preventDefault(),window.openModal("admin-modal")});const a=document.getElementById("theme-btn");a&&(a.onclick=()=>{const v=(document.body.getAttribute("data-theme")||"dark")==="dark"?"light":"dark";document.body.setAttribute("data-theme",v),localStorage.setItem("luxury_theme",v),a.innerHTML=v==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>'});const l=document.getElementById("lang-btn");l&&(l.onclick=()=>{window.state.lang=window.state.lang==="ar"?"en":"ar",localStorage.setItem("luxury_lang",window.state.lang),jc(),window.applyInventoryFilters(),l.innerText=window.state.lang==="ar"?"EN":"AR"}),document.querySelectorAll(".dash-tab").forEach(y=>{y.onclick=()=>window.switchLuxuryTab(y.dataset.tab)});const c=document.getElementById("car-search-input");c&&(c.oninput=()=>window.applyInventoryFilters()),["filter-make","filter-type","filter-year","filter-sort"].forEach(y=>{const v=document.getElementById(y);v&&(v.onchange=()=>{window.state.inventoryPage=1,window.applyInventoryFilters()})});const d=document.getElementById("p-prev"),h=document.getElementById("p-next");d&&(d.onclick=()=>window.moveLuxurySlider(-1)),h&&(h.onclick=()=>window.moveLuxurySlider(1)),setInterval(()=>{const y=document.getElementById("luxury-splash");(!y||y.classList.contains("hidden"))&&window.moveLuxurySlider(1)},5e3),["calc-car-price","calc-down-pay","calc-years"].forEach(y=>{const v=document.getElementById(y);v&&(v.oninput=()=>window.calculateLuxuryFinancing()),v&&v.tagName==="SELECT"&&(v.onchange=()=>window.calculateLuxuryFinancing())}),document.querySelectorAll(".modal-close").forEach(y=>{y.onclick=v=>{v.stopPropagation();const w=y.closest(".modal");if(w){if(w.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(w.id)}}}),window.onclick=y=>{const v=Array.from(document.querySelectorAll(".modal:not(.hidden)"));if(v.length>0){const w=v[v.length-1];if(y.target===w){if(w.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(w.id)}}},window.addEventListener("popstate",y=>{const v=document.querySelectorAll(".modal:not(.hidden)");v.length>0&&v.forEach(w=>{var E;((E=y.state)==null?void 0:E.type)!==`modal-${w.id}`&&window.closeModal(w.id,!0)})}),window.onscroll=()=>{const y=document.getElementById("main-nav");y&&y.classList.toggle("scrolled",window.scrollY>50);const v=document.getElementById("scroll-jump");v&&v.classList.toggle("hidden",window.scrollY<500)},document.getElementById("scroll-jump")&&(document.getElementById("scroll-jump").onclick=()=>window.scrollTo({top:0,behavior:"smooth"}));const f=document.getElementById("login-form");f&&(f.onsubmit=y=>window.loginAdmin(y));const g=document.getElementById("booking-form");g&&(g.onsubmit=y=>window.submitBooking(y));const _=document.getElementById("item-form");_&&(_.onsubmit=y=>window.saveLuxuryItem(y))}function Fv(){const t=JSON.parse(localStorage.getItem("luxury-settings-cache")||"{}"),e=localStorage.getItem("luxury_theme")||t.defaultTheme||"dark";document.body.setAttribute("data-theme",e);const n=document.getElementById("theme-btn");n&&(n.innerHTML=e==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>')}function jc(){const t=window.state.lang;document.body.dir=t==="ar"?"rtl":"ltr",document.body.classList.toggle("en",t==="en");const e=Lv[t];document.querySelectorAll("[data-i18n]").forEach(n=>{const i=n.getAttribute("data-i18n");e[i]&&(n.innerText=e[i])})}async function $v(){await Fm(Zn,Ql);const t=["users","plates","locations","brands","agents","specs","packages","blogs","reviews","cars","ads","sales","settings","partners"],e=["bookings","notifications","logs"],n={};function i(s){n[s]||(n[s]=us(K(Y,s),r=>{const o=r.val();s==="settings"?(window.state.settings=o||{},window.applySettings(o)):(window.state[s]=o?Object.entries(o).map(([a,l])=>({...l,id:a})):[],s==="cars"&&window.applyInventoryFilters(),s==="ads"&&window.renderAdsSlider(),s==="sales"&&window.renderSalesVideos(),s==="partners"&&window.renderPartners(),s==="reviews"&&window.renderPublicReviews(),window.state.user&&(window.syncAdminTables(s),window.updateStatistics())),Uv()},r=>{console.warn(`Listener for ${s} failed:`,r.message),delete n[s]}))}Bm(Zn,async s=>{if(window.state.user=s,s){const r=K(Y,`users/${s.uid}`);us(r,o=>{window.state.userProfile={...o.val(),id:s.uid},Jo(),window.initWhatsAppServer&&window.initWhatsAppServer()}),e.forEach(i)}else window.state.userProfile=null,Jo(),e.forEach(r=>{n[r]&&delete n[r]})}),t.forEach(i)}function Uv(){var i,s;if(window.state.firstLoadDone)return;const t=window.state.settings,e=t==null?void 0:t.maintenanceMode,n=((i=window.state.userProfile)==null?void 0:i.role)==="admin"||((s=window.state.userProfile)==null?void 0:s.role)==="supervisor";if(e&&!n){const r=document.getElementById("luxury-splash");r&&(r.innerHTML=`
            <div class="maint-content" style="text-align:center; color:white; padding: 20px;">
                <i class="fas fa-tools" style="font-size:60px; color:var(--p-red); margin-bottom:20px;"></i>
                <h1 class="luxury-font" style="margin-bottom:10px;">الموقع تحت الصيانة</h1>
                <p style="opacity:0.8;">نعمل حالياً على تحديث المنصة لتقديم تجربة أفضل، سنعود قريباً جداً.</p>
                <div style="margin-top:30px;">
                    <button class="btn-premium btn-sm" onclick="window.openModal('admin-modal')">دخول الإدارة</button>
                </div>
            </div>
          `,r.style.opacity="1",r.classList.remove("hidden"));return}t&&Object.keys(t).length>0&&setTimeout(()=>{const r=document.getElementById("luxury-splash");r&&(r.style.opacity="0",setTimeout(()=>{r.classList.add("hidden"),r.remove()},800)),window.state.firstLoadDone=!0},1200)}function Jo(){var o,a,l;const t=!!window.state.user,e=((o=window.state.userProfile)==null?void 0:o.role)==="admin",n=((a=window.state.userProfile)==null?void 0:a.role)==="supervisor";document.body.classList.toggle("is-logged-in",t),document.body.classList.toggle("is-admin",e),document.body.classList.toggle("is-supervisor",n);const i=document.getElementById("admin-login-ui"),s=document.getElementById("admin-dash-ui");i&&i.classList.toggle("hidden",t),s&&s.classList.toggle("hidden",!t);const r=document.getElementById("admin-trigger");if(r&&(r.innerText=t?"لوحة التحكم":"تسجيل الدخول"),document.querySelectorAll(".admin-only").forEach(c=>c.classList.toggle("hidden",!e&&!n)),document.querySelectorAll(".staff-only").forEach(c=>c.classList.toggle("hidden",e||n)),t){window.syncAdminTables("all"),window.updateStatistics();const c=document.getElementById("user-display-name"),u=document.getElementById("user-role-label");if(c&&(c.innerText=((l=window.state.userProfile)==null?void 0:l.name)||"المسؤول"),u){let d="قسم المبيعات والمتابعة";e?d="إدارة النظام":n&&(d="مشرف النظام"),u.innerText=d}}}window.toggleAvailability=async function(){if(!window.state.userProfile)return;const t=window.state.userProfile.isAvailable||!1;try{await _i(K(Y,`users/${window.state.user.uid}`),{isAvailable:!t}),window.state.userProfile.isAvailable=!t,window.showLuxuryToast(t?"تم تعيين الحالة: غير متاح":"أنت متاح الآن لاستلام الطلبات"),window.updateStatistics()}catch{window.showLuxuryToast("فشل تحديث الحالة","error")}};window.toggleSound=function(){window.state.soundEnabled=!window.state.soundEnabled,localStorage.setItem("luxury_sound_enabled",window.state.soundEnabled);const t=document.getElementById("sound-toggle");t&&(t.checked=window.state.soundEnabled),window.showLuxuryToast(window.state.soundEnabled?"تم تفعيل التنبيهات الصوتية":"تم كتم التنبيهات")};window.setBookingFilter=function(t,e,n="all",i=null){if(window.state.bookingFilter=t,window.state.bookingSubStatusFilter=n,e){document.querySelectorAll(".sub-tab.b-filter").forEach(r=>r.classList.remove("active")),e.classList.add("active"),document.querySelectorAll(".deep-submenu").forEach(r=>r.classList.remove("active"));const s=e.closest(".status-group");if(s){const r=s.querySelector(".deep-submenu");r&&r.classList.add("active")}}i?(document.querySelectorAll(".deep-tab").forEach(s=>s.classList.remove("active")),i.classList.add("active")):e&&document.querySelectorAll(".deep-tab").forEach(s=>s.classList.remove("active")),window.syncAdminTables("bookings")};window.applyInventoryFilters=function(){var g,_,y,v,w,E,D;if(!document.getElementById("cars-container"))return;const e=document.getElementById("filter-make"),n=document.getElementById("filter-year");e&&e.options.length<=1&&[...new Set(window.state.cars.map(k=>k.make))].sort().forEach(k=>{const P=document.createElement("option");P.value=k,P.textContent=k,e.appendChild(P)}),n&&n.options.length<=1&&[...new Set(window.state.cars.map(k=>k.year))].sort((k,P)=>P-k).forEach(k=>{const P=document.createElement("option");P.value=k,P.textContent=k,n.appendChild(P)});const i=(((g=document.getElementById("car-search-input"))==null?void 0:g.value)||"").toLowerCase(),s=((_=document.getElementById("filter-make"))==null?void 0:_.value)||"all",r=((y=document.getElementById("filter-type"))==null?void 0:y.value)||"all",o=((v=document.getElementById("filter-year"))==null?void 0:v.value)||"all",a=((w=document.getElementById("filter-sort"))==null?void 0:w.value)||"newest";let l=((E=window.state.cars)==null?void 0:E.filter(R=>{const k=!i||(R.make+" "+R.model).toLowerCase().includes(i),P=s==="all"||R.make===s,me=r==="all"||R.status===r,Ae=o==="all"||R.year===o;return k&&P&&me&&Ae}))||[];a==="price-asc"?l.sort((R,k)=>(Number(R.price)||0)-(Number(k.price)||0)):a==="price-desc"?l.sort((R,k)=>(Number(k.price)||0)-(Number(R.price)||0)):a==="year-asc"?l.sort((R,k)=>(Number(R.year)||0)-(Number(k.year)||0)):l.sort((R,k)=>new Date(k.createdAt||0)-new Date(R.createdAt||0));const c=((D=window.state.cars)==null?void 0:D.filter(R=>R.isFeatured).slice(0,3))||[];Bv(c.length>0?c:window.state.cars.slice(0,3));const u=l.length,d=window.state.inventoryPage||1,h=window.state.inventorySize||8,p=(d-1)*h,f=l.slice(p,p+h);renderCarGrid(f),Wv(u,d,h)};function Bv(t){const e=document.getElementById("featured-offers-container");if(!e||!t.length)return;const n=document.getElementById("featured-offers-section");n&&(n.style.display="block"),e.innerHTML=t.map(i=>`
        <div class="offer-card-v2" onclick="window.viewLuxuryCar('${i.id}')">
            <div class="offer-badge">عرض حصري</div>
            <div class="offer-img-box">
                <img src="${i.image||"logo.jpg"}" alt="${i.make}" loading="lazy" onerror="this.src='logo.jpg'">
            </div>
            <div class="offer-info">
                <h4>${i.make} ${i.model}</h4>
                <div class="offer-price">
                    <span>${(Number(i.price)||0).toLocaleString()}</span>
                    <small style="font-size: 14px; margin-right: 5px;">ريال</small>
                </div>
                <button class="btn-premium btn-sm" style="margin-top: 10px; width: 100%;">تفاصيل العرض</button>
            </div>
        </div>
    `).join("")}function Wv(t,e,n){const i=document.getElementById("pagination-wrap");if(!i)return;const s=Math.ceil(t/n);if(s<=1){i.innerHTML="";return}let r="";for(let o=1;o<=s;o++)r+=`<button class="p-btn ${o===e?"active":""}" onclick="window.state.inventoryPage=${o}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">${o}</button>`;i.innerHTML=r}window.renderPartners=function(){const t=document.getElementById("front-partners-grid");!t||!window.state.partners||(t.innerHTML=window.state.partners.map(e=>`
    <div class="partner-logo-v2">
        <img src="${e.logo}" alt="${e.name}" title="${e.name}">
    </div>
  `).join(""))};window.renderPublicReviews=function(){const t=document.getElementById("public-reviews-container");if(!(!t||!window.state.reviews)){if(window.state.reviews.length===0){t.innerHTML='<div class="no-results-v2"><p>لا توجد آراء عملاء حالياً</p></div>';return}t.innerHTML=window.state.reviews.map(e=>`
    <div class="review-card-v2">
        <div class="review-stars">
            ${'<i class="fas fa-star"></i>'.repeat(Number(e.rating||5))}
        </div>
        <p class="review-text">"${e.text}"</p>
        <div class="review-author">
           <div class="review-author-avatar">${(e.name||"U").charAt(0)}</div>
           <div class="review-author-info">
              <strong>${e.name}</strong>
              <span>عميل مُحقّق <i class="fas fa-check-circle"></i></span>
           </div>
        </div>
    </div>
  `).join("")}};window.renderCarGrid=function(t){const e=document.getElementById("cars-container");if(e){if(t.length===0){e.innerHTML='<div class="no-results-v2"><i class="fas fa-search"></i> <p>لم يتم العثور على سيارات تطابق بحثك</p></div>';return}e.innerHTML=t.map(n=>`
    <div class="car-card-premium" onclick="window.viewLuxuryCar('${n.id}')" data-aos="fade-up">
      <div class="car-img-wrap">
        <img src="${n.image||"logo.jpg"}" alt="${n.make}" loading="lazy" onerror="this.src='logo.jpg'">
        <div class="car-price-v3">${(Number(n.price)||0).toLocaleString()} <small>ريال</small></div>
        <div class="car-badge-v3 ${n.status==="available"?"available":n.status==="reserved"?"reserved":"sold"}">${n.status==="available"?"متاح":n.status==="reserved"?"محجوز":"مباع"}</div>
      </div>
      <div class="car-info-v3">
        <span class="car-year-v3">${n.year}</span>
        <h3 class="car-title-v3">${n.make} ${n.model}</h3>
        <div class="car-specs-v3">
          <div class="spec-item-v3">
            <i class="fas fa-road"></i>
            <span>${(Number(n.mileage)||0).toLocaleString()} كم</span>
          </div>
          <div class="spec-item-v3">
            <i class="fas fa-gas-pump"></i>
            <span>${n.fuelType||"بنزين"}</span>
          </div>
        </div>
        <div class="car-footer-v3">
          <button class="btn-premium btn-sm btn-full-v3">
            <span>عرض التفاصيل</span>
            <i class="fas fa-arrow-left"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("")}};window.viewLuxuryCar=function(t){const e=window.state.cars.find(o=>o.id===t);if(!e||!document.getElementById("details-modal"))return;let i=e.images||[];i.length===0&&e.image&&(i=[e.image]),i.length===0&&(i=["logo.jpg"]),window.normalizePhone(window.state.settings.contactSales||"0500000000"),`${e.make}${e.model}${e.year}${Number(e.price).toLocaleString()}${window.location.origin}${e.id}`;const s=`
    <div class="details-luxury-container animate-fade-in-v2">
      <!-- Top Header Section -->
      <div class="details-top-v4">
        <div class="details-header-v3">
          <div class="d-badge-row">
            <span class="badge-v3 year">${e.year}</span>
            ${e.isFeatured?'<span class="badge-v3 featured"><i class="fas fa-crown"></i> عرض مميز</span>':""}
            ${e.status==="available"?'<span class="badge-v3 status available">متاح حالياً</span>':e.status==="reserved"?'<span class="badge-v3 status reserved">محجوز</span>':'<span class="badge-v3 status sold">مباع</span>'}
          </div>
          <h1 class="luxury-font">${e.make} ${e.model}</h1>
          <p class="car-subtitle-v5">${e.engine||""} | ${e.gearbox||""} | ${e.fuelType||""}</p>
        </div>
        <div class="price-premium-v6">
          <div class="p-header">السعر الكاش</div>
          <div class="p-main">
            <span class="p-amount">${(Number(e.price)||0).toLocaleString()}</span>
            <span class="p-curr">ريال</span>
          </div>
          <div class="VAT-hint">السعر شامل ضريبة القيمة المضافة</div>
        </div>
      </div>

      <div class="details-main-split">
        <div class="details-media">
          <div class="main-viewer" onclick="window.openFullscreenGallery('${e.id}', document.getElementById('active-luxury-img').src)">
            <img src="${i[0]}" id="active-luxury-img" alt="${e.make} ${e.model}" onerror="this.src='logo.jpg'">
            <div class="viewer-actions">
              <button class="viewer-btn" onclick="event.stopPropagation(); window.switchLuxuryDetailImg('${e.id}', -1)"><i class="fas fa-chevron-right"></i></button>
              <button class="viewer-btn" onclick="event.stopPropagation(); window.switchLuxuryDetailImg('${e.id}', 1)"><i class="fas fa-chevron-left"></i></button>
            </div>
            <div class="zoom-hint"><i class="fas fa-expand"></i> انقر للتكبير</div>
          </div>
          ${i.length>1?`
          <div class="thumbs-view custom-scrollbar">
            ${i.map((o,a)=>`
              <div class="thumb-wrapper ${a===0?"active":""}" onclick="window.setLuxuryDetailImg(this, '${o}')">
                <img src="${o}" class="thumb-frame" onerror="this.src='logo.jpg'">
              </div>
            `).join("")}
          </div>
          `:""}
        </div>

        <div class="details-info-v4">
          <div class="specs-grid-v4-compact">
            <div class="spec-card-v5">
               <i class="fas fa-tachometer-alt"></i>
               <div class="s-info"><span>الممشى</span><strong>${(Number(e.mileage)||0).toLocaleString()} كم</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-calendar-alt"></i>
               <div class="s-info"><span>الموديل</span><strong>${e.year}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-fill-drip"></i>
               <div class="s-info"><span>اللون الخارجي</span><strong>${e.color||"غير محدد"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-palette"></i>
               <div class="s-info"><span>اللون الداخلي</span><strong>${e.interiorColor||"غير محدد"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-gas-pump"></i>
               <div class="s-info"><span>الوقود</span><strong>${e.fuelType||"بنزين"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-cog"></i>
               <div class="s-info"><span>الجير</span><strong>${e.gearbox||"أوتوماتيك"}</strong></div>
            </div>
             <div class="spec-card-v5">
               <i class="fas fa-car-side"></i>
               <div class="s-info"><span>الفئة</span><strong>${e.bodyType||"فاخرة"}</strong></div>
            </div>
             <div class="spec-card-v5">
               <i class="fas fa-shield-alt"></i>
               <div class="s-info"><span>الحالة</span><strong>${e.status==="available"?"متاح":e.status==="sold"?"مباع":"محجوز"}</strong></div>
            </div>
          </div>

          <div class="desc-card-v5" id="luxury-car-desc-container">
            <h3><i class="fas fa-list-ul"></i> وصف ومميزات السيارة</h3>
            <div class="desc-text-v5 custom-scrollbar" id="luxury-desc-body">
              ${(e.desc||e.description||e.details||"سيارة بحالة الوكالة...").replace(/\n/g,"<br>")}
            </div>
          </div>

          <div class="details-footer-actions-v3">
             <button onclick="window.bookCar('${e.id}')" class="btn-luxury-v2 wa-btn" style="border:none; text-align:right;">
               <i class="fas fa-calendar-check"></i>
               <div class="btn-txt">
                 <strong>إحجز هذه السيارة الآن</strong>
                 <span>تعبئة طلب حجز الخدمة</span>
               </div>
             </button>
             <a href="tel:${window.state.settings.contactSales||""}" class="btn-luxury-v2 call-btn">
               <i class="fas fa-phone-alt"></i>
               <div class="btn-txt">
                 <strong>طلب إتصال هاتفي</strong>
                 <span>تواصل مباشر بالمبيعات</span>
               </div>
             </a>
          </div>
        </div>
      </div>
    </div>
  `,r=document.getElementById("details-modal-body");if(r){r.innerHTML=s,r.scrollTop=0;const o=document.getElementById("details-modal");if(o){o.scrollTop=0;const a=o.querySelector(".modal-inner");a&&(a.scrollTop=0)}window.openModal("details-modal")}window.trackCarView(t)};window.bookCar=function(t){const e=window.state.cars.find(s=>s.id===t);if(!e)return;const n=document.getElementById("b-car");n&&(n.value=`${e.make} ${e.model} ${e.year}`),window.closeModal("details-modal");const i=document.getElementById("booking");i&&(i.scrollIntoView({behavior:"smooth"}),n&&(n.focus(),n.style.borderColor="var(--p-copper)",setTimeout(()=>n.style.borderColor="",2e3)))};window.viewBookingDetails=function(t){var a;const e=(window.state.bookings||[]).find(l=>l.id===t);if(!e)return;const n=((a=window.state.users.find(l=>l.id===e.assignedTo))==null?void 0:a.name)||"غير مسند",i=e.status==="sold"?"مكتمل":e.status==="available"?"متاح":e.status==="rejected"?"مرفوض":e.status==="waiting"?"بالانتظار":"جديد",r=`
    <div class="details-luxury-container animate-fade-in-v2">
      <div class="details-top-v4">
        <div class="details-header-v3">
          <div class="d-badge-row">
            <span class="badge-v3 status ${e.status==="sold"?"sold":e.status==="new"?"available":"reserved"}">${i}</span>
            <span class="badge-v3 year">${e.customerType==="company"?"شركة":"فرد"}</span>
            <span class="badge-v3" style="background:var(--p-copper-glow); color:var(--p-copper);">رقم الطلب: #${e.id.slice(-6).toUpperCase()}</span>
          </div>
          <h1 class="luxury-font">${e.name||"بدون اسم"}</h1>
          <p class="car-subtitle-v5">رقم الجوال: <a href="tel:${e.phone}" style="color:var(--p-copper); text-decoration:none;">${e.phone}</a></p>
        </div>
      </div>
      <div class="details-main-split" style="display: flex; gap: 20px; flex-wrap: wrap;">
        <!-- العمود الأول: بيانات العميل -->
        <div class="details-info-v4" style="flex: 1; min-width: 280px;">
          <div class="specs-grid-v4-compact">
            <div class="spec-card-v5">
               <i class="fas fa-car"></i>
               <div class="s-info"><span>السيارة المطلوبة</span><strong>${e.carRequested||"غير محدد"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-globe"></i>
               <div class="s-info"><span>الجنسية / المدينة</span><strong>${e.nationality||"-"} / ${e.city||"-"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-money-bill-wave"></i>
               <div class="s-info"><span>طريقة الشراء</span><strong>${e.paymentMethod||"-"} ${e.paymentMethod==="بنك"?`(${e.bankName||"-"})`:""}</strong></div>
            </div>
            ${e.paymentMethod==="بنك"?`
            <div class="spec-card-v5">
               <i class="fas fa-calendar-alt"></i>
               <div class="s-info"><span>مدة الأقساط</span><strong>${e.installmentPeriod||"-"}</strong></div>
            </div>`:""}
            <div class="spec-card-v5">
               <i class="fas fa-wallet"></i>
               <div class="s-info"><span>الراتب</span><strong>${e.salary||"-"} ريال</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-file-invoice-dollar"></i>
               <div class="s-info"><span>الالتزامات</span><strong>${e.commitments||"-"} ريال</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-building"></i>
               <div class="s-info"><span>جهة العمل</span><strong>${e.workEntity||"-"} (${e.workStatus||"-"})</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-clock"></i>
               <div class="s-info"><span>وقت التواصل</span><strong>${e.preferredTime||"-"}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-user-tie"></i>
               <div class="s-info"><span>الموظف</span><strong>${n}</strong></div>
            </div>
            <div class="spec-card-v5">
               <i class="fas fa-user"></i>
               <div class="s-info"><span>العمر</span><strong>${e.age||"-"} سنة</strong></div>
            </div>
            ${e.email?`
            <div class="spec-card-v5">
               <i class="fas fa-envelope"></i>
               <div class="s-info"><span>البريد</span><strong>${e.email}</strong></div>
            </div>`:""}
          </div>
          
          <div class="desc-card-v5" style="margin-top: 20px;">
            <h3><i class="fas fa-sticky-note"></i> ملاحظات العميل وطلبه</h3>
            <div class="desc-text-v5">
              ${(e.notes||"لا يوجد ملاحظات").replace(/\n/g,"<br>")}
            </div>
          </div>

          <div class="booking-action-card" style="margin-top:20px; padding:20px; background:rgba(255,255,255,0.03); border-radius:12px; border:1px solid var(--glass-border);">
              <h3 style="margin-bottom:15px; color:var(--p-copper); display:flex; align-items:center; gap:10px;"><i class="fas fa-edit"></i> تحديث حالة الطلب والاتصال</h3>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:15px; margin-bottom:15px;">
                  <div class="f-group" style="margin:0;">
                      <label style="font-size:12px; opacity:0.7;">الحالة الرئيسية</label>
                      <select id="update-booking-status" class="filter-select" style="width:100%;" onchange="window.updateSubStatusOptions(this.value)">
                          <option value="new" ${e.status==="new"?"selected":""}>جديد</option>
                          <option value="waiting" ${e.status==="waiting"?"selected":""}>بالانتظار</option>
                          <option value="inquiry" ${e.status==="inquiry"?"selected":""}>استفسار</option>
                          <option value="sold" ${e.status==="sold"?"selected":""}>مكتمل</option>
                          <option value="rejected" ${e.status==="rejected"?"selected":""}>مرفوض</option>
                      </select>
                  </div>
                  <div class="f-group" style="margin:0;">
                      <label style="font-size:12px; opacity:0.7;">الحالة التفصيلية</label>
                      <select id="update-booking-substatus" class="filter-select" style="width:100%;">
                          <!-- يتم التعبئة عبر JavaScript -->
                      </select>
                  </div>
              </div>
              <button onclick="window.updateBookingQuickStatus('${e.id}')" class="btn-premium" style="width:100%; padding:12px; border:none; font-weight:bold;">حفظ التغييرات <i class="fas fa-save" style="margin-right:8px;"></i></button>
          </div>
          
          <div class="details-footer-actions-v3" style="margin-top:20px;">
             <!-- الزر سيقوم الآن بتحديث الـ iframe بدلاً من فتح نافذة جديدة إن أردنا، أو الحفاظ عليه -->
             <button onclick="document.getElementById('wa-iframe').src='https://web.whatsapp.com/send?phone=${window.normalizePhone?window.normalizePhone(e.phone):e.phone}'" class="btn-luxury-v2 wa-btn" style="border:none; cursor:pointer;">
               <i class="fab fa-whatsapp"></i>
               <div class="btn-txt">
                 <strong>إعادة تحميل واتساب</strong>
                 <span>للاتصال بالعميل هنا</span>
               </div>
             </button>
             <a href="tel:${e.phone}" class="btn-luxury-v2 call-btn">
               <i class="fas fa-phone-alt"></i>
               <div class="btn-txt">
                 <strong>اتصال هاتفي</strong>
                 <span>الاتصال بالعميل</span>
               </div>
             </a>
          </div>
        </div>

        <!-- العمود الثاني: واجهة الدردشة المبرمجة مع السيرفر الاحترافي -->
        <div class="details-wa-v4" style="flex: 1.5; min-width: 280px; display: flex; flex-direction: column; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--glass-border); overflow: hidden;">
            <div style="background: #00a884; color: white; padding: 10px 20px; display: flex; align-items: center; gap: 10px;">
               <i class="fab fa-whatsapp" style="font-size: 24px;"></i>
               <h3 style="margin: 0; font-size: 16px; font-weight: bold; font-family: inherit;">محادثة العميل عبر الخادم</h3>
               <button class="btn-premium btn-sm" style="margin-right: auto; padding: 5px 12px; font-size: 12px; background: rgba(0,0,0,0.2); color:white; border:none;" onclick="window.fetchServerWAChat('${e.phone}', '${e.assignedTo||""}')">تحديث الدردشة <i class="fas fa-sync-alt"></i></button>
            </div>
            <div id="wa-server-chat-box" style="flex-grow: 1; height: 500px; background: #e5ddd5; position: relative; overflow-y:auto; padding:15px; display:flex; flex-direction:column; gap:10px;">
               <div style="text-align:center; color:gray; background:rgba(255,255,255,0.7); max-width:80%; margin:0 auto; padding:8px 15px; border-radius:12px; font-size:12px;">جاري الاتصال بالخادم الداخلي لجلب المحادثة...</div>
            </div>
            <div style="padding: 10px; display:flex; gap:10px; background: var(--card-bg); border-top: 1px solid var(--glass-border); align-items:center;">
               <input type="text" id="wa-server-input" placeholder="اكتب رسالة للعميل للرد باسم الموظف..." style="flex:1; padding:12px; border-radius:30px; border:1px solid var(--glass-border); background:var(--bg-main); color:var(--text-color); outline:none;" onkeydown="if(event.key==='Enter') window.sendServerWAMessage('${e.phone}', '${e.assignedTo||""}')">
               <button onclick="window.sendServerWAMessage('${e.phone}', '${e.assignedTo||""}')" class="btn-premium" style="border:none; border-radius:50%; width:45px; height:45px; flex-shrink:0; cursor:pointer; background:#00a884; display:flex; justify-content:center; align-items:center;"><i class="fas fa-paper-plane" style="margin-right:4px;"></i></button>
            </div>
        </div>
      </div>
    </div>
  `,o=document.getElementById("details-modal-body");if(o){o.innerHTML=r,o.scrollTop=0;const l=document.getElementById("details-modal");l&&(l.scrollTop=0),window.openModal("details-modal"),setTimeout(()=>{window.fetchServerWAChat&&window.fetchServerWAChat(e.phone,e.assignedTo||""),window.updateSubStatusOptions&&window.updateSubStatusOptions(e.status||"new",e.subStatus||"not_contacted")},100)}};window.updateSubStatusOptions=function(t,e=null){const n=document.getElementById("update-booking-substatus");if(!n)return;const s={new:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"}],waiting:[{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"}],inquiry:[{v:"docs_not_received",t:"لم يتم استلام الاوراق"}],sold:[{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"}],rejected:[{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]}[t]||[{v:"none",t:"-"}];n.innerHTML=s.map(r=>`<option value="${r.v}" ${r.v===e?"selected":""}>${r.t}</option>`).join("")};window.updateBookingQuickStatus=async function(t){var i,s;const e=(i=document.getElementById("update-booking-status"))==null?void 0:i.value,n=(s=document.getElementById("update-booking-substatus"))==null?void 0:s.value;if(!(!e||!t))try{const r=K(Y,`bookings/${t}`);await _i(r,{status:e,subStatus:n,updatedAt:new Date().toISOString()}),window.showLuxuryToast("تم تحديث حالة الطلب بنجاح")}catch(r){console.error(r),window.showLuxuryToast("فشل تحديث الحالة","error")}};window.saveWAServerURL=async function(){var e;const t=(e=document.getElementById("wa-server-url-config"))==null?void 0:e.value;if(t){if(localStorage.setItem("wa_server_url",t),window.db)try{const{ref:n,set:i}=window.firebaseDatabase;await i(n(window.db,"settings/waServerUrl"),t)}catch{}window.showLuxuryToast("تم حفظ رابط السيرفر وتعميمه لجميع الموظفين بنجاح. يرجى إعادة تحميل الصفحة."),setTimeout(()=>location.reload(),1500)}};window.setLuxuryDetailImg=function(t,e){document.getElementById("active-luxury-img").src=e,document.querySelectorAll(".thumb-wrapper").forEach(n=>n.classList.remove("active")),t.classList.add("active")};window.switchLuxuryDetailImg=function(t,e){const n=window.state.cars.find(c=>c.id===t);if(!n)return;const i=n.images||[n.image||"logo.jpg"],s=document.getElementById("active-luxury-img").src;let r=i.findIndex(c=>s.includes(c));r===-1&&(r=0);let o=(r+e+i.length)%i.length;const a=i[o];document.getElementById("active-luxury-img").src=a;const l=document.querySelectorAll(".thumb-wrapper");l[o]&&(l.forEach(c=>c.classList.remove("active")),l[o].classList.add("active"))};window.openFullscreenGallery=function(t,e){const n=window.state.cars.find(r=>r.id===t);if(!n)return;const i=n.images||[n.image||"logo.jpg"],s=document.createElement("div");s.className="luxury-lightbox",s.innerHTML=`
        <div class="lb-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></div>
        <div class="lb-content">
            <img src="${e}" id="lb-main-img">
            <div class="lb-nav">
                <button onclick="window.navLightbox('${t}', -1)"><i class="fas fa-chevron-right"></i></button>
                <button onclick="window.navLightbox('${t}', 1)"><i class="fas fa-chevron-left"></i></button>
            </div>
        </div>
        <div class="lb-thumbs">
            ${i.map(r=>`<img src="${r}" class="lb-thumb ${r===e?"active":""}" onclick="document.getElementById('lb-main-img').src='${r}'; this.parentElement.querySelectorAll('.lb-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">`).join("")}
        </div>
    `,document.body.appendChild(s)};window.navLightbox=function(t,e){const n=window.state.cars.find(l=>l.id===t),i=n.images||[n.image||"logo.jpg"],s=document.getElementById("lb-main-img");let r=i.indexOf(s.src);r===-1&&(r=0);let o=r+e;o<0&&(o=i.length-1),o>=i.length&&(o=0),s.src=i[o];const a=document.querySelectorAll(".lb-thumb");a.forEach(l=>l.classList.remove("active")),a[o].classList.add("active")};window.trackCarView=async function(t){if(t)try{const e=K(Y,`analytics/popularCars/${t}`);await ir(e,n=>(n||0)+1)}catch(e){console.error("Tracking Error:",e)}};window.resetFilters=function(){["car-search-input","filter-make","filter-type","filter-year","filter-sort"].forEach(e=>{const n=document.getElementById(e);n&&(n.value=n.tagName==="SELECT"?e==="filter-sort"?"newest":"all":"")}),window.applyInventoryFilters()};window.trackVisit=async function(){try{const t=new Date().toISOString().split("T")[0];if(localStorage.getItem("visited_"+t))return;localStorage.setItem("visited_"+t,"true");const e=K(Y,"analytics");await ir(e,n=>{n||(n={totalVisits:0,dailyVisits:{},browsers:{},devices:{},popularCars:{}}),n.totalVisits=(n.totalVisits||0)+1,n.dailyVisits=n.dailyVisits||{},n.dailyVisits[t]=(n.dailyVisits[t]||0)+1;const i=navigator.userAgent;let s="Other";i.includes("Chrome")?s="Chrome":i.includes("Safari")?s="Safari":i.includes("Firefox")?s="Firefox":i.includes("Edge")&&(s="Edge"),n.browsers=n.browsers||{},n.browsers[s]=(n.browsers[s]||0)+1;const r=/iPhone|iPad|iPod|Android/i.test(i)?"mobile":"desktop";return n.devices=n.devices||{},n.devices[r]=(n.devices[r]||0)+1,n})}catch(t){console.error("Analytics Error:",t)}};window.loginAdmin=async function(t){var r,o;t.preventDefault();const e=(r=document.getElementById("admin-email"))==null?void 0:r.value,n=(o=document.getElementById("admin-pass"))==null?void 0:o.value,i=t.target.querySelector("button");if(!e||!n)return window.showLuxuryToast("يرجى إدخال البريد وكلمة المرور","error");const s=i.innerText;i.innerText="جاري التحقق...",i.disabled=!0;try{await Mm(Zn,e,n),window.showLuxuryToast("تم تسجيل الدخول بنجاح"),window.createLog("تسجيل دخول","نجاح تسجيل الدخول للنظام","auth"),window.closeModal("admin-modal")}catch(a){console.error(a),window.showLuxuryToast("خطأ في البيانات، يرجى المحاولة مرة أخرى","error")}finally{i.innerText=s,i.disabled=!1}};window.logout=async function(){confirm("هل أنت متأكد من تسجيل الخروج؟")&&(await window.createLog("تسجيل خروج","خرج المستخدم من النظام","auth"),await Wm(Zn),window.showLuxuryToast("تم تسجيل الخروج"))};window.applySettings=function(t){if(!t)return;const e=document.documentElement;t.primaryColor&&(e.style.setProperty("--p-red",t.primaryColor),e.style.setProperty("--p-red-glow",t.primaryColor+"66")),t.secondaryColor&&e.style.setProperty("--p-teal",t.secondaryColor),t.accentColor&&e.style.setProperty("--p-copper",t.accentColor);const n=t.logo||"logo.jpg";document.querySelectorAll(".logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img").forEach(w=>{w.src=n});const i=t.nameAr||"ون كار",s=t.nameEn||"ONE CAR",r=window.state.lang==="ar"?i:s;if(document.querySelectorAll(".dynamic-name-ar").forEach(w=>w.innerText=i),document.querySelectorAll(".dynamic-name-en").forEach(w=>w.innerText=s),document.title=r+" | "+(window.state.lang==="ar"?"الفخامة في عالم السيارات":"Luxury Automotive"),t.fontFamily&&(e.style.setProperty("--font-main",t.fontFamily),document.body.style.fontFamily=t.fontFamily),t.borderRadius){e.style.setProperty("--border-radius-main",t.borderRadius);const w="dynamic-design-styles";let E=document.getElementById(w);E||(E=document.createElement("style"),E.id=w,document.head.appendChild(E)),E.innerHTML=`
      .car-card-premium, .ad-slide, .nav-premium, .modal-inner, .video-card-v2, .feature-card, .btn-premium { 
        border-radius: ${t.borderRadius} !important; 
      }
    `}const o=document.getElementById("about-text-display");o&&(o.innerText=t.aboutUs||"نقدم لكم تجربة استثنائية في عالم السيارات...");const a=document.getElementById("location-text-display");a&&(a.innerText=t.location||"الرياض - معارض القادسية");const l=document.getElementById("f-phone-admin");l&&(l.innerText=t.contactAdmin||"...");const c=document.getElementById("f-phone-sales");c&&(c.innerText=t.contactSales||"...");const u=document.getElementById("f-phone-info");u&&(u.innerText=t.contactComplaints||"...");const d=document.getElementById("f-email-display");d&&(d.innerText=t.contactEmail||"...");const h=document.getElementById("contact-location-link");h&&(h.href=t.locationUrl||"#");const p=document.getElementById("meta-title");p&&(p.innerText=`${i} | ${t.metaTitle||"الفخامة والجودة تليق بك"}`);const f=document.getElementById("meta-description");f&&f.setAttribute("content",t.metaDesc||"وجهتكم الرائدة للسيارات الفاخرة والمعتمدة.");const g={"f-insta":t.socialInsta,"f-snap":t.socialSnap,"f-twitter":t.socialTwitter};Object.entries(g).forEach(([w,E])=>{const D=document.getElementById(w);D&&(D.href=E||"#")});const _={"set-name-ar":t.nameAr||"","set-name-en":t.nameEn||"","set-color-primary":t.primaryColor||"#a11d21","set-color-secondary":t.secondaryColor||"#1c7c8c","set-color-accent":t.accentColor||"#b8860b","set-default-theme":t.defaultTheme||"dark","set-font-family":t.fontFamily||"'Cairo', sans-serif","set-border-radius":t.borderRadius||"16px","set-contact-mgmt":t.contactAdmin||"","set-contact-sales":t.contactSales||"","set-contact-complaints":t.contactComplaints||"","set-contact-email":t.contactEmail||"","set-about-text":t.aboutUs||"","set-location-link":t.locationUrl||"","set-location-text":t.location||"","set-insta-link":t.socialInsta||"","set-snap-link":t.socialSnap||"","set-twitter-link":t.socialTwitter||""};Object.entries(_).forEach(([w,E])=>{const D=document.getElementById(w);D&&(D.value=E)});const y=document.getElementById("set-maintenance-mode");y&&(y.checked=t.maintenanceMode||!1);const v=document.getElementById("logo-preview-img");v&&(v.src=n),localStorage.setItem("luxury-settings-cache",JSON.stringify(t))};window.resetToDefaultSettings=async function(){if(confirm("هل أنت متأكد من إعادة ضبط كافة الإعدادات؟ سيتم فقدان الشعارات والألوان المخصصة.")){const t={nameAr:"ون كار",nameEn:"ONE CAR",primaryColor:"#a11d21",secondaryColor:"#1c7c8c",accentColor:"#b8860b",defaultTheme:"dark",borderRadius:"16px",logo:"logo.jpg",aboutUs:"تجربة استثنائية في عالم السيارات",location:"الرياض - معارض القادسية"};await dt(K(Y,"settings"),t),window.showLuxuryToast("تمت إعادة الضبط بنجاح")}};window.markAllNotificationsRead=async function(){try{const t=window.state.notifications.map(e=>_i(K(Y,`notifications/${e.id}`),{read:!0}));await Promise.all(t),window.showLuxuryToast("تم تحديد الكل كمقروء")}catch(t){console.error(t)}};window.switchSettingsTab=function(t,e){document.querySelectorAll(".set-pane").forEach(i=>i.classList.add("hidden")),document.querySelectorAll(".set-tab").forEach(i=>i.classList.remove("active"));const n=document.getElementById(t);n&&n.classList.remove("hidden"),e&&e.classList.add("active")};window.previewLogo=function(t){if(t.files&&t.files[0]){const e=new FileReader;e.onload=function(n){const i=n.target.result;document.getElementById("logo-preview-img").src=i,document.getElementById("set-logo-b64").value=i},e.readAsDataURL(t.files[0])}};window.saveAppSettings=async function(){var n,i,s,r,o,a,l,c,u,d,h,p,f,g,_,y,v,w,E,D;const t=document.querySelector('button[onclick="window.saveAppSettings()"]');t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...');const e={nameAr:(n=document.getElementById("set-name-ar"))==null?void 0:n.value,nameEn:(i=document.getElementById("set-name-en"))==null?void 0:i.value,logo:((s=document.getElementById("set-logo-b64"))==null?void 0:s.value)||window.state.settings.logo||"logo.jpg",primaryColor:(r=document.getElementById("set-color-primary"))==null?void 0:r.value,secondaryColor:(o=document.getElementById("set-color-secondary"))==null?void 0:o.value,accentColor:(a=document.getElementById("set-color-accent"))==null?void 0:a.value,defaultTheme:(l=document.getElementById("set-default-theme"))==null?void 0:l.value,fontFamily:(c=document.getElementById("set-font-family"))==null?void 0:c.value,borderRadius:(u=document.getElementById("set-border-radius"))==null?void 0:u.value,contactAdmin:(d=document.getElementById("set-contact-mgmt"))==null?void 0:d.value,contactSales:(h=document.getElementById("set-contact-sales"))==null?void 0:h.value,contactComplaints:(p=document.getElementById("set-contact-complaints"))==null?void 0:p.value,contactEmail:(f=document.getElementById("set-contact-email"))==null?void 0:f.value,aboutUs:(g=document.getElementById("set-about-text"))==null?void 0:g.value,locationUrl:(_=document.getElementById("set-location-link"))==null?void 0:_.value,location:(y=document.getElementById("set-location-text"))==null?void 0:y.value,socialInsta:(v=document.getElementById("set-insta-link"))==null?void 0:v.value,socialSnap:(w=document.getElementById("set-snap-link"))==null?void 0:w.value,socialTwitter:(E=document.getElementById("set-twitter-link"))==null?void 0:E.value,maintenanceMode:((D=document.getElementById("set-maintenance-mode"))==null?void 0:D.checked)||!1,updatedAt:new Date().toISOString()};try{await dt(K(Y,"settings"),e),window.showLuxuryToast("تم حفظ الإعدادات بنجاح"),window.createLog("تعديل إعدادات","تحديث شامل لإعدادات الموقع والمنصة","settings")}catch{window.showLuxuryToast("فشل الحفظ، تأكد من الصلاحيات","error")}finally{t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-save"></i> حفظ التغييرات')}};window.syncAdminTables=function(t){var s,r,o,a,l,c,u;if(t==="all"){["cars","ads","sales","bookings","users","plates","reviews","partners","brands","locations","blogs","whatsapp-monitor"].forEach(h=>window.syncAdminTables(h));return}if(t==="whatsapp-monitor"){window.renderWhatsAppMonitor();return}const e=document.getElementById(`admin-${t}-table`);if(!e)return;let n=window.state[t]||[];const i=(((s=document.getElementById(`admin-${t}-search`))==null?void 0:s.value)||((r=document.getElementById(`${t}-search`))==null?void 0:r.value)||((o=document.getElementById(`${t.slice(0,-1)}-search`))==null?void 0:o.value)||"").toLowerCase();if(i&&(n=n.filter(d=>(d.make||d.title||d.name||d.model||"").toLowerCase().includes(i))),t==="cars"){const d=document.getElementById("admin-filter-car-make");d&&d.options.length<=1&&window.state.cars.length>0&&[...new Set(window.state.cars.map(g=>g.make))].sort().forEach(g=>{const _=document.createElement("option");_.value=g,_.textContent=g,d.appendChild(_)});const h=((a=document.getElementById("admin-filter-car-status"))==null?void 0:a.value)||"all",p=((l=document.getElementById("admin-filter-car-make"))==null?void 0:l.value)||"all";h!=="all"&&(n=n.filter(f=>f.status===h)),p!=="all"&&(n=n.filter(f=>f.make===p))}if(t==="bookings"){const d=window.state.bookingFilter||"all",h=window.state.bookingSubStatusFilter||"all";d!=="all"&&(n=n.filter(f=>f.status===d||!f.status&&d==="new")),h!=="all"&&(n=n.filter(f=>f.subStatus===h)),!(((c=window.state.userProfile)==null?void 0:c.role)==="admin"||((u=window.state.userProfile)==null?void 0:u.role)==="supervisor")&&window.state.user&&(n=n.filter(f=>f.assignedTo===window.state.user.uid))}if(n.sort((d,h)=>new Date(h.createdAt||0)-new Date(d.createdAt||0)),n.length===0){e.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center; opacity:0.5;">لا توجد بيانات حالياً</div>';return}e.innerHTML=n.map(d=>Hv(t,d)).join("")};function Hv(t,e){var a,l;const n=((a=window.state.userProfile)==null?void 0:a.role)==="admin",i=e.status==="sold"?"danger":e.status==="available"?"success":"warning",s=e.status==="sold"?"مباع":e.status==="available"?"متاح":"محجوز";if(t==="bookings"){const c=((l=window.state.users.find(u=>u.id===e.assignedTo))==null?void 0:l.name)||"غير محدد";return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:16px;">${e.name||e.phone}</strong>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); margin-top:5px;">
                        <span><i class="fas fa-car"></i> ${e.carOrCompany||e.carRequested||"-"}</span> | 
                        <span><i class="fas fa-user-tie"></i> ${c}</span>
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${i}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${e.status||"جديد"}</span>
                    <button class="icon-btn-lite view" onclick="window.viewBookingDetails('${e.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('bookings', '${e.id}')" title="تعديل الحجز" aria-label="Edit Booking"><i class="fas fa-edit"></i></button>
                    ${n?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('bookings', '${e.id}')" title="حذف الحجز" aria-label="Delete Booking"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `}if(t==="cars")return`
            <div class="admin-item-row car-admin-row" style="background:rgba(255,255,255,0.02); padding:12px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px; transition:all 0.3s ease;">
                <div class="admin-item-thumb" style="width:80px; height:60px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${e.image||"logo.jpg"}" style="width:100%; height:100%; object-fit:cover; opacity:0.8;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
                        <strong style="font-size:16px;">${e.make} ${e.model}</strong>
                        <span style="font-size:12px; color:var(--p-copper); font-weight:700;">${e.year}</span>
                    </div>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); display:flex; gap:15px; flex-wrap:wrap;">
                        <span><i class="fas fa-tachometer-alt"></i> ${Number(e.mileage||0).toLocaleString()} كم</span>
                        <span><i class="fas fa-paint-brush"></i> ${e.color||"-"}</span>
                        <span style="color:var(--p-red); font-weight:800;">${Number(e.price||0).toLocaleString()} ريال</span>
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:8px; align-items:center;">
                    <span class="badge-${i}" style="font-size:10px; padding:4px 10px; border-radius:6px; font-weight:700;">${s}</span>
                    <button class="icon-btn-lite view" onclick="window.viewLuxuryCar('${e.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('cars', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    ${n?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('cars', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `;if(t==="users")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block;">${e.name||e.email}</strong>
                    <div style="font-size:12px;">
                        <span style="color:var(--p-copper);">${e.role||"staff"}</span> | 
                        <span class="status-badge ${e.isAvailable?"online":"busy"}">● ${e.isAvailable?"متاح":"غير متاح"}</span>
                    </div>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('users', '${e.id}')" title="تعديل المستخدم" aria-label="Edit User"><i class="fas fa-edit"></i></button>
                    ${n?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${e.id}')" title="حذف المستخدم" aria-label="Delete User"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `;if(t==="plates")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:18px; letter-spacing:2px;">${e.number} ${e.letters}</strong>
                    <span style="font-size:12px; color:var(--p-copper);">${Number(e.price).toLocaleString()} ريال</span>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${i}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${s}</span>
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('plates', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    ${n?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('plates', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `;if(t==="logs")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:10px; border-radius:10px; font-size:12px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <strong style="color:var(--p-teal);">${e.action}</strong>
                    <span style="opacity:0.5;">${new Date(e.timestamp).toLocaleString()}</span>
                </div>
                <p style="opacity:0.8;">${e.details}</p>
                <div style="margin-top:5px; font-size:10px; opacity:0.6;">بواسطة: ${e.user}</div>
            </div>
        `;const r=e.make?`${e.make} ${e.model}`:e.title||e.name||"بدون عنوان",o=e.image||e.logo||e.poster||null;return`
        <div class="admin-item-row" onclick="window.editLuxuryItem('${t}', '${e.id}')" style="cursor:pointer;">
            <div style="display:flex; align-items:center; gap:15px;">
                ${o?`
                    <div style="width:50px; height:40px; border-radius:8px; overflow:hidden; flex-shrink:0;">
                        <img src="${o}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                    </div>
                `:""}
                <div class="admin-item-info">
                    <strong style="display:block;">${r}</strong>
                    ${e.price?`<span style="font-size:12px; color:var(--p-copper); font-weight:700;">${Number(e.price).toLocaleString()} ريال</span>`:""}
                </div>
            </div>
            <div class="admin-actions" style="display:flex; gap:8px; align-items:center;" onclick="event.stopPropagation()">
                ${e.status?`<span class="badge-${i}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${s}</span>`:""}
                <button class="icon-btn-lite" onclick="window.editLuxuryItem('${t}', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                ${n?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('${t}', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
            </div>
        </div>
    `}window.updateStatistics=function(){var u,d,h,p;const t=document.getElementById("stat-cars-count-v2"),e=document.getElementById("stat-bookings-count-v2"),n=document.getElementById("stat-total-value-v2"),i=window.state.cars||[];let s=window.state.bookings||[];if(!(((u=window.state.userProfile)==null?void 0:u.role)==="admin"||((d=window.state.userProfile)==null?void 0:d.role)==="supervisor")&&window.state.user&&(s=s.filter(f=>f.assignedTo===window.state.user.uid)),t&&(t.innerText=i.length),e&&(e.innerText=s.length),n){const f=i.reduce((g,_)=>g+(parseFloat(_.price)||0),0);n.innerText=f.toLocaleString()+" ريال"}const o={all:s.length,new:s.filter(f=>f.status==="new"||!f.status).length,waiting:s.filter(f=>f.status==="waiting").length,inquiry:s.filter(f=>f.status==="inquiry").length,sold:s.filter(f=>f.status==="sold").length,done:s.filter(f=>f.status==="done").length,cancelled:s.filter(f=>f.status==="cancelled").length,sub:{not_contacted:s.filter(f=>f.subStatus==="not_contacted").length,contacted:s.filter(f=>f.subStatus==="contacted").length,docs_received:s.filter(f=>f.subStatus==="docs_received").length,waiting_calc:s.filter(f=>f.subStatus==="waiting_calc").length,waiting_docs:s.filter(f=>f.subStatus==="waiting_docs").length,waiting_signature:s.filter(f=>f.subStatus==="waiting_signature").length,docs_not_received:s.filter(f=>f.subStatus==="docs_not_received").length,signed:s.filter(f=>f.subStatus==="signed").length,delivered:s.filter(f=>f.subStatus==="delivered").length,done:s.filter(f=>f.subStatus==="done").length,no_response:s.filter(f=>f.subStatus==="no_response").length,obligations:s.filter(f=>f.subStatus==="obligations").length,calc_rejected:s.filter(f=>f.subStatus==="calc_rejected").length,ineligible:s.filter(f=>f.subStatus==="ineligible").length,duplicate:s.filter(f=>f.subStatus==="duplicate").length}};Object.entries(o).forEach(([f,g])=>{const _=document.getElementById(`count-${f}`);_&&(_.innerText=g)}),Object.entries(o.sub).forEach(([f,g])=>{const _=document.getElementById(`count-sub-${f}`);_&&(_.innerText=g)});const a=document.getElementById("bookings-badge");a&&(a.innerText=o.new,a.classList.toggle("hidden",o.new===0));const l=(h=window.state.user)==null?void 0:h.uid;if(((p=window.state.userProfile)==null?void 0:p.role)==="staff"&&l){const f=document.getElementById("staff-quick-stats");f&&f.classList.remove("hidden");const g=(window.state.bookings||[]).filter(P=>P.assignedTo===l),_=g.filter(P=>P.status==="new"||!P.status).length,y=g.length,v=g.filter(P=>P.status==="sold").length,w=y>0?Math.round(v/y*100):0,E=document.getElementById("staff-waiting-count"),D=document.getElementById("staff-total-assigned"),R=document.getElementById("staff-conversion-rate"),k=document.getElementById("availability-toggle");E&&(E.innerText=_),D&&(D.innerText=y),R&&(R.innerText=w+"%"),k&&(k.checked=window.state.userProfile.isAvailable!==!1)}};window.deleteLuxuryItem=async function(t,e){if(confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذه العملية."))try{await Rp(K(Y,`${t}/${e}`)),window.showLuxuryToast("تم الحذف بنجاح"),window.createLog("حذف",`حذف عنصر من ${t} (ID: ${e})`,"data")}catch{window.showLuxuryToast("فشل الحذف","error")}};window.editLuxuryItem=function(t,e){const n=(window.state[t]||[]).find(s=>s.id===e);!n||(window.state.currentEdit={type:t,id:e},!document.getElementById("item-form"))||(t==="cars"&&(window.state.carImages=[],n.image&&window.state.carImages.push({type:"url",value:n.image,isMain:!0}),n.images&&Array.isArray(n.images)&&n.images.forEach(s=>{s!==n.image&&window.state.carImages.push({type:"url",value:s,isMain:!1})})),qc(t,n),window.setModalTitle("item-modal",`تعديل: ${n.make||n.title||t}`),window.openModal("item-modal"))};window.openCRUDModal=function(t,e=null){var s;if(window.state.currentEdit={type:t,id:e},!document.getElementById("item-form"))return;const i=e?((s=window.state[t])==null?void 0:s.find(r=>r.id===e))||{}:{};t==="cars"&&(window.state.carImages=[],i.image&&window.state.carImages.push({type:"url",value:i.image,isMain:!0}),i.images&&Array.isArray(i.images)&&i.images.forEach(r=>{r!==i.image&&window.state.carImages.push({type:"url",value:r,isMain:!1})})),qc(t,i),window.setModalTitle("item-modal",e?`تعديل: ${t}`:`إضافة: ${t}`),window.openModal("item-modal")};function qc(t,e={}){const n=document.getElementById("dynamic-form-fields");if(!n)return;let i=[];if(t==="cars"){const s=(window.state.brands||[]).map(r=>({v:r.name,t:r.name}));i=[{name:"make",label:"الماركة",type:"select",options:[{v:"",t:"اختر الماركة"},...s],required:!0},{name:"model",label:"الموديل",type:"text",required:!0},{name:"year",label:"السنة",type:"number",required:!0},{name:"price",label:"السعر",type:"number",required:!0},{name:"mileage",label:"الممشى (كم)",type:"number",required:!0},{name:"engine",label:"المحرك",type:"text",placeholder:"مثال: 8 سليندر، 4.0L"},{name:"gearbox",label:"ناقل الحركة",type:"select",options:[{v:"أوتوماتيك",t:"أوتوماتيك"},{v:"عادي",t:"عادي"}]},{name:"fuelType",label:"نوع الوقود",type:"select",options:[{v:"بنزين",t:"بنزين"},{v:"ديزل",t:"ديزل"},{v:"هايبرد",t:"هايبرد"},{v:"كهرباء",t:"كهرباء"}]},{name:"bodyType",label:"فئة السيارة",type:"select",options:[{v:"sedan",t:"سيدان"},{v:"suv",t:"SUV"},{v:"coupe",t:"كوبيه"},{v:"luxury",t:"فاخرة"},{v:"pickup",t:"بيك آب"}]},{name:"color",label:"اللون خارجي",type:"text"},{name:"interiorColor",label:"اللون داخلي",type:"text"},{name:"status",label:"الحالة في المخزون",type:"select",options:[{v:"available",t:"متاح"},{v:"reserved",t:"محجوز"},{v:"sold",t:"مباع"},{v:"incoming",t:"قادم قريباً"}]},{name:"isFeatured",label:"عرض في قسم المميز؟",type:"select",options:[{v:!1,t:"لا"},{v:!0,t:"نعم"}]},{name:"desc",label:"وصف إضافي ومواصفات",type:"textarea"},{name:"_image_manager",label:"صور السيارة (المعرض)",type:"custom",html:`
        <div class="f-group full-width">
          <label>إدارة صور السيارة (المعرض والصورة الرئيسية)</label>
          <div class="img-manager-v2" id="car-image-manager">
            <!-- Rendered by window.renderCarImageManager -->
          </div>
          <input type="file" id="car-file-input" multiple accept="image/*" style="display:none;" onchange="window.handleCarFileSelect(this.files)">
        </div>
      `}],setTimeout(()=>window.renderCarImageManager(),100)}else t==="ads"?i=[{name:"title",label:"العنوان",type:"text"},{name:"subtitle",label:"العنوان الفرعي",type:"text"},{name:"image",label:"رابط الصورة",type:"text"},{name:"link",label:"الرابط (اختياري)",type:"text"}]:t==="sales"?i=[{name:"title",label:"العنوان",type:"text"},{name:"description",label:"وصف قصير",type:"textarea"},{name:"url",label:"رابط الفيديو (MP4 أو YouTube)",type:"text"},{name:"poster",label:"رابط صورة الغلاف",type:"text"}]:t==="reviews"?i=[{name:"name",label:"اسم العميل",type:"text"},{name:"text",label:"التعليق/الرأي",type:"textarea"},{name:"rating",label:"التقييم (1-5)",type:"number"}]:t==="partners"?i=[{name:"name",label:"اسم الشريك",type:"text"},{name:"logo",label:"رابط الشعار",type:"text"},{name:"link",label:"رابط خارجي (اختياري)",type:"text"}]:t==="brands"?i=[{name:"name",label:"اسم العلامة التجارية",type:"text"},{name:"logo",label:"رابط الشعار",type:"text"}]:t==="blogs"?i=[{name:"title",label:"عنوان المقال",type:"text"},{name:"image",label:"رابط الصورة",type:"text"},{name:"content",label:"محتوى المقال",type:"textarea"}]:t==="locations"?i=[{name:"name",label:"اسم المدينة/الدولة",type:"text"},{name:"status",label:"الحالة",type:"select",options:[{v:"active",t:"نشط"},{v:"inactive",t:"غير نشط"}]}]:t==="plates"?i=[{name:"number",label:"رقم اللوحة",type:"text"},{name:"letters",label:"حروف اللوحة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"status",label:"الحالة",type:"select",options:[{v:"available",t:"متاح"},{v:"sold",t:"مباع"}]}]:t==="specs"?i=[{name:"name",label:"اسم المواصفة",type:"text"},{name:"icon",label:"أيقونة (FontAwesome)",type:"text"}]:t==="packages"?i=[{name:"name",label:"اسم الباقة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"features",label:"المميزات (فاصلة بين كل ميزة)",type:"textarea"}]:t==="bookings"?i=[{name:"name",label:"اسم العميل",type:"text"},{name:"phone",label:"الجوال",type:"text"},{name:"carRequested",label:"السيارة المطلوبة",type:"text"},{name:"status",label:"حالة الطلب",type:"select",options:[{v:"new",t:"جديد"},{v:"waiting",t:"بالانتظار"},{v:"inquiry",t:"استفسار"},{v:"sold",t:"مكتمل"},{v:"rejected",t:"مرفوض"}]},{name:"subStatus",label:"الحالة التفصيلية",type:"select",options:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"},{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"},{v:"docs_not_received",t:"لم يتم استلام الاوراق"}]},{name:"assignedTo",label:"الموظف المسؤول",type:"select",options:[{v:"",t:"غير محدد"},...window.state.users.filter(s=>s.role==="staff").map(s=>({v:s.id,t:s.name||s.email}))]},{name:"notes",label:"ملاحظات",type:"textarea"}]:t==="users"?i=[{name:"name",label:"الاسم الكامل",type:"text"},{name:"email",label:"البريد الإلكتروني",type:"text"},{name:"role",label:"الصلاحية",type:"select",options:[{v:"staff",t:"موظف"},{v:"supervisor",t:"مشرف"},{v:"admin",t:"مدير"}]},{name:"isAvailable",label:"متاح لاستلام الطلبات؟",type:"select",options:[{v:!0,t:"نعم"},{v:!1,t:"لا"}]}]:i=[{name:"name",label:"الاسم / العنوان",type:"text"},{name:"desc",label:"الوصف",type:"textarea"}];n.innerHTML=`
    <div class="form-grid-v3">
      ${i.map(s=>{if(s.type==="custom")return s.html;let r=e[s.name]!==void 0&&e[s.name]!==null?e[s.name]:"";s.name==="desc"&&!r&&(r=e.description||e.details||"");const o=s.required?"required":"",a=s.placeholder||s.label;let l="";return s.type==="select"?l=`
            <select name="${s.name}" class="filter-select" ${o}>
              ${s.options.map(c=>`<option value="${c.v}" ${c.v.toString()===r.toString()?"selected":""}>${c.t}</option>`).join("")}
            </select>
          `:s.type==="textarea"?l=`<textarea name="${s.name}" placeholder="${a}" ${o}>${r}</textarea>`:s.type==="file"?l=`
            <input type="file" name="${s.name}" ${s.multiple?"multiple":""} ${o} accept="image/*" class="filter-select">
            ${r?`<div class="file-path-hint" title="${r}">الملف الحالي: ${r.split("/").pop()}</div>`:""}
          `:l=`<input type="${s.type}" name="${s.name}" value="${r}" placeholder="${a}" ${o}>`,`
          <div class="f-group ${s.type==="textarea"||s.type==="custom"?"full-width":""}">
            <label>${s.label} ${s.required?'<span class="req">*</span>':""}</label>
            ${l}
          </div>
        `}).join("")}
    </div>
  `}window.handleCarFileSelect=function(t){if(t){for(let e=0;e<t.length;e++){const n=t[e];window.state.carImages.push({type:"file",value:n,preview:URL.createObjectURL(n),isMain:window.state.carImages.length===0})}window.renderCarImageManager()}};window.renderCarImageManager=function(){const t=document.getElementById("car-image-manager");if(!t)return;let n=`
    <div class="img-grid-v2">
      ${(window.state.carImages||[]).map((i,s)=>{const r=i.type==="url"?i.value:i.preview;return`
          <div class="img-item-v2 ${i.isMain?"is-main":""}">
            ${i.isMain?'<span class="main-badge">الرئيسية</span>':""}
            <img src="${r}" alt="Car image">
            <div class="img-actions-lite">
              <button type="button" class="img-action-btn-lite" onclick="window.reorderCarImage(${s}, -1)" title="نقل لليمين">
                <i class="fas fa-arrow-right"></i>
              </button>
              <button type="button" class="img-action-btn-lite" onclick="window.reorderCarImage(${s}, 1)" title="نقل لليسار">
                <i class="fas fa-arrow-left"></i>
              </button>
              <button type="button" class="img-action-btn-lite" onclick="window.setCarMainImage(${s})" title="تعيين كرئيسية">
                <i class="fas fa-star"></i>
              </button>
              <button type="button" class="img-action-btn-lite danger" onclick="window.removeCarImage(${s})" title="حذف">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        `}).join("")}
      <div class="add-img-btn-v2" onclick="document.getElementById('car-file-input').click()">
        <i class="fas fa-plus"></i>
        <span>أضف صور</span>
      </div>
    </div>
  `;t.innerHTML=n};window.reorderCarImage=function(t,e){const n=window.state.carImages,i=t+e;if(i>=0&&i<n.length){const s=n[t];n[t]=n[i],n[i]=s,window.renderCarImageManager()}};window.removeCarImage=function(t){if(t<0||t>=window.state.carImages.length)return;const e=window.state.carImages[t].isMain;window.state.carImages.splice(t,1),e&&window.state.carImages.length>0&&(window.state.carImages[0].isMain=!0),window.renderCarImageManager()};window.setCarMainImage=function(t){window.state.carImages.forEach((e,n)=>e.isMain=n===t),window.renderCarImageManager()};window.saveLuxuryItem=async function(t){t&&t.preventDefault();const e=window.state.currentEdit;if(!e)return;const{type:n,id:i}=e,s=document.getElementById("item-form");if(!s)return;const r=s.querySelector('button[type="submit"]'),o=r.innerText;r&&(r.disabled=!0,r.innerText="جاري الحفظ والمعالجة...");const a=new FormData(s),l={};a.forEach((c,u)=>{u!=="main_img_file"&&u!=="gallery_files"&&(l[u]=c)});try{if(n==="cars"){const d=[];let h="";const p=window.state.carImages||[];p.length;for(let f=0;f<p.length;f++){const g=p[f];let _="";if(g.type==="url")_=g.value;else if(g.type==="file"){const y=g.value,v=`cars/${Date.now()}_${f}_${y.name.replace(/\s/g,"_")}`,w=ly(Ov,v),E=await oy(w,y);_=await ay(E.ref)}d.push(_),g.isMain&&(h=_)}!h&&d.length>0&&(h=d[0]),l.image=h,l.images=d}["price","year","mileage","rating","installmentPeriod"].forEach(d=>{l[d]!==void 0&&l[d]!==""&&l[d]!==null&&(l[d]=Number(l[d]))}),l.isFeatured!==void 0&&(l.isFeatured=l.isFeatured==="true"||l.isFeatured===!0),i||(l.createdAt=new Date().toISOString()),l.updatedAt=new Date().toISOString();const u=i?K(Y,`${n}/${i}`):qn(K(Y,n));await(i?_i(u,l):dt(u,l)),window.showLuxuryToast(i?"تم تحديث البيانات بنجاح":"تم إضافة العنصر بنجاح"),window.closeModal("item-modal"),window.createLog(i?"تعديل":"إضافة",`${i?"تعديل":"إضافة"} في ${n} - ${l.make||l.title||i}`,"data")}catch(c){console.error("Save Error:",c),window.showLuxuryToast("حدث خطأ أثناء الحفظ: "+(c.message||"خطأ غير معروف"),"error")}finally{r&&(r.disabled=!1,r.innerText=o)}};window.renderAdsSlider=function(){const t=document.getElementById("slider-track"),e=document.getElementById("slider-dots");if(!t)return;const n=window.state.ads||[];if(n.length===0){t.innerHTML='<div class="no-ads"></div>',e&&(e.innerHTML="");return}t.innerHTML=n.map(i=>`
        <div class="ad-slide">
            <img src="${i.image||"logo.jpg"}" class="ad-bg-img" alt="${i.title||"عرض خاص"}">
            <div class="ad-content">
                <h2 class="luxury-font">${i.title||""}</h2>
                <p>${i.subtitle||""}</p>
                ${i.link?`<a href="${i.link}" class="btn-premium"><span>اكتشف المزيد</span> <i class="fas fa-arrow-left" style="margin-right: 10px;"></i></a>`:""}
            </div>
        </div>
    `).join(""),e&&(e.innerHTML=n.map((i,s)=>`<div class="dot ${s===0?"active":""}" onclick="window.goToLuxurySlide(${s})"></div>`).join("")),window.state.sliderIndex=0,window.moveLuxurySlider(0)};window.goToLuxurySlide=function(t){window.state.sliderIndex=t,window.moveLuxurySlider(0)};window.moveLuxurySlider=function(t){var o;const e=document.getElementById("slider-track");if(!e)return;const n=((o=window.state.ads)==null?void 0:o.length)||0;if(n<=1){e.style.transform="translateX(0)";return}window.state.sliderIndex=(window.state.sliderIndex+t+n)%n;const i=window.state.sliderIndex*100,s=document.body.dir==="rtl";e.style.transform=`translateX(${s?i:-i}%)`,document.querySelectorAll(".slider-dots .dot").forEach((a,l)=>{a.classList.toggle("active",l===window.state.sliderIndex)})};window.calculateLuxuryFinancing=function(){var l,c,u;const t=Number((l=document.getElementById("calc-car-price"))==null?void 0:l.value)||0,e=Number((c=document.getElementById("calc-down-pay"))==null?void 0:c.value)||0,n=Number((u=document.getElementById("calc-years"))==null?void 0:u.value)||5,i=document.getElementById("calc-result-val");if(!i)return;const s=t-e;if(s<=0){i.innerText="0 ريال";return}const o=s*(1+.045*n),a=Math.round(o/(n*12));i.innerText=a.toLocaleString()+" ريال"};window.renderSalesVideos=function(){const t=document.getElementById("sales-container");if(!t)return;const e=window.state.sales||[];if(e.length===0){t.innerHTML='<div class="no-results-v2"><p>لا توجد مقاطع فيديو متاحة حالياً</p></div>';return}t.innerHTML=e.map(n=>{let i="";const s=(n.url||"").trim();if(s.includes("youtube.com")||s.includes("youtu.be")){let r="";s.includes("v=")?r=s.split("v=")[1].split("&")[0]:r=s.split("/").pop(),i=`
            <div class="video-inner">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${r}?modestbranding=1&rel=0" frameborder="0" allowfullscreen></iframe>
            </div>`}else i=`
            <div class="video-inner" onclick="const v = this.querySelector('video'); if(v.paused) v.play(); else v.pause();">
                <video poster="${n.poster||"logo.jpg"}" preload="none">
                    <source src="${s}" type="video/mp4">
                </video>
                <div class="v-play-overlay">
                    <div class="v-play-btn"><i class="fas fa-play"></i></div>
                </div>
            </div>`;return`
            <div class="video-card-v2" data-aos="zoom-in">
                <div class="video-player-wrap">
                    ${i}
                </div>
                <div class="video-info-v2">
                    <span class="v-badge-gold"><i class="fas fa-award"></i> مبيعات ناجحة</span>
                    <h3>${n.title||n.name||"لحظة تسليم"}</h3>
                    <p>${n.description||"يسعدنا دائماً مشاركة لحظات نجاحنا مع عملائنا الكرام."}</p>
                </div>
            </div>
        `}).join("")};window.toggleWAWidget=function(){const t=document.getElementById("wa-widget");t&&t.classList.toggle("hidden")};window.sendWAWidgetMsg=function(){var i;const t=document.getElementById("wa-input"),e=(i=t==null?void 0:t.value)==null?void 0:i.trim();if(!e)return;const n=window.state.settings.contactSales||"0500000000";window.open(`https://wa.me/${window.normalizePhone(n)}?text=${encodeURIComponent(e)}`,"_blank"),t&&(t.value=""),window.toggleWAWidget()};window.createLog=async function(t,e,n="general"){var i,s;try{const r=qn(K(Y,"logs"));await dt(r,{user:((i=window.state.user)==null?void 0:i.email)||"Visitor",userId:((s=window.state.user)==null?void 0:s.uid)||null,action:t,details:e,category:n,timestamp:new Date().toISOString()})}catch(r){console.error("Log Error:",r)}};window.submitBooking=async function(t){var s,r,o,a,l,c,u,d,h,p,f,g,_,y,v,w,E,D;t.preventDefault();const e=t.target,n=e.querySelector('button[type="submit"]'),i={customerType:((s=e.querySelector('[name="customer-type"]:checked'))==null?void 0:s.value)||"individual",carRequested:((r=document.getElementById("b-car"))==null?void 0:r.value)||"",name:((o=document.getElementById("b-name"))==null?void 0:o.value)||"",phone:((a=document.getElementById("b-phone"))==null?void 0:a.value)||"",age:((l=document.getElementById("b-age"))==null?void 0:l.value)||"",email:((c=document.getElementById("b-email"))==null?void 0:c.value)||"",nationality:((u=document.getElementById("b-nationality"))==null?void 0:u.value)||"سعودي",city:((d=document.getElementById("b-city"))==null?void 0:d.value)||"",paymentMethod:((h=e.querySelector('[name="payment-method"]:checked'))==null?void 0:h.value)||"كاش",bankName:((p=document.getElementById("b-bank-name"))==null?void 0:p.value)||"",installmentPeriod:((f=document.getElementById("b-installment-period"))==null?void 0:f.value)||"",salary:((g=document.getElementById("b-salary"))==null?void 0:g.value)||"",commitments:((_=document.getElementById("b-commitments"))==null?void 0:_.value)||"",workEntity:((y=document.getElementById("b-work-entity"))==null?void 0:y.value)||"حكومي",workStatus:((v=document.getElementById("b-work-status"))==null?void 0:v.value)||"معتمد",contactMethod:((w=e.querySelector('[name="contact-method"]:checked'))==null?void 0:w.value)||"الجوال",preferredTime:((E=e.querySelector('[name="preferred-time"]:checked'))==null?void 0:E.value)||"10am - 1pm",notes:((D=document.getElementById("b-notes"))==null?void 0:D.value)||"",status:"new",subStatus:"not_contacted",createdAt:new Date().toISOString()};n.disabled=!0,n.innerText="جاري الإرسال...";try{const R=K(Y,"config/lastAssignedStaffIndex_v2"),k=window.state.users.filter(me=>me.role==="staff"&&me.isAvailable!==!1);k.length>0&&await ir(R,me=>{let Ae=me||0;Ae>=k.length&&(Ae=0);const zc=k[Ae];return i.assignedTo=zc.id,(Ae+1)%k.length});const P=qn(K(Y,"bookings"));await dt(P,i),i.assignedTo&&await qn(K(Y,"notifications"),{userId:i.assignedTo,type:"new_booking",title:"طلب جديد مسند إليك",body:`لديك طلب جديد من ${i.name} للسيارة ${i.carRequested}`,bookingId:P.key,read:!1,createdAt:new Date().toISOString()}),window.showLuxuryToast("تم إرسال طلبك بنجاح، سنتواصل معك قريباً"),e.reset()}catch(R){console.error(R),window.showLuxuryToast("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً","error")}finally{n.disabled=!1,n.innerText="تأكيد طلب حجز الخدمة"}};window.fillAIInput=function(t){const e=document.getElementById("ai-chat-input");e&&(e.value=t)};window.clearAIChat=function(){const t=document.getElementById("ai-messages-area");t&&(t.innerHTML="")};window.askLuxuryAI=function(){var i;const t=document.getElementById("ai-chat-input"),e=(i=t==null?void 0:t.value)==null?void 0:i.trim();if(!e)return;qi("user",e),t.value="";const n="ai-typing-"+Date.now();qi("bot","جاري التفكير...",n),setTimeout(()=>{const s=document.getElementById(n);s&&s.remove();const r=Vv(e);qi("bot",r)},1e3)};function qi(t,e,n=null){const i=document.getElementById("ai-messages-area");if(!i)return;const s=document.createElement("div");s.className=`ai-msg ${t}`,n&&(s.id=n),s.innerHTML=`
        <div class="msg-icon"><i class="fas ${t==="bot"?"fa-robot":"fa-user"}"></i></div>
        <div class="msg-content">
            <p>${e}</p>
        </div>
    `,i.appendChild(s),i.scrollTop=i.scrollHeight}function Vv(t){const e=t.toLowerCase(),n=window.state.cars||[],i=window.state.bookings||[];return e.includes("قيمة")||e.includes("مخزون")?`إجمالي قيمة المخزون الحالي هو ${n.reduce((r,o)=>r+(parseFloat(o.price)||0),0).toLocaleString()} ريال سعودي لعدد ${n.length} سيارة.`:e.includes("موظف")||e.includes("أفضل")?"بناءً على البيانات الحالية، يتميز فريق المبيعات بنشاط عالٍ، والمنافسة قوية بين الموظفين لهذا الشهر.":e.includes("ملخص")||e.includes("أداء")?`حالة اليوم: يوجد ${i.filter(r=>r.status==="new"||!r.status).length} طلبات جديدة لم يتم معالجتها بعد، وإجمالي الطلبات في النظام هو ${i.length}.`:"أنا هنا لمساعدتك في إدارة المعرض. يمكنك سؤالي عن المخزون، الطلبات، أو الإحصائيات العامة."}window.renderWhatsAppMonitor=function(){var i,s;const t=document.getElementById("admin-wa-monitor-table");if(!t)return;const e=(((i=document.getElementById("wa-monitor-search"))==null?void 0:i.value)||"").toLowerCase();(s=document.getElementById("wa-monitor-filter"))!=null&&s.value;let n=(window.state.logs||[]).filter(r=>r.category==="whatsapp"||r.details.includes("WhatsApp"));if(e&&(n=n.filter(r=>r.details.toLowerCase().includes(e)||r.user.toLowerCase().includes(e))),n.length===0){t.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center;">لا توجد سجلات مراقبة حالياً</div>';return}t.innerHTML=n.map(r=>`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between;">
                <strong>${r.user}</strong>
                <span style="opacity:0.5; font-size:11px;">${new Date(r.timestamp).toLocaleString()}</span>
            </div>
            <p style="font-size:13px; margin:10px 0;">${r.details}</p>
            ${r.proofUrl?`<a href="${r.proofUrl}" target="_blank" class="btn-premium btn-sm" style="display:inline-block;">عرض الإثبات</a>`:""}
        </div>
    `).join("")};let M=null;const Si="https://context-ground-overnight-russia.trycloudflare.com";window.WA_SERVER_URL_OVERRIDE||localStorage.getItem("wa_server_url");window.startStaffWASession=function(){const t=document.getElementById("wa-staff-select");if(!t||!t.value)return window.showLuxuryToast("يرجى اختيار موظف للربط","error");M&&(document.getElementById("wa-server-status").innerText="يتم الآن توليد كود الاستجابة للموظف...",document.getElementById("wa-server-status").style.color="var(--text-dim)",document.getElementById("wa-qr-container").style.display="none",M.emit("start_session",{userId:t.value}))};window.logoutStaffWASession=function(){const t=document.getElementById("wa-staff-select");if(!t||!t.value)return window.showLuxuryToast("يرجى اختيار الموظف أولاً","error");confirm("هل أنت متأكد من فصل رقم الواتساب لهذا الموظف وسجل المحادثة الخاصة به من السيرفر؟")&&M&&M.emit("logout_session",{userId:t.value})};window.initWhatsAppServer=async function(){const t=document.getElementById("wa-server-url-config");let e=null;if(window.db)try{const{ref:s,get:r}=window.firebaseDatabase,o=await r(s(window.db,"settings/waServerUrl"));o.exists()&&(e=o.val(),localStorage.setItem("wa_server_url",e))}catch{}const n=e||localStorage.getItem("wa_server_url")||Si;window._waServerActiveUrl=n,t&&(t.value=n);const i=document.getElementById("wa-staff-select");if(i&&window.state&&window.state.users){const s=i.value;i.innerHTML='<option value="">-- اختر الموظف --</option>',window.state.users.filter(r=>r.role==="staff"||r.role==="admin"||r.role==="supervisor").forEach(r=>{const o=r.role==="admin"?"مدير":r.role==="supervisor"?"مشرف":"موظف";i.innerHTML+=`<option value="${r.id}" ${r.id===s?"selected":""}>${r.name||r.email||"موظف"} (${o})</option>`}),i.onchange=function(){this.value&&(M&&M.emit("join_room",this.value),window.startStaffWASession())},i.value&&(M&&M.emit("join_room",i.value),window.startStaffWASession())}typeof io<"u"&&!M&&(fetch(`${n}/ping`).catch(()=>{}),M=io(n,{reconnection:!0,reconnectionAttempts:10,reconnectionDelay:2e3,transports:["polling","websocket"]}),M.on("connect_error",s=>{console.error("Connection Error:",s),s.message!=="websocket error"&&(window._waAlerted||(alert("عذراً، المتصفح لم يستطع الاتصال بخادم الواتساب. تأكد من أن الرابط يعمل في صفحة منفصلة. الخطأ: "+s.message),window._waAlerted=!0))}),M.on("connect",()=>{console.log("Connected to WhatsApp Server!"),window.state.user&&M.emit("join_room",window.state.user.uid),window.state.user&&window.startCurrentWASession&&setTimeout(()=>window.startCurrentWASession(),1500)}),M.on("qr",s=>{const r=document.getElementById("wa-staff-select"),o=document.getElementById("wa-server-status"),a=document.getElementById("wa-qr-container"),l=document.getElementById("wa-qr-canvas");if(r&&r.value===s.userId&&(o&&(o.innerText="في انتظار مسح كود الـ QR...",o.style.color="var(--text-color)"),a&&(a.style.display="block"),typeof QRCode<"u"&&l&&QRCode.toCanvas(l,s.qr,function(c){c&&console.error(c)})),window.state.user&&s.userId===window.state.user.uid){const c=document.getElementById("wa-my-status-title"),u=document.getElementById("wa-my-status-desc"),d=document.getElementById("wa-my-qr-container"),h=document.getElementById("wa-my-qr-canvas"),p=document.getElementById("btn-start-my-wa"),f=document.getElementById("btn-logout-my-wa");c&&(c.innerText="بانتظار مسح رمز QR..."),u&&(u.innerText="افتح واتساب على هاتفك وامسح الرمز الظاهر أدناه ليتم ربط حسابك."),d&&(d.style.display="block"),p&&(p.innerText="تحديث الرمز"),f&&(f.style.display="none"),typeof QRCode<"u"&&h&&QRCode.toCanvas(h,s.qr,{width:250,margin:2},function(g){g&&console.error(g)})}}),M.on("ready",s=>{const r=document.getElementById("wa-staff-select");if(r&&r.value===s.userId){const o=document.getElementById("wa-server-status"),a=document.getElementById("wa-qr-container");o&&(o.innerText=s.msg,o.style.color="#00a884"),a&&(a.style.display="none")}if(window.state.user&&s.userId===window.state.user.uid){const o=document.getElementById("wa-my-status-title"),a=document.getElementById("wa-my-status-desc"),l=document.getElementById("wa-my-qr-container"),c=document.getElementById("btn-start-my-wa"),u=document.getElementById("btn-logout-my-wa");o&&(o.innerText="واتساب متصل بنجاح"),a&&(a.innerText="حسابك الآن مرتبط بالنظام، يمكنك البدء في استقبال وإرسال الرسائل للعملاء."),l&&(l.style.display="none"),c&&(c.style.display="none"),u&&(u.style.display="inline-block"),window.showLuxuryToast("تم ربط حساب واتساب الخاص بك بنجاح","success")}}),M.on("disconnected",s=>{console.log("Disconnected Event:",s);const r=s.msg||"تم قطع الاتصال بالسيرفر. يرجى إعادة الربط لتفعيل خدمات الدردشة.",o=document.getElementById("wa-staff-select");if(o&&o.value===s.userId){const a=document.getElementById("wa-server-status");a&&(a.innerText=r,a.style.color="red")}if(window.state.user&&s.userId===window.state.user.uid){const a=document.getElementById("wa-my-status-title"),l=document.getElementById("wa-my-status-desc"),c=document.getElementById("btn-start-my-wa"),u=document.getElementById("btn-logout-my-wa"),d=document.getElementById("wa-my-qr-container");a&&(a.innerText="الواتساب غير متصل"),l&&(l.innerText=r),d&&(d.style.display="none"),c&&(c.style.display="inline-block",c.innerText="إعادة الربط الآن"),u&&(u.style.display="none")}}),M.on("message",s=>{window._currentWaPhone&&s.from.includes(window._currentWaPhone.replace(/\D/g,""))&&window.fetchServerWAChat(window._currentWaPhone,s.userId)}))};window.startCurrentWASession=function(){if(!window.state.user)return;const t=()=>{M.emit("start_session",{userId:window.state.user.uid});const e=document.getElementById("wa-my-status-title"),n=document.getElementById("wa-my-status-desc");e&&(e.innerText="جاري الاتصال..."),n&&(n.innerText="يتم الآن التواصل مع خادم الواتساب لتوليد رمز الاستجابة السريعة...")};M?M.connected?t():(M.once("connect",t),M.connect()):window.initWhatsAppServer()};window.logoutCurrentWASession=function(){window.state.user&&confirm("هل أنت متأكد من تسجيل الخروج من واتساب؟ لن تتمكن من المراسلة من هنا.")&&M&&M.emit("logout_session",{userId:window.state.user.uid})};window.fetchServerWAChat=async function(t,e){if(!t)return;const n=document.getElementById("wa-server-chat-box");if(!n)return;let i=window.state.userProfile.id;if(window.state.userProfile.role==="admin")if(e)i=e;else{n.innerHTML='<div style="text-align:center; color:gray; font-size:12px; margin-top:20px; padding:20px; background:rgba(255,255,255,0.8); border-radius:10px;">هذا الحجز غير مسند لأي موظف. يرجى إسناد الحجز أولاً لموظف محدد ليتم عرض سجل المحادثات الخاص به.</div>';return}window._currentWaPhone=t,n.innerHTML='<div style="text-align:center; color:gray; font-size:12px; margin-top:20px;">جاري جلب المحادثة من الخادم...</div>';try{const s=window._waServerActiveUrl||Si,r=await fetch(`${s}/api/chat/${i}/${t}`);if(r.ok){const o=await r.json();o.messages&&o.messages.length>0?(n.innerHTML="",o.messages.forEach(a=>{const l=a.timestamp?new Date(a.timestamp*1e3).toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit"}):"";let c=(a.body||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");const u=document.createElement("div");u.style.padding="8px 12px",u.style.maxWidth="80%",u.style.fontSize="14px",u.style.marginBottom="8px",u.style.position="relative",u.style.boxShadow="0 1px 1px rgba(0,0,0,0.1)",u.style.whiteSpace="pre-wrap",a.isMe?(u.style.alignSelf="flex-end",u.style.background="#dcf8c6",u.style.color="#000",u.style.borderRadius="10px 0 10px 10px"):(u.style.alignSelf="flex-start",u.style.background="#fff",u.style.color="#000",u.style.borderRadius="0 10px 10px 10px");let d=`<div>${c}</div>`;a.media&&(a.media.mimetype.startsWith("image/")?d=`<img src="data:${a.media.mimetype};base64,${a.media.data}" style="max-width:100%; border-radius:8px; margin-bottom:5px; cursor:pointer;" onclick="window.viewFullImage(this.src)">`+(c?`<div>${c}</div>`:""):(a.media.mimetype.startsWith("audio/")||a.type==="ptt")&&(d=`<audio controls style="max-width:100%; max-height:35px; margin-top:5px;"><source src="data:${a.media.mimetype};base64,${a.media.data}" type="${a.media.mimetype}"></audio>`+(c?`<div>${c}</div>`:""))),u.innerHTML=`${d} <div style="display:flex; justify-content:flex-end; align-items:center; gap:3px; margin-top:2px;">
                      <span style="font-size:10px; color:rgba(0,0,0,0.45);">${l}</span>
                      ${a.isMe?'<i class="fas fa-check-double" style="font-size:10px; color:#53bdeb;"></i>':""}
                    </div>`,n.appendChild(u)}),setTimeout(()=>{n.scrollTop=n.scrollHeight},100)):n.innerHTML='<div style="text-align:center; color:gray; font-size:12px; margin-top:20px; padding:20px; background:rgba(0,0,0,0.05); border-radius:12px;">لا توجد رسائل سابقة مع هذا الرقم. يمكنك بدء دردشة جديدة الآن.</div>'}else n.innerHTML=`
                <div style="text-align:center; color:var(--text-dim); font-size:14px; margin-top:40px; padding:30px;">
                    <i class="fab fa-whatsapp" style="font-size:50px; margin-bottom:15px; opacity:0.3;"></i>
                    <p>خادم واتساب غير متصل لهذا الموظف</p>
                    <button class="btn-premium btn-sm" style="margin-top:15px;" onclick="window.switchLuxuryTab('whatsapp-mgmt')">اذهب لربط الواتساب</button>
                </div>
            `}catch{n.innerHTML='<div style="text-align:center; color:red; font-size:12px; margin-top:20px;">فشل الاتصال بالخادم. يرجى التأكد من تشغيل السيرفر.</div>'}};window.sendServerWAMessage=async function(t,e){const n=document.getElementById("wa-server-input");if(!n||!n.value.trim())return;let i=window.state.userProfile.id;window.state.userProfile.role==="admin"&&e&&(i=e);const s=n.value.trim();n.value="جاري الإرسال...",n.disabled=!0;try{const r=window._waServerActiveUrl||Si;(await fetch(`${r}/api/send`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:i,phone:t,message:s})})).ok?(n.value="",setTimeout(()=>window.fetchServerWAChat(t,i),500)):(window.showLuxuryToast("الواتساب غير متصل في الإدارة، المرجو فحص الاتصال","error"),n.value=s)}catch{window.showLuxuryToast("الخادم البرمجي مغلق","error"),n.value=s}finally{n.disabled=!1,n.focus()}};document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("click",t=>{const e=t.target.closest(".dash-tab");e&&e.dataset.tab&&window.switchLuxuryTab(e.dataset.tab)}),setTimeout(()=>{window.initWhatsAppServer()},3e3)});
