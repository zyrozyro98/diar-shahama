(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var _o={};/**
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
 */const nl={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const E=function(n,e){if(!n)throw qt(e)},qt=function(n){return new Error("Firebase Database ("+nl.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const il=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},fu=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},hr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(h=64)),i.push(t[d],t[u],t[h],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(il(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):fu(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new pu;const h=r<<2|a>>4;if(i.push(h),c!==64){const f=a<<4&240|c>>2;if(i.push(f),u!==64){const p=c<<6&192|u;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class pu extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const sl=function(n){const e=il(n);return hr.encodeByteArray(e,!0)},ai=function(n){return sl(n).replace(/\./g,"")},li=function(n){try{return hr.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function mu(n){return rl(void 0,n)}function rl(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!gu(t)||(n[t]=rl(n[t],e[t]));return n}function gu(n){return n!=="__proto__"}/**
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
 */function yu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const _u=()=>yu().__FIREBASE_DEFAULTS__,wu=()=>{if(typeof process>"u"||typeof _o>"u")return;const n=_o.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},vu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&li(n[1]);return e&&JSON.parse(e)},fr=()=>{try{return _u()||wu()||vu()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ol=n=>{var e,t;return(t=(e=fr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},al=n=>{const e=ol(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},ll=()=>{var n;return(n=fr())===null||n===void 0?void 0:n.config},cl=n=>{var e;return(e=fr())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Gt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function dl(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ai(JSON.stringify(t)),ai(JSON.stringify(o)),""].join(".")}/**
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
 */function se(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function pr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(se())}function bu(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ul(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function hl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Eu(){const n=se();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Iu(){return nl.NODE_ADMIN===!0}function fl(){try{return typeof indexedDB=="object"}catch{return!1}}function pl(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}function Tu(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const ku="FirebaseError";class ve extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=ku,Object.setPrototypeOf(this,ve.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,yt.prototype.create)}}class yt{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Su(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new ve(s,a,i)}}function Su(n,e){return n.replace(xu,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const xu=/\{\$([^}]+)}/g;/**
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
 */function _n(n){return JSON.parse(n)}function Y(n){return JSON.stringify(n)}/**
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
 */const ml=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=_n(li(r[0])||""),t=_n(li(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Cu=function(n){const e=ml(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Au=function(n){const e=ml(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function be(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function ct(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function $s(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ci(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function wn(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(wo(r)&&wo(o)){if(!wn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function wo(n){return n!==null&&typeof n=="object"}/**
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
 */function Kt(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function ln(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function cn(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
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
 */class Ru{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(s<<5|s>>>27)+c+l+d+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Nu(n,e){const t=new Pu(n,e);return t.subscribe.bind(t)}class Pu{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Lu(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=ds),s.error===void 0&&(s.error=ds),s.complete===void 0&&(s.complete=ds);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Lu(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ds(){}function Fi(n,e){return`${n} failed: ${e} argument `}/**
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
 */const Ou=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,E(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Bi=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */const Du=1e3,Mu=2,$u=4*60*60*1e3,Fu=.5;function vo(n,e=Du,t=Mu){const i=e*Math.pow(t,n),s=Math.round(Fu*i*(Math.random()-.5)*2);return Math.min($u,i+s)}/**
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
 */function q(n){return n&&n._delegate?n._delegate:n}class ue{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const rt="[DEFAULT]";/**
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
 */class Bu{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new Gt;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ju(e))try{this.getOrInitializeService({instanceIdentifier:rt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=rt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rt){return this.instances.has(e)}getOptions(e=rt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Uu(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=rt){return this.component?this.component.multipleInstances?e:rt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Uu(n){return n===rt?void 0:n}function ju(n){return n.instantiationMode==="EAGER"}/**
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
 */class Wu{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Bu(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var M;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(M||(M={}));const zu={debug:M.DEBUG,verbose:M.VERBOSE,info:M.INFO,warn:M.WARN,error:M.ERROR,silent:M.SILENT},Hu=M.INFO,Vu={[M.DEBUG]:"log",[M.VERBOSE]:"log",[M.INFO]:"info",[M.WARN]:"warn",[M.ERROR]:"error"},qu=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Vu[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ui{constructor(e){this.name=e,this._logLevel=Hu,this._logHandler=qu,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in M))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?zu[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,M.DEBUG,...e),this._logHandler(this,M.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,M.VERBOSE,...e),this._logHandler(this,M.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,M.INFO,...e),this._logHandler(this,M.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,M.WARN,...e),this._logHandler(this,M.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,M.ERROR,...e),this._logHandler(this,M.ERROR,...e)}}const Gu=(n,e)=>e.some(t=>n instanceof t);let bo,Eo;function Ku(){return bo||(bo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Yu(){return Eo||(Eo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const gl=new WeakMap,Fs=new WeakMap,yl=new WeakMap,us=new WeakMap,mr=new WeakMap;function Qu(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Ke(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&gl.set(t,n)}).catch(()=>{}),mr.set(e,n),e}function Ju(n){if(Fs.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Fs.set(n,e)}let Bs={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Fs.get(n);if(e==="objectStoreNames")return n.objectStoreNames||yl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ke(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Xu(n){Bs=n(Bs)}function Zu(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(hs(this),e,...t);return yl.set(i,e.sort?e.sort():[e]),Ke(i)}:Yu().includes(n)?function(...e){return n.apply(hs(this),e),Ke(gl.get(this))}:function(...e){return Ke(n.apply(hs(this),e))}}function eh(n){return typeof n=="function"?Zu(n):(n instanceof IDBTransaction&&Ju(n),Gu(n,Ku())?new Proxy(n,Bs):n)}function Ke(n){if(n instanceof IDBRequest)return Qu(n);if(us.has(n))return us.get(n);const e=eh(n);return e!==n&&(us.set(n,e),mr.set(e,n)),e}const hs=n=>mr.get(n);function _l(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=Ke(o);return i&&o.addEventListener("upgradeneeded",l=>{i(Ke(o.result),l.oldVersion,l.newVersion,Ke(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const th=["get","getKey","getAll","getAllKeys","count"],nh=["put","add","delete","clear"],fs=new Map;function Io(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(fs.get(e))return fs.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=nh.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||th.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return fs.set(e,r),r}Xu(n=>({...n,get:(e,t,i)=>Io(e,t)||n.get(e,t,i),has:(e,t)=>!!Io(e,t)||n.has(e,t)}));/**
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
 */class ih{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(sh(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function sh(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Us="@firebase/app",To="0.10.13";/**
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
 */const Me=new Ui("@firebase/app"),rh="@firebase/app-compat",oh="@firebase/analytics-compat",ah="@firebase/analytics",lh="@firebase/app-check-compat",ch="@firebase/app-check",dh="@firebase/auth",uh="@firebase/auth-compat",hh="@firebase/database",fh="@firebase/data-connect",ph="@firebase/database-compat",mh="@firebase/functions",gh="@firebase/functions-compat",yh="@firebase/installations",_h="@firebase/installations-compat",wh="@firebase/messaging",vh="@firebase/messaging-compat",bh="@firebase/performance",Eh="@firebase/performance-compat",Ih="@firebase/remote-config",Th="@firebase/remote-config-compat",kh="@firebase/storage",Sh="@firebase/storage-compat",xh="@firebase/firestore",Ch="@firebase/vertexai-preview",Ah="@firebase/firestore-compat",Rh="firebase",Nh="10.14.1";/**
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
 */const js="[DEFAULT]",Ph={[Us]:"fire-core",[rh]:"fire-core-compat",[ah]:"fire-analytics",[oh]:"fire-analytics-compat",[ch]:"fire-app-check",[lh]:"fire-app-check-compat",[dh]:"fire-auth",[uh]:"fire-auth-compat",[hh]:"fire-rtdb",[fh]:"fire-data-connect",[ph]:"fire-rtdb-compat",[mh]:"fire-fn",[gh]:"fire-fn-compat",[yh]:"fire-iid",[_h]:"fire-iid-compat",[wh]:"fire-fcm",[vh]:"fire-fcm-compat",[bh]:"fire-perf",[Eh]:"fire-perf-compat",[Ih]:"fire-rc",[Th]:"fire-rc-compat",[kh]:"fire-gcs",[Sh]:"fire-gcs-compat",[xh]:"fire-fst",[Ah]:"fire-fst-compat",[Ch]:"fire-vertex","fire-js":"fire-js",[Rh]:"fire-js-all"};/**
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
 */const di=new Map,Lh=new Map,Ws=new Map;function ko(n,e){try{n.container.addComponent(e)}catch(t){Me.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function _e(n){const e=n.name;if(Ws.has(e))return Me.debug(`There were multiple attempts to register component ${e}.`),!1;Ws.set(e,n);for(const t of di.values())ko(t,n);for(const t of Lh.values())ko(t,n);return!0}function nt(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Re(n){return n.settings!==void 0}/**
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
 */const Oh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ye=new yt("app","Firebase",Oh);/**
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
 */class Dh{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new ue("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ye.create("app-deleted",{appName:this._name})}}/**
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
 */const _t=Nh;function wl(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:js,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Ye.create("bad-app-name",{appName:String(s)});if(t||(t=ll()),!t)throw Ye.create("no-options");const r=di.get(s);if(r){if(wn(t,r.options)&&wn(i,r.config))return r;throw Ye.create("duplicate-app",{appName:s})}const o=new Wu(s);for(const l of Ws.values())o.addComponent(l);const a=new Dh(t,i,o);return di.set(s,a),a}function ji(n=js){const e=di.get(n);if(!e&&n===js&&ll())return wl();if(!e)throw Ye.create("no-app",{appName:n});return e}function oe(n,e,t){var i;let s=(i=Ph[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Me.warn(a.join(" "));return}_e(new ue(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Mh="firebase-heartbeat-database",$h=1,vn="firebase-heartbeat-store";let ps=null;function vl(){return ps||(ps=_l(Mh,$h,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(vn)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ye.create("idb-open",{originalErrorMessage:n.message})})),ps}async function Fh(n){try{const t=(await vl()).transaction(vn),i=await t.objectStore(vn).get(bl(n));return await t.done,i}catch(e){if(e instanceof ve)Me.warn(e.message);else{const t=Ye.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Me.warn(t.message)}}}async function So(n,e){try{const i=(await vl()).transaction(vn,"readwrite");await i.objectStore(vn).put(e,bl(n)),await i.done}catch(t){if(t instanceof ve)Me.warn(t.message);else{const i=Ye.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Me.warn(i.message)}}}function bl(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Bh=1024,Uh=30*24*60*60*1e3;class jh{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new zh(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=xo();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=Uh}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Me.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=xo(),{heartbeatsToSend:i,unsentEntries:s}=Wh(this._heartbeatsCache.heartbeats),r=ai(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Me.warn(t),""}}}function xo(){return new Date().toISOString().substring(0,10)}function Wh(n,e=Bh){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Co(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Co(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class zh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return fl()?pl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Fh(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return So(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return So(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Co(n){return ai(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function Hh(n){_e(new ue("platform-logger",e=>new ih(e),"PRIVATE")),_e(new ue("heartbeat",e=>new jh(e),"PRIVATE")),oe(Us,To,n),oe(Us,To,"esm2017"),oe("fire-js","")}Hh("");var Vh="firebase",qh="10.14.1";/**
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
 */oe(Vh,qh,"app");var Ao={};const Ro="@firebase/database",No="1.0.8";/**
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
 */let El="";function Gh(n){El=n}/**
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
 */class Kh{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Y(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:_n(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class Yh{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return be(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const Il=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Kh(e)}}catch{}return new Yh},at=Il("localStorage"),Qh=Il("sessionStorage");/**
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
 */const Nt=new Ui("@firebase/database"),Tl=function(){let n=1;return function(){return n++}}(),kl=function(n){const e=Ou(n),t=new Ru;t.update(e);const i=t.digest();return hr.encodeByteArray(i)},Nn=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Nn.apply(null,i):typeof i=="object"?e+=Y(i):e+=i,e+=" "}return e};let dn=null,Po=!0;const Jh=function(n,e){E(!0,"Can't turn on custom loggers persistently."),Nt.logLevel=M.VERBOSE,dn=Nt.log.bind(Nt)},Z=function(...n){if(Po===!0&&(Po=!1,dn===null&&Qh.get("logging_enabled")===!0&&Jh()),dn){const e=Nn.apply(null,n);dn(e)}},Pn=function(n){return function(...e){Z(n,...e)}},zs=function(...n){const e="FIREBASE INTERNAL ERROR: "+Nn(...n);Nt.error(e)},$e=function(...n){const e=`FIREBASE FATAL ERROR: ${Nn(...n)}`;throw Nt.error(e),new Error(e)},ie=function(...n){const e="FIREBASE WARNING: "+Nn(...n);Nt.warn(e)},Xh=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ie("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},gr=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Zh=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},$t="[MIN_NAME]",dt="[MAX_NAME]",wt=function(n,e){if(n===e)return 0;if(n===$t||e===dt)return-1;if(e===$t||n===dt)return 1;{const t=Lo(n),i=Lo(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},ef=function(n,e){return n===e?0:n<e?-1:1},nn=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+Y(e))},yr=function(n){if(typeof n!="object"||n===null)return Y(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=Y(e[i]),t+=":",t+=yr(n[e[i]]);return t+="}",t},Sl=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function ee(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const xl=function(n){E(!gr(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},tf=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},nf=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function sf(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const rf=new RegExp("^-?(0*)\\d{1,10}$"),of=-2147483648,af=2147483647,Lo=function(n){if(rf.test(n)){const e=Number(n);if(e>=of&&e<=af)return e}return null},Yt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw ie("Exception was thrown by user callback.",t),e},Math.floor(0))}},lf=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},un=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class cf{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){ie(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class df{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Z("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ie(e)}}class ei{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}ei.OWNER="owner";/**
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
 */const _r="5",Cl="v",Al="s",Rl="r",Nl="f",Pl=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Ll="ls",Ol="p",Hs="ac",Dl="websocket",Ml="long_polling";/**
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
 */class $l{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=at.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&at.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function uf(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Fl(n,e,t){E(typeof e=="string","typeof type must == string"),E(typeof t=="object","typeof params must == object");let i;if(e===Dl)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Ml)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);uf(n)&&(t.ns=n.namespace);const s=[];return ee(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
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
 */class hf{constructor(){this.counters_={}}incrementCounter(e,t=1){be(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return mu(this.counters_)}}/**
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
 */const ms={},gs={};function wr(n){const e=n.toString();return ms[e]||(ms[e]=new hf),ms[e]}function ff(n,e){const t=n.toString();return gs[t]||(gs[t]=e()),gs[t]}/**
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
 */class pf{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Yt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Oo="start",mf="close",gf="pLPCommand",yf="pRTLPCB",Bl="id",Ul="pw",jl="ser",_f="cb",wf="seg",vf="ts",bf="d",Ef="dframe",Wl=1870,zl=30,If=Wl-zl,Tf=25e3,kf=3e4;class At{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Pn(e),this.stats_=wr(t),this.urlFn=l=>(this.appCheckToken&&(l[Hs]=this.appCheckToken),Fl(t,Ml,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new pf(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(kf)),Zh(()=>{if(this.isClosed_)return;this.scriptTagHolder=new vr((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Oo)this.id=a,this.password=l;else if(o===mf)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Oo]="t",i[jl]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[_f]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Cl]=_r,this.transportSessionId&&(i[Al]=this.transportSessionId),this.lastSessionId&&(i[Ll]=this.lastSessionId),this.applicationId&&(i[Ol]=this.applicationId),this.appCheckToken&&(i[Hs]=this.appCheckToken),typeof location<"u"&&location.hostname&&Pl.test(location.hostname)&&(i[Rl]=Nl);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){At.forceAllow_=!0}static forceDisallow(){At.forceDisallow_=!0}static isAvailable(){return At.forceAllow_?!0:!At.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!tf()&&!nf()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Y(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=sl(t),s=Sl(i,If);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Ef]="t",i[Bl]=e,i[Ul]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Y(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class vr{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Tl(),window[gf+this.uniqueCallbackIdentifier]=e,window[yf+this.uniqueCallbackIdentifier]=t,this.myIFrame=vr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Z("frame writing exception"),a.stack&&Z(a.stack),Z(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Z("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Bl]=this.myID,e[Ul]=this.myPW,e[jl]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+zl+i.length<=Wl;){const o=this.pendingSegs.shift();i=i+"&"+wf+s+"="+o.seg+"&"+vf+s+"="+o.ts+"&"+bf+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Tf)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{Z("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
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
 */const Sf=16384,xf=45e3;let ui=null;typeof MozWebSocket<"u"?ui=MozWebSocket:typeof WebSocket<"u"&&(ui=WebSocket);class pe{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Pn(this.connId),this.stats_=wr(t),this.connURL=pe.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[Cl]=_r,typeof location<"u"&&location.hostname&&Pl.test(location.hostname)&&(o[Rl]=Nl),t&&(o[Al]=t),i&&(o[Ll]=i),s&&(o[Hs]=s),r&&(o[Ol]=r),Fl(e,Dl,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,at.set("previous_websocket_failure",!0);try{let i;Iu(),this.mySock=new ui(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){pe.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&ui!==null&&!pe.forceDisallow_}static previouslyFailed(){return at.isInMemoryStorage||at.get("previous_websocket_failure")===!0}markConnectionHealthy(){at.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=_n(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(E(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=Y(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Sl(t,Sf);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(xf))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}pe.responsesRequiredToBeHealthy=2;pe.healthyTimeout=3e4;/**
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
 */class bn{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[At,pe]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=pe&&pe.isAvailable();let i=t&&!pe.previouslyFailed();if(e.webSocketOnly&&(t||ie("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[pe];else{const s=this.transports_=[];for(const r of bn.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);bn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}bn.globalTransportInitialized_=!1;/**
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
 */const Cf=6e4,Af=5e3,Rf=10*1024,Nf=100*1024,ys="t",Do="d",Pf="s",Mo="r",Lf="e",$o="o",Fo="a",Bo="n",Uo="p",Of="h";class Df{constructor(e,t,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Pn("c:"+this.id+":"),this.transportManager_=new bn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=un(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Nf?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Rf?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ys in e){const t=e[ys];t===Fo?this.upgradeIfSecondaryHealthy_():t===Mo?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===$o&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=nn("t",e),i=nn("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Uo,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Fo,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Bo,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=nn("t",e),i=nn("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=nn(ys,e);if(Do in e){const i=e[Do];if(t===Of){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Bo){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Pf?this.onConnectionShutdown_(i):t===Mo?this.onReset_(i):t===Lf?zs("Server Error: "+i):t===$o?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):zs("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),_r!==i&&ie("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),un(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Cf))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):un(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Af))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Uo,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(at.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class Hl{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class Vl{constructor(e){this.allowedEvents_=e,this.listeners_={},E(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){E(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class hi extends Vl{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!pr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new hi}getInitialEvent(e){return E(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const jo=32,Wo=768;class ${constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function D(){return new $("")}function N(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Ze(n){return n.pieces_.length-n.pieceNum_}function B(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new $(n.pieces_,e)}function br(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Mf(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function En(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function ql(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new $(e,0)}function V(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof $)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new $(t,0)}function L(n){return n.pieceNum_>=n.pieces_.length}function ne(n,e){const t=N(n),i=N(e);if(t===null)return e;if(t===i)return ne(B(n),B(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function $f(n,e){const t=En(n,0),i=En(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=wt(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Er(n,e){if(Ze(n)!==Ze(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function de(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Ze(n)>Ze(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Ff{constructor(e,t){this.errorPrefix_=t,this.parts_=En(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Bi(this.parts_[i]);Gl(this)}}function Bf(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Bi(e),Gl(n)}function Uf(n){const e=n.parts_.pop();n.byteLength_-=Bi(e),n.parts_.length>0&&(n.byteLength_-=1)}function Gl(n){if(n.byteLength_>Wo)throw new Error(n.errorPrefix_+"has a key path longer than "+Wo+" bytes ("+n.byteLength_+").");if(n.parts_.length>jo)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+jo+") or object contains a cycle "+ot(n))}function ot(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class Ir extends Vl{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new Ir}getInitialEvent(e){return E(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const sn=1e3,jf=60*5*1e3,zo=30*1e3,Wf=1.3,zf=3e4,Hf="server_kill",Ho=3;class De extends Hl{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=De.nextPersistentConnectionId_++,this.log_=Pn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=sn,this.maxReconnectDelay_=jf,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ir.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&hi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(Y(r)),E(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new Gt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),E(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),E(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;De.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&be(e,"w")){const i=ct(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();ie(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Au(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=zo)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Cu(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),E(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Y(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):zs("Unrecognized action received from server: "+Y(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){E(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=sn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=sn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>zf&&(this.reconnectDelay_=sn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Wf)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+De.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){E(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?Z("getToken() completed but was canceled"):(Z("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new Df(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{ie(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Hf)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&ie(u),l())}}}interrupt(e){Z("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Z("Resuming connection for reason: "+e),delete this.interruptReasons_[e],$s(this.interruptReasons_)&&(this.reconnectDelay_=sn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>yr(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new $(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){Z("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ho&&(this.reconnectDelay_=zo,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Z("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ho&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+El.replace(/\./g,"-")]=1,pr()?e["framework.cordova"]=1:hl()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=hi.getInstance().currentlyOnline();return $s(this.interruptReasons_)&&e}}De.nextPersistentConnectionId_=0;De.nextConnectionId_=0;/**
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
 */class P{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new P(e,t)}}/**
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
 */class Wi{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new P($t,e),s=new P($t,t);return this.compare(i,s)!==0}minPost(){return P.MIN}}/**
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
 */let Gn;class Kl extends Wi{static get __EMPTY_NODE(){return Gn}static set __EMPTY_NODE(e){Gn=e}compare(e,t){return wt(e.name,t.name)}isDefinedOn(e){throw qt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return P.MIN}maxPost(){return new P(dt,Gn)}makePost(e,t){return E(typeof e=="string","KeyIndex indexValue must always be a string."),new P(e,Gn)}toString(){return".key"}}const Pt=new Kl;/**
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
 */class Kn{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class J{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??J.RED,this.left=s??re.EMPTY_NODE,this.right=r??re.EMPTY_NODE}copy(e,t,i,s,r){return new J(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return re.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return re.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,J.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,J.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}J.RED=!0;J.BLACK=!1;class Vf{copy(e,t,i,s,r){return this}insert(e,t,i){return new J(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class re{constructor(e,t=re.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new re(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,J.BLACK,null,null))}remove(e){return new re(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,J.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Kn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Kn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Kn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Kn(this.root_,null,this.comparator_,!0,e)}}re.EMPTY_NODE=new Vf;/**
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
 */function qf(n,e){return wt(n.name,e.name)}function Tr(n,e){return wt(n,e)}/**
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
 */let Vs;function Gf(n){Vs=n}const Yl=function(n){return typeof n=="number"?"number:"+xl(n):"string:"+n},Ql=function(n){if(n.isLeafNode()){const e=n.val();E(typeof e=="string"||typeof e=="number"||typeof e=="object"&&be(e,".sv"),"Priority must be a string or number.")}else E(n===Vs||n.isEmpty(),"priority of unexpected type.");E(n===Vs||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Vo;class Q{constructor(e,t=Q.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,E(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Ql(this.priorityNode_)}static set __childrenNodeConstructor(e){Vo=e}static get __childrenNodeConstructor(){return Vo}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Q(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Q.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return L(e)?this:N(e)===".priority"?this.priorityNode_:Q.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Q.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=N(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(E(i!==".priority"||Ze(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,Q.__childrenNodeConstructor.EMPTY_NODE.updateChild(B(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Yl(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=xl(this.value_):e+=this.value_,this.lazyHash_=kl(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Q.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Q.__childrenNodeConstructor?-1:(E(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=Q.VALUE_TYPE_ORDER.indexOf(t),r=Q.VALUE_TYPE_ORDER.indexOf(i);return E(s>=0,"Unknown leaf type: "+t),E(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Q.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Jl,Xl;function Kf(n){Jl=n}function Yf(n){Xl=n}class Qf extends Wi{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?wt(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return P.MIN}maxPost(){return new P(dt,new Q("[PRIORITY-POST]",Xl))}makePost(e,t){const i=Jl(e);return new P(t,new Q("[PRIORITY-POST]",i))}toString(){return".priority"}}const j=new Qf;/**
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
 */const Jf=Math.log(2);class Xf{constructor(e){const t=r=>parseInt(Math.log(r)/Jf,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const fi=function(n,e,t,i){n.sort(e);const s=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new J(h,u.node,J.BLACK,null,null);{const f=parseInt(d/2,10)+l,p=s(l,f),_=s(f+1,c);return u=n[f],h=t?t(u):u,new J(h,u.node,J.BLACK,p,_)}},r=function(l){let c=null,d=null,u=n.length;const h=function(p,_){const b=u-p,g=u;u-=p;const m=s(b+1,g),w=n[b],v=t?t(w):w;f(new J(v,w.node,_,null,m))},f=function(p){c?(c.left=p,c=p):(d=p,c=p)};for(let p=0;p<l.count;++p){const _=l.nextBitIsOne(),b=Math.pow(2,l.count-(p+1));_?h(b,J.BLACK):(h(b,J.BLACK),h(b,J.RED))}return d},o=new Xf(n.length),a=r(o);return new re(i||e,a)};/**
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
 */let _s;const Ct={};class Ne{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return E(Ct&&j,"ChildrenNode.ts has not been loaded"),_s=_s||new Ne({".priority":Ct},{".priority":j}),_s}get(e){const t=ct(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof re?t:null}hasIndex(e){return be(this.indexSet_,e.toString())}addIndex(e,t){E(e!==Pt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(P.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=fi(i,e.getCompare()):a=Ct;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const d=Object.assign({},this.indexes_);return d[l]=a,new Ne(d,c)}addToIndexes(e,t){const i=ci(this.indexes_,(s,r)=>{const o=ct(this.indexSet_,r);if(E(o,"Missing index implementation for "+r),s===Ct)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(P.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),fi(a,o.getCompare())}else return Ct;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new P(e.name,a))),l.insert(e,e.node)}});return new Ne(i,this.indexSet_)}removeFromIndexes(e,t){const i=ci(this.indexes_,s=>{if(s===Ct)return s;{const r=t.get(e.name);return r?s.remove(new P(e.name,r)):s}});return new Ne(i,this.indexSet_)}}/**
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
 */let rn;class S{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Ql(this.priorityNode_),this.children_.isEmpty()&&E(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return rn||(rn=new S(new re(Tr),null,Ne.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||rn}updatePriority(e){return this.children_.isEmpty()?this:new S(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?rn:t}}getChild(e){const t=N(e);return t===null?this:this.getImmediateChild(t).getChild(B(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(E(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new P(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?rn:this.priorityNode_;return new S(s,o,r)}}updateChild(e,t){const i=N(e);if(i===null)return t;{E(N(e)!==".priority"||Ze(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(B(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(j,(o,a)=>{t[o]=a.val(e),i++,r&&S.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Yl(this.getPriority().val())+":"),this.forEachChild(j,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":kl(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new P(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new P(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new P(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,P.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,P.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Ln?-1:0}withIndex(e){if(e===Pt||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new S(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Pt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(j),s=t.getIterator(j);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Pt?null:this.indexMap_.get(e.toString())}}S.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Zf extends S{constructor(){super(new re(Tr),S.EMPTY_NODE,Ne.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return S.EMPTY_NODE}isEmpty(){return!1}}const Ln=new Zf;Object.defineProperties(P,{MIN:{value:new P($t,S.EMPTY_NODE)},MAX:{value:new P(dt,Ln)}});Kl.__EMPTY_NODE=S.EMPTY_NODE;Q.__childrenNodeConstructor=S;Gf(Ln);Yf(Ln);/**
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
 */const ep=!0;function G(n,e=null){if(n===null)return S.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),E(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new Q(t,G(e))}if(!(n instanceof Array)&&ep){const t=[];let i=!1;if(ee(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=G(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new P(o,l)))}}),t.length===0)return S.EMPTY_NODE;const r=fi(t,qf,o=>o.name,Tr);if(i){const o=fi(t,j.getCompare());return new S(r,G(e),new Ne({".priority":o},{".priority":j}))}else return new S(r,G(e),Ne.Default)}else{let t=S.EMPTY_NODE;return ee(n,(i,s)=>{if(be(n,i)&&i.substring(0,1)!=="."){const r=G(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(G(e))}}Kf(G);/**
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
 */class tp extends Wi{constructor(e){super(),this.indexPath_=e,E(!L(e)&&N(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?wt(e.name,t.name):r}makePost(e,t){const i=G(e),s=S.EMPTY_NODE.updateChild(this.indexPath_,i);return new P(t,s)}maxPost(){const e=S.EMPTY_NODE.updateChild(this.indexPath_,Ln);return new P(dt,e)}toString(){return En(this.indexPath_,0).join("/")}}/**
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
 */class np extends Wi{compare(e,t){const i=e.node.compareTo(t.node);return i===0?wt(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return P.MIN}maxPost(){return P.MAX}makePost(e,t){const i=G(e);return new P(t,i)}toString(){return".value"}}const ip=new np;/**
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
 */function Zl(n){return{type:"value",snapshotNode:n}}function Ft(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function In(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Tn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function sp(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class kr{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){E(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(In(t,a)):E(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Ft(t,i)):o.trackChildChange(Tn(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(j,(s,r)=>{t.hasChild(s)||i.trackChildChange(In(s,r))}),t.isLeafNode()||t.forEachChild(j,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Tn(s,r,o))}else i.trackChildChange(Ft(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?S.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class kn{constructor(e){this.indexedFilter_=new kr(e.getIndex()),this.index_=e.getIndex(),this.startPost_=kn.getStartPost_(e),this.endPost_=kn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new P(t,i))||(i=S.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=S.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(S.EMPTY_NODE);const r=this;return t.forEachChild(j,(o,a)=>{r.matches(new P(o,a))||(s=s.updateImmediateChild(o,S.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class rp{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new kn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new P(t,i))||(i=S.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=S.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=S.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(S.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,S.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,f)=>u(f,h)}else o=this.index_.getCompare();const a=e;E(a.numChildren()===this.limit_,"");const l=new P(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,l);if(d&&!i.isEmpty()&&f>=0)return r!=null&&r.trackChildChange(Tn(t,i,u)),a.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(In(t,u));const _=a.updateImmediateChild(t,S.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r!=null&&r.trackChildChange(Ft(h.name,h.node)),_.updateImmediateChild(h.name,h.node)):_}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(In(c.name,c.node)),r.trackChildChange(Ft(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,S.EMPTY_NODE)):e}}/**
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
 */class Sr{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=j}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return E(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return E(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:$t}hasEnd(){return this.endSet_}getIndexEndValue(){return E(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return E(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:dt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return E(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===j}copy(){const e=new Sr;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function op(n){return n.loadsAllData()?new kr(n.getIndex()):n.hasLimit()?new rp(n):new kn(n)}function qo(n){const e={};if(n.isDefault())return e;let t;if(n.index_===j?t="$priority":n.index_===ip?t="$value":n.index_===Pt?t="$key":(E(n.index_ instanceof tp,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=Y(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=Y(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+Y(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=Y(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+Y(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Go(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==j&&(e.i=n.index_.toString()),e}/**
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
 */class pi extends Hl{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Pn("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(E(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=pi.getListenId_(e,i),a={};this.listens_[o]=a;const l=qo(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),ct(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,t){const i=pi.getListenId_(e,t);delete this.listens_[i]}get(e){const t=qo(e._queryParams),i=e._path.toString(),s=new Gt;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Kt(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=_n(a.responseText)}catch{ie("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&ie("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class ap{constructor(){this.rootNode_=S.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function mi(){return{value:null,children:new Map}}function ec(n,e,t){if(L(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=N(e);n.children.has(i)||n.children.set(i,mi());const s=n.children.get(i);e=B(e),ec(s,e,t)}}function qs(n,e,t){n.value!==null?t(e,n.value):lp(n,(i,s)=>{const r=new $(e.toString()+"/"+i);qs(s,r,t)})}function lp(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
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
 */class cp{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&ee(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
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
 */const Ko=10*1e3,dp=30*1e3,up=5*60*1e3;class hp{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new cp(e);const i=Ko+(dp-Ko)*Math.random();un(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;ee(e,(s,r)=>{r>0&&be(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),un(this.reportStats_.bind(this),Math.floor(Math.random()*2*up))}}/**
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
 */var me;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(me||(me={}));function xr(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Cr(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ar(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class gi{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=me.ACK_USER_WRITE,this.source=xr()}operationForChild(e){if(L(this.path)){if(this.affectedTree.value!=null)return E(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new $(e));return new gi(D(),t,this.revert)}}else return E(N(this.path)===e,"operationForChild called for unrelated child."),new gi(B(this.path),this.affectedTree,this.revert)}}/**
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
 */class Sn{constructor(e,t){this.source=e,this.path=t,this.type=me.LISTEN_COMPLETE}operationForChild(e){return L(this.path)?new Sn(this.source,D()):new Sn(this.source,B(this.path))}}/**
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
 */class ut{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=me.OVERWRITE}operationForChild(e){return L(this.path)?new ut(this.source,D(),this.snap.getImmediateChild(e)):new ut(this.source,B(this.path),this.snap)}}/**
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
 */class Bt{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=me.MERGE}operationForChild(e){if(L(this.path)){const t=this.children.subtree(new $(e));return t.isEmpty()?null:t.value?new ut(this.source,D(),t.value):new Bt(this.source,D(),t)}else return E(N(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Bt(this.source,B(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class et{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(L(e))return this.isFullyInitialized()&&!this.filtered_;const t=N(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class fp{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function pp(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(sp(o.childName,o.snapshotNode))}),on(n,s,"child_removed",e,i,t),on(n,s,"child_added",e,i,t),on(n,s,"child_moved",r,i,t),on(n,s,"child_changed",e,i,t),on(n,s,"value",e,i,t),s}function on(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>gp(n,a,l)),o.forEach(a=>{const l=mp(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function mp(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function gp(n,e,t){if(e.childName==null||t.childName==null)throw qt("Should only compare child_ events.");const i=new P(e.childName,e.snapshotNode),s=new P(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
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
 */function zi(n,e){return{eventCache:n,serverCache:e}}function hn(n,e,t,i){return zi(new et(e,t,i),n.serverCache)}function tc(n,e,t,i){return zi(n.eventCache,new et(e,t,i))}function yi(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function ht(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let ws;const yp=()=>(ws||(ws=new re(ef)),ws);class F{constructor(e,t=yp()){this.value=e,this.children=t}static fromObject(e){let t=new F(null);return ee(e,(i,s)=>{t=t.set(new $(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:D(),value:this.value};if(L(e))return null;{const i=N(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(B(e),t);return r!=null?{path:V(new $(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(L(e))return this;{const t=N(e),i=this.children.get(t);return i!==null?i.subtree(B(e)):new F(null)}}set(e,t){if(L(e))return new F(t,this.children);{const i=N(e),r=(this.children.get(i)||new F(null)).set(B(e),t),o=this.children.insert(i,r);return new F(this.value,o)}}remove(e){if(L(e))return this.children.isEmpty()?new F(null):new F(null,this.children);{const t=N(e),i=this.children.get(t);if(i){const s=i.remove(B(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new F(null):new F(this.value,r)}else return this}}get(e){if(L(e))return this.value;{const t=N(e),i=this.children.get(t);return i?i.get(B(e)):null}}setTree(e,t){if(L(e))return t;{const i=N(e),r=(this.children.get(i)||new F(null)).setTree(B(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new F(this.value,o)}}fold(e){return this.fold_(D(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(V(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,D(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(L(e))return null;{const r=N(e),o=this.children.get(r);return o?o.findOnPath_(B(e),V(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,D(),t)}foreachOnPath_(e,t,i){if(L(e))return this;{this.value&&i(t,this.value);const s=N(e),r=this.children.get(s);return r?r.foreachOnPath_(B(e),V(t,s),i):new F(null)}}foreach(e){this.foreach_(D(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(V(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
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
 */class ye{constructor(e){this.writeTree_=e}static empty(){return new ye(new F(null))}}function fn(n,e,t){if(L(e))return new ye(new F(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=ne(s,e);return r=r.updateChild(o,t),new ye(n.writeTree_.set(s,r))}else{const s=new F(t),r=n.writeTree_.setTree(e,s);return new ye(r)}}}function Gs(n,e,t){let i=n;return ee(t,(s,r)=>{i=fn(i,V(e,s),r)}),i}function Yo(n,e){if(L(e))return ye.empty();{const t=n.writeTree_.setTree(e,new F(null));return new ye(t)}}function Ks(n,e){return vt(n,e)!=null}function vt(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(ne(t.path,e)):null}function Qo(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(j,(i,s)=>{e.push(new P(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new P(i,s.value))}),e}function Qe(n,e){if(L(e))return n;{const t=vt(n,e);return t!=null?new ye(new F(t)):new ye(n.writeTree_.subtree(e))}}function Ys(n){return n.writeTree_.isEmpty()}function Ut(n,e){return nc(D(),n.writeTree_,e)}function nc(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(E(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=nc(V(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(V(n,".priority"),i)),t}}/**
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
 */function Hi(n,e){return oc(e,n)}function _p(n,e,t,i,s){E(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=fn(n.visibleWrites,e,t)),n.lastWriteId=i}function wp(n,e,t,i){E(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Gs(n.visibleWrites,e,t),n.lastWriteId=i}function vp(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function bp(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);E(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Ep(a,i.path)?s=!1:de(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Ip(n),!0;if(i.snap)n.visibleWrites=Yo(n.visibleWrites,i.path);else{const a=i.children;ee(a,l=>{n.visibleWrites=Yo(n.visibleWrites,V(i.path,l))})}return!0}else return!1}function Ep(n,e){if(n.snap)return de(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&de(V(n.path,t),e))return!0;return!1}function Ip(n){n.visibleWrites=ic(n.allWrites,Tp,D()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Tp(n){return n.visible}function ic(n,e,t){let i=ye.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)de(t,o)?(a=ne(t,o),i=fn(i,a,r.snap)):de(o,t)&&(a=ne(o,t),i=fn(i,D(),r.snap.getChild(a)));else if(r.children){if(de(t,o))a=ne(t,o),i=Gs(i,a,r.children);else if(de(o,t))if(a=ne(o,t),L(a))i=Gs(i,D(),r.children);else{const l=ct(r.children,N(a));if(l){const c=l.getChild(B(a));i=fn(i,D(),c)}}}else throw qt("WriteRecord should have .snap or .children")}}return i}function sc(n,e,t,i,s){if(!i&&!s){const r=vt(n.visibleWrites,e);if(r!=null)return r;{const o=Qe(n.visibleWrites,e);if(Ys(o))return t;if(t==null&&!Ks(o,D()))return null;{const a=t||S.EMPTY_NODE;return Ut(o,a)}}}else{const r=Qe(n.visibleWrites,e);if(!s&&Ys(r))return t;if(!s&&t==null&&!Ks(r,D()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(de(c.path,e)||de(e,c.path))},a=ic(n.allWrites,o,e),l=t||S.EMPTY_NODE;return Ut(a,l)}}}function kp(n,e,t){let i=S.EMPTY_NODE;const s=vt(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(j,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Qe(n.visibleWrites,e);return t.forEachChild(j,(o,a)=>{const l=Ut(Qe(r,new $(o)),a);i=i.updateImmediateChild(o,l)}),Qo(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Qe(n.visibleWrites,e);return Qo(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Sp(n,e,t,i,s){E(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=V(e,t);if(Ks(n.visibleWrites,r))return null;{const o=Qe(n.visibleWrites,r);return Ys(o)?s.getChild(t):Ut(o,s.getChild(t))}}function xp(n,e,t,i){const s=V(e,t),r=vt(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Qe(n.visibleWrites,s);return Ut(o,i.getNode().getImmediateChild(t))}else return null}function Cp(n,e){return vt(n.visibleWrites,e)}function Ap(n,e,t,i,s,r,o){let a;const l=Qe(n.visibleWrites,e),c=vt(l,D());if(c!=null)a=c;else if(t!=null)a=Ut(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&d.length<s;)u(f,i)!==0&&d.push(f),f=h.getNext();return d}else return[]}function Rp(){return{visibleWrites:ye.empty(),allWrites:[],lastWriteId:-1}}function _i(n,e,t,i){return sc(n.writeTree,n.treePath,e,t,i)}function Rr(n,e){return kp(n.writeTree,n.treePath,e)}function Jo(n,e,t,i){return Sp(n.writeTree,n.treePath,e,t,i)}function wi(n,e){return Cp(n.writeTree,V(n.treePath,e))}function Np(n,e,t,i,s,r){return Ap(n.writeTree,n.treePath,e,t,i,s,r)}function Nr(n,e,t){return xp(n.writeTree,n.treePath,e,t)}function rc(n,e){return oc(V(n.treePath,e),n.writeTree)}function oc(n,e){return{treePath:n,writeTree:e}}/**
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
 */class Pp{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;E(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),E(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Tn(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,In(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Ft(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Tn(i,e.snapshotNode,s.oldSnap));else throw qt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class Lp{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const ac=new Lp;class Pr{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new et(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Nr(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ht(this.viewCache_),r=Np(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
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
 */function Op(n){return{filter:n}}function Dp(n,e){E(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),E(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Mp(n,e,t,i,s){const r=new Pp;let o,a;if(t.type===me.OVERWRITE){const c=t;c.source.fromUser?o=Qs(n,e,c.path,c.snap,i,s,r):(E(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!L(c.path),o=vi(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===me.MERGE){const c=t;c.source.fromUser?o=Fp(n,e,c.path,c.children,i,s,r):(E(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Js(n,e,c.path,c.children,i,s,a,r))}else if(t.type===me.ACK_USER_WRITE){const c=t;c.revert?o=jp(n,e,c.path,i,s,r):o=Bp(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===me.LISTEN_COMPLETE)o=Up(n,e,t.path,i,r);else throw qt("Unknown operation type: "+t.type);const l=r.getChanges();return $p(e,o,l),{viewCache:o,changes:l}}function $p(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=yi(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Zl(yi(e)))}}function lc(n,e,t,i,s,r){const o=e.eventCache;if(wi(i,t)!=null)return e;{let a,l;if(L(t))if(E(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=ht(e),d=c instanceof S?c:S.EMPTY_NODE,u=Rr(i,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=_i(i,ht(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=N(t);if(c===".priority"){E(Ze(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=Jo(i,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=B(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=Jo(i,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=Nr(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,s,r):a=o.getNode()}}return hn(e,a,o.isFullyInitialized()||L(t),n.filter.filtersNodes())}}function vi(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(L(t))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(t,i);c=d.updateFullNode(l.getNode(),f,null)}else{const f=N(t);if(!l.isCompleteForPath(t)&&Ze(t)>1)return e;const p=B(t),b=l.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?c=d.updatePriority(l.getNode(),b):c=d.updateChild(l.getNode(),f,b,p,ac,null)}const u=tc(e,c,l.isFullyInitialized()||L(t),d.filtersNodes()),h=new Pr(s,u,r);return lc(n,u,t,s,h,a)}function Qs(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const d=new Pr(s,e,r);if(L(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=hn(e,c,!0,n.filter.filtersNodes());else{const u=N(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=hn(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=B(t),f=a.getNode().getImmediateChild(u);let p;if(L(h))p=i;else{const _=d.getCompleteChild(u);_!=null?br(h)===".priority"&&_.getChild(ql(h)).isEmpty()?p=_:p=_.updateChild(h,i):p=S.EMPTY_NODE}if(f.equals(p))l=e;else{const _=n.filter.updateChild(a.getNode(),u,p,h,d,o);l=hn(e,_,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Xo(n,e){return n.eventCache.isCompleteForChild(e)}function Fp(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=V(t,l);Xo(e,N(d))&&(a=Qs(n,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=V(t,l);Xo(e,N(d))||(a=Qs(n,a,d,c,s,r,o))}),a}function Zo(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Js(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;L(t)?c=i:c=new F(null).setTree(t,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const f=e.serverCache.getNode().getImmediateChild(u),p=Zo(n,f,h);l=vi(n,l,new $(u),p,s,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const f=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!f){const p=e.serverCache.getNode().getImmediateChild(u),_=Zo(n,p,h);l=vi(n,l,new $(u),_,s,r,o,a)}}),l}function Bp(n,e,t,i,s,r,o){if(wi(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(L(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return vi(n,e,t,l.getNode().getChild(t),s,r,a,o);if(L(t)){let c=new F(null);return l.getNode().forEachChild(Pt,(d,u)=>{c=c.set(new $(d),u)}),Js(n,e,t,c,s,r,a,o)}else return e}else{let c=new F(null);return i.foreach((d,u)=>{const h=V(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),Js(n,e,t,c,s,r,a,o)}}function Up(n,e,t,i,s){const r=e.serverCache,o=tc(e,r.getNode(),r.isFullyInitialized()||L(t),r.isFiltered());return lc(n,o,t,i,ac,s)}function jp(n,e,t,i,s,r){let o;if(wi(i,t)!=null)return e;{const a=new Pr(i,e,s),l=e.eventCache.getNode();let c;if(L(t)||N(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=_i(i,ht(e));else{const u=e.serverCache.getNode();E(u instanceof S,"serverChildren would be complete if leaf node"),d=Rr(i,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=N(t);let u=Nr(i,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,B(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,S.EMPTY_NODE,B(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=_i(i,ht(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||wi(i,D())!=null,hn(e,c,o,n.filter.filtersNodes())}}/**
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
 */class Wp{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new kr(i.getIndex()),r=op(i);this.processor_=Op(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(S.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(S.EMPTY_NODE,a.getNode(),null),d=new et(l,o.isFullyInitialized(),s.filtersNodes()),u=new et(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=zi(u,d),this.eventGenerator_=new fp(this.query_)}get query(){return this.query_}}function zp(n){return n.viewCache_.serverCache.getNode()}function Hp(n){return yi(n.viewCache_)}function Vp(n,e){const t=ht(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!L(e)&&!t.getImmediateChild(N(e)).isEmpty())?t.getChild(e):null}function ea(n){return n.eventRegistrations_.length===0}function qp(n,e){n.eventRegistrations_.push(e)}function ta(n,e,t){const i=[];if(t){E(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function na(n,e,t,i){e.type===me.MERGE&&e.source.queryId!==null&&(E(ht(n.viewCache_),"We should always have a full cache before handling merges"),E(yi(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=Mp(n.processor_,s,e,t,i);return Dp(n.processor_,r.viewCache),E(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,cc(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Gp(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(j,(r,o)=>{i.push(Ft(r,o))}),t.isFullyInitialized()&&i.push(Zl(t.getNode())),cc(n,i,t.getNode(),e)}function cc(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return pp(n.eventGenerator_,e,t,s)}/**
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
 */let bi;class dc{constructor(){this.views=new Map}}function Kp(n){E(!bi,"__referenceConstructor has already been defined"),bi=n}function Yp(){return E(bi,"Reference.ts has not been loaded"),bi}function Qp(n){return n.views.size===0}function Lr(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return E(r!=null,"SyncTree gave us an op for an invalid query."),na(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(na(o,e,t,i));return r}}function uc(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=_i(t,s?i:null),l=!1;a?l=!0:i instanceof S?(a=Rr(t,i),l=!1):(a=S.EMPTY_NODE,l=!1);const c=zi(new et(a,l,!1),new et(i,s,!1));return new Wp(e,c)}return o}function Jp(n,e,t,i,s,r){const o=uc(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),qp(o,t),Gp(o,t)}function Xp(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=tt(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(ta(c,t,i)),ea(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(ta(l,t,i)),ea(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!tt(n)&&r.push(new(Yp())(e._repo,e._path)),{removed:r,events:o}}function hc(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Je(n,e){let t=null;for(const i of n.views.values())t=t||Vp(i,e);return t}function fc(n,e){if(e._queryParams.loadsAllData())return Vi(n);{const i=e._queryIdentifier;return n.views.get(i)}}function pc(n,e){return fc(n,e)!=null}function tt(n){return Vi(n)!=null}function Vi(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Ei;function Zp(n){E(!Ei,"__referenceConstructor has already been defined"),Ei=n}function em(){return E(Ei,"Reference.ts has not been loaded"),Ei}let tm=1;class ia{constructor(e){this.listenProvider_=e,this.syncPointTree_=new F(null),this.pendingWriteTree_=Rp(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Or(n,e,t,i,s){return _p(n.pendingWriteTree_,e,t,i,s),s?Qt(n,new ut(xr(),e,t)):[]}function nm(n,e,t,i){wp(n.pendingWriteTree_,e,t,i);const s=F.fromObject(t);return Qt(n,new Bt(xr(),e,s))}function Ge(n,e,t=!1){const i=vp(n.pendingWriteTree_,e);if(bp(n.pendingWriteTree_,e)){let r=new F(null);return i.snap!=null?r=r.set(D(),!0):ee(i.children,o=>{r=r.set(new $(o),!0)}),Qt(n,new gi(i.path,r,t))}else return[]}function On(n,e,t){return Qt(n,new ut(Cr(),e,t))}function im(n,e,t){const i=F.fromObject(t);return Qt(n,new Bt(Cr(),e,i))}function sm(n,e){return Qt(n,new Sn(Cr(),e))}function rm(n,e,t){const i=Dr(n,t);if(i){const s=Mr(i),r=s.path,o=s.queryId,a=ne(r,e),l=new Sn(Ar(o),a);return $r(n,r,l)}else return[]}function Ii(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||pc(o,e))){const l=Xp(o,e,t,i);Qp(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,f)=>tt(f));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=lm(h);for(let p=0;p<f.length;++p){const _=f[p],b=_.query,g=_c(n,_);n.listenProvider_.startListening(pn(b),xn(n,b),g.hashFn,g.onComplete)}}}!u&&c.length>0&&!i&&(d?n.listenProvider_.stopListening(pn(e),null):c.forEach(h=>{const f=n.queryToTagMap.get(Gi(h));n.listenProvider_.stopListening(pn(h),f)}))}cm(n,c)}return a}function mc(n,e,t,i){const s=Dr(n,i);if(s!=null){const r=Mr(s),o=r.path,a=r.queryId,l=ne(o,e),c=new ut(Ar(a),l,t);return $r(n,o,c)}else return[]}function om(n,e,t,i){const s=Dr(n,i);if(s){const r=Mr(s),o=r.path,a=r.queryId,l=ne(o,e),c=F.fromObject(t),d=new Bt(Ar(a),l,c);return $r(n,o,d)}else return[]}function Xs(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,f)=>{const p=ne(h,s);r=r||Je(f,p),o=o||tt(f)});let a=n.syncPointTree_.get(s);a?(o=o||tt(a),r=r||Je(a,D())):(a=new dc,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=S.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,p)=>{const _=Je(p,D());_&&(r=r.updateImmediateChild(f,_))}));const c=pc(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=Gi(e);E(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=dm();n.queryToTagMap.set(h,f),n.tagToQueryMap.set(f,h)}const d=Hi(n.pendingWriteTree_,s);let u=Jp(a,e,t,d,r,l);if(!c&&!o&&!i){const h=fc(a,e);u=u.concat(um(n,e,h))}return u}function qi(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=ne(o,e),c=Je(a,l);if(c)return c});return sc(s,e,r,t,!0)}function am(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,d)=>{const u=ne(c,t);i=i||Je(d,u)});let s=n.syncPointTree_.get(t);s?i=i||Je(s,D()):(s=new dc,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new et(i,!0,!1):null,a=Hi(n.pendingWriteTree_,e._path),l=uc(s,e,a,r?o.getNode():S.EMPTY_NODE,r);return Hp(l)}function Qt(n,e){return gc(e,n.syncPointTree_,null,Hi(n.pendingWriteTree_,D()))}function gc(n,e,t,i){if(L(n.path))return yc(n,e,t,i);{const s=e.get(D());t==null&&s!=null&&(t=Je(s,D()));let r=[];const o=N(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=rc(i,o);r=r.concat(gc(a,l,c,d))}return s&&(r=r.concat(Lr(s,n,i,t))),r}}function yc(n,e,t,i){const s=e.get(D());t==null&&s!=null&&(t=Je(s,D()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=rc(i,o),d=n.operationForChild(o);d&&(r=r.concat(yc(d,a,l,c)))}),s&&(r=r.concat(Lr(s,n,i,t))),r}function _c(n,e){const t=e.query,i=xn(n,t);return{hashFn:()=>(zp(e)||S.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?rm(n,t._path,i):sm(n,t._path);{const r=sf(s,t);return Ii(n,t,null,r)}}}}function xn(n,e){const t=Gi(e);return n.queryToTagMap.get(t)}function Gi(n){return n._path.toString()+"$"+n._queryIdentifier}function Dr(n,e){return n.tagToQueryMap.get(e)}function Mr(n){const e=n.indexOf("$");return E(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new $(n.substr(0,e))}}function $r(n,e,t){const i=n.syncPointTree_.get(e);E(i,"Missing sync point for query tag that we're tracking");const s=Hi(n.pendingWriteTree_,e);return Lr(i,t,s,null)}function lm(n){return n.fold((e,t,i)=>{if(t&&tt(t))return[Vi(t)];{let s=[];return t&&(s=hc(t)),ee(i,(r,o)=>{s=s.concat(o)}),s}})}function pn(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(em())(n._repo,n._path):n}function cm(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Gi(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function dm(){return tm++}function um(n,e,t){const i=e._path,s=xn(n,e),r=_c(n,t),o=n.listenProvider_.startListening(pn(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)E(!tt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!L(c)&&d&&tt(d))return[Vi(d).query];{let h=[];return d&&(h=h.concat(hc(d).map(f=>f.query))),ee(u,(f,p)=>{h=h.concat(p)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(pn(d),xn(n,d))}}return o}/**
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
 */class Fr{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Fr(t)}node(){return this.node_}}class Br{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=V(this.path_,e);return new Br(this.syncTree_,t)}node(){return qi(this.syncTree_,this.path_)}}const hm=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},sa=function(n,e,t){if(!n||typeof n!="object")return n;if(E(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return fm(n[".sv"],e,t);if(typeof n[".sv"]=="object")return pm(n[".sv"],e);E(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},fm=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:E(!1,"Unexpected server value: "+n)}},pm=function(n,e,t){n.hasOwnProperty("increment")||E(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&E(!1,"Unexpected increment value: "+i);const s=e.node();if(E(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},wc=function(n,e,t,i){return jr(e,new Br(t,n),i)},Ur=function(n,e,t){return jr(n,new Fr(e),t)};function jr(n,e,t){const i=n.getPriority().val(),s=sa(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=sa(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new Q(a,G(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new Q(s))),o.forEachChild(j,(a,l)=>{const c=jr(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class Wr{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Ki(n,e){let t=e instanceof $?e:new $(e),i=n,s=N(t);for(;s!==null;){const r=ct(i.node.children,s)||{children:{},childCount:0};i=new Wr(s,i,r),t=B(t),s=N(t)}return i}function bt(n){return n.node.value}function zr(n,e){n.node.value=e,Zs(n)}function vc(n){return n.node.childCount>0}function mm(n){return bt(n)===void 0&&!vc(n)}function Yi(n,e){ee(n.node.children,(t,i)=>{e(new Wr(t,n,i))})}function bc(n,e,t,i){t&&e(n),Yi(n,s=>{bc(s,e,!0)})}function gm(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Dn(n){return new $(n.parent===null?n.name:Dn(n.parent)+"/"+n.name)}function Zs(n){n.parent!==null&&ym(n.parent,n.name,n)}function ym(n,e,t){const i=mm(t),s=be(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Zs(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Zs(n))}/**
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
 */const _m=/[\[\].#$\/\u0000-\u001F\u007F]/,wm=/[\[\].#$\u0000-\u001F\u007F]/,vs=10*1024*1024,Hr=function(n){return typeof n=="string"&&n.length!==0&&!_m.test(n)},Ec=function(n){return typeof n=="string"&&n.length!==0&&!wm.test(n)},vm=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Ec(n)},Ic=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!gr(n)||n&&typeof n=="object"&&be(n,".sv")},Tc=function(n,e,t,i){i&&e===void 0||Mn(Fi(n,"value"),e,t)},Mn=function(n,e,t){const i=t instanceof $?new Ff(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+ot(i));if(typeof e=="function")throw new Error(n+"contains a function "+ot(i)+" with contents = "+e.toString());if(gr(e))throw new Error(n+"contains "+e.toString()+" "+ot(i));if(typeof e=="string"&&e.length>vs/3&&Bi(e)>vs)throw new Error(n+"contains a string greater than "+vs+" utf8 bytes "+ot(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(ee(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Hr(o)))throw new Error(n+" contains an invalid key ("+o+") "+ot(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Bf(i,o),Mn(n,a,i),Uf(i)}),s&&r)throw new Error(n+' contains ".value" child '+ot(i)+" in addition to actual children.")}},bm=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=En(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Hr(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort($f);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&de(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Em=function(n,e,t,i){const s=Fi(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];ee(e,(o,a)=>{const l=new $(o);if(Mn(s,a,V(t,l)),br(l)===".priority"&&!Ic(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),bm(s,r)},kc=function(n,e,t,i){if(!Ec(t))throw new Error(Fi(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Im=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),kc(n,e,t)},Qi=function(n,e){if(N(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Tm=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Hr(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!vm(t))throw new Error(Fi(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class km{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Ji(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Er(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function Sc(n,e,t){Ji(n,t),xc(n,i=>Er(i,e))}function ce(n,e,t){Ji(n,t),xc(n,i=>de(i,e)||de(e,i))}function xc(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Sm(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Sm(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();dn&&Z("event: "+t.toString()),Yt(i)}}}/**
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
 */const xm="repo_interrupt",Cm=25;class Am{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new km,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=mi(),this.transactionQueueTree_=new Wr,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Rm(n,e,t){if(n.stats_=wr(n.repoInfo_),n.forceRestClient_||lf())n.server_=new pi(n.repoInfo_,(i,s,r,o)=>{ra(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>oa(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Y(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new De(n.repoInfo_,e,(i,s,r,o)=>{ra(n,i,s,r,o)},i=>{oa(n,i)},i=>{Nm(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=ff(n.repoInfo_,()=>new hp(n.stats_,n.server_)),n.infoData_=new ap,n.infoSyncTree_=new ia({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=On(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Vr(n,"connected",!1),n.serverSyncTree_=new ia({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);ce(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function Cc(n){const t=n.infoData_.getNode(new $(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function $n(n){return hm({timestamp:Cc(n)})}function ra(n,e,t,i,s){n.dataUpdateCount++;const r=new $(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=ci(t,c=>G(c));o=om(n.serverSyncTree_,r,l,s)}else{const l=G(t);o=mc(n.serverSyncTree_,r,l,s)}else if(i){const l=ci(t,c=>G(c));o=im(n.serverSyncTree_,r,l)}else{const l=G(t);o=On(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=jt(n,r)),ce(n.eventQueue_,a,o)}function oa(n,e){Vr(n,"connected",e),e===!1&&Dm(n)}function Nm(n,e){ee(e,(t,i)=>{Vr(n,t,i)})}function Vr(n,e,t){const i=new $("/.info/"+e),s=G(t);n.infoData_.updateSnapshot(i,s);const r=On(n.infoSyncTree_,i,s);ce(n.eventQueue_,i,r)}function Xi(n){return n.nextWriteId_++}function Pm(n,e,t){const i=am(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=G(s).withIndex(e._queryParams.getIndex());Xs(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=On(n.serverSyncTree_,e._path,r);else{const a=xn(n.serverSyncTree_,e);o=mc(n.serverSyncTree_,e._path,r,a)}return ce(n.eventQueue_,e._path,o),Ii(n.serverSyncTree_,e,t,null,!0),r},s=>(Jt(n,"get for query "+Y(e)+" failed: "+s),Promise.reject(new Error(s))))}function Lm(n,e,t,i,s){Jt(n,"set",{path:e.toString(),value:t,priority:i});const r=$n(n),o=G(t,i),a=qi(n.serverSyncTree_,e),l=Ur(o,a,r),c=Xi(n),d=Or(n.serverSyncTree_,e,l,c,!0);Ji(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||ie("set at "+e+" failed: "+h);const _=Ge(n.serverSyncTree_,c,!p);ce(n.eventQueue_,e,_),er(n,s,h,f)});const u=Gr(n,e);jt(n,u),ce(n.eventQueue_,u,[])}function Om(n,e,t,i){Jt(n,"update",{path:e.toString(),value:t});let s=!0;const r=$n(n),o={};if(ee(t,(a,l)=>{s=!1,o[a]=wc(V(e,a),G(l),n.serverSyncTree_,r)}),s)Z("update() called with empty data.  Don't do anything."),er(n,i,"ok",void 0);else{const a=Xi(n),l=nm(n.serverSyncTree_,e,o,a);Ji(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,d)=>{const u=c==="ok";u||ie("update at "+e+" failed: "+c);const h=Ge(n.serverSyncTree_,a,!u),f=h.length>0?jt(n,e):e;ce(n.eventQueue_,f,h),er(n,i,c,d)}),ee(t,c=>{const d=Gr(n,V(e,c));jt(n,d)}),ce(n.eventQueue_,e,[])}}function Dm(n){Jt(n,"onDisconnectEvents");const e=$n(n),t=mi();qs(n.onDisconnect_,D(),(s,r)=>{const o=wc(s,r,n.serverSyncTree_,e);ec(t,s,o)});let i=[];qs(t,D(),(s,r)=>{i=i.concat(On(n.serverSyncTree_,s,r));const o=Gr(n,s);jt(n,o)}),n.onDisconnect_=mi(),ce(n.eventQueue_,D(),i)}function Mm(n,e,t){let i;N(e._path)===".info"?i=Xs(n.infoSyncTree_,e,t):i=Xs(n.serverSyncTree_,e,t),Sc(n.eventQueue_,e._path,i)}function aa(n,e,t){let i;N(e._path)===".info"?i=Ii(n.infoSyncTree_,e,t):i=Ii(n.serverSyncTree_,e,t),Sc(n.eventQueue_,e._path,i)}function $m(n){n.persistentConnection_&&n.persistentConnection_.interrupt(xm)}function Jt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Z(t,...e)}function er(n,e,t,i){e&&Yt(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Fm(n,e,t,i,s,r){Jt(n,"transaction on "+e);const o={path:e,update:t,onComplete:i,status:null,order:Tl(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=qr(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Mn("transaction failed: Data returned ",l,o.path),o.status=0;const c=Ki(n.transactionQueueTree_,e),d=bt(c)||[];d.push(o),zr(c,d);let u;typeof l=="object"&&l!==null&&be(l,".priority")?(u=ct(l,".priority"),E(Ic(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(qi(n.serverSyncTree_,e)||S.EMPTY_NODE).getPriority().val();const h=$n(n),f=G(l,u),p=Ur(f,a,h);o.currentOutputSnapshotRaw=f,o.currentOutputSnapshotResolved=p,o.currentWriteId=Xi(n);const _=Or(n.serverSyncTree_,e,p,o.currentWriteId,o.applyLocally);ce(n.eventQueue_,e,_),Zi(n,n.transactionQueueTree_)}}function qr(n,e,t){return qi(n.serverSyncTree_,e,t)||S.EMPTY_NODE}function Zi(n,e=n.transactionQueueTree_){if(e||es(n,e),bt(e)){const t=Rc(n,e);E(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Bm(n,Dn(e),t)}else vc(e)&&Yi(e,t=>{Zi(n,t)})}function Bm(n,e,t){const i=t.map(c=>c.currentWriteId),s=qr(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const d=t[c];E(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=ne(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Jt(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(Ge(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();es(n,Ki(n.transactionQueueTree_,e)),Zi(n,n.transactionQueueTree_),ce(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)Yt(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{ie("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}jt(n,e)}},o)}function jt(n,e){const t=Ac(n,e),i=Dn(t),s=Rc(n,t);return Um(n,s,i),i}function Um(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=ne(t,l.path);let d=!1,u;if(E(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,s=s.concat(Ge(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Cm)d=!0,u="maxretry",s=s.concat(Ge(n.serverSyncTree_,l.currentWriteId,!0));else{const h=qr(n,l.path,o);l.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Mn("transaction failed: Data returned ",f,l.path);let p=G(f);typeof f=="object"&&f!=null&&be(f,".priority")||(p=p.updatePriority(h.getPriority()));const b=l.currentWriteId,g=$n(n),m=Ur(p,h,g);l.currentOutputSnapshotRaw=p,l.currentOutputSnapshotResolved=m,l.currentWriteId=Xi(n),o.splice(o.indexOf(b),1),s=s.concat(Or(n.serverSyncTree_,l.path,m,l.currentWriteId,l.applyLocally)),s=s.concat(Ge(n.serverSyncTree_,b,!0))}else d=!0,u="nodata",s=s.concat(Ge(n.serverSyncTree_,l.currentWriteId,!0))}ce(n.eventQueue_,t,s),s=[],d&&(e[a].status=2,function(h){setTimeout(h,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}es(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Yt(i[a]);Zi(n,n.transactionQueueTree_)}function Ac(n,e){let t,i=n.transactionQueueTree_;for(t=N(e);t!==null&&bt(i)===void 0;)i=Ki(i,t),e=B(e),t=N(e);return i}function Rc(n,e){const t=[];return Nc(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Nc(n,e,t){const i=bt(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Yi(e,s=>{Nc(n,s,t)})}function es(n,e){const t=bt(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,zr(e,t.length>0?t:void 0)}Yi(e,i=>{es(n,i)})}function Gr(n,e){const t=Dn(Ac(n,e)),i=Ki(n.transactionQueueTree_,e);return gm(i,s=>{bs(n,s)}),bs(n,i),bc(i,s=>{bs(n,s)}),t}function bs(n,e){const t=bt(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(E(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(E(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Ge(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?zr(e,void 0):t.length=r+1,ce(n.eventQueue_,Dn(e),s);for(let o=0;o<i.length;o++)Yt(i[o])}}/**
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
 */function jm(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Wm(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):ie(`Invalid query segment '${t}' in query '${n}'`)}return e}const la=function(n,e){const t=zm(n),i=t.namespace;t.domain==="firebase.com"&&$e(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&$e("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Xh();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new $l(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new $(t.pathString)}},zm=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(s=jm(n.substring(d,u)));const h=Wm(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),t=e.substring(p+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
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
 */const ca="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Hm=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=ca.charAt(t%64),t=Math.floor(t/64);E(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=ca.charAt(e[s]);return E(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class Vm{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Y(this.snapshot.exportVal())}}class qm{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class Pc{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return E(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Kr{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return L(this._path)?null:br(this._path)}get ref(){return new Se(this._repo,this._path)}get _queryIdentifier(){const e=Go(this._queryParams),t=yr(e);return t==="{}"?"default":t}get _queryObject(){return Go(this._queryParams)}isEqual(e){if(e=q(e),!(e instanceof Kr))return!1;const t=this._repo===e._repo,i=Er(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Mf(this._path)}}class Se extends Kr{constructor(e,t){super(e,t,new Sr,!1)}get parent(){const e=ql(this._path);return e===null?null:new Se(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Wt{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new $(e),i=Cn(this.ref,e);return new Wt(this._node.getChild(t),i,j)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Wt(s,Cn(this.ref,i),j)))}hasChild(e){const t=new $(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function W(n,e){return n=q(n),n._checkNotDeleted("ref"),e!==void 0?Cn(n._root,e):n._root}function Cn(n,e){return n=q(n),N(n._path)===null?Im("child","path",e):kc("child","path",e),new Se(n._repo,V(n._path,e))}function zt(n,e){n=q(n),Qi("push",n._path),Tc("push",e,n._path,!0);const t=Cc(n._repo),i=Hm(t),s=Cn(n,i),r=Cn(n,i);let o;return e!=null?o=Be(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Lc(n){return Qi("remove",n._path),Be(n,null)}function Be(n,e){n=q(n),Qi("set",n._path),Tc("set",e,n._path,!1);const t=new Gt;return Lm(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Fn(n,e){Em("update",e,n._path);const t=new Gt;return Om(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Gm(n){n=q(n);const e=new Pc(()=>{}),t=new ts(e);return Pm(n._repo,n,t).then(i=>new Wt(i,new Se(n._repo,n._path),n._queryParams.getIndex()))}class ts{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Vm("value",this,new Wt(e.snapshotNode,new Se(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new qm(this,e,t):null}matches(e){return e instanceof ts?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Km(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=t,c=(d,u)=>{aa(n._repo,n,a),l(d,u)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new Pc(t,r||void 0),a=new ts(o);return Mm(n._repo,n,a),()=>aa(n._repo,n,a)}function tr(n,e,t,i){return Km(n,"value",e,t,i)}Kp(Se);Zp(Se);/**
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
 */const Ym="FIREBASE_DATABASE_EMULATOR_HOST",nr={};let Qm=!1;function Jm(n,e,t,i){n.repoInfo_=new $l(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function Xm(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||$e("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Z("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=la(r,s),a=o.repoInfo,l;typeof process<"u"&&Ao&&(l=Ao[Ym]),l?(r=`http://${l}?ns=${a.namespace}`,o=la(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new df(n.name,n.options,e);Tm("Invalid Firebase Database URL",o),L(o.path)||$e("Database URL must point to the root of a Firebase Database (not including a child path).");const d=eg(a,n,c,new cf(n.name,t));return new tg(d,n)}function Zm(n,e){const t=nr[e];(!t||t[n.key]!==n)&&$e(`Database ${e}(${n.repoInfo_}) has already been deleted.`),$m(n),delete t[n.key]}function eg(n,e,t,i){let s=nr[e.name];s||(s={},nr[e.name]=s);let r=s[n.toURLString()];return r&&$e("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Am(n,Qm,t,i),s[n.toURLString()]=r,r}let tg=class{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Rm(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Se(this._repo,D())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Zm(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&$e("Cannot call "+e+" on a deleted database.")}};function ng(n=ji(),e){const t=nt(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=al("database");i&&ig(t,...i)}return t}function ig(n,e,t,i={}){n=q(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&$e("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&$e('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new ei(ei.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:dl(i.mockUserToken,n.app.options.projectId);r=new ei(o)}Jm(s,e,t,r)}/**
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
 */function sg(n){Gh(_t),_e(new ue("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Xm(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),oe(Ro,No,n),oe(Ro,No,"esm2017")}/**
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
 */class rg{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function Yr(n,e,t){var i;if(n=q(n),Qi("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const s=(i=void 0)!==null&&i!==void 0?i:!0,r=new Gt,o=(l,c,d)=>{let u=null;l?r.reject(l):(u=new Wt(d,new Se(n._repo,n._path),j),r.resolve(new rg(c,u)))},a=tr(n,()=>{});return Fm(n._repo,n._path,e,o,a,s),r.promise}De.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};De.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};sg();function Qr(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function Oc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const og=Oc,Dc=new yt("auth","Firebase",Oc());/**
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
 */const Ti=new Ui("@firebase/auth");function ag(n,...e){Ti.logLevel<=M.WARN&&Ti.warn(`Auth (${_t}): ${n}`,...e)}function ti(n,...e){Ti.logLevel<=M.ERROR&&Ti.error(`Auth (${_t}): ${n}`,...e)}/**
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
 */function we(n,...e){throw Jr(n,...e)}function Ie(n,...e){return Jr(n,...e)}function Mc(n,e,t){const i=Object.assign(Object.assign({},og()),{[e]:t});return new yt("auth","Firebase",i).create(e,{appName:n.name})}function Xe(n){return Mc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Jr(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Dc.create(n,...e)}function C(n,e,...t){if(!n)throw Jr(e,...t)}function Pe(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ti(e),new Error(e)}function Fe(n,e){n||Pe(e)}/**
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
 */function ir(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function lg(){return da()==="http:"||da()==="https:"}function da(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function cg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(lg()||ul()||"connection"in navigator)?navigator.onLine:!0}function dg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Bn{constructor(e,t){this.shortDelay=e,this.longDelay=t,Fe(t>e,"Short delay should be less than long delay!"),this.isMobile=pr()||hl()}get(){return cg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Xr(n,e){Fe(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class $c{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Pe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Pe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Pe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const ug={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const hg=new Bn(3e4,6e4);function Et(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function it(n,e,t,i,s={}){return Fc(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Kt(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:e,headers:l},r);return bu()||(c.referrerPolicy="no-referrer"),$c.fetch()(Bc(n,n.config.apiHost,t,a),c)})}async function Fc(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},ug),e);try{const s=new pg(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Yn(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Yn(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Yn(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Yn(n,"user-disabled",o);const d=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Mc(n,d,c);we(n,d)}}catch(s){if(s instanceof ve)throw s;we(n,"network-request-failed",{message:String(s)})}}async function ns(n,e,t,i,s={}){const r=await it(n,e,t,i,s);return"mfaPendingCredential"in r&&we(n,"multi-factor-auth-required",{_serverResponse:r}),r}function Bc(n,e,t,i){const s=`${e}${t}?${i}`;return n.config.emulator?Xr(n.config,s):`${n.config.apiScheme}://${s}`}function fg(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class pg{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Ie(this.auth,"network-request-failed")),hg.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Yn(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=Ie(n,e,i);return s.customData._tokenResponse=t,s}function ua(n){return n!==void 0&&n.enterprise!==void 0}class mg{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return fg(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function gg(n,e){return it(n,"GET","/v2/recaptchaConfig",Et(n,e))}/**
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
 */async function yg(n,e){return it(n,"POST","/v1/accounts:delete",e)}async function Uc(n,e){return it(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function mn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function _g(n,e=!1){const t=q(n),i=await t.getIdToken(e),s=Zr(i);C(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:mn(Es(s.auth_time)),issuedAtTime:mn(Es(s.iat)),expirationTime:mn(Es(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Es(n){return Number(n)*1e3}function Zr(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return ti("JWT malformed, contained fewer than 3 sections"),null;try{const s=li(t);return s?JSON.parse(s):(ti("Failed to decode base64 JWT payload"),null)}catch(s){return ti("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function ha(n){const e=Zr(n);return C(e,"internal-error"),C(typeof e.exp<"u","internal-error"),C(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function An(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof ve&&wg(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function wg({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class vg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class sr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=mn(this.lastLoginAt),this.creationTime=mn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ki(n){var e;const t=n.auth,i=await n.getIdToken(),s=await An(n,Uc(t,{idToken:i}));C(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?jc(r.providerUserInfo):[],a=Eg(n.providerData,o),l=n.isAnonymous,c=!(n.email&&r.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new sr(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(n,u)}async function bg(n){const e=q(n);await ki(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Eg(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function jc(n){return n.map(e=>{var{providerId:t}=e,i=Qr(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function Ig(n,e){const t=await Fc(n,{},async()=>{const i=Kt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=Bc(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",$c.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Tg(n,e){return it(n,"POST","/v2/accounts:revokeToken",Et(n,e))}/**
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
 */class Lt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){C(e.idToken,"internal-error"),C(typeof e.idToken<"u","internal-error"),C(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ha(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){C(e.length!==0,"internal-error");const t=ha(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(C(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await Ig(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Lt;return i&&(C(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(C(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(C(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Lt,this.toJSON())}_performRefresh(){return Pe("not implemented")}}/**
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
 */function We(n,e){C(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Le{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=Qr(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new sr(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await An(this,this.stsTokenManager.getToken(this.auth,e));return C(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return _g(this,e)}reload(){return bg(this)}_assign(e){this!==e&&(C(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Le(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){C(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await ki(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Re(this.auth.app))return Promise.reject(Xe(this.auth));const e=await this.getIdToken();return await An(this,yg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,o,a,l,c,d;const u=(i=t.displayName)!==null&&i!==void 0?i:void 0,h=(s=t.email)!==null&&s!==void 0?s:void 0,f=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,p=(o=t.photoURL)!==null&&o!==void 0?o:void 0,_=(a=t.tenantId)!==null&&a!==void 0?a:void 0,b=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,g=(c=t.createdAt)!==null&&c!==void 0?c:void 0,m=(d=t.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:w,emailVerified:v,isAnonymous:T,providerData:k,stsTokenManager:R}=t;C(w&&R,e,"internal-error");const x=Lt.fromJSON(this.name,R);C(typeof w=="string",e,"internal-error"),We(u,e.name),We(h,e.name),C(typeof v=="boolean",e,"internal-error"),C(typeof T=="boolean",e,"internal-error"),We(f,e.name),We(p,e.name),We(_,e.name),We(b,e.name),We(g,e.name),We(m,e.name);const K=new Le({uid:w,auth:e,email:h,emailVerified:v,displayName:u,isAnonymous:T,photoURL:p,phoneNumber:f,tenantId:_,stsTokenManager:x,createdAt:g,lastLoginAt:m});return k&&Array.isArray(k)&&(K.providerData=k.map(he=>Object.assign({},he))),b&&(K._redirectEventId=b),K}static async _fromIdTokenResponse(e,t,i=!1){const s=new Lt;s.updateFromServerResponse(t);const r=new Le({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await ki(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];C(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?jc(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new Lt;a.updateFromIdToken(i);const l=new Le({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new sr(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
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
 */const fa=new Map;function Oe(n){Fe(n instanceof Function,"Expected a class definition");let e=fa.get(n);return e?(Fe(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,fa.set(n,e),e)}/**
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
 */class Wc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Wc.type="NONE";const pa=Wc;/**
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
 */function ni(n,e,t){return`firebase:${n}:${e}:${t}`}class Ot{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=ni(this.userKey,s.apiKey,r),this.fullPersistenceKey=ni("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Le._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Ot(Oe(pa),e,i);const s=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||Oe(pa);const o=ni(i,e.config.apiKey,e.name);let a=null;for(const c of t)try{const d=await c._get(o);if(d){const u=Le._fromJSON(e,d);c!==r&&(a=u),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new Ot(r,e,i):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new Ot(r,e,i))}}/**
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
 */function ma(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(qc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Kc(e))return"Blackberry";if(Yc(e))return"Webos";if(Hc(e))return"Safari";if((e.includes("chrome/")||Vc(e))&&!e.includes("edge/"))return"Chrome";if(Gc(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function zc(n=se()){return/firefox\//i.test(n)}function Hc(n=se()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Vc(n=se()){return/crios\//i.test(n)}function qc(n=se()){return/iemobile/i.test(n)}function Gc(n=se()){return/android/i.test(n)}function Kc(n=se()){return/blackberry/i.test(n)}function Yc(n=se()){return/webos/i.test(n)}function eo(n=se()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function kg(n=se()){var e;return eo(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Sg(){return Eu()&&document.documentMode===10}function Qc(n=se()){return eo(n)||Gc(n)||Yc(n)||Kc(n)||/windows phone/i.test(n)||qc(n)}/**
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
 */function Jc(n,e=[]){let t;switch(n){case"Browser":t=ma(se());break;case"Worker":t=`${ma(se())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${_t}/${i}`}/**
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
 */class xg{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
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
 */async function Cg(n,e={}){return it(n,"GET","/v2/passwordPolicy",Et(n,e))}/**
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
 */const Ag=6;class Rg{constructor(e){var t,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Ag,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(i=l.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class Ng{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ga(this),this.idTokenSubscription=new ga(this),this.beforeStateQueue=new xg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Dc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Oe(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await Ot.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Uc(this,{idToken:e}),i=await Le._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Re(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return C(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ki(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=dg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Re(this.app))return Promise.reject(Xe(this));const t=e?q(e):null;return t&&C(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&C(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Re(this.app)?Promise.reject(Xe(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Re(this.app)?Promise.reject(Xe(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Oe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Cg(this),t=new Rg(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new yt("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Tg(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Oe(e)||this._popupRedirectResolver;C(t,this,"argument-error"),this.redirectPersistenceManager=await Ot.create(this,[Oe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(C(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,i,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return C(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Jc(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&ag(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Xt(n){return q(n)}class ga{constructor(e){this.auth=e,this.observer=null,this.addObserver=Nu(t=>this.observer=t)}get next(){return C(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let is={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Pg(n){is=n}function Xc(n){return is.loadJS(n)}function Lg(){return is.recaptchaEnterpriseScript}function Og(){return is.gapiScript}function Dg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const Mg="recaptcha-enterprise",$g="NO_RECAPTCHA";class Fg{constructor(e){this.type=Mg,this.auth=Xt(e)}async verify(e="verify",t=!1){async function i(r){if(!t){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,a)=>{gg(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const c=new mg(l);return r.tenantId==null?r._agentRecaptchaConfig=c:r._tenantRecaptchaConfigs[r.tenantId]=c,o(c.siteKey)}}).catch(l=>{a(l)})})}function s(r,o,a){const l=window.grecaptcha;ua(l)?l.enterprise.ready(()=>{l.enterprise.execute(r,{action:e}).then(c=>{o(c)}).catch(()=>{o($g)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,o)=>{i(this.auth).then(a=>{if(!t&&ua(window.grecaptcha))s(a,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=Lg();l.length!==0&&(l+=a),Xc(l).then(()=>{s(a,r,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}async function ya(n,e,t,i=!1){const s=new Fg(n);let r;try{r=await s.verify(t)}catch{r=await s.verify(t,!0)}const o=Object.assign({},e);return i?Object.assign(o,{captchaResp:r}):Object.assign(o,{captchaResponse:r}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function _a(n,e,t,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await ya(n,e,t,t==="getOobCode");return i(n,r)}else return i(n,e).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await ya(n,e,t,t==="getOobCode");return i(n,o)}else return Promise.reject(r)})}/**
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
 */function Bg(n,e){const t=nt(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(wn(r,e??{}))return s;we(s,"already-initialized")}return t.initialize({options:e})}function Ug(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Oe);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function jg(n,e,t){const i=Xt(n);C(i._canInitEmulator,i,"emulator-config-failed"),C(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Zc(e),{host:o,port:a}=Wg(e),l=a===null?"":`:${a}`;i.config.emulator={url:`${r}//${o}${l}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),zg()}function Zc(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Wg(n){const e=Zc(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:wa(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:wa(o)}}}function wa(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function zg(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class to{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Pe("not implemented")}_getIdTokenResponse(e){return Pe("not implemented")}_linkToIdToken(e,t){return Pe("not implemented")}_getReauthenticationResolver(e){return Pe("not implemented")}}async function Hg(n,e){return it(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function Vg(n,e){return ns(n,"POST","/v1/accounts:signInWithPassword",Et(n,e))}/**
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
 */async function qg(n,e){return ns(n,"POST","/v1/accounts:signInWithEmailLink",Et(n,e))}async function Gg(n,e){return ns(n,"POST","/v1/accounts:signInWithEmailLink",Et(n,e))}/**
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
 */class Rn extends to{constructor(e,t,i,s=null){super("password",i),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Rn(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new Rn(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return _a(e,t,"signInWithPassword",Vg);case"emailLink":return qg(e,{email:this._email,oobCode:this._password});default:we(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return _a(e,i,"signUpPassword",Hg);case"emailLink":return Gg(e,{idToken:t,email:this._email,oobCode:this._password});default:we(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Dt(n,e){return ns(n,"POST","/v1/accounts:signInWithIdp",Et(n,e))}/**
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
 */const Kg="http://localhost";class ft extends to{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ft(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):we("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=Qr(t,["providerId","signInMethod"]);if(!i||!s)return null;const o=new ft(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Dt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Dt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Dt(e,t)}buildRequest(){const e={requestUri:Kg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Kt(t)}return e}}/**
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
 */function Yg(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Qg(n){const e=ln(cn(n)).link,t=e?ln(cn(e)).deep_link_id:null,i=ln(cn(n)).deep_link_id;return(i?ln(cn(i)).link:null)||i||t||e||n}class no{constructor(e){var t,i,s,r,o,a;const l=ln(cn(e)),c=(t=l.apiKey)!==null&&t!==void 0?t:null,d=(i=l.oobCode)!==null&&i!==void 0?i:null,u=Yg((s=l.mode)!==null&&s!==void 0?s:null);C(c&&d&&u,"argument-error"),this.apiKey=c,this.operation=u,this.code=d,this.continueUrl=(r=l.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const t=Qg(e);try{return new no(t)}catch{return null}}}/**
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
 */class Zt{constructor(){this.providerId=Zt.PROVIDER_ID}static credential(e,t){return Rn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=no.parseLink(t);return C(i,"argument-error"),Rn._fromEmailAndCode(e,i.code,i.tenantId)}}Zt.PROVIDER_ID="password";Zt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Zt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class ed{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Un extends ed{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class ze extends Un{constructor(){super("facebook.com")}static credential(e){return ft._fromParams({providerId:ze.PROVIDER_ID,signInMethod:ze.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ze.credentialFromTaggedObject(e)}static credentialFromError(e){return ze.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ze.credential(e.oauthAccessToken)}catch{return null}}}ze.FACEBOOK_SIGN_IN_METHOD="facebook.com";ze.PROVIDER_ID="facebook.com";/**
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
 */class He extends Un{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ft._fromParams({providerId:He.PROVIDER_ID,signInMethod:He.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return He.credentialFromTaggedObject(e)}static credentialFromError(e){return He.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return He.credential(t,i)}catch{return null}}}He.GOOGLE_SIGN_IN_METHOD="google.com";He.PROVIDER_ID="google.com";/**
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
 */class Ve extends Un{constructor(){super("github.com")}static credential(e){return ft._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ve.credential(e.oauthAccessToken)}catch{return null}}}Ve.GITHUB_SIGN_IN_METHOD="github.com";Ve.PROVIDER_ID="github.com";/**
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
 */class qe extends Un{constructor(){super("twitter.com")}static credential(e,t){return ft._fromParams({providerId:qe.PROVIDER_ID,signInMethod:qe.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return qe.credentialFromTaggedObject(e)}static credentialFromError(e){return qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return qe.credential(t,i)}catch{return null}}}qe.TWITTER_SIGN_IN_METHOD="twitter.com";qe.PROVIDER_ID="twitter.com";/**
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
 */class Ht{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await Le._fromIdTokenResponse(e,i,s),o=va(i);return new Ht({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=va(i);return new Ht({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function va(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Si extends ve{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Si.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Si(e,t,i,s)}}function td(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Si._fromErrorAndOperation(n,r,e,i):r})}async function Jg(n,e,t=!1){const i=await An(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Ht._forOperation(n,"link",i)}/**
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
 */async function Xg(n,e,t=!1){const{auth:i}=n;if(Re(i.app))return Promise.reject(Xe(i));const s="reauthenticate";try{const r=await An(n,td(i,s,e,n),t);C(r.idToken,i,"internal-error");const o=Zr(r.idToken);C(o,i,"internal-error");const{sub:a}=o;return C(n.uid===a,i,"user-mismatch"),Ht._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&we(i,"user-mismatch"),r}}/**
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
 */async function nd(n,e,t=!1){if(Re(n.app))return Promise.reject(Xe(n));const i="signIn",s=await td(n,i,e),r=await Ht._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}async function Zg(n,e){return nd(Xt(n),e)}/**
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
 */async function ey(n){const e=Xt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function ty(n,e,t){return Re(n.app)?Promise.reject(Xe(n)):Zg(q(n),Zt.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&ey(n),i})}/**
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
 */function ny(n,e){return q(n).setPersistence(e)}function iy(n,e,t,i){return q(n).onIdTokenChanged(e,t,i)}function sy(n,e,t){return q(n).beforeAuthStateChanged(e,t)}function ry(n,e,t,i){return q(n).onAuthStateChanged(e,t,i)}function oy(n){return q(n).signOut()}const xi="__sak";/**
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
 */class id{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(xi,"1"),this.storage.removeItem(xi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const ay=1e3,ly=10;class sd extends id{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Qc(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Sg()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ly):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},ay)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}sd.type="LOCAL";const rd=sd;/**
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
 */class od extends id{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}od.type="SESSION";const ad=od;/**
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
 */function cy(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ss{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new ss(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async c=>c(t.origin,r)),l=await cy(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ss.receivers=[];/**
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
 */function so(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class dy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=so("",20);s.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(u){const h=u;if(h.data.eventId===c)switch(h.data.status){case"ack":clearTimeout(d),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(d),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Te(){return window}function uy(n){Te().location.href=n}/**
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
 */function ld(){return typeof Te().WorkerGlobalScope<"u"&&typeof Te().importScripts=="function"}async function hy(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function fy(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function py(){return ld()?self:null}/**
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
 */const cd="firebaseLocalStorageDb",my=1,Ci="firebaseLocalStorage",dd="fbase_key";class jn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function rs(n,e){return n.transaction([Ci],e?"readwrite":"readonly").objectStore(Ci)}function gy(){const n=indexedDB.deleteDatabase(cd);return new jn(n).toPromise()}function rr(){const n=indexedDB.open(cd,my);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Ci,{keyPath:dd})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Ci)?e(i):(i.close(),await gy(),e(await rr()))})})}async function ba(n,e,t){const i=rs(n,!0).put({[dd]:e,value:t});return new jn(i).toPromise()}async function yy(n,e){const t=rs(n,!1).get(e),i=await new jn(t).toPromise();return i===void 0?null:i.value}function Ea(n,e){const t=rs(n,!0).delete(e);return new jn(t).toPromise()}const _y=800,wy=3;class ud{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await rr(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>wy)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ld()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ss._getInstance(py()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await hy(),!this.activeServiceWorker)return;this.sender=new dy(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||fy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await rr();return await ba(e,xi,"1"),await Ea(e,xi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>ba(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>yy(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ea(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=rs(s,!1).getAll();return new jn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),_y)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ud.type="LOCAL";const vy=ud;new Bn(3e4,6e4);/**
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
 */function by(n,e){return e?Oe(e):(C(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class ro extends to{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Dt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Dt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Dt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Ey(n){return nd(n.auth,new ro(n),n.bypassAuthState)}function Iy(n){const{auth:e,user:t}=n;return C(t,e,"internal-error"),Xg(t,new ro(n),n.bypassAuthState)}async function Ty(n){const{auth:e,user:t}=n;return C(t,e,"internal-error"),Jg(t,new ro(n),n.bypassAuthState)}/**
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
 */class hd{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ey;case"linkViaPopup":case"linkViaRedirect":return Ty;case"reauthViaPopup":case"reauthViaRedirect":return Iy;default:we(this.auth,"internal-error")}}resolve(e){Fe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Fe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const ky=new Bn(2e3,1e4);class Rt extends hd{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Rt.currentPopupAction&&Rt.currentPopupAction.cancel(),Rt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return C(e,this.auth,"internal-error"),e}async onExecution(){Fe(this.filter.length===1,"Popup operations only handle one event");const e=so();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ie(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ie(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Rt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ie(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ky.get())};e()}}Rt.currentPopupAction=null;/**
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
 */const Sy="pendingRedirect",ii=new Map;class xy extends hd{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=ii.get(this.auth._key());if(!e){try{const i=await Cy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}ii.set(this.auth._key(),e)}return this.bypassAuthState||ii.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Cy(n,e){const t=Ny(e),i=Ry(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function Ay(n,e){ii.set(n._key(),e)}function Ry(n){return Oe(n._redirectPersistence)}function Ny(n){return ni(Sy,n.config.apiKey,n.name)}async function Py(n,e,t=!1){if(Re(n.app))return Promise.reject(Xe(n));const i=Xt(n),s=by(i,e),o=await new xy(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const Ly=10*60*1e3;class Oy{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Dy(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!fd(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(Ie(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ly&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ia(e))}saveEventToCache(e){this.cachedEventUids.add(Ia(e)),this.lastProcessedEventTime=Date.now()}}function Ia(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function fd({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Dy(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return fd(n);default:return!1}}/**
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
 */async function My(n,e={}){return it(n,"GET","/v1/projects",e)}/**
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
 */const $y=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Fy=/^https?/;async function By(n){if(n.config.emulator)return;const{authorizedDomains:e}=await My(n);for(const t of e)try{if(Uy(t))return}catch{}we(n,"unauthorized-domain")}function Uy(n){const e=ir(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!Fy.test(t))return!1;if($y.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const jy=new Bn(3e4,6e4);function Ta(){const n=Te().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Wy(n){return new Promise((e,t)=>{var i,s,r;function o(){Ta(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ta(),t(Ie(n,"network-request-failed"))},timeout:jy.get()})}if(!((s=(i=Te().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=Te().gapi)===null||r===void 0)&&r.load)o();else{const a=Dg("iframefcb");return Te()[a]=()=>{gapi.load?o():t(Ie(n,"network-request-failed"))},Xc(`${Og()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw si=null,e})}let si=null;function zy(n){return si=si||Wy(n),si}/**
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
 */const Hy=new Bn(5e3,15e3),Vy="__/auth/iframe",qy="emulator/auth/iframe",Gy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ky=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Yy(n){const e=n.config;C(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Xr(e,qy):`https://${n.config.authDomain}/${Vy}`,i={apiKey:e.apiKey,appName:n.name,v:_t},s=Ky.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${Kt(i).slice(1)}`}async function Qy(n){const e=await zy(n),t=Te().gapi;return C(t,n,"internal-error"),e.open({where:document.body,url:Yy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Gy,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=Ie(n,"network-request-failed"),a=Te().setTimeout(()=>{r(o)},Hy.get());function l(){Te().clearTimeout(a),s(i)}i.ping(l).then(l,()=>{r(o)})}))}/**
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
 */const Jy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Xy=500,Zy=600,e_="_blank",t_="http://localhost";class ka{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function n_(n,e,t,i=Xy,s=Zy){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const l=Object.assign(Object.assign({},Jy),{width:i.toString(),height:s.toString(),top:r,left:o}),c=se().toLowerCase();t&&(a=Vc(c)?e_:t),zc(c)&&(e=e||t_,l.scrollbars="yes");const d=Object.entries(l).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(kg(c)&&a!=="_self")return i_(e||"",a),new ka(null);const u=window.open(e||"",a,d);C(u,n,"popup-blocked");try{u.focus()}catch{}return new ka(u)}function i_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const s_="__/auth/handler",r_="emulator/auth/handler",o_=encodeURIComponent("fac");async function Sa(n,e,t,i,s,r){C(n.config.authDomain,n,"auth-domain-config-required"),C(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:_t,eventId:s};if(e instanceof ed){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",$s(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,u]of Object.entries({}))o[d]=u}if(e instanceof Un){const d=e.getScopes().filter(u=>u!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const l=await n._getAppCheckToken(),c=l?`#${o_}=${encodeURIComponent(l)}`:"";return`${a_(n)}?${Kt(a).slice(1)}${c}`}function a_({config:n}){return n.emulator?Xr(n,r_):`https://${n.authDomain}/${s_}`}/**
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
 */const Is="webStorageSupport";class l_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ad,this._completeRedirectFn=Py,this._overrideRedirectResult=Ay}async _openPopup(e,t,i,s){var r;Fe((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Sa(e,t,i,ir(),s);return n_(e,o,so())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Sa(e,t,i,ir(),s);return uy(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(Fe(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Qy(e),i=new Oy(e);return t.register("authEvent",s=>(C(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Is,{type:Is},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[Is];o!==void 0&&t(!!o),we(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=By(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Qc()||Hc()||eo()}}const c_=l_;var xa="@firebase/auth",Ca="1.7.9";/**
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
 */class d_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){C(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function u_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function h_(n){_e(new ue("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;C(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Jc(n)},c=new Ng(i,s,r,l);return Ug(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),_e(new ue("auth-internal",e=>{const t=Xt(e.getProvider("auth").getImmediate());return(i=>new d_(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),oe(xa,Ca,u_(n)),oe(xa,Ca,"esm2017")}/**
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
 */const f_=5*60,p_=cl("authIdTokenMaxAge")||f_;let Aa=null;const m_=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>p_)return;const s=t==null?void 0:t.token;Aa!==s&&(Aa=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function g_(n=ji()){const e=nt(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Bg(n,{popupRedirectResolver:c_,persistence:[vy,rd,ad]}),i=cl("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=m_(r.toString());sy(t,o,()=>o(t.currentUser)),iy(t,a=>o(a))}}const s=ol("auth");return s&&jg(t,`http://${s}`),t}function y_(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Pg({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=Ie("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",y_().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});h_("Browser");/**
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
 */const pd="firebasestorage.googleapis.com",__="storageBucket",w_=2*60*1e3,v_=10*60*1e3;/**
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
 */class xe extends ve{constructor(e,t,i=0){super(Ts(e),`Firebase Storage: ${t} (${Ts(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,xe.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Ts(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ke;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ke||(ke={}));function Ts(n){return"storage/"+n}function b_(){const n="An unknown error occurred, please check the error payload for server response.";return new xe(ke.UNKNOWN,n)}function E_(){return new xe(ke.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function I_(){return new xe(ke.CANCELED,"User canceled the upload/download.")}function T_(n){return new xe(ke.INVALID_URL,"Invalid URL '"+n+"'.")}function k_(n){return new xe(ke.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Ra(n){return new xe(ke.INVALID_ARGUMENT,n)}function md(){return new xe(ke.APP_DELETED,"The Firebase app was deleted.")}function S_(n){return new xe(ke.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
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
 */class ge{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let i;try{i=ge.makeFromUrl(e,t)}catch{return new ge(e,"")}if(i.path==="")return i;throw k_(e)}static makeFromUrl(e,t){let i=null;const s="([A-Za-z0-9.\\-_]+)";function r(v){v.path.charAt(v.path.length-1)==="/"&&(v.path_=v.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+s+o,"i"),l={bucket:1,path:3};function c(v){v.path_=decodeURIComponent(v.path)}const d="v[A-Za-z0-9_]+",u=t.replace(/[.]/g,"\\."),h="(/([^?#]*).*)?$",f=new RegExp(`^https?://${u}/${d}/b/${s}/o${h}`,"i"),p={bucket:1,path:3},_=t===pd?"(?:storage.googleapis.com|storage.cloud.google.com)":t,b="([^?#]*)",g=new RegExp(`^https?://${_}/${s}/${b}`,"i"),w=[{regex:a,indices:l,postModify:r},{regex:f,indices:p,postModify:c},{regex:g,indices:{bucket:1,path:2},postModify:c}];for(let v=0;v<w.length;v++){const T=w[v],k=T.regex.exec(e);if(k){const R=k[T.indices.bucket];let x=k[T.indices.path];x||(x=""),i=new ge(R,x),T.postModify(i);break}}if(i==null)throw T_(e);return i}}class x_{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function C_(n,e,t){let i=1,s=null,r=null,o=!1,a=0;function l(){return a===2}let c=!1;function d(...b){c||(c=!0,e.apply(null,b))}function u(b){s=setTimeout(()=>{s=null,n(f,l())},b)}function h(){r&&clearTimeout(r)}function f(b,...g){if(c){h();return}if(b){h(),d.call(null,b,...g);return}if(l()||o){h(),d.call(null,b,...g);return}i<64&&(i*=2);let w;a===1?(a=2,w=0):w=(i+Math.random())*1e3,u(w)}let p=!1;function _(b){p||(p=!0,h(),!c&&(s!==null?(b||(a=2),clearTimeout(s),u(0)):b||(a=1)))}return u(0),r=setTimeout(()=>{o=!0,_(!0)},t),_}function A_(n){n(!1)}/**
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
 */function R_(n){return n!==void 0}function Na(n,e,t,i){if(i<e)throw Ra(`Invalid value for '${n}'. Expected ${e} or greater.`);if(i>t)throw Ra(`Invalid value for '${n}'. Expected ${t} or less.`)}function N_(n){const e=encodeURIComponent;let t="?";for(const i in n)if(n.hasOwnProperty(i)){const s=e(i)+"="+e(n[i]);t=t+s+"&"}return t=t.slice(0,-1),t}var Ai;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Ai||(Ai={}));/**
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
 */function P_(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,r=e.indexOf(n)!==-1;return t||s||r}/**
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
 */class L_{constructor(e,t,i,s,r,o,a,l,c,d,u,h=!0){this.url_=e,this.method_=t,this.headers_=i,this.body_=s,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=d,this.connectionFactory_=u,this.retry=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((f,p)=>{this.resolve_=f,this.reject_=p,this.start_()})}start_(){const e=(i,s)=>{if(s){i(!1,new Qn(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const a=r.getErrorCode()===Ai.NO_ERROR,l=r.getStatus();if(!a||P_(l,this.additionalRetryCodes_)&&this.retry){const d=r.getErrorCode()===Ai.ABORT;i(!1,new Qn(!1,null,d));return}const c=this.successCodes_.indexOf(l)!==-1;i(!0,new Qn(c,r))})},t=(i,s)=>{const r=this.resolve_,o=this.reject_,a=s.connection;if(s.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());R_(l)?r(l):r()}catch(l){o(l)}else if(a!==null){const l=b_();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(s.canceled){const l=this.appDelete_?md():I_();o(l)}else{const l=E_();o(l)}};this.canceled_?t(!1,new Qn(!1,null,!0)):this.backoffId_=C_(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&A_(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Qn{constructor(e,t,i){this.wasSuccessCode=e,this.connection=t,this.canceled=!!i}}function O_(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function D_(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function M_(n,e){e&&(n["X-Firebase-GMPID"]=e)}function $_(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function F_(n,e,t,i,s,r,o=!0){const a=N_(n.urlParams),l=n.url+a,c=Object.assign({},n.headers);return M_(c,e),O_(c,t),D_(c,r),$_(c,i),new L_(l,n.method,c,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o)}/**
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
 */function B_(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function U_(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */class Ri{constructor(e,t){this._service=e,t instanceof ge?this._location=t:this._location=ge.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Ri(e,t)}get root(){const e=new ge(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return U_(this._location.path)}get storage(){return this._service}get parent(){const e=B_(this._location.path);if(e===null)return null;const t=new ge(this._location.bucket,e);return new Ri(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw S_(e)}}function Pa(n,e){const t=e==null?void 0:e[__];return t==null?null:ge.makeFromBucketSpec(t,n)}function j_(n,e,t,i={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:s}=i;s&&(n._overrideAuthToken=typeof s=="string"?s:dl(s,n.app.options.projectId))}class W_{constructor(e,t,i,s,r){this.app=e,this._authProvider=t,this._appCheckProvider=i,this._url=s,this._firebaseVersion=r,this._bucket=null,this._host=pd,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=w_,this._maxUploadRetryTime=v_,this._requests=new Set,s!=null?this._bucket=ge.makeFromBucketSpec(s,this._host):this._bucket=Pa(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=ge.makeFromBucketSpec(this._url,e):this._bucket=Pa(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Na("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Na("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Ri(this,e)}_makeRequest(e,t,i,s,r=!0){if(this._deleted)return new x_(md());{const o=F_(e,this._appId,i,s,t,this._firebaseVersion,r);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[i,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,i,s).getPromise()}}const La="@firebase/storage",Oa="0.13.2";/**
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
 */const gd="storage";function z_(n=ji(),e){n=q(n);const i=nt(n,gd).getImmediate({identifier:e}),s=al("storage");return s&&H_(i,...s),i}function H_(n,e,t,i={}){j_(n,e,t,i)}function V_(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),i=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new W_(t,i,s,e,_t)}function q_(){_e(new ue(gd,V_,"PUBLIC").setMultipleInstances(!0)),oe(La,Oa,""),oe(La,Oa,"esm2017")}q_();const yd="@firebase/installations",oo="0.6.9";/**
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
 */const _d=1e4,wd=`w:${oo}`,vd="FIS_v2",G_="https://firebaseinstallations.googleapis.com/v1",K_=60*60*1e3,Y_="installations",Q_="Installations";/**
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
 */const J_={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},pt=new yt(Y_,Q_,J_);function bd(n){return n instanceof ve&&n.code.includes("request-failed")}/**
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
 */function Ed({projectId:n}){return`${G_}/projects/${n}/installations`}function Id(n){return{token:n.token,requestStatus:2,expiresIn:Z_(n.expiresIn),creationTime:Date.now()}}async function Td(n,e){const i=(await e.json()).error;return pt.create("request-failed",{requestName:n,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function kd({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function X_(n,{refreshToken:e}){const t=kd(n);return t.append("Authorization",ew(e)),t}async function Sd(n){const e=await n();return e.status>=500&&e.status<600?n():e}function Z_(n){return Number(n.replace("s","000"))}function ew(n){return`${vd} ${n}`}/**
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
 */async function tw({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const i=Ed(n),s=kd(n),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={fid:t,authVersion:vd,appId:n.appId,sdkVersion:wd},a={method:"POST",headers:s,body:JSON.stringify(o)},l=await Sd(()=>fetch(i,a));if(l.ok){const c=await l.json();return{fid:c.fid||t,registrationStatus:2,refreshToken:c.refreshToken,authToken:Id(c.authToken)}}else throw await Td("Create Installation",l)}/**
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
 */function xd(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */function nw(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const iw=/^[cdef][\w-]{21}$/,or="";function sw(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=rw(n);return iw.test(t)?t:or}catch{return or}}function rw(n){return nw(n).substr(0,22)}/**
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
 */function os(n){return`${n.appName}!${n.appId}`}/**
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
 */const Cd=new Map;function Ad(n,e){const t=os(n);Rd(t,e),ow(t,e)}function Rd(n,e){const t=Cd.get(n);if(t)for(const i of t)i(e)}function ow(n,e){const t=aw();t&&t.postMessage({key:n,fid:e}),lw()}let lt=null;function aw(){return!lt&&"BroadcastChannel"in self&&(lt=new BroadcastChannel("[Firebase] FID Change"),lt.onmessage=n=>{Rd(n.data.key,n.data.fid)}),lt}function lw(){Cd.size===0&&lt&&(lt.close(),lt=null)}/**
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
 */const cw="firebase-installations-database",dw=1,mt="firebase-installations-store";let ks=null;function ao(){return ks||(ks=_l(cw,dw,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(mt)}}})),ks}async function Ni(n,e){const t=os(n),s=(await ao()).transaction(mt,"readwrite"),r=s.objectStore(mt),o=await r.get(t);return await r.put(e,t),await s.done,(!o||o.fid!==e.fid)&&Ad(n,e.fid),e}async function Nd(n){const e=os(n),i=(await ao()).transaction(mt,"readwrite");await i.objectStore(mt).delete(e),await i.done}async function as(n,e){const t=os(n),s=(await ao()).transaction(mt,"readwrite"),r=s.objectStore(mt),o=await r.get(t),a=e(o);return a===void 0?await r.delete(t):await r.put(a,t),await s.done,a&&(!o||o.fid!==a.fid)&&Ad(n,a.fid),a}/**
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
 */async function lo(n){let e;const t=await as(n.appConfig,i=>{const s=uw(i),r=hw(n,s);return e=r.registrationPromise,r.installationEntry});return t.fid===or?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function uw(n){const e=n||{fid:sw(),registrationStatus:0};return Pd(e)}function hw(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(pt.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=fw(n,t);return{installationEntry:t,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:pw(n)}:{installationEntry:e}}async function fw(n,e){try{const t=await tw(n,e);return Ni(n.appConfig,t)}catch(t){throw bd(t)&&t.customData.serverCode===409?await Nd(n.appConfig):await Ni(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function pw(n){let e=await Da(n.appConfig);for(;e.registrationStatus===1;)await xd(100),e=await Da(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:i}=await lo(n);return i||t}return e}function Da(n){return as(n,e=>{if(!e)throw pt.create("installation-not-found");return Pd(e)})}function Pd(n){return mw(n)?{fid:n.fid,registrationStatus:0}:n}function mw(n){return n.registrationStatus===1&&n.registrationTime+_d<Date.now()}/**
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
 */async function gw({appConfig:n,heartbeatServiceProvider:e},t){const i=yw(n,t),s=X_(n,t),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={installation:{sdkVersion:wd,appId:n.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},l=await Sd(()=>fetch(i,a));if(l.ok){const c=await l.json();return Id(c)}else throw await Td("Generate Auth Token",l)}function yw(n,{fid:e}){return`${Ed(n)}/${e}/authTokens:generate`}/**
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
 */async function co(n,e=!1){let t;const i=await as(n.appConfig,r=>{if(!Ld(r))throw pt.create("not-registered");const o=r.authToken;if(!e&&vw(o))return r;if(o.requestStatus===1)return t=_w(n,e),r;{if(!navigator.onLine)throw pt.create("app-offline");const a=Ew(r);return t=ww(n,a),a}});return t?await t:i.authToken}async function _w(n,e){let t=await Ma(n.appConfig);for(;t.authToken.requestStatus===1;)await xd(100),t=await Ma(n.appConfig);const i=t.authToken;return i.requestStatus===0?co(n,e):i}function Ma(n){return as(n,e=>{if(!Ld(e))throw pt.create("not-registered");const t=e.authToken;return Iw(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function ww(n,e){try{const t=await gw(n,e),i=Object.assign(Object.assign({},e),{authToken:t});return await Ni(n.appConfig,i),t}catch(t){if(bd(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Nd(n.appConfig);else{const i=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Ni(n.appConfig,i)}throw t}}function Ld(n){return n!==void 0&&n.registrationStatus===2}function vw(n){return n.requestStatus===2&&!bw(n)}function bw(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+K_}function Ew(n){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},n),{authToken:e})}function Iw(n){return n.requestStatus===1&&n.requestTime+_d<Date.now()}/**
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
 */async function Tw(n){const e=n,{installationEntry:t,registrationPromise:i}=await lo(e);return i?i.catch(console.error):co(e).catch(console.error),t.fid}/**
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
 */async function kw(n,e=!1){const t=n;return await Sw(t),(await co(t,e)).token}async function Sw(n){const{registrationPromise:e}=await lo(n);e&&await e}/**
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
 */function xw(n){if(!n||!n.options)throw Ss("App Configuration");if(!n.name)throw Ss("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Ss(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Ss(n){return pt.create("missing-app-config-values",{valueName:n})}/**
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
 */const Od="installations",Cw="installations-internal",Aw=n=>{const e=n.getProvider("app").getImmediate(),t=xw(e),i=nt(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},Rw=n=>{const e=n.getProvider("app").getImmediate(),t=nt(e,Od).getImmediate();return{getId:()=>Tw(t),getToken:s=>kw(t,s)}};function Nw(){_e(new ue(Od,Aw,"PUBLIC")),_e(new ue(Cw,Rw,"PRIVATE"))}Nw();oe(yd,oo);oe(yd,oo,"esm2017");/**
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
 */const Pi="analytics",Pw="firebase_id",Lw="origin",Ow=60*1e3,Dw="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",uo="https://www.googletagmanager.com/gtag/js";/**
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
 */const ae=new Ui("@firebase/analytics");/**
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
 */const Mw={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},le=new yt("analytics","Analytics",Mw);/**
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
 */function $w(n){if(!n.startsWith(uo)){const e=le.create("invalid-gtag-resource",{gtagURL:n});return ae.warn(e.message),""}return n}function Dd(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function Fw(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function Bw(n,e){const t=Fw("firebase-js-sdk-policy",{createScriptURL:$w}),i=document.createElement("script"),s=`${uo}?l=${n}&id=${e}`;i.src=t?t==null?void 0:t.createScriptURL(s):s,i.async=!0,document.head.appendChild(i)}function Uw(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function jw(n,e,t,i,s,r){const o=i[s];try{if(o)await e[o];else{const l=(await Dd(t)).find(c=>c.measurementId===s);l&&await e[l.appId]}}catch(a){ae.error(a)}n("config",s,r)}async function Ww(n,e,t,i,s){try{let r=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const a=await Dd(t);for(const l of o){const c=a.find(u=>u.measurementId===l),d=c&&e[c.appId];if(d)r.push(d);else{r=[];break}}}r.length===0&&(r=Object.values(e)),await Promise.all(r),n("event",i,s||{})}catch(r){ae.error(r)}}function zw(n,e,t,i){async function s(r,...o){try{if(r==="event"){const[a,l]=o;await Ww(n,e,t,a,l)}else if(r==="config"){const[a,l]=o;await jw(n,e,t,i,a,l)}else if(r==="consent"){const[a,l]=o;n("consent",a,l)}else if(r==="get"){const[a,l,c]=o;n("get",a,l,c)}else if(r==="set"){const[a]=o;n("set",a)}else n(r,...o)}catch(a){ae.error(a)}}return s}function Hw(n,e,t,i,s){let r=function(...o){window[i].push(arguments)};return window[s]&&typeof window[s]=="function"&&(r=window[s]),window[s]=zw(r,n,e,t),{gtagCore:r,wrappedGtag:window[s]}}function Vw(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(uo)&&t.src.includes(n))return t;return null}/**
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
 */const qw=30,Gw=1e3;class Kw{constructor(e={},t=Gw){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Md=new Kw;function Yw(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function Qw(n){var e;const{appId:t,apiKey:i}=n,s={method:"GET",headers:Yw(i)},r=Dw.replace("{app-id}",t),o=await fetch(r,s);if(o.status!==200&&o.status!==304){let a="";try{const l=await o.json();!((e=l.error)===null||e===void 0)&&e.message&&(a=l.error.message)}catch{}throw le.create("config-fetch-failed",{httpStatus:o.status,responseMessage:a})}return o.json()}async function Jw(n,e=Md,t){const{appId:i,apiKey:s,measurementId:r}=n.options;if(!i)throw le.create("no-app-id");if(!s){if(r)return{measurementId:r,appId:i};throw le.create("no-api-key")}const o=e.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new ev;return setTimeout(async()=>{a.abort()},Ow),$d({appId:i,apiKey:s,measurementId:r},o,a,e)}async function $d(n,{throttleEndTimeMillis:e,backoffCount:t},i,s=Md){var r;const{appId:o,measurementId:a}=n;try{await Xw(i,e)}catch(l){if(a)return ae.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:o,measurementId:a};throw l}try{const l=await Qw(n);return s.deleteThrottleMetadata(o),l}catch(l){const c=l;if(!Zw(c)){if(s.deleteThrottleMetadata(o),a)return ae.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:o,measurementId:a};throw l}const d=Number((r=c==null?void 0:c.customData)===null||r===void 0?void 0:r.httpStatus)===503?vo(t,s.intervalMillis,qw):vo(t,s.intervalMillis),u={throttleEndTimeMillis:Date.now()+d,backoffCount:t+1};return s.setThrottleMetadata(o,u),ae.debug(`Calling attemptFetch again in ${d} millis`),$d(n,u,i,s)}}function Xw(n,e){return new Promise((t,i)=>{const s=Math.max(e-Date.now(),0),r=setTimeout(t,s);n.addEventListener(()=>{clearTimeout(r),i(le.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Zw(n){if(!(n instanceof ve)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class ev{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function tv(n,e,t,i,s){if(s&&s.global){n("event",t,i);return}else{const r=await e,o=Object.assign(Object.assign({},i),{send_to:r});n("event",t,o)}}/**
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
 */async function nv(){if(fl())try{await pl()}catch(n){return ae.warn(le.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return ae.warn(le.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function iv(n,e,t,i,s,r,o){var a;const l=Jw(n);l.then(f=>{t[f.measurementId]=f.appId,n.options.measurementId&&f.measurementId!==n.options.measurementId&&ae.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${f.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(f=>ae.error(f)),e.push(l);const c=nv().then(f=>{if(f)return i.getId()}),[d,u]=await Promise.all([l,c]);Vw(r)||Bw(r,d.measurementId),s("js",new Date);const h=(a=o==null?void 0:o.config)!==null&&a!==void 0?a:{};return h[Lw]="firebase",h.update=!0,u!=null&&(h[Pw]=u),s("config",d.measurementId,h),d.measurementId}/**
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
 */class sv{constructor(e){this.app=e}_delete(){return delete gn[this.app.options.appId],Promise.resolve()}}let gn={},$a=[];const Fa={};let xs="dataLayer",rv="gtag",Ba,Fd,Ua=!1;function ov(){const n=[];if(ul()&&n.push("This is a browser extension environment."),Tu()||n.push("Cookies are not available."),n.length>0){const e=n.map((i,s)=>`(${s+1}) ${i}`).join(" "),t=le.create("invalid-analytics-context",{errorInfo:e});ae.warn(t.message)}}function av(n,e,t){ov();const i=n.options.appId;if(!i)throw le.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)ae.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw le.create("no-api-key");if(gn[i]!=null)throw le.create("already-exists",{id:i});if(!Ua){Uw(xs);const{wrappedGtag:r,gtagCore:o}=Hw(gn,$a,Fa,xs,rv);Fd=r,Ba=o,Ua=!0}return gn[i]=iv(n,$a,Fa,e,Ba,xs,t),new sv(n)}function lv(n=ji()){n=q(n);const e=nt(n,Pi);return e.isInitialized()?e.getImmediate():cv(n)}function cv(n,e={}){const t=nt(n,Pi);if(t.isInitialized()){const s=t.getImmediate();if(wn(e,t.getOptions()))return s;throw le.create("already-initialized")}return t.initialize({options:e})}function dv(n,e,t,i){n=q(n),tv(Fd,gn[n.app.options.appId],e,t,i).catch(s=>ae.error(s))}const ja="@firebase/analytics",Wa="0.10.8";function uv(){_e(new ue(Pi,(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return av(i,s,t)},"PUBLIC")),_e(new ue("analytics-internal",n,"PRIVATE")),oe(ja,Wa),oe(ja,Wa,"esm2017");function n(e){try{const t=e.getProvider(Pi).getImmediate();return{logEvent:(i,s,r)=>dv(t,i,s,r)}}catch(t){throw le.create("interop-component-reg-failed",{reason:t})}}}uv();const hv={apiKey:"AIzaSyAhmJ3_2V0OOP26nZOMWMOyTDePiyI01Yk",authDomain:"diar-shahama-1088b.firebaseapp.com",projectId:"diar-shahama-1088b",storageBucket:"diar-shahama-1088b.appspot.com",messagingSenderId:"887214900924",appId:"1:887214900924:web:0a265e755c852f0113b2b9",measurementId:"G-HB41E2SHWR",databaseURL:"https://diar-shahama-1088b-default-rtdb.firebaseio.com"},ls=wl(hv),z=ng(ls),Li=g_(ls);z_(ls);lv(ls);function Jn(n){if(typeof n!="string"||!n)throw new Error("expected a non-empty string, got: "+n)}function Cs(n){if(typeof n!="number")throw new Error("expected a number, got: "+n)}const fv=1,pv=1,It="emoji",Vt="keyvalue",ho="favorites",mv="tokens",Bd="tokens",gv="unicode",Ud="count",yv="group",_v="order",jd="group-order",ar="eTag",Oi="url",za="skinTone",en="readonly",fo="readwrite",Wd="skinUnicodes",wv="skinUnicodes",vv="https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json",bv="en";function Ev(n,e){const t=new Set,i=[];for(const s of n){const r=e(s);t.has(r)||(t.add(r),i.push(s))}return i}function Ha(n){return Ev(n,e=>e.unicode)}function Iv(n){function e(t,i,s){const r=i?n.createObjectStore(t,{keyPath:i}):n.createObjectStore(t);if(s)for(const[o,[a,l]]of Object.entries(s))r.createIndex(o,a,{multiEntry:l});return r}e(Vt),e(It,gv,{[Bd]:[mv,!0],[jd]:[[yv,_v]],[Wd]:[wv,!0]}),e(ho,void 0,{[Ud]:[""]})}const lr={},ri={},Di={};function zd(n,e,t){t.onerror=()=>e(t.error),t.onblocked=()=>e(new Error("IDB blocked")),t.onsuccess=()=>n(t.result)}async function Tv(n){const e=await new Promise((t,i)=>{const s=indexedDB.open(n,fv);lr[n]=s,s.onupgradeneeded=r=>{r.oldVersion<pv&&Iv(s.result)},zd(t,i,s)});return e.onclose=()=>po(n),e}function kv(n){return ri[n]||(ri[n]=Tv(n)),ri[n]}function Ue(n,e,t,i){return new Promise((s,r)=>{const o=n.transaction(e,t,{durability:"relaxed"}),a=typeof e=="string"?o.objectStore(e):e.map(c=>o.objectStore(c));let l;i(a,o,c=>{l=c}),o.oncomplete=()=>s(l),o.onerror=()=>r(o.error)})}function po(n){const e=lr[n],t=e&&e.result;if(t){t.close();const i=Di[n];if(i)for(const s of i)s()}delete lr[n],delete ri[n],delete Di[n]}function Sv(n){return new Promise((e,t)=>{po(n);const i=indexedDB.deleteDatabase(n);zd(e,t,i)})}function xv(n,e){let t=Di[n];t||(t=Di[n]=[]),t.push(e)}const Cv=new Set([":D","XD",":'D","O:)",":X",":P",";P","XP",":L",":Z",":j","8D","XO","8)",":B",":O",":S",":'o","Dx","X(","D:",":C",">0)",":3","</3","<3","\\M/",":E","8#"]);function Mt(n){return n.split(/[\s_]+/).map(e=>!e.match(/\w/)||Cv.has(e)?e.toLowerCase():e.replace(/[)(:,]/g,"").replace(/’/g,"'").toLowerCase()).filter(Boolean)}const Av=2;function Hd(n){return n.filter(Boolean).map(e=>e.toLowerCase()).filter(e=>e.length>=Av)}function Rv(n){return n.map(({annotation:t,emoticon:i,group:s,order:r,shortcodes:o,skins:a,tags:l,emoji:c,version:d})=>{const u=[...new Set(Hd([...(o||[]).map(Mt).flat(),...(l||[]).map(Mt).flat(),...Mt(t),i]))].sort(),h={annotation:t,group:s,order:r,tags:l,tokens:u,unicode:c,version:d};if(i&&(h.emoticon=i),o&&(h.shortcodes=o),a){h.skinTones=[],h.skinUnicodes=[],h.skinVersions=[];for(const{tone:f,emoji:p,version:_}of a)h.skinTones.push(f),h.skinUnicodes.push(p),h.skinVersions.push(_)}return h})}function Vd(n,e,t,i){n[e](t).onsuccess=s=>i&&i(s.target.result)}function gt(n,e,t){Vd(n,"get",e,t)}function qd(n,e,t){Vd(n,"getAll",e,t)}function mo(n){n.commit&&n.commit()}function Nv(n,e){let t=n[0];for(let i=1;i<n.length;i++){const s=n[i];e(t)>e(s)&&(t=s)}return t}function Gd(n,e){const t=Nv(n,s=>s.length),i=[];for(const s of t)n.some(r=>r.findIndex(o=>e(o)===e(s))===-1)||i.push(s);return i}async function Pv(n){return!await go(n,Vt,Oi)}async function Lv(n,e,t){const[i,s]=await Promise.all([ar,Oi].map(r=>go(n,Vt,r)));return i===t&&s===e}async function Ov(n,e){return Ue(n,It,en,(i,s,r)=>{let o;const a=()=>{i.getAll(o&&IDBKeyRange.lowerBound(o,!0),50).onsuccess=l=>{const c=l.target.result;for(const d of c)if(o=d.unicode,e(d))return r(d);if(c.length<50)return r();a()}};a()})}async function Kd(n,e,t,i){try{const s=Rv(e);await Ue(n,[It,Vt],fo,([r,o],a)=>{let l,c,d=0;function u(){++d===2&&h()}function h(){if(!(l===i&&c===t)){r.clear();for(const f of s)r.put(f);o.put(i,ar),o.put(t,Oi),mo(a)}}gt(o,ar,f=>{l=f,u()}),gt(o,Oi,f=>{c=f,u()})})}finally{}}async function Dv(n,e){return Ue(n,It,en,(t,i,s)=>{const r=IDBKeyRange.bound([e,0],[e+1,0],!1,!0);qd(t.index(jd),r,s)})}async function Yd(n,e){const t=Hd(Mt(e));return t.length?Ue(n,It,en,(i,s,r)=>{const o=[],a=()=>{o.length===t.length&&l()},l=()=>{const c=Gd(o,d=>d.unicode);r(c.sort((d,u)=>d.order<u.order?-1:1))};for(let c=0;c<t.length;c++){const d=t[c],u=c===t.length-1?IDBKeyRange.bound(d,d+"￿",!1,!0):IDBKeyRange.only(d);qd(i.index(Bd),u,h=>{o.push(h),a()})}}):[]}async function Mv(n,e){const t=await Yd(n,e);return t.length?t.filter(i=>(i.shortcodes||[]).map(r=>r.toLowerCase()).includes(e.toLowerCase()))[0]||null:await Ov(n,s=>(s.shortcodes||[]).includes(e.toLowerCase()))||null}async function $v(n,e){return Ue(n,It,en,(t,i,s)=>gt(t,e,r=>{if(r)return s(r);gt(t.index(Wd),e,o=>s(o||null))}))}function go(n,e,t){return Ue(n,e,en,(i,s,r)=>gt(i,t,r))}function Fv(n,e,t,i){return Ue(n,e,fo,(s,r)=>{s.put(i,t),mo(r)})}function Bv(n,e){return Ue(n,ho,fo,(t,i)=>gt(t,e,s=>{t.put((s||0)+1,e),mo(i)}))}function Uv(n,e,t){return t===0?[]:Ue(n,[ho,It],en,([i,s],r,o)=>{const a=[];i.index(Ud).openCursor(void 0,"prev").onsuccess=l=>{const c=l.target.result;if(!c)return o(a);function d(f){if(a.push(f),a.length===t)return o(a);c.continue()}const u=c.primaryKey,h=e.byName(u);if(h)return d(h);gt(s,u,f=>{if(f)return d(f);c.continue()})}})}const Xn="";function jv(n,e){const t=new Map;for(const s of n){const r=e(s);for(const o of r){let a=t;for(let c=0;c<o.length;c++){const d=o.charAt(c);let u=a.get(d);u||(u=new Map,a.set(d,u)),a=u}let l=a.get(Xn);l||(l=[],a.set(Xn,l)),l.push(s)}}return(s,r)=>{let o=t;for(let c=0;c<s.length;c++){const d=s.charAt(c),u=o.get(d);if(u)o=u;else return[]}if(r)return o.get(Xn)||[];const a=[],l=[o];for(;l.length;){const d=[...l.shift().entries()].sort((u,h)=>u[0]<h[0]?-1:1);for(const[u,h]of d)u===Xn?a.push(...h):l.push(h)}return a}}const Wv=["name","url"];function zv(n){const e=n&&Array.isArray(n),t=e&&n.length&&(!n[0]||Wv.some(i=>!(i in n[0])));if(!e||t)throw new Error("Custom emojis are in the wrong format")}function Va(n){zv(n);const e=(h,f)=>h.name.toLowerCase()<f.name.toLowerCase()?-1:1,t=n.sort(e),s=jv(n,h=>{const f=new Set;if(h.shortcodes)for(const p of h.shortcodes)for(const _ of Mt(p))f.add(_);return f}),r=h=>s(h,!0),o=h=>s(h,!1),a=h=>{const f=Mt(h),p=f.map((_,b)=>(b<f.length-1?r:o)(_));return Gd(p,_=>_.name).sort(e)},l=new Map,c=new Map;for(const h of n){c.set(h.name.toLowerCase(),h);for(const f of h.shortcodes||[])l.set(f.toLowerCase(),h)}return{all:t,search:a,byShortcode:h=>l.get(h.toLowerCase()),byName:h=>c.get(h.toLowerCase())}}const Hv=typeof wrappedJSObject<"u";function an(n){if(!n)return n;if(Hv&&(n=structuredClone(n)),delete n.tokens,n.skinTones){const e=n.skinTones.length;n.skins=Array(e);for(let t=0;t<e;t++)n.skins[t]={tone:n.skinTones[t],unicode:n.skinUnicodes[t],version:n.skinVersions[t]};delete n.skinTones,delete n.skinUnicodes,delete n.skinVersions}return n}function Qd(n){n||console.warn("emoji-picker-element is more efficient if the dataSource server exposes an ETag header.")}const Vv=["annotation","emoji","group","order","version"];function qv(n){if(!n||!Array.isArray(n)||!n[0]||typeof n[0]!="object"||Vv.some(e=>!(e in n[0])))throw new Error("Emoji data is in the wrong format")}function Jd(n,e){if(Math.floor(n.status/100)!==2)throw new Error("Failed to fetch: "+e+":  "+n.status)}async function Gv(n){const e=await fetch(n,{method:"HEAD"});Jd(e,n);const t=e.headers.get("etag");return Qd(t),t}async function cr(n){const e=await fetch(n);Jd(e,n);const t=e.headers.get("etag");Qd(t);const i=await e.json();return qv(i),[t,i]}function Kv(n){for(var e="",t=new Uint8Array(n),i=t.byteLength,s=-1;++s<i;)e+=String.fromCharCode(t[s]);return e}function Yv(n){for(var e=n.length,t=new ArrayBuffer(e),i=new Uint8Array(t),s=-1;++s<e;)i[s]=n.charCodeAt(s);return t}async function Xd(n){const e=JSON.stringify(n);let t=Yv(e);const i=await crypto.subtle.digest("SHA-1",t),s=Kv(i);return btoa(s)}async function Qv(n,e){let t,i=await Gv(e);if(!i){const s=await cr(e);i=s[0],t=s[1],i||(i=await Xd(t))}await Lv(n,e,i)||(t||(t=(await cr(e))[1]),await Kd(n,t,e,i))}async function Jv(n,e){let[t,i]=await cr(e);t||(t=await Xd(i)),await Kd(n,i,e,t)}async function Xv(n,e){try{await Qv(n,e)}catch(t){if(t.name!=="InvalidStateError")throw t}}class Zv{constructor({dataSource:e=vv,locale:t=bv,customEmoji:i=[]}={}){this.dataSource=e,this.locale=t,this._dbName=`emoji-picker-element-${this.locale}`,this._db=void 0,this._lazyUpdate=void 0,this._custom=Va(i),this._clear=this._clear.bind(this),this._ready=this._init()}async _init(){const e=this._db=await kv(this._dbName);xv(this._dbName,this._clear);const t=this.dataSource;await Pv(e)?await Jv(e,t):this._lazyUpdate=Xv(e,t)}async ready(){const e=async()=>(this._ready||(this._ready=this._init()),this._ready);await e(),this._db||await e()}async getEmojiByGroup(e){return Cs(e),await this.ready(),Ha(await Dv(this._db,e)).map(an)}async getEmojiBySearchQuery(e){Jn(e),await this.ready();const t=this._custom.search(e),i=Ha(await Yd(this._db,e)).map(an);return[...t,...i]}async getEmojiByShortcode(e){Jn(e),await this.ready();const t=this._custom.byShortcode(e);return t||an(await Mv(this._db,e))}async getEmojiByUnicodeOrName(e){Jn(e),await this.ready();const t=this._custom.byName(e);return t||an(await $v(this._db,e))}async getPreferredSkinTone(){return await this.ready(),await go(this._db,Vt,za)||0}async setPreferredSkinTone(e){return Cs(e),await this.ready(),Fv(this._db,Vt,za,e)}async incrementFavoriteEmojiCount(e){return Jn(e),await this.ready(),Bv(this._db,e)}async getTopFavoriteEmoji(e){return Cs(e),await this.ready(),(await Uv(this._db,this._custom,e)).map(an)}set customEmoji(e){this._custom=Va(e)}get customEmoji(){return this._custom.all}async _shutdown(){await this.ready();try{await this._lazyUpdate}catch{}}_clear(){this._db=this._ready=this._lazyUpdate=void 0}async close(){await this._shutdown(),await po(this._dbName)}async delete(){await this._shutdown(),await Sv(this._dbName)}}const dr=[[-1,"✨","custom"],[0,"😀","smileys-emotion"],[1,"👋","people-body"],[3,"🐱","animals-nature"],[4,"🍎","food-drink"],[5,"🏠️","travel-places"],[6,"⚽","activities"],[7,"📝","objects"],[8,"⛔️","symbols"],[9,"🏁","flags"]].map(([n,e,t])=>({id:n,emoji:e,name:t})),As=dr.slice(1),eb=2,qa=6,Zd=typeof requestIdleCallback=="function"?requestIdleCallback:setTimeout;function Ga(n){return n.unicode.includes("‍")}const tb={"🫪":17,"🫩":16,"🫨":15.1,"🫠":14,"🥲":13.1,"🥻":12.1,"🥰":11,"🤩":5,"👱‍♀️":4,"🤣":3,"👁️‍🗨️":2,"😀":1,"😐️":.7,"😃":.6},nb=1e3,ib="🖐️",sb=8,rb=["😊","😒","❤️","👍️","😍","😂","😭","☺️","😔","😩","😏","💕","🙌","😘"],eu='"Twemoji Mozilla","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji","EmojiOne Color","Android Emoji",sans-serif',ob=(n,e)=>n<e?-1:n>e?1:0,Ka=(n,e)=>{const t=document.createElement("canvas");t.width=t.height=1;const i=t.getContext("2d",{willReadFrequently:!0});return i.textBaseline="top",i.font=`100px ${eu}`,i.fillStyle=e,i.scale(.01,.01),i.fillText(n,0,0),i.getImageData(0,0,1,1).data},ab=(n,e)=>{const t=[...n].join(","),i=[...e].join(",");return t===i&&!t.startsWith("0,0,0,")};function lb(n){const e=Ka(n,"#000"),t=Ka(n,"#fff");return e&&t&&ab(e,t)}function cb(){const n=Object.entries(tb);try{for(const[e,t]of n)if(lb(e))return t}catch{}finally{}return n[0][1]}let Rs;const Ns=()=>(Rs||(Rs=new Promise(n=>Zd(()=>n(cb())))),Rs),ur=new Map,db="️",ub="\uD83C",hb="‍",fb=127995,pb=57339;function mb(n,e){if(e===0)return n;const t=n.indexOf(hb);return t!==-1?n.substring(0,t)+String.fromCodePoint(fb+e-1)+n.substring(t):(n.endsWith(db)&&(n=n.substring(0,n.length-1)),n+ub+String.fromCodePoint(pb+e-1))}function Ee(n){n.preventDefault(),n.stopPropagation()}function Ps(n,e,t){return e+=n?-1:1,e<0?e=t.length-1:e>=t.length&&(e=0),e}function tu(n,e){const t=new Set,i=[];for(const s of n){const r=e(s);t.has(r)||(t.add(r),i.push(s))}return i}function gb(n,e){const t=i=>{const s={};for(const r of i)typeof r.tone=="number"&&r.version<=e&&(s[r.tone]=r.unicode);return s};return n.map(({unicode:i,skins:s,shortcodes:r,url:o,name:a,category:l,annotation:c})=>({unicode:i,name:a,shortcodes:r,url:o,category:l,annotation:c,id:i||a,skins:s&&t(s)}))}const oi=requestAnimationFrame;let yb=typeof ResizeObserver=="function";function _b(n,e,t){let i;yb?(i=new ResizeObserver(t),i.observe(n)):oi(t),e.addEventListener("abort",()=>{i&&i.disconnect()})}function Ya(n){{const e=document.createRange();return e.selectNode(n.firstChild),e.getBoundingClientRect().width}}const wb="😀";let Ls,st;function Qa(n,e,t){const i=Ya(e);if(!i){if(!st){st=t.cloneNode(!0);const s=getComputedStyle(t);for(const r of["font-family","line-height","width","height","font-size","display","align-items","justify-content"])st.style.setProperty(r,s.getPropertyValue(r),"important")}try{return document.body.appendChild(st),st.firstChild.nodeValue=n,Ya(st)}finally{st.remove()}}return i}function vb(n,e,t){let i=!0;for(const s of n){const r=t(s);if(!r)continue;typeof Ls>"u"&&(Ls=Qa(wb,e,e));const a=Qa(s.unicode,r,e)/1.8<Ls;ur.set(s.unicode,a),a||(i=!1)}return i}function bb(n){return tu(n,e=>e)}function Eb(n){n&&(n.scrollTop=0)}function yn(n,e,t){let i=n.get(e);return i||(i=t(),n.set(e,i)),i}function Ja(n){return""+n}function Ib(n){const e=document.createElement("template");return e.innerHTML=n,e}const Tb=new WeakMap,kb=new WeakMap,Sb=Symbol("un-keyed"),xb="replaceChildren"in Element.prototype;function Cb(n,e){xb?n.replaceChildren(...e):(n.innerHTML="",n.append(...e))}function Ab(n,e){let t=n.firstChild,i=0;for(;t;){if(e[i]!==t)return!0;t=t.nextSibling,i++}return i!==e.length}function Rb(n,e){const{targetNode:t}=e;let{targetParentNode:i}=e,s=!1;i?s=Ab(i,n):(s=!0,e.targetNode=void 0,e.targetParentNode=i=t.parentNode),s&&Cb(i,n)}function Nb(n,e){for(const t of e){const{targetNode:i,currentExpression:s,binding:{expressionIndex:r,attributeName:o,attributeValuePre:a,attributeValuePost:l}}=t,c=n[r];if(s!==c)if(t.currentExpression=c,o)if(c===null)i.removeAttribute(o);else{const d=a+Ja(c)+l;i.setAttribute(o,d)}else{let d;Array.isArray(c)?Rb(c,t):c instanceof Element?(d=c,i.replaceWith(d)):i.nodeValue=Ja(c),d&&(t.targetNode=d)}}}function Pb(n){let e="",t=!1,i=!1,s=-1;const r=new Map,o=[];let a=0;for(let c=0,d=n.length;c<d;c++){const u=n[c];if(e+=u.slice(a),c===d-1)break;for(let m=0;m<u.length;m++)switch(u.charAt(m)){case"<":{u.charAt(m+1)==="/"?o.pop():(t=!0,o.push(++s));break}case">":{t=!1,i=!1;break}case"=":{i=!0;break}}const h=o[o.length-1],f=yn(r,h,()=>[]);let p,_,b;if(i){const m=/(\S+)="?([^"=]*)$/.exec(u);p=m[1],_=m[2];const w=/^([^">]*)("?)/.exec(n[c+1]);b=w[1],e=e.slice(0,-1*m[0].length),a=w[0].length}else a=0;const g={attributeName:p,attributeValuePre:_,attributeValuePost:b,expressionIndex:c};f.push(g),!t&&!i&&(e+=" ")}return{template:Ib(e),elementsToBindings:r}}function Xa(n,e,t){for(let i=0;i<n.length;i++){const s=n[i],r=s.attributeName?e:e.firstChild,o={binding:s,targetNode:r,targetParentNode:void 0,currentExpression:void 0};t.push(o)}}function Lb(n,e){const t=[];let i;if(e.size===1&&(i=e.get(0)))Xa(i,n,t);else{const s=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT);let r=n,o=-1;do{const a=e.get(++o);a&&Xa(a,r,t)}while(r=s.nextNode())}return t}function Ob(n){const{template:e,elementsToBindings:t}=yn(Tb,n,()=>Pb(n)),i=e.cloneNode(!0).content.firstElementChild,s=Lb(i,t);return function(o){return Nb(o,s),i}}function Db(n){const e=yn(kb,n,()=>new Map);let t=Sb;function i(r,...o){const a=yn(e,r,()=>new Map);return yn(a,t,()=>Ob(r))(o)}function s(r,o,a){return r.map((l,c)=>{const d=t;t=a(l);try{return o(l,c)}finally{t=d}})}return{map:s,html:i}}function Mb(n,e,t,i,s,r,o,a,l){const{labelWithSkin:c,titleForEmoji:d,unicodeWithSkin:u}=t,{html:h,map:f}=Db(e);function p(m,w,v){return f(m,(T,k)=>h`<button role="${w?"option":"menuitem"}" aria-selected="${w?k===e.activeSearchItem:null}" aria-label="${c(T,e.currentSkinTone)}" title="${d(T)}" class="${"emoji"+(w&&k===e.activeSearchItem?" active":"")+(T.unicode?"":" custom-emoji")}" id="${`${v}-${T.id}`}" style="${T.unicode?null:`--custom-emoji-background: url(${JSON.stringify(T.url)})`}">${T.unicode?u(T,e.currentSkinTone):""}</button>`,T=>`${v}-${T.id}`)}const b=h`<section data-ref="rootElement" class="picker" aria-label="${e.i18n.regionLabel}" style="${e.pickerStyle||""}"><div class="pad-top"></div><div class="search-row"><div class="search-wrapper"><input id="search" class="search" type="search" role="combobox" enterkeyhint="search" placeholder="${e.i18n.searchLabel}" autocapitalize="none" autocomplete="off" spellcheck="true" aria-expanded="${!!(e.searchMode&&e.currentEmojis.length)}" aria-controls="search-results" aria-describedby="search-description" aria-autocomplete="list" aria-activedescendant="${e.activeSearchItemId?`emo-${e.activeSearchItemId}`:null}" data-ref="searchElement" data-on-input="onSearchInput" data-on-keydown="onSearchKeydown"><label class="sr-only" for="search">${e.i18n.searchLabel}</label> <span id="search-description" class="sr-only">${e.i18n.searchDescription}</span></div><div class="skintone-button-wrapper ${e.skinTonePickerExpandedAfterAnimation?"expanded":""}"><button id="skintone-button" class="emoji ${e.skinTonePickerExpanded?"hide-focus":""}" aria-label="${e.skinToneButtonLabel}" title="${e.skinToneButtonLabel}" aria-describedby="skintone-description" aria-haspopup="listbox" aria-expanded="${e.skinTonePickerExpanded}" aria-controls="skintone-list" data-on-click="onClickSkinToneButton">${e.skinToneButtonText||""}</button></div><span id="skintone-description" class="sr-only">${e.i18n.skinToneDescription}</span><div data-ref="skinToneDropdown" id="skintone-list" class="skintone-list hide-focus ${e.skinTonePickerExpanded?"":"hidden no-animate"}" style="transform:translateY(${e.skinTonePickerExpanded?0:"calc(-1 * var(--num-skintones) * var(--total-emoji-size))"})" role="listbox" aria-label="${e.i18n.skinTonesLabel}" aria-activedescendant="skintone-${e.activeSkinTone}" aria-hidden="${!e.skinTonePickerExpanded}" tabIndex="-1" data-on-focusout="onSkinToneOptionsFocusOut" data-on-click="onSkinToneOptionsClick" data-on-keydown="onSkinToneOptionsKeydown" data-on-keyup="onSkinToneOptionsKeyup">${f(e.skinTones,(m,w)=>h`<div id="skintone-${w}" class="emoji ${w===e.activeSkinTone?"active":""}" aria-selected="${w===e.activeSkinTone}" role="option" title="${e.i18n.skinTones[w]}" aria-label="${e.i18n.skinTones[w]}">${m}</div>`,m=>m)}</div></div><div class="nav" role="tablist" style="grid-template-columns:repeat(${e.groups.length},1fr)" aria-label="${e.i18n.categoriesLabel}" data-on-keydown="onNavKeydown" data-on-click="onNavClick">${f(e.groups,m=>h`<button role="tab" class="nav-button" aria-controls="tab-${m.id}" aria-label="${e.i18n.categories[m.name]}" aria-selected="${!e.searchMode&&e.currentGroup.id===m.id}" title="${e.i18n.categories[m.name]}" data-group-id="${m.id}"><div class="nav-emoji emoji">${m.emoji}</div></button>`,m=>m.id)}</div><div class="indicator-wrapper"><div class="indicator" style="transform:translateX(${(e.isRtl?-1:1)*e.currentGroupIndex*100}%)"></div></div><div class="message ${e.message?"":"gone"}" role="alert" aria-live="polite">${e.message||""}</div><div data-ref="tabpanelElement" class="tabpanel ${!e.databaseLoaded||e.message?"gone":""}" role="${e.searchMode?"region":"tabpanel"}" aria-label="${e.searchMode?e.i18n.searchResultsLabel:e.i18n.categories[e.currentGroup.name]}" id="${e.searchMode?null:`tab-${e.currentGroup.id}`}" tabIndex="0" data-on-click="onEmojiClick"><div data-action="calculateEmojiGridStyle">${f(e.currentEmojisWithCategories,(m,w)=>h`<div><div id="menu-label-${w}" class="category ${e.currentEmojisWithCategories.length===1&&e.currentEmojisWithCategories[0].category===""?"gone":""}" aria-hidden="true">${e.searchMode?e.i18n.searchResultsLabel:m.category?m.category:e.currentEmojisWithCategories.length>1?e.i18n.categories.custom:e.i18n.categories[e.currentGroup.name]}</div><div class="emoji-menu ${w!==0&&!e.searchMode&&e.currentGroup.id===-1?"visibility-auto":""}" style="${`--num-rows: ${Math.ceil(m.emojis.length/e.numColumns)}`}" data-action="updateOnIntersection" role="${e.searchMode?"listbox":"menu"}" aria-labelledby="menu-label-${w}" id="${e.searchMode?"search-results":null}">${p(m.emojis,e.searchMode,"emo")}</div></div>`,m=>m.category)}</div></div><div class="favorites onscreen emoji-menu ${e.message?"gone":""}" role="menu" aria-label="${e.i18n.favoritesLabel}" data-on-click="onEmojiClick">${p(e.currentFavorites,!1,"fav")}</div><button data-ref="baselineEmoji" aria-hidden="true" tabindex="-1" class="abs-pos hidden emoji baseline-emoji">😀</button></section>`,g=(m,w)=>{for(const v of n.querySelectorAll(`[${m}]`))w(v,v.getAttribute(m))};if(l){n.appendChild(b);for(const m of["click","focusout","input","keydown","keyup"])g(`data-on-${m}`,(w,v)=>{w.addEventListener(m,i[v])});g("data-ref",(m,w)=>{r[w]=m}),o.addEventListener("abort",()=>{n.removeChild(b)})}g("data-action",(m,w)=>{let v=a.get(w);v||a.set(w,v=new WeakSet),v.has(m)||(v.add(m),s[w](m))})}const Mi=typeof queueMicrotask=="function"?queueMicrotask:n=>Promise.resolve().then(n);function $b(n){let e=!1,t;const i=new Map,s=new Set;let r;const o=()=>{if(e)return;const c=[...s];s.clear();try{for(const d of c)d()}finally{r=!1,s.size&&(r=!0,Mi(o))}},a=new Proxy({},{get(c,d){if(t){let u=i.get(d);u||(u=new Set,i.set(d,u)),u.add(t)}return c[d]},set(c,d,u){if(c[d]!==u){c[d]=u;const h=i.get(d);if(h){for(const f of h)s.add(f);r||(r=!0,Mi(o))}}return!0}}),l=c=>{const d=()=>{const u=t;t=d;try{return c()}finally{t=u}};return d()};return n.addEventListener("abort",()=>{e=!0}),{state:a,createEffect:l}}function Os(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++)if(!t(n[i],e[i]))return!1;return!0}const Za=new WeakMap;function Fb(n,e,t){{const i=n.closest(".tabpanel");let s=Za.get(i);s||(s=new IntersectionObserver(t,{root:i,rootMargin:"50% 0px 50% 0px",threshold:0}),Za.set(i,s),e.addEventListener("abort",()=>{s.disconnect()})),s.observe(n)}}const Ds=[],{assign:Zn}=Object;function Bb(n,e){const t={},i=new AbortController,s=i.signal,{state:r,createEffect:o}=$b(s),a=new Map;Zn(r,{skinToneEmoji:void 0,i18n:void 0,database:void 0,customEmoji:void 0,customCategorySorting:void 0,emojiVersion:void 0}),Zn(r,e),Zn(r,{initialLoad:!0,currentEmojis:[],currentEmojisWithCategories:[],rawSearchText:"",searchText:"",searchMode:!1,activeSearchItem:-1,message:void 0,skinTonePickerExpanded:!1,skinTonePickerExpandedAfterAnimation:!1,currentSkinTone:0,activeSkinTone:0,skinToneButtonText:void 0,pickerStyle:void 0,skinToneButtonLabel:"",skinTones:[],currentFavorites:[],defaultFavoriteEmojis:void 0,numColumns:sb,isRtl:!1,currentGroupIndex:0,groups:As,databaseLoaded:!1,activeSearchItemId:void 0}),o(()=>{r.currentGroup!==r.groups[r.currentGroupIndex]&&(r.currentGroup=r.groups[r.currentGroupIndex])});const l=y=>{n.getElementById(y).focus()},c=y=>n.getElementById(`emo-${y.id}`),d=(y,I)=>{t.rootElement.dispatchEvent(new CustomEvent(y,{detail:I,bubbles:!0,composed:!0}))},u=(y,I)=>y.id===I.id,h=(y,I)=>{const{category:A,emojis:O}=y,{category:X,emojis:te}=I;return A!==X?!1:Os(O,te,u)},f=y=>{Os(r.currentEmojis,y,u)||(r.currentEmojis=y)},p=y=>{r.searchMode!==y&&(r.searchMode=y)},_=y=>{Os(r.currentEmojisWithCategories,y,h)||(r.currentEmojisWithCategories=y)},b=(y,I)=>I&&y.skins&&y.skins[I]||y.unicode,w={labelWithSkin:(y,I)=>bb([y.name||b(y,I),y.annotation,...y.shortcodes||Ds].filter(Boolean)).join(", "),titleForEmoji:y=>y.annotation||(y.shortcodes||Ds).join(", "),unicodeWithSkin:b},v={onClickSkinToneButton:lu,onEmojiClick:ou,onNavClick:Hn,onNavKeydown:St,onSearchKeydown:kt,onSkinToneOptionsClick:au,onSkinToneOptionsFocusOut:uu,onSkinToneOptionsKeydown:cu,onSkinToneOptionsKeyup:du,onSearchInput:hu},T={calculateEmojiGridStyle:x,updateOnIntersection:K};let k=!0;o(()=>{Mb(n,r,w,v,T,t,s,a,k),k=!1}),r.emojiVersion||Ns().then(y=>{y||(r.message=r.i18n.emojiUnsupportedMessage)}),o(()=>{async function y(){let I=!1;const A=setTimeout(()=>{I=!0,r.message=r.i18n.loadingMessage},nb);try{await r.database.ready(),r.databaseLoaded=!0}catch(O){console.error(O),r.message=r.i18n.networkErrorMessage}finally{clearTimeout(A),I&&(I=!1,r.message="")}}r.database&&y()}),o(()=>{r.pickerStyle=`
      --num-groups: ${r.groups.length}; 
      --indicator-opacity: ${r.searchMode?0:1}; 
      --num-skintones: ${qa};`}),o(()=>{r.customEmoji&&r.database&&R()}),o(()=>{r.customEmoji&&r.customEmoji.length?r.groups!==dr&&(r.groups=dr):r.groups!==As&&(r.currentGroupIndex&&r.currentGroupIndex--,r.groups=As)}),o(()=>{async function y(){r.databaseLoaded&&(r.currentSkinTone=await r.database.getPreferredSkinTone())}y()}),o(()=>{r.skinTones=Array(qa).fill().map((y,I)=>mb(r.skinToneEmoji,I))}),o(()=>{r.skinToneButtonText=r.skinTones[r.currentSkinTone]}),o(()=>{r.skinToneButtonLabel=r.i18n.skinToneLabel.replace("{skinTone}",r.i18n.skinTones[r.currentSkinTone])}),o(()=>{async function y(){const{database:I}=r,A=(await Promise.all(rb.map(O=>I.getEmojiByUnicodeOrName(O)))).filter(Boolean);r.defaultFavoriteEmojis=A}r.databaseLoaded&&y()});function R(){const{customEmoji:y,database:I}=r,A=y||Ds;I.customEmoji!==A&&(I.customEmoji=A)}o(()=>{async function y(){R();const{database:I,defaultFavoriteEmojis:A,numColumns:O}=r,X=await I.getTopFavoriteEmoji(O),te=await H(tu([...X,...A],fe=>fe.unicode||fe.name).slice(0,O));r.currentFavorites=te}r.databaseLoaded&&r.defaultFavoriteEmojis&&y()});function x(y){_b(y,s,()=>{{const I=getComputedStyle(t.rootElement),A=parseInt(I.getPropertyValue("--num-columns"),10),O=I.getPropertyValue("direction")==="rtl";r.numColumns=A,r.isRtl=O}})}function K(y){Fb(y,s,I=>{for(const{target:A,isIntersecting:O}of I)A.classList.toggle("onscreen",O)})}o(()=>{async function y(){const{searchText:I,currentGroup:A,databaseLoaded:O,customEmoji:X}=r;if(!O)r.currentEmojis=[],r.searchMode=!1;else if(I.length>=eb){const te=await tn(I);r.searchText===I&&(f(te),p(!0))}else{const{id:te}=A;if(te!==-1||X&&X.length){const fe=await zn(te);r.currentGroup.id===te&&(f(fe),p(!1))}}}y()});const he=()=>{oi(()=>Eb(t.tabpanelElement))};o(()=>{const{currentEmojis:y,emojiVersion:I}=r,A=y.filter(O=>O.unicode).filter(O=>Ga(O)&&!ur.has(O.unicode));if(!I&&A.length)f(y),oi(()=>Tt(A));else{const O=I?y:y.filter(Ce);f(O),he()}});function Tt(y){vb(y,t.baselineEmoji,c)?he():r.currentEmojis=[...r.currentEmojis]}function Ce(y){return!y.unicode||!Ga(y)||ur.get(y.unicode)}async function je(y){const I=r.emojiVersion||await Ns();return y.filter(({version:A})=>!A||A<=I)}async function H(y){return gb(y,r.emojiVersion||await Ns())}async function zn(y){const I=y===-1?r.customEmoji:await r.database.getEmojiByGroup(y);return H(await je(I))}async function tn(y){return H(await je(await r.database.getEmojiBySearchQuery(y)))}o(()=>{}),o(()=>{function y(){const{searchMode:A,currentEmojis:O}=r;if(A)return[{category:"",emojis:O}];const X=new Map;for(const te of O){const fe=te.category||"";let qn=X.get(fe);qn||(qn=[],X.set(fe,qn)),qn.push(te)}return[...X.entries()].map(([te,fe])=>({category:te,emojis:fe})).sort((te,fe)=>r.customCategorySorting(te.category,fe.category))}const I=y();_(I)}),o(()=>{r.activeSearchItemId=r.activeSearchItem!==-1&&r.currentEmojis[r.activeSearchItem].id}),o(()=>{const{rawSearchText:y}=r;Zd(()=>{r.searchText=(y||"").trim(),r.activeSearchItem=-1})});function kt(y){if(!r.searchMode||!r.currentEmojis.length)return;const I=A=>{Ee(y),r.activeSearchItem=Ps(A,r.activeSearchItem,r.currentEmojis)};switch(y.key){case"ArrowDown":return I(!1);case"ArrowUp":return I(!0);case"Enter":if(r.activeSearchItem===-1)r.activeSearchItem=0;else return Ee(y),Vn(r.currentEmojis[r.activeSearchItem].id)}}function Hn(y){const{target:I}=y,A=I.closest(".nav-button");if(!A)return;const O=parseInt(A.dataset.groupId,10);t.searchElement.value="",r.rawSearchText="",r.searchText="",r.activeSearchItem=-1,r.currentGroupIndex=r.groups.findIndex(X=>X.id===O)}function St(y){const{target:I,key:A}=y,O=X=>{X&&(Ee(y),X.focus())};switch(A){case"ArrowLeft":return O(I.previousElementSibling);case"ArrowRight":return O(I.nextElementSibling);case"Home":return O(I.parentElement.firstElementChild);case"End":return O(I.parentElement.lastElementChild)}}async function xt(y){const I=await r.database.getEmojiByUnicodeOrName(y),A=[...r.currentEmojis,...r.currentFavorites].find(X=>X.id===y),O=A.unicode&&b(A,r.currentSkinTone);return await r.database.incrementFavoriteEmojiCount(y),{emoji:I,skinTone:r.currentSkinTone,...O&&{unicode:O},...A.name&&{name:A.name}}}async function Vn(y){const I=xt(y);d("emoji-click-sync",I),d("emoji-click",await I)}function ou(y){const{target:I}=y;if(!I.classList.contains("emoji"))return;Ee(y);const A=I.id.substring(4);Vn(A)}function cs(y){r.currentSkinTone=y,r.skinTonePickerExpanded=!1,l("skintone-button"),d("skin-tone-change",{skinTone:y}),r.database.setPreferredSkinTone(y)}function au(y){const{target:{id:I}}=y,A=I&&I.match(/^skintone-(\d)/);if(!A)return;Ee(y);const O=parseInt(A[1],10);cs(O)}function lu(y){r.skinTonePickerExpanded=!r.skinTonePickerExpanded,r.activeSkinTone=r.currentSkinTone,r.skinTonePickerExpanded&&(Ee(y),oi(()=>l("skintone-list")))}o(()=>{r.skinTonePickerExpanded?t.skinToneDropdown.addEventListener("transitionend",()=>{r.skinTonePickerExpandedAfterAnimation=!0},{once:!0}):r.skinTonePickerExpandedAfterAnimation=!1});function cu(y){if(!r.skinTonePickerExpanded)return;const I=async A=>{Ee(y),r.activeSkinTone=A};switch(y.key){case"ArrowUp":return I(Ps(!0,r.activeSkinTone,r.skinTones));case"ArrowDown":return I(Ps(!1,r.activeSkinTone,r.skinTones));case"Home":return I(0);case"End":return I(r.skinTones.length-1);case"Enter":return Ee(y),cs(r.activeSkinTone);case"Escape":return Ee(y),r.skinTonePickerExpanded=!1,l("skintone-button")}}function du(y){if(r.skinTonePickerExpanded)switch(y.key){case" ":return Ee(y),cs(r.activeSkinTone)}}async function uu(y){const{relatedTarget:I}=y;(!I||I.id!=="skintone-list")&&(r.skinTonePickerExpanded=!1)}function hu(y){r.rawSearchText=y.target.value}return{$set(y){Zn(r,y)},$destroy(){i.abort()}}}const Ub="https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json",jb="en";var Wb={categoriesLabel:"Categories",emojiUnsupportedMessage:"Your browser does not support color emoji.",favoritesLabel:"Favorites",loadingMessage:"Loading…",networkErrorMessage:"Could not load emoji.",regionLabel:"Emoji picker",searchDescription:"When search results are available, press up or down to select and enter to choose.",searchLabel:"Search",searchResultsLabel:"Search results",skinToneDescription:"When expanded, press up or down to select and enter to choose.",skinToneLabel:"Choose a skin tone (currently {skinTone})",skinTonesLabel:"Skin tones",skinTones:["Default","Light","Medium-Light","Medium","Medium-Dark","Dark"],categories:{custom:"Custom","smileys-emotion":"Smileys and emoticons","people-body":"People and body","animals-nature":"Animals and nature","food-drink":"Food and drink","travel-places":"Travel and places",activities:"Activities",objects:"Objects",symbols:"Symbols",flags:"Flags"}},zb=':host{--emoji-size:1.375rem;--emoji-padding:0.5rem;--category-emoji-size:var(--emoji-size);--category-emoji-padding:var(--emoji-padding);--indicator-height:3px;--input-border-radius:0.5rem;--input-border-size:1px;--input-font-size:1rem;--input-line-height:1.5;--input-padding:0.25rem;--num-columns:8;--outline-size:2px;--border-size:1px;--border-radius:0;--skintone-border-radius:1rem;--category-font-size:1rem;display:flex;width:min-content;height:400px}:host,:host(.light){color-scheme:light;--background:#fff;--border-color:#e0e0e0;--indicator-color:#385ac1;--input-border-color:#999;--input-font-color:#111;--input-placeholder-color:#999;--outline-color:#999;--category-font-color:#111;--button-active-background:#e6e6e6;--button-hover-background:#d9d9d9}:host(.dark){color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}@media (prefers-color-scheme:dark){:host{color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}}:host([hidden]){display:none}button{margin:0;padding:0;border:0;background:0 0;box-shadow:none;-webkit-tap-highlight-color:transparent}button::-moz-focus-inner{border:0}input{padding:0;margin:0;line-height:1.15;font-family:inherit}input[type=search]{-webkit-appearance:none}:focus{outline:var(--outline-color) solid var(--outline-size);outline-offset:calc(-1*var(--outline-size))}:host([data-js-focus-visible]) :focus:not([data-focus-visible-added]){outline:0}:focus:not(:focus-visible){outline:0}.hide-focus{outline:0}*{box-sizing:border-box}.picker{contain:content;display:flex;flex-direction:column;background:var(--background);border:var(--border-size) solid var(--border-color);border-radius:var(--border-radius);width:100%;height:100%;overflow:hidden;--total-emoji-size:calc(var(--emoji-size) + (2 * var(--emoji-padding)));--total-category-emoji-size:calc(var(--category-emoji-size) + (2 * var(--category-emoji-padding)))}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.hidden{opacity:0;pointer-events:none}.abs-pos{position:absolute;left:0;top:0}.gone{display:none!important}.skintone-button-wrapper,.skintone-list{background:var(--background);z-index:3}.skintone-button-wrapper.expanded{z-index:1}.skintone-list{position:absolute;inset-inline-end:0;top:0;z-index:2;overflow:visible;border-bottom:var(--border-size) solid var(--border-color);border-radius:0 0 var(--skintone-border-radius) var(--skintone-border-radius);will-change:transform;transition:transform .2s ease-in-out;transform-origin:center 0}@media (prefers-reduced-motion:reduce){.skintone-list{transition-duration:.001s}}@supports not (inset-inline-end:0){.skintone-list{right:0}}.skintone-list.no-animate{transition:none}.tabpanel{overflow-y:auto;scrollbar-gutter:stable;-webkit-overflow-scrolling:touch;will-change:transform;min-height:0;flex:1;contain:content}.emoji-menu{display:grid;grid-template-columns:repeat(var(--num-columns),var(--total-emoji-size));justify-content:space-around;align-items:flex-start;width:100%}.emoji-menu.visibility-auto{content-visibility:auto;contain-intrinsic-size:calc(var(--num-columns)*var(--total-emoji-size)) calc(var(--num-rows)*var(--total-emoji-size))}.category{padding:var(--emoji-padding);font-size:var(--category-font-size);color:var(--category-font-color)}.emoji,button.emoji{font-size:var(--emoji-size);display:flex;align-items:center;justify-content:center;border-radius:100%;height:var(--total-emoji-size);width:var(--total-emoji-size);line-height:1;overflow:hidden;font-family:var(--emoji-font-family);cursor:pointer}@media (hover:hover) and (pointer:fine){.emoji:hover,button.emoji:hover{background:var(--button-hover-background)}}.emoji.active,.emoji:active,button.emoji.active,button.emoji:active{background:var(--button-active-background)}.onscreen .custom-emoji::after{content:"";width:var(--emoji-size);height:var(--emoji-size);background-repeat:no-repeat;background-position:center center;background-size:contain;background-image:var(--custom-emoji-background)}.nav,.nav-button{align-items:center}.nav{display:grid;justify-content:space-between;contain:content}.nav-button{display:flex;justify-content:center}.nav-emoji{font-size:var(--category-emoji-size);width:var(--total-category-emoji-size);height:var(--total-category-emoji-size)}.indicator-wrapper{display:flex;border-bottom:1px solid var(--border-color)}.indicator{width:calc(100%/var(--num-groups));height:var(--indicator-height);opacity:var(--indicator-opacity);background-color:var(--indicator-color);will-change:transform,opacity;transition:opacity .1s linear,transform .25s ease-in-out}@media (prefers-reduced-motion:reduce){.indicator{will-change:opacity;transition:opacity .1s linear}}.pad-top,input.search{background:var(--background);width:100%}.pad-top{height:var(--emoji-padding);z-index:3}.search-row{display:flex;align-items:center;position:relative;padding-inline-start:var(--emoji-padding);padding-bottom:var(--emoji-padding)}.search-wrapper{flex:1;min-width:0}input.search{padding:var(--input-padding);border-radius:var(--input-border-radius);border:var(--input-border-size) solid var(--input-border-color);color:var(--input-font-color);font-size:var(--input-font-size);line-height:var(--input-line-height)}input.search::placeholder{color:var(--input-placeholder-color)}.favorites{overflow-y:auto;scrollbar-gutter:stable;display:flex;flex-direction:row;border-top:var(--border-size) solid var(--border-color);contain:content}.message{padding:var(--emoji-padding)}';const nu=["customEmoji","customCategorySorting","database","dataSource","i18n","locale","skinToneEmoji","emojiVersion"],Hb=`:host{--emoji-font-family:${eu}}`;class yo extends HTMLElement{constructor(e){super(),this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=zb+Hb,this.shadowRoot.appendChild(t),this._ctx={locale:jb,dataSource:Ub,skinToneEmoji:ib,customCategorySorting:ob,customEmoji:null,i18n:Wb,emojiVersion:null,...e};for(const i of nu)i!=="database"&&Object.prototype.hasOwnProperty.call(this,i)&&(this._ctx[i]=this[i],delete this[i]);this._dbFlush()}connectedCallback(){el(this),this._cmp||(this._cmp=Bb(this.shadowRoot,this._ctx))}disconnectedCallback(){el(this),Mi(()=>{if(!this.isConnected&&this._cmp){this._cmp.$destroy(),this._cmp=void 0;const{database:e}=this._ctx;e.close().catch(t=>console.error(t))}})}static get observedAttributes(){return["locale","data-source","skin-tone-emoji","emoji-version"]}attributeChangedCallback(e,t,i){this._set(e.replace(/-([a-z])/g,(s,r)=>r.toUpperCase()),e==="emoji-version"?parseFloat(i):i)}_set(e,t){this._ctx[e]=t,this._cmp&&this._cmp.$set({[e]:t}),["locale","dataSource"].includes(e)&&this._dbFlush()}_dbCreate(){const{locale:e,dataSource:t,database:i}=this._ctx;(!i||i.locale!==e||i.dataSource!==t)&&this._set("database",new Zv({locale:e,dataSource:t}))}_dbFlush(){Mi(()=>this._dbCreate())}}const iu={};for(const n of nu)iu[n]={get(){return n==="database"&&this._dbCreate(),this._ctx[n]},set(e){if(n==="database")throw new Error("database is read-only");this._set(n,e)}};Object.defineProperties(yo.prototype,iu);function el(n){n instanceof yo||Object.setPrototypeOf(n,customElements.get(n.tagName.toLowerCase()).prototype)}customElements.get("emoji-picker")||customElements.define("emoji-picker",yo);window.state={cars:[],ads:[],bookings:[],users:[],notifications:[],logs:[],partners:[],locations:[],brands:[],agents:[],specs:[],packages:[],blogs:[],reviews:[],plates:[],sales:[],user:null,userProfile:null,settings:{},lang:localStorage.getItem("luxury_lang")||"ar",soundEnabled:localStorage.getItem("luxury_sound_enabled")!=="false",tempImages:[],bookingFilter:"all",bookingSubStatusFilter:"all",currentReportPeriod:"day",firstLoadDone:!1,inventoryPage:1,inventorySize:8,sliderIndex:0};const Vb={ar:{welcome:"مرحباً بك في عالم الفخامة",inventory:"مخزون السيارات المتاح",totalCars:"إجمالي السيارات",totalBookings:"إجمالي الطلبات",totalValue:"قيمة المخزون",searchPlaceholder:"ابحث عن سيارتك المثالية...",loading:"جاري التحميل...",noResults:"لم يتم العثور على نتائج تطابق بحثك",applyNow:"اطلبها الآن",details:"عرض التفاصيل",back:"رجوع",save:"حفظ",delete:"حذف",edit:"تعديل",cancel:"إلغاء",successMsg:"تمت العملية بنجاح",errorMsg:"حدث خطأ غير متوقع",staff:"قسم المبيعات والمتابعة",admin:"إدارة النظام",supervisor:"مشرف النظام"},en:{welcome:"Welcome to the World of Luxury",inventory:"Available Vehicle Inventory",totalCars:"Total Vehicles",totalBookings:"Total Bookings",totalValue:"Inventory Value",searchPlaceholder:"Search for your perfect car...",loading:"Loading...",noResults:"No results found matching your search",applyNow:"Request Now",details:"View Details",back:"Back",save:"Save",delete:"Delete",edit:"Edit",cancel:"Cancel",successMsg:"Operation successful",errorMsg:"An unexpected error occurred",staff:"Sales & Follow-up Department",admin:"System Administration",supervisor:"System Supervisor"}};window.showLuxuryToast=function(n,e="success"){const t=document.getElementById("toast-container");if(!t)return;const i=document.createElement("div");i.className=`toast-v2 ${e}`,i.style.cssText=`
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
  `;const s=e==="success"?"fa-check-circle":"fa-exclamation-circle";i.innerHTML=`<i class="fas ${s}"></i> <span>${n}</span>`,t.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateY(-20px)",i.style.transition="all 0.4s ease-in",setTimeout(()=>i.remove(),400)},4e3)};window.compressImage=function(n,e=1e3,t=1e3,i=.6){return new Promise((s,r)=>{if(!n||!(n instanceof File||n instanceof Blob)){s(n);return}const o=new FileReader;o.readAsDataURL(n),o.onload=a=>{const l=new Image;l.src=a.target.result,l.onload=()=>{const c=document.createElement("canvas");let d=l.width,u=l.height;d>u?d>e&&(u*=e/d,d=e):u>t&&(d*=t/u,u=t),c.width=d,c.height=u,c.getContext("2d").drawImage(l,0,0,d,u),s(c.toDataURL("image/jpeg",i))},l.onerror=r},o.onerror=r})};window.openModal=function(n){const e=document.getElementById(n);if(e){e.classList.remove("hidden"),document.body.style.overflow="hidden";const t=document.querySelectorAll(".modal:not(.hidden)");e.style.zIndex=2e3+t.length*10,qb(`modal-${n}`)}};window.closeModal=function(n,e=!1){var i;const t=document.getElementById(n);t&&(t.classList.add("hidden"),t.style.zIndex="",!e&&((i=history.state)==null?void 0:i.type)===`modal-${n}`&&history.back(),document.querySelector(".modal:not(.hidden)")||(document.body.style.overflow="auto"))};window.setModalTitle=function(n,e){const t=document.getElementById(n+"-title");t&&(t.innerText=e)};window.switchLuxuryTab=function(n){const e=document.querySelectorAll(".pane, .admin-tab-content"),t=document.querySelectorAll(".dash-tab, .admin-sidebar-nav li");e.forEach(o=>o.classList.add("hidden")),t.forEach(o=>o.classList.remove("active"));const i=document.getElementById(n),s=document.querySelector(`[data-tab="${n}"]`);i&&(i.classList.remove("hidden"),i.classList.add("active"),i.style.animation="fade-up 0.5s ease-out forwards"),s&&s.classList.add("active");const r=document.getElementById("bookings-submenu");if(r&&r.classList.toggle("active",n==="bookings-mgmt"||n==="all-bookings"),window.innerWidth<1024){const o=document.querySelector(".dash-sidebar, .admin-sidebar-v2");o&&o.classList.remove("active")}n==="whatsapp-monitor-mgmt"&&window.initWhatsAppServer&&window.initWhatsAppServer(),n==="whatsapp-mgmt"&&window.startCurrentWASession(),n==="quick-replies-mgmt"&&window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin()};function qb(n){var e;((e=history.state)==null?void 0:e.type)!==n&&history.pushState({type:n},"")}window.normalizePhone=function(n){if(!n)return"";const e=n.toString().trim();if(e.includes("@s.whatsapp.net"))return e.split("@")[0].replace(/\D/g,"");if(e.includes("@lid"))return e;let t=e.replace(/\D/g,"");if(t.startsWith("9660")?t="966"+t.substring(4):t.startsWith("9670")&&(t="967"+t.substring(4)),t.startsWith("966")||t.startsWith("967"))return t;if(t.startsWith("05"))return"966"+t.substring(1);if(t.startsWith("07"))return"967"+t.substring(1);if(t.startsWith("0"))return"966"+t.substring(1);if(t.length===9){if(t.startsWith("7"))return"967"+t;if(t.startsWith("5"))return"966"+t}return t};document.addEventListener("DOMContentLoaded",()=>{Kb(),su(),Yb(),window.trackVisit(),Gb()});function Gb(){const n=document.querySelector(".mobile-btn"),e=document.querySelector(".nav-menu"),t=document.querySelector(".mobile-nav-overlay"),i=document.querySelector(".menu-close-btn"),s=(g=!1)=>{const m=g===!1?!e.classList.contains("active"):!1;e.classList.toggle("active",m),t.classList.toggle("active",m),document.body.style.overflow=m?"hidden":"";const w=n==null?void 0:n.querySelector("i");w&&(w.className=m?"fas fa-times":"fas fa-bars-staggered")};n&&(n.onclick=()=>s()),t&&(t.onclick=()=>s(!0)),i&&(i.onclick=()=>s(!0)),document.querySelectorAll(".nav-menu a").forEach(g=>{g.addEventListener("click",()=>s(!0))});const r=document.querySelector(".mobile-menu-header .dynamic-name-ar");r&&window.__DYNAMIC_NAME_AR__&&(r.innerText=window.__DYNAMIC_NAME_AR__);const o=document.getElementById("admin-trigger");o&&(o.onclick=g=>{g.preventDefault(),window.openModal("admin-modal")});const a=document.getElementById("theme-btn");a&&(a.onclick=()=>{const m=(document.body.getAttribute("data-theme")||"dark")==="dark"?"light":"dark";document.body.setAttribute("data-theme",m),localStorage.setItem("luxury_theme",m),a.innerHTML=m==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>'});const l=document.getElementById("lang-btn");l&&(l.onclick=()=>{window.state.lang=window.state.lang==="ar"?"en":"ar",localStorage.setItem("luxury_lang",window.state.lang),su(),window.applyInventoryFilters(),l.innerText=window.state.lang==="ar"?"EN":"AR"}),document.querySelectorAll(".dash-tab").forEach(g=>{g.onclick=()=>window.switchLuxuryTab(g.dataset.tab)});const c=document.getElementById("car-search-input");c&&(c.oninput=()=>window.applyInventoryFilters()),["filter-make","filter-type","filter-year","filter-sort"].forEach(g=>{const m=document.getElementById(g);m&&(m.onchange=()=>{window.state.inventoryPage=1,window.applyInventoryFilters()})});const u=document.getElementById("p-prev"),h=document.getElementById("p-next");u&&(u.onclick=()=>window.moveLuxurySlider(-1)),h&&(h.onclick=()=>window.moveLuxurySlider(1)),setInterval(()=>{const g=document.getElementById("luxury-splash");(!g||g.classList.contains("hidden"))&&window.moveLuxurySlider(1)},5e3),["calc-car-price","calc-down-pay","calc-years"].forEach(g=>{const m=document.getElementById(g);m&&(m.oninput=()=>window.calculateLuxuryFinancing()),m&&m.tagName==="SELECT"&&(m.onchange=()=>window.calculateLuxuryFinancing())}),document.querySelectorAll(".modal-close").forEach(g=>{g.onclick=m=>{m.stopPropagation();const w=g.closest(".modal");if(w){if(w.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(w.id)}}}),window.onclick=g=>{const m=document.getElementById("wa-emoji-picker");if(m&&m.style.display!=="none"){const v=g.target.closest(".fa-smile")!==null,T=m.contains(g.target);!v&&!T&&(m.style.display="none")}const w=Array.from(document.querySelectorAll(".modal:not(.hidden)"));if(w.length>0){const v=w[w.length-1];if(g.target===v){if(v.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(v.id)}}},window.addEventListener("popstate",g=>{const m=document.querySelectorAll(".modal:not(.hidden)");m.length>0&&m.forEach(w=>{var v;((v=g.state)==null?void 0:v.type)!==`modal-${w.id}`&&window.closeModal(w.id,!0)})}),window.onscroll=()=>{const g=document.getElementById("main-nav");g&&g.classList.toggle("scrolled",window.scrollY>50);const m=document.getElementById("scroll-jump");m&&m.classList.toggle("hidden",window.scrollY<500)},document.getElementById("scroll-jump")&&(document.getElementById("scroll-jump").onclick=()=>window.scrollTo({top:0,behavior:"smooth"}));const p=document.getElementById("login-form");p&&(p.onsubmit=g=>window.loginAdmin(g));const _=document.getElementById("booking-form");_&&(_.onsubmit=g=>window.submitBooking(g));const b=document.getElementById("item-form");b&&(b.onsubmit=g=>window.saveLuxuryItem(g))}function Kb(){const n=JSON.parse(localStorage.getItem("luxury-settings-cache")||"{}"),e=localStorage.getItem("luxury_theme")||n.defaultTheme||"dark";document.body.setAttribute("data-theme",e);const t=document.getElementById("theme-btn");t&&(t.innerHTML=e==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>')}function su(){const n=window.state.lang;document.body.dir=n==="ar"?"rtl":"ltr",document.body.classList.toggle("en",n==="en");const e=Vb[n];document.querySelectorAll("[data-i18n]").forEach(t=>{const i=t.getAttribute("data-i18n");e[i]&&(t.innerText=e[i])})}async function Yb(){await ny(Li,rd);const n=["users","plates","locations","brands","agents","specs","packages","blogs","reviews","cars","ads","sales","settings","partners"],e=["bookings","notifications","logs","quickReplies"],t={};function i(s){t[s]||(t[s]=tr(W(z,s),r=>{const o=r.val();s==="settings"?(window.state.settings=o||{},window.applySettings(o)):(window.state[s]=o?Object.entries(o).map(([a,l])=>({...l,id:a})):[],s==="cars"&&window.applyInventoryFilters(),s==="ads"&&window.renderAdsSlider(),s==="sales"&&window.renderSalesVideos(),s==="partners"&&window.renderPartners(),s==="reviews"&&window.renderPublicReviews(),window.state.user&&(window.syncAdminTables(s),window.updateStatistics())),Qb()},r=>{console.warn(`Listener for ${s} failed:`,r.message),delete t[s]}))}ry(Li,async s=>{if(window.state.user=s,s){const r=W(z,`users/${s.uid}`);tr(r,o=>{window.state.userProfile={...o.val(),id:s.uid},tl(),window.initWhatsAppServer&&window.initWhatsAppServer()}),e.forEach(i)}else window.state.userProfile=null,tl(),e.forEach(r=>{t[r]&&delete t[r]})}),n.forEach(i)}function Qb(){var i,s;if(window.state.firstLoadDone)return;const n=window.state.settings,e=n==null?void 0:n.maintenanceMode,t=((i=window.state.userProfile)==null?void 0:i.role)==="admin"||((s=window.state.userProfile)==null?void 0:s.role)==="supervisor";if(e&&!t){const r=document.getElementById("luxury-splash");r&&(r.innerHTML=`
            <div class="maint-content" style="text-align:center; color:white; padding: 20px;">
                <i class="fas fa-tools" style="font-size:60px; color:var(--p-red); margin-bottom:20px;"></i>
                <h1 class="luxury-font" style="margin-bottom:10px;">الموقع تحت الصيانة</h1>
                <p style="opacity:0.8;">نعمل حالياً على تحديث المنصة لتقديم تجربة أفضل، سنعود قريباً جداً.</p>
                <div style="margin-top:30px;">
                    <button class="btn-premium btn-sm" onclick="window.openModal('admin-modal')">دخول الإدارة</button>
                </div>
            </div>
          `,r.style.opacity="1",r.classList.remove("hidden"));return}n&&Object.keys(n).length>0&&setTimeout(()=>{const r=document.getElementById("luxury-splash");r&&(r.style.opacity="0",setTimeout(()=>{r.classList.add("hidden"),r.remove()},800)),window.state.firstLoadDone=!0},1200)}function tl(){var o,a,l;const n=!!window.state.user,e=((o=window.state.userProfile)==null?void 0:o.role)==="admin",t=((a=window.state.userProfile)==null?void 0:a.role)==="supervisor";document.body.classList.toggle("is-logged-in",n),document.body.classList.toggle("is-admin",e),document.body.classList.toggle("is-supervisor",t);const i=document.getElementById("admin-login-ui"),s=document.getElementById("admin-dash-ui");i&&i.classList.toggle("hidden",n),s&&s.classList.toggle("hidden",!n);const r=document.getElementById("admin-trigger");if(r&&(r.innerText=n?"لوحة التحكم":"تسجيل الدخول"),document.querySelectorAll(".admin-only").forEach(c=>c.classList.toggle("hidden",!e&&!t)),document.querySelectorAll(".staff-only").forEach(c=>c.classList.toggle("hidden",e||t)),n){window.syncAdminTables("all"),window.updateStatistics();const c=document.getElementById("user-display-name"),d=document.getElementById("user-role-label");if(c&&(c.innerText=((l=window.state.userProfile)==null?void 0:l.name)||"المسؤول"),d){let u="قسم المبيعات والمتابعة";e?u="إدارة النظام":t&&(u="مشرف النظام"),d.innerText=u}}}window.toggleAvailability=async function(){if(!window.state.userProfile)return;const n=window.state.userProfile.isAvailable||!1;try{await Fn(W(z,`users/${window.state.user.uid}`),{isAvailable:!n}),window.state.userProfile.isAvailable=!n,window.showLuxuryToast(n?"تم تعيين الحالة: غير متاح":"أنت متاح الآن لاستلام الطلبات"),window.updateStatistics()}catch{window.showLuxuryToast("فشل تحديث الحالة","error")}};window.toggleSound=function(){window.state.soundEnabled=!window.state.soundEnabled,localStorage.setItem("luxury_sound_enabled",window.state.soundEnabled);const n=document.getElementById("sound-toggle");n&&(n.checked=window.state.soundEnabled),window.showLuxuryToast(window.state.soundEnabled?"تم تفعيل التنبيهات الصوتية":"تم كتم التنبيهات")};window.setBookingFilter=function(n,e,t="all",i=null){window.state.bookingFilter=n,window.state.bookingSubStatusFilter=t;const s=document.getElementById("filter-booking-status");s&&s.value!==n&&(s.value=n);const r=document.getElementById("filter-booking-sub-status");if(r){const o={new:["not_contacted","contacted"],waiting:["docs_received","waiting_calc","waiting_docs","waiting_signature"],inquiry:["docs_not_received"],sold:["signed","delivered"],done:["done"],cancelled:["no_response","obligations","calc_rejected","ineligible","duplicate"]},a={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"};let l=n==="all"?Object.keys(a):o[n]||[];r.innerHTML='<option value="all">جميع الحالات الفرعية</option>',l.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=a[c],r.appendChild(d)}),Array.from(r.options).some(c=>c.value===t)?r.value=t:(r.value="all",window.state.bookingSubStatusFilter="all",t="all")}document.querySelectorAll(".sub-tab.b-filter").forEach(o=>{if(o.getAttribute("onclick")&&o.getAttribute("onclick").includes(`'${n}'`)){document.querySelectorAll(".sub-tab.b-filter").forEach(l=>l.classList.remove("active")),o.classList.add("active"),document.querySelectorAll(".deep-submenu").forEach(l=>l.classList.remove("active"));const a=o.closest(".status-group");if(a){const l=a.querySelector(".deep-submenu");l&&l.classList.add("active")}}}),document.querySelectorAll(".deep-tab").forEach(o=>{o.classList.remove("active"),t!=="all"&&o.getAttribute("onclick")&&o.getAttribute("onclick").includes(`'${t}'`)&&o.classList.add("active")}),window.syncAdminTables("bookings")};window.applyInventoryFilters=function(){var _,b,g,m,w,v,T;if(!document.getElementById("cars-container"))return;const e=document.getElementById("filter-make"),t=document.getElementById("filter-year");e&&e.options.length<=1&&[...new Set(window.state.cars.map(R=>R.make))].sort().forEach(R=>{const x=document.createElement("option");x.value=R,x.textContent=R,e.appendChild(x)}),t&&t.options.length<=1&&[...new Set(window.state.cars.map(R=>R.year))].sort((R,x)=>x-R).forEach(R=>{const x=document.createElement("option");x.value=R,x.textContent=R,t.appendChild(x)});const i=(((_=document.getElementById("car-search-input"))==null?void 0:_.value)||"").toLowerCase(),s=((b=document.getElementById("filter-make"))==null?void 0:b.value)||"all",r=((g=document.getElementById("filter-type"))==null?void 0:g.value)||"all",o=((m=document.getElementById("filter-year"))==null?void 0:m.value)||"all",a=((w=document.getElementById("filter-sort"))==null?void 0:w.value)||"newest";let l=((v=window.state.cars)==null?void 0:v.filter(k=>{const R=!i||(k.make+" "+k.model).toLowerCase().includes(i),x=s==="all"||k.make===s,K=r==="all"||k.status===r,he=o==="all"||k.year===o;return R&&x&&K&&he}))||[];a==="price-asc"?l.sort((k,R)=>(Number(k.price)||0)-(Number(R.price)||0)):a==="price-desc"?l.sort((k,R)=>(Number(R.price)||0)-(Number(k.price)||0)):a==="year-asc"?l.sort((k,R)=>(Number(k.year)||0)-(Number(R.year)||0)):l.sort((k,R)=>new Date(R.createdAt||0)-new Date(k.createdAt||0));const c=((T=window.state.cars)==null?void 0:T.filter(k=>k.isFeatured).slice(0,3))||[];Jb(c.length>0?c:window.state.cars.slice(0,3));const d=l.length,u=window.state.inventoryPage||1,h=window.state.inventorySize||8,f=(u-1)*h,p=l.slice(f,f+h);renderCarGrid(p),Xb(d,u,h)};function Jb(n){const e=document.getElementById("featured-offers-container");if(!e||!n.length)return;const t=document.getElementById("featured-offers-section");t&&(t.style.display="block"),e.innerHTML=n.map(i=>`
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
    `).join("")}function Xb(n,e,t){const i=document.getElementById("pagination-wrap");if(!i)return;const s=Math.ceil(n/t);if(s<=1){i.innerHTML="";return}let r="";e>1&&(r+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${e-1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})"><i class="fas fa-chevron-right"></i> السابق</button>`);for(let o=1;o<=s;o++)r+=`<button class="p-btn ${o===e?"active":""}" onclick="window.state.inventoryPage=${o}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">${o}</button>`;e<s&&(r+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${e+1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">التالي <i class="fas fa-chevron-left"></i></button>`),i.innerHTML=r}window.renderPartners=function(){const n=document.getElementById("front-partners-grid");!n||!window.state.partners||(n.innerHTML=window.state.partners.map(e=>`
    <div class="partner-logo-v2">
        <img src="${e.logo}" alt="${e.name}" title="${e.name}">
    </div>
  `).join(""))};window.renderPublicReviews=function(){const n=document.getElementById("public-reviews-container");if(!(!n||!window.state.reviews)){if(window.state.reviews.length===0){n.innerHTML='<div class="no-results-v2"><p>لا توجد آراء عملاء حالياً</p></div>';return}n.innerHTML=window.state.reviews.map(e=>{const t=e.avatar||e.image||"",i=e.name||"عميل غير معروف",s=e.car?`<span> اشترى <span style="color:var(--p-copper); font-weight:bold;">${e.car}</span></span>`:'<span>عميل مُحقّق <i class="fas fa-check-circle"></i></span>';return`
    <div class="review-card-v2" data-aos="zoom-in">
        <div class="review-stars">
            ${'<i class="fas fa-star"></i>'.repeat(Number(e.rating||5))}
        </div>
        <p class="review-text">"${e.text||"لا يوجد تعليق"}"</p>
        <div class="review-author">
           <div class="review-author-avatar">
                ${t?`<img src="${t}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`:i.charAt(0)}
           </div>
           <div class="review-author-info" style="line-height:1.4;">
              <strong style="display:block; font-size:16px;">${i}</strong>
              <div style="font-size:12px; opacity:0.8;">${s}</div>
           </div>
        </div>
    </div>
  `}).join("")}};window.renderCarGrid=function(n){const e=document.getElementById("cars-container");if(e){if(n.length===0){e.innerHTML='<div class="no-results-v2"><i class="fas fa-search"></i> <p>لم يتم العثور على سيارات تطابق بحثك</p></div>';return}e.innerHTML=n.map(t=>`
    <div class="car-card-premium" onclick="window.viewLuxuryCar('${t.id}')" data-aos="fade-up">
      <div class="car-img-wrap">
        <img src="${t.image||"logo.jpg"}" alt="${t.make}" loading="lazy" onerror="this.src='logo.jpg'">
        <div class="car-price-v3">${(Number(t.price)||0).toLocaleString()} <small>ريال</small></div>
        <div class="car-badge-v3 ${t.status==="available"?"available":t.status==="reserved"?"reserved":"sold"}">${t.status==="available"?"متاح":t.status==="reserved"?"محجوز":"مباع"}</div>
      </div>
      <div class="car-info-v3">
        <span class="car-year-v3">${t.year}</span>
        <h3 class="car-title-v3">${t.make} ${t.model}</h3>
        <div class="car-specs-v3">
          <div class="spec-item-v3">
            <i class="fas fa-road"></i>
            <span>${(Number(t.mileage)||0).toLocaleString()} كم</span>
          </div>
          <div class="spec-item-v3">
            <i class="fas fa-gas-pump"></i>
            <span>${t.fuelType||"بنزين"}</span>
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
  `).join("")}};window.viewLuxuryCar=function(n){const e=window.state.cars.find(o=>o.id===n);if(!e||!document.getElementById("details-modal"))return;let i=e.images||[];i.length===0&&e.image&&(i=[e.image]),i.length===0&&(i=["logo.jpg"]),window.normalizePhone(window.state.settings.contactSales||"0500000000"),`${e.make}${e.model}${e.year}${Number(e.price).toLocaleString()}${window.location.origin}${e.id}`;const s=`
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
  `,r=document.getElementById("details-modal-body");if(r){r.innerHTML=s,r.scrollTop=0;const o=document.getElementById("details-modal");if(o){o.scrollTop=0;const a=o.querySelector(".modal-inner");a&&(a.scrollTop=0)}window.openModal("details-modal")}window.trackCarView(n)};window.bookCar=function(n){const e=window.state.cars.find(s=>s.id===n);if(!e)return;const t=document.getElementById("b-car");t&&(t.value=`${e.make} ${e.model} ${e.year}`),window.closeModal("details-modal");const i=document.getElementById("booking");i&&(i.scrollIntoView({behavior:"smooth"}),t&&(t.focus(),t.style.borderColor="var(--p-copper)",setTimeout(()=>t.style.borderColor="",2e3)))};window.viewBookingDetails=function(n){var r;const e=(window.state.bookings||[]).find(o=>o.id===n);if(!e)return;(r=window.state.users.find(o=>o.id===e.assignedTo))!=null&&r.name,e.status==="sold"||e.status==="available"||e.status==="rejected"||e.status,e.status==="sold"||e.status;const t={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",rejected:"مرفوض",available:"متاح"},i=`
    <div class="booking-modal-layout details-luxury-container" style="direction: rtl;">
      
      <!-- القسم الأيمن: تفاصيل الحجز -->
      <div class="details-info-v4 custom-scrollbar">
        <div class="p-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:25px;">
           <div>
              <h2 style="margin:0; font-size:28px; color:var(--text-main); font-weight:800;">${e.name||"عميل مجهول"}</h2>
              <p style="margin:5px 0 0; color:var(--text-dim); display:flex; align-items:center; gap:8px;">
                <i class="fas fa-phone-alt" style="font-size:12px; color:var(--p-copper);"></i> ${e.phone}
              </p>
           </div>
           <div class="status-badge-v3" style="background:var(--bg-card); padding:8px 16px; border-radius:12px; border:1px solid var(--glass-border); text-align:center;">
              <span style="display:block; font-size:10px; color:var(--text-dim); text-transform:uppercase;">حالة الطلب الحالية</span>
              <strong style="color:var(--p-copper); font-size:14px;">${t[e.status]||e.status}</strong>
           </div>
        </div>

        <div class="details-grid-lite" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:20px; margin-bottom:30px;">
            <div class="d-item" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:15px; border:1px solid var(--glass-border);">
                <span style="display:block; font-size:11px; color:var(--text-dim); margin-bottom:5px;">السيارة المطلوبة</span>
                <strong style="font-size:15px; color:var(--p-copper);"><i class="fas fa-car" style="margin-left:8px;"></i>${e.carRequested||"غير محدد"}</strong>
            </div>
            <div class="d-item" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:15px; border:1px solid var(--glass-border);">
                <span style="display:block; font-size:11px; color:var(--text-dim); margin-bottom:5px;">تاريخ الطلب</span>
                <strong style="font-size:14px;"><i class="far fa-calendar-alt" style="margin-left:8px;"></i>${new Date(e.createdAt).toLocaleDateString("ar-SA")}</strong>
            </div>
        </div>

        <div class="update-section" style="background:rgba(255,255,255,0.03); padding:20px; border-radius:20px; border:1px solid var(--glass-border);">
            <h4 style="margin:0 0 15px; font-size:16px; font-weight:700;"><i class="fas fa-edit" style="margin-left:10px; color:var(--p-copper);"></i>تحديث حالة المتابعة</h4>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:15px;">
                <div class="f-group">
                    <label style="font-size:12px; color:var(--text-dim); margin-bottom:6px; display:block;">الحالة العامة</label>
                    <select id="update-booking-status" onchange="window.updateSubStatusOptions(this.value)" style="width:100%; border-radius:10px; padding:10px; background:var(--bg-alt); border:1px solid var(--glass-border); color:var(--text-main); font-family:inherit;">
                        ${Object.entries(t).map(([o,a])=>`<option value="${o}" ${o===(e.status||"new")?"selected":""}>${a}</option>`).join("")}
                    </select>
                </div>
                <div class="f-group">
                    <label style="font-size:12px; color:var(--text-dim); margin-bottom:6px; display:block;">المحافظة / الوضع</label>
                    <select id="update-booking-substatus" style="width:100%; border-radius:10px; padding:10px; background:var(--bg-alt); border:1px solid var(--glass-border); color:var(--text-main); font-family:inherit;">
                        <!-- dynamic -->
                    </select>
                </div>
            </div>

            <div class="f-group" style="margin-bottom:15px;">
                <label style="font-size:12px; color:var(--text-dim); margin-bottom:6px; display:block;">ملاحظات الموظف الخاصة</label>
                <textarea id="update-booking-details" style="width:100%; min-height:80px; border-radius:12px; padding:12px; background:var(--bg-alt); border:1px solid var(--glass-border); color:var(--text-main); font-family:inherit; resize:vertical;">${e.additionalDetails||""}</textarea>
            </div>

            <button onclick="window.updateBookingQuickStatus('${e.id}')" class="btn-premium" style="width:100%; padding:14px; border:none; border-radius:12px; font-weight:700; cursor:pointer;">
                حفظ التعديلات
            </button>
        </div>

        <div style="margin-top:20px; display:flex; gap:10px;">
            <a href="tel:${e.phone}" class="icon-btn-lite" style="flex:1; height:45px; border-radius:12px; background:#1c7c8c; color:white; border:none; gap:10px; display:flex; align-items:center; justify-content:center; text-decoration:none;">
                <i class="fas fa-phone-alt" style="color:white;"></i> مكالمة
            </a>
            <button onclick="window.fetchServerWAChat('${e.waJid||e.phone}', '${e.assignedTo||""}')" class="icon-btn-lite" style="flex:1; height:45px; border-radius:12px; gap:10px; display:flex; align-items:center; justify-content:center; cursor:pointer;">
                <i class="fas fa-sync-alt"></i> تحديث الدردشة
            </button>
        </div>
      </div>

      <!-- القسم الأيسر: دردشة واتساب سيرفر -->
      <div class="details-wa-v4">
          <div class="wa-chat-header">
              <div class="avatar">
                  <i class="fab fa-whatsapp" style="font-size:24px; color:white;"></i>
              </div>
              <div style="flex:1; line-height:1.2;">
                  <h3 style="margin:0; font-weight:700;">${e.name||"محادثة واتساب"}</h3>
                  <small style="opacity:0.8;">الرقم: ${e.phone}</small>
              </div>
              <div id="wa-connection-dot" style="width:10px; height:10px; background:#4de265; border-radius:50%; box-shadow:0 0 5px #4de265;" title="متصل بالسيرفر"></div>
          </div>

          <div id="wa-server-chat-box" class="custom-scrollbar">
              <div style="text-align:center; margin: auto;">
                  <i class="fas fa-circle-notch fa-spin" style="font-size:32px; color:#00a884; margin-bottom:15px;"></i>
                  <p style="font-size:13px; color:#666;">جاري تحميل محادثات السيرفر...</p>
              </div>
          </div>

          <div id="wa-quick-replies-bar">
               <!-- rendered via js -->
          </div>

          <div id="wa-emoji-picker" style="display:none; position:absolute; bottom:80px; right:15px; z-index:1000; background:white; border-radius:15px; box-shadow:0 10px 40px rgba(0,0,0,0.2); overflow:hidden; border:1px solid #ddd;">
               <emoji-picker style="width:300px; height:400px; -webkit-filter: grayscale(0);"></emoji-picker>
          </div>

          <div class="wa-input-bar">
              <i class="far fa-smile" style="font-size:22px; color:#54656f; cursor:pointer;" onclick="const p=document.getElementById('wa-emoji-picker'); p.style.display=p.style.display==='none'?'block':'none'"></i>
              <input type="file" id="wa-media-upload" style="display:none" onchange="window.handleWAMediaSelect('${e.waJid||e.phone}', '${e.assignedTo||""}')">
              <i class="fas fa-paperclip" style="font-size:20px; color:#54656f; cursor:pointer;" onclick="document.getElementById('wa-media-upload').click()"></i>
              <i id="wa-mic-btn" class="fas fa-microphone" style="font-size:20px; color:#54656f; cursor:pointer;" onpointerdown="window.startWARecording()" onpointerup="window.stopWARecording('${e.waJid||e.phone}', '${e.assignedTo||""}')"></i>
              
              <input type="text" id="wa-server-input" placeholder="اكتب رسالة للرد..." onkeydown="if(event.key==='Enter') window.sendServerWAMessage('${e.waJid||e.phone}', '${e.assignedTo||""}')">
              
              <button class="wa-send-btn" onclick="window.sendServerWAMessage('${e.waJid||e.phone}', '${e.assignedTo||""}')">
                  <i class="fas fa-paper-plane"></i>
              </button>
          </div>
      </div>
    </div>
  `,s=document.getElementById("details-modal-body");if(s){s.innerHTML=i,s.scrollTop=0;const o=document.getElementById("details-modal");o&&(o.scrollTop=0),window.openModal("details-modal"),setTimeout(()=>{window.fetchServerWAChat&&window.fetchServerWAChat(e.waJid||e.phone,e.assignedTo||""),window.updateSubStatusOptions&&window.updateSubStatusOptions(e.status||"new",e.subStatus||"not_contacted"),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();const a=document.querySelector("emoji-picker");a&&a.addEventListener("emoji-click",l=>{const c=document.getElementById("wa-server-input");c&&(c.value+=l.detail.unicode,c.focus())})},100)}};window.updateSubStatusOptions=function(n,e=null){const t=document.getElementById("update-booking-substatus");if(!t)return;const s={new:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"}],waiting:[{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"}],inquiry:[{v:"docs_not_received",t:"لم يتم استلام الاوراق"}],sold:[{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"}],rejected:[{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]}[n]||[{v:"none",t:"-"}];t.innerHTML=s.map(r=>`<option value="${r.v}" ${r.v===e?"selected":""}>${r.t}</option>`).join("")};window.updateBookingQuickStatus=async function(n){var s,r,o;const e=(s=document.getElementById("update-booking-status"))==null?void 0:s.value,t=((r=document.getElementById("update-booking-substatus"))==null?void 0:r.value)||"",i=((o=document.getElementById("update-booking-details"))==null?void 0:o.value)||"";if(!(!e||!n))try{const a=W(z,`bookings/${n}`);await Fn(a,{status:e,subStatus:t,additionalDetails:i,updatedAt:new Date().toISOString()}),window.showLuxuryToast("تم تحديث حالة الطلب والتفاصيل بنجاح")}catch(a){console.error(a),window.showLuxuryToast("فشل تحديث الحالة","error")}};window.saveWAServerURL=async function(){var e;const n=(e=document.getElementById("wa-server-url-config"))==null?void 0:e.value;if(n){localStorage.setItem("wa_server_url",n);try{await Be(W(z,"settings/waServerUrl"),n)}catch(t){console.error("Firebase save config error:",t)}window.showLuxuryToast("تم حفظ رابط السيرفر وتعميمه لجميع الموظفين بنجاح. يرجى إعادة تحميل الصفحة."),setTimeout(()=>location.reload(),1500)}};window.setLuxuryDetailImg=function(n,e){document.getElementById("active-luxury-img").src=e,document.querySelectorAll(".thumb-wrapper").forEach(t=>t.classList.remove("active")),n.classList.add("active")};window.switchLuxuryDetailImg=function(n,e){const t=window.state.cars.find(c=>c.id===n);if(!t)return;const i=t.images||[t.image||"logo.jpg"],s=document.getElementById("active-luxury-img").src;let r=i.findIndex(c=>s.includes(c));r===-1&&(r=0);let o=(r+e+i.length)%i.length;const a=i[o];document.getElementById("active-luxury-img").src=a;const l=document.querySelectorAll(".thumb-wrapper");l[o]&&(l.forEach(c=>c.classList.remove("active")),l[o].classList.add("active"))};window.openFullscreenGallery=function(n,e){const t=window.state.cars.find(r=>r.id===n);if(!t)return;const i=t.images||[t.image||"logo.jpg"],s=document.createElement("div");s.className="luxury-lightbox",s.innerHTML=`
        <div class="lb-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></div>
        <div class="lb-content">
            <img src="${e}" id="lb-main-img">
            <div class="lb-nav">
                <button onclick="window.navLightbox('${n}', -1)"><i class="fas fa-chevron-right"></i></button>
                <button onclick="window.navLightbox('${n}', 1)"><i class="fas fa-chevron-left"></i></button>
            </div>
        </div>
        <div class="lb-thumbs">
            ${i.map(r=>`<img src="${r}" class="lb-thumb ${r===e?"active":""}" onclick="document.getElementById('lb-main-img').src='${r}'; this.parentElement.querySelectorAll('.lb-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');">`).join("")}
        </div>
    `,document.body.appendChild(s)};window.navLightbox=function(n,e){const t=window.state.cars.find(l=>l.id===n),i=t.images||[t.image||"logo.jpg"],s=document.getElementById("lb-main-img");let r=i.indexOf(s.src);r===-1&&(r=0);let o=r+e;o<0&&(o=i.length-1),o>=i.length&&(o=0),s.src=i[o];const a=document.querySelectorAll(".lb-thumb");a.forEach(l=>l.classList.remove("active")),a[o].classList.add("active")};window.trackCarView=async function(n){if(n)try{const e=W(z,`analytics/popularCars/${n}`);await Yr(e,t=>(t||0)+1)}catch(e){console.error("Tracking Error:",e)}};window.resetFilters=function(){["car-search-input","filter-make","filter-type","filter-year","filter-sort"].forEach(e=>{const t=document.getElementById(e);t&&(t.value=t.tagName==="SELECT"?e==="filter-sort"?"newest":"all":"")}),window.applyInventoryFilters()};window.trackVisit=async function(){try{const n=new Date().toISOString().split("T")[0];if(localStorage.getItem("visited_"+n))return;localStorage.setItem("visited_"+n,"true");const e=W(z,"analytics");await Yr(e,t=>{t||(t={totalVisits:0,dailyVisits:{},browsers:{},devices:{},popularCars:{}}),t.totalVisits=(t.totalVisits||0)+1,t.dailyVisits=t.dailyVisits||{},t.dailyVisits[n]=(t.dailyVisits[n]||0)+1;const i=navigator.userAgent;let s="Other";i.includes("Chrome")?s="Chrome":i.includes("Safari")?s="Safari":i.includes("Firefox")?s="Firefox":i.includes("Edge")&&(s="Edge"),t.browsers=t.browsers||{},t.browsers[s]=(t.browsers[s]||0)+1;const r=/iPhone|iPad|iPod|Android/i.test(i)?"mobile":"desktop";return t.devices=t.devices||{},t.devices[r]=(t.devices[r]||0)+1,t})}catch(n){console.error("Analytics Error:",n)}};window.loginAdmin=async function(n){var r,o;n.preventDefault();const e=(r=document.getElementById("admin-email"))==null?void 0:r.value,t=(o=document.getElementById("admin-pass"))==null?void 0:o.value,i=n.target.querySelector("button");if(!e||!t)return window.showLuxuryToast("يرجى إدخال البريد وكلمة المرور","error");const s=i.innerText;i.innerText="جاري التحقق...",i.disabled=!0;try{await ty(Li,e,t),window.showLuxuryToast("تم تسجيل الدخول بنجاح"),window.createLog("تسجيل دخول","نجاح تسجيل الدخول للنظام","auth"),window.closeModal("admin-modal")}catch(a){console.error(a),window.showLuxuryToast("خطأ في البيانات، يرجى المحاولة مرة أخرى","error")}finally{i.innerText=s,i.disabled=!1}};window.logout=async function(){confirm("هل أنت متأكد من تسجيل الخروج؟")&&(await window.createLog("تسجيل خروج","خرج المستخدم من النظام","auth"),await oy(Li),window.showLuxuryToast("تم تسجيل الخروج"))};window.applySettings=function(n){if(!n)return;const e=document.documentElement;n.primaryColor&&(e.style.setProperty("--p-red",n.primaryColor),e.style.setProperty("--p-red-glow",n.primaryColor+"66")),n.secondaryColor&&e.style.setProperty("--p-teal",n.secondaryColor),n.accentColor&&e.style.setProperty("--p-copper",n.accentColor);const t=n.logo||"logo.jpg";document.querySelectorAll(".logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img").forEach(w=>{w.src=t});const i=n.nameAr||"ون كار",s=n.nameEn||"ONE CAR",r=window.state.lang==="ar"?i:s;if(document.querySelectorAll(".dynamic-name-ar").forEach(w=>w.innerText=i),document.querySelectorAll(".dynamic-name-en").forEach(w=>w.innerText=s),document.title=r+" | "+(window.state.lang==="ar"?"الفخامة في عالم السيارات":"Luxury Automotive"),n.fontFamily&&(e.style.setProperty("--font-main",n.fontFamily),document.body.style.fontFamily=n.fontFamily),n.borderRadius){e.style.setProperty("--border-radius-main",n.borderRadius);const w="dynamic-design-styles";let v=document.getElementById(w);v||(v=document.createElement("style"),v.id=w,document.head.appendChild(v)),v.innerHTML=`
      .car-card-premium, .ad-slide, .nav-premium, .modal-inner, .video-card-v2, .feature-card, .btn-premium { 
        border-radius: ${n.borderRadius} !important; 
      }
    `}const o=document.getElementById("about-text-display");o&&(o.innerText=n.aboutUs||"نقدم لكم تجربة استثنائية في عالم السيارات...");const a=document.getElementById("location-text-display");a&&(a.innerText=n.location||"الرياض - معارض القادسية");const l=document.getElementById("f-phone-admin");l&&(l.innerText=n.contactAdmin||"...");const c=document.getElementById("f-phone-sales");c&&(c.innerText=n.contactSales||"...");const d=document.getElementById("f-phone-info");d&&(d.innerText=n.contactComplaints||"...");const u=document.getElementById("f-email-display");u&&(u.innerText=n.contactEmail||"...");const h=document.getElementById("contact-location-link");h&&(h.href=n.locationUrl||"#");const f=document.getElementById("meta-title");f&&(f.innerText=`${i} | ${n.metaTitle||"الفخامة والجودة تليق بك"}`);const p=document.getElementById("meta-description");p&&p.setAttribute("content",n.metaDesc||"وجهتكم الرائدة للسيارات الفاخرة والمعتمدة.");const _={"f-insta":n.socialInsta,"f-snap":n.socialSnap,"f-twitter":n.socialTwitter};Object.entries(_).forEach(([w,v])=>{const T=document.getElementById(w);T&&(T.href=v||"#")});const b={"set-name-ar":n.nameAr||"","set-name-en":n.nameEn||"","set-color-primary":n.primaryColor||"#a11d21","set-color-secondary":n.secondaryColor||"#1c7c8c","set-color-accent":n.accentColor||"#b8860b","set-default-theme":n.defaultTheme||"dark","set-font-family":n.fontFamily||"'Cairo', sans-serif","set-border-radius":n.borderRadius||"16px","set-contact-mgmt":n.contactAdmin||"","set-contact-sales":n.contactSales||"","set-contact-complaints":n.contactComplaints||"","set-contact-email":n.contactEmail||"","set-about-text":n.aboutUs||"","set-location-link":n.locationUrl||"","set-location-text":n.location||"","set-insta-link":n.socialInsta||"","set-snap-link":n.socialSnap||"","set-twitter-link":n.socialTwitter||""};Object.entries(b).forEach(([w,v])=>{const T=document.getElementById(w);T&&(T.value=v)});const g=document.getElementById("set-maintenance-mode");g&&(g.checked=n.maintenanceMode||!1);const m=document.getElementById("logo-preview-img");m&&(m.src=t),localStorage.setItem("luxury-settings-cache",JSON.stringify(n))};window.resetToDefaultSettings=async function(){if(confirm("هل أنت متأكد من إعادة ضبط كافة الإعدادات؟ سيتم فقدان الشعارات والألوان المخصصة.")){const n={nameAr:"ون كار",nameEn:"ONE CAR",primaryColor:"#a11d21",secondaryColor:"#1c7c8c",accentColor:"#b8860b",defaultTheme:"dark",borderRadius:"16px",logo:"logo.jpg",aboutUs:"تجربة استثنائية في عالم السيارات",location:"الرياض - معارض القادسية"};await Be(W(z,"settings"),n),window.showLuxuryToast("تمت إعادة الضبط بنجاح")}};window.markAllNotificationsRead=async function(){try{const n=window.state.notifications.map(e=>Fn(W(z,`notifications/${e.id}`),{read:!0}));await Promise.all(n),window.showLuxuryToast("تم تحديد الكل كمقروء")}catch(n){console.error(n)}};window.switchSettingsTab=function(n,e){document.querySelectorAll(".set-pane").forEach(i=>i.classList.add("hidden")),document.querySelectorAll(".set-tab").forEach(i=>i.classList.remove("active"));const t=document.getElementById(n);t&&t.classList.remove("hidden"),e&&e.classList.add("active")};window.previewLogo=async function(n){if(n.files&&n.files[0])try{const e=await window.compressImage(n.files[0],400,400,.8);document.getElementById("logo-preview-img").src=e,document.getElementById("set-logo-b64").value=e}catch(e){console.error("Logo compression failed",e)}};window.saveAppSettings=async function(){var t,i,s,r,o,a,l,c,d,u,h,f,p,_,b,g,m,w,v,T;const n=document.querySelector('button[onclick="window.saveAppSettings()"]');n&&(n.disabled=!0,n.innerHTML='<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...');const e={nameAr:(t=document.getElementById("set-name-ar"))==null?void 0:t.value,nameEn:(i=document.getElementById("set-name-en"))==null?void 0:i.value,logo:((s=document.getElementById("set-logo-b64"))==null?void 0:s.value)||window.state.settings.logo||"logo.jpg",primaryColor:(r=document.getElementById("set-color-primary"))==null?void 0:r.value,secondaryColor:(o=document.getElementById("set-color-secondary"))==null?void 0:o.value,accentColor:(a=document.getElementById("set-color-accent"))==null?void 0:a.value,defaultTheme:(l=document.getElementById("set-default-theme"))==null?void 0:l.value,fontFamily:(c=document.getElementById("set-font-family"))==null?void 0:c.value,borderRadius:(d=document.getElementById("set-border-radius"))==null?void 0:d.value,contactAdmin:(u=document.getElementById("set-contact-mgmt"))==null?void 0:u.value,contactSales:(h=document.getElementById("set-contact-sales"))==null?void 0:h.value,contactComplaints:(f=document.getElementById("set-contact-complaints"))==null?void 0:f.value,contactEmail:(p=document.getElementById("set-contact-email"))==null?void 0:p.value,aboutUs:(_=document.getElementById("set-about-text"))==null?void 0:_.value,locationUrl:(b=document.getElementById("set-location-link"))==null?void 0:b.value,location:(g=document.getElementById("set-location-text"))==null?void 0:g.value,socialInsta:(m=document.getElementById("set-insta-link"))==null?void 0:m.value,socialSnap:(w=document.getElementById("set-snap-link"))==null?void 0:w.value,socialTwitter:(v=document.getElementById("set-twitter-link"))==null?void 0:v.value,maintenanceMode:((T=document.getElementById("set-maintenance-mode"))==null?void 0:T.checked)||!1,updatedAt:new Date().toISOString()};try{await Be(W(z,"settings"),e),window.showLuxuryToast("تم حفظ الإعدادات بنجاح"),window.createLog("تعديل إعدادات","تحديث شامل لإعدادات الموقع والمنصة","settings")}catch{window.showLuxuryToast("فشل الحفظ، تأكد من الصلاحيات","error")}finally{n&&(n.disabled=!1,n.innerHTML='<i class="fas fa-save"></i> حفظ التغييرات')}};window.filterUsersByRole=function(n,e){e&&(document.querySelectorAll("#users-roles-tabs .p-tab").forEach(t=>t.classList.remove("active")),e.classList.add("active")),window.state.userRoleFilter=n,window.syncAdminTables("users")};window.syncAdminTables=function(n){var s,r,o,a,l,c,d,u,h,f,p,_,b;if(n==="all"){["cars","ads","sales","bookings","users","plates","reviews","partners","brands","locations","blogs","whatsapp-monitor","quick-replies"].forEach(m=>window.syncAdminTables(m));return}if(n==="whatsapp-monitor"){window.renderWhatsAppMonitor();return}if(n==="quick-replies"||n==="quickReplies"){window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin(),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();return}const e=document.getElementById(`admin-${n}-table`);if(!e)return;let t=window.state[n]||[];const i=(((s=document.getElementById(`admin-${n}-search`))==null?void 0:s.value)||((r=document.getElementById(`${n}-search`))==null?void 0:r.value)||((o=document.getElementById(`${n.slice(0,-1)}-search`))==null?void 0:o.value)||"").toLowerCase();if(i&&(t=t.filter(g=>(g.make||g.title||g.name||g.model||g.phone||g.carRequested||g.carOrCompany||"").toLowerCase().includes(i))),n==="cars"){const g=document.getElementById("admin-filter-car-make");g&&g.options.length<=1&&window.state.cars.length>0&&[...new Set(window.state.cars.map(T=>T.make))].sort().forEach(T=>{const k=document.createElement("option");k.value=T,k.textContent=T,g.appendChild(k)});const m=((a=document.getElementById("admin-filter-car-status"))==null?void 0:a.value)||"all",w=((l=document.getElementById("admin-filter-car-make"))==null?void 0:l.value)||"all";m!=="all"&&(t=t.filter(v=>v.status===m)),w!=="all"&&(t=t.filter(v=>v.make===w))}if(n==="bookings"){const g=document.getElementById("filter-booking-staff");g&&g.options.length<=1&&window.state.users&&window.state.users.forEach(x=>{if(x.role==="admin"||x.role==="supervisor"||x.role==="staff"){const K=document.createElement("option");K.value=x.id,K.textContent=x.name||x.email||"مستخدم غير محدد",g.appendChild(K)}});const m=document.getElementById("filter-booking-sub-status");if(m&&m.options.length<=1){window.setBookingFilter(window.state.bookingFilter||"all",null,window.state.bookingSubStatusFilter||"all");return}const w=((c=document.getElementById("filter-booking-status"))==null?void 0:c.value)||window.state.bookingFilter||"all",v=((d=document.getElementById("filter-booking-sub-status"))==null?void 0:d.value)||window.state.bookingSubStatusFilter||"all",T=((u=document.getElementById("filter-booking-staff"))==null?void 0:u.value)||"all",k=((h=document.getElementById("filter-booking-type"))==null?void 0:h.value)||"all";window.state.bookingFilter=w,window.state.bookingSubStatusFilter=v,w!=="all"&&(t=t.filter(x=>{let K=x.status||"new";return w==="cancelled"&&(K==="rejected"||K==="cancelled")?!0:K===w})),v!=="all"&&(t=t.filter(x=>x.subStatus===v)),T!=="all"&&(t=t.filter(x=>x.assignedTo===T)),k!=="all"&&(t=t.filter(x=>(x.customerType||"individual")===k)),!(((f=window.state.userProfile)==null?void 0:f.role)==="admin"||((p=window.state.userProfile)==null?void 0:p.role)==="supervisor")&&window.state.user&&(t=t.filter(x=>x.assignedTo===window.state.user.uid))}if(n==="users"){const g=window.state.userRoleFilter||"all";g!=="all"&&(t=t.filter(T=>T.role===g));const m=document.getElementById("stat-users-total"),w=document.getElementById("stat-users-active"),v=document.getElementById("stat-users-admins");if(m&&(m.innerText=t.length),w){w.innerText=t.filter(k=>k.isAvailable).length;const T=w.nextElementSibling;T&&(T.innerText="متواجد حالياً")}if(v){const T=v.nextElementSibling;if(g==="all")v.innerText=t.filter(k=>k.role==="admin").length,T&&(T.innerText="مدراء النظام");else{v.innerText=t.length;const k={admin:"مدراء النظام",supervisor:"مشرفين",staff:"المندوبين"};T&&(T.innerText="إجمالي الـ "+(k[g]||""))}}}if(n==="bookings"?(((_=document.getElementById("filter-booking-sort"))==null?void 0:_.value)||"newest")==="oldest"?t.sort((m,w)=>new Date(m.createdAt||0)-new Date(w.createdAt||0)):t.sort((m,w)=>new Date(w.createdAt||0)-new Date(m.createdAt||0)):t.sort((g,m)=>new Date(m.createdAt||0)-new Date(g.createdAt||0)),t.length===0){e.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center; opacity:0.5;">لا توجد بيانات لهذه الفئة</div>';return}if(n==="users"){const g=window.state.bookings||[],m=((b=window.state.userProfile)==null?void 0:b.role)==="admin";let w=`<table class="admin-table-v2" style="width:100%; border-collapse:collapse; min-width:800px; font-size:14px;">
          <thead>
              <tr style="border-bottom: 2px solid var(--glass-border); text-align:right;">
                  <th style="padding:15px; color:var(--text-dim);">الموظف</th>
                  <th style="padding:15px; color:var(--text-dim);">الدور</th>
                  <th style="padding:15px; color:var(--text-dim);">الحالة</th>
                  <th style="padding:15px; color:var(--text-dim); text-align:center;">مكتمل</th>
                  <th style="padding:15px; color:var(--text-dim); text-align:center;">جاري</th>
                  <th style="padding:15px; color:var(--text-dim); text-align:center;">مرفوض</th>
                  <th style="padding:15px; color:var(--text-dim); text-align:center;">إجراءات</th>
              </tr>
          </thead>
          <tbody>`;t.forEach(v=>{const T=g.filter(H=>H.assignedTo===v.id),k=T.filter(H=>H.status==="sold"||H.status==="done").length,R=T.filter(H=>H.status==="new"||H.status==="waiting"||H.status==="inquiry"||!H.status).length,x=T.filter(H=>H.status==="cancelled").length,he={admin:"مسؤول",supervisor:"مشرف",staff:"مندوب"}[v.role]||"مندوب",Tt=v.image||"logo.jpg",Ce=v.phone||"";let je="";if(Ce){let H=Ce.replace(/\D/g,"");H=window.normalizePhone(H),je=`<a href="https://wa.me/${H}" target="_blank" class="icon-btn-lite success" title="مراسلة واتساب"><i class="fab fa-whatsapp"></i></a>`}w+=`<tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
              <td style="padding:15px;">
                  <div style="display:flex; align-items:center; gap:12px;">
                      <div style="width:40px; height:40px; border-radius:50%; overflow:hidden; background:#222; flex-shrink:0;">
                          <img src="${Tt}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                      </div>
                      <div>
                          <strong style="display:block; font-size:15px;">${v.name||v.email}</strong>
                          ${Ce?`<span style="font-size:12px; color:var(--text-dim);">${Ce}</span>`:""}
                      </div>
                  </div>
              </td>
              <td style="padding:15px;"><span style="color:var(--p-copper); font-size:13px;">${he}</span></td>
              <td style="padding:15px;"><span class="status-badge ${v.isAvailable?"online":"busy"}" style="font-size:11px;">● ${v.isAvailable?"متاح":"غير متاح"}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#00a884; font-weight:bold; font-size:15px;">${k}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:var(--p-gold); font-weight:bold; font-size:15px;">${R}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#e02424; font-weight:bold; font-size:15px;">${x}</span></td>
              <td style="padding:15px; text-align:center;">
                  <div style="display:flex; justify-content:center; gap:8px;">
                      ${je}
                      <button class="icon-btn-lite" onclick="window.editLuxuryItem('users', '${v.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                      ${m?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${v.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
                  </div>
              </td>
          </tr>`}),w+="</tbody></table>",e.innerHTML=w;return}e.innerHTML=t.map(g=>Zb(n,g)).join("")};function Zb(n,e){var a,l,c;const t=((a=window.state.userProfile)==null?void 0:a.role)==="admin"||((l=window.state.userProfile)==null?void 0:l.role)==="supervisor",i=e.status==="sold"?"danger":e.status==="available"?"success":"warning",s=e.status==="sold"?"مباع":e.status==="available"?"متاح":"محجوز";if(n==="bookings"){const d=((c=window.state.users.find(_=>_.id===e.assignedTo))==null?void 0:c.name)||"غير محدد",u={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",done:"تم",cancelled:"مرفوض",rejected:"مرفوض"},h={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"},f=e.status==="cancelled"||e.status==="rejected"?"danger":e.status==="sold"||e.status==="done"?"success":"warning",p=e.subStatus?h[e.subStatus]||e.subStatus:"";return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:16px;">${e.name||e.phone}</strong>
                    <div class="meta-row" style="font-size:12px; color:var(--text-dim); margin-top:5px; display:flex; gap:10px; flex-wrap:wrap;">
                        <span><i class="fas fa-car"></i> ${e.carOrCompany||e.carRequested||"-"}</span> | 
                        <span><i class="fas fa-user-tie"></i> ${d}</span>
                        ${p?`| <span style="color:var(--p-copper);"><i class="fas fa-info-circle"></i> ${p}</span>`:""}
                    </div>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${f}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${u[e.status]||e.status||"جديد"}</span>
                    <button class="icon-btn-lite view" onclick="window.viewBookingDetails('${e.id}')" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('bookings', '${e.id}')" title="تعديل الحجز" aria-label="Edit Booking"><i class="fas fa-edit"></i></button>
                    ${t?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('bookings', '${e.id}')" title="حذف الحجز" aria-label="Delete Booking"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `}if(n==="cars")return`
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
                    ${t?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('cars', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('cars', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `;if(n==="users")return`
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
                    ${t?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${e.id}')" title="حذف المستخدم" aria-label="Delete User"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>
        `;if(n==="plates")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <strong style="display:block; font-size:18px; letter-spacing:2px;">${e.number} ${e.letters}</strong>
                    <span style="font-size:12px; color:var(--p-copper);">${Number(e.price).toLocaleString()} ريال</span>
                </div>
                <div class="admin-actions" style="display:flex; gap:10px; align-items:center;">
                    <span class="badge-${i}" style="font-size:10px; padding:3px 8px; border-radius:5px;">${s}</span>
                    ${t?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('plates', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('plates', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `;if(n==="notifications"){const d=!!e.read;return`
            <div class="admin-item-row" style="background:${d?"rgba(255,255,255,0.01)":"rgba(28, 124, 140, 0.05)"}; padding:15px; border-radius:12px; border:1px solid ${d?"var(--glass-border)":"var(--p-teal)"}; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <div style="display:flex; align-items:center; gap:10px;">
                        ${d?"":'<span style="width:8px; height:8px; background:var(--p-teal); border-radius:50%;"></span>'}
                        <strong style="display:block; font-size:15px;">${e.title||"تنبيه بالنظام"}</strong>
                    </div>
                    <p style="font-size:13px; opacity:0.8; margin-top:4px;">${e.text||e.message||""}</p>
                    <span style="font-size:11px; opacity:0.5; margin-top:5px; display:block;"><i class="far fa-clock"></i> ${new Date(e.timestamp).toLocaleString()}</span>
                </div>
                ${t?`
                <div class="admin-actions">
                    <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('notifications', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
                `:""}
            </div>
        `}if(n==="logs")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:10px; border-radius:10px; font-size:12px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <strong style="color:var(--p-teal);">${e.action}</strong>
                    <span style="opacity:0.5;">${new Date(e.timestamp).toLocaleString()}</span>
                </div>
                <p style="opacity:0.8;">${e.details}</p>
                <div style="margin-top:5px; font-size:10px; opacity:0.6;">بواسطة: ${e.user}</div>
            </div>
        `;if(n==="sales"){const d=(e.url||"").trim();let u=d.includes("youtube.com")||d.includes("youtu.be"),h=e.poster||e.image||null;if(u&&!h){let f="";try{d.includes("v=")?f=d.split("v=")[1].split("&")[0]:d.includes("youtu.be/")?f=d.split("youtu.be/")[1].split("?")[0]:d.includes("embed/")?f=d.split("embed/")[1].split("?")[0]:f=d.split("/").pop().split("?")[0]}catch{f=""}f&&(h=`https://img.youtube.com/vi/${f}/mqdefault.jpg`)}return h=h||"logo.jpg",`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:12px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
                <div class="admin-item-thumb" style="width:80px; height:50px; border-radius:10px; overflow:hidden; flex-shrink:0; background:#000;">
                    <img src="${h}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                </div>
                <div class="admin-item-info" style="flex-grow:1;">
                    <strong style="display:block; font-size:16px;">${e.title||e.name||"لحظة تسليم"}</strong>
                    <div style="font-size:11px; color:var(--text-dim); margin-top:4px; max-width:400px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                        <i class="fas fa-link"></i> ${d}
                    </div>
                </div>
                <div class="admin-actions">
                    <button class="icon-btn-lite view" onclick="window.openVideoLightbox('${d}')" title="معاينة"><i class="fas fa-eye"></i></button>
                    ${t?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('sales', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('sales', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `}if(n==="reviews"){const d=Number(e.rating||5),u=e.text?e.text.length>60?e.text.substring(0,60)+"...":e.text:"لا يوجد نص",h=e.avatar||e.image||"";return`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:16px; border:1px solid var(--glass-border); margin-bottom:12px; display:flex; align-items:center; gap:20px;">
            <div class="admin-item-avatar" style="width:50px; height:50px; border-radius:50%; overflow:hidden; flex-shrink:0; background:var(--bg-alt); border:2px solid var(--p-copper); display:flex; align-items:center; justify-content:center; color:var(--p-copper); font-weight:900;">
                ${h?`<img src="${h}" style="width:100%; height:100%; object-fit:cover;">`:(e.name||"U").charAt(0)}
            </div>
            <div class="admin-item-info" style="flex-grow:1;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
                    <strong style="font-size:16px;">${e.name||"عميل مجهول"}</strong>
                    <div class="review-stars-lite" style="color:#ffd700; font-size:11px;">
                        ${'<i class="fas fa-star"></i>'.repeat(d)}
                    </div>
                </div>
                <p style="font-size:13px; color:var(--text-dim); margin-top:2px;">"${u}"</p>
                ${e.car?`<span style="font-size:11px; color:var(--p-copper); opacity:0.8; display:block; margin-top:5px;"><i class="fas fa-car-side"></i> ${e.car}</span>`:""}
            </div>
            <div class="admin-actions">
                ${t?`
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('reviews', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('reviews', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                `:""}
            </div>
        </div>
    `}const r=e.make?`${e.make} ${e.model}`:e.title||e.name||"بدون عنوان",o=e.image||e.logo||e.poster||null;return`
        <div class="admin-item-row" onclick="window.editLuxuryItem('${n}', '${e.id}')" style="cursor:pointer;">
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
                <button class="icon-btn-lite" onclick="window.editLuxuryItem('${n}', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                ${t?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('${n}', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
            </div>
        </div>
    `}window.updateStatistics=function(){var d,u,h,f;const n=document.getElementById("stat-cars-count-v2"),e=document.getElementById("stat-bookings-count-v2"),t=document.getElementById("stat-total-value-v2"),i=window.state.cars||[];let s=window.state.bookings||[];if(!(((d=window.state.userProfile)==null?void 0:d.role)==="admin"||((u=window.state.userProfile)==null?void 0:u.role)==="supervisor")&&window.state.user&&(s=s.filter(p=>p.assignedTo===window.state.user.uid)),n&&(n.innerText=i.length),e&&(e.innerText=s.length),t){const p=i.reduce((_,b)=>_+(parseFloat(b.price)||0),0);t.innerText=p.toLocaleString()+" ريال"}const o={all:s.length,new:s.filter(p=>p.status==="new"||!p.status).length,waiting:s.filter(p=>p.status==="waiting").length,inquiry:s.filter(p=>p.status==="inquiry").length,sold:s.filter(p=>p.status==="sold").length,done:s.filter(p=>p.status==="done").length,cancelled:s.filter(p=>p.status==="cancelled"||p.status==="rejected").length,sub:{not_contacted:s.filter(p=>p.subStatus==="not_contacted").length,contacted:s.filter(p=>p.subStatus==="contacted").length,docs_received:s.filter(p=>p.subStatus==="docs_received").length,waiting_calc:s.filter(p=>p.subStatus==="waiting_calc").length,waiting_docs:s.filter(p=>p.subStatus==="waiting_docs").length,waiting_signature:s.filter(p=>p.subStatus==="waiting_signature").length,docs_not_received:s.filter(p=>p.subStatus==="docs_not_received").length,signed:s.filter(p=>p.subStatus==="signed").length,delivered:s.filter(p=>p.subStatus==="delivered").length,done:s.filter(p=>p.subStatus==="done").length,no_response:s.filter(p=>p.subStatus==="no_response").length,obligations:s.filter(p=>p.subStatus==="obligations").length,calc_rejected:s.filter(p=>p.subStatus==="calc_rejected").length,ineligible:s.filter(p=>p.subStatus==="ineligible").length,duplicate:s.filter(p=>p.subStatus==="duplicate").length}};Object.entries(o).forEach(([p,_])=>{const b=document.getElementById(`count-${p}`);b&&(b.innerText=_)}),Object.entries(o.sub).forEach(([p,_])=>{const b=document.getElementById(`count-sub-${p}`);b&&(b.innerText=_)});const a=document.getElementById("bookings-badge");a&&(a.innerText=o.new,a.classList.toggle("hidden",o.new===0));const l=(h=window.state.user)==null?void 0:h.uid;if(((f=window.state.userProfile)==null?void 0:f.role)==="staff"&&l){const p=document.getElementById("staff-quick-stats");p&&p.classList.remove("hidden");const _=(window.state.bookings||[]).filter(x=>x.assignedTo===l),b=_.filter(x=>x.status==="new"||!x.status).length,g=_.length,m=_.filter(x=>x.status==="sold").length,w=g>0?Math.round(m/g*100):0,v=document.getElementById("staff-waiting-count"),T=document.getElementById("staff-total-assigned"),k=document.getElementById("staff-conversion-rate"),R=document.getElementById("availability-toggle");v&&(v.innerText=b),T&&(T.innerText=g),k&&(k.innerText=w+"%"),R&&(R.checked=window.state.userProfile.isAvailable!==!1)}};window.deleteLuxuryItem=async function(n,e){if(confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذه العملية."))try{await Lc(W(z,`${n}/${e}`)),window.showLuxuryToast("تم الحذف بنجاح"),window.createLog("حذف",`حذف عنصر من ${n} (ID: ${e})`,"data")}catch{window.showLuxuryToast("فشل الحذف","error")}};window.editLuxuryItem=function(n,e){const t=(window.state[n]||[]).find(s=>s.id===e);!t||(window.state.currentEdit={type:n,id:e},!document.getElementById("item-form"))||(n==="cars"&&(window.state.carImages=[],t.image&&window.state.carImages.push({type:"url",value:t.image,isMain:!0}),t.images&&Array.isArray(t.images)&&t.images.forEach(s=>{s!==t.image&&window.state.carImages.push({type:"url",value:s,isMain:!1})})),ru(n,t),window.setModalTitle("item-modal",`تعديل: ${t.make||t.title||n}`),window.openModal("item-modal"))};window.openCRUDModal=function(n,e=null){var s;if(window.state.currentEdit={type:n,id:e},!document.getElementById("item-form"))return;const i=e?((s=window.state[n])==null?void 0:s.find(r=>r.id===e))||{}:{};n==="cars"&&(window.state.carImages=[],i.image&&window.state.carImages.push({type:"url",value:i.image,isMain:!0}),i.images&&Array.isArray(i.images)&&i.images.forEach(r=>{r!==i.image&&window.state.carImages.push({type:"url",value:r,isMain:!1})})),ru(n,i),window.setModalTitle("item-modal",e?`تعديل: ${n}`:`إضافة: ${n}`),window.openModal("item-modal")};function ru(n,e={}){const t=document.getElementById("dynamic-form-fields");if(!t)return;let i=[];if(n==="cars"){const s=(window.state.brands||[]).map(r=>({v:r.name,t:r.name}));i=[{name:"make",label:"الماركة",type:"select",options:[{v:"",t:"اختر الماركة"},...s],required:!0},{name:"model",label:"الموديل",type:"text",required:!0},{name:"year",label:"السنة",type:"number",required:!0},{name:"price",label:"السعر",type:"number",required:!0},{name:"mileage",label:"الممشى (كم)",type:"number",required:!0},{name:"engine",label:"المحرك",type:"text",placeholder:"مثال: 8 سليندر، 4.0L"},{name:"gearbox",label:"ناقل الحركة",type:"select",options:[{v:"أوتوماتيك",t:"أوتوماتيك"},{v:"عادي",t:"عادي"}]},{name:"fuelType",label:"نوع الوقود",type:"select",options:[{v:"بنزين",t:"بنزين"},{v:"ديزل",t:"ديزل"},{v:"هايبرد",t:"هايبرد"},{v:"كهرباء",t:"كهرباء"}]},{name:"bodyType",label:"فئة السيارة",type:"select",options:[{v:"sedan",t:"سيدان"},{v:"suv",t:"SUV"},{v:"coupe",t:"كوبيه"},{v:"luxury",t:"فاخرة"},{v:"pickup",t:"بيك آب"}]},{name:"color",label:"اللون خارجي",type:"text"},{name:"interiorColor",label:"اللون داخلي",type:"text"},{name:"status",label:"الحالة في المخزون",type:"select",options:[{v:"available",t:"متاح"},{v:"reserved",t:"محجوز"},{v:"sold",t:"مباع"},{v:"incoming",t:"قادم قريباً"}]},{name:"isFeatured",label:"عرض في قسم المميز؟",type:"select",options:[{v:!1,t:"لا"},{v:!0,t:"نعم"}]},{name:"desc",label:"وصف إضافي ومواصفات",type:"textarea"},{name:"_image_manager",label:"صور السيارة (المعرض)",type:"custom",html:`
        <div class="f-group full-width">
          <label>إدارة صور السيارة (المعرض والصورة الرئيسية)</label>
          <div class="img-manager-v2" id="car-image-manager">
            <!-- Rendered by window.renderCarImageManager -->
          </div>
          <input type="file" id="car-file-input" multiple accept="image/*" style="display:none;" onchange="window.handleCarFileSelect(this.files)">
        </div>
      `}],setTimeout(()=>window.renderCarImageManager(),100)}else n==="ads"?i=[{name:"title",label:"العنوان",type:"text"},{name:"subtitle",label:"العنوان الفرعي",type:"text"},{name:"image",label:"صورة الإعلان (من الجهاز)",type:"file"},{name:"link",label:"الرابط (اختياري)",type:"text"}]:n==="sales"?i=[{name:"title",label:"العنوان",type:"text"},{name:"description",label:"وصف قصير",type:"textarea"},{name:"url",label:"رابط الفيديو (MP4 أو YouTube)",type:"text"},{name:"poster",label:"رابط صورة الغلاف",type:"text"}]:n==="reviews"?i=[{name:"name",label:"اسم العميل",type:"text",required:!0,placeholder:"مثال: عبدالله محمد"},{name:"car",label:"السيارة المشتراة (اختياري)",type:"text",placeholder:"مثال: تويوتا كامري 2024"},{name:"rating",label:"التقييم من 5 نجوم",type:"number",required:!0,placeholder:"5"},{name:"avatar",label:"رابط صورة العميل (اختياري)",type:"text",placeholder:"https://..."},{name:"text",label:"محتوى الرأي",type:"textarea",required:!0,placeholder:"لقد كانت تجربة رائعة مع هذا المعرض..."}]:n==="partners"?i=[{name:"name",label:"اسم الشريك",type:"text"},{name:"logo",label:"شعار الشريك (من الجهاز)",type:"file"},{name:"link",label:"رابط خارجي (اختياري)",type:"text"}]:n==="brands"?i=[{name:"name",label:"اسم العلامة التجارية",type:"text"},{name:"logo",label:"شعار البراند (من الجهاز)",type:"file"}]:n==="blogs"?i=[{name:"title",label:"عنوان المقال",type:"text"},{name:"image",label:"صورة المقال (من الجهاز)",type:"file"},{name:"content",label:"محتوى المقال",type:"textarea"}]:n==="locations"?i=[{name:"name",label:"اسم المدينة/الدولة",type:"text"},{name:"status",label:"الحالة",type:"select",options:[{v:"active",t:"نشط"},{v:"inactive",t:"غير نشط"}]}]:n==="plates"?i=[{name:"number",label:"رقم اللوحة",type:"text"},{name:"letters",label:"حروف اللوحة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"status",label:"الحالة",type:"select",options:[{v:"available",t:"متاح"},{v:"sold",t:"مباع"}]}]:n==="specs"?i=[{name:"name",label:"اسم المواصفة",type:"text"},{name:"icon",label:"أيقونة (FontAwesome)",type:"text"}]:n==="packages"?i=[{name:"name",label:"اسم الباقة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"features",label:"المميزات (فاصلة بين كل ميزة)",type:"textarea"}]:n==="bookings"?i=[{name:"name",label:"اسم العميل",type:"text"},{name:"phone",label:"الجوال",type:"text"},{name:"carRequested",label:"السيارة المطلوبة",type:"text"},{name:"status",label:"حالة الطلب",type:"select",options:[{v:"new",t:"جديد"},{v:"waiting",t:"بالانتظار"},{v:"inquiry",t:"استفسار"},{v:"sold",t:"مكتمل"},{v:"done",t:"تم"},{v:"cancelled",t:"مرفوض"}]},{name:"subStatus",label:"الحالة التفصيلية",type:"select",options:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"},{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"},{v:"docs_not_received",t:"لم يتم استلام الاوراق"},{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"},{v:"done",t:"تم"},{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]},{name:"assignedTo",label:"الموظف المسؤول",type:"select",options:[{v:"",t:"غير محدد"},...window.state.users.filter(s=>s.role==="staff").map(s=>({v:s.id,t:s.name||s.email}))]},{name:"notes",label:"ملاحظات",type:"textarea"}]:n==="users"?i=[{name:"name",label:"الاسم الكامل",type:"text"},{name:"email",label:"البريد الإلكتروني",type:"text"},{name:"role",label:"الصلاحية",type:"select",options:[{v:"staff",t:"موظف"},{v:"supervisor",t:"مشرف"},{v:"admin",t:"مدير"}]},{name:"isAvailable",label:"متاح لاستلام الطلبات؟",type:"select",options:[{v:!0,t:"نعم"},{v:!1,t:"لا"}]}]:n==="quickReplies"?i=[{name:"title",label:"عنوان الرد السريع",type:"text",required:!0,placeholder:"مثال: ترحيب بالعملاء الجدد"},{name:"content",label:"محتوى الرسالة الكامل",type:"textarea",required:!0,placeholder:"اكتب هنا نص الرسالة التي ستظهر للموظف لاستخدامها..."}]:n==="sales"?i=[{name:"title",label:"عنوان الفيديو",type:"text",required:!0,placeholder:"مثال: تسليم سيارة مرسيدس G-Class"},{name:"url",label:"رابط الفيديو (YouTube أو مباشر)",type:"text",required:!0,placeholder:"https://youtube.com/watch?v=..."},{name:"poster",label:"رابط صورة الغلاف (اختياري)",type:"text",placeholder:"https://..."},{name:"description",label:"وصف مبسط",type:"textarea",placeholder:"يسعدنا دائماً مشاركة لحظات نجاحنا..."}]:i=[{name:"name",label:"الاسم / العنوان",type:"text"},{name:"desc",label:"الوصف",type:"textarea"}];t.innerHTML=`
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
  `}window.handleCarFileSelect=function(n){if(n){for(let e=0;e<n.length;e++){const t=n[e];window.state.carImages.push({type:"file",value:t,preview:URL.createObjectURL(t),isMain:window.state.carImages.length===0})}window.renderCarImageManager()}};window.renderCarImageManager=function(){const n=document.getElementById("car-image-manager");if(!n)return;let t=`
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
  `;n.innerHTML=t};window.reorderCarImage=function(n,e){const t=window.state.carImages,i=n+e;if(i>=0&&i<t.length){const s=t[n];t[n]=t[i],t[i]=s,window.renderCarImageManager()}};window.removeCarImage=function(n){if(n<0||n>=window.state.carImages.length)return;const e=window.state.carImages[n].isMain;window.state.carImages.splice(n,1),e&&window.state.carImages.length>0&&(window.state.carImages[0].isMain=!0),window.renderCarImageManager()};window.setCarMainImage=function(n){window.state.carImages.forEach((e,t)=>e.isMain=t===n),window.renderCarImageManager()};window.saveLuxuryItem=async function(n){n&&n.preventDefault();const e=window.state.currentEdit;if(!e)return;const{type:t,id:i}=e,s=document.getElementById("item-form");if(!s)return;const r=s.querySelector('button[type="submit"]'),o=r.innerText;r&&(r.disabled=!0,r.innerText="جاري الحفظ والمعالجة...");const a=new FormData(s),l={};a.forEach((c,d)=>{d!=="main_img_file"&&d!=="gallery_files"&&(l[d]=c)});try{if(t==="cars"){const h=[];let f="";const p=window.state.carImages||[];for(let _=0;_<p.length;_++){const b=p[_];let g="";b.type==="url"?g=b.value:b.type==="file"&&(g=await window.compressImage(b.value,1e3,1e3,.6)),g&&(h.push(g),b.isMain&&(f=g))}!f&&h.length>0&&(f=h[0]),l.image=f,l.images=h}const c=["image","logo","avatar","poster"];for(const h of c)l[h]instanceof File&&l[h].size>0?l[h]=await window.compressImage(l[h],1e3,1e3,.7):l[h]instanceof File&&l[h].size===0&&delete l[h];["price","year","mileage","rating","installmentPeriod"].forEach(h=>{l[h]!==void 0&&l[h]!==""&&l[h]!==null&&(l[h]=Number(l[h]))}),l.isFeatured!==void 0&&(l.isFeatured=l.isFeatured==="true"||l.isFeatured===!0),i||(l.createdAt=new Date().toISOString()),l.updatedAt=new Date().toISOString();const u=i?W(z,`${t}/${i}`):zt(W(z,t));await(i?Fn(u,l):Be(u,l)),window.showLuxuryToast(i?"تم تحديث البيانات بنجاح":"تم إضافة العنصر بنجاح"),window.closeModal("item-modal"),window.createLog(i?"تعديل":"إضافة",`${i?"تعديل":"إضافة"} في ${t} - ${l.make||l.title||i}`,"data")}catch(c){console.error("Save Error:",c),window.showLuxuryToast("حدث خطأ أثناء الحفظ: "+(c.message||"خطأ غير معروف"),"error")}finally{r&&(r.disabled=!1,r.innerText=o)}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.renderQuickRepliesAdmin=function(){var i;const n=document.getElementById("quick-replies-list");if(!n)return;const e=(((i=document.getElementById("qr-search"))==null?void 0:i.value)||"").toLowerCase().trim(),t=(window.state.quickReplies||[]).filter(s=>(s.title||"").toLowerCase().includes(e)||(s.content||"").toLowerCase().includes(e));if(t.length===0){n.innerHTML='<div class="no-results-v2" style="grid-column:1/-1;"><p>لا توجد نتائج مطابقة لبحثك</p></div>';return}n.innerHTML=t.map(s=>`
        <div class="admin-item-card-v2 animate-fade-in" data-aos="fade-up">
            <div class="item-card-content">
                <div class="item-card-header">
                    <div class="item-icon-circle"><i class="fas fa-bolt"></i></div>
                    <strong>${s.title}</strong>
                </div>
                <div class="item-card-body">
                    <p class="qr-content-preview">${s.content}</p>
                </div>
            </div>
            <div class="item-card-actions">
                <button class="icon-btn-lite" onclick="window.editLuxuryItem('quickReplies', '${s.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('quickReplies', '${s.id}')" title="حذف"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join("")};window.renderAdsSlider=function(){const n=document.getElementById("slider-track"),e=document.getElementById("slider-dots");if(!n)return;const t=window.state.ads||[];if(t.length===0){n.innerHTML='<div class="no-ads"></div>',e&&(e.innerHTML="");return}n.innerHTML=t.map(i=>`
        <div class="ad-slide">
            <img src="${i.image||"logo.jpg"}" class="ad-bg-img" alt="${i.title||"عرض خاص"}">
            <div class="ad-content">
                <h2 class="luxury-font">${i.title||""}</h2>
                <p>${i.subtitle||""}</p>
                ${i.link?`<a href="${i.link}" class="btn-premium"><span>اكتشف المزيد</span> <i class="fas fa-arrow-left" style="margin-right: 10px;"></i></a>`:""}
            </div>
        </div>
    `).join(""),e&&(e.innerHTML=t.map((i,s)=>`<div class="dot ${s===0?"active":""}" onclick="window.goToLuxurySlide(${s})"></div>`).join("")),window.state.sliderIndex=0,window.moveLuxurySlider(0)};window.goToLuxurySlide=function(n){window.state.sliderIndex=n,window.moveLuxurySlider(0)};window.moveLuxurySlider=function(n){var o;const e=document.getElementById("slider-track");if(!e)return;const t=((o=window.state.ads)==null?void 0:o.length)||0;if(t<=1){e.style.transform="translateX(0)";return}window.state.sliderIndex=(window.state.sliderIndex+n+t)%t;const i=window.state.sliderIndex*100,s=document.body.dir==="rtl";e.style.transform=`translateX(${s?i:-i}%)`,document.querySelectorAll(".slider-dots .dot").forEach((a,l)=>{a.classList.toggle("active",l===window.state.sliderIndex)})};window.calculateLuxuryFinancing=function(){var l,c,d;const n=Number((l=document.getElementById("calc-car-price"))==null?void 0:l.value)||0,e=Number((c=document.getElementById("calc-down-pay"))==null?void 0:c.value)||0,t=Number((d=document.getElementById("calc-years"))==null?void 0:d.value)||5,i=document.getElementById("calc-result-val");if(!i)return;const s=n-e;if(s<=0){i.innerText="0 ريال";return}const o=s*(1+.045*t),a=Math.round(o/(t*12));i.innerText=a.toLocaleString()+" ريال"};window.renderSalesVideos=function(){const n=document.getElementById("sales-container");if(!n)return;const e=window.state.sales||[];if(e.length===0){n.innerHTML='<div class="no-results-v2"><p>لا توجد مقاطع فيديو متاحة حالياً</p></div>';return}n.innerHTML=e.map(t=>{const i=(t.url||"").trim();let s=i.includes("youtube.com")||i.includes("youtu.be")||i.includes("youtube-nocookie.com"),r=i.includes("tiktok.com"),o=i.includes("instagram.com"),a=i.includes("snapchat.com"),l=t.poster||t.image||null;if(s&&!l){let c="";try{i.includes("v=")?c=i.split("v=")[1].split("&")[0]:i.includes("youtu.be/")?c=i.split("youtu.be/")[1].split("?")[0]:i.includes("embed/")?c=i.split("embed/")[1].split("?")[0]:c=i.split("/").pop().split("?")[0]}catch{c=""}c&&(l=`https://img.youtube.com/vi/${c}/hqdefault.jpg`)}return l=l||"logo.jpg",`
            <div class="video-card-v2" data-aos="zoom-in" onclick="window.openVideoLightbox('${i}')">
                <div class="video-player-wrap">
                    <div class="video-inner">
                        <img src="${l}" alt="${t.title||"Success Moment"}" onerror="this.src='logo.jpg'" style="width:100%; height:100%; object-fit:cover;">
                        <div class="v-play-overlay">
                            <div class="v-play-btn"><i class="fas fa-play"></i></div>
                        </div>
                        ${s?'<div class="v-platform-icon"><i class="fab fa-youtube"></i></div>':r?'<div class="v-platform-icon"><i class="fab fa-tiktok"></i></div>':o?'<div class="v-platform-icon"><i class="fab fa-instagram"></i></div>':a?'<div class="v-platform-icon"><i class="fab fa-snapchat"></i></div>':""}
                    </div>
                </div>
                <div class="video-info-v2">
                    <span class="v-badge-gold"><i class="fas fa-award"></i> مبيعات ناجحة</span>
                    <h3>${t.title||t.name||"لحظة تسليم"}</h3>
                    <p>${t.description||"يسعدنا دائماً مشاركة لحظات نجاحنا مع عملائنا الكرام."}</p>
                </div>
            </div>`}).join("")};window.openVideoLightbox=function(n){let e="";if(n.includes("youtube.com")||n.includes("youtu.be")){let i="";try{n.includes("v=")?i=n.split("v=")[1].split("&")[0]:n.includes("youtu.be/")?i=n.split("youtu.be/")[1].split("?")[0]:n.includes("embed/")?i=n.split("embed/")[1].split("?")[0]:i=n.split("/").pop().split("?")[0]}catch{i=""}e=`<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${i}?autoplay=1&modestbranding=1&rel=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`}else e=`<video controls autoplay style="width:100%; height:100%; border-radius:15px; background:#000;">
                        <source src="${n}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>`;const t=document.createElement("div");t.className="luxury-lightbox",t.id="video-lightbox",t.innerHTML=`
        <button class="lb-close" onclick="this.parentElement.remove()">&times;</button>
        <div class="lb-content animate-fade-in" style="max-width:1000px; width:95%; aspect-ratio:16/9; margin-top:0;">
            ${e}
        </div>
    `,document.body.appendChild(t)};window.toggleWAWidget=function(){const n=document.getElementById("wa-widget");n&&n.classList.toggle("hidden")};window.sendWAWidgetMsg=function(){var i;const n=document.getElementById("wa-input"),e=(i=n==null?void 0:n.value)==null?void 0:i.trim();if(!e)return;const t=window.state.settings.contactSales||"0500000000";window.open(`https://wa.me/${window.normalizePhone(t)}?text=${encodeURIComponent(e)}`,"_blank"),n&&(n.value=""),window.toggleWAWidget()};window.createLog=async function(n,e,t="general"){var i,s;try{const r=zt(W(z,"logs"));await Be(r,{user:((i=window.state.user)==null?void 0:i.email)||"Visitor",userId:((s=window.state.user)==null?void 0:s.uid)||null,action:n,details:e,category:t,timestamp:new Date().toISOString()})}catch(r){console.error("Log Error:",r)}};window.submitBooking=async function(n){var a,l,c,d,u,h,f,p,_,b,g,m,w,v,T,k,R,x,K,he,Tt,Ce,je,H,zn;n.preventDefault();const e=n.target,t=e.querySelector('button[type="submit"]');let i=(((a=document.getElementById("b-phone-code"))==null?void 0:a.value)==="other"?(l=document.getElementById("b-phone-code-other"))==null?void 0:l.value:(c=document.getElementById("b-phone-code"))==null?void 0:c.value)||"966",s=((d=document.getElementById("b-phone"))==null?void 0:d.value)||"";i=i.replace(/\D/g,""),s=s.replace(/\D/g,""),s.startsWith("05")||s.startsWith("5")&&s.length===9||s.startsWith("9665")?(i="966",s.startsWith("05")&&(s=s.substring(1)),s.startsWith("966")&&(s=s.substring(3))):s.startsWith("07")||s.startsWith("7")&&s.length===9||s.startsWith("9677")?(i="967",s.startsWith("07")&&(s=s.substring(1)),s.startsWith("967")&&(s=s.substring(3))):(i&&s.startsWith(i)&&(s=s.substring(i.length)),i&&s.startsWith("00"+i)&&(s=s.substring(i.length+2)));const r=window.normalizePhone(i+s),o={customerType:((u=e.querySelector('[name="customer-type"]:checked'))==null?void 0:u.value)||"individual",carRequested:((h=document.getElementById("b-car"))==null?void 0:h.value)||"",name:((f=document.getElementById("b-name"))==null?void 0:f.value)||"",phone:r,age:((p=document.getElementById("b-age"))==null?void 0:p.value)||"",email:((_=document.getElementById("b-email"))==null?void 0:_.value)||"",nationality:((b=document.getElementById("b-nationality"))==null?void 0:b.value)==="مقيم"?((g=document.getElementById("b-nationality-other"))==null?void 0:g.value)||"مقيم":((m=document.getElementById("b-nationality"))==null?void 0:m.value)||"سعودي",city:((w=document.getElementById("b-city"))==null?void 0:w.value)==="أخرى"?((v=document.getElementById("b-city-other"))==null?void 0:v.value)||"أخرى":((T=document.getElementById("b-city"))==null?void 0:T.value)||"",paymentMethod:((k=e.querySelector('[name="payment-method"]:checked'))==null?void 0:k.value)||"كاش",bankName:((R=document.getElementById("b-bank-name"))==null?void 0:R.value)||"",installmentPeriod:((x=document.getElementById("b-installment-period"))==null?void 0:x.value)||"",salary:((K=document.getElementById("b-salary"))==null?void 0:K.value)||"",commitments:((he=document.getElementById("b-commitments"))==null?void 0:he.value)||"",workEntity:((Tt=document.getElementById("b-work-entity"))==null?void 0:Tt.value)||"حكومي",workStatus:((Ce=document.getElementById("b-work-status"))==null?void 0:Ce.value)||"معتمد",contactMethod:((je=e.querySelector('[name="contact-method"]:checked'))==null?void 0:je.value)||"الجوال",preferredTime:((H=e.querySelector('[name="preferred-time"]:checked'))==null?void 0:H.value)||"10am - 1pm",notes:((zn=document.getElementById("b-notes"))==null?void 0:zn.value)||"",status:"new",subStatus:"not_contacted",createdAt:new Date().toISOString()};t.disabled=!0,t.innerText="جاري الإرسال...";try{const tn=W(z,"config/lastAssignedStaffIndex_v2"),kt=window.state.users.filter(St=>St.role==="staff"&&St.isAvailable!==!1);kt.length>0&&await Yr(tn,St=>{let xt=St||0;xt>=kt.length&&(xt=0);const Vn=kt[xt];return o.assignedTo=Vn.id,(xt+1)%kt.length});const Hn=zt(W(z,"bookings"));await Be(Hn,o),o.assignedTo&&await zt(W(z,"notifications"),{userId:o.assignedTo,type:"new_booking",title:"طلب جديد مسند إليك",body:`لديك طلب جديد من ${o.name} للسيارة ${o.carRequested}`,bookingId:Hn.key,read:!1,createdAt:new Date().toISOString()}),window.showLuxuryToast("تم إرسال طلبك بنجاح، سنتواصل معك قريباً"),e.reset()}catch(tn){console.error(tn),window.showLuxuryToast("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً","error")}finally{t.disabled=!1,t.innerText="تأكيد طلب حجز الخدمة"}};window.fillAIInput=function(n){const e=document.getElementById("ai-chat-input");e&&(e.value=n)};window.clearAIChat=function(){const n=document.getElementById("ai-messages-area");n&&(n.innerHTML="")};window.askLuxuryAI=function(){var i;const n=document.getElementById("ai-chat-input"),e=(i=n==null?void 0:n.value)==null?void 0:i.trim();if(!e)return;Ms("user",e),n.value="";const t="ai-typing-"+Date.now();Ms("bot","جاري التفكير...",t),setTimeout(()=>{const s=document.getElementById(t);s&&s.remove();const r=eE(e);Ms("bot",r)},1e3)};function Ms(n,e,t=null){const i=document.getElementById("ai-messages-area");if(!i)return;const s=document.createElement("div");s.className=`ai-msg ${n}`,t&&(s.id=t),s.innerHTML=`
        <div class="msg-icon"><i class="fas ${n==="bot"?"fa-robot":"fa-user"}"></i></div>
        <div class="msg-content">
            <p>${e}</p>
        </div>
    `,i.appendChild(s),i.scrollTop=i.scrollHeight}function eE(n){const e=n.toLowerCase(),t=window.state.cars||[],i=window.state.bookings||[];return e.includes("قيمة")||e.includes("مخزون")?`إجمالي قيمة المخزون الحالي هو ${t.reduce((r,o)=>r+(parseFloat(o.price)||0),0).toLocaleString()} ريال سعودي لعدد ${t.length} سيارة.`:e.includes("موظف")||e.includes("أفضل")?"بناءً على البيانات الحالية، يتميز فريق المبيعات بنشاط عالٍ، والمنافسة قوية بين الموظفين لهذا الشهر.":e.includes("ملخص")||e.includes("أداء")?`حالة اليوم: يوجد ${i.filter(r=>r.status==="new"||!r.status).length} طلبات جديدة لم يتم معالجتها بعد، وإجمالي الطلبات في النظام هو ${i.length}.`:"أنا هنا لمساعدتك في إدارة المعرض. يمكنك سؤالي عن المخزون، الطلبات، أو الإحصائيات العامة."}window.renderWhatsAppMonitor=function(){var i,s;const n=document.getElementById("admin-wa-monitor-table");if(!n)return;const e=(((i=document.getElementById("wa-monitor-search"))==null?void 0:i.value)||"").toLowerCase();(s=document.getElementById("wa-monitor-filter"))!=null&&s.value;let t=(window.state.logs||[]).filter(r=>r.category==="whatsapp"||r.details.includes("WhatsApp"));if(e&&(t=t.filter(r=>r.details.toLowerCase().includes(e)||r.user.toLowerCase().includes(e))),t.length===0){n.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center;">لا توجد سجلات مراقبة حالياً</div>';return}n.innerHTML=t.map(r=>`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between;">
                <strong>${r.user}</strong>
                <span style="opacity:0.5; font-size:11px;">${new Date(r.timestamp).toLocaleString()}</span>
            </div>
            <p style="font-size:13px; margin:10px 0;">${r.details}</p>
            ${r.proofUrl?`<a href="${r.proofUrl}" target="_blank" class="btn-premium btn-sm" style="display:inline-block;">عرض الإثبات</a>`:""}
        </div>
    `).join("")};let U=null;const Wn="https://pct-soonest-bus-boats.trycloudflare.com";window.WA_SERVER_URL_OVERRIDE||localStorage.getItem("wa_server_url");window.saveWAServerURL=async function(){const n=document.getElementById("wa-server-url-config");if(!n)return;let e=n.value.trim().replace(/\/$/,"");if(!e)return window.showLuxuryToast("يرجى إدخال الرابط","error");try{await Be(W(z,"settings/waServerUrl"),e),localStorage.setItem("wa_server_url",e),window.showLuxuryToast("تم حفظ الرابط وبثه للجميع، سيتم تحديث الصفحة","success"),setTimeout(()=>location.reload(),1500)}catch{window.showLuxuryToast("خطأ في الصلاحيات لرفع الرابط","error")}};window.startStaffWASession=function(){const n=document.getElementById("wa-staff-select");if(!n||!n.value)return window.showLuxuryToast("يرجى اختيار موظف للربط","error");U&&(document.getElementById("wa-server-status").innerText="يتم الآن توليد كود الاستجابة للموظف...",document.getElementById("wa-server-status").style.color="var(--text-dim)",document.getElementById("wa-qr-container").style.display="none",U.emit("start_session",{userId:n.value}))};window.logoutStaffWASession=function(){const n=document.getElementById("wa-staff-select");if(!n||!n.value)return window.showLuxuryToast("يرجى اختيار الموظف أولاً","error");confirm("هل أنت متأكد من فصل رقم الواتساب لهذا الموظف وسجل المحادثة الخاصة به من السيرفر؟")&&U&&U.emit("logout_session",{userId:n.value})};window.initWhatsAppServer=async function(){const n=document.getElementById("wa-server-url-config");let e=null;window.location.hostname.includes("app.github.dev")&&(e=`https://${window.location.hostname.replace("-5173","-3001")}`,console.log("تم اكتشاف GitHub Codespaces، استخدام الرابط التلقائي:",e));let t=null;try{const r=await Gm(W(z,"settings/waServerUrl"));r.exists()&&(t=r.val(),localStorage.setItem("wa_server_url",t))}catch(r){console.error("Firebase config error:",r)}const i=e||t||localStorage.getItem("wa_server_url")||Wn;window._waServerActiveUrl=i,n&&(n.value=i);const s=document.getElementById("wa-staff-select");if(s&&window.state&&window.state.users){const r=s.value;s.innerHTML='<option value="">-- اختر الموظف --</option>',window.state.users.filter(o=>o.role==="staff"||o.role==="admin"||o.role==="supervisor").forEach(o=>{const a=o.role==="admin"?"مدير":o.role==="supervisor"?"مشرف":"موظف";s.innerHTML+=`<option value="${o.id}" ${o.id===r?"selected":""}>${o.name||o.email||"موظف"} (${a})</option>`}),s.onchange=function(){this.value&&(U&&U.emit("join_room",this.value),window.startStaffWASession())},s.value&&(U&&U.emit("join_room",s.value),window.startStaffWASession())}typeof io<"u"&&!U&&(fetch(`${i}/ping`).catch(()=>{}),U=io(i,{reconnection:!0,reconnectionAttempts:10,reconnectionDelay:2e3,transports:["polling","websocket"]}),U.on("connect_error",r=>{console.error("Connection Error:",r),r.message!=="websocket error"&&(window._waAlerted||(alert("عذراً، المتصفح لم يستطع الاتصال بخادم الواتساب. تأكد من أن الرابط يعمل في صفحة منفصلة. الخطأ: "+r.message),window._waAlerted=!0))}),U.on("connect",()=>{console.log("Connected to WhatsApp Server!");const r=document.getElementById("wa-connection-dot");r&&(r.style.background="#4de265",r.style.boxShadow="0 0 5px #4de265",r.title="متصل بالسيرفر"),window.state.user&&U.emit("join_room",window.state.user.uid),window.state.user&&window.startCurrentWASession&&setTimeout(()=>window.startCurrentWASession(),1500)}),U.on("qr",r=>{const o=document.getElementById("wa-staff-select"),a=document.getElementById("wa-server-status"),l=document.getElementById("wa-qr-container"),c=document.getElementById("wa-qr-canvas");if(o&&o.value===r.userId&&(a&&(a.innerText="في انتظار مسح كود الـ QR...",a.style.color="var(--text-color)"),l&&(l.style.display="block"),typeof QRCode<"u"&&c&&QRCode.toCanvas(c,r.qr,function(d){d&&console.error(d)})),window.state.user&&r.userId===window.state.user.uid){const d=document.getElementById("wa-my-status-title"),u=document.getElementById("wa-my-status-desc"),h=document.getElementById("wa-my-qr-container"),f=document.getElementById("wa-my-qr-canvas"),p=document.getElementById("btn-start-my-wa"),_=document.getElementById("btn-logout-my-wa");d&&(d.innerText="بانتظار مسح رمز QR..."),u&&(u.innerText="افتح واتساب على هاتفك وامسح الرمز الظاهر أدناه ليتم ربط حسابك."),h&&(h.style.display="block"),p&&(p.innerText="تحديث الرمز"),_&&(_.style.display="none"),typeof QRCode<"u"&&f&&QRCode.toCanvas(f,r.qr,{width:250,margin:2},function(b){b&&console.error(b)})}}),U.on("ready",r=>{const o=document.getElementById("wa-staff-select"),a=document.getElementById("wa-connection-dot");if(a&&(a.style.background="#4de265",a.style.boxShadow="0 0 8px #4de265",a.title="واتساب جاهز للعمل"),o&&o.value===r.userId){const l=document.getElementById("wa-server-status"),c=document.getElementById("wa-qr-container");l&&(l.innerText=r.msg,l.style.color="#00a884"),c&&(c.style.display="none")}if(window.state.user&&r.userId===window.state.user.uid){const l=document.getElementById("wa-my-status-title"),c=document.getElementById("wa-my-status-desc"),d=document.getElementById("wa-my-qr-container"),u=document.getElementById("btn-start-my-wa"),h=document.getElementById("btn-logout-my-wa");l&&(l.innerText="واتساب متصل بنجاح"),c&&(c.innerText="حسابك الآن مرتبط بالنظام، يمكنك البدء في استقبال وإرسال الرسائل للعملاء."),d&&(d.style.display="none"),u&&(u.style.display="none"),h&&(h.style.display="inline-block"),window.showLuxuryToast("تم ربط حساب واتساب الخاص بك بنجاح","success")}}),U.on("disconnected",r=>{console.log("Disconnected Event:",r);const o=document.getElementById("wa-connection-dot");o&&(o.style.background="#ff4b4b",o.style.boxShadow="0 0 5px #ff4b4b",o.title="تم قطع الاتصال بالسيرفر");const a=r.msg||"تم قطع الاتصال بالسيرفر. يرجى إعادة الربط لتفعيل خدمات الدردشة.",l=document.getElementById("wa-staff-select");if(l&&l.value===r.userId){const c=document.getElementById("wa-server-status");c&&(c.innerText=a,c.style.color="red")}if(window.state.user&&r.userId===window.state.user.uid){const c=document.getElementById("wa-my-status-title"),d=document.getElementById("wa-my-status-desc"),u=document.getElementById("btn-start-my-wa"),h=document.getElementById("btn-logout-my-wa"),f=document.getElementById("wa-my-qr-container");c&&(c.innerText="الواتساب غير متصل"),d&&(d.innerText=a),f&&(f.style.display="none"),u&&(u.style.display="inline-block",u.innerText="إعادة الربط الآن"),h&&(h.style.display="none")}}),U.on("message",async r=>{var p,_,b;console.log("Real-time WA message received:",r);const o=window.normalizePhone,a=o(r.from),l=o(window._currentWaPhone),c=document.getElementById("details-modal"),d=c&&!c.classList.contains("hidden"),u=document.getElementById("wa-connection-dot");u&&(u.style.transform="scale(1.2)",setTimeout(()=>u.style.transform="scale(1)",300));const h=window.state.bookings||[];let f=h.find(g=>g.waJid===r.from);if(f||(f=h.find(g=>{if(!g.phone)return!1;const m=window.normalizePhone(g.phone);return!a.includes("@")&&m===a}),f&&!f.waJid&&(console.log(`Smart Pinning JID ${r.from} to booking ${f.id}`),Fn(W(z,`bookings/${f.id}`),{waJid:r.from}).catch(g=>{}),f.waJid=r.from)),!f&&!r.isMe){console.log("New customer detected via WhatsApp, creating lead...");try{const g={name:"عميل جديد (واتساب)",phone:a,waJid:r.from,carRequested:"استفسار واتساب",status:"new",subStatus:"not_contacted",source:"whatsapp_inbound",assignedTo:r.userId||"",createdAt:new Date().toISOString(),notes:"تم استقبال رسالة من رقم جديد عبر الواتساب: "+r.body},m=await zt(W(z,"bookings"),g);f={...g,id:m.key},window.showLuxuryToast("تم استقبال طلب حجز جديد تلقائياً من عميل واتساب","success")}catch(g){console.error("Failed to create automatic booking:",g)}}if(d&&l&&a===l)setTimeout(()=>{window.fetchServerWAChat(window._currentWaPhone,r.userId)},500);else{if(r.isMe)return;const g=r.userId===((p=window.state.userProfile)==null?void 0:p.id),m=((_=window.state.userProfile)==null?void 0:_.role)==="admin"||((b=window.state.userProfile)==null?void 0:b.role)==="supervisor";(g||m)&&window.showWAPushNotification&&window.showWAPushNotification(a,r.body,r.userId)}}))};window.showWAPushNotification=async function(n,e,t){let i=document.getElementById("wa-push-notifications-container");i||(i=document.createElement("div"),i.id="wa-push-notifications-container",i.style.cssText="position:fixed; bottom:30px; left:25px; z-index:999999; display:flex; flex-direction:column-reverse; gap:12px; width:340px; pointer-events:none;",document.body.appendChild(i));const r=(window.state.bookings||[]).find(f=>f.phone&&window.normalizePhone(f.phone)===window.normalizePhone(n)),o=r&&r.name?r.name:n;let a=e||"رسالة جديدة";a.length>70&&(a=a.substring(0,70)+"...");const l=document.createElement("div");l.style.cssText="background:rgba(255,255,255,0.98); border-right:4px solid #00a884; border-radius:12px; padding:12px 15px; box-shadow:0 6px 20px rgba(0,0,0,0.15); pointer-events:auto; cursor:pointer; transform:translateX(-120%); transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s, margin 0.3s; opacity:0; overflow:hidden; position:relative; direction:rtl;",l.innerHTML=`
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
           <div style="display:flex; align-items:center; gap:10px;">
               <div style="background:#d9fdd3; width:30px; height:30px; border-radius:50%; display:flex; justify-content:center; align-items:center;">
                   <i class="fab fa-whatsapp" style="color:#00a884; font-size:16px;"></i>
               </div>
               <strong style="color:#111b21; font-size:13.5px; margin:0; line-height:1.2;">${o}</strong>
           </div>
           <button class="fa-times-btn" style="background:none; border:none; color:#999; cursor:pointer; font-size:16px; padding:0; margin:0; line-height:1; transition:color 0.2s;"><i class="fas fa-times"></i></button>
        </div>
        <p style="margin:0; font-size:12.5px; color:#54656f; line-height:1.5; padding-right:40px;">${a}</p>
    `;const c=l.querySelector(".fa-times-btn");c.onmouseover=()=>c.style.color="#e02424",c.onmouseout=()=>c.style.color="#999";const d=async()=>{var f;try{await zt(W(z,"notifications"),{userId:t||((f=window.state.userProfile)==null?void 0:f.id)||"admin",type:"wa_message",title:"رسالة واتساب من "+o,body:a,phone:n,read:!1,createdAt:new Date().toISOString()})}catch(p){console.warn("Could not save to notifications DB",p)}};let u=setTimeout(()=>{h(),d()},1e4);const h=()=>{l.style.transform="translateX(-120%)",l.style.opacity="0",l.style.marginTop=`-${l.offsetHeight}px`,setTimeout(()=>{l.parentNode&&l.parentNode.removeChild(l)},400)};c.onclick=f=>{f.stopPropagation(),clearTimeout(u),h()},l.onclick=()=>{clearTimeout(u),h(),r?(window.viewBookingDetails(r.id),setTimeout(()=>{const f=document.getElementById("details-modal").querySelector(".dash-tab.admin-only");f&&f.click()},100)):window.showLuxuryToast("الرسالة من رقم غير مسجل في أي طلب مفتوح","info")},i.insertBefore(l,i.firstChild),requestAnimationFrame(()=>{l.style.transform="translateX(0)",l.style.opacity="1"})};window.startCurrentWASession=function(){if(!window.state.user)return;const n=()=>{U.emit("start_session",{userId:window.state.user.uid});const e=document.getElementById("wa-my-status-title"),t=document.getElementById("wa-my-status-desc");e&&(e.innerText="جاري الاتصال..."),t&&(t.innerText="يتم الآن التواصل مع خادم الواتساب لتوليد رمز الاستجابة السريعة...")};U?U.connected?n():(U.once("connect",n),U.connect()):window.initWhatsAppServer()};window.logoutCurrentWASession=function(){window.state.user&&confirm("هل أنت متأكد من تسجيل الخروج من واتساب؟ لن تتمكن من المراسلة من هنا.")&&U&&U.emit("logout_session",{userId:window.state.user.uid})};window._waMediaCache=window._waMediaCache||{};window.fetchServerWAChat=async function(n,e){var s,r,o;if(!n)return;const t=document.getElementById("wa-server-chat-box");if(!t)return;let i=(s=window.state.userProfile)==null?void 0:s.id;if(((r=window.state.userProfile)==null?void 0:r.role)==="admin"||((o=window.state.userProfile)==null?void 0:o.role)==="supervisor")if(e)i=e;else{const l=(window.state.bookings||[]).find(c=>c.phone&&window.normalizePhone(c.phone)===window.normalizePhone(n));if(l&&l.assignedTo)i=l.assignedTo;else{t.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:20px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 10px 30px rgba(0,0,0,0.1); max-width:85%;">
                        <i class="fas fa-user-slash" style="color:#00a884; font-size:32px; margin-bottom:15px; display:block;"></i>
                        هذا الحجز غير مسند لموظف.<br>
                        سجل المحادثات متاح فقط للحجوزات المسندة.
                    </div>
                </div>`;return}}window._currentWaPhone=n,(!t.hasChildNodes()||t.innerHTML.includes("fa-circle-notch")||t.innerHTML.includes("fa-comment-dots"))&&(t.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><i class="fas fa-circle-notch fa-spin" style="font-size: 30px; color: #00a884; margin-bottom: 12px;"></i><br><div style="background: rgba(255,255,255,0.9); display: inline-block; padding: 8px 16px; border-radius: 12px; font-size: 12px; color: #555; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">جاري مزامنة الرسائل...</div></div>');try{const a=window._waServerActiveUrl||Wn,l=await fetch(`${a}/api/chat/${i}/${n}`);if(l.ok){const c=await l.json();if(c.messages&&c.messages.length>0){const d=t.scrollHeight-t.scrollTop-t.clientHeight<50;t.innerHTML="";const u=document.createElement("div");u.style.cssText="text-align:center; margin:10px 0 15px;",u.innerHTML='<span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span>',t.appendChild(u),c.messages.forEach(h=>{const f=h.timestamp?new Date(h.timestamp*1e3).toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit"}):"";let p=(h.body||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");p=p.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const _=document.createElement("div");_.style.padding="6px 8px 8px 10px",_.style.maxWidth="75%",_.style.fontSize="14.5px",_.style.marginBottom="4px",_.style.position="relative",_.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",_.style.whiteSpace="pre-wrap",_.style.lineHeight="1.4",_.style.wordBreak="break-word",_.style.overflowWrap="anywhere",h.isMe?(_.style.alignSelf="flex-end",_.style.background="#d9fdd3",_.style.color="#111b21",_.style.borderRadius="12px 0 12px 12px"):(_.style.alignSelf="flex-start",_.style.background="#ffffff",_.style.color="#111b21",_.style.borderRadius="0 12px 12px 12px");let b=`<div>${p}</div>`;if(h.media)if(window._waMediaCache[h.id]&&(h.media.data=window._waMediaCache[h.id]),h.media.data===null){const m=`btn-dl-${h.id}`,w=`cont-dl-${h.id}`;let v="مرفق";h.media.mimetype.startsWith("image/")?v="صورة":h.media.mimetype.startsWith("video/")?v="فيديو":(h.media.mimetype.startsWith("audio/")||h.type==="ptt")&&(v="مقطع صوتي"),b=`<div id="${w}" style="margin-bottom:8px; display:flex; align-items:center; gap:10px; background:rgba(0,0,0,0.05); padding:10px; border-radius:8px;">
                                <i class="fas fa-file-download" style="font-size:24px; color:#54656f;"></i>
                                <div style="flex:1;">
                                    <strong style="display:block; font-size:13px;">${v} سابق</strong>
                                    <span style="font-size:11px; opacity:0.7;">${h.media.filename||"اضغط للتحميل من السيرفر"}</span>
                                </div>
                                <button id="${m}" class="btn-premium btn-sm" onclick="window.downloadWAMedia('${i}', '${n}', '${h.id}', '${w}', '${h.media.mimetype}', '${h.type}')" style="padding:4px 10px; min-width:40px;"><i class="fas fa-download"></i></button>
                            </div>`+(p?`<div>${p}</div>`:"")}else h.media.mimetype.startsWith("image/")?b=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${h.media.mimetype};base64,${h.media.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`+(p?`<div>${p}</div>`:""):h.media.mimetype.startsWith("audio/")||h.type==="ptt"?b=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${h.media.mimetype};base64,${h.media.data}" type="${h.media.mimetype}"></audio></div>`+(p?`<div style="margin-top:5px;">${p}</div>`:""):h.media.mimetype.startsWith("video/")?b=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${h.media.mimetype};base64,${h.media.data}" type="${h.media.mimetype}"></video>`+(p?`<div>${p}</div>`:""):b=`<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-file-alt" style="font-size:24px; color:#54656f;"></i> <div><strong style="display:block; font-size:13px;">ملف ${h.media.filename||"مرفق"}</strong><span style="font-size:11px; opacity:0.7;">تنزيل للعرض</span></div></div>`+(p?`<div>${p}</div>`:"");let g="";if(h.isMe){let m=h.ack!==void 0?h.ack:h.status==="read"?3:h.status==="delivered"?2:h.status==="sent"?1:void 0;m===1||m===0?g='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':m===2?g='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':m>=3?g='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#53bdeb;"></i>':g='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>'}_.innerHTML=`${b} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;">
                      <span style="font-size:11px; color:#667781;">${f}</span>
                      ${g}
                    </div><div style="clear:both;"></div>`,t.appendChild(_)}),(d||t.innerHTML.includes("fa-lock"))&&setTimeout(()=>{t.scrollTo({top:t.scrollHeight,behavior:"smooth"})},100)}else t.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 30px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-comment-dots" style="color:#00a884; font-size:24px; margin-bottom:10px; display:block;"></i>لا توجد رسائل سابقة مع هذا الرقم.<br>يمكنك بدء دردشة جديدة الآن.</div></div>'}else t.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:25px; border-radius:15px; font-size:14px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);">
                        <i class="fab fa-whatsapp" style="font-size:50px; margin-bottom:15px; color:#8696a0;"></i>
                        <p style="margin-bottom:15px;">خادم واتساب غير متصل لهذا الموظف</p>
                        <button class="btn-premium btn-sm" onclick="window.closeModal('details-modal'); window.switchLuxuryTab('whatsapp-mgmt')">اذهب لإعدادات الواتساب</button>
                    </div>
                </div>
            `}catch{t.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 25px; border-radius:15px; font-size:13px; color:#e02424; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-exclamation-triangle" style="font-size:24px; margin-bottom:10px; display:block;"></i>فشل الاتصال بالخادم. يرجى التأكد من تشغيل السيرفر.</div></div>'}};let Ae,$i=[];window.startWARecording=async function(){window._waRecordingIntent=!0;try{const n=await navigator.mediaDevices.getUserMedia({audio:!0});if(!window._waRecordingIntent){n.getTracks().forEach(t=>t.stop());return}Ae=new MediaRecorder(n),$i=[],window._waRecordingStartTime=Date.now(),Ae.ondataavailable=t=>{t.data.size>0&&$i.push(t.data)},Ae.start();const e=document.getElementById("wa-mic-btn");e&&(e.style.color="red")}catch{window.showLuxuryToast("لم يتم السماح باستخدام الميكروفون","error"),window._waRecordingIntent=!1}};window.stopWARecording=function(n,e){window._waRecordingIntent&&(window._waRecordingIntent=!1,!(!Ae||Ae.state==="inactive")&&(Ae.onstop=async()=>{if(Date.now()-(window._waRecordingStartTime||Date.now())<500||$i.length===0){Ae.stream.getTracks().forEach(a=>a.stop());const o=document.getElementById("wa-mic-btn");o&&(o.style.color="#54656f");return}const i=new Blob($i,{type:"audio/webm"}),s=new FileReader;s.readAsDataURL(i),s.onloadend=()=>{const o=s.result.split(",")[1];window.sendServerWAMessage(n,e,{data:o,mimetype:"audio/webm",filename:"voice_note.webm",ptt:!0},"")};const r=document.getElementById("wa-mic-btn");r&&(r.style.color="#54656f"),Ae.stream.getTracks().forEach(o=>o.stop())},Ae.stop()))};window.handleWAMediaSelect=function(n,e){const t=document.getElementById("wa-media-upload"),i=t.files&&t.files[0];if(!i)return;if(i.size>16*1024*1024){window.showLuxuryToast("حجم الملف كبير جداً، أقصى حد يسمح به الواتساب هو 16 ميجابايت","error");return}const s=new FileReader;s.onload=function(r){const o=r.target.result.split(",")[1],a=i.type||"application/octet-stream",l=i.name;let c=prompt("هل تريد إرفاق رسالة نصية مع هذا الملف؟ (اختياري)","");if(c===null){t.value="";return}window.sendServerWAMessage(n,e,{data:o,mimetype:a,filename:l},c)},s.readAsDataURL(i)};window.sendServerWAMessage=async function(n,e,t=null,i=null){const s=document.getElementById("wa-server-input");if(s&&s.disabled)return;const r=i!==null?i:s?s.value.trim():"";if(!t&&!r)return;let o=window.state.userProfile.id;window.state.userProfile.role==="admin"&&e&&(o=e),s&&i===null&&(s.value="",s.focus());const a=document.getElementById("wa-server-chat-box");if(a){(a.innerHTML.includes("fa-comment-dots")||a.innerHTML.includes("fa-circle-notch")||!a.hasChildNodes())&&(a.innerHTML='<div style="text-align:center; margin:10px 0 15px;"><span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span></div>');const l=new Date().toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit"});let c=(r||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");c=c.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const d=document.createElement("div");d.style.padding="6px 8px 8px 10px",d.style.maxWidth="75%",d.style.fontSize="14.5px",d.style.marginBottom="4px",d.style.position="relative",d.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",d.style.whiteSpace="pre-wrap",d.style.lineHeight="1.4",d.style.wordBreak="break-word",d.style.overflowWrap="anywhere",d.style.alignSelf="flex-end",d.style.background="#d9fdd3",d.style.color="#111b21",d.style.borderRadius="12px 0 12px 12px";let u=`<div>${c}</div>`;t&&(u='<div style="margin-bottom:5px; font-size:12px; color:#555;"><i class="fas fa-paperclip"></i> تم إرسال مرفق</div>'+u);let h='<i class="fas fa-clock" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>';d.innerHTML=`${u} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;"><span style="font-size:11px; color:#667781;">${l}</span>${h}</div><div style="clear:both;"></div>`,a.appendChild(d),setTimeout(()=>{a.scrollTo({top:a.scrollHeight,behavior:"smooth"})},50)}try{const l=window._waServerActiveUrl||Wn,c={userId:o,phone:n,message:r};t&&(c.media=t),(await fetch(`${l}/api/send`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)})).ok?setTimeout(()=>window.fetchServerWAChat(n,o),1500):(window.showLuxuryToast("الواتساب غير متصل في الإدارة، المرجو فحص الاتصال","error"),s&&i===null&&!t&&(s.value=r))}catch{window.showLuxuryToast("الخادم البرمجي مغلق أو متوقف","error"),s&&i===null&&!t&&(s.value=r)}finally{const l=document.getElementById("wa-media-upload");l&&(l.value="")}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.editQuickReply=function(n){window.openCRUDModal("quickReplies",n)};window.addQuickReply=async function(n){window.openQuickReplyModal()};window.deleteQuickReply=async function(n,e){if(confirm("هل أنت متأكد من الحذف؟")){let t="";e&&(t=e.innerHTML,e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{await Lc(W(z,`quickReplies/${n}`)),window.showLuxuryToast("تم الحذف بنجاح")}catch(i){console.error("Error deleting quick reply:",i),window.showLuxuryToast("فُقدت الصلاحية أو حدث خطأ أثناء الحذف","error"),e&&(e.disabled=!1,e.innerHTML=t)}}};window.renderQuickRepliesAdmin=function(){var i;const n=document.getElementById("quick-replies-list");if(!n)return;const e=(((i=document.getElementById("qr-search"))==null?void 0:i.value)||"").toLowerCase();let t=window.state.quickReplies||[];if(e&&(t=t.filter(s=>(s.title||"").toLowerCase().includes(e)||(s.content||"").toLowerCase().includes(e))),t.length===0){n.innerHTML=`
            <div class="no-results-v2 full-width">
                <i class="fas fa-search"></i>
                <p>${e?"لا توجد نتائج تطابق بحثك":"لا توجد نماذج ردود سريعة حالياً"}</p>
            </div>`;return}n.innerHTML=t.map(s=>`
        <div class="admin-item-card-v2" data-aos="fade-up">
            <div class="item-card-content" style="flex:1;">
                <div class="item-card-header" style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                    <div class="item-icon-circle" style="background:var(--p-copper); color:white; width:35px; height:35px; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <strong style="color:var(--text-bright); font-size:16px;">${s.title}</strong>
                </div>
                <div class="item-card-body">
                    <p class="qr-content-preview" style="white-space: pre-wrap; margin:0; color:var(--text-dim); font-size:14px; background:rgba(0,0,0,0.2); padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">${s.content}</p>
                </div>
            </div>
            <div class="item-card-actions" style="display:flex; gap:10px;">
                <button class="icon-btn-lite" onclick="window.editQuickReply('${s.id}')" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="icon-btn-lite danger" onclick="window.deleteQuickReply('${s.id}', this)" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join("")};window._qrExpanded=!1;window.renderQuickRepliesBar=function(){const n=document.getElementById("wa-quick-replies-bar");if(!n)return;const e=window.state.quickReplies||[];if(e.length===0){n.style.display="none";return}n.style.display="flex";const t=window._qrExpanded;let i=e,s=!1;!t&&e.length>4&&(i=e.slice(0,4),s=!0);let r=i.map(o=>`
        <button onclick="window.applyQuickReply(\`${o.content.replace(/"/g,"&quot;").replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\\n/g,"\\\\n")}\`)" style="background:white; border:1px solid var(--glass-border); padding:6px 12px; border-radius:16px; font-size:12px; color:#54656f; cursor:pointer; flex-shrink:0; white-space:nowrap; transition:all 0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.05);" onmouseover="this.style.background='#f0f2f5'" onmouseout="this.style.background='white'">
            ${o.title}
        </button>
    `).join("");s?r+='<button onclick="window._qrExpanded=true; window.renderQuickRepliesBar();" style="background:#00a884; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">عرض الكل <i class="fas fa-chevron-left" style="margin-right:4px;"></i></button>':t&&e.length>4&&(r+='<button onclick="window._qrExpanded=false; window.renderQuickRepliesBar();" style="background:#e02424; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">إخفاء <i class="fas fa-chevron-right" style="margin-right:4px;"></i></button>'),n.innerHTML=r};window.applyQuickReply=function(n){const e=document.getElementById("wa-server-input");e&&(e.value=n,e.focus())};window.downloadWAMedia=async function(n,e,t,i,s,r){const o=document.getElementById(i.replace("cont-dl-","btn-dl-"));o&&(o.disabled=!0,o.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const a=window._waServerActiveUrl||Wn,l=await fetch(`${a}/api/media/${n}/${e}/${t}`);if(!l.ok)throw new Error("Failed");const c=await l.json();if(!c.data)throw new Error("No data");window._waMediaCache[t]=c.data;const d=document.getElementById(i);if(!d)return;let u="";s.startsWith("image/")?u=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${s};base64,${c.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`:s.startsWith("audio/")||r==="ptt"?u=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${s};base64,${c.data}" type="${s}"></audio></div>`:s.startsWith("video/")?u=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${s};base64,${c.data}" type="${s}"></video>`:u='<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-check-circle" style="font-size:24px; color:#00a884;"></i> <div><strong style="display:block; font-size:13px;">تم التحميل بنجاح</strong></div></div>',d.outerHTML=u}catch{o&&(o.disabled=!1,o.innerHTML='<i class="fas fa-redo"></i>'),window.showLuxuryToast("فشل تحميل الوسائط","error")}};document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("click",n=>{const e=n.target.closest(".dash-tab");e&&e.dataset.tab&&window.switchLuxuryTab(e.dataset.tab)}),setTimeout(()=>{window.initWhatsAppServer()},3e3)});window.viewFullImage=function(n){let e=document.getElementById("wa-full-image-overlay");if(!e){e=document.createElement("div"),e.id="wa-full-image-overlay",e.style.cssText="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); z-index:999999; display:flex; justify-content:center; align-items:center; opacity:0; transition:opacity 0.25s ease-in-out; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);";const i=document.createElement("div");i.innerHTML='<i class="fas fa-times"></i>',i.style.cssText="position:absolute; top:25px; right:30px; font-size:24px; color:white; cursor:pointer; padding:10px; z-index:1000000; background:rgba(255,255,255,0.1); border-radius:50%; width:45px; height:45px; display:flex; justify-content:center; align-items:center; border: 1px solid rgba(255,255,255,0.2); transition: background 0.2s;",i.onmouseover=()=>i.style.background="rgba(255,255,255,0.2)",i.onmouseout=()=>i.style.background="rgba(255,255,255,0.1)";const s=document.createElement("img");s.id="wa-full-image-element",s.style.cssText="max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 15px 40px rgba(0,0,0,0.5); object-fit:contain; transform:scale(0.85); transition:transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);",e.appendChild(i),e.appendChild(s),document.body.appendChild(e);const r=()=>{e.style.opacity="0",s.style.transform="scale(0.85)",setTimeout(()=>{e.style.display="none"},250)};i.onclick=r,e.onclick=o=>{o.target===e&&r()}}const t=document.getElementById("wa-full-image-element");t.src=n,e.style.display="flex",e.offsetWidth,e.style.opacity="1",t.style.transform="scale(1)"};
