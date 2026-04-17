(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();var No={};/**
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
 */const ml={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const E=function(t,e){if(!t)throw Jt(e)},Jt=function(t){return new Error("Firebase Database ("+ml.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const gl=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Uu=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},vr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(h=64)),i.push(n[d],n[u],n[h],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(gl(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Uu(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const u=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new ju;const h=r<<2|a>>4;if(i.push(h),c!==64){const f=a<<4&240|c>>2;if(i.push(f),u!==64){const p=c<<6&192|u;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ju extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const yl=function(t){const e=gl(t);return vr.encodeByteArray(e,!0)},gi=function(t){return yl(t).replace(/\./g,"")},yi=function(t){try{return vr.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Wu(t){return _l(void 0,t)}function _l(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!zu(n)||(t[n]=_l(t[n],e[n]));return t}function zu(t){return t!=="__proto__"}/**
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
 */function Hu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Vu=()=>Hu().__FIREBASE_DEFAULTS__,qu=()=>{if(typeof process>"u"||typeof No>"u")return;const t=No.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Gu=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&yi(t[1]);return e&&JSON.parse(e)},br=()=>{try{return Vu()||qu()||Gu()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},wl=t=>{var e,n;return(n=(e=br())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},vl=t=>{const e=wl(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},bl=()=>{var t;return(t=br())===null||t===void 0?void 0:t.config},El=t=>{var e;return(e=br())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class Xt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function Il(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[gi(JSON.stringify(n)),gi(JSON.stringify(o)),""].join(".")}/**
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
 */function ae(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Er(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ae())}function Ku(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Tl(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function kl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Yu(){const t=ae();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Qu(){return ml.NODE_ADMIN===!0}function Sl(){try{return typeof indexedDB=="object"}catch{return!1}}function xl(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(n){e(n)}})}function Ju(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Xu="FirebaseError";class Ie extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=Xu,Object.setPrototypeOf(this,Ie.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Et.prototype.create)}}class Et{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Zu(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Ie(s,a,i)}}function Zu(t,e){return t.replace(eh,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const eh=/\{\$([^}]+)}/g;/**
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
 */function kn(t){return JSON.parse(t)}function J(t){return JSON.stringify(t)}/**
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
 */const Cl=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=kn(yi(r[0])||""),n=kn(yi(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},th=function(t){const e=Cl(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},nh=function(t){const e=Cl(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function Te(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function ft(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Vs(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function _i(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function Sn(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(Po(r)&&Po(o)){if(!Sn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function Po(t){return t!==null&&typeof t=="object"}/**
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
 */function Zt(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function pn(t){const e={};return t.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function mn(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}/**
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
 */class ih{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let u=0;u<16;u++)i[u]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let u=16;u<80;u++){const h=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(s<<5|s>>>27)+c+l+d+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function sh(t,e){const n=new rh(t,e);return n.subscribe.bind(n)}class rh{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let s;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");oh(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:i},s.next===void 0&&(s.next=ys),s.error===void 0&&(s.error=ys),s.complete===void 0&&(s.complete=ys);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function oh(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function ys(){}function Vi(t,e){return`${t} failed: ${e} argument `}/**
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
 */const ah=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,E(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},qi=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
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
 */const lh=1e3,ch=2,dh=4*60*60*1e3,uh=.5;function Lo(t,e=lh,n=ch){const i=e*Math.pow(n,t),s=Math.round(uh*i*(Math.random()-.5)*2);return Math.min(dh,i+s)}/**
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
 */function z(t){return t&&t._delegate?t._delegate:t}class me{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const lt="[DEFAULT]";/**
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
 */class hh{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Xt;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ph(e))try{this.getOrInitializeService({instanceIdentifier:lt})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=lt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=lt){return this.instances.has(e)}getOptions(e=lt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){var i;const s=this.normalizeInstanceIdentifier(n),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:fh(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=lt){return this.component?this.component.multipleInstances?e:lt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function fh(t){return t===lt?void 0:t}function ph(t){return t.instantiationMode==="EAGER"}/**
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
 */class mh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new hh(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var M;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(M||(M={}));const gh={debug:M.DEBUG,verbose:M.VERBOSE,info:M.INFO,warn:M.WARN,error:M.ERROR,silent:M.SILENT},yh=M.INFO,_h={[M.DEBUG]:"log",[M.VERBOSE]:"log",[M.INFO]:"info",[M.WARN]:"warn",[M.ERROR]:"error"},wh=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=_h[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Gi{constructor(e){this.name=e,this._logLevel=yh,this._logHandler=wh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in M))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?gh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,M.DEBUG,...e),this._logHandler(this,M.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,M.VERBOSE,...e),this._logHandler(this,M.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,M.INFO,...e),this._logHandler(this,M.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,M.WARN,...e),this._logHandler(this,M.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,M.ERROR,...e),this._logHandler(this,M.ERROR,...e)}}const vh=(t,e)=>e.some(n=>t instanceof n);let Oo,Do;function bh(){return Oo||(Oo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Eh(){return Do||(Do=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Al=new WeakMap,qs=new WeakMap,Rl=new WeakMap,_s=new WeakMap,Ir=new WeakMap;function Ih(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Je(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Al.set(n,t)}).catch(()=>{}),Ir.set(e,t),e}function Th(t){if(qs.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});qs.set(t,e)}let Gs={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return qs.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Rl.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Je(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function kh(t){Gs=t(Gs)}function Sh(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(ws(this),e,...n);return Rl.set(i,e.sort?e.sort():[e]),Je(i)}:Eh().includes(t)?function(...e){return t.apply(ws(this),e),Je(Al.get(this))}:function(...e){return Je(t.apply(ws(this),e))}}function xh(t){return typeof t=="function"?Sh(t):(t instanceof IDBTransaction&&Th(t),vh(t,bh())?new Proxy(t,Gs):t)}function Je(t){if(t instanceof IDBRequest)return Ih(t);if(_s.has(t))return _s.get(t);const e=xh(t);return e!==t&&(_s.set(t,e),Ir.set(e,t)),e}const ws=t=>Ir.get(t);function Nl(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=Je(o);return i&&o.addEventListener("upgradeneeded",l=>{i(Je(o.result),l.oldVersion,l.newVersion,Je(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Ch=["get","getKey","getAll","getAllKeys","count"],Ah=["put","add","delete","clear"],vs=new Map;function Mo(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(vs.get(e))return vs.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=Ah.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Ch.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return vs.set(e,r),r}kh(t=>({...t,get:(e,n,i)=>Mo(e,n)||t.get(e,n,i),has:(e,n)=>!!Mo(e,n)||t.has(e,n)}));/**
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
 */class Rh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Nh(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Nh(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ks="@firebase/app",$o="0.10.13";/**
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
 */const Be=new Gi("@firebase/app"),Ph="@firebase/app-compat",Lh="@firebase/analytics-compat",Oh="@firebase/analytics",Dh="@firebase/app-check-compat",Mh="@firebase/app-check",$h="@firebase/auth",Bh="@firebase/auth-compat",Fh="@firebase/database",Uh="@firebase/data-connect",jh="@firebase/database-compat",Wh="@firebase/functions",zh="@firebase/functions-compat",Hh="@firebase/installations",Vh="@firebase/installations-compat",qh="@firebase/messaging",Gh="@firebase/messaging-compat",Kh="@firebase/performance",Yh="@firebase/performance-compat",Qh="@firebase/remote-config",Jh="@firebase/remote-config-compat",Xh="@firebase/storage",Zh="@firebase/storage-compat",ef="@firebase/firestore",tf="@firebase/vertexai-preview",nf="@firebase/firestore-compat",sf="firebase",rf="10.14.1";/**
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
 */const Ys="[DEFAULT]",of={[Ks]:"fire-core",[Ph]:"fire-core-compat",[Oh]:"fire-analytics",[Lh]:"fire-analytics-compat",[Mh]:"fire-app-check",[Dh]:"fire-app-check-compat",[$h]:"fire-auth",[Bh]:"fire-auth-compat",[Fh]:"fire-rtdb",[Uh]:"fire-data-connect",[jh]:"fire-rtdb-compat",[Wh]:"fire-fn",[zh]:"fire-fn-compat",[Hh]:"fire-iid",[Vh]:"fire-iid-compat",[qh]:"fire-fcm",[Gh]:"fire-fcm-compat",[Kh]:"fire-perf",[Yh]:"fire-perf-compat",[Qh]:"fire-rc",[Jh]:"fire-rc-compat",[Xh]:"fire-gcs",[Zh]:"fire-gcs-compat",[ef]:"fire-fst",[nf]:"fire-fst-compat",[tf]:"fire-vertex","fire-js":"fire-js",[sf]:"fire-js-all"};/**
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
 */const wi=new Map,af=new Map,Qs=new Map;function Bo(t,e){try{t.container.addComponent(e)}catch(n){Be.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function be(t){const e=t.name;if(Qs.has(e))return Be.debug(`There were multiple attempts to register component ${e}.`),!1;Qs.set(e,t);for(const n of wi.values())Bo(n,t);for(const n of af.values())Bo(n,t);return!0}function rt(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Pe(t){return t.settings!==void 0}/**
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
 */const lf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Xe=new Et("app","Firebase",lf);/**
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
 */class cf{constructor(e,n,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new me("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Xe.create("app-deleted",{appName:this._name})}}/**
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
 */const It=rf;function Pl(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Ys,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Xe.create("bad-app-name",{appName:String(s)});if(n||(n=bl()),!n)throw Xe.create("no-options");const r=wi.get(s);if(r){if(Sn(n,r.options)&&Sn(i,r.config))return r;throw Xe.create("duplicate-app",{appName:s})}const o=new mh(s);for(const l of Qs.values())o.addComponent(l);const a=new cf(n,i,o);return wi.set(s,a),a}function Ki(t=Ys){const e=wi.get(t);if(!e&&t===Ys&&bl())return Pl();if(!e)throw Xe.create("no-app",{appName:t});return e}function ce(t,e,n){var i;let s=(i=of[t])!==null&&i!==void 0?i:t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Be.warn(a.join(" "));return}be(new me(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const df="firebase-heartbeat-database",uf=1,xn="firebase-heartbeat-store";let bs=null;function Ll(){return bs||(bs=Nl(df,uf,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(xn)}catch(n){console.warn(n)}}}}).catch(t=>{throw Xe.create("idb-open",{originalErrorMessage:t.message})})),bs}async function hf(t){try{const n=(await Ll()).transaction(xn),i=await n.objectStore(xn).get(Ol(t));return await n.done,i}catch(e){if(e instanceof Ie)Be.warn(e.message);else{const n=Xe.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Be.warn(n.message)}}}async function Fo(t,e){try{const i=(await Ll()).transaction(xn,"readwrite");await i.objectStore(xn).put(e,Ol(t)),await i.done}catch(n){if(n instanceof Ie)Be.warn(n.message);else{const i=Xe.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Be.warn(i.message)}}}function Ol(t){return`${t.name}!${t.options.appId}`}/**
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
 */const ff=1024,pf=30*24*60*60*1e3;class mf{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new yf(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Uo();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=pf}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Be.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Uo(),{heartbeatsToSend:i,unsentEntries:s}=gf(this._heartbeatsCache.heartbeats),r=gi(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return Be.warn(n),""}}}function Uo(){return new Date().toISOString().substring(0,10)}function gf(t,e=ff){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),jo(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),jo(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class yf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Sl()?xl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await hf(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Fo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Fo(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function jo(t){return gi(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function _f(t){be(new me("platform-logger",e=>new Rh(e),"PRIVATE")),be(new me("heartbeat",e=>new mf(e),"PRIVATE")),ce(Ks,$o,t),ce(Ks,$o,"esm2017"),ce("fire-js","")}_f("");var wf="firebase",vf="10.14.1";/**
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
 */ce(wf,vf,"app");var Wo={};const zo="@firebase/database",Ho="1.0.8";/**
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
 */let Dl="";function bf(t){Dl=t}/**
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
 */class Ef{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),J(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:kn(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class If{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Te(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const Ml=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Ef(e)}}catch{}return new If},dt=Ml("localStorage"),Tf=Ml("sessionStorage");/**
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
 */const Mt=new Gi("@firebase/database"),$l=function(){let t=1;return function(){return t++}}(),Bl=function(t){const e=ah(t),n=new ih;n.update(e);const i=n.digest();return vr.encodeByteArray(i)},Bn=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Bn.apply(null,i):typeof i=="object"?e+=J(i):e+=i,e+=" "}return e};let gn=null,Vo=!0;const kf=function(t,e){E(!0,"Can't turn on custom loggers persistently."),Mt.logLevel=M.VERBOSE,gn=Mt.log.bind(Mt)},te=function(...t){if(Vo===!0&&(Vo=!1,gn===null&&Tf.get("logging_enabled")===!0&&kf()),gn){const e=Bn.apply(null,t);gn(e)}},Fn=function(t){return function(...e){te(t,...e)}},Js=function(...t){const e="FIREBASE INTERNAL ERROR: "+Bn(...t);Mt.error(e)},Fe=function(...t){const e=`FIREBASE FATAL ERROR: ${Bn(...t)}`;throw Mt.error(e),new Error(e)},oe=function(...t){const e="FIREBASE WARNING: "+Bn(...t);Mt.warn(e)},Sf=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&oe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Tr=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},xf=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Wt="[MIN_NAME]",pt="[MAX_NAME]",Tt=function(t,e){if(t===e)return 0;if(t===Wt||e===pt)return-1;if(e===Wt||t===pt)return 1;{const n=qo(t),i=qo(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},Cf=function(t,e){return t===e?0:t<e?-1:1},ln=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+J(e))},kr=function(t){if(typeof t!="object"||t===null)return J(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=J(e[i]),n+=":",n+=kr(t[e[i]]);return n+="}",n},Fl=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function ne(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Ul=function(t){E(!Tr(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,l;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},Af=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Rf=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Nf(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const Pf=new RegExp("^-?(0*)\\d{1,10}$"),Lf=-2147483648,Of=2147483647,qo=function(t){if(Pf.test(t)){const e=Number(t);if(e>=Lf&&e<=Of)return e}return null},en=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw oe("Exception was thrown by user callback.",n),e},Math.floor(0))}},Df=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},yn=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class Mf{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){oe(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class $f{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(te("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',oe(e)}}class li{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}li.OWNER="owner";/**
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
 */const Sr="5",jl="v",Wl="s",zl="r",Hl="f",Vl=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,ql="ls",Gl="p",Xs="ac",Kl="websocket",Yl="long_polling";/**
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
 */class Ql{constructor(e,n,i,s,r=!1,o="",a=!1,l=!1){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=dt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&dt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Bf(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Jl(t,e,n){E(typeof e=="string","typeof type must == string"),E(typeof n=="object","typeof params must == object");let i;if(e===Kl)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Yl)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Bf(t)&&(n.ns=t.namespace);const s=[];return ne(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
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
 */class Ff{constructor(){this.counters_={}}incrementCounter(e,n=1){Te(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Wu(this.counters_)}}/**
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
 */const Es={},Is={};function xr(t){const e=t.toString();return Es[e]||(Es[e]=new Ff),Es[e]}function Uf(t,e){const n=t.toString();return Is[n]||(Is[n]=e()),Is[n]}/**
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
 */class jf{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&en(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Go="start",Wf="close",zf="pLPCommand",Hf="pRTLPCB",Xl="id",Zl="pw",ec="ser",Vf="cb",qf="seg",Gf="ts",Kf="d",Yf="dframe",tc=1870,nc=30,Qf=tc-nc,Jf=25e3,Xf=3e4;class Ot{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Fn(e),this.stats_=xr(n),this.urlFn=l=>(this.appCheckToken&&(l[Xs]=this.appCheckToken),Jl(n,Yl,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new jf(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Xf)),xf(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Cr((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Go)this.id=a,this.password=l;else if(o===Wf)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Go]="t",i[ec]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Vf]=this.scriptTagHolder.uniqueCallbackIdentifier),i[jl]=Sr,this.transportSessionId&&(i[Wl]=this.transportSessionId),this.lastSessionId&&(i[ql]=this.lastSessionId),this.applicationId&&(i[Gl]=this.applicationId),this.appCheckToken&&(i[Xs]=this.appCheckToken),typeof location<"u"&&location.hostname&&Vl.test(location.hostname)&&(i[zl]=Hl);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ot.forceAllow_=!0}static forceDisallow(){Ot.forceDisallow_=!0}static isAvailable(){return Ot.forceAllow_?!0:!Ot.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Af()&&!Rf()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=J(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=yl(n),s=Fl(i,Qf);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[Yf]="t",i[Xl]=e,i[Zl]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=J(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Cr{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=$l(),window[zf+this.uniqueCallbackIdentifier]=e,window[Hf+this.uniqueCallbackIdentifier]=n,this.myIFrame=Cr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){te("frame writing exception"),a.stack&&te(a.stack),te(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||te("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Xl]=this.myID,e[Zl]=this.myPW,e[ec]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+nc+i.length<=tc;){const o=this.pendingSegs.shift();i=i+"&"+qf+s+"="+o.seg+"&"+Gf+s+"="+o.ts+"&"+Kf+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(Jf)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{te("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
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
 */const Zf=16384,ep=45e3;let vi=null;typeof MozWebSocket<"u"?vi=MozWebSocket:typeof WebSocket<"u"&&(vi=WebSocket);class _e{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Fn(this.connId),this.stats_=xr(n),this.connURL=_e.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[jl]=Sr,typeof location<"u"&&location.hostname&&Vl.test(location.hostname)&&(o[zl]=Hl),n&&(o[Wl]=n),i&&(o[ql]=i),s&&(o[Xs]=s),r&&(o[Gl]=r),Jl(e,Kl,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,dt.set("previous_websocket_failure",!0);try{let i;Qu(),this.mySock=new vi(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){_e.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&vi!==null&&!_e.forceDisallow_}static previouslyFailed(){return dt.isInMemoryStorage||dt.get("previous_websocket_failure")===!0}markConnectionHealthy(){dt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=kn(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(E(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=J(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Fl(n,Zf);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(ep))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}_e.responsesRequiredToBeHealthy=2;_e.healthyTimeout=3e4;/**
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
 */class Cn{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Ot,_e]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=_e&&_e.isAvailable();let i=n&&!_e.previouslyFailed();if(e.webSocketOnly&&(n||oe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[_e];else{const s=this.transports_=[];for(const r of Cn.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Cn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Cn.globalTransportInitialized_=!1;/**
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
 */const tp=6e4,np=5e3,ip=10*1024,sp=100*1024,Ts="t",Ko="d",rp="s",Yo="r",op="e",Qo="o",Jo="a",Xo="n",Zo="p",ap="h";class lp{constructor(e,n,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Fn("c:"+this.id+":"),this.transportManager_=new Cn(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=yn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>sp?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>ip?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ts in e){const n=e[Ts];n===Jo?this.upgradeIfSecondaryHealthy_():n===Yo?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Qo&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ln("t",e),i=ln("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Zo,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Jo,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Xo,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ln("t",e),i=ln("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ln(Ts,e);if(Ko in e){const i=e[Ko];if(n===ap){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Xo){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===rp?this.onConnectionShutdown_(i):n===Yo?this.onReset_(i):n===op?Js("Server Error: "+i):n===Qo?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Js("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Sr!==i&&oe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),yn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(tp))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):yn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(np))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Zo,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(dt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class ic{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class sc{constructor(e){this.allowedEvents_=e,this.listeners_={},E(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){E(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class bi extends sc{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Er()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new bi}getInitialEvent(e){return E(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const ea=32,ta=768;class ${constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function D(){return new $("")}function N(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function nt(t){return t.pieces_.length-t.pieceNum_}function F(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new $(t.pieces_,e)}function Ar(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function cp(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function An(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function rc(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new $(e,0)}function q(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof $)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new $(n,0)}function L(t){return t.pieceNum_>=t.pieces_.length}function re(t,e){const n=N(t),i=N(e);if(n===null)return e;if(n===i)return re(F(t),F(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function dp(t,e){const n=An(t,0),i=An(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=Tt(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function Rr(t,e){if(nt(t)!==nt(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function pe(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(nt(t)>nt(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class up{constructor(e,n){this.errorPrefix_=n,this.parts_=An(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=qi(this.parts_[i]);oc(this)}}function hp(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=qi(e),oc(t)}function fp(t){const e=t.parts_.pop();t.byteLength_-=qi(e),t.parts_.length>0&&(t.byteLength_-=1)}function oc(t){if(t.byteLength_>ta)throw new Error(t.errorPrefix_+"has a key path longer than "+ta+" bytes ("+t.byteLength_+").");if(t.parts_.length>ea)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ea+") or object contains a cycle "+ct(t))}function ct(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class Nr extends sc{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new Nr}getInitialEvent(e){return E(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const cn=1e3,pp=60*5*1e3,na=30*1e3,mp=1.3,gp=3e4,yp="server_kill",ia=3;class $e extends ic{constructor(e,n,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=$e.nextPersistentConnectionId_++,this.log_=Fn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=cn,this.maxReconnectDelay_=pp,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Nr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&bi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(J(r)),E(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Xt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),E(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),E(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;$e.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Te(e,"w")){const i=ft(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();oe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||nh(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=na)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=th(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),E(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+J(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Js("Unrecognized action received from server: "+J(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){E(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=cn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=cn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>gp&&(this.reconnectDelay_=cn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*mp)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+$e.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){E(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?te("getToken() completed but was canceled"):(te("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new lp(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{oe(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(yp)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&oe(u),l())}}}interrupt(e){te("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){te("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Vs(this.interruptReasons_)&&(this.reconnectDelay_=cn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>kr(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new $(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){te("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ia&&(this.reconnectDelay_=na,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){te("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ia&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Dl.replace(/\./g,"-")]=1,Er()?e["framework.cordova"]=1:kl()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=bi.getInstance().currentlyOnline();return Vs(this.interruptReasons_)&&e}}$e.nextPersistentConnectionId_=0;$e.nextConnectionId_=0;/**
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
 */class P{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new P(e,n)}}/**
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
 */class Yi{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new P(Wt,e),s=new P(Wt,n);return this.compare(i,s)!==0}minPost(){return P.MIN}}/**
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
 */let ei;class ac extends Yi{static get __EMPTY_NODE(){return ei}static set __EMPTY_NODE(e){ei=e}compare(e,n){return Tt(e.name,n.name)}isDefinedOn(e){throw Jt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return P.MIN}maxPost(){return new P(pt,ei)}makePost(e,n){return E(typeof e=="string","KeyIndex indexValue must always be a string."),new P(e,ei)}toString(){return".key"}}const $t=new ac;/**
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
 */class ti{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Z{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??Z.RED,this.left=s??le.EMPTY_NODE,this.right=r??le.EMPTY_NODE}copy(e,n,i,s,r){return new Z(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return le.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return le.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Z.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Z.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Z.RED=!0;Z.BLACK=!1;class _p{copy(e,n,i,s,r){return this}insert(e,n,i){return new Z(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class le{constructor(e,n=le.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new le(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Z.BLACK,null,null))}remove(e){return new le(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Z.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ti(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new ti(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new ti(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new ti(this.root_,null,this.comparator_,!0,e)}}le.EMPTY_NODE=new _p;/**
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
 */function wp(t,e){return Tt(t.name,e.name)}function Pr(t,e){return Tt(t,e)}/**
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
 */let Zs;function vp(t){Zs=t}const lc=function(t){return typeof t=="number"?"number:"+Ul(t):"string:"+t},cc=function(t){if(t.isLeafNode()){const e=t.val();E(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Te(e,".sv"),"Priority must be a string or number.")}else E(t===Zs||t.isEmpty(),"priority of unexpected type.");E(t===Zs||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let sa;class X{constructor(e,n=X.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,E(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),cc(this.priorityNode_)}static set __childrenNodeConstructor(e){sa=e}static get __childrenNodeConstructor(){return sa}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new X(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:X.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return L(e)?this:N(e)===".priority"?this.priorityNode_:X.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:X.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=N(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(E(i!==".priority"||nt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,X.__childrenNodeConstructor.EMPTY_NODE.updateChild(F(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+lc(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Ul(this.value_):e+=this.value_,this.lazyHash_=Bl(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===X.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof X.__childrenNodeConstructor?-1:(E(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=X.VALUE_TYPE_ORDER.indexOf(n),r=X.VALUE_TYPE_ORDER.indexOf(i);return E(s>=0,"Unknown leaf type: "+n),E(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}X.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let dc,uc;function bp(t){dc=t}function Ep(t){uc=t}class Ip extends Yi{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?Tt(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return P.MIN}maxPost(){return new P(pt,new X("[PRIORITY-POST]",uc))}makePost(e,n){const i=dc(e);return new P(n,new X("[PRIORITY-POST]",i))}toString(){return".priority"}}const H=new Ip;/**
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
 */const Tp=Math.log(2);class kp{constructor(e){const n=r=>parseInt(Math.log(r)/Tp,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ei=function(t,e,n,i){t.sort(e);const s=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=t[l],h=n?n(u):u,new Z(h,u.node,Z.BLACK,null,null);{const f=parseInt(d/2,10)+l,p=s(l,f),y=s(f+1,c);return u=t[f],h=n?n(u):u,new Z(h,u.node,Z.BLACK,p,y)}},r=function(l){let c=null,d=null,u=t.length;const h=function(p,y){const b=u-p,g=u;u-=p;const m=s(b+1,g),w=t[b],v=n?n(w):w;f(new Z(v,w.node,y,null,m))},f=function(p){c?(c.left=p,c=p):(d=p,c=p)};for(let p=0;p<l.count;++p){const y=l.nextBitIsOne(),b=Math.pow(2,l.count-(p+1));y?h(b,Z.BLACK):(h(b,Z.BLACK),h(b,Z.RED))}return d},o=new kp(t.length),a=r(o);return new le(i||e,a)};/**
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
 */let ks;const Lt={};class Le{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return E(Lt&&H,"ChildrenNode.ts has not been loaded"),ks=ks||new Le({".priority":Lt},{".priority":H}),ks}get(e){const n=ft(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof le?n:null}hasIndex(e){return Te(this.indexSet_,e.toString())}addIndex(e,n){E(e!==$t,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(P.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Ei(i,e.getCompare()):a=Lt;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const d=Object.assign({},this.indexes_);return d[l]=a,new Le(d,c)}addToIndexes(e,n){const i=_i(this.indexes_,(s,r)=>{const o=ft(this.indexSet_,r);if(E(o,"Missing index implementation for "+r),s===Lt)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(P.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Ei(a,o.getCompare())}else return Lt;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new P(e.name,a))),l.insert(e,e.node)}});return new Le(i,this.indexSet_)}removeFromIndexes(e,n){const i=_i(this.indexes_,s=>{if(s===Lt)return s;{const r=n.get(e.name);return r?s.remove(new P(e.name,r)):s}});return new Le(i,this.indexSet_)}}/**
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
 */let dn;class S{constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&cc(this.priorityNode_),this.children_.isEmpty()&&E(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return dn||(dn=new S(new le(Pr),null,Le.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||dn}updatePriority(e){return this.children_.isEmpty()?this:new S(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?dn:n}}getChild(e){const n=N(e);return n===null?this:this.getImmediateChild(n).getChild(F(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(E(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new P(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?dn:this.priorityNode_;return new S(s,o,r)}}updateChild(e,n){const i=N(e);if(i===null)return n;{E(N(e)!==".priority"||nt(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(F(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(H,(o,a)=>{n[o]=a.val(e),i++,r&&S.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+lc(this.getPriority().val())+":"),this.forEachChild(H,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":Bl(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new P(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new P(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new P(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,P.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,P.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Un?-1:0}withIndex(e){if(e===$t||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new S(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===$t||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(H),s=n.getIterator(H);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===$t?null:this.indexMap_.get(e.toString())}}S.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Sp extends S{constructor(){super(new le(Pr),S.EMPTY_NODE,Le.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return S.EMPTY_NODE}isEmpty(){return!1}}const Un=new Sp;Object.defineProperties(P,{MIN:{value:new P(Wt,S.EMPTY_NODE)},MAX:{value:new P(pt,Un)}});ac.__EMPTY_NODE=S.EMPTY_NODE;X.__childrenNodeConstructor=S;vp(Un);Ep(Un);/**
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
 */const xp=!0;function Y(t,e=null){if(t===null)return S.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),E(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new X(n,Y(e))}if(!(t instanceof Array)&&xp){const n=[];let i=!1;if(ne(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=Y(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new P(o,l)))}}),n.length===0)return S.EMPTY_NODE;const r=Ei(n,wp,o=>o.name,Pr);if(i){const o=Ei(n,H.getCompare());return new S(r,Y(e),new Le({".priority":o},{".priority":H}))}else return new S(r,Y(e),Le.Default)}else{let n=S.EMPTY_NODE;return ne(t,(i,s)=>{if(Te(t,i)&&i.substring(0,1)!=="."){const r=Y(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(Y(e))}}bp(Y);/**
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
 */class Cp extends Yi{constructor(e){super(),this.indexPath_=e,E(!L(e)&&N(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?Tt(e.name,n.name):r}makePost(e,n){const i=Y(e),s=S.EMPTY_NODE.updateChild(this.indexPath_,i);return new P(n,s)}maxPost(){const e=S.EMPTY_NODE.updateChild(this.indexPath_,Un);return new P(pt,e)}toString(){return An(this.indexPath_,0).join("/")}}/**
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
 */class Ap extends Yi{compare(e,n){const i=e.node.compareTo(n.node);return i===0?Tt(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return P.MIN}maxPost(){return P.MAX}makePost(e,n){const i=Y(e);return new P(n,i)}toString(){return".value"}}const Rp=new Ap;/**
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
 */function hc(t){return{type:"value",snapshotNode:t}}function zt(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Rn(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Nn(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Np(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class Lr{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){E(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Rn(n,a)):E(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(zt(n,i)):o.trackChildChange(Nn(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(H,(s,r)=>{n.hasChild(s)||i.trackChildChange(Rn(s,r))}),n.isLeafNode()||n.forEachChild(H,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Nn(s,r,o))}else i.trackChildChange(zt(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?S.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Pn{constructor(e){this.indexedFilter_=new Lr(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Pn.getStartPost_(e),this.endPost_=Pn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new P(n,i))||(i=S.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=S.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(S.EMPTY_NODE);const r=this;return n.forEachChild(H,(o,a)=>{r.matches(new P(o,a))||(s=s.updateImmediateChild(o,S.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class Pp{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Pn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new P(n,i))||(i=S.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=S.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=S.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(S.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,S.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,f)=>u(f,h)}else o=this.index_.getCompare();const a=e;E(a.numChildren()===this.limit_,"");const l=new P(n,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const u=a.getImmediateChild(n);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,l);if(d&&!i.isEmpty()&&f>=0)return r!=null&&r.trackChildChange(Nn(n,i,u)),a.updateImmediateChild(n,i);{r!=null&&r.trackChildChange(Rn(n,u));const y=a.updateImmediateChild(n,S.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r!=null&&r.trackChildChange(zt(h.name,h.node)),y.updateImmediateChild(h.name,h.node)):y}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Rn(c.name,c.node)),r.trackChildChange(zt(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(c.name,S.EMPTY_NODE)):e}}/**
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
 */class Or{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=H}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return E(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return E(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Wt}hasEnd(){return this.endSet_}getIndexEndValue(){return E(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return E(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:pt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return E(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===H}copy(){const e=new Or;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Lp(t){return t.loadsAllData()?new Lr(t.getIndex()):t.hasLimit()?new Pp(t):new Pn(t)}function ra(t){const e={};if(t.isDefault())return e;let n;if(t.index_===H?n="$priority":t.index_===Rp?n="$value":t.index_===$t?n="$key":(E(t.index_ instanceof Cp,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=J(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=J(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+J(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=J(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+J(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function oa(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==H&&(e.i=t.index_.toString()),e}/**
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
 */class Ii extends ic{constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Fn("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(E(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Ii.getListenId_(e,i),a={};this.listens_[o]=a;const l=ra(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),ft(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,n){const i=Ii.getListenId_(e,n);delete this.listens_[i]}get(e){const n=ra(e._queryParams),i=e._path.toString(),s=new Xt;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Zt(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=kn(a.responseText)}catch{oe("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&oe("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class Op{constructor(){this.rootNode_=S.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function Ti(){return{value:null,children:new Map}}function fc(t,e,n){if(L(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=N(e);t.children.has(i)||t.children.set(i,Ti());const s=t.children.get(i);e=F(e),fc(s,e,n)}}function er(t,e,n){t.value!==null?n(e,t.value):Dp(t,(i,s)=>{const r=new $(e.toString()+"/"+i);er(s,r,n)})}function Dp(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
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
 */class Mp{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&ne(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
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
 */const aa=10*1e3,$p=30*1e3,Bp=5*60*1e3;class Fp{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Mp(e);const i=aa+($p-aa)*Math.random();yn(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;ne(e,(s,r)=>{r>0&&Te(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),yn(this.reportStats_.bind(this),Math.floor(Math.random()*2*Bp))}}/**
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
 */var we;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(we||(we={}));function Dr(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Mr(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function $r(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */class ki{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=we.ACK_USER_WRITE,this.source=Dr()}operationForChild(e){if(L(this.path)){if(this.affectedTree.value!=null)return E(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new $(e));return new ki(D(),n,this.revert)}}else return E(N(this.path)===e,"operationForChild called for unrelated child."),new ki(F(this.path),this.affectedTree,this.revert)}}/**
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
 */class Ln{constructor(e,n){this.source=e,this.path=n,this.type=we.LISTEN_COMPLETE}operationForChild(e){return L(this.path)?new Ln(this.source,D()):new Ln(this.source,F(this.path))}}/**
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
 */class mt{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=we.OVERWRITE}operationForChild(e){return L(this.path)?new mt(this.source,D(),this.snap.getImmediateChild(e)):new mt(this.source,F(this.path),this.snap)}}/**
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
 */class Ht{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=we.MERGE}operationForChild(e){if(L(this.path)){const n=this.children.subtree(new $(e));return n.isEmpty()?null:n.value?new mt(this.source,D(),n.value):new Ht(this.source,D(),n)}else return E(N(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ht(this.source,F(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class it{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(L(e))return this.isFullyInitialized()&&!this.filtered_;const n=N(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class Up{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function jp(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Np(o.childName,o.snapshotNode))}),un(t,s,"child_removed",e,i,n),un(t,s,"child_added",e,i,n),un(t,s,"child_moved",r,i,n),un(t,s,"child_changed",e,i,n),un(t,s,"value",e,i,n),s}function un(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,l)=>zp(t,a,l)),o.forEach(a=>{const l=Wp(t,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function Wp(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function zp(t,e,n){if(e.childName==null||n.childName==null)throw Jt("Should only compare child_ events.");const i=new P(e.childName,e.snapshotNode),s=new P(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
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
 */function Qi(t,e){return{eventCache:t,serverCache:e}}function _n(t,e,n,i){return Qi(new it(e,n,i),t.serverCache)}function pc(t,e,n,i){return Qi(t.eventCache,new it(e,n,i))}function Si(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function gt(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let Ss;const Hp=()=>(Ss||(Ss=new le(Cf)),Ss);class B{constructor(e,n=Hp()){this.value=e,this.children=n}static fromObject(e){let n=new B(null);return ne(e,(i,s)=>{n=n.set(new $(i),s)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:D(),value:this.value};if(L(e))return null;{const i=N(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(F(e),n);return r!=null?{path:q(new $(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(L(e))return this;{const n=N(e),i=this.children.get(n);return i!==null?i.subtree(F(e)):new B(null)}}set(e,n){if(L(e))return new B(n,this.children);{const i=N(e),r=(this.children.get(i)||new B(null)).set(F(e),n),o=this.children.insert(i,r);return new B(this.value,o)}}remove(e){if(L(e))return this.children.isEmpty()?new B(null):new B(null,this.children);{const n=N(e),i=this.children.get(n);if(i){const s=i.remove(F(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new B(null):new B(this.value,r)}else return this}}get(e){if(L(e))return this.value;{const n=N(e),i=this.children.get(n);return i?i.get(F(e)):null}}setTree(e,n){if(L(e))return n;{const i=N(e),r=(this.children.get(i)||new B(null)).setTree(F(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new B(this.value,o)}}fold(e){return this.fold_(D(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(q(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,D(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(L(e))return null;{const r=N(e),o=this.children.get(r);return o?o.findOnPath_(F(e),q(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,D(),n)}foreachOnPath_(e,n,i){if(L(e))return this;{this.value&&i(n,this.value);const s=N(e),r=this.children.get(s);return r?r.foreachOnPath_(F(e),q(n,s),i):new B(null)}}foreach(e){this.foreach_(D(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(q(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
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
 */class ve{constructor(e){this.writeTree_=e}static empty(){return new ve(new B(null))}}function wn(t,e,n){if(L(e))return new ve(new B(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=re(s,e);return r=r.updateChild(o,n),new ve(t.writeTree_.set(s,r))}else{const s=new B(n),r=t.writeTree_.setTree(e,s);return new ve(r)}}}function tr(t,e,n){let i=t;return ne(n,(s,r)=>{i=wn(i,q(e,s),r)}),i}function la(t,e){if(L(e))return ve.empty();{const n=t.writeTree_.setTree(e,new B(null));return new ve(n)}}function nr(t,e){return kt(t,e)!=null}function kt(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(re(n.path,e)):null}function ca(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(H,(i,s)=>{e.push(new P(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new P(i,s.value))}),e}function Ze(t,e){if(L(e))return t;{const n=kt(t,e);return n!=null?new ve(new B(n)):new ve(t.writeTree_.subtree(e))}}function ir(t){return t.writeTree_.isEmpty()}function Vt(t,e){return mc(D(),t.writeTree_,e)}function mc(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(E(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=mc(q(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(q(t,".priority"),i)),n}}/**
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
 */function Ji(t,e){return wc(e,t)}function Vp(t,e,n,i,s){E(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=wn(t.visibleWrites,e,n)),t.lastWriteId=i}function qp(t,e,n,i){E(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=tr(t.visibleWrites,e,n),t.lastWriteId=i}function Gp(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function Kp(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);E(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&Yp(a,i.path)?s=!1:pe(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Qp(t),!0;if(i.snap)t.visibleWrites=la(t.visibleWrites,i.path);else{const a=i.children;ne(a,l=>{t.visibleWrites=la(t.visibleWrites,q(i.path,l))})}return!0}else return!1}function Yp(t,e){if(t.snap)return pe(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&pe(q(t.path,n),e))return!0;return!1}function Qp(t){t.visibleWrites=gc(t.allWrites,Jp,D()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Jp(t){return t.visible}function gc(t,e,n){let i=ve.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)pe(n,o)?(a=re(n,o),i=wn(i,a,r.snap)):pe(o,n)&&(a=re(o,n),i=wn(i,D(),r.snap.getChild(a)));else if(r.children){if(pe(n,o))a=re(n,o),i=tr(i,a,r.children);else if(pe(o,n))if(a=re(o,n),L(a))i=tr(i,D(),r.children);else{const l=ft(r.children,N(a));if(l){const c=l.getChild(F(a));i=wn(i,D(),c)}}}else throw Jt("WriteRecord should have .snap or .children")}}return i}function yc(t,e,n,i,s){if(!i&&!s){const r=kt(t.visibleWrites,e);if(r!=null)return r;{const o=Ze(t.visibleWrites,e);if(ir(o))return n;if(n==null&&!nr(o,D()))return null;{const a=n||S.EMPTY_NODE;return Vt(o,a)}}}else{const r=Ze(t.visibleWrites,e);if(!s&&ir(r))return n;if(!s&&n==null&&!nr(r,D()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(pe(c.path,e)||pe(e,c.path))},a=gc(t.allWrites,o,e),l=n||S.EMPTY_NODE;return Vt(a,l)}}}function Xp(t,e,n){let i=S.EMPTY_NODE;const s=kt(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(H,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=Ze(t.visibleWrites,e);return n.forEachChild(H,(o,a)=>{const l=Vt(Ze(r,new $(o)),a);i=i.updateImmediateChild(o,l)}),ca(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Ze(t.visibleWrites,e);return ca(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Zp(t,e,n,i,s){E(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=q(e,n);if(nr(t.visibleWrites,r))return null;{const o=Ze(t.visibleWrites,r);return ir(o)?s.getChild(n):Vt(o,s.getChild(n))}}function em(t,e,n,i){const s=q(e,n),r=kt(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=Ze(t.visibleWrites,s);return Vt(o,i.getNode().getImmediateChild(n))}else return null}function tm(t,e){return kt(t.visibleWrites,e)}function nm(t,e,n,i,s,r,o){let a;const l=Ze(t.visibleWrites,e),c=kt(l,D());if(c!=null)a=c;else if(n!=null)a=Vt(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&d.length<s;)u(f,i)!==0&&d.push(f),f=h.getNext();return d}else return[]}function im(){return{visibleWrites:ve.empty(),allWrites:[],lastWriteId:-1}}function xi(t,e,n,i){return yc(t.writeTree,t.treePath,e,n,i)}function Br(t,e){return Xp(t.writeTree,t.treePath,e)}function da(t,e,n,i){return Zp(t.writeTree,t.treePath,e,n,i)}function Ci(t,e){return tm(t.writeTree,q(t.treePath,e))}function sm(t,e,n,i,s,r){return nm(t.writeTree,t.treePath,e,n,i,s,r)}function Fr(t,e,n){return em(t.writeTree,t.treePath,e,n)}function _c(t,e){return wc(q(t.treePath,e),t.writeTree)}function wc(t,e){return{treePath:t,writeTree:e}}/**
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
 */class rm{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;E(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),E(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,Nn(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Rn(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,zt(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,Nn(i,e.snapshotNode,s.oldSnap));else throw Jt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class om{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const vc=new om;class Ur{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new it(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Fr(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:gt(this.viewCache_),r=sm(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
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
 */function am(t){return{filter:t}}function lm(t,e){E(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),E(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function cm(t,e,n,i,s){const r=new rm;let o,a;if(n.type===we.OVERWRITE){const c=n;c.source.fromUser?o=sr(t,e,c.path,c.snap,i,s,r):(E(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!L(c.path),o=Ai(t,e,c.path,c.snap,i,s,a,r))}else if(n.type===we.MERGE){const c=n;c.source.fromUser?o=um(t,e,c.path,c.children,i,s,r):(E(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=rr(t,e,c.path,c.children,i,s,a,r))}else if(n.type===we.ACK_USER_WRITE){const c=n;c.revert?o=pm(t,e,c.path,i,s,r):o=hm(t,e,c.path,c.affectedTree,i,s,r)}else if(n.type===we.LISTEN_COMPLETE)o=fm(t,e,n.path,i,r);else throw Jt("Unknown operation type: "+n.type);const l=r.getChanges();return dm(e,o,l),{viewCache:o,changes:l}}function dm(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Si(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(hc(Si(e)))}}function bc(t,e,n,i,s,r){const o=e.eventCache;if(Ci(i,n)!=null)return e;{let a,l;if(L(n))if(E(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=gt(e),d=c instanceof S?c:S.EMPTY_NODE,u=Br(i,d);a=t.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=xi(i,gt(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=N(n);if(c===".priority"){E(nt(n)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=da(i,n,d,l);u!=null?a=t.filter.updatePriority(d,u):a=o.getNode()}else{const d=F(n);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=da(i,n,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=Fr(i,c,e.serverCache);u!=null?a=t.filter.updateChild(o.getNode(),c,u,d,s,r):a=o.getNode()}}return _n(e,a,o.isFullyInitialized()||L(n),t.filter.filtersNodes())}}function Ai(t,e,n,i,s,r,o,a){const l=e.serverCache;let c;const d=o?t.filter:t.filter.getIndexedFilter();if(L(n))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(n,i);c=d.updateFullNode(l.getNode(),f,null)}else{const f=N(n);if(!l.isCompleteForPath(n)&&nt(n)>1)return e;const p=F(n),b=l.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?c=d.updatePriority(l.getNode(),b):c=d.updateChild(l.getNode(),f,b,p,vc,null)}const u=pc(e,c,l.isFullyInitialized()||L(n),d.filtersNodes()),h=new Ur(s,u,r);return bc(t,u,n,s,h,a)}function sr(t,e,n,i,s,r,o){const a=e.eventCache;let l,c;const d=new Ur(s,e,r);if(L(n))c=t.filter.updateFullNode(e.eventCache.getNode(),i,o),l=_n(e,c,!0,t.filter.filtersNodes());else{const u=N(n);if(u===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),i),l=_n(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=F(n),f=a.getNode().getImmediateChild(u);let p;if(L(h))p=i;else{const y=d.getCompleteChild(u);y!=null?Ar(h)===".priority"&&y.getChild(rc(h)).isEmpty()?p=y:p=y.updateChild(h,i):p=S.EMPTY_NODE}if(f.equals(p))l=e;else{const y=t.filter.updateChild(a.getNode(),u,p,h,d,o);l=_n(e,y,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function ua(t,e){return t.eventCache.isCompleteForChild(e)}function um(t,e,n,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=q(n,l);ua(e,N(d))&&(a=sr(t,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=q(n,l);ua(e,N(d))||(a=sr(t,a,d,c,s,r,o))}),a}function ha(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function rr(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;L(n)?c=i:c=new B(null).setTree(n,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const f=e.serverCache.getNode().getImmediateChild(u),p=ha(t,f,h);l=Ai(t,l,new $(u),p,s,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const f=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!f){const p=e.serverCache.getNode().getImmediateChild(u),y=ha(t,p,h);l=Ai(t,l,new $(u),y,s,r,o,a)}}),l}function hm(t,e,n,i,s,r,o){if(Ci(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(L(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Ai(t,e,n,l.getNode().getChild(n),s,r,a,o);if(L(n)){let c=new B(null);return l.getNode().forEachChild($t,(d,u)=>{c=c.set(new $(d),u)}),rr(t,e,n,c,s,r,a,o)}else return e}else{let c=new B(null);return i.foreach((d,u)=>{const h=q(n,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),rr(t,e,n,c,s,r,a,o)}}function fm(t,e,n,i,s){const r=e.serverCache,o=pc(e,r.getNode(),r.isFullyInitialized()||L(n),r.isFiltered());return bc(t,o,n,i,vc,s)}function pm(t,e,n,i,s,r){let o;if(Ci(i,n)!=null)return e;{const a=new Ur(i,e,s),l=e.eventCache.getNode();let c;if(L(n)||N(n)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=xi(i,gt(e));else{const u=e.serverCache.getNode();E(u instanceof S,"serverChildren would be complete if leaf node"),d=Br(i,u)}d=d,c=t.filter.updateFullNode(l,d,r)}else{const d=N(n);let u=Fr(i,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=t.filter.updateChild(l,d,u,F(n),a,r):e.eventCache.getNode().hasChild(d)?c=t.filter.updateChild(l,d,S.EMPTY_NODE,F(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=xi(i,gt(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Ci(i,D())!=null,_n(e,c,o,t.filter.filtersNodes())}}/**
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
 */class mm{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Lr(i.getIndex()),r=Lp(i);this.processor_=am(r);const o=n.serverCache,a=n.eventCache,l=s.updateFullNode(S.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(S.EMPTY_NODE,a.getNode(),null),d=new it(l,o.isFullyInitialized(),s.filtersNodes()),u=new it(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Qi(u,d),this.eventGenerator_=new Up(this.query_)}get query(){return this.query_}}function gm(t){return t.viewCache_.serverCache.getNode()}function ym(t){return Si(t.viewCache_)}function _m(t,e){const n=gt(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!L(e)&&!n.getImmediateChild(N(e)).isEmpty())?n.getChild(e):null}function fa(t){return t.eventRegistrations_.length===0}function wm(t,e){t.eventRegistrations_.push(e)}function pa(t,e,n){const i=[];if(n){E(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function ma(t,e,n,i){e.type===we.MERGE&&e.source.queryId!==null&&(E(gt(t.viewCache_),"We should always have a full cache before handling merges"),E(Si(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=cm(t.processor_,s,e,n,i);return lm(t.processor_,r.viewCache),E(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Ec(t,r.changes,r.viewCache.eventCache.getNode(),null)}function vm(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(H,(r,o)=>{i.push(zt(r,o))}),n.isFullyInitialized()&&i.push(hc(n.getNode())),Ec(t,i,n.getNode(),e)}function Ec(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return jp(t.eventGenerator_,e,n,s)}/**
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
 */let Ri;class Ic{constructor(){this.views=new Map}}function bm(t){E(!Ri,"__referenceConstructor has already been defined"),Ri=t}function Em(){return E(Ri,"Reference.ts has not been loaded"),Ri}function Im(t){return t.views.size===0}function jr(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return E(r!=null,"SyncTree gave us an op for an invalid query."),ma(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(ma(o,e,n,i));return r}}function Tc(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=xi(n,s?i:null),l=!1;a?l=!0:i instanceof S?(a=Br(n,i),l=!1):(a=S.EMPTY_NODE,l=!1);const c=Qi(new it(a,l,!1),new it(i,s,!1));return new mm(e,c)}return o}function Tm(t,e,n,i,s,r){const o=Tc(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),wm(o,n),vm(o,n)}function km(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=st(t);if(s==="default")for(const[l,c]of t.views.entries())o=o.concat(pa(c,n,i)),fa(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(s);l&&(o=o.concat(pa(l,n,i)),fa(l)&&(t.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!st(t)&&r.push(new(Em())(e._repo,e._path)),{removed:r,events:o}}function kc(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function et(t,e){let n=null;for(const i of t.views.values())n=n||_m(i,e);return n}function Sc(t,e){if(e._queryParams.loadsAllData())return Xi(t);{const i=e._queryIdentifier;return t.views.get(i)}}function xc(t,e){return Sc(t,e)!=null}function st(t){return Xi(t)!=null}function Xi(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Ni;function Sm(t){E(!Ni,"__referenceConstructor has already been defined"),Ni=t}function xm(){return E(Ni,"Reference.ts has not been loaded"),Ni}let Cm=1;class ga{constructor(e){this.listenProvider_=e,this.syncPointTree_=new B(null),this.pendingWriteTree_=im(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Wr(t,e,n,i,s){return Vp(t.pendingWriteTree_,e,n,i,s),s?tn(t,new mt(Dr(),e,n)):[]}function Am(t,e,n,i){qp(t.pendingWriteTree_,e,n,i);const s=B.fromObject(n);return tn(t,new Ht(Dr(),e,s))}function Qe(t,e,n=!1){const i=Gp(t.pendingWriteTree_,e);if(Kp(t.pendingWriteTree_,e)){let r=new B(null);return i.snap!=null?r=r.set(D(),!0):ne(i.children,o=>{r=r.set(new $(o),!0)}),tn(t,new ki(i.path,r,n))}else return[]}function jn(t,e,n){return tn(t,new mt(Mr(),e,n))}function Rm(t,e,n){const i=B.fromObject(n);return tn(t,new Ht(Mr(),e,i))}function Nm(t,e){return tn(t,new Ln(Mr(),e))}function Pm(t,e,n){const i=zr(t,n);if(i){const s=Hr(i),r=s.path,o=s.queryId,a=re(r,e),l=new Ln($r(o),a);return Vr(t,r,l)}else return[]}function Pi(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||xc(o,e))){const l=km(o,e,n,i);Im(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=t.syncPointTree_.findOnPath(r,(h,f)=>st(f));if(d&&!u){const h=t.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=Dm(h);for(let p=0;p<f.length;++p){const y=f[p],b=y.query,g=Nc(t,y);t.listenProvider_.startListening(vn(b),On(t,b),g.hashFn,g.onComplete)}}}!u&&c.length>0&&!i&&(d?t.listenProvider_.stopListening(vn(e),null):c.forEach(h=>{const f=t.queryToTagMap.get(es(h));t.listenProvider_.stopListening(vn(h),f)}))}Mm(t,c)}return a}function Cc(t,e,n,i){const s=zr(t,i);if(s!=null){const r=Hr(s),o=r.path,a=r.queryId,l=re(o,e),c=new mt($r(a),l,n);return Vr(t,o,c)}else return[]}function Lm(t,e,n,i){const s=zr(t,i);if(s){const r=Hr(s),o=r.path,a=r.queryId,l=re(o,e),c=B.fromObject(n),d=new Ht($r(a),l,c);return Vr(t,o,d)}else return[]}function or(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(h,f)=>{const p=re(h,s);r=r||et(f,p),o=o||st(f)});let a=t.syncPointTree_.get(s);a?(o=o||st(a),r=r||et(a,D())):(a=new Ic,t.syncPointTree_=t.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=S.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((f,p)=>{const y=et(p,D());y&&(r=r.updateImmediateChild(f,y))}));const c=xc(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=es(e);E(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=$m();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const d=Ji(t.pendingWriteTree_,s);let u=Tm(a,e,n,d,r,l);if(!c&&!o&&!i){const h=Sc(a,e);u=u.concat(Bm(t,e,h))}return u}function Zi(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=re(o,e),c=et(a,l);if(c)return c});return yc(s,e,r,n,!0)}function Om(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(c,d)=>{const u=re(c,n);i=i||et(d,u)});let s=t.syncPointTree_.get(n);s?i=i||et(s,D()):(s=new Ic,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new it(i,!0,!1):null,a=Ji(t.pendingWriteTree_,e._path),l=Tc(s,e,a,r?o.getNode():S.EMPTY_NODE,r);return ym(l)}function tn(t,e){return Ac(e,t.syncPointTree_,null,Ji(t.pendingWriteTree_,D()))}function Ac(t,e,n,i){if(L(t.path))return Rc(t,e,n,i);{const s=e.get(D());n==null&&s!=null&&(n=et(s,D()));let r=[];const o=N(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,d=_c(i,o);r=r.concat(Ac(a,l,c,d))}return s&&(r=r.concat(jr(s,t,i,n))),r}}function Rc(t,e,n,i){const s=e.get(D());n==null&&s!=null&&(n=et(s,D()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=_c(i,o),d=t.operationForChild(o);d&&(r=r.concat(Rc(d,a,l,c)))}),s&&(r=r.concat(jr(s,t,i,n))),r}function Nc(t,e){const n=e.query,i=On(t,n);return{hashFn:()=>(gm(e)||S.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Pm(t,n._path,i):Nm(t,n._path);{const r=Nf(s,n);return Pi(t,n,null,r)}}}}function On(t,e){const n=es(e);return t.queryToTagMap.get(n)}function es(t){return t._path.toString()+"$"+t._queryIdentifier}function zr(t,e){return t.tagToQueryMap.get(e)}function Hr(t){const e=t.indexOf("$");return E(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new $(t.substr(0,e))}}function Vr(t,e,n){const i=t.syncPointTree_.get(e);E(i,"Missing sync point for query tag that we're tracking");const s=Ji(t.pendingWriteTree_,e);return jr(i,n,s,null)}function Dm(t){return t.fold((e,n,i)=>{if(n&&st(n))return[Xi(n)];{let s=[];return n&&(s=kc(n)),ne(i,(r,o)=>{s=s.concat(o)}),s}})}function vn(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(xm())(t._repo,t._path):t}function Mm(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=es(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function $m(){return Cm++}function Bm(t,e,n){const i=e._path,s=On(t,e),r=Nc(t,n),o=t.listenProvider_.startListening(vn(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)E(!st(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!L(c)&&d&&st(d))return[Xi(d).query];{let h=[];return d&&(h=h.concat(kc(d).map(f=>f.query))),ne(u,(f,p)=>{h=h.concat(p)}),h}});for(let c=0;c<l.length;++c){const d=l[c];t.listenProvider_.stopListening(vn(d),On(t,d))}}return o}/**
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
 */class qr{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new qr(n)}node(){return this.node_}}class Gr{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=q(this.path_,e);return new Gr(this.syncTree_,n)}node(){return Zi(this.syncTree_,this.path_)}}const Fm=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},ya=function(t,e,n){if(!t||typeof t!="object")return t;if(E(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return Um(t[".sv"],e,n);if(typeof t[".sv"]=="object")return jm(t[".sv"],e);E(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},Um=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:E(!1,"Unexpected server value: "+t)}},jm=function(t,e,n){t.hasOwnProperty("increment")||E(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&E(!1,"Unexpected increment value: "+i);const s=e.node();if(E(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Pc=function(t,e,n,i){return Yr(e,new Gr(n,t),i)},Kr=function(t,e,n){return Yr(t,new qr(e),n)};function Yr(t,e,n){const i=t.getPriority().val(),s=ya(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=ya(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new X(a,Y(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new X(s))),o.forEachChild(H,(a,l)=>{const c=Yr(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class Qr{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function ts(t,e){let n=e instanceof $?e:new $(e),i=t,s=N(n);for(;s!==null;){const r=ft(i.node.children,s)||{children:{},childCount:0};i=new Qr(s,i,r),n=F(n),s=N(n)}return i}function St(t){return t.node.value}function Jr(t,e){t.node.value=e,ar(t)}function Lc(t){return t.node.childCount>0}function Wm(t){return St(t)===void 0&&!Lc(t)}function ns(t,e){ne(t.node.children,(n,i)=>{e(new Qr(n,t,i))})}function Oc(t,e,n,i){n&&e(t),ns(t,s=>{Oc(s,e,!0)})}function zm(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Wn(t){return new $(t.parent===null?t.name:Wn(t.parent)+"/"+t.name)}function ar(t){t.parent!==null&&Hm(t.parent,t.name,t)}function Hm(t,e,n){const i=Wm(n),s=Te(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,ar(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,ar(t))}/**
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
 */const Vm=/[\[\].#$\/\u0000-\u001F\u007F]/,qm=/[\[\].#$\u0000-\u001F\u007F]/,xs=10*1024*1024,Xr=function(t){return typeof t=="string"&&t.length!==0&&!Vm.test(t)},Dc=function(t){return typeof t=="string"&&t.length!==0&&!qm.test(t)},Gm=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Dc(t)},Mc=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Tr(t)||t&&typeof t=="object"&&Te(t,".sv")},$c=function(t,e,n,i){i&&e===void 0||zn(Vi(t,"value"),e,n)},zn=function(t,e,n){const i=n instanceof $?new up(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+ct(i));if(typeof e=="function")throw new Error(t+"contains a function "+ct(i)+" with contents = "+e.toString());if(Tr(e))throw new Error(t+"contains "+e.toString()+" "+ct(i));if(typeof e=="string"&&e.length>xs/3&&qi(e)>xs)throw new Error(t+"contains a string greater than "+xs+" utf8 bytes "+ct(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(ne(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Xr(o)))throw new Error(t+" contains an invalid key ("+o+") "+ct(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);hp(i,o),zn(t,a,i),fp(i)}),s&&r)throw new Error(t+' contains ".value" child '+ct(i)+" in addition to actual children.")}},Km=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=An(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Xr(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(dp);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&pe(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Ym=function(t,e,n,i){const s=Vi(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];ne(e,(o,a)=>{const l=new $(o);if(zn(s,a,q(n,l)),Ar(l)===".priority"&&!Mc(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Km(s,r)},Bc=function(t,e,n,i){if(!Dc(n))throw new Error(Vi(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Qm=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Bc(t,e,n)},is=function(t,e){if(N(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},Jm=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Xr(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Gm(n))throw new Error(Vi(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class Xm{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ss(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!Rr(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function Fc(t,e,n){ss(t,n),Uc(t,i=>Rr(i,e))}function fe(t,e,n){ss(t,n),Uc(t,i=>pe(i,e)||pe(e,i))}function Uc(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(Zm(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function Zm(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();gn&&te("event: "+n.toString()),en(i)}}}/**
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
 */const eg="repo_interrupt",tg=25;class ng{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Xm,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ti(),this.transactionQueueTree_=new Qr,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function ig(t,e,n){if(t.stats_=xr(t.repoInfo_),t.forceRestClient_||Df())t.server_=new Ii(t.repoInfo_,(i,s,r,o)=>{_a(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>wa(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{J(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new $e(t.repoInfo_,e,(i,s,r,o)=>{_a(t,i,s,r,o)},i=>{wa(t,i)},i=>{sg(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=Uf(t.repoInfo_,()=>new Fp(t.stats_,t.server_)),t.infoData_=new Op,t.infoSyncTree_=new ga({startListening:(i,s,r,o)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=jn(t.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Zr(t,"connected",!1),t.serverSyncTree_=new ga({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);fe(t.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function jc(t){const n=t.infoData_.getNode(new $(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Hn(t){return Fm({timestamp:jc(t)})}function _a(t,e,n,i,s){t.dataUpdateCount++;const r=new $(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const l=_i(n,c=>Y(c));o=Lm(t.serverSyncTree_,r,l,s)}else{const l=Y(n);o=Cc(t.serverSyncTree_,r,l,s)}else if(i){const l=_i(n,c=>Y(c));o=Rm(t.serverSyncTree_,r,l)}else{const l=Y(n);o=jn(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=qt(t,r)),fe(t.eventQueue_,a,o)}function wa(t,e){Zr(t,"connected",e),e===!1&&lg(t)}function sg(t,e){ne(e,(n,i)=>{Zr(t,n,i)})}function Zr(t,e,n){const i=new $("/.info/"+e),s=Y(n);t.infoData_.updateSnapshot(i,s);const r=jn(t.infoSyncTree_,i,s);fe(t.eventQueue_,i,r)}function rs(t){return t.nextWriteId_++}function rg(t,e,n){const i=Om(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=Y(s).withIndex(e._queryParams.getIndex());or(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=jn(t.serverSyncTree_,e._path,r);else{const a=On(t.serverSyncTree_,e);o=Cc(t.serverSyncTree_,e._path,r,a)}return fe(t.eventQueue_,e._path,o),Pi(t.serverSyncTree_,e,n,null,!0),r},s=>(nn(t,"get for query "+J(e)+" failed: "+s),Promise.reject(new Error(s))))}function og(t,e,n,i,s){nn(t,"set",{path:e.toString(),value:n,priority:i});const r=Hn(t),o=Y(n,i),a=Zi(t.serverSyncTree_,e),l=Kr(o,a,r),c=rs(t),d=Wr(t.serverSyncTree_,e,l,c,!0);ss(t.eventQueue_,d),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||oe("set at "+e+" failed: "+h);const y=Qe(t.serverSyncTree_,c,!p);fe(t.eventQueue_,e,y),lr(t,s,h,f)});const u=to(t,e);qt(t,u),fe(t.eventQueue_,u,[])}function ag(t,e,n,i){nn(t,"update",{path:e.toString(),value:n});let s=!0;const r=Hn(t),o={};if(ne(n,(a,l)=>{s=!1,o[a]=Pc(q(e,a),Y(l),t.serverSyncTree_,r)}),s)te("update() called with empty data.  Don't do anything."),lr(t,i,"ok",void 0);else{const a=rs(t),l=Am(t.serverSyncTree_,e,o,a);ss(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,d)=>{const u=c==="ok";u||oe("update at "+e+" failed: "+c);const h=Qe(t.serverSyncTree_,a,!u),f=h.length>0?qt(t,e):e;fe(t.eventQueue_,f,h),lr(t,i,c,d)}),ne(n,c=>{const d=to(t,q(e,c));qt(t,d)}),fe(t.eventQueue_,e,[])}}function lg(t){nn(t,"onDisconnectEvents");const e=Hn(t),n=Ti();er(t.onDisconnect_,D(),(s,r)=>{const o=Pc(s,r,t.serverSyncTree_,e);fc(n,s,o)});let i=[];er(n,D(),(s,r)=>{i=i.concat(jn(t.serverSyncTree_,s,r));const o=to(t,s);qt(t,o)}),t.onDisconnect_=Ti(),fe(t.eventQueue_,D(),i)}function cg(t,e,n){let i;N(e._path)===".info"?i=or(t.infoSyncTree_,e,n):i=or(t.serverSyncTree_,e,n),Fc(t.eventQueue_,e._path,i)}function va(t,e,n){let i;N(e._path)===".info"?i=Pi(t.infoSyncTree_,e,n):i=Pi(t.serverSyncTree_,e,n),Fc(t.eventQueue_,e._path,i)}function dg(t){t.persistentConnection_&&t.persistentConnection_.interrupt(eg)}function nn(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),te(n,...e)}function lr(t,e,n,i){e&&en(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function ug(t,e,n,i,s,r){nn(t,"transaction on "+e);const o={path:e,update:n,onComplete:i,status:null,order:$l(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=eo(t,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{zn("transaction failed: Data returned ",l,o.path),o.status=0;const c=ts(t.transactionQueueTree_,e),d=St(c)||[];d.push(o),Jr(c,d);let u;typeof l=="object"&&l!==null&&Te(l,".priority")?(u=ft(l,".priority"),E(Mc(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(Zi(t.serverSyncTree_,e)||S.EMPTY_NODE).getPriority().val();const h=Hn(t),f=Y(l,u),p=Kr(f,a,h);o.currentOutputSnapshotRaw=f,o.currentOutputSnapshotResolved=p,o.currentWriteId=rs(t);const y=Wr(t.serverSyncTree_,e,p,o.currentWriteId,o.applyLocally);fe(t.eventQueue_,e,y),os(t,t.transactionQueueTree_)}}function eo(t,e,n){return Zi(t.serverSyncTree_,e,n)||S.EMPTY_NODE}function os(t,e=t.transactionQueueTree_){if(e||as(t,e),St(e)){const n=zc(t,e);E(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&hg(t,Wn(e),n)}else Lc(e)&&ns(e,n=>{os(t,n)})}function hg(t,e,n){const i=n.map(c=>c.currentWriteId),s=eo(t,e,i);let r=s;const o=s.hash();for(let c=0;c<n.length;c++){const d=n[c];E(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=re(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{nn(t,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<n.length;h++)n[h].status=2,d=d.concat(Qe(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&u.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();as(t,ts(t.transactionQueueTree_,e)),os(t,t.transactionQueueTree_),fe(t.eventQueue_,e,d);for(let h=0;h<u.length;h++)en(u[h])}else{if(c==="datastale")for(let u=0;u<n.length;u++)n[u].status===3?n[u].status=4:n[u].status=0;else{oe("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<n.length;u++)n[u].status=4,n[u].abortReason=c}qt(t,e)}},o)}function qt(t,e){const n=Wc(t,e),i=Wn(n),s=zc(t,n);return fg(t,s,i),i}function fg(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=re(n,l.path);let d=!1,u;if(E(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,s=s.concat(Qe(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=tg)d=!0,u="maxretry",s=s.concat(Qe(t.serverSyncTree_,l.currentWriteId,!0));else{const h=eo(t,l.path,o);l.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){zn("transaction failed: Data returned ",f,l.path);let p=Y(f);typeof f=="object"&&f!=null&&Te(f,".priority")||(p=p.updatePriority(h.getPriority()));const b=l.currentWriteId,g=Hn(t),m=Kr(p,h,g);l.currentOutputSnapshotRaw=p,l.currentOutputSnapshotResolved=m,l.currentWriteId=rs(t),o.splice(o.indexOf(b),1),s=s.concat(Wr(t.serverSyncTree_,l.path,m,l.currentWriteId,l.applyLocally)),s=s.concat(Qe(t.serverSyncTree_,b,!0))}else d=!0,u="nodata",s=s.concat(Qe(t.serverSyncTree_,l.currentWriteId,!0))}fe(t.eventQueue_,n,s),s=[],d&&(e[a].status=2,function(h){setTimeout(h,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}as(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)en(i[a]);os(t,t.transactionQueueTree_)}function Wc(t,e){let n,i=t.transactionQueueTree_;for(n=N(e);n!==null&&St(i)===void 0;)i=ts(i,n),e=F(e),n=N(e);return i}function zc(t,e){const n=[];return Hc(t,e,n),n.sort((i,s)=>i.order-s.order),n}function Hc(t,e,n){const i=St(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);ns(e,s=>{Hc(t,s,n)})}function as(t,e){const n=St(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,Jr(e,n.length>0?n:void 0)}ns(e,i=>{as(t,i)})}function to(t,e){const n=Wn(Wc(t,e)),i=ts(t.transactionQueueTree_,e);return zm(i,s=>{Cs(t,s)}),Cs(t,i),Oc(i,s=>{Cs(t,s)}),n}function Cs(t,e){const n=St(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(E(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(E(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Qe(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Jr(e,void 0):n.length=r+1,fe(t.eventQueue_,Wn(e),s);for(let o=0;o<i.length;o++)en(i[o])}}/**
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
 */function pg(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function mg(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):oe(`Invalid query segment '${n}' in query '${t}'`)}return e}const ba=function(t,e){const n=gg(t),i=n.namespace;n.domain==="firebase.com"&&Fe(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Fe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Sf();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Ql(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new $(n.pathString)}},gg=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let d=t.indexOf("/");d===-1&&(d=t.length);let u=t.indexOf("?");u===-1&&(u=t.length),e=t.substring(0,Math.min(d,u)),d<u&&(s=pg(t.substring(d,u)));const h=mg(t.substring(Math.min(t.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),n=e.substring(p+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
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
 */const Ea="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",yg=function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Ea.charAt(n%64),n=Math.floor(n/64);E(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Ea.charAt(e[s]);return E(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class _g{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+J(this.snapshot.exportVal())}}class wg{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class Vc{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return E(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class no{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return L(this._path)?null:Ar(this._path)}get ref(){return new Ae(this._repo,this._path)}get _queryIdentifier(){const e=oa(this._queryParams),n=kr(e);return n==="{}"?"default":n}get _queryObject(){return oa(this._queryParams)}isEqual(e){if(e=z(e),!(e instanceof no))return!1;const n=this._repo===e._repo,i=Rr(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+cp(this._path)}}class Ae extends no{constructor(e,n){super(e,n,new Or,!1)}get parent(){const e=rc(this._path);return e===null?null:new Ae(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Gt{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new $(e),i=Dn(this.ref,e);return new Gt(this._node.getChild(n),i,H)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Gt(s,Dn(this.ref,i),H)))}hasChild(e){const n=new $(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function j(t,e){return t=z(t),t._checkNotDeleted("ref"),e!==void 0?Dn(t._root,e):t._root}function Dn(t,e){return t=z(t),N(t._path)===null?Qm("child","path",e):Bc("child","path",e),new Ae(t._repo,q(t._path,e))}function Kt(t,e){t=z(t),is("push",t._path),$c("push",e,t._path,!0);const n=jc(t._repo),i=yg(n),s=Dn(t,i),r=Dn(t,i);let o;return e!=null?o=je(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function qc(t){return is("remove",t._path),je(t,null)}function je(t,e){t=z(t),is("set",t._path),$c("set",e,t._path,!1);const n=new Xt;return og(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Vn(t,e){Ym("update",e,t._path);const n=new Xt;return ag(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function vg(t){t=z(t);const e=new Vc(()=>{}),n=new ls(e);return rg(t._repo,t,n).then(i=>new Gt(i,new Ae(t._repo,t._path),t._queryParams.getIndex()))}class ls{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new _g("value",this,new Gt(e.snapshotNode,new Ae(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new wg(this,e,n):null}matches(e){return e instanceof ls?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function bg(t,e,n,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=n,c=(d,u)=>{va(t._repo,t,a),l(d,u)};c.userCallback=n.userCallback,c.context=n.context,n=c}const o=new Vc(n,r||void 0),a=new ls(o);return cg(t._repo,t,a),()=>va(t._repo,t,a)}function ci(t,e,n,i){return bg(t,"value",e,n,i)}bm(Ae);Sm(Ae);/**
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
 */const Eg="FIREBASE_DATABASE_EMULATOR_HOST",cr={};let Ig=!1;function Tg(t,e,n,i){t.repoInfo_=new Ql(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),i&&(t.authTokenProvider_=i)}function kg(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||Fe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),te("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=ba(r,s),a=o.repoInfo,l;typeof process<"u"&&Wo&&(l=Wo[Eg]),l?(r=`http://${l}?ns=${a.namespace}`,o=ba(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new $f(t.name,t.options,e);Jm("Invalid Firebase Database URL",o),L(o.path)||Fe("Database URL must point to the root of a Firebase Database (not including a child path).");const d=xg(a,t,c,new Mf(t.name,n));return new Cg(d,t)}function Sg(t,e){const n=cr[e];(!n||n[t.key]!==t)&&Fe(`Database ${e}(${t.repoInfo_}) has already been deleted.`),dg(t),delete n[t.key]}function xg(t,e,n,i){let s=cr[e.name];s||(s={},cr[e.name]=s);let r=s[t.toURLString()];return r&&Fe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new ng(t,Ig,n,i),s[t.toURLString()]=r,r}let Cg=class{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(ig(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ae(this._repo,D())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Sg(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Fe("Cannot call "+e+" on a deleted database.")}};function Ag(t=Ki(),e){const n=rt(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=vl("database");i&&Rg(n,...i)}return n}function Rg(t,e,n,i={}){t=z(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Fe("Cannot call useEmulator() after instance has already been initialized.");const s=t._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&Fe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new li(li.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:Il(i.mockUserToken,t.app.options.projectId);r=new li(o)}Tg(s,e,n,r)}/**
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
 */function Ng(t){bf(It),be(new me("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return kg(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),ce(zo,Ho,t),ce(zo,Ho,"esm2017")}/**
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
 */class Pg{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function so(t,e,n){var i;if(t=z(t),is("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const s=(i=void 0)!==null&&i!==void 0?i:!0,r=new Xt,o=(l,c,d)=>{let u=null;l?r.reject(l):(u=new Gt(d,new Ae(t._repo,t._path),H),r.resolve(new Pg(c,u)))},a=ci(t,()=>{});return ug(t._repo,t._path,e,o,a,s),r.promise}$e.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};$e.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Ng();function ro(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(t);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(t,i[s])&&(n[i[s]]=t[i[s]]);return n}function Gc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Lg=Gc,Kc=new Et("auth","Firebase",Gc());/**
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
 */const Li=new Gi("@firebase/auth");function Og(t,...e){Li.logLevel<=M.WARN&&Li.warn(`Auth (${It}): ${t}`,...e)}function di(t,...e){Li.logLevel<=M.ERROR&&Li.error(`Auth (${It}): ${t}`,...e)}/**
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
 */function Ee(t,...e){throw oo(t,...e)}function xe(t,...e){return oo(t,...e)}function Yc(t,e,n){const i=Object.assign(Object.assign({},Lg()),{[e]:n});return new Et("auth","Firebase",i).create(e,{appName:t.name})}function tt(t){return Yc(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function oo(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return Kc.create(t,...e)}function C(t,e,...n){if(!t)throw oo(e,...n)}function Oe(t){const e="INTERNAL ASSERTION FAILED: "+t;throw di(e),new Error(e)}function Ue(t,e){t||Oe(e)}/**
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
 */function dr(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Dg(){return Ia()==="http:"||Ia()==="https:"}function Ia(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function Mg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Dg()||Tl()||"connection"in navigator)?navigator.onLine:!0}function $g(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class qn{constructor(e,n){this.shortDelay=e,this.longDelay=n,Ue(n>e,"Short delay should be less than long delay!"),this.isMobile=Er()||kl()}get(){return Mg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ao(t,e){Ue(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Qc{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Oe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Oe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Oe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Bg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Fg=new qn(3e4,6e4);function xt(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ot(t,e,n,i,s={}){return Jc(t,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Zt(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:l},r);return Ku()||(c.referrerPolicy="no-referrer"),Qc.fetch()(Xc(t,t.config.apiHost,n,a),c)})}async function Jc(t,e,n){t._canInitEmulator=!1;const i=Object.assign(Object.assign({},Bg),e);try{const s=new jg(t),r=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw ni(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw ni(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw ni(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw ni(t,"user-disabled",o);const d=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Yc(t,d,c);Ee(t,d)}}catch(s){if(s instanceof Ie)throw s;Ee(t,"network-request-failed",{message:String(s)})}}async function cs(t,e,n,i,s={}){const r=await ot(t,e,n,i,s);return"mfaPendingCredential"in r&&Ee(t,"multi-factor-auth-required",{_serverResponse:r}),r}function Xc(t,e,n,i){const s=`${e}${n}?${i}`;return t.config.emulator?ao(t.config,s):`${t.config.apiScheme}://${s}`}function Ug(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class jg{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(xe(this.auth,"network-request-failed")),Fg.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ni(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=xe(t,e,i);return s.customData._tokenResponse=n,s}function Ta(t){return t!==void 0&&t.enterprise!==void 0}class Wg{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return Ug(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function zg(t,e){return ot(t,"GET","/v2/recaptchaConfig",xt(t,e))}/**
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
 */async function Hg(t,e){return ot(t,"POST","/v1/accounts:delete",e)}async function Zc(t,e){return ot(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function bn(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Vg(t,e=!1){const n=z(t),i=await n.getIdToken(e),s=lo(i);C(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:bn(As(s.auth_time)),issuedAtTime:bn(As(s.iat)),expirationTime:bn(As(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function As(t){return Number(t)*1e3}function lo(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return di("JWT malformed, contained fewer than 3 sections"),null;try{const s=yi(n);return s?JSON.parse(s):(di("Failed to decode base64 JWT payload"),null)}catch(s){return di("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function ka(t){const e=lo(t);return C(e,"internal-error"),C(typeof e.exp<"u","internal-error"),C(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Mn(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof Ie&&qg(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function qg({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class Gg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ur{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=bn(this.lastLoginAt),this.creationTime=bn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Oi(t){var e;const n=t.auth,i=await t.getIdToken(),s=await Mn(t,Zc(n,{idToken:i}));C(s==null?void 0:s.users.length,n,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?ed(r.providerUserInfo):[],a=Yg(t.providerData,o),l=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new ur(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(t,u)}async function Kg(t){const e=z(t);await Oi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Yg(t,e){return[...t.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function ed(t){return t.map(e=>{var{providerId:n}=e,i=ro(e,["providerId"]);return{providerId:n,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function Qg(t,e){const n=await Jc(t,{},async()=>{const i=Zt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,o=Xc(t,s,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Qc.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Jg(t,e){return ot(t,"POST","/v2/accounts:revokeToken",xt(t,e))}/**
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
 */class Bt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){C(e.idToken,"internal-error"),C(typeof e.idToken<"u","internal-error"),C(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ka(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){C(e.length!==0,"internal-error");const n=ka(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(C(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:s,expiresIn:r}=await Qg(e,n);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:s,expirationTime:r}=n,o=new Bt;return i&&(C(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(C(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(C(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Bt,this.toJSON())}_performRefresh(){return Oe("not implemented")}}/**
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
 */function He(t,e){C(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class De{constructor(e){var{uid:n,auth:i,stsTokenManager:s}=e,r=ro(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Gg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new ur(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await Mn(this,this.stsTokenManager.getToken(this.auth,e));return C(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Vg(this,e)}reload(){return Kg(this)}_assign(e){this!==e&&(C(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new De(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){C(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await Oi(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Pe(this.auth.app))return Promise.reject(tt(this.auth));const e=await this.getIdToken();return await Mn(this,Hg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var i,s,r,o,a,l,c,d;const u=(i=n.displayName)!==null&&i!==void 0?i:void 0,h=(s=n.email)!==null&&s!==void 0?s:void 0,f=(r=n.phoneNumber)!==null&&r!==void 0?r:void 0,p=(o=n.photoURL)!==null&&o!==void 0?o:void 0,y=(a=n.tenantId)!==null&&a!==void 0?a:void 0,b=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,g=(c=n.createdAt)!==null&&c!==void 0?c:void 0,m=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:w,emailVerified:v,isAnonymous:T,providerData:k,stsTokenManager:R}=n;C(w&&R,e,"internal-error");const x=Bt.fromJSON(this.name,R);C(typeof w=="string",e,"internal-error"),He(u,e.name),He(h,e.name),C(typeof v=="boolean",e,"internal-error"),C(typeof T=="boolean",e,"internal-error"),He(f,e.name),He(p,e.name),He(y,e.name),He(b,e.name),He(g,e.name),He(m,e.name);const Q=new De({uid:w,auth:e,email:h,emailVerified:v,displayName:u,isAnonymous:T,photoURL:p,phoneNumber:f,tenantId:y,stsTokenManager:x,createdAt:g,lastLoginAt:m});return k&&Array.isArray(k)&&(Q.providerData=k.map(ge=>Object.assign({},ge))),b&&(Q._redirectEventId=b),Q}static async _fromIdTokenResponse(e,n,i=!1){const s=new Bt;s.updateFromServerResponse(n);const r=new De({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Oi(r),r}static async _fromGetAccountInfoResponse(e,n,i){const s=n.users[0];C(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?ed(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new Bt;a.updateFromIdToken(i);const l=new De({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new ur(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
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
 */const Sa=new Map;function Me(t){Ue(t instanceof Function,"Expected a class definition");let e=Sa.get(t);return e?(Ue(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Sa.set(t,e),e)}/**
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
 */class td{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}td.type="NONE";const xa=td;/**
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
 */function ui(t,e,n){return`firebase:${t}:${e}:${n}`}class Ft{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=ui(this.userKey,s.apiKey,r),this.fullPersistenceKey=ui("persistence",s.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?De._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new Ft(Me(xa),e,i);const s=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||Me(xa);const o=ui(i,e.config.apiKey,e.name);let a=null;for(const c of n)try{const d=await c._get(o);if(d){const u=De._fromJSON(e,d);c!==r&&(a=u),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new Ft(r,e,i):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new Ft(r,e,i))}}/**
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
 */function Ca(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(rd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(nd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ad(e))return"Blackberry";if(ld(e))return"Webos";if(id(e))return"Safari";if((e.includes("chrome/")||sd(e))&&!e.includes("edge/"))return"Chrome";if(od(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function nd(t=ae()){return/firefox\//i.test(t)}function id(t=ae()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function sd(t=ae()){return/crios\//i.test(t)}function rd(t=ae()){return/iemobile/i.test(t)}function od(t=ae()){return/android/i.test(t)}function ad(t=ae()){return/blackberry/i.test(t)}function ld(t=ae()){return/webos/i.test(t)}function co(t=ae()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Xg(t=ae()){var e;return co(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Zg(){return Yu()&&document.documentMode===10}function cd(t=ae()){return co(t)||od(t)||ld(t)||ad(t)||/windows phone/i.test(t)||rd(t)}/**
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
 */function dd(t,e=[]){let n;switch(t){case"Browser":n=Ca(ae());break;case"Worker":n=`${Ca(ae())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${It}/${i}`}/**
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
 */class ey{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});i.onAbort=n,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
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
 */async function ty(t,e={}){return ot(t,"GET","/v2/passwordPolicy",xt(t,e))}/**
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
 */const ny=6;class iy{constructor(e){var n,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:ny,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,i,s,r,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(n=l.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(i=l.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsLowercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(r=l.containsUppercaseLetter)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class sy{constructor(e,n,i,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Aa(this),this.idTokenSubscription=new Aa(this),this.beforeStateQueue=new ey(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Kc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Me(n)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await Ft.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Zc(this,{idToken:e}),i=await De._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Pe(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return C(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Oi(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=$g()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Pe(this.app))return Promise.reject(tt(this));const n=e?z(e):null;return n&&C(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&C(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Pe(this.app)?Promise.reject(tt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Pe(this.app)?Promise.reject(tt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Me(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ty(this),n=new iy(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Et("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await Jg(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Me(e)||this._popupRedirectResolver;C(n,this,"argument-error"),this.redirectPersistenceManager=await Ft.create(this,[Me(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,i;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,s){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(C(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,i,s);return()=>{o=!0,l()}}else{const l=e.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return C(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=dd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(n["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&Og(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function sn(t){return z(t)}class Aa{constructor(e){this.auth=e,this.observer=null,this.addObserver=sh(n=>this.observer=n)}get next(){return C(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ds={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ry(t){ds=t}function ud(t){return ds.loadJS(t)}function oy(){return ds.recaptchaEnterpriseScript}function ay(){return ds.gapiScript}function ly(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const cy="recaptcha-enterprise",dy="NO_RECAPTCHA";class uy{constructor(e){this.type=cy,this.auth=sn(e)}async verify(e="verify",n=!1){async function i(r){if(!n){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,a)=>{zg(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const c=new Wg(l);return r.tenantId==null?r._agentRecaptchaConfig=c:r._tenantRecaptchaConfigs[r.tenantId]=c,o(c.siteKey)}}).catch(l=>{a(l)})})}function s(r,o,a){const l=window.grecaptcha;Ta(l)?l.enterprise.ready(()=>{l.enterprise.execute(r,{action:e}).then(c=>{o(c)}).catch(()=>{o(dy)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,o)=>{i(this.auth).then(a=>{if(!n&&Ta(window.grecaptcha))s(a,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=oy();l.length!==0&&(l+=a),ud(l).then(()=>{s(a,r,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}async function Ra(t,e,n,i=!1){const s=new uy(t);let r;try{r=await s.verify(n)}catch{r=await s.verify(n,!0)}const o=Object.assign({},e);return i?Object.assign(o,{captchaResp:r}):Object.assign(o,{captchaResponse:r}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Na(t,e,n,i){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await Ra(t,e,n,n==="getOobCode");return i(t,r)}else return i(t,e).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Ra(t,e,n,n==="getOobCode");return i(t,o)}else return Promise.reject(r)})}/**
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
 */function hy(t,e){const n=rt(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(Sn(r,e??{}))return s;Ee(s,"already-initialized")}return n.initialize({options:e})}function fy(t,e){const n=(e==null?void 0:e.persistence)||[],i=(Array.isArray(n)?n:[n]).map(Me);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function py(t,e,n){const i=sn(t);C(i._canInitEmulator,i,"emulator-config-failed"),C(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=hd(e),{host:o,port:a}=my(e),l=a===null?"":`:${a}`;i.config.emulator={url:`${r}//${o}${l}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),gy()}function hd(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function my(t){const e=hd(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Pa(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Pa(o)}}}function Pa(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function gy(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class uo{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Oe("not implemented")}_getIdTokenResponse(e){return Oe("not implemented")}_linkToIdToken(e,n){return Oe("not implemented")}_getReauthenticationResolver(e){return Oe("not implemented")}}async function yy(t,e){return ot(t,"POST","/v1/accounts:signUp",e)}/**
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
 */async function _y(t,e){return cs(t,"POST","/v1/accounts:signInWithPassword",xt(t,e))}/**
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
 */async function wy(t,e){return cs(t,"POST","/v1/accounts:signInWithEmailLink",xt(t,e))}async function vy(t,e){return cs(t,"POST","/v1/accounts:signInWithEmailLink",xt(t,e))}/**
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
 */class $n extends uo{constructor(e,n,i,s=null){super("password",i),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new $n(e,n,"password")}static _fromEmailAndCode(e,n,i=null){return new $n(e,n,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Na(e,n,"signInWithPassword",_y);case"emailLink":return wy(e,{email:this._email,oobCode:this._password});default:Ee(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const i={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Na(e,i,"signUpPassword",yy);case"emailLink":return vy(e,{idToken:n,email:this._email,oobCode:this._password});default:Ee(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Ut(t,e){return cs(t,"POST","/v1/accounts:signInWithIdp",xt(t,e))}/**
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
 */const by="http://localhost";class yt extends uo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new yt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ee("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=n,r=ro(n,["providerId","signInMethod"]);if(!i||!s)return null;const o=new yt(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ut(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,Ut(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ut(e,n)}buildRequest(){const e={requestUri:by,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Zt(n)}return e}}/**
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
 */function Ey(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Iy(t){const e=pn(mn(t)).link,n=e?pn(mn(e)).deep_link_id:null,i=pn(mn(t)).deep_link_id;return(i?pn(mn(i)).link:null)||i||n||e||t}class ho{constructor(e){var n,i,s,r,o,a;const l=pn(mn(e)),c=(n=l.apiKey)!==null&&n!==void 0?n:null,d=(i=l.oobCode)!==null&&i!==void 0?i:null,u=Ey((s=l.mode)!==null&&s!==void 0?s:null);C(c&&d&&u,"argument-error"),this.apiKey=c,this.operation=u,this.code=d,this.continueUrl=(r=l.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=Iy(e);try{return new ho(n)}catch{return null}}}/**
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
 */class rn{constructor(){this.providerId=rn.PROVIDER_ID}static credential(e,n){return $n._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const i=ho.parseLink(n);return C(i,"argument-error"),$n._fromEmailAndCode(e,i.code,i.tenantId)}}rn.PROVIDER_ID="password";rn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";rn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class fd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Gn extends fd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Ve extends Gn{constructor(){super("facebook.com")}static credential(e){return yt._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ve.credential(e.oauthAccessToken)}catch{return null}}}Ve.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ve.PROVIDER_ID="facebook.com";/**
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
 */class qe extends Gn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return yt._fromParams({providerId:qe.PROVIDER_ID,signInMethod:qe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return qe.credentialFromTaggedObject(e)}static credentialFromError(e){return qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return qe.credential(n,i)}catch{return null}}}qe.GOOGLE_SIGN_IN_METHOD="google.com";qe.PROVIDER_ID="google.com";/**
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
 */class Ge extends Gn{constructor(){super("github.com")}static credential(e){return yt._fromParams({providerId:Ge.PROVIDER_ID,signInMethod:Ge.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ge.credentialFromTaggedObject(e)}static credentialFromError(e){return Ge.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ge.credential(e.oauthAccessToken)}catch{return null}}}Ge.GITHUB_SIGN_IN_METHOD="github.com";Ge.PROVIDER_ID="github.com";/**
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
 */class Ke extends Gn{constructor(){super("twitter.com")}static credential(e,n){return yt._fromParams({providerId:Ke.PROVIDER_ID,signInMethod:Ke.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Ke.credentialFromTaggedObject(e)}static credentialFromError(e){return Ke.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return Ke.credential(n,i)}catch{return null}}}Ke.TWITTER_SIGN_IN_METHOD="twitter.com";Ke.PROVIDER_ID="twitter.com";/**
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
 */class Yt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,s=!1){const r=await De._fromIdTokenResponse(e,i,s),o=La(i);return new Yt({user:r,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const s=La(i);return new Yt({user:e,providerId:s,_tokenResponse:i,operationType:n})}}function La(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class Di extends Ie{constructor(e,n,i,s){var r;super(n.code,n.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Di.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,s){return new Di(e,n,i,s)}}function pd(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Di._fromErrorAndOperation(t,r,e,i):r})}async function Ty(t,e,n=!1){const i=await Mn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Yt._forOperation(t,"link",i)}/**
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
 */async function ky(t,e,n=!1){const{auth:i}=t;if(Pe(i.app))return Promise.reject(tt(i));const s="reauthenticate";try{const r=await Mn(t,pd(i,s,e,t),n);C(r.idToken,i,"internal-error");const o=lo(r.idToken);C(o,i,"internal-error");const{sub:a}=o;return C(t.uid===a,i,"user-mismatch"),Yt._forOperation(t,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Ee(i,"user-mismatch"),r}}/**
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
 */async function md(t,e,n=!1){if(Pe(t.app))return Promise.reject(tt(t));const i="signIn",s=await pd(t,i,e),r=await Yt._fromIdTokenResponse(t,i,s);return n||await t._updateCurrentUser(r.user),r}async function Sy(t,e){return md(sn(t),e)}/**
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
 */async function xy(t){const e=sn(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Cy(t,e,n){return Pe(t.app)?Promise.reject(tt(t)):Sy(z(t),rn.credential(e,n)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&xy(t),i})}/**
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
 */function Ay(t,e){return z(t).setPersistence(e)}function Ry(t,e,n,i){return z(t).onIdTokenChanged(e,n,i)}function Ny(t,e,n){return z(t).beforeAuthStateChanged(e,n)}function Py(t,e,n,i){return z(t).onAuthStateChanged(e,n,i)}function Ly(t){return z(t).signOut()}const Mi="__sak";/**
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
 */class gd{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Mi,"1"),this.storage.removeItem(Mi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Oy=1e3,Dy=10;class yd extends gd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=cd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),s=this.localCache[n];i!==s&&e(n,s,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const i=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Zg()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Dy):s()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},Oy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}yd.type="LOCAL";const _d=yd;/**
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
 */class wd extends gd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}wd.type="SESSION";const vd=wd;/**
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
 */function My(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class us{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const i=new us(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:s,data:r}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async c=>c(n.origin,r)),l=await My(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}us.receivers=[];/**
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
 */function fo(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class $y{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=fo("",20);s.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(u){const h=u;if(h.data.eventId===c)switch(h.data.status){case"ack":clearTimeout(d),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(d),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Ce(){return window}function By(t){Ce().location.href=t}/**
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
 */function bd(){return typeof Ce().WorkerGlobalScope<"u"&&typeof Ce().importScripts=="function"}async function Fy(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Uy(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function jy(){return bd()?self:null}/**
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
 */const Ed="firebaseLocalStorageDb",Wy=1,$i="firebaseLocalStorage",Id="fbase_key";class Kn{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function hs(t,e){return t.transaction([$i],e?"readwrite":"readonly").objectStore($i)}function zy(){const t=indexedDB.deleteDatabase(Ed);return new Kn(t).toPromise()}function hr(){const t=indexedDB.open(Ed,Wy);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore($i,{keyPath:Id})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains($i)?e(i):(i.close(),await zy(),e(await hr()))})})}async function Oa(t,e,n){const i=hs(t,!0).put({[Id]:e,value:n});return new Kn(i).toPromise()}async function Hy(t,e){const n=hs(t,!1).get(e),i=await new Kn(n).toPromise();return i===void 0?null:i.value}function Da(t,e){const n=hs(t,!0).delete(e);return new Kn(n).toPromise()}const Vy=800,qy=3;class Td{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await hr(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>qy)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return bd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=us._getInstance(jy()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Fy(),!this.activeServiceWorker)return;this.sender=new $y(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((n=i[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Uy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await hr();return await Oa(e,Mi,"1"),await Da(e,Mi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>Oa(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>Hy(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Da(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=hs(s,!1).getAll();return new Kn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Vy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Td.type="LOCAL";const Gy=Td;new qn(3e4,6e4);/**
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
 */function Ky(t,e){return e?Me(e):(C(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class po extends uo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ut(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ut(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ut(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Yy(t){return md(t.auth,new po(t),t.bypassAuthState)}function Qy(t){const{auth:e,user:n}=t;return C(n,e,"internal-error"),ky(n,new po(t),t.bypassAuthState)}async function Jy(t){const{auth:e,user:n}=t;return C(n,e,"internal-error"),Ty(n,new po(t),t.bypassAuthState)}/**
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
 */class kd{constructor(e,n,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Yy;case"linkViaPopup":case"linkViaRedirect":return Jy;case"reauthViaPopup":case"reauthViaRedirect":return Qy;default:Ee(this.auth,"internal-error")}}resolve(e){Ue(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ue(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Xy=new qn(2e3,1e4);class Dt extends kd{constructor(e,n,i,s,r){super(e,n,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Dt.currentPopupAction&&Dt.currentPopupAction.cancel(),Dt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return C(e,this.auth,"internal-error"),e}async onExecution(){Ue(this.filter.length===1,"Popup operations only handle one event");const e=fo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(xe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(xe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Dt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,i;if(!((i=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(xe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Xy.get())};e()}}Dt.currentPopupAction=null;/**
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
 */const Zy="pendingRedirect",hi=new Map;class e_ extends kd{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=hi.get(this.auth._key());if(!e){try{const i=await t_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}hi.set(this.auth._key(),e)}return this.bypassAuthState||hi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function t_(t,e){const n=s_(e),i=i_(t);if(!await i._isAvailable())return!1;const s=await i._get(n)==="true";return await i._remove(n),s}function n_(t,e){hi.set(t._key(),e)}function i_(t){return Me(t._redirectPersistence)}function s_(t){return ui(Zy,t.config.apiKey,t.name)}async function r_(t,e,n=!1){if(Pe(t.app))return Promise.reject(tt(t));const i=sn(t),s=Ky(i,e),o=await new e_(i,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const o_=10*60*1e3;class a_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!l_(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var i;if(e.error&&!Sd(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";n.onError(xe(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=o_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ma(e))}saveEventToCache(e){this.cachedEventUids.add(Ma(e)),this.lastProcessedEventTime=Date.now()}}function Ma(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Sd({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function l_(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Sd(t);default:return!1}}/**
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
 */async function c_(t,e={}){return ot(t,"GET","/v1/projects",e)}/**
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
 */const d_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,u_=/^https?/;async function h_(t){if(t.config.emulator)return;const{authorizedDomains:e}=await c_(t);for(const n of e)try{if(f_(n))return}catch{}Ee(t,"unauthorized-domain")}function f_(t){const e=dr(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!u_.test(n))return!1;if(d_.test(t))return i===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const p_=new qn(3e4,6e4);function $a(){const t=Ce().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function m_(t){return new Promise((e,n)=>{var i,s,r;function o(){$a(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{$a(),n(xe(t,"network-request-failed"))},timeout:p_.get()})}if(!((s=(i=Ce().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=Ce().gapi)===null||r===void 0)&&r.load)o();else{const a=ly("iframefcb");return Ce()[a]=()=>{gapi.load?o():n(xe(t,"network-request-failed"))},ud(`${ay()}?onload=${a}`).catch(l=>n(l))}}).catch(e=>{throw fi=null,e})}let fi=null;function g_(t){return fi=fi||m_(t),fi}/**
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
 */const y_=new qn(5e3,15e3),__="__/auth/iframe",w_="emulator/auth/iframe",v_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},b_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function E_(t){const e=t.config;C(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?ao(e,w_):`https://${t.config.authDomain}/${__}`,i={apiKey:e.apiKey,appName:t.name,v:It},s=b_.get(t.config.apiHost);s&&(i.eid=s);const r=t._getFrameworks();return r.length&&(i.fw=r.join(",")),`${n}?${Zt(i).slice(1)}`}async function I_(t){const e=await g_(t),n=Ce().gapi;return C(n,t,"internal-error"),e.open({where:document.body,url:E_(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:v_,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=xe(t,"network-request-failed"),a=Ce().setTimeout(()=>{r(o)},y_.get());function l(){Ce().clearTimeout(a),s(i)}i.ping(l).then(l,()=>{r(o)})}))}/**
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
 */const T_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},k_=500,S_=600,x_="_blank",C_="http://localhost";class Ba{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function A_(t,e,n,i=k_,s=S_){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const l=Object.assign(Object.assign({},T_),{width:i.toString(),height:s.toString(),top:r,left:o}),c=ae().toLowerCase();n&&(a=sd(c)?x_:n),nd(c)&&(e=e||C_,l.scrollbars="yes");const d=Object.entries(l).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(Xg(c)&&a!=="_self")return R_(e||"",a),new Ba(null);const u=window.open(e||"",a,d);C(u,t,"popup-blocked");try{u.focus()}catch{}return new Ba(u)}function R_(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
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
 */const N_="__/auth/handler",P_="emulator/auth/handler",L_=encodeURIComponent("fac");async function Fa(t,e,n,i,s,r){C(t.config.authDomain,t,"auth-domain-config-required"),C(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:It,eventId:s};if(e instanceof fd){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Vs(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,u]of Object.entries({}))o[d]=u}if(e instanceof Gn){const d=e.getScopes().filter(u=>u!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const l=await t._getAppCheckToken(),c=l?`#${L_}=${encodeURIComponent(l)}`:"";return`${O_(t)}?${Zt(a).slice(1)}${c}`}function O_({config:t}){return t.emulator?ao(t,P_):`https://${t.authDomain}/${N_}`}/**
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
 */const Rs="webStorageSupport";class D_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=vd,this._completeRedirectFn=r_,this._overrideRedirectResult=n_}async _openPopup(e,n,i,s){var r;Ue((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Fa(e,n,i,dr(),s);return A_(e,o,fo())}async _openRedirect(e,n,i,s){await this._originValidation(e);const r=await Fa(e,n,i,dr(),s);return By(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:r}=this.eventManagers[n];return s?Promise.resolve(s):(Ue(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await I_(e),i=new a_(e);return n.register("authEvent",s=>(C(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Rs,{type:Rs},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[Rs];o!==void 0&&n(!!o),Ee(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=h_(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return cd()||id()||co()}}const M_=D_;var Ua="@firebase/auth",ja="1.7.9";/**
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
 */class $_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){C(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function B_(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function F_(t){be(new me("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;C(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:dd(t)},c=new sy(i,s,r,l);return fy(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),be(new me("auth-internal",e=>{const n=sn(e.getProvider("auth").getImmediate());return(i=>new $_(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ce(Ua,ja,B_(t)),ce(Ua,ja,"esm2017")}/**
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
 */const U_=5*60,j_=El("authIdTokenMaxAge")||U_;let Wa=null;const W_=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>j_)return;const s=n==null?void 0:n.token;Wa!==s&&(Wa=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function z_(t=Ki()){const e=rt(t,"auth");if(e.isInitialized())return e.getImmediate();const n=hy(t,{popupRedirectResolver:M_,persistence:[Gy,_d,vd]}),i=El("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=W_(r.toString());Ny(n,o,()=>o(n.currentUser)),Ry(n,a=>o(a))}}const s=wl("auth");return s&&py(n,`http://${s}`),n}function H_(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}ry({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=s=>{const r=xe("internal-error");r.customData=s,n(r)},i.type="text/javascript",i.charset="UTF-8",H_().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});F_("Browser");/**
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
 */const xd="firebasestorage.googleapis.com",Cd="storageBucket",V_=2*60*1e3,q_=10*60*1e3;/**
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
 */class K extends Ie{constructor(e,n,i=0){super(Ns(e),`Firebase Storage: ${n} (${Ns(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,K.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Ns(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var G;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(G||(G={}));function Ns(t){return"storage/"+t}function mo(){const t="An unknown error occurred, please check the error payload for server response.";return new K(G.UNKNOWN,t)}function G_(t){return new K(G.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function K_(t){return new K(G.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Y_(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new K(G.UNAUTHENTICATED,t)}function Q_(){return new K(G.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function J_(t){return new K(G.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function X_(){return new K(G.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Z_(){return new K(G.CANCELED,"User canceled the upload/download.")}function ew(t){return new K(G.INVALID_URL,"Invalid URL '"+t+"'.")}function tw(t){return new K(G.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function nw(){return new K(G.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Cd+"' property when initializing the app?")}function iw(){return new K(G.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function sw(){return new K(G.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function rw(t){return new K(G.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function fr(t){return new K(G.INVALID_ARGUMENT,t)}function Ad(){return new K(G.APP_DELETED,"The Firebase app was deleted.")}function ow(t){return new K(G.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function En(t,e){return new K(G.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function hn(t){throw new K(G.INTERNAL_ERROR,"Internal error: "+t)}/**
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
 */class ue{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let i;try{i=ue.makeFromUrl(e,n)}catch{return new ue(e,"")}if(i.path==="")return i;throw tw(e)}static makeFromUrl(e,n){let i=null;const s="([A-Za-z0-9.\\-_]+)";function r(v){v.path.charAt(v.path.length-1)==="/"&&(v.path_=v.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+s+o,"i"),l={bucket:1,path:3};function c(v){v.path_=decodeURIComponent(v.path)}const d="v[A-Za-z0-9_]+",u=n.replace(/[.]/g,"\\."),h="(/([^?#]*).*)?$",f=new RegExp(`^https?://${u}/${d}/b/${s}/o${h}`,"i"),p={bucket:1,path:3},y=n===xd?"(?:storage.googleapis.com|storage.cloud.google.com)":n,b="([^?#]*)",g=new RegExp(`^https?://${y}/${s}/${b}`,"i"),w=[{regex:a,indices:l,postModify:r},{regex:f,indices:p,postModify:c},{regex:g,indices:{bucket:1,path:2},postModify:c}];for(let v=0;v<w.length;v++){const T=w[v],k=T.regex.exec(e);if(k){const R=k[T.indices.bucket];let x=k[T.indices.path];x||(x=""),i=new ue(R,x),T.postModify(i);break}}if(i==null)throw ew(e);return i}}class aw{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function lw(t,e,n){let i=1,s=null,r=null,o=!1,a=0;function l(){return a===2}let c=!1;function d(...b){c||(c=!0,e.apply(null,b))}function u(b){s=setTimeout(()=>{s=null,t(f,l())},b)}function h(){r&&clearTimeout(r)}function f(b,...g){if(c){h();return}if(b){h(),d.call(null,b,...g);return}if(l()||o){h(),d.call(null,b,...g);return}i<64&&(i*=2);let w;a===1?(a=2,w=0):w=(i+Math.random())*1e3,u(w)}let p=!1;function y(b){p||(p=!0,h(),!c&&(s!==null?(b||(a=2),clearTimeout(s),u(0)):b||(a=1)))}return u(0),r=setTimeout(()=>{o=!0,y(!0)},n),y}function cw(t){t(!1)}/**
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
 */function dw(t){return t!==void 0}function uw(t){return typeof t=="object"&&!Array.isArray(t)}function go(t){return typeof t=="string"||t instanceof String}function za(t){return yo()&&t instanceof Blob}function yo(){return typeof Blob<"u"}function Ha(t,e,n,i){if(i<e)throw fr(`Invalid value for '${t}'. Expected ${e} or greater.`);if(i>n)throw fr(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
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
 */function _o(t,e,n){let i=e;return n==null&&(i=`https://${e}`),`${n}://${i}/v0${t}`}function Rd(t){const e=encodeURIComponent;let n="?";for(const i in t)if(t.hasOwnProperty(i)){const s=e(i)+"="+e(t[i]);n=n+s+"&"}return n=n.slice(0,-1),n}var ht;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(ht||(ht={}));/**
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
 */function hw(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,r=e.indexOf(t)!==-1;return n||s||r}/**
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
 */class fw{constructor(e,n,i,s,r,o,a,l,c,d,u,h=!0){this.url_=e,this.method_=n,this.headers_=i,this.body_=s,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=d,this.connectionFactory_=u,this.retry=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((f,p)=>{this.resolve_=f,this.reject_=p,this.start_()})}start_(){const e=(i,s)=>{if(s){i(!1,new ii(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const a=r.getErrorCode()===ht.NO_ERROR,l=r.getStatus();if(!a||hw(l,this.additionalRetryCodes_)&&this.retry){const d=r.getErrorCode()===ht.ABORT;i(!1,new ii(!1,null,d));return}const c=this.successCodes_.indexOf(l)!==-1;i(!0,new ii(c,r))})},n=(i,s)=>{const r=this.resolve_,o=this.reject_,a=s.connection;if(s.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());dw(l)?r(l):r()}catch(l){o(l)}else if(a!==null){const l=mo();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(s.canceled){const l=this.appDelete_?Ad():Z_();o(l)}else{const l=X_();o(l)}};this.canceled_?n(!1,new ii(!1,null,!0)):this.backoffId_=lw(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&cw(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ii{constructor(e,n,i){this.wasSuccessCode=e,this.connection=n,this.canceled=!!i}}function pw(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function mw(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function gw(t,e){e&&(t["X-Firebase-GMPID"]=e)}function yw(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function _w(t,e,n,i,s,r,o=!0){const a=Rd(t.urlParams),l=t.url+a,c=Object.assign({},t.headers);return gw(c,e),pw(c,n),mw(c,r),yw(c,i),new fw(l,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o)}/**
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
 */function ww(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function vw(...t){const e=ww();if(e!==void 0){const n=new e;for(let i=0;i<t.length;i++)n.append(t[i]);return n.getBlob()}else{if(yo())return new Blob(t);throw new K(G.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function bw(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
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
 */function Ew(t){if(typeof atob>"u")throw rw("base-64");return atob(t)}/**
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
 */const Se={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Ps{constructor(e,n){this.data=e,this.contentType=n||null}}function Iw(t,e){switch(t){case Se.RAW:return new Ps(Nd(e));case Se.BASE64:case Se.BASE64URL:return new Ps(Pd(t,e));case Se.DATA_URL:return new Ps(kw(e),Sw(e))}throw mo()}function Nd(t){const e=[];for(let n=0;n<t.length;n++){let i=t.charCodeAt(n);if(i<=127)e.push(i);else if(i<=2047)e.push(192|i>>6,128|i&63);else if((i&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const r=i,o=t.charCodeAt(++n);i=65536|(r&1023)<<10|o&1023,e.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|i&63)}else(i&64512)===56320?e.push(239,191,189):e.push(224|i>>12,128|i>>6&63,128|i&63)}return new Uint8Array(e)}function Tw(t){let e;try{e=decodeURIComponent(t)}catch{throw En(Se.DATA_URL,"Malformed data URL.")}return Nd(e)}function Pd(t,e){switch(t){case Se.BASE64:{const s=e.indexOf("-")!==-1,r=e.indexOf("_")!==-1;if(s||r)throw En(t,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Se.BASE64URL:{const s=e.indexOf("+")!==-1,r=e.indexOf("/")!==-1;if(s||r)throw En(t,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=Ew(e)}catch(s){throw s.message.includes("polyfill")?s:En(t,"Invalid character found")}const i=new Uint8Array(n.length);for(let s=0;s<n.length;s++)i[s]=n.charCodeAt(s);return i}class Ld{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw En(Se.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const i=n[1]||null;i!=null&&(this.base64=xw(i,";base64"),this.contentType=this.base64?i.substring(0,i.length-7):i),this.rest=e.substring(e.indexOf(",")+1)}}function kw(t){const e=new Ld(t);return e.base64?Pd(Se.BASE64,e.rest):Tw(e.rest)}function Sw(t){return new Ld(t).contentType}function xw(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
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
 */class Ye{constructor(e,n){let i=0,s="";za(e)?(this.data_=e,i=e.size,s=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),i=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),i=e.length),this.size_=i,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,n){if(za(this.data_)){const i=this.data_,s=bw(i,e,n);return s===null?null:new Ye(s)}else{const i=new Uint8Array(this.data_.buffer,e,n-e);return new Ye(i,!0)}}static getBlob(...e){if(yo()){const n=e.map(i=>i instanceof Ye?i.data_:i);return new Ye(vw.apply(null,n))}else{const n=e.map(o=>go(o)?Iw(Se.RAW,o).data:o.data_);let i=0;n.forEach(o=>{i+=o.byteLength});const s=new Uint8Array(i);let r=0;return n.forEach(o=>{for(let a=0;a<o.length;a++)s[r++]=o[a]}),new Ye(s,!0)}}uploadData(){return this.data_}}/**
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
 */function Od(t){let e;try{e=JSON.parse(t)}catch{return null}return uw(e)?e:null}/**
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
 */function Cw(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function Aw(t,e){const n=e.split("/").filter(i=>i.length>0).join("/");return t.length===0?n:t+"/"+n}function Dd(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
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
 */function Rw(t,e){return e}class se{constructor(e,n,i,s){this.server=e,this.local=n||e,this.writable=!!i,this.xform=s||Rw}}let si=null;function Nw(t){return!go(t)||t.length<2?t:Dd(t)}function Md(){if(si)return si;const t=[];t.push(new se("bucket")),t.push(new se("generation")),t.push(new se("metageneration")),t.push(new se("name","fullPath",!0));function e(r,o){return Nw(o)}const n=new se("name");n.xform=e,t.push(n);function i(r,o){return o!==void 0?Number(o):o}const s=new se("size");return s.xform=i,t.push(s),t.push(new se("timeCreated")),t.push(new se("updated")),t.push(new se("md5Hash",null,!0)),t.push(new se("cacheControl",null,!0)),t.push(new se("contentDisposition",null,!0)),t.push(new se("contentEncoding",null,!0)),t.push(new se("contentLanguage",null,!0)),t.push(new se("contentType",null,!0)),t.push(new se("metadata","customMetadata",!0)),si=t,si}function Pw(t,e){function n(){const i=t.bucket,s=t.fullPath,r=new ue(i,s);return e._makeStorageReference(r)}Object.defineProperty(t,"ref",{get:n})}function Lw(t,e,n){const i={};i.type="file";const s=n.length;for(let r=0;r<s;r++){const o=n[r];i[o.local]=o.xform(i,e[o.server])}return Pw(i,t),i}function $d(t,e,n){const i=Od(e);return i===null?null:Lw(t,i,n)}function Ow(t,e,n,i){const s=Od(e);if(s===null||!go(s.downloadTokens))return null;const r=s.downloadTokens;if(r.length===0)return null;const o=encodeURIComponent;return r.split(",").map(c=>{const d=t.bucket,u=t.fullPath,h="/b/"+o(d)+"/o/"+o(u),f=_o(h,n,i),p=Rd({alt:"media",token:c});return f+p})[0]}function Dw(t,e){const n={},i=e.length;for(let s=0;s<i;s++){const r=e[s];r.writable&&(n[r.server]=t[r.local])}return JSON.stringify(n)}class Bd{constructor(e,n,i,s){this.url=e,this.method=n,this.handler=i,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function Fd(t){if(!t)throw mo()}function Mw(t,e){function n(i,s){const r=$d(t,s,e);return Fd(r!==null),r}return n}function $w(t,e){function n(i,s){const r=$d(t,s,e);return Fd(r!==null),Ow(r,s,t.host,t._protocol)}return n}function Ud(t){function e(n,i){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=Q_():s=Y_():n.getStatus()===402?s=K_(t.bucket):n.getStatus()===403?s=J_(t.path):s=i,s.status=n.getStatus(),s.serverResponse=i.serverResponse,s}return e}function Bw(t){const e=Ud(t);function n(i,s){let r=e(i,s);return i.getStatus()===404&&(r=G_(t.path)),r.serverResponse=s.serverResponse,r}return n}function Fw(t,e,n){const i=e.fullServerUrl(),s=_o(i,t.host,t._protocol),r="GET",o=t.maxOperationRetryTime,a=new Bd(s,r,$w(t,n),o);return a.errorHandler=Bw(e),a}function Uw(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function jw(t,e,n){const i=Object.assign({},n);return i.fullPath=t.path,i.size=e.size(),i.contentType||(i.contentType=Uw(null,e)),i}function Ww(t,e,n,i,s){const r=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let w="";for(let v=0;v<2;v++)w=w+Math.random().toString().slice(2);return w}const l=a();o["Content-Type"]="multipart/related; boundary="+l;const c=jw(e,i,s),d=Dw(c,n),u="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+l+`\r
Content-Type: `+c.contentType+`\r
\r
`,h=`\r
--`+l+"--",f=Ye.getBlob(u,i,h);if(f===null)throw iw();const p={name:c.fullPath},y=_o(r,t.host,t._protocol),b="POST",g=t.maxUploadRetryTime,m=new Bd(y,b,Mw(t,n),g);return m.urlParams=p,m.headers=o,m.body=f.uploadData(),m.errorHandler=Ud(e),m}class zw{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=ht.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=ht.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=ht.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,i,s){if(this.sent_)throw hn("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),s!==void 0)for(const r in s)s.hasOwnProperty(r)&&this.xhr_.setRequestHeader(r,s[r].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw hn("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw hn("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw hn("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw hn("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Hw extends zw{initXhr(){this.xhr_.responseType="text"}}function jd(){return new Hw}/**
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
 */class _t{constructor(e,n){this._service=e,n instanceof ue?this._location=n:this._location=ue.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new _t(e,n)}get root(){const e=new ue(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Dd(this._location.path)}get storage(){return this._service}get parent(){const e=Cw(this._location.path);if(e===null)return null;const n=new ue(this._location.bucket,e);return new _t(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw ow(e)}}function Vw(t,e,n){t._throwIfRoot("uploadBytes");const i=Ww(t.storage,t._location,Md(),new Ye(e,!0),n);return t.storage.makeRequestWithTokens(i,jd).then(s=>({metadata:s,ref:t}))}function qw(t){t._throwIfRoot("getDownloadURL");const e=Fw(t.storage,t._location,Md());return t.storage.makeRequestWithTokens(e,jd).then(n=>{if(n===null)throw sw();return n})}function Gw(t,e){const n=Aw(t._location.path,e),i=new ue(t._location.bucket,n);return new _t(t.storage,i)}/**
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
 */function Kw(t){return/^[A-Za-z]+:\/\//.test(t)}function Yw(t,e){return new _t(t,e)}function Wd(t,e){if(t instanceof wo){const n=t;if(n._bucket==null)throw nw();const i=new _t(n,n._bucket);return e!=null?Wd(i,e):i}else return e!==void 0?Gw(t,e):t}function Qw(t,e){if(e&&Kw(e)){if(t instanceof wo)return Yw(t,e);throw fr("To use ref(service, url), the first argument must be a Storage instance.")}else return Wd(t,e)}function Va(t,e){const n=e==null?void 0:e[Cd];return n==null?null:ue.makeFromBucketSpec(n,t)}function Jw(t,e,n,i={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=i;s&&(t._overrideAuthToken=typeof s=="string"?s:Il(s,t.app.options.projectId))}class wo{constructor(e,n,i,s,r){this.app=e,this._authProvider=n,this._appCheckProvider=i,this._url=s,this._firebaseVersion=r,this._bucket=null,this._host=xd,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=V_,this._maxUploadRetryTime=q_,this._requests=new Set,s!=null?this._bucket=ue.makeFromBucketSpec(s,this._host):this._bucket=Va(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=ue.makeFromBucketSpec(this._url,e):this._bucket=Va(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Ha("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Ha("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new _t(this,e)}_makeRequest(e,n,i,s,r=!0){if(this._deleted)return new aw(Ad());{const o=_w(e,this._appId,i,s,n,this._firebaseVersion,r);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[i,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,i,s).getPromise()}}const qa="@firebase/storage",Ga="0.13.2";/**
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
 */const zd="storage";function Xw(t,e,n){return t=z(t),Vw(t,e,n)}function Zw(t){return t=z(t),qw(t)}function ev(t,e){return t=z(t),Qw(t,e)}function tv(t=Ki(),e){t=z(t);const i=rt(t,zd).getImmediate({identifier:e}),s=vl("storage");return s&&nv(i,...s),i}function nv(t,e,n,i={}){Jw(t,e,n,i)}function iv(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),i=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new wo(n,i,s,e,It)}function sv(){be(new me(zd,iv,"PUBLIC").setMultipleInstances(!0)),ce(qa,Ga,""),ce(qa,Ga,"esm2017")}sv();const Hd="@firebase/installations",vo="0.6.9";/**
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
 */const Vd=1e4,qd=`w:${vo}`,Gd="FIS_v2",rv="https://firebaseinstallations.googleapis.com/v1",ov=60*60*1e3,av="installations",lv="Installations";/**
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
 */const cv={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},wt=new Et(av,lv,cv);function Kd(t){return t instanceof Ie&&t.code.includes("request-failed")}/**
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
 */function Yd({projectId:t}){return`${rv}/projects/${t}/installations`}function Qd(t){return{token:t.token,requestStatus:2,expiresIn:uv(t.expiresIn),creationTime:Date.now()}}async function Jd(t,e){const i=(await e.json()).error;return wt.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function Xd({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function dv(t,{refreshToken:e}){const n=Xd(t);return n.append("Authorization",hv(e)),n}async function Zd(t){const e=await t();return e.status>=500&&e.status<600?t():e}function uv(t){return Number(t.replace("s","000"))}function hv(t){return`${Gd} ${t}`}/**
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
 */async function fv({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=Yd(t),s=Xd(t),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={fid:n,authVersion:Gd,appId:t.appId,sdkVersion:qd},a={method:"POST",headers:s,body:JSON.stringify(o)},l=await Zd(()=>fetch(i,a));if(l.ok){const c=await l.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:Qd(c.authToken)}}else throw await Jd("Create Installation",l)}/**
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
 */function eu(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function pv(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const mv=/^[cdef][\w-]{21}$/,pr="";function gv(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=yv(t);return mv.test(n)?n:pr}catch{return pr}}function yv(t){return pv(t).substr(0,22)}/**
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
 */function fs(t){return`${t.appName}!${t.appId}`}/**
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
 */const tu=new Map;function nu(t,e){const n=fs(t);iu(n,e),_v(n,e)}function iu(t,e){const n=tu.get(t);if(n)for(const i of n)i(e)}function _v(t,e){const n=wv();n&&n.postMessage({key:t,fid:e}),vv()}let ut=null;function wv(){return!ut&&"BroadcastChannel"in self&&(ut=new BroadcastChannel("[Firebase] FID Change"),ut.onmessage=t=>{iu(t.data.key,t.data.fid)}),ut}function vv(){tu.size===0&&ut&&(ut.close(),ut=null)}/**
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
 */const bv="firebase-installations-database",Ev=1,vt="firebase-installations-store";let Ls=null;function bo(){return Ls||(Ls=Nl(bv,Ev,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(vt)}}})),Ls}async function Bi(t,e){const n=fs(t),s=(await bo()).transaction(vt,"readwrite"),r=s.objectStore(vt),o=await r.get(n);return await r.put(e,n),await s.done,(!o||o.fid!==e.fid)&&nu(t,e.fid),e}async function su(t){const e=fs(t),i=(await bo()).transaction(vt,"readwrite");await i.objectStore(vt).delete(e),await i.done}async function ps(t,e){const n=fs(t),s=(await bo()).transaction(vt,"readwrite"),r=s.objectStore(vt),o=await r.get(n),a=e(o);return a===void 0?await r.delete(n):await r.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&nu(t,a.fid),a}/**
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
 */async function Eo(t){let e;const n=await ps(t.appConfig,i=>{const s=Iv(i),r=Tv(t,s);return e=r.registrationPromise,r.installationEntry});return n.fid===pr?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function Iv(t){const e=t||{fid:gv(),registrationStatus:0};return ru(e)}function Tv(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(wt.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=kv(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Sv(t)}:{installationEntry:e}}async function kv(t,e){try{const n=await fv(t,e);return Bi(t.appConfig,n)}catch(n){throw Kd(n)&&n.customData.serverCode===409?await su(t.appConfig):await Bi(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function Sv(t){let e=await Ka(t.appConfig);for(;e.registrationStatus===1;)await eu(100),e=await Ka(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await Eo(t);return i||n}return e}function Ka(t){return ps(t,e=>{if(!e)throw wt.create("installation-not-found");return ru(e)})}function ru(t){return xv(t)?{fid:t.fid,registrationStatus:0}:t}function xv(t){return t.registrationStatus===1&&t.registrationTime+Vd<Date.now()}/**
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
 */async function Cv({appConfig:t,heartbeatServiceProvider:e},n){const i=Av(t,n),s=dv(t,n),r=e.getImmediate({optional:!0});if(r){const c=await r.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={installation:{sdkVersion:qd,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},l=await Zd(()=>fetch(i,a));if(l.ok){const c=await l.json();return Qd(c)}else throw await Jd("Generate Auth Token",l)}function Av(t,{fid:e}){return`${Yd(t)}/${e}/authTokens:generate`}/**
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
 */async function Io(t,e=!1){let n;const i=await ps(t.appConfig,r=>{if(!ou(r))throw wt.create("not-registered");const o=r.authToken;if(!e&&Pv(o))return r;if(o.requestStatus===1)return n=Rv(t,e),r;{if(!navigator.onLine)throw wt.create("app-offline");const a=Ov(r);return n=Nv(t,a),a}});return n?await n:i.authToken}async function Rv(t,e){let n=await Ya(t.appConfig);for(;n.authToken.requestStatus===1;)await eu(100),n=await Ya(t.appConfig);const i=n.authToken;return i.requestStatus===0?Io(t,e):i}function Ya(t){return ps(t,e=>{if(!ou(e))throw wt.create("not-registered");const n=e.authToken;return Dv(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Nv(t,e){try{const n=await Cv(t,e),i=Object.assign(Object.assign({},e),{authToken:n});return await Bi(t.appConfig,i),n}catch(n){if(Kd(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await su(t.appConfig);else{const i=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Bi(t.appConfig,i)}throw n}}function ou(t){return t!==void 0&&t.registrationStatus===2}function Pv(t){return t.requestStatus===2&&!Lv(t)}function Lv(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+ov}function Ov(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Dv(t){return t.requestStatus===1&&t.requestTime+Vd<Date.now()}/**
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
 */async function Mv(t){const e=t,{installationEntry:n,registrationPromise:i}=await Eo(e);return i?i.catch(console.error):Io(e).catch(console.error),n.fid}/**
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
 */async function $v(t,e=!1){const n=t;return await Bv(n),(await Io(n,e)).token}async function Bv(t){const{registrationPromise:e}=await Eo(t);e&&await e}/**
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
 */function Fv(t){if(!t||!t.options)throw Os("App Configuration");if(!t.name)throw Os("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Os(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Os(t){return wt.create("missing-app-config-values",{valueName:t})}/**
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
 */const au="installations",Uv="installations-internal",jv=t=>{const e=t.getProvider("app").getImmediate(),n=Fv(e),i=rt(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},Wv=t=>{const e=t.getProvider("app").getImmediate(),n=rt(e,au).getImmediate();return{getId:()=>Mv(n),getToken:s=>$v(n,s)}};function zv(){be(new me(au,jv,"PUBLIC")),be(new me(Uv,Wv,"PRIVATE"))}zv();ce(Hd,vo);ce(Hd,vo,"esm2017");/**
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
 */const Fi="analytics",Hv="firebase_id",Vv="origin",qv=60*1e3,Gv="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",To="https://www.googletagmanager.com/gtag/js";/**
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
 */const de=new Gi("@firebase/analytics");/**
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
 */const Kv={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},he=new Et("analytics","Analytics",Kv);/**
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
 */function Yv(t){if(!t.startsWith(To)){const e=he.create("invalid-gtag-resource",{gtagURL:t});return de.warn(e.message),""}return t}function lu(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function Qv(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function Jv(t,e){const n=Qv("firebase-js-sdk-policy",{createScriptURL:Yv}),i=document.createElement("script"),s=`${To}?l=${t}&id=${e}`;i.src=n?n==null?void 0:n.createScriptURL(s):s,i.async=!0,document.head.appendChild(i)}function Xv(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Zv(t,e,n,i,s,r){const o=i[s];try{if(o)await e[o];else{const l=(await lu(n)).find(c=>c.measurementId===s);l&&await e[l.appId]}}catch(a){de.error(a)}t("config",s,r)}async function eb(t,e,n,i,s){try{let r=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const a=await lu(n);for(const l of o){const c=a.find(u=>u.measurementId===l),d=c&&e[c.appId];if(d)r.push(d);else{r=[];break}}}r.length===0&&(r=Object.values(e)),await Promise.all(r),t("event",i,s||{})}catch(r){de.error(r)}}function tb(t,e,n,i){async function s(r,...o){try{if(r==="event"){const[a,l]=o;await eb(t,e,n,a,l)}else if(r==="config"){const[a,l]=o;await Zv(t,e,n,i,a,l)}else if(r==="consent"){const[a,l]=o;t("consent",a,l)}else if(r==="get"){const[a,l,c]=o;t("get",a,l,c)}else if(r==="set"){const[a]=o;t("set",a)}else t(r,...o)}catch(a){de.error(a)}}return s}function nb(t,e,n,i,s){let r=function(...o){window[i].push(arguments)};return window[s]&&typeof window[s]=="function"&&(r=window[s]),window[s]=tb(r,t,e,n),{gtagCore:r,wrappedGtag:window[s]}}function ib(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(To)&&n.src.includes(t))return n;return null}/**
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
 */const sb=30,rb=1e3;class ob{constructor(e={},n=rb){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const cu=new ob;function ab(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function lb(t){var e;const{appId:n,apiKey:i}=t,s={method:"GET",headers:ab(i)},r=Gv.replace("{app-id}",n),o=await fetch(r,s);if(o.status!==200&&o.status!==304){let a="";try{const l=await o.json();!((e=l.error)===null||e===void 0)&&e.message&&(a=l.error.message)}catch{}throw he.create("config-fetch-failed",{httpStatus:o.status,responseMessage:a})}return o.json()}async function cb(t,e=cu,n){const{appId:i,apiKey:s,measurementId:r}=t.options;if(!i)throw he.create("no-app-id");if(!s){if(r)return{measurementId:r,appId:i};throw he.create("no-api-key")}const o=e.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new hb;return setTimeout(async()=>{a.abort()},qv),du({appId:i,apiKey:s,measurementId:r},o,a,e)}async function du(t,{throttleEndTimeMillis:e,backoffCount:n},i,s=cu){var r;const{appId:o,measurementId:a}=t;try{await db(i,e)}catch(l){if(a)return de.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:o,measurementId:a};throw l}try{const l=await lb(t);return s.deleteThrottleMetadata(o),l}catch(l){const c=l;if(!ub(c)){if(s.deleteThrottleMetadata(o),a)return de.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:o,measurementId:a};throw l}const d=Number((r=c==null?void 0:c.customData)===null||r===void 0?void 0:r.httpStatus)===503?Lo(n,s.intervalMillis,sb):Lo(n,s.intervalMillis),u={throttleEndTimeMillis:Date.now()+d,backoffCount:n+1};return s.setThrottleMetadata(o,u),de.debug(`Calling attemptFetch again in ${d} millis`),du(t,u,i,s)}}function db(t,e){return new Promise((n,i)=>{const s=Math.max(e-Date.now(),0),r=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(r),i(he.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function ub(t){if(!(t instanceof Ie)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class hb{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function fb(t,e,n,i,s){if(s&&s.global){t("event",n,i);return}else{const r=await e,o=Object.assign(Object.assign({},i),{send_to:r});t("event",n,o)}}/**
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
 */async function pb(){if(Sl())try{await xl()}catch(t){return de.warn(he.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return de.warn(he.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function mb(t,e,n,i,s,r,o){var a;const l=cb(t);l.then(f=>{n[f.measurementId]=f.appId,t.options.measurementId&&f.measurementId!==t.options.measurementId&&de.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${f.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(f=>de.error(f)),e.push(l);const c=pb().then(f=>{if(f)return i.getId()}),[d,u]=await Promise.all([l,c]);ib(r)||Jv(r,d.measurementId),s("js",new Date);const h=(a=o==null?void 0:o.config)!==null&&a!==void 0?a:{};return h[Vv]="firebase",h.update=!0,u!=null&&(h[Hv]=u),s("config",d.measurementId,h),d.measurementId}/**
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
 */class gb{constructor(e){this.app=e}_delete(){return delete In[this.app.options.appId],Promise.resolve()}}let In={},Qa=[];const Ja={};let Ds="dataLayer",yb="gtag",Xa,uu,Za=!1;function _b(){const t=[];if(Tl()&&t.push("This is a browser extension environment."),Ju()||t.push("Cookies are not available."),t.length>0){const e=t.map((i,s)=>`(${s+1}) ${i}`).join(" "),n=he.create("invalid-analytics-context",{errorInfo:e});de.warn(n.message)}}function wb(t,e,n){_b();const i=t.options.appId;if(!i)throw he.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)de.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw he.create("no-api-key");if(In[i]!=null)throw he.create("already-exists",{id:i});if(!Za){Xv(Ds);const{wrappedGtag:r,gtagCore:o}=nb(In,Qa,Ja,Ds,yb);uu=r,Xa=o,Za=!0}return In[i]=mb(t,Qa,Ja,e,Xa,Ds,n),new gb(t)}function vb(t=Ki()){t=z(t);const e=rt(t,Fi);return e.isInitialized()?e.getImmediate():bb(t)}function bb(t,e={}){const n=rt(t,Fi);if(n.isInitialized()){const s=n.getImmediate();if(Sn(e,n.getOptions()))return s;throw he.create("already-initialized")}return n.initialize({options:e})}function Eb(t,e,n,i){t=z(t),fb(uu,In[t.app.options.appId],e,n,i).catch(s=>de.error(s))}const el="@firebase/analytics",tl="0.10.8";function Ib(){be(new me(Fi,(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return wb(i,s,n)},"PUBLIC")),be(new me("analytics-internal",t,"PRIVATE")),ce(el,tl),ce(el,tl,"esm2017");function t(e){try{const n=e.getProvider(Fi).getImmediate();return{logEvent:(i,s,r)=>Eb(n,i,s,r)}}catch(n){throw he.create("interop-component-reg-failed",{reason:n})}}}Ib();const Tb={apiKey:"AIzaSyAhmJ3_2V0OOP26nZOMWMOyTDePiyI01Yk",authDomain:"diar-shahama-1088b.firebaseapp.com",projectId:"diar-shahama-1088b",storageBucket:"diar-shahama-1088b.appspot.com",messagingSenderId:"887214900924",appId:"1:887214900924:web:0a265e755c852f0113b2b9",measurementId:"G-HB41E2SHWR",databaseURL:"https://diar-shahama-1088b-default-rtdb.firebaseio.com"},ms=Pl(Tb),W=Ag(ms),Ui=z_(ms),kb=tv(ms);vb(ms);window.location.hostname.includes("github.dev")&&(console.info("%c[Firebase Config] Running in GitHub Codespaces. Make sure to add this domain to Firebase Console -> Auth -> Settings -> Authorized Domains:","color: #ffcc00; font-weight: bold;"),console.info("%c"+window.location.hostname,"color: #00ff00; font-family: monospace;"));function ri(t){if(typeof t!="string"||!t)throw new Error("expected a non-empty string, got: "+t)}function Ms(t){if(typeof t!="number")throw new Error("expected a number, got: "+t)}const Sb=1,xb=1,Ct="emoji",Qt="keyvalue",ko="favorites",Cb="tokens",hu="tokens",Ab="unicode",fu="count",Rb="group",Nb="order",pu="group-order",mr="eTag",ji="url",nl="skinTone",on="readonly",So="readwrite",mu="skinUnicodes",Pb="skinUnicodes",Lb="https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json",Ob="en";function Db(t,e){const n=new Set,i=[];for(const s of t){const r=e(s);n.has(r)||(n.add(r),i.push(s))}return i}function il(t){return Db(t,e=>e.unicode)}function Mb(t){function e(n,i,s){const r=i?t.createObjectStore(n,{keyPath:i}):t.createObjectStore(n);if(s)for(const[o,[a,l]]of Object.entries(s))r.createIndex(o,a,{multiEntry:l});return r}e(Qt),e(Ct,Ab,{[hu]:[Cb,!0],[pu]:[[Rb,Nb]],[mu]:[Pb,!0]}),e(ko,void 0,{[fu]:[""]})}const gr={},pi={},Wi={};function gu(t,e,n){n.onerror=()=>e(n.error),n.onblocked=()=>e(new Error("IDB blocked")),n.onsuccess=()=>t(n.result)}async function $b(t){const e=await new Promise((n,i)=>{const s=indexedDB.open(t,Sb);gr[t]=s,s.onupgradeneeded=r=>{r.oldVersion<xb&&Mb(s.result)},gu(n,i,s)});return e.onclose=()=>xo(t),e}function Bb(t){return pi[t]||(pi[t]=$b(t)),pi[t]}function We(t,e,n,i){return new Promise((s,r)=>{const o=t.transaction(e,n,{durability:"relaxed"}),a=typeof e=="string"?o.objectStore(e):e.map(c=>o.objectStore(c));let l;i(a,o,c=>{l=c}),o.oncomplete=()=>s(l),o.onerror=()=>r(o.error)})}function xo(t){const e=gr[t],n=e&&e.result;if(n){n.close();const i=Wi[t];if(i)for(const s of i)s()}delete gr[t],delete pi[t],delete Wi[t]}function Fb(t){return new Promise((e,n)=>{xo(t);const i=indexedDB.deleteDatabase(t);gu(e,n,i)})}function Ub(t,e){let n=Wi[t];n||(n=Wi[t]=[]),n.push(e)}const jb=new Set([":D","XD",":'D","O:)",":X",":P",";P","XP",":L",":Z",":j","8D","XO","8)",":B",":O",":S",":'o","Dx","X(","D:",":C",">0)",":3","</3","<3","\\M/",":E","8#"]);function jt(t){return t.split(/[\s_]+/).map(e=>!e.match(/\w/)||jb.has(e)?e.toLowerCase():e.replace(/[)(:,]/g,"").replace(/’/g,"'").toLowerCase()).filter(Boolean)}const Wb=2;function yu(t){return t.filter(Boolean).map(e=>e.toLowerCase()).filter(e=>e.length>=Wb)}function zb(t){return t.map(({annotation:n,emoticon:i,group:s,order:r,shortcodes:o,skins:a,tags:l,emoji:c,version:d})=>{const u=[...new Set(yu([...(o||[]).map(jt).flat(),...(l||[]).map(jt).flat(),...jt(n),i]))].sort(),h={annotation:n,group:s,order:r,tags:l,tokens:u,unicode:c,version:d};if(i&&(h.emoticon=i),o&&(h.shortcodes=o),a){h.skinTones=[],h.skinUnicodes=[],h.skinVersions=[];for(const{tone:f,emoji:p,version:y}of a)h.skinTones.push(f),h.skinUnicodes.push(p),h.skinVersions.push(y)}return h})}function _u(t,e,n,i){t[e](n).onsuccess=s=>i&&i(s.target.result)}function bt(t,e,n){_u(t,"get",e,n)}function wu(t,e,n){_u(t,"getAll",e,n)}function Co(t){t.commit&&t.commit()}function Hb(t,e){let n=t[0];for(let i=1;i<t.length;i++){const s=t[i];e(n)>e(s)&&(n=s)}return n}function vu(t,e){const n=Hb(t,s=>s.length),i=[];for(const s of n)t.some(r=>r.findIndex(o=>e(o)===e(s))===-1)||i.push(s);return i}async function Vb(t){return!await Ao(t,Qt,ji)}async function qb(t,e,n){const[i,s]=await Promise.all([mr,ji].map(r=>Ao(t,Qt,r)));return i===n&&s===e}async function Gb(t,e){return We(t,Ct,on,(i,s,r)=>{let o;const a=()=>{i.getAll(o&&IDBKeyRange.lowerBound(o,!0),50).onsuccess=l=>{const c=l.target.result;for(const d of c)if(o=d.unicode,e(d))return r(d);if(c.length<50)return r();a()}};a()})}async function bu(t,e,n,i){try{const s=zb(e);await We(t,[Ct,Qt],So,([r,o],a)=>{let l,c,d=0;function u(){++d===2&&h()}function h(){if(!(l===i&&c===n)){r.clear();for(const f of s)r.put(f);o.put(i,mr),o.put(n,ji),Co(a)}}bt(o,mr,f=>{l=f,u()}),bt(o,ji,f=>{c=f,u()})})}finally{}}async function Kb(t,e){return We(t,Ct,on,(n,i,s)=>{const r=IDBKeyRange.bound([e,0],[e+1,0],!1,!0);wu(n.index(pu),r,s)})}async function Eu(t,e){const n=yu(jt(e));return n.length?We(t,Ct,on,(i,s,r)=>{const o=[],a=()=>{o.length===n.length&&l()},l=()=>{const c=vu(o,d=>d.unicode);r(c.sort((d,u)=>d.order<u.order?-1:1))};for(let c=0;c<n.length;c++){const d=n[c],u=c===n.length-1?IDBKeyRange.bound(d,d+"￿",!1,!0):IDBKeyRange.only(d);wu(i.index(hu),u,h=>{o.push(h),a()})}}):[]}async function Yb(t,e){const n=await Eu(t,e);return n.length?n.filter(i=>(i.shortcodes||[]).map(r=>r.toLowerCase()).includes(e.toLowerCase()))[0]||null:await Gb(t,s=>(s.shortcodes||[]).includes(e.toLowerCase()))||null}async function Qb(t,e){return We(t,Ct,on,(n,i,s)=>bt(n,e,r=>{if(r)return s(r);bt(n.index(mu),e,o=>s(o||null))}))}function Ao(t,e,n){return We(t,e,on,(i,s,r)=>bt(i,n,r))}function Jb(t,e,n,i){return We(t,e,So,(s,r)=>{s.put(i,n),Co(r)})}function Xb(t,e){return We(t,ko,So,(n,i)=>bt(n,e,s=>{n.put((s||0)+1,e),Co(i)}))}function Zb(t,e,n){return n===0?[]:We(t,[ko,Ct],on,([i,s],r,o)=>{const a=[];i.index(fu).openCursor(void 0,"prev").onsuccess=l=>{const c=l.target.result;if(!c)return o(a);function d(f){if(a.push(f),a.length===n)return o(a);c.continue()}const u=c.primaryKey,h=e.byName(u);if(h)return d(h);bt(s,u,f=>{if(f)return d(f);c.continue()})}})}const oi="";function eE(t,e){const n=new Map;for(const s of t){const r=e(s);for(const o of r){let a=n;for(let c=0;c<o.length;c++){const d=o.charAt(c);let u=a.get(d);u||(u=new Map,a.set(d,u)),a=u}let l=a.get(oi);l||(l=[],a.set(oi,l)),l.push(s)}}return(s,r)=>{let o=n;for(let c=0;c<s.length;c++){const d=s.charAt(c),u=o.get(d);if(u)o=u;else return[]}if(r)return o.get(oi)||[];const a=[],l=[o];for(;l.length;){const d=[...l.shift().entries()].sort((u,h)=>u[0]<h[0]?-1:1);for(const[u,h]of d)u===oi?a.push(...h):l.push(h)}return a}}const tE=["name","url"];function nE(t){const e=t&&Array.isArray(t),n=e&&t.length&&(!t[0]||tE.some(i=>!(i in t[0])));if(!e||n)throw new Error("Custom emojis are in the wrong format")}function sl(t){nE(t);const e=(h,f)=>h.name.toLowerCase()<f.name.toLowerCase()?-1:1,n=t.sort(e),s=eE(t,h=>{const f=new Set;if(h.shortcodes)for(const p of h.shortcodes)for(const y of jt(p))f.add(y);return f}),r=h=>s(h,!0),o=h=>s(h,!1),a=h=>{const f=jt(h),p=f.map((y,b)=>(b<f.length-1?r:o)(y));return vu(p,y=>y.name).sort(e)},l=new Map,c=new Map;for(const h of t){c.set(h.name.toLowerCase(),h);for(const f of h.shortcodes||[])l.set(f.toLowerCase(),h)}return{all:n,search:a,byShortcode:h=>l.get(h.toLowerCase()),byName:h=>c.get(h.toLowerCase())}}const iE=typeof wrappedJSObject<"u";function fn(t){if(!t)return t;if(iE&&(t=structuredClone(t)),delete t.tokens,t.skinTones){const e=t.skinTones.length;t.skins=Array(e);for(let n=0;n<e;n++)t.skins[n]={tone:t.skinTones[n],unicode:t.skinUnicodes[n],version:t.skinVersions[n]};delete t.skinTones,delete t.skinUnicodes,delete t.skinVersions}return t}function Iu(t){t||console.warn("emoji-picker-element is more efficient if the dataSource server exposes an ETag header.")}const sE=["annotation","emoji","group","order","version"];function rE(t){if(!t||!Array.isArray(t)||!t[0]||typeof t[0]!="object"||sE.some(e=>!(e in t[0])))throw new Error("Emoji data is in the wrong format")}function Tu(t,e){if(Math.floor(t.status/100)!==2)throw new Error("Failed to fetch: "+e+":  "+t.status)}async function oE(t){const e=await fetch(t,{method:"HEAD"});Tu(e,t);const n=e.headers.get("etag");return Iu(n),n}async function yr(t){const e=await fetch(t);Tu(e,t);const n=e.headers.get("etag");Iu(n);const i=await e.json();return rE(i),[n,i]}function aE(t){for(var e="",n=new Uint8Array(t),i=n.byteLength,s=-1;++s<i;)e+=String.fromCharCode(n[s]);return e}function lE(t){for(var e=t.length,n=new ArrayBuffer(e),i=new Uint8Array(n),s=-1;++s<e;)i[s]=t.charCodeAt(s);return n}async function ku(t){const e=JSON.stringify(t);let n=lE(e);const i=await crypto.subtle.digest("SHA-1",n),s=aE(i);return btoa(s)}async function cE(t,e){let n,i=await oE(e);if(!i){const s=await yr(e);i=s[0],n=s[1],i||(i=await ku(n))}await qb(t,e,i)||(n||(n=(await yr(e))[1]),await bu(t,n,e,i))}async function dE(t,e){let[n,i]=await yr(e);n||(n=await ku(i)),await bu(t,i,e,n)}async function uE(t,e){try{await cE(t,e)}catch(n){if(n.name!=="InvalidStateError")throw n}}class hE{constructor({dataSource:e=Lb,locale:n=Ob,customEmoji:i=[]}={}){this.dataSource=e,this.locale=n,this._dbName=`emoji-picker-element-${this.locale}`,this._db=void 0,this._lazyUpdate=void 0,this._custom=sl(i),this._clear=this._clear.bind(this),this._ready=this._init()}async _init(){const e=this._db=await Bb(this._dbName);Ub(this._dbName,this._clear);const n=this.dataSource;await Vb(e)?await dE(e,n):this._lazyUpdate=uE(e,n)}async ready(){const e=async()=>(this._ready||(this._ready=this._init()),this._ready);await e(),this._db||await e()}async getEmojiByGroup(e){return Ms(e),await this.ready(),il(await Kb(this._db,e)).map(fn)}async getEmojiBySearchQuery(e){ri(e),await this.ready();const n=this._custom.search(e),i=il(await Eu(this._db,e)).map(fn);return[...n,...i]}async getEmojiByShortcode(e){ri(e),await this.ready();const n=this._custom.byShortcode(e);return n||fn(await Yb(this._db,e))}async getEmojiByUnicodeOrName(e){ri(e),await this.ready();const n=this._custom.byName(e);return n||fn(await Qb(this._db,e))}async getPreferredSkinTone(){return await this.ready(),await Ao(this._db,Qt,nl)||0}async setPreferredSkinTone(e){return Ms(e),await this.ready(),Jb(this._db,Qt,nl,e)}async incrementFavoriteEmojiCount(e){return ri(e),await this.ready(),Xb(this._db,e)}async getTopFavoriteEmoji(e){return Ms(e),await this.ready(),(await Zb(this._db,this._custom,e)).map(fn)}set customEmoji(e){this._custom=sl(e)}get customEmoji(){return this._custom.all}async _shutdown(){await this.ready();try{await this._lazyUpdate}catch{}}_clear(){this._db=this._ready=this._lazyUpdate=void 0}async close(){await this._shutdown(),await xo(this._dbName)}async delete(){await this._shutdown(),await Fb(this._dbName)}}const _r=[[-1,"✨","custom"],[0,"😀","smileys-emotion"],[1,"👋","people-body"],[3,"🐱","animals-nature"],[4,"🍎","food-drink"],[5,"🏠️","travel-places"],[6,"⚽","activities"],[7,"📝","objects"],[8,"⛔️","symbols"],[9,"🏁","flags"]].map(([t,e,n])=>({id:t,emoji:e,name:n})),$s=_r.slice(1),fE=2,rl=6,Su=typeof requestIdleCallback=="function"?requestIdleCallback:setTimeout;function ol(t){return t.unicode.includes("‍")}const pE={"🫪":17,"🫩":16,"🫨":15.1,"🫠":14,"🥲":13.1,"🥻":12.1,"🥰":11,"🤩":5,"👱‍♀️":4,"🤣":3,"👁️‍🗨️":2,"😀":1,"😐️":.7,"😃":.6},mE=1e3,gE="🖐️",yE=8,_E=["😊","😒","❤️","👍️","😍","😂","😭","☺️","😔","😩","😏","💕","🙌","😘"],xu='"Twemoji Mozilla","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji","EmojiOne Color","Android Emoji",sans-serif',wE=(t,e)=>t<e?-1:t>e?1:0,al=(t,e)=>{const n=document.createElement("canvas");n.width=n.height=1;const i=n.getContext("2d",{willReadFrequently:!0});return i.textBaseline="top",i.font=`100px ${xu}`,i.fillStyle=e,i.scale(.01,.01),i.fillText(t,0,0),i.getImageData(0,0,1,1).data},vE=(t,e)=>{const n=[...t].join(","),i=[...e].join(",");return n===i&&!n.startsWith("0,0,0,")};function bE(t){const e=al(t,"#000"),n=al(t,"#fff");return e&&n&&vE(e,n)}function EE(){const t=Object.entries(pE);try{for(const[e,n]of t)if(bE(e))return n}catch{}finally{}return t[0][1]}let Bs;const Fs=()=>(Bs||(Bs=new Promise(t=>Su(()=>t(EE())))),Bs),wr=new Map,IE="️",TE="\uD83C",kE="‍",SE=127995,xE=57339;function CE(t,e){if(e===0)return t;const n=t.indexOf(kE);return n!==-1?t.substring(0,n)+String.fromCodePoint(SE+e-1)+t.substring(n):(t.endsWith(IE)&&(t=t.substring(0,t.length-1)),t+TE+String.fromCodePoint(xE+e-1))}function ke(t){t.preventDefault(),t.stopPropagation()}function Us(t,e,n){return e+=t?-1:1,e<0?e=n.length-1:e>=n.length&&(e=0),e}function Cu(t,e){const n=new Set,i=[];for(const s of t){const r=e(s);n.has(r)||(n.add(r),i.push(s))}return i}function AE(t,e){const n=i=>{const s={};for(const r of i)typeof r.tone=="number"&&r.version<=e&&(s[r.tone]=r.unicode);return s};return t.map(({unicode:i,skins:s,shortcodes:r,url:o,name:a,category:l,annotation:c})=>({unicode:i,name:a,shortcodes:r,url:o,category:l,annotation:c,id:i||a,skins:s&&n(s)}))}const mi=requestAnimationFrame;let RE=typeof ResizeObserver=="function";function NE(t,e,n){let i;RE?(i=new ResizeObserver(n),i.observe(t)):mi(n),e.addEventListener("abort",()=>{i&&i.disconnect()})}function ll(t){{const e=document.createRange();return e.selectNode(t.firstChild),e.getBoundingClientRect().width}}const PE="😀";let js,at;function cl(t,e,n){const i=ll(e);if(!i){if(!at){at=n.cloneNode(!0);const s=getComputedStyle(n);for(const r of["font-family","line-height","width","height","font-size","display","align-items","justify-content"])at.style.setProperty(r,s.getPropertyValue(r),"important")}try{return document.body.appendChild(at),at.firstChild.nodeValue=t,ll(at)}finally{at.remove()}}return i}function LE(t,e,n){let i=!0;for(const s of t){const r=n(s);if(!r)continue;typeof js>"u"&&(js=cl(PE,e,e));const a=cl(s.unicode,r,e)/1.8<js;wr.set(s.unicode,a),a||(i=!1)}return i}function OE(t){return Cu(t,e=>e)}function DE(t){t&&(t.scrollTop=0)}function Tn(t,e,n){let i=t.get(e);return i||(i=n(),t.set(e,i)),i}function dl(t){return""+t}function ME(t){const e=document.createElement("template");return e.innerHTML=t,e}const $E=new WeakMap,BE=new WeakMap,FE=Symbol("un-keyed"),UE="replaceChildren"in Element.prototype;function jE(t,e){UE?t.replaceChildren(...e):(t.innerHTML="",t.append(...e))}function WE(t,e){let n=t.firstChild,i=0;for(;n;){if(e[i]!==n)return!0;n=n.nextSibling,i++}return i!==e.length}function zE(t,e){const{targetNode:n}=e;let{targetParentNode:i}=e,s=!1;i?s=WE(i,t):(s=!0,e.targetNode=void 0,e.targetParentNode=i=n.parentNode),s&&jE(i,t)}function HE(t,e){for(const n of e){const{targetNode:i,currentExpression:s,binding:{expressionIndex:r,attributeName:o,attributeValuePre:a,attributeValuePost:l}}=n,c=t[r];if(s!==c)if(n.currentExpression=c,o)if(c===null)i.removeAttribute(o);else{const d=a+dl(c)+l;i.setAttribute(o,d)}else{let d;Array.isArray(c)?zE(c,n):c instanceof Element?(d=c,i.replaceWith(d)):i.nodeValue=dl(c),d&&(n.targetNode=d)}}}function VE(t){let e="",n=!1,i=!1,s=-1;const r=new Map,o=[];let a=0;for(let c=0,d=t.length;c<d;c++){const u=t[c];if(e+=u.slice(a),c===d-1)break;for(let m=0;m<u.length;m++)switch(u.charAt(m)){case"<":{u.charAt(m+1)==="/"?o.pop():(n=!0,o.push(++s));break}case">":{n=!1,i=!1;break}case"=":{i=!0;break}}const h=o[o.length-1],f=Tn(r,h,()=>[]);let p,y,b;if(i){const m=/(\S+)="?([^"=]*)$/.exec(u);p=m[1],y=m[2];const w=/^([^">]*)("?)/.exec(t[c+1]);b=w[1],e=e.slice(0,-1*m[0].length),a=w[0].length}else a=0;const g={attributeName:p,attributeValuePre:y,attributeValuePost:b,expressionIndex:c};f.push(g),!n&&!i&&(e+=" ")}return{template:ME(e),elementsToBindings:r}}function ul(t,e,n){for(let i=0;i<t.length;i++){const s=t[i],r=s.attributeName?e:e.firstChild,o={binding:s,targetNode:r,targetParentNode:void 0,currentExpression:void 0};n.push(o)}}function qE(t,e){const n=[];let i;if(e.size===1&&(i=e.get(0)))ul(i,t,n);else{const s=document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT);let r=t,o=-1;do{const a=e.get(++o);a&&ul(a,r,n)}while(r=s.nextNode())}return n}function GE(t){const{template:e,elementsToBindings:n}=Tn($E,t,()=>VE(t)),i=e.cloneNode(!0).content.firstElementChild,s=qE(i,n);return function(o){return HE(o,s),i}}function KE(t){const e=Tn(BE,t,()=>new Map);let n=FE;function i(r,...o){const a=Tn(e,r,()=>new Map);return Tn(a,n,()=>GE(r))(o)}function s(r,o,a){return r.map((l,c)=>{const d=n;n=a(l);try{return o(l,c)}finally{n=d}})}return{map:s,html:i}}function YE(t,e,n,i,s,r,o,a,l){const{labelWithSkin:c,titleForEmoji:d,unicodeWithSkin:u}=n,{html:h,map:f}=KE(e);function p(m,w,v){return f(m,(T,k)=>h`<button role="${w?"option":"menuitem"}" aria-selected="${w?k===e.activeSearchItem:null}" aria-label="${c(T,e.currentSkinTone)}" title="${d(T)}" class="${"emoji"+(w&&k===e.activeSearchItem?" active":"")+(T.unicode?"":" custom-emoji")}" id="${`${v}-${T.id}`}" style="${T.unicode?null:`--custom-emoji-background: url(${JSON.stringify(T.url)})`}">${T.unicode?u(T,e.currentSkinTone):""}</button>`,T=>`${v}-${T.id}`)}const b=h`<section data-ref="rootElement" class="picker" aria-label="${e.i18n.regionLabel}" style="${e.pickerStyle||""}"><div class="pad-top"></div><div class="search-row"><div class="search-wrapper"><input id="search" class="search" type="search" role="combobox" enterkeyhint="search" placeholder="${e.i18n.searchLabel}" autocapitalize="none" autocomplete="off" spellcheck="true" aria-expanded="${!!(e.searchMode&&e.currentEmojis.length)}" aria-controls="search-results" aria-describedby="search-description" aria-autocomplete="list" aria-activedescendant="${e.activeSearchItemId?`emo-${e.activeSearchItemId}`:null}" data-ref="searchElement" data-on-input="onSearchInput" data-on-keydown="onSearchKeydown"><label class="sr-only" for="search">${e.i18n.searchLabel}</label> <span id="search-description" class="sr-only">${e.i18n.searchDescription}</span></div><div class="skintone-button-wrapper ${e.skinTonePickerExpandedAfterAnimation?"expanded":""}"><button id="skintone-button" class="emoji ${e.skinTonePickerExpanded?"hide-focus":""}" aria-label="${e.skinToneButtonLabel}" title="${e.skinToneButtonLabel}" aria-describedby="skintone-description" aria-haspopup="listbox" aria-expanded="${e.skinTonePickerExpanded}" aria-controls="skintone-list" data-on-click="onClickSkinToneButton">${e.skinToneButtonText||""}</button></div><span id="skintone-description" class="sr-only">${e.i18n.skinToneDescription}</span><div data-ref="skinToneDropdown" id="skintone-list" class="skintone-list hide-focus ${e.skinTonePickerExpanded?"":"hidden no-animate"}" style="transform:translateY(${e.skinTonePickerExpanded?0:"calc(-1 * var(--num-skintones) * var(--total-emoji-size))"})" role="listbox" aria-label="${e.i18n.skinTonesLabel}" aria-activedescendant="skintone-${e.activeSkinTone}" aria-hidden="${!e.skinTonePickerExpanded}" tabIndex="-1" data-on-focusout="onSkinToneOptionsFocusOut" data-on-click="onSkinToneOptionsClick" data-on-keydown="onSkinToneOptionsKeydown" data-on-keyup="onSkinToneOptionsKeyup">${f(e.skinTones,(m,w)=>h`<div id="skintone-${w}" class="emoji ${w===e.activeSkinTone?"active":""}" aria-selected="${w===e.activeSkinTone}" role="option" title="${e.i18n.skinTones[w]}" aria-label="${e.i18n.skinTones[w]}">${m}</div>`,m=>m)}</div></div><div class="nav" role="tablist" style="grid-template-columns:repeat(${e.groups.length},1fr)" aria-label="${e.i18n.categoriesLabel}" data-on-keydown="onNavKeydown" data-on-click="onNavClick">${f(e.groups,m=>h`<button role="tab" class="nav-button" aria-controls="tab-${m.id}" aria-label="${e.i18n.categories[m.name]}" aria-selected="${!e.searchMode&&e.currentGroup.id===m.id}" title="${e.i18n.categories[m.name]}" data-group-id="${m.id}"><div class="nav-emoji emoji">${m.emoji}</div></button>`,m=>m.id)}</div><div class="indicator-wrapper"><div class="indicator" style="transform:translateX(${(e.isRtl?-1:1)*e.currentGroupIndex*100}%)"></div></div><div class="message ${e.message?"":"gone"}" role="alert" aria-live="polite">${e.message||""}</div><div data-ref="tabpanelElement" class="tabpanel ${!e.databaseLoaded||e.message?"gone":""}" role="${e.searchMode?"region":"tabpanel"}" aria-label="${e.searchMode?e.i18n.searchResultsLabel:e.i18n.categories[e.currentGroup.name]}" id="${e.searchMode?null:`tab-${e.currentGroup.id}`}" tabIndex="0" data-on-click="onEmojiClick"><div data-action="calculateEmojiGridStyle">${f(e.currentEmojisWithCategories,(m,w)=>h`<div><div id="menu-label-${w}" class="category ${e.currentEmojisWithCategories.length===1&&e.currentEmojisWithCategories[0].category===""?"gone":""}" aria-hidden="true">${e.searchMode?e.i18n.searchResultsLabel:m.category?m.category:e.currentEmojisWithCategories.length>1?e.i18n.categories.custom:e.i18n.categories[e.currentGroup.name]}</div><div class="emoji-menu ${w!==0&&!e.searchMode&&e.currentGroup.id===-1?"visibility-auto":""}" style="${`--num-rows: ${Math.ceil(m.emojis.length/e.numColumns)}`}" data-action="updateOnIntersection" role="${e.searchMode?"listbox":"menu"}" aria-labelledby="menu-label-${w}" id="${e.searchMode?"search-results":null}">${p(m.emojis,e.searchMode,"emo")}</div></div>`,m=>m.category)}</div></div><div class="favorites onscreen emoji-menu ${e.message?"gone":""}" role="menu" aria-label="${e.i18n.favoritesLabel}" data-on-click="onEmojiClick">${p(e.currentFavorites,!1,"fav")}</div><button data-ref="baselineEmoji" aria-hidden="true" tabindex="-1" class="abs-pos hidden emoji baseline-emoji">😀</button></section>`,g=(m,w)=>{for(const v of t.querySelectorAll(`[${m}]`))w(v,v.getAttribute(m))};if(l){t.appendChild(b);for(const m of["click","focusout","input","keydown","keyup"])g(`data-on-${m}`,(w,v)=>{w.addEventListener(m,i[v])});g("data-ref",(m,w)=>{r[w]=m}),o.addEventListener("abort",()=>{t.removeChild(b)})}g("data-action",(m,w)=>{let v=a.get(w);v||a.set(w,v=new WeakSet),v.has(m)||(v.add(m),s[w](m))})}const zi=typeof queueMicrotask=="function"?queueMicrotask:t=>Promise.resolve().then(t);function QE(t){let e=!1,n;const i=new Map,s=new Set;let r;const o=()=>{if(e)return;const c=[...s];s.clear();try{for(const d of c)d()}finally{r=!1,s.size&&(r=!0,zi(o))}},a=new Proxy({},{get(c,d){if(n){let u=i.get(d);u||(u=new Set,i.set(d,u)),u.add(n)}return c[d]},set(c,d,u){if(c[d]!==u){c[d]=u;const h=i.get(d);if(h){for(const f of h)s.add(f);r||(r=!0,zi(o))}}return!0}}),l=c=>{const d=()=>{const u=n;n=d;try{return c()}finally{n=u}};return d()};return t.addEventListener("abort",()=>{e=!0}),{state:a,createEffect:l}}function Ws(t,e,n){if(t.length!==e.length)return!1;for(let i=0;i<t.length;i++)if(!n(t[i],e[i]))return!1;return!0}const hl=new WeakMap;function JE(t,e,n){{const i=t.closest(".tabpanel");let s=hl.get(i);s||(s=new IntersectionObserver(n,{root:i,rootMargin:"50% 0px 50% 0px",threshold:0}),hl.set(i,s),e.addEventListener("abort",()=>{s.disconnect()})),s.observe(t)}}const zs=[],{assign:ai}=Object;function XE(t,e){const n={},i=new AbortController,s=i.signal,{state:r,createEffect:o}=QE(s),a=new Map;ai(r,{skinToneEmoji:void 0,i18n:void 0,database:void 0,customEmoji:void 0,customCategorySorting:void 0,emojiVersion:void 0}),ai(r,e),ai(r,{initialLoad:!0,currentEmojis:[],currentEmojisWithCategories:[],rawSearchText:"",searchText:"",searchMode:!1,activeSearchItem:-1,message:void 0,skinTonePickerExpanded:!1,skinTonePickerExpandedAfterAnimation:!1,currentSkinTone:0,activeSkinTone:0,skinToneButtonText:void 0,pickerStyle:void 0,skinToneButtonLabel:"",skinTones:[],currentFavorites:[],defaultFavoriteEmojis:void 0,numColumns:yE,isRtl:!1,currentGroupIndex:0,groups:$s,databaseLoaded:!1,activeSearchItemId:void 0}),o(()=>{r.currentGroup!==r.groups[r.currentGroupIndex]&&(r.currentGroup=r.groups[r.currentGroupIndex])});const l=_=>{t.getElementById(_).focus()},c=_=>t.getElementById(`emo-${_.id}`),d=(_,I)=>{n.rootElement.dispatchEvent(new CustomEvent(_,{detail:I,bubbles:!0,composed:!0}))},u=(_,I)=>_.id===I.id,h=(_,I)=>{const{category:A,emojis:O}=_,{category:ee,emojis:ie}=I;return A!==ee?!1:Ws(O,ie,u)},f=_=>{Ws(r.currentEmojis,_,u)||(r.currentEmojis=_)},p=_=>{r.searchMode!==_&&(r.searchMode=_)},y=_=>{Ws(r.currentEmojisWithCategories,_,h)||(r.currentEmojisWithCategories=_)},b=(_,I)=>I&&_.skins&&_.skins[I]||_.unicode,w={labelWithSkin:(_,I)=>OE([_.name||b(_,I),_.annotation,..._.shortcodes||zs].filter(Boolean)).join(", "),titleForEmoji:_=>_.annotation||(_.shortcodes||zs).join(", "),unicodeWithSkin:b},v={onClickSkinToneButton:Du,onEmojiClick:Lu,onNavClick:Jn,onNavKeydown:Nt,onSearchKeydown:Rt,onSkinToneOptionsClick:Ou,onSkinToneOptionsFocusOut:Bu,onSkinToneOptionsKeydown:Mu,onSkinToneOptionsKeyup:$u,onSearchInput:Fu},T={calculateEmojiGridStyle:x,updateOnIntersection:Q};let k=!0;o(()=>{YE(t,r,w,v,T,n,s,a,k),k=!1}),r.emojiVersion||Fs().then(_=>{_||(r.message=r.i18n.emojiUnsupportedMessage)}),o(()=>{async function _(){let I=!1;const A=setTimeout(()=>{I=!0,r.message=r.i18n.loadingMessage},mE);try{await r.database.ready(),r.databaseLoaded=!0}catch(O){console.error(O),r.message=r.i18n.networkErrorMessage}finally{clearTimeout(A),I&&(I=!1,r.message="")}}r.database&&_()}),o(()=>{r.pickerStyle=`
      --num-groups: ${r.groups.length}; 
      --indicator-opacity: ${r.searchMode?0:1}; 
      --num-skintones: ${rl};`}),o(()=>{r.customEmoji&&r.database&&R()}),o(()=>{r.customEmoji&&r.customEmoji.length?r.groups!==_r&&(r.groups=_r):r.groups!==$s&&(r.currentGroupIndex&&r.currentGroupIndex--,r.groups=$s)}),o(()=>{async function _(){r.databaseLoaded&&(r.currentSkinTone=await r.database.getPreferredSkinTone())}_()}),o(()=>{r.skinTones=Array(rl).fill().map((_,I)=>CE(r.skinToneEmoji,I))}),o(()=>{r.skinToneButtonText=r.skinTones[r.currentSkinTone]}),o(()=>{r.skinToneButtonLabel=r.i18n.skinToneLabel.replace("{skinTone}",r.i18n.skinTones[r.currentSkinTone])}),o(()=>{async function _(){const{database:I}=r,A=(await Promise.all(_E.map(O=>I.getEmojiByUnicodeOrName(O)))).filter(Boolean);r.defaultFavoriteEmojis=A}r.databaseLoaded&&_()});function R(){const{customEmoji:_,database:I}=r,A=_||zs;I.customEmoji!==A&&(I.customEmoji=A)}o(()=>{async function _(){R();const{database:I,defaultFavoriteEmojis:A,numColumns:O}=r,ee=await I.getTopFavoriteEmoji(O),ie=await V(Cu([...ee,...A],ye=>ye.unicode||ye.name).slice(0,O));r.currentFavorites=ie}r.databaseLoaded&&r.defaultFavoriteEmojis&&_()});function x(_){NE(_,s,()=>{{const I=getComputedStyle(n.rootElement),A=parseInt(I.getPropertyValue("--num-columns"),10),O=I.getPropertyValue("direction")==="rtl";r.numColumns=A,r.isRtl=O}})}function Q(_){JE(_,s,I=>{for(const{target:A,isIntersecting:O}of I)A.classList.toggle("onscreen",O)})}o(()=>{async function _(){const{searchText:I,currentGroup:A,databaseLoaded:O,customEmoji:ee}=r;if(!O)r.currentEmojis=[],r.searchMode=!1;else if(I.length>=fE){const ie=await an(I);r.searchText===I&&(f(ie),p(!0))}else{const{id:ie}=A;if(ie!==-1||ee&&ee.length){const ye=await Qn(ie);r.currentGroup.id===ie&&(f(ye),p(!1))}}}_()});const ge=()=>{mi(()=>DE(n.tabpanelElement))};o(()=>{const{currentEmojis:_,emojiVersion:I}=r,A=_.filter(O=>O.unicode).filter(O=>ol(O)&&!wr.has(O.unicode));if(!I&&A.length)f(_),mi(()=>At(A));else{const O=I?_:_.filter(Re);f(O),ge()}});function At(_){LE(_,n.baselineEmoji,c)?ge():r.currentEmojis=[...r.currentEmojis]}function Re(_){return!_.unicode||!ol(_)||wr.get(_.unicode)}async function ze(_){const I=r.emojiVersion||await Fs();return _.filter(({version:A})=>!A||A<=I)}async function V(_){return AE(_,r.emojiVersion||await Fs())}async function Qn(_){const I=_===-1?r.customEmoji:await r.database.getEmojiByGroup(_);return V(await ze(I))}async function an(_){return V(await ze(await r.database.getEmojiBySearchQuery(_)))}o(()=>{}),o(()=>{function _(){const{searchMode:A,currentEmojis:O}=r;if(A)return[{category:"",emojis:O}];const ee=new Map;for(const ie of O){const ye=ie.category||"";let Zn=ee.get(ye);Zn||(Zn=[],ee.set(ye,Zn)),Zn.push(ie)}return[...ee.entries()].map(([ie,ye])=>({category:ie,emojis:ye})).sort((ie,ye)=>r.customCategorySorting(ie.category,ye.category))}const I=_();y(I)}),o(()=>{r.activeSearchItemId=r.activeSearchItem!==-1&&r.currentEmojis[r.activeSearchItem].id}),o(()=>{const{rawSearchText:_}=r;Su(()=>{r.searchText=(_||"").trim(),r.activeSearchItem=-1})});function Rt(_){if(!r.searchMode||!r.currentEmojis.length)return;const I=A=>{ke(_),r.activeSearchItem=Us(A,r.activeSearchItem,r.currentEmojis)};switch(_.key){case"ArrowDown":return I(!1);case"ArrowUp":return I(!0);case"Enter":if(r.activeSearchItem===-1)r.activeSearchItem=0;else return ke(_),Xn(r.currentEmojis[r.activeSearchItem].id)}}function Jn(_){const{target:I}=_,A=I.closest(".nav-button");if(!A)return;const O=parseInt(A.dataset.groupId,10);n.searchElement.value="",r.rawSearchText="",r.searchText="",r.activeSearchItem=-1,r.currentGroupIndex=r.groups.findIndex(ee=>ee.id===O)}function Nt(_){const{target:I,key:A}=_,O=ee=>{ee&&(ke(_),ee.focus())};switch(A){case"ArrowLeft":return O(I.previousElementSibling);case"ArrowRight":return O(I.nextElementSibling);case"Home":return O(I.parentElement.firstElementChild);case"End":return O(I.parentElement.lastElementChild)}}async function Pt(_){const I=await r.database.getEmojiByUnicodeOrName(_),A=[...r.currentEmojis,...r.currentFavorites].find(ee=>ee.id===_),O=A.unicode&&b(A,r.currentSkinTone);return await r.database.incrementFavoriteEmojiCount(_),{emoji:I,skinTone:r.currentSkinTone,...O&&{unicode:O},...A.name&&{name:A.name}}}async function Xn(_){const I=Pt(_);d("emoji-click-sync",I),d("emoji-click",await I)}function Lu(_){const{target:I}=_;if(!I.classList.contains("emoji"))return;ke(_);const A=I.id.substring(4);Xn(A)}function gs(_){r.currentSkinTone=_,r.skinTonePickerExpanded=!1,l("skintone-button"),d("skin-tone-change",{skinTone:_}),r.database.setPreferredSkinTone(_)}function Ou(_){const{target:{id:I}}=_,A=I&&I.match(/^skintone-(\d)/);if(!A)return;ke(_);const O=parseInt(A[1],10);gs(O)}function Du(_){r.skinTonePickerExpanded=!r.skinTonePickerExpanded,r.activeSkinTone=r.currentSkinTone,r.skinTonePickerExpanded&&(ke(_),mi(()=>l("skintone-list")))}o(()=>{r.skinTonePickerExpanded?n.skinToneDropdown.addEventListener("transitionend",()=>{r.skinTonePickerExpandedAfterAnimation=!0},{once:!0}):r.skinTonePickerExpandedAfterAnimation=!1});function Mu(_){if(!r.skinTonePickerExpanded)return;const I=async A=>{ke(_),r.activeSkinTone=A};switch(_.key){case"ArrowUp":return I(Us(!0,r.activeSkinTone,r.skinTones));case"ArrowDown":return I(Us(!1,r.activeSkinTone,r.skinTones));case"Home":return I(0);case"End":return I(r.skinTones.length-1);case"Enter":return ke(_),gs(r.activeSkinTone);case"Escape":return ke(_),r.skinTonePickerExpanded=!1,l("skintone-button")}}function $u(_){if(r.skinTonePickerExpanded)switch(_.key){case" ":return ke(_),gs(r.activeSkinTone)}}async function Bu(_){const{relatedTarget:I}=_;(!I||I.id!=="skintone-list")&&(r.skinTonePickerExpanded=!1)}function Fu(_){r.rawSearchText=_.target.value}return{$set(_){ai(r,_)},$destroy(){i.abort()}}}const ZE="https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json",eI="en";var tI={categoriesLabel:"Categories",emojiUnsupportedMessage:"Your browser does not support color emoji.",favoritesLabel:"Favorites",loadingMessage:"Loading…",networkErrorMessage:"Could not load emoji.",regionLabel:"Emoji picker",searchDescription:"When search results are available, press up or down to select and enter to choose.",searchLabel:"Search",searchResultsLabel:"Search results",skinToneDescription:"When expanded, press up or down to select and enter to choose.",skinToneLabel:"Choose a skin tone (currently {skinTone})",skinTonesLabel:"Skin tones",skinTones:["Default","Light","Medium-Light","Medium","Medium-Dark","Dark"],categories:{custom:"Custom","smileys-emotion":"Smileys and emoticons","people-body":"People and body","animals-nature":"Animals and nature","food-drink":"Food and drink","travel-places":"Travel and places",activities:"Activities",objects:"Objects",symbols:"Symbols",flags:"Flags"}},nI=':host{--emoji-size:1.375rem;--emoji-padding:0.5rem;--category-emoji-size:var(--emoji-size);--category-emoji-padding:var(--emoji-padding);--indicator-height:3px;--input-border-radius:0.5rem;--input-border-size:1px;--input-font-size:1rem;--input-line-height:1.5;--input-padding:0.25rem;--num-columns:8;--outline-size:2px;--border-size:1px;--border-radius:0;--skintone-border-radius:1rem;--category-font-size:1rem;display:flex;width:min-content;height:400px}:host,:host(.light){color-scheme:light;--background:#fff;--border-color:#e0e0e0;--indicator-color:#385ac1;--input-border-color:#999;--input-font-color:#111;--input-placeholder-color:#999;--outline-color:#999;--category-font-color:#111;--button-active-background:#e6e6e6;--button-hover-background:#d9d9d9}:host(.dark){color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}@media (prefers-color-scheme:dark){:host{color-scheme:dark;--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555555;--button-hover-background:#484848}}:host([hidden]){display:none}button{margin:0;padding:0;border:0;background:0 0;box-shadow:none;-webkit-tap-highlight-color:transparent}button::-moz-focus-inner{border:0}input{padding:0;margin:0;line-height:1.15;font-family:inherit}input[type=search]{-webkit-appearance:none}:focus{outline:var(--outline-color) solid var(--outline-size);outline-offset:calc(-1*var(--outline-size))}:host([data-js-focus-visible]) :focus:not([data-focus-visible-added]){outline:0}:focus:not(:focus-visible){outline:0}.hide-focus{outline:0}*{box-sizing:border-box}.picker{contain:content;display:flex;flex-direction:column;background:var(--background);border:var(--border-size) solid var(--border-color);border-radius:var(--border-radius);width:100%;height:100%;overflow:hidden;--total-emoji-size:calc(var(--emoji-size) + (2 * var(--emoji-padding)));--total-category-emoji-size:calc(var(--category-emoji-size) + (2 * var(--category-emoji-padding)))}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.hidden{opacity:0;pointer-events:none}.abs-pos{position:absolute;left:0;top:0}.gone{display:none!important}.skintone-button-wrapper,.skintone-list{background:var(--background);z-index:3}.skintone-button-wrapper.expanded{z-index:1}.skintone-list{position:absolute;inset-inline-end:0;top:0;z-index:2;overflow:visible;border-bottom:var(--border-size) solid var(--border-color);border-radius:0 0 var(--skintone-border-radius) var(--skintone-border-radius);will-change:transform;transition:transform .2s ease-in-out;transform-origin:center 0}@media (prefers-reduced-motion:reduce){.skintone-list{transition-duration:.001s}}@supports not (inset-inline-end:0){.skintone-list{right:0}}.skintone-list.no-animate{transition:none}.tabpanel{overflow-y:auto;scrollbar-gutter:stable;-webkit-overflow-scrolling:touch;will-change:transform;min-height:0;flex:1;contain:content}.emoji-menu{display:grid;grid-template-columns:repeat(var(--num-columns),var(--total-emoji-size));justify-content:space-around;align-items:flex-start;width:100%}.emoji-menu.visibility-auto{content-visibility:auto;contain-intrinsic-size:calc(var(--num-columns)*var(--total-emoji-size)) calc(var(--num-rows)*var(--total-emoji-size))}.category{padding:var(--emoji-padding);font-size:var(--category-font-size);color:var(--category-font-color)}.emoji,button.emoji{font-size:var(--emoji-size);display:flex;align-items:center;justify-content:center;border-radius:100%;height:var(--total-emoji-size);width:var(--total-emoji-size);line-height:1;overflow:hidden;font-family:var(--emoji-font-family);cursor:pointer}@media (hover:hover) and (pointer:fine){.emoji:hover,button.emoji:hover{background:var(--button-hover-background)}}.emoji.active,.emoji:active,button.emoji.active,button.emoji:active{background:var(--button-active-background)}.onscreen .custom-emoji::after{content:"";width:var(--emoji-size);height:var(--emoji-size);background-repeat:no-repeat;background-position:center center;background-size:contain;background-image:var(--custom-emoji-background)}.nav,.nav-button{align-items:center}.nav{display:grid;justify-content:space-between;contain:content}.nav-button{display:flex;justify-content:center}.nav-emoji{font-size:var(--category-emoji-size);width:var(--total-category-emoji-size);height:var(--total-category-emoji-size)}.indicator-wrapper{display:flex;border-bottom:1px solid var(--border-color)}.indicator{width:calc(100%/var(--num-groups));height:var(--indicator-height);opacity:var(--indicator-opacity);background-color:var(--indicator-color);will-change:transform,opacity;transition:opacity .1s linear,transform .25s ease-in-out}@media (prefers-reduced-motion:reduce){.indicator{will-change:opacity;transition:opacity .1s linear}}.pad-top,input.search{background:var(--background);width:100%}.pad-top{height:var(--emoji-padding);z-index:3}.search-row{display:flex;align-items:center;position:relative;padding-inline-start:var(--emoji-padding);padding-bottom:var(--emoji-padding)}.search-wrapper{flex:1;min-width:0}input.search{padding:var(--input-padding);border-radius:var(--input-border-radius);border:var(--input-border-size) solid var(--input-border-color);color:var(--input-font-color);font-size:var(--input-font-size);line-height:var(--input-line-height)}input.search::placeholder{color:var(--input-placeholder-color)}.favorites{overflow-y:auto;scrollbar-gutter:stable;display:flex;flex-direction:row;border-top:var(--border-size) solid var(--border-color);contain:content}.message{padding:var(--emoji-padding)}';const Au=["customEmoji","customCategorySorting","database","dataSource","i18n","locale","skinToneEmoji","emojiVersion"],iI=`:host{--emoji-font-family:${xu}}`;class Ro extends HTMLElement{constructor(e){super(),this.attachShadow({mode:"open"});const n=document.createElement("style");n.textContent=nI+iI,this.shadowRoot.appendChild(n),this._ctx={locale:eI,dataSource:ZE,skinToneEmoji:gE,customCategorySorting:wE,customEmoji:null,i18n:tI,emojiVersion:null,...e};for(const i of Au)i!=="database"&&Object.prototype.hasOwnProperty.call(this,i)&&(this._ctx[i]=this[i],delete this[i]);this._dbFlush()}connectedCallback(){fl(this),this._cmp||(this._cmp=XE(this.shadowRoot,this._ctx))}disconnectedCallback(){fl(this),zi(()=>{if(!this.isConnected&&this._cmp){this._cmp.$destroy(),this._cmp=void 0;const{database:e}=this._ctx;e.close().catch(n=>console.error(n))}})}static get observedAttributes(){return["locale","data-source","skin-tone-emoji","emoji-version"]}attributeChangedCallback(e,n,i){this._set(e.replace(/-([a-z])/g,(s,r)=>r.toUpperCase()),e==="emoji-version"?parseFloat(i):i)}_set(e,n){this._ctx[e]=n,this._cmp&&this._cmp.$set({[e]:n}),["locale","dataSource"].includes(e)&&this._dbFlush()}_dbCreate(){const{locale:e,dataSource:n,database:i}=this._ctx;(!i||i.locale!==e||i.dataSource!==n)&&this._set("database",new hE({locale:e,dataSource:n}))}_dbFlush(){zi(()=>this._dbCreate())}}const Ru={};for(const t of Au)Ru[t]={get(){return t==="database"&&this._dbCreate(),this._ctx[t]},set(e){if(t==="database")throw new Error("database is read-only");this._set(t,e)}};Object.defineProperties(Ro.prototype,Ru);function fl(t){t instanceof Ro||Object.setPrototypeOf(t,customElements.get(t.tagName.toLowerCase()).prototype)}customElements.get("emoji-picker")||customElements.define("emoji-picker",Ro);window.state={cars:[],ads:[],bookings:[],users:[],notifications:[],logs:[],partners:[],locations:[],brands:[],agents:[],specs:[],packages:[],blogs:[],reviews:[],plates:[],sales:[],user:null,userProfile:null,settings:{},lang:localStorage.getItem("luxury_lang")||"ar",soundEnabled:localStorage.getItem("luxury_sound_enabled")!=="false",tempImages:[],bookingFilter:"all",bookingSubStatusFilter:"all",currentReportPeriod:"day",firstLoadDone:!1,inventoryPage:1,inventorySize:8,sliderIndex:0};const sI={ar:{welcome:"مرحباً بك في عالم الفخامة",inventory:"مخزون السيارات المتاح",totalCars:"إجمالي السيارات",totalBookings:"إجمالي الطلبات",totalValue:"قيمة المخزون",searchPlaceholder:"ابحث عن سيارتك المثالية...",loading:"جاري التحميل...",noResults:"لم يتم العثور على نتائج تطابق بحثك",applyNow:"اطلبها الآن",details:"عرض التفاصيل",back:"رجوع",save:"حفظ",delete:"حذف",edit:"تعديل",cancel:"إلغاء",successMsg:"تمت العملية بنجاح",errorMsg:"حدث خطأ غير متوقع",staff:"قسم المبيعات والمتابعة",admin:"إدارة النظام",supervisor:"مشرف النظام"},en:{welcome:"Welcome to the World of Luxury",inventory:"Available Vehicle Inventory",totalCars:"Total Vehicles",totalBookings:"Total Bookings",totalValue:"Inventory Value",searchPlaceholder:"Search for your perfect car...",loading:"Loading...",noResults:"No results found matching your search",applyNow:"Request Now",details:"View Details",back:"Back",save:"Save",delete:"Delete",edit:"Edit",cancel:"Cancel",successMsg:"Operation successful",errorMsg:"An unexpected error occurred",staff:"Sales & Follow-up Department",admin:"System Administration",supervisor:"System Supervisor"}};window.showLuxuryToast=function(t,e="success"){const n=document.getElementById("toast-container");if(!n)return;const i=document.createElement("div");i.className=`toast-v2 ${e}`,i.style.cssText=`
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
  `;const s=e==="success"?"fa-check-circle":"fa-exclamation-circle";i.innerHTML=`<i class="fas ${s}"></i> <span>${t}</span>`,n.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateY(-20px)",i.style.transition="all 0.4s ease-in",setTimeout(()=>i.remove(),400)},4e3)};window.openModal=function(t){const e=document.getElementById(t);if(e){e.classList.remove("hidden"),document.body.style.overflow="hidden";const n=document.querySelectorAll(".modal:not(.hidden)");e.style.zIndex=2e3+n.length*10,rI(`modal-${t}`)}};window.closeModal=function(t,e=!1){var i;const n=document.getElementById(t);n&&(n.classList.add("hidden"),n.style.zIndex="",!e&&((i=history.state)==null?void 0:i.type)===`modal-${t}`&&history.back(),document.querySelector(".modal:not(.hidden)")||(document.body.style.overflow="auto"))};window.setModalTitle=function(t,e){const n=document.getElementById(t+"-title");n&&(n.innerText=e)};window.switchLuxuryTab=function(t){const e=document.querySelectorAll(".pane, .admin-tab-content"),n=document.querySelectorAll(".dash-tab, .admin-sidebar-nav li");e.forEach(o=>o.classList.add("hidden")),n.forEach(o=>o.classList.remove("active"));const i=document.getElementById(t),s=document.querySelector(`[data-tab="${t}"]`);i&&(i.classList.remove("hidden"),i.classList.add("active"),i.style.animation="fade-up 0.5s ease-out forwards"),s&&s.classList.add("active");const r=document.getElementById("bookings-submenu");if(r&&r.classList.toggle("active",t==="bookings-mgmt"||t==="all-bookings"),window.innerWidth<1024){const o=document.querySelector(".dash-sidebar, .admin-sidebar-v2");o&&o.classList.remove("active")}t==="whatsapp-monitor-mgmt"&&window.initWhatsAppServer&&window.initWhatsAppServer(),t==="whatsapp-mgmt"&&window.startCurrentWASession(),t==="quick-replies-mgmt"&&window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin()};function rI(t){var e;((e=history.state)==null?void 0:e.type)!==t&&history.pushState({type:t},"")}window.normalizePhone=function(t){if(!t)return"";const e=t.toString().trim();if(e.includes("@s.whatsapp.net"))return e.split("@")[0].replace(/\D/g,"");if(e.includes("@lid"))return e;let n=e.replace(/\D/g,"");if(n.startsWith("9660")?n="966"+n.substring(4):n.startsWith("9670")&&(n="967"+n.substring(4)),n.startsWith("966")||n.startsWith("967"))return n;if(n.startsWith("05"))return"966"+n.substring(1);if(n.startsWith("07"))return"967"+n.substring(1);if(n.startsWith("0"))return"966"+n.substring(1);if(n.length===9){if(n.startsWith("7"))return"967"+n;if(n.startsWith("5"))return"966"+n}return n};document.addEventListener("DOMContentLoaded",()=>{aI(),Nu(),lI(),window.trackVisit(),oI()});function oI(){const t=document.querySelector(".mobile-btn"),e=document.querySelector(".nav-menu"),n=document.querySelector(".mobile-nav-overlay"),i=document.querySelector(".menu-close-btn"),s=(g=!1)=>{const m=g===!1?!e.classList.contains("active"):!1;e.classList.toggle("active",m),n.classList.toggle("active",m),document.body.style.overflow=m?"hidden":"";const w=t==null?void 0:t.querySelector("i");w&&(w.className=m?"fas fa-times":"fas fa-bars-staggered")};t&&(t.onclick=()=>s()),n&&(n.onclick=()=>s(!0)),i&&(i.onclick=()=>s(!0)),document.querySelectorAll(".nav-menu a").forEach(g=>{g.addEventListener("click",()=>s(!0))});const r=document.querySelector(".mobile-menu-header .dynamic-name-ar");r&&window.__DYNAMIC_NAME_AR__&&(r.innerText=window.__DYNAMIC_NAME_AR__);const o=document.getElementById("admin-trigger");o&&(o.onclick=g=>{g.preventDefault(),window.openModal("admin-modal")});const a=document.getElementById("theme-btn");a&&(a.onclick=()=>{const m=(document.body.getAttribute("data-theme")||"dark")==="dark"?"light":"dark";document.body.setAttribute("data-theme",m),localStorage.setItem("luxury_theme",m),a.innerHTML=m==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>'});const l=document.getElementById("lang-btn");l&&(l.onclick=()=>{window.state.lang=window.state.lang==="ar"?"en":"ar",localStorage.setItem("luxury_lang",window.state.lang),Nu(),window.applyInventoryFilters(),l.innerText=window.state.lang==="ar"?"EN":"AR"}),document.querySelectorAll(".dash-tab").forEach(g=>{g.onclick=()=>window.switchLuxuryTab(g.dataset.tab)});const c=document.getElementById("car-search-input");c&&(c.oninput=()=>window.applyInventoryFilters()),["filter-make","filter-type","filter-year","filter-sort"].forEach(g=>{const m=document.getElementById(g);m&&(m.onchange=()=>{window.state.inventoryPage=1,window.applyInventoryFilters()})});const u=document.getElementById("p-prev"),h=document.getElementById("p-next");u&&(u.onclick=()=>window.moveLuxurySlider(-1)),h&&(h.onclick=()=>window.moveLuxurySlider(1)),setInterval(()=>{const g=document.getElementById("luxury-splash");(!g||g.classList.contains("hidden"))&&window.moveLuxurySlider(1)},5e3),["calc-car-price","calc-down-pay","calc-years"].forEach(g=>{const m=document.getElementById(g);m&&(m.oninput=()=>window.calculateLuxuryFinancing()),m&&m.tagName==="SELECT"&&(m.onchange=()=>window.calculateLuxuryFinancing())}),document.querySelectorAll(".modal-close").forEach(g=>{g.onclick=m=>{m.stopPropagation();const w=g.closest(".modal");if(w){if(w.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(w.id)}}}),window.onclick=g=>{const m=document.getElementById("wa-emoji-picker");if(m&&m.style.display!=="none"){const v=g.target.closest(".fa-smile")!==null,T=m.contains(g.target);!v&&!T&&(m.style.display="none")}const w=Array.from(document.querySelectorAll(".modal:not(.hidden)"));if(w.length>0){const v=w[w.length-1];if(g.target===v){if(v.id==="admin-modal"&&window.state.user&&!confirm("هل تريد الخروج من لوحة التحكم؟"))return;window.closeModal(v.id)}}},window.addEventListener("popstate",g=>{const m=document.querySelectorAll(".modal:not(.hidden)");m.length>0&&m.forEach(w=>{var v;((v=g.state)==null?void 0:v.type)!==`modal-${w.id}`&&window.closeModal(w.id,!0)})}),window.onscroll=()=>{const g=document.getElementById("main-nav");g&&g.classList.toggle("scrolled",window.scrollY>50);const m=document.getElementById("scroll-jump");m&&m.classList.toggle("hidden",window.scrollY<500)},document.getElementById("scroll-jump")&&(document.getElementById("scroll-jump").onclick=()=>window.scrollTo({top:0,behavior:"smooth"}));const p=document.getElementById("login-form");p&&(p.onsubmit=g=>window.loginAdmin(g));const y=document.getElementById("booking-form");y&&(y.onsubmit=g=>window.submitBooking(g));const b=document.getElementById("item-form");b&&(b.onsubmit=g=>window.saveLuxuryItem(g))}function aI(){const t=JSON.parse(localStorage.getItem("luxury-settings-cache")||"{}"),e=localStorage.getItem("luxury_theme")||t.defaultTheme||"dark";document.body.setAttribute("data-theme",e);const n=document.getElementById("theme-btn");n&&(n.innerHTML=e==="dark"?'<i class="fas fa-sun"></i>':'<i class="fas fa-moon"></i>')}function Nu(){const t=window.state.lang;document.body.dir=t==="ar"?"rtl":"ltr",document.body.classList.toggle("en",t==="en");const e=sI[t];document.querySelectorAll("[data-i18n]").forEach(n=>{const i=n.getAttribute("data-i18n");e[i]&&(n.innerText=e[i])})}async function lI(){await Ay(Ui,_d);const t=["users","plates","locations","brands","agents","specs","packages","blogs","reviews","cars","ads","sales","settings","partners"],e=["bookings","notifications","logs","quickReplies"],n={};ci(j(W,".info/connected"),s=>{s.val()===!0?console.log("[Firebase] Connected to Realtime Database"):console.warn("[Firebase] Disconnected from Realtime Database")});function i(s){n[s]||(n[s]=ci(j(W,s),r=>{const o=r.val();s==="settings"?(window.state.settings=o||{},window.applySettings(o)):(window.state[s]=o?Object.entries(o).map(([a,l])=>({...l,id:a})):[],s==="cars"&&window.applyInventoryFilters(),s==="ads"&&window.renderAdsSlider(),s==="sales"&&window.renderSalesVideos(),s==="partners"&&window.renderPartners(),s==="reviews"&&window.renderPublicReviews(),window.state.user&&(window.syncAdminTables(s),window.updateStatistics())),cI()},r=>{console.warn(`Listener for ${s} failed:`,r.message),delete n[s]}))}Py(Ui,async s=>{if(window.state.user=s,s){const r=j(W,`users/${s.uid}`);ci(r,o=>{window.state.userProfile={...o.val(),id:s.uid},pl(),window.initWhatsAppServer&&window.initWhatsAppServer()}),e.forEach(i)}else window.state.userProfile=null,pl(),e.forEach(r=>{n[r]&&delete n[r]})}),t.forEach(i)}function cI(){var i,s;if(window.state.firstLoadDone)return;const t=window.state.settings,e=t==null?void 0:t.maintenanceMode,n=((i=window.state.userProfile)==null?void 0:i.role)==="admin"||((s=window.state.userProfile)==null?void 0:s.role)==="supervisor";if(e&&!n){const r=document.getElementById("luxury-splash");r&&(r.innerHTML=`
            <div class="maint-content" style="text-align:center; color:white; padding: 20px;">
                <i class="fas fa-tools" style="font-size:60px; color:var(--p-red); margin-bottom:20px;"></i>
                <h1 class="luxury-font" style="margin-bottom:10px;">الموقع تحت الصيانة</h1>
                <p style="opacity:0.8;">نعمل حالياً على تحديث المنصة لتقديم تجربة أفضل، سنعود قريباً جداً.</p>
                <div style="margin-top:30px;">
                    <button class="btn-premium btn-sm" onclick="window.openModal('admin-modal')">دخول الإدارة</button>
                </div>
            </div>
          `,r.style.opacity="1",r.classList.remove("hidden"));return}t&&Object.keys(t).length>0&&setTimeout(()=>{const r=document.getElementById("luxury-splash");r&&(r.style.opacity="0",setTimeout(()=>{r.classList.add("hidden"),r.remove()},800)),window.state.firstLoadDone=!0},1200)}function pl(){var o,a,l;const t=!!window.state.user,e=((o=window.state.userProfile)==null?void 0:o.role)==="admin",n=((a=window.state.userProfile)==null?void 0:a.role)==="supervisor";document.body.classList.toggle("is-logged-in",t),document.body.classList.toggle("is-admin",e),document.body.classList.toggle("is-supervisor",n);const i=document.getElementById("admin-login-ui"),s=document.getElementById("admin-dash-ui");i&&i.classList.toggle("hidden",t),s&&s.classList.toggle("hidden",!t);const r=document.getElementById("admin-trigger");if(r&&(r.innerText=t?"لوحة التحكم":"تسجيل الدخول"),document.querySelectorAll(".admin-only").forEach(c=>c.classList.toggle("hidden",!e&&!n)),document.querySelectorAll(".staff-only").forEach(c=>c.classList.toggle("hidden",e||n)),t){window.syncAdminTables("all"),window.updateStatistics();const c=document.getElementById("user-display-name"),d=document.getElementById("user-role-label");if(c&&(c.innerText=((l=window.state.userProfile)==null?void 0:l.name)||"المسؤول"),d){let u="قسم المبيعات والمتابعة";e?u="إدارة النظام":n&&(u="مشرف النظام"),d.innerText=u}}}window.toggleAvailability=async function(){if(!window.state.userProfile)return;const t=window.state.userProfile.isAvailable||!1;try{await Vn(j(W,`users/${window.state.user.uid}`),{isAvailable:!t}),window.state.userProfile.isAvailable=!t,window.showLuxuryToast(t?"تم تعيين الحالة: غير متاح":"أنت متاح الآن لاستلام الطلبات"),window.updateStatistics()}catch{window.showLuxuryToast("فشل تحديث الحالة","error")}};window.toggleSound=function(){window.state.soundEnabled=!window.state.soundEnabled,localStorage.setItem("luxury_sound_enabled",window.state.soundEnabled);const t=document.getElementById("sound-toggle");t&&(t.checked=window.state.soundEnabled),window.showLuxuryToast(window.state.soundEnabled?"تم تفعيل التنبيهات الصوتية":"تم كتم التنبيهات")};window.setBookingFilter=function(t,e,n="all",i=null){window.state.bookingFilter=t,window.state.bookingSubStatusFilter=n;const s=document.getElementById("filter-booking-status");s&&s.value!==t&&(s.value=t);const r=document.getElementById("filter-booking-sub-status");if(r){const o={new:["not_contacted","contacted"],waiting:["docs_received","waiting_calc","waiting_docs","waiting_signature"],inquiry:["docs_not_received"],sold:["signed","delivered"],done:["done"],cancelled:["no_response","obligations","calc_rejected","ineligible","duplicate"]},a={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"};let l=t==="all"?Object.keys(a):o[t]||[];r.innerHTML='<option value="all">جميع الحالات الفرعية</option>',l.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=a[c],r.appendChild(d)}),Array.from(r.options).some(c=>c.value===n)?r.value=n:(r.value="all",window.state.bookingSubStatusFilter="all",n="all")}document.querySelectorAll(".sub-tab.b-filter").forEach(o=>{if(o.getAttribute("onclick")&&o.getAttribute("onclick").includes(`'${t}'`)){document.querySelectorAll(".sub-tab.b-filter").forEach(l=>l.classList.remove("active")),o.classList.add("active"),document.querySelectorAll(".deep-submenu").forEach(l=>l.classList.remove("active"));const a=o.closest(".status-group");if(a){const l=a.querySelector(".deep-submenu");l&&l.classList.add("active")}}}),document.querySelectorAll(".deep-tab").forEach(o=>{o.classList.remove("active"),n!=="all"&&o.getAttribute("onclick")&&o.getAttribute("onclick").includes(`'${n}'`)&&o.classList.add("active")}),window.syncAdminTables("bookings")};window.applyInventoryFilters=function(){var y,b,g,m,w,v,T;if(!document.getElementById("cars-container"))return;const e=document.getElementById("filter-make"),n=document.getElementById("filter-year");e&&e.options.length<=1&&[...new Set(window.state.cars.map(R=>R.make))].sort().forEach(R=>{const x=document.createElement("option");x.value=R,x.textContent=R,e.appendChild(x)}),n&&n.options.length<=1&&[...new Set(window.state.cars.map(R=>R.year))].sort((R,x)=>x-R).forEach(R=>{const x=document.createElement("option");x.value=R,x.textContent=R,n.appendChild(x)});const i=(((y=document.getElementById("car-search-input"))==null?void 0:y.value)||"").toLowerCase(),s=((b=document.getElementById("filter-make"))==null?void 0:b.value)||"all",r=((g=document.getElementById("filter-type"))==null?void 0:g.value)||"all",o=((m=document.getElementById("filter-year"))==null?void 0:m.value)||"all",a=((w=document.getElementById("filter-sort"))==null?void 0:w.value)||"newest";let l=((v=window.state.cars)==null?void 0:v.filter(k=>{const R=!i||(k.make+" "+k.model).toLowerCase().includes(i),x=s==="all"||k.make===s,Q=r==="all"||k.bodyType===r,ge=o==="all"||k.year===o;return R&&x&&Q&&ge}))||[];a==="price-asc"?l.sort((k,R)=>(Number(k.price)||0)-(Number(R.price)||0)):a==="price-desc"?l.sort((k,R)=>(Number(R.price)||0)-(Number(k.price)||0)):a==="year-asc"?l.sort((k,R)=>(Number(k.year)||0)-(Number(R.year)||0)):l.sort((k,R)=>new Date(R.createdAt||0)-new Date(k.createdAt||0));const c=((T=window.state.cars)==null?void 0:T.filter(k=>k.isFeatured).slice(0,3))||[];dI(c.length>0?c:window.state.cars.slice(0,3));const d=l.length,u=window.state.inventoryPage||1,h=window.state.inventorySize||8,f=(u-1)*h,p=l.slice(f,f+h);renderCarGrid(p),uI(d,u,h)};function dI(t){const e=document.getElementById("featured-offers-container");if(!e||!t.length)return;const n=document.getElementById("featured-offers-section");n&&(n.style.display="block"),e.innerHTML=t.map(i=>`
        <div class="offer-card-v2" onclick="window.viewLuxuryCar('${i.id}')">
            <div class="offer-badge">عرض حصري</div>
            <div class="offer-img-box">
                <img src="${i.image||"logo.jpg"}" alt="${i.make}" onerror="this.src='logo.jpg'">
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
    `).join("")}function uI(t,e,n){const i=document.getElementById("pagination-wrap");if(!i)return;const s=Math.ceil(t/n);if(s<=1){i.innerHTML="";return}let r="";e>1&&(r+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${e-1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})"><i class="fas fa-chevron-right"></i> السابق</button>`);for(let o=1;o<=s;o++)r+=`<button class="p-btn ${o===e?"active":""}" onclick="window.state.inventoryPage=${o}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">${o}</button>`;e<s&&(r+=`<button class="p-btn nav-dir" onclick="window.state.inventoryPage=${e+1}; window.applyInventoryFilters(); window.scrollTo({top: document.getElementById('inventory').offsetTop - 100, behavior:'smooth'})">التالي <i class="fas fa-chevron-left"></i></button>`),i.innerHTML=r}window.renderPartners=function(){const t=document.getElementById("front-partners-grid");!t||!window.state.partners||(t.innerHTML=window.state.partners.map(e=>`
    <div class="partner-logo-v2">
        <img src="${e.logo}" alt="${e.name}" title="${e.name}">
    </div>
  `).join(""))};window.renderPublicReviews=function(){const t=document.getElementById("public-reviews-container");if(!(!t||!window.state.reviews)){if(window.state.reviews.length===0){t.innerHTML='<div class="no-results-v2"><p>لا توجد آراء عملاء حالياً</p></div>';return}t.innerHTML=window.state.reviews.map(e=>{const n=e.avatar||e.image||"",i=e.name||"عميل غير معروف",s=e.car?`<span> اشترى <span style="color:var(--p-copper); font-weight:bold;">${e.car}</span></span>`:'<span>عميل مُحقّق <i class="fas fa-check-circle"></i></span>';return`
    <div class="review-card-v2" data-aos="zoom-in">
        <div class="review-stars">
            ${'<i class="fas fa-star"></i>'.repeat(Number(e.rating||5))}
        </div>
        <p class="review-text">"${e.text||"لا يوجد تعليق"}"</p>
        <div class="review-author">
           <div class="review-author-avatar">
                ${n?`<img src="${n}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`:i.charAt(0)}
           </div>
           <div class="review-author-info" style="line-height:1.4;">
              <strong style="display:block; font-size:16px;">${i}</strong>
              <div style="font-size:12px; opacity:0.8;">${s}</div>
           </div>
        </div>
    </div>
  `}).join("")}};window.renderCarGrid=function(t){console.log("[DEBUG] Cars to be rendered:",t);const e=document.getElementById("cars-container");if(!e){console.error("[ERROR] #cars-container not found in DOM!");return}if(t.length===0){e.innerHTML='<div class="no-results-v2"><i class="fas fa-search"></i> <p>لم يتم العثور على سيارات تطابق بحثك</p></div>';return}e.innerHTML=t.map(n=>`
    <div class="car-card-premium" onclick="window.viewLuxuryCar('${n.id}')" data-aos="fade-up">
      <div class="car-img-wrap">
        <img src="${n.image||"logo.jpg"}" alt="${n.make}" onerror="this.src='logo.jpg'">
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
  `).join("")};window.viewLuxuryCar=function(t){const e=window.state.cars.find(o=>o.id===t);if(!e||!document.getElementById("details-modal"))return;let i=e.images||[];i.length===0&&e.image&&(i=[e.image]),i.length===0&&(i=["logo.jpg"]),window.normalizePhone(window.state.settings.contactSales||"0500000000"),`${e.make}${e.model}${e.year}${Number(e.price).toLocaleString()}${window.location.origin}${e.id}`;const s=`
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
  `,r=document.getElementById("details-modal-body");if(r){r.innerHTML=s,r.scrollTop=0;const o=document.getElementById("details-modal");if(o){o.scrollTop=0;const a=o.querySelector(".modal-inner");a&&(a.scrollTop=0)}window.openModal("details-modal")}window.trackCarView(t)};window.bookCar=function(t){const e=window.state.cars.find(s=>s.id===t);if(!e)return;const n=document.getElementById("b-car");n&&(n.value=`${e.make} ${e.model} ${e.year}`),window.closeModal("details-modal");const i=document.getElementById("booking");i&&(i.scrollIntoView({behavior:"smooth"}),n&&(n.focus(),n.style.borderColor="var(--p-copper)",setTimeout(()=>n.style.borderColor="",2e3)))};window.viewBookingDetails=function(t){var r;const e=(window.state.bookings||[]).find(o=>o.id===t);if(!e)return;(r=window.state.users.find(o=>o.id===e.assignedTo))!=null&&r.name,e.status==="sold"||e.status==="available"||e.status==="rejected"||e.status,e.status==="sold"||e.status;const n={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",rejected:"مرفوض",available:"متاح"},i=`
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
              <strong style="color:var(--p-copper); font-size:14px;">${n[e.status]||e.status}</strong>
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
                        ${Object.entries(n).map(([o,a])=>`<option value="${o}" ${o===(e.status||"new")?"selected":""}>${a}</option>`).join("")}
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
  `,s=document.getElementById("details-modal-body");if(s){s.innerHTML=i,s.scrollTop=0;const o=document.getElementById("details-modal");o&&(o.scrollTop=0),window.openModal("details-modal"),setTimeout(()=>{window.fetchServerWAChat&&window.fetchServerWAChat(e.waJid||e.phone,e.assignedTo||""),window.updateSubStatusOptions&&window.updateSubStatusOptions(e.status||"new",e.subStatus||"not_contacted"),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();const a=document.querySelector("emoji-picker");a&&a.addEventListener("emoji-click",l=>{const c=document.getElementById("wa-server-input");c&&(c.value+=l.detail.unicode,c.focus())})},100)}};window.updateSubStatusOptions=function(t,e=null){const n=document.getElementById("update-booking-substatus");if(!n)return;const s={new:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"}],waiting:[{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"}],inquiry:[{v:"docs_not_received",t:"لم يتم استلام الاوراق"}],sold:[{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"}],rejected:[{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]}[t]||[{v:"none",t:"-"}];n.innerHTML=s.map(r=>`<option value="${r.v}" ${r.v===e?"selected":""}>${r.t}</option>`).join("")};window.updateBookingQuickStatus=async function(t){var s,r,o;const e=(s=document.getElementById("update-booking-status"))==null?void 0:s.value,n=((r=document.getElementById("update-booking-substatus"))==null?void 0:r.value)||"",i=((o=document.getElementById("update-booking-details"))==null?void 0:o.value)||"";if(!(!e||!t))try{const a=j(W,`bookings/${t}`);await Vn(a,{status:e,subStatus:n,additionalDetails:i,updatedAt:new Date().toISOString()}),window.showLuxuryToast("تم تحديث حالة الطلب والتفاصيل بنجاح")}catch(a){console.error(a),window.showLuxuryToast("فشل تحديث الحالة","error")}};window.saveWAServerURL=async function(){var e;const t=(e=document.getElementById("wa-server-url-config"))==null?void 0:e.value;if(t){localStorage.setItem("wa_server_url",t);try{await je(j(W,"settings/waServerUrl"),t)}catch(n){console.error("Firebase save config error:",n)}window.showLuxuryToast("تم حفظ رابط السيرفر وتعميمه لجميع الموظفين بنجاح. يرجى إعادة تحميل الصفحة."),setTimeout(()=>location.reload(),1500)}};window.setLuxuryDetailImg=function(t,e){document.getElementById("active-luxury-img").src=e,document.querySelectorAll(".thumb-wrapper").forEach(n=>n.classList.remove("active")),t.classList.add("active")};window.switchLuxuryDetailImg=function(t,e){const n=window.state.cars.find(c=>c.id===t);if(!n)return;const i=n.images||[n.image||"logo.jpg"],s=document.getElementById("active-luxury-img").src;let r=i.findIndex(c=>s.includes(c));r===-1&&(r=0);let o=(r+e+i.length)%i.length;const a=i[o];document.getElementById("active-luxury-img").src=a;const l=document.querySelectorAll(".thumb-wrapper");l[o]&&(l.forEach(c=>c.classList.remove("active")),l[o].classList.add("active"))};window.openFullscreenGallery=function(t,e){const n=window.state.cars.find(r=>r.id===t);if(!n)return;const i=n.images||[n.image||"logo.jpg"],s=document.createElement("div");s.className="luxury-lightbox",s.innerHTML=`
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
    `,document.body.appendChild(s)};window.navLightbox=function(t,e){const n=window.state.cars.find(l=>l.id===t),i=n.images||[n.image||"logo.jpg"],s=document.getElementById("lb-main-img");let r=i.indexOf(s.src);r===-1&&(r=0);let o=r+e;o<0&&(o=i.length-1),o>=i.length&&(o=0),s.src=i[o];const a=document.querySelectorAll(".lb-thumb");a.forEach(l=>l.classList.remove("active")),a[o].classList.add("active")};window.trackCarView=async function(t){if(t)try{const e=j(W,`analytics/popularCars/${t}`);await so(e,n=>(n||0)+1)}catch(e){console.error("Tracking Error:",e)}};window.resetFilters=function(){["car-search-input","filter-make","filter-type","filter-year","filter-sort"].forEach(e=>{const n=document.getElementById(e);n&&(n.value=n.tagName==="SELECT"?e==="filter-sort"?"newest":"all":"")}),window.applyInventoryFilters()};window.trackVisit=async function(){try{const t=new Date().toISOString().split("T")[0];if(localStorage.getItem("visited_"+t))return;localStorage.setItem("visited_"+t,"true");const e=j(W,"analytics");await so(e,n=>{n||(n={totalVisits:0,dailyVisits:{},browsers:{},devices:{},popularCars:{}}),n.totalVisits=(n.totalVisits||0)+1,n.dailyVisits=n.dailyVisits||{},n.dailyVisits[t]=(n.dailyVisits[t]||0)+1;const i=navigator.userAgent;let s="Other";i.includes("Chrome")?s="Chrome":i.includes("Safari")?s="Safari":i.includes("Firefox")?s="Firefox":i.includes("Edge")&&(s="Edge"),n.browsers=n.browsers||{},n.browsers[s]=(n.browsers[s]||0)+1;const r=/iPhone|iPad|iPod|Android/i.test(i)?"mobile":"desktop";return n.devices=n.devices||{},n.devices[r]=(n.devices[r]||0)+1,n})}catch(t){console.error("Analytics Error:",t)}};window.loginAdmin=async function(t){var r,o;t.preventDefault();const e=(r=document.getElementById("admin-email"))==null?void 0:r.value,n=(o=document.getElementById("admin-pass"))==null?void 0:o.value,i=t.target.querySelector("button");if(!e||!n)return window.showLuxuryToast("يرجى إدخال البريد وكلمة المرور","error");const s=i.innerText;i.innerText="جاري التحقق...",i.disabled=!0;try{await Cy(Ui,e,n),window.showLuxuryToast("تم تسجيل الدخول بنجاح"),window.createLog("تسجيل دخول","نجاح تسجيل الدخول للنظام","auth"),window.closeModal("admin-modal")}catch(a){console.error(a),window.showLuxuryToast("خطأ في البيانات، يرجى المحاولة مرة أخرى","error")}finally{i.innerText=s,i.disabled=!1}};window.logout=async function(){confirm("هل أنت متأكد من تسجيل الخروج؟")&&(await window.createLog("تسجيل خروج","خرج المستخدم من النظام","auth"),await Ly(Ui),window.showLuxuryToast("تم تسجيل الخروج"))};window.applySettings=function(t){if(!t)return;const e=document.documentElement;t.primaryColor&&(e.style.setProperty("--p-red",t.primaryColor),e.style.setProperty("--p-red-glow",t.primaryColor+"66")),t.secondaryColor&&e.style.setProperty("--p-teal",t.secondaryColor),t.accentColor&&e.style.setProperty("--p-copper",t.accentColor);const n=t.logo||"logo.jpg";console.log("[DEBUG] Final Logo Source:",n),document.querySelectorAll(".logo-wrap img, .sidebar-brand img, .splash-logo img, #footer-logo-img, #nav-logo-img, #splash-logo-img").forEach(w=>{w.src=n});const i=t.nameAr||"ون كار",s=t.nameEn||"ONE CAR",r=window.state.lang==="ar"?i:s;if(document.querySelectorAll(".dynamic-name-ar").forEach(w=>w.innerText=i),document.querySelectorAll(".dynamic-name-en").forEach(w=>w.innerText=s),document.title=r+" | "+(window.state.lang==="ar"?"الفخامة في عالم السيارات":"Luxury Automotive"),t.fontFamily&&(e.style.setProperty("--font-main",t.fontFamily),document.body.style.fontFamily=t.fontFamily),t.borderRadius){e.style.setProperty("--border-radius-main",t.borderRadius);const w="dynamic-design-styles";let v=document.getElementById(w);v||(v=document.createElement("style"),v.id=w,document.head.appendChild(v)),v.innerHTML=`
      .car-card-premium, .ad-slide, .nav-premium, .modal-inner, .video-card-v2, .feature-card, .btn-premium { 
        border-radius: ${t.borderRadius} !important; 
      }
    `}const o=document.getElementById("about-text-display");o&&(o.innerText=t.aboutUs||"نقدم لكم تجربة استثنائية في عالم السيارات...");const a=document.getElementById("location-text-display");a&&(a.innerText=t.location||"الرياض - معارض القادسية");const l=document.getElementById("f-phone-admin");l&&(l.innerText=t.contactAdmin||"...");const c=document.getElementById("f-phone-sales");c&&(c.innerText=t.contactSales||"...");const d=document.getElementById("f-phone-info");d&&(d.innerText=t.contactComplaints||"...");const u=document.getElementById("f-email-display");u&&(u.innerText=t.contactEmail||"...");const h=document.getElementById("contact-location-link");h&&(h.href=t.locationUrl||"#");const f=document.getElementById("meta-title");f&&(f.innerText=`${i} | ${t.metaTitle||"الفخامة والجودة تليق بك"}`);const p=document.getElementById("meta-description");p&&p.setAttribute("content",t.metaDesc||"وجهتكم الرائدة للسيارات الفاخرة والمعتمدة.");const y={"f-insta":t.socialInsta,"f-snap":t.socialSnap,"f-twitter":t.socialTwitter};Object.entries(y).forEach(([w,v])=>{const T=document.getElementById(w);T&&(T.href=v||"#")});const b={"set-name-ar":t.nameAr||"","set-name-en":t.nameEn||"","set-color-primary":t.primaryColor||"#a11d21","set-color-secondary":t.secondaryColor||"#1c7c8c","set-color-accent":t.accentColor||"#b8860b","set-default-theme":t.defaultTheme||"dark","set-font-family":t.fontFamily||"'Cairo', sans-serif","set-border-radius":t.borderRadius||"16px","set-contact-mgmt":t.contactAdmin||"","set-contact-sales":t.contactSales||"","set-contact-complaints":t.contactComplaints||"","set-contact-email":t.contactEmail||"","set-about-text":t.aboutUs||"","set-location-link":t.locationUrl||"","set-location-text":t.location||"","set-insta-link":t.socialInsta||"","set-snap-link":t.socialSnap||"","set-twitter-link":t.socialTwitter||""};Object.entries(b).forEach(([w,v])=>{const T=document.getElementById(w);T&&(T.value=v)});const g=document.getElementById("set-maintenance-mode");g&&(g.checked=t.maintenanceMode||!1);const m=document.getElementById("logo-preview-img");m&&(m.src=n),localStorage.setItem("luxury-settings-cache",JSON.stringify(t))};window.resetToDefaultSettings=async function(){if(confirm("هل أنت متأكد من إعادة ضبط كافة الإعدادات؟ سيتم فقدان الشعارات والألوان المخصصة.")){const t={nameAr:"ون كار",nameEn:"ONE CAR",primaryColor:"#a11d21",secondaryColor:"#1c7c8c",accentColor:"#b8860b",defaultTheme:"dark",borderRadius:"16px",logo:"logo.jpg",aboutUs:"تجربة استثنائية في عالم السيارات",location:"الرياض - معارض القادسية"};await je(j(W,"settings"),t),window.showLuxuryToast("تمت إعادة الضبط بنجاح")}};window.markAllNotificationsRead=async function(){try{const t=window.state.notifications.map(e=>Vn(j(W,`notifications/${e.id}`),{read:!0}));await Promise.all(t),window.showLuxuryToast("تم تحديد الكل كمقروء")}catch(t){console.error(t)}};window.switchSettingsTab=function(t,e){document.querySelectorAll(".set-pane").forEach(i=>i.classList.add("hidden")),document.querySelectorAll(".set-tab").forEach(i=>i.classList.remove("active"));const n=document.getElementById(t);n&&n.classList.remove("hidden"),e&&e.classList.add("active")};window.previewLogo=function(t){if(t.files&&t.files[0]){const e=new FileReader;e.onload=function(n){const i=n.target.result;document.getElementById("logo-preview-img").src=i,document.getElementById("set-logo-b64").value=i},e.readAsDataURL(t.files[0])}};window.saveAppSettings=async function(){var n,i,s,r,o,a,l,c,d,u,h,f,p,y,b,g,m,w,v,T;const t=document.querySelector('button[onclick="window.saveAppSettings()"]');t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...');const e={nameAr:(n=document.getElementById("set-name-ar"))==null?void 0:n.value,nameEn:(i=document.getElementById("set-name-en"))==null?void 0:i.value,logo:((s=document.getElementById("set-logo-b64"))==null?void 0:s.value)||window.state.settings.logo||"logo.jpg",primaryColor:(r=document.getElementById("set-color-primary"))==null?void 0:r.value,secondaryColor:(o=document.getElementById("set-color-secondary"))==null?void 0:o.value,accentColor:(a=document.getElementById("set-color-accent"))==null?void 0:a.value,defaultTheme:(l=document.getElementById("set-default-theme"))==null?void 0:l.value,fontFamily:(c=document.getElementById("set-font-family"))==null?void 0:c.value,borderRadius:(d=document.getElementById("set-border-radius"))==null?void 0:d.value,contactAdmin:(u=document.getElementById("set-contact-mgmt"))==null?void 0:u.value,contactSales:(h=document.getElementById("set-contact-sales"))==null?void 0:h.value,contactComplaints:(f=document.getElementById("set-contact-complaints"))==null?void 0:f.value,contactEmail:(p=document.getElementById("set-contact-email"))==null?void 0:p.value,aboutUs:(y=document.getElementById("set-about-text"))==null?void 0:y.value,locationUrl:(b=document.getElementById("set-location-link"))==null?void 0:b.value,location:(g=document.getElementById("set-location-text"))==null?void 0:g.value,socialInsta:(m=document.getElementById("set-insta-link"))==null?void 0:m.value,socialSnap:(w=document.getElementById("set-snap-link"))==null?void 0:w.value,socialTwitter:(v=document.getElementById("set-twitter-link"))==null?void 0:v.value,maintenanceMode:((T=document.getElementById("set-maintenance-mode"))==null?void 0:T.checked)||!1,updatedAt:new Date().toISOString()};try{await je(j(W,"settings"),e),window.showLuxuryToast("تم حفظ الإعدادات بنجاح"),window.createLog("تعديل إعدادات","تحديث شامل لإعدادات الموقع والمنصة","settings")}catch{window.showLuxuryToast("فشل الحفظ، تأكد من الصلاحيات","error")}finally{t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-save"></i> حفظ التغييرات')}};window.filterUsersByRole=function(t,e){e&&(document.querySelectorAll("#users-roles-tabs .p-tab").forEach(n=>n.classList.remove("active")),e.classList.add("active")),window.state.userRoleFilter=t,window.syncAdminTables("users")};window.syncAdminTables=function(t){var s,r,o,a,l,c,d,u,h,f,p,y,b;if(t==="all"){["cars","ads","sales","bookings","users","plates","reviews","partners","brands","locations","blogs","whatsapp-monitor","quick-replies"].forEach(m=>window.syncAdminTables(m));return}if(t==="whatsapp-monitor"){window.renderWhatsAppMonitor();return}if(t==="quick-replies"||t==="quickReplies"){window.renderQuickRepliesAdmin&&window.renderQuickRepliesAdmin(),window.renderQuickRepliesBar&&window.renderQuickRepliesBar();return}const e=document.getElementById(`admin-${t}-table`);if(!e)return;let n=window.state[t]||[];const i=(((s=document.getElementById(`admin-${t}-search`))==null?void 0:s.value)||((r=document.getElementById(`${t}-search`))==null?void 0:r.value)||((o=document.getElementById(`${t.slice(0,-1)}-search`))==null?void 0:o.value)||"").toLowerCase();if(i&&(n=n.filter(g=>(g.make||g.title||g.name||g.model||g.phone||g.carRequested||g.carOrCompany||"").toLowerCase().includes(i))),t==="cars"){const g=document.getElementById("admin-filter-car-make");g&&g.options.length<=1&&window.state.cars.length>0&&[...new Set(window.state.cars.map(T=>T.make))].sort().forEach(T=>{const k=document.createElement("option");k.value=T,k.textContent=T,g.appendChild(k)});const m=((a=document.getElementById("admin-filter-car-status"))==null?void 0:a.value)||"all",w=((l=document.getElementById("admin-filter-car-make"))==null?void 0:l.value)||"all";m!=="all"&&(n=n.filter(v=>v.status===m)),w!=="all"&&(n=n.filter(v=>v.make===w))}if(t==="bookings"){const g=document.getElementById("filter-booking-staff");g&&g.options.length<=1&&window.state.users&&window.state.users.forEach(x=>{if(x.role==="admin"||x.role==="supervisor"||x.role==="staff"){const Q=document.createElement("option");Q.value=x.id,Q.textContent=x.name||x.email||"مستخدم غير محدد",g.appendChild(Q)}});const m=document.getElementById("filter-booking-sub-status");if(m&&m.options.length<=1){window.setBookingFilter(window.state.bookingFilter||"all",null,window.state.bookingSubStatusFilter||"all");return}const w=((c=document.getElementById("filter-booking-status"))==null?void 0:c.value)||window.state.bookingFilter||"all",v=((d=document.getElementById("filter-booking-sub-status"))==null?void 0:d.value)||window.state.bookingSubStatusFilter||"all",T=((u=document.getElementById("filter-booking-staff"))==null?void 0:u.value)||"all",k=((h=document.getElementById("filter-booking-type"))==null?void 0:h.value)||"all";window.state.bookingFilter=w,window.state.bookingSubStatusFilter=v,w!=="all"&&(n=n.filter(x=>{let Q=x.status||"new";return w==="cancelled"&&(Q==="rejected"||Q==="cancelled")?!0:Q===w})),v!=="all"&&(n=n.filter(x=>x.subStatus===v)),T!=="all"&&(n=n.filter(x=>x.assignedTo===T)),k!=="all"&&(n=n.filter(x=>(x.customerType||"individual")===k)),!(((f=window.state.userProfile)==null?void 0:f.role)==="admin"||((p=window.state.userProfile)==null?void 0:p.role)==="supervisor")&&window.state.user&&(n=n.filter(x=>x.assignedTo===window.state.user.uid))}if(t==="users"){const g=window.state.userRoleFilter||"all";g!=="all"&&(n=n.filter(T=>T.role===g));const m=document.getElementById("stat-users-total"),w=document.getElementById("stat-users-active"),v=document.getElementById("stat-users-admins");if(m&&(m.innerText=n.length),w){w.innerText=n.filter(k=>k.isAvailable).length;const T=w.nextElementSibling;T&&(T.innerText="متواجد حالياً")}if(v){const T=v.nextElementSibling;if(g==="all")v.innerText=n.filter(k=>k.role==="admin").length,T&&(T.innerText="مدراء النظام");else{v.innerText=n.length;const k={admin:"مدراء النظام",supervisor:"مشرفين",staff:"المندوبين"};T&&(T.innerText="إجمالي الـ "+(k[g]||""))}}}if(t==="bookings"?(((y=document.getElementById("filter-booking-sort"))==null?void 0:y.value)||"newest")==="oldest"?n.sort((m,w)=>new Date(m.createdAt||0)-new Date(w.createdAt||0)):n.sort((m,w)=>new Date(w.createdAt||0)-new Date(m.createdAt||0)):n.sort((g,m)=>new Date(m.createdAt||0)-new Date(g.createdAt||0)),n.length===0){e.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center; opacity:0.5;">لا توجد بيانات لهذه الفئة</div>';return}if(t==="users"){const g=window.state.bookings||[],m=((b=window.state.userProfile)==null?void 0:b.role)==="admin";let w=`<table class="admin-table-v2" style="width:100%; border-collapse:collapse; min-width:800px; font-size:14px;">
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
          <tbody>`;n.forEach(v=>{const T=g.filter(V=>V.assignedTo===v.id),k=T.filter(V=>V.status==="sold"||V.status==="done").length,R=T.filter(V=>V.status==="new"||V.status==="waiting"||V.status==="inquiry"||!V.status).length,x=T.filter(V=>V.status==="cancelled").length,ge={admin:"مسؤول",supervisor:"مشرف",staff:"مندوب"}[v.role]||"مندوب",At=v.image||"logo.jpg",Re=v.phone||"";let ze="";if(Re){let V=Re.replace(/\D/g,"");V=window.normalizePhone(V),ze=`<a href="https://wa.me/${V}" target="_blank" class="icon-btn-lite success" title="مراسلة واتساب"><i class="fab fa-whatsapp"></i></a>`}w+=`<tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
              <td style="padding:15px;">
                  <div style="display:flex; align-items:center; gap:12px;">
                      <div style="width:40px; height:40px; border-radius:50%; overflow:hidden; background:#222; flex-shrink:0;">
                          <img src="${At}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='logo.jpg'">
                      </div>
                      <div>
                          <strong style="display:block; font-size:15px;">${v.name||v.email}</strong>
                          ${Re?`<span style="font-size:12px; color:var(--text-dim);">${Re}</span>`:""}
                      </div>
                  </div>
              </td>
              <td style="padding:15px;"><span style="color:var(--p-copper); font-size:13px;">${ge}</span></td>
              <td style="padding:15px;"><span class="status-badge ${v.isAvailable?"online":"busy"}" style="font-size:11px;">● ${v.isAvailable?"متاح":"غير متاح"}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#00a884; font-weight:bold; font-size:15px;">${k}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:var(--p-gold); font-weight:bold; font-size:15px;">${R}</span></td>
              <td style="padding:15px; text-align:center;"><span style="color:#e02424; font-weight:bold; font-size:15px;">${x}</span></td>
              <td style="padding:15px; text-align:center;">
                  <div style="display:flex; justify-content:center; gap:8px;">
                      ${ze}
                      <button class="icon-btn-lite" onclick="window.editLuxuryItem('users', '${v.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                      ${m?`<button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('users', '${v.id}')" title="حذف"><i class="fas fa-trash"></i></button>`:""}
                  </div>
              </td>
          </tr>`}),w+="</tbody></table>",e.innerHTML=w;return}e.innerHTML=n.map(g=>hI(t,g)).join("")};function hI(t,e){var a,l,c;const n=((a=window.state.userProfile)==null?void 0:a.role)==="admin"||((l=window.state.userProfile)==null?void 0:l.role)==="supervisor",i=e.status==="sold"?"danger":e.status==="available"?"success":"warning",s=e.status==="sold"?"مباع":e.status==="available"?"متاح":"محجوز";if(t==="bookings"){const d=((c=window.state.users.find(y=>y.id===e.assignedTo))==null?void 0:c.name)||"غير محدد",u={new:"جديد",waiting:"بالانتظار",inquiry:"استفسار",sold:"مكتمل",done:"تم",cancelled:"مرفوض",rejected:"مرفوض"},h={not_contacted:"لم يتم التواصل",contacted:"تم التواصل",docs_received:"تم استلام الاوراق",waiting_calc:"انتظار رد العميل",waiting_docs:"إنتظار إكمال الاوراق",waiting_signature:"إنتظار توقيع العميل",docs_not_received:"لم يتم استلام الاوراق",signed:"تم التوقيع",delivered:"تم التسليم",done:"تم",no_response:"لم يتم رد العميل",obligations:"التزامات",calc_rejected:"رفض الحسبة",ineligible:"غير مسموح له",duplicate:"مكرر"},f=e.status==="cancelled"||e.status==="rejected"?"danger":e.status==="sold"||e.status==="done"?"success":"warning",p=e.subStatus?h[e.subStatus]||e.subStatus:"";return`
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
                    ${n?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('cars', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('cars', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
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
                    ${n?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('plates', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('plates', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `;if(t==="notifications"){const d=!!e.read;return`
            <div class="admin-item-row" style="background:${d?"rgba(255,255,255,0.01)":"rgba(28, 124, 140, 0.05)"}; padding:15px; border-radius:12px; border:1px solid ${d?"var(--glass-border)":"var(--p-teal)"}; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
                <div class="admin-item-info">
                    <div style="display:flex; align-items:center; gap:10px;">
                        ${d?"":'<span style="width:8px; height:8px; background:var(--p-teal); border-radius:50%;"></span>'}
                        <strong style="display:block; font-size:15px;">${e.title||"تنبيه بالنظام"}</strong>
                    </div>
                    <p style="font-size:13px; opacity:0.8; margin-top:4px;">${e.text||e.message||""}</p>
                    <span style="font-size:11px; opacity:0.5; margin-top:5px; display:block;"><i class="far fa-clock"></i> ${new Date(e.timestamp).toLocaleString()}</span>
                </div>
                ${n?`
                <div class="admin-actions">
                    <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('notifications', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
                `:""}
            </div>
        `}if(t==="logs")return`
            <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:10px; border-radius:10px; font-size:12px; border-bottom:1px solid rgba(255,255,255,0.05);">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <strong style="color:var(--p-teal);">${e.action}</strong>
                    <span style="opacity:0.5;">${new Date(e.timestamp).toLocaleString()}</span>
                </div>
                <p style="opacity:0.8;">${e.details}</p>
                <div style="margin-top:5px; font-size:10px; opacity:0.6;">بواسطة: ${e.user}</div>
            </div>
        `;if(t==="sales"){const d=(e.url||"").trim();let u=d.includes("youtube.com")||d.includes("youtu.be"),h=e.poster||e.image||null;if(u&&!h){let f="";try{d.includes("v=")?f=d.split("v=")[1].split("&")[0]:d.includes("youtu.be/")?f=d.split("youtu.be/")[1].split("?")[0]:d.includes("embed/")?f=d.split("embed/")[1].split("?")[0]:f=d.split("/").pop().split("?")[0]}catch{f=""}f&&(h=`https://img.youtube.com/vi/${f}/mqdefault.jpg`)}return h=h||"logo.jpg",`
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
                    ${n?`
                        <button class="icon-btn-lite" onclick="window.editLuxuryItem('sales', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                        <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('sales', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                    `:""}
                </div>
            </div>
        `}if(t==="reviews"){const d=Number(e.rating||5),u=e.text?e.text.length>60?e.text.substring(0,60)+"...":e.text:"لا يوجد نص",h=e.avatar||e.image||"";return`
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
                ${n?`
                    <button class="icon-btn-lite" onclick="window.editLuxuryItem('reviews', '${e.id}')" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="icon-btn-lite danger" onclick="window.deleteLuxuryItem('reviews', '${e.id}')" title="حذف"><i class="fas fa-trash"></i></button>
                `:""}
            </div>
        </div>
    `}const r=e.make?`${e.make} ${e.model}`:e.title||e.name||"بدون عنوان",o=e.image||e.logo||e.poster||null;return`
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
    `}window.updateStatistics=function(){var d,u,h,f;const t=document.getElementById("stat-cars-count-v2"),e=document.getElementById("stat-bookings-count-v2"),n=document.getElementById("stat-total-value-v2"),i=window.state.cars||[];let s=window.state.bookings||[];if(!(((d=window.state.userProfile)==null?void 0:d.role)==="admin"||((u=window.state.userProfile)==null?void 0:u.role)==="supervisor")&&window.state.user&&(s=s.filter(p=>p.assignedTo===window.state.user.uid)),t&&(t.innerText=i.length),e&&(e.innerText=s.length),n){const p=i.reduce((y,b)=>y+(parseFloat(b.price)||0),0);n.innerText=p.toLocaleString()+" ريال"}const o={all:s.length,new:s.filter(p=>p.status==="new"||!p.status).length,waiting:s.filter(p=>p.status==="waiting").length,inquiry:s.filter(p=>p.status==="inquiry").length,sold:s.filter(p=>p.status==="sold").length,done:s.filter(p=>p.status==="done").length,cancelled:s.filter(p=>p.status==="cancelled"||p.status==="rejected").length,sub:{not_contacted:s.filter(p=>p.subStatus==="not_contacted").length,contacted:s.filter(p=>p.subStatus==="contacted").length,docs_received:s.filter(p=>p.subStatus==="docs_received").length,waiting_calc:s.filter(p=>p.subStatus==="waiting_calc").length,waiting_docs:s.filter(p=>p.subStatus==="waiting_docs").length,waiting_signature:s.filter(p=>p.subStatus==="waiting_signature").length,docs_not_received:s.filter(p=>p.subStatus==="docs_not_received").length,signed:s.filter(p=>p.subStatus==="signed").length,delivered:s.filter(p=>p.subStatus==="delivered").length,done:s.filter(p=>p.subStatus==="done").length,no_response:s.filter(p=>p.subStatus==="no_response").length,obligations:s.filter(p=>p.subStatus==="obligations").length,calc_rejected:s.filter(p=>p.subStatus==="calc_rejected").length,ineligible:s.filter(p=>p.subStatus==="ineligible").length,duplicate:s.filter(p=>p.subStatus==="duplicate").length}};Object.entries(o).forEach(([p,y])=>{const b=document.getElementById(`count-${p}`);b&&(b.innerText=y)}),Object.entries(o.sub).forEach(([p,y])=>{const b=document.getElementById(`count-sub-${p}`);b&&(b.innerText=y)});const a=document.getElementById("bookings-badge");a&&(a.innerText=o.new,a.classList.toggle("hidden",o.new===0));const l=(h=window.state.user)==null?void 0:h.uid;if(((f=window.state.userProfile)==null?void 0:f.role)==="staff"&&l){const p=document.getElementById("staff-quick-stats");p&&p.classList.remove("hidden");const y=(window.state.bookings||[]).filter(x=>x.assignedTo===l),b=y.filter(x=>x.status==="new"||!x.status).length,g=y.length,m=y.filter(x=>x.status==="sold").length,w=g>0?Math.round(m/g*100):0,v=document.getElementById("staff-waiting-count"),T=document.getElementById("staff-total-assigned"),k=document.getElementById("staff-conversion-rate"),R=document.getElementById("availability-toggle");v&&(v.innerText=b),T&&(T.innerText=g),k&&(k.innerText=w+"%"),R&&(R.checked=window.state.userProfile.isAvailable!==!1)}};window.deleteLuxuryItem=async function(t,e){if(confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذه العملية."))try{await qc(j(W,`${t}/${e}`)),window.showLuxuryToast("تم الحذف بنجاح"),window.createLog("حذف",`حذف عنصر من ${t} (ID: ${e})`,"data")}catch{window.showLuxuryToast("فشل الحذف","error")}};window.editLuxuryItem=function(t,e){const n=(window.state[t]||[]).find(s=>s.id===e);!n||(window.state.currentEdit={type:t,id:e},!document.getElementById("item-form"))||(t==="cars"&&(window.state.carImages=[],n.image&&window.state.carImages.push({type:"url",value:n.image,isMain:!0}),n.images&&Array.isArray(n.images)&&n.images.forEach(s=>{s!==n.image&&window.state.carImages.push({type:"url",value:s,isMain:!1})})),Pu(t,n),window.setModalTitle("item-modal",`تعديل: ${n.make||n.title||t}`),window.openModal("item-modal"))};window.openCRUDModal=function(t,e=null){var s;if(window.state.currentEdit={type:t,id:e},!document.getElementById("item-form"))return;const i=e?((s=window.state[t])==null?void 0:s.find(r=>r.id===e))||{}:{};t==="cars"&&(window.state.carImages=[],i.image&&window.state.carImages.push({type:"url",value:i.image,isMain:!0}),i.images&&Array.isArray(i.images)&&i.images.forEach(r=>{r!==i.image&&window.state.carImages.push({type:"url",value:r,isMain:!1})})),Pu(t,i),window.setModalTitle("item-modal",e?`تعديل: ${t}`:`إضافة: ${t}`),window.openModal("item-modal")};function Pu(t,e={}){const n=document.getElementById("dynamic-form-fields");if(!n)return;let i=[];if(t==="cars"){const s=(window.state.brands||[]).map(r=>({v:r.name,t:r.name}));i=[{name:"make",label:"الماركة",type:"select",options:[{v:"",t:"اختر الماركة"},...s],required:!0},{name:"model",label:"الموديل",type:"text",required:!0},{name:"year",label:"السنة",type:"number",required:!0},{name:"price",label:"السعر",type:"number",required:!0},{name:"mileage",label:"الممشى (كم)",type:"number",required:!0},{name:"engine",label:"المحرك",type:"text",placeholder:"مثال: 8 سليندر، 4.0L"},{name:"gearbox",label:"ناقل الحركة",type:"select",options:[{v:"أوتوماتيك",t:"أوتوماتيك"},{v:"عادي",t:"عادي"}]},{name:"fuelType",label:"نوع الوقود",type:"select",options:[{v:"بنزين",t:"بنزين"},{v:"ديزل",t:"ديزل"},{v:"هايبرد",t:"هايبرد"},{v:"كهرباء",t:"كهرباء"}]},{name:"bodyType",label:"فئة السيارة",type:"select",options:[{v:"sedan",t:"سيدان"},{v:"suv",t:"SUV"},{v:"coupe",t:"كوبيه"},{v:"luxury",t:"فاخرة"},{v:"pickup",t:"بيك آب"}]},{name:"color",label:"اللون خارجي",type:"text"},{name:"interiorColor",label:"اللون داخلي",type:"text"},{name:"status",label:"الحالة في المخزون",type:"select",options:[{v:"available",t:"متاح"},{v:"reserved",t:"محجوز"},{v:"sold",t:"مباع"},{v:"incoming",t:"قادم قريباً"}]},{name:"isFeatured",label:"عرض في قسم المميز؟",type:"select",options:[{v:!1,t:"لا"},{v:!0,t:"نعم"}]},{name:"desc",label:"وصف إضافي ومواصفات",type:"textarea"},{name:"_image_manager",label:"صور السيارة (المعرض)",type:"custom",html:`
        <div class="f-group full-width">
          <label>إدارة صور السيارة (المعرض والصورة الرئيسية)</label>
          <div class="img-manager-v2" id="car-image-manager">
            <!-- Rendered by window.renderCarImageManager -->
          </div>
          <input type="file" id="car-file-input" multiple accept="image/*" style="display:none;" onchange="window.handleCarFileSelect(this.files)">
        </div>
      `}],setTimeout(()=>window.renderCarImageManager(),100)}else t==="ads"?i=[{name:"title",label:"العنوان",type:"text"},{name:"subtitle",label:"العنوان الفرعي",type:"text"},{name:"image",label:"رابط الصورة",type:"text"},{name:"link",label:"الرابط (اختياري)",type:"text"}]:t==="sales"?i=[{name:"title",label:"العنوان",type:"text"},{name:"description",label:"وصف قصير",type:"textarea"},{name:"url",label:"رابط الفيديو (MP4 أو YouTube)",type:"text"},{name:"poster",label:"رابط صورة الغلاف",type:"text"}]:t==="reviews"?i=[{name:"name",label:"اسم العميل",type:"text",required:!0,placeholder:"مثال: عبدالله محمد"},{name:"car",label:"السيارة المشتراة (اختياري)",type:"text",placeholder:"مثال: تويوتا كامري 2024"},{name:"rating",label:"التقييم من 5 نجوم",type:"number",required:!0,placeholder:"5"},{name:"avatar",label:"رابط صورة العميل (اختياري)",type:"text",placeholder:"https://..."},{name:"text",label:"محتوى الرأي",type:"textarea",required:!0,placeholder:"لقد كانت تجربة رائعة مع هذا المعرض..."}]:t==="partners"?i=[{name:"name",label:"اسم الشريك",type:"text"},{name:"logo",label:"رابط الشعار",type:"text"},{name:"link",label:"رابط خارجي (اختياري)",type:"text"}]:t==="brands"?i=[{name:"name",label:"اسم العلامة التجارية",type:"text"},{name:"logo",label:"رابط الشعار",type:"text"}]:t==="blogs"?i=[{name:"title",label:"عنوان المقال",type:"text"},{name:"image",label:"رابط الصورة",type:"text"},{name:"content",label:"محتوى المقال",type:"textarea"}]:t==="locations"?i=[{name:"name",label:"اسم المدينة/الدولة",type:"text"},{name:"status",label:"الحالة",type:"select",options:[{v:"active",t:"نشط"},{v:"inactive",t:"غير نشط"}]}]:t==="plates"?i=[{name:"number",label:"رقم اللوحة",type:"text"},{name:"letters",label:"حروف اللوحة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"status",label:"الحالة",type:"select",options:[{v:"available",t:"متاح"},{v:"sold",t:"مباع"}]}]:t==="specs"?i=[{name:"name",label:"اسم المواصفة",type:"text"},{name:"icon",label:"أيقونة (FontAwesome)",type:"text"}]:t==="packages"?i=[{name:"name",label:"اسم الباقة",type:"text"},{name:"price",label:"السعر",type:"number"},{name:"features",label:"المميزات (فاصلة بين كل ميزة)",type:"textarea"}]:t==="bookings"?i=[{name:"name",label:"اسم العميل",type:"text"},{name:"phone",label:"الجوال",type:"text"},{name:"carRequested",label:"السيارة المطلوبة",type:"text"},{name:"status",label:"حالة الطلب",type:"select",options:[{v:"new",t:"جديد"},{v:"waiting",t:"بالانتظار"},{v:"inquiry",t:"استفسار"},{v:"sold",t:"مكتمل"},{v:"done",t:"تم"},{v:"cancelled",t:"مرفوض"}]},{name:"subStatus",label:"الحالة التفصيلية",type:"select",options:[{v:"not_contacted",t:"لم يتم التواصل"},{v:"contacted",t:"تم التواصل"},{v:"docs_received",t:"تم استلام الاوراق"},{v:"waiting_calc",t:"انتظار رد العميل"},{v:"waiting_docs",t:"إنتظار إكمال الاوراق"},{v:"waiting_signature",t:"إنتظار توقيع العميل"},{v:"docs_not_received",t:"لم يتم استلام الاوراق"},{v:"signed",t:"تم التوقيع"},{v:"delivered",t:"تم التسليم"},{v:"done",t:"تم"},{v:"no_response",t:"لم يتم رد العميل"},{v:"obligations",t:"التزامات"},{v:"calc_rejected",t:"رفض الحسبة"},{v:"ineligible",t:"غير مسموح له"},{v:"duplicate",t:"مكرر"}]},{name:"assignedTo",label:"الموظف المسؤول",type:"select",options:[{v:"",t:"غير محدد"},...window.state.users.filter(s=>s.role==="staff").map(s=>({v:s.id,t:s.name||s.email}))]},{name:"notes",label:"ملاحظات",type:"textarea"}]:t==="users"?i=[{name:"name",label:"الاسم الكامل",type:"text"},{name:"email",label:"البريد الإلكتروني",type:"text"},{name:"role",label:"الصلاحية",type:"select",options:[{v:"staff",t:"موظف"},{v:"supervisor",t:"مشرف"},{v:"admin",t:"مدير"}]},{name:"isAvailable",label:"متاح لاستلام الطلبات؟",type:"select",options:[{v:!0,t:"نعم"},{v:!1,t:"لا"}]}]:t==="quickReplies"?i=[{name:"title",label:"عنوان الرد السريع",type:"text",required:!0,placeholder:"مثال: ترحيب بالعملاء الجدد"},{name:"content",label:"محتوى الرسالة الكامل",type:"textarea",required:!0,placeholder:"اكتب هنا نص الرسالة التي ستظهر للموظف لاستخدامها..."}]:t==="sales"?i=[{name:"title",label:"عنوان الفيديو",type:"text",required:!0,placeholder:"مثال: تسليم سيارة مرسيدس G-Class"},{name:"url",label:"رابط الفيديو (YouTube أو مباشر)",type:"text",required:!0,placeholder:"https://youtube.com/watch?v=..."},{name:"poster",label:"رابط صورة الغلاف (اختياري)",type:"text",placeholder:"https://..."},{name:"description",label:"وصف مبسط",type:"textarea",placeholder:"يسعدنا دائماً مشاركة لحظات نجاحنا..."}]:i=[{name:"name",label:"الاسم / العنوان",type:"text"},{name:"desc",label:"الوصف",type:"textarea"}];n.innerHTML=`
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
  `;t.innerHTML=n};window.reorderCarImage=function(t,e){const n=window.state.carImages,i=t+e;if(i>=0&&i<n.length){const s=n[t];n[t]=n[i],n[i]=s,window.renderCarImageManager()}};window.removeCarImage=function(t){if(t<0||t>=window.state.carImages.length)return;const e=window.state.carImages[t].isMain;window.state.carImages.splice(t,1),e&&window.state.carImages.length>0&&(window.state.carImages[0].isMain=!0),window.renderCarImageManager()};window.setCarMainImage=function(t){window.state.carImages.forEach((e,n)=>e.isMain=n===t),window.renderCarImageManager()};window.saveLuxuryItem=async function(t){t&&t.preventDefault();const e=window.state.currentEdit;if(!e)return;const{type:n,id:i}=e,s=document.getElementById("item-form");if(!s)return;const r=s.querySelector('button[type="submit"]'),o=r.innerText;r&&(r.disabled=!0,r.innerText="جاري الحفظ والمعالجة...");const a=new FormData(s),l={};a.forEach((c,d)=>{d!=="main_img_file"&&d!=="gallery_files"&&(l[d]=c)});try{if(n==="cars"){const u=[];let h="";const f=window.state.carImages||[];f.length;for(let p=0;p<f.length;p++){const y=f[p];let b="";if(y.type==="url")b=y.value;else if(y.type==="file"){const g=y.value,m=`cars/${Date.now()}_${p}_${g.name.replace(/\s/g,"_")}`,w=ev(kb,m),v=await Xw(w,g);b=await Zw(v.ref)}u.push(b),y.isMain&&(h=b)}!h&&u.length>0&&(h=u[0]),l.image=h,l.images=u}["price","year","mileage","rating","installmentPeriod"].forEach(u=>{l[u]!==void 0&&l[u]!==""&&l[u]!==null&&(l[u]=Number(l[u]))}),l.isFeatured!==void 0&&(l.isFeatured=l.isFeatured==="true"||l.isFeatured===!0),i||(l.createdAt=new Date().toISOString()),l.updatedAt=new Date().toISOString();const d=i?j(W,`${n}/${i}`):Kt(j(W,n));await(i?Vn(d,l):je(d,l)),window.showLuxuryToast(i?"تم تحديث البيانات بنجاح":"تم إضافة العنصر بنجاح"),window.closeModal("item-modal")}catch(c){console.error("[ERROR] saveLuxuryItem failed:",c),alert(`حدث خطأ أثناء الحفظ:
`+c.message+`

تلميح: تأكد من إضافة نطاق Codespace الحالي في Firebase Console.`),window.showLuxuryToast("فشل الحفظ: "+c.message,"error")}finally{r&&(r.disabled=!1,r.innerText=o)}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.renderQuickRepliesAdmin=function(){var i;const t=document.getElementById("quick-replies-list");if(!t)return;const e=(((i=document.getElementById("qr-search"))==null?void 0:i.value)||"").toLowerCase().trim(),n=(window.state.quickReplies||[]).filter(s=>(s.title||"").toLowerCase().includes(e)||(s.content||"").toLowerCase().includes(e));if(n.length===0){t.innerHTML='<div class="no-results-v2" style="grid-column:1/-1;"><p>لا توجد نتائج مطابقة لبحثك</p></div>';return}t.innerHTML=n.map(s=>`
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
    `).join("")};window.renderAdsSlider=function(){const t=document.getElementById("slider-track"),e=document.getElementById("slider-dots");if(!t)return;const n=window.state.ads||[];if(n.length===0){t.innerHTML='<div class="no-ads"></div>',e&&(e.innerHTML="");return}t.innerHTML=n.map(i=>`
        <div class="ad-slide">
            <img src="${i.image||"logo.jpg"}" class="ad-bg-img" alt="${i.title||"عرض خاص"}">
            <div class="ad-content">
                <h2 class="luxury-font">${i.title||""}</h2>
                <p>${i.subtitle||""}</p>
                ${i.link?`<a href="${i.link}" class="btn-premium"><span>اكتشف المزيد</span> <i class="fas fa-arrow-left" style="margin-right: 10px;"></i></a>`:""}
            </div>
        </div>
    `).join(""),e&&(e.innerHTML=n.map((i,s)=>`<div class="dot ${s===0?"active":""}" onclick="window.goToLuxurySlide(${s})"></div>`).join("")),window.state.sliderIndex=0,window.moveLuxurySlider(0)};window.goToLuxurySlide=function(t){window.state.sliderIndex=t,window.moveLuxurySlider(0)};window.moveLuxurySlider=function(t){var o;const e=document.getElementById("slider-track");if(!e)return;const n=((o=window.state.ads)==null?void 0:o.length)||0;if(n<=1){e.style.transform="translateX(0)";return}window.state.sliderIndex=(window.state.sliderIndex+t+n)%n;const i=window.state.sliderIndex*100,s=document.body.dir==="rtl";e.style.transform=`translateX(${s?i:-i}%)`,document.querySelectorAll(".slider-dots .dot").forEach((a,l)=>{a.classList.toggle("active",l===window.state.sliderIndex)})};window.calculateLuxuryFinancing=function(){var l,c,d;const t=Number((l=document.getElementById("calc-car-price"))==null?void 0:l.value)||0,e=Number((c=document.getElementById("calc-down-pay"))==null?void 0:c.value)||0,n=Number((d=document.getElementById("calc-years"))==null?void 0:d.value)||5,i=document.getElementById("calc-result-val");if(!i)return;const s=t-e;if(s<=0){i.innerText="0 ريال";return}const o=s*(1+.045*n),a=Math.round(o/(n*12));i.innerText=a.toLocaleString()+" ريال"};window.renderSalesVideos=function(){const t=document.getElementById("sales-container");if(!t)return;const e=window.state.sales||[];if(e.length===0){t.innerHTML='<div class="no-results-v2"><p>لا توجد مقاطع فيديو متاحة حالياً</p></div>';return}t.innerHTML=e.map(n=>{const i=(n.url||"").trim();let s=i.includes("youtube.com")||i.includes("youtu.be")||i.includes("youtube-nocookie.com"),r=i.includes("tiktok.com"),o=i.includes("instagram.com"),a=i.includes("snapchat.com"),l=n.poster||n.image||null;if(s&&!l){let c="";try{i.includes("v=")?c=i.split("v=")[1].split("&")[0]:i.includes("youtu.be/")?c=i.split("youtu.be/")[1].split("?")[0]:i.includes("embed/")?c=i.split("embed/")[1].split("?")[0]:c=i.split("/").pop().split("?")[0]}catch{c=""}c&&(l=`https://img.youtube.com/vi/${c}/hqdefault.jpg`)}return l=l||"logo.jpg",`
            <div class="video-card-v2" data-aos="zoom-in" onclick="window.openVideoLightbox('${i}')">
                <div class="video-player-wrap">
                    <div class="video-inner">
                        <img src="${l}" alt="${n.title||"Success Moment"}" onerror="this.src='logo.jpg'" style="width:100%; height:100%; object-fit:cover;">
                        <div class="v-play-overlay">
                            <div class="v-play-btn"><i class="fas fa-play"></i></div>
                        </div>
                        ${s?'<div class="v-platform-icon"><i class="fab fa-youtube"></i></div>':r?'<div class="v-platform-icon"><i class="fab fa-tiktok"></i></div>':o?'<div class="v-platform-icon"><i class="fab fa-instagram"></i></div>':a?'<div class="v-platform-icon"><i class="fab fa-snapchat"></i></div>':""}
                    </div>
                </div>
                <div class="video-info-v2">
                    <span class="v-badge-gold"><i class="fas fa-award"></i> مبيعات ناجحة</span>
                    <h3>${n.title||n.name||"لحظة تسليم"}</h3>
                    <p>${n.description||"يسعدنا دائماً مشاركة لحظات نجاحنا مع عملائنا الكرام."}</p>
                </div>
            </div>`}).join("")};window.openVideoLightbox=function(t){let e="";if(t.includes("youtube.com")||t.includes("youtu.be")){let i="";try{t.includes("v=")?i=t.split("v=")[1].split("&")[0]:t.includes("youtu.be/")?i=t.split("youtu.be/")[1].split("?")[0]:t.includes("embed/")?i=t.split("embed/")[1].split("?")[0]:i=t.split("/").pop().split("?")[0]}catch{i=""}e=`<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${i}?autoplay=1&modestbranding=1&rel=0" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`}else e=`<video controls autoplay style="width:100%; height:100%; border-radius:15px; background:#000;">
                        <source src="${t}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>`;const n=document.createElement("div");n.className="luxury-lightbox",n.id="video-lightbox",n.innerHTML=`
        <button class="lb-close" onclick="this.parentElement.remove()">&times;</button>
        <div class="lb-content animate-fade-in" style="max-width:1000px; width:95%; aspect-ratio:16/9; margin-top:0;">
            ${e}
        </div>
    `,document.body.appendChild(n)};window.toggleWAWidget=function(){const t=document.getElementById("wa-widget");t&&t.classList.toggle("hidden")};window.sendWAWidgetMsg=function(){var i;const t=document.getElementById("wa-input"),e=(i=t==null?void 0:t.value)==null?void 0:i.trim();if(!e)return;const n=window.state.settings.contactSales||"0500000000";window.open(`https://wa.me/${window.normalizePhone(n)}?text=${encodeURIComponent(e)}`,"_blank"),t&&(t.value=""),window.toggleWAWidget()};window.createLog=async function(t,e,n="general"){var i,s;try{const r=Kt(j(W,"logs"));await je(r,{user:((i=window.state.user)==null?void 0:i.email)||"Visitor",userId:((s=window.state.user)==null?void 0:s.uid)||null,action:t,details:e,category:n,timestamp:new Date().toISOString()})}catch(r){console.error("Log Error:",r)}};window.submitBooking=async function(t){var a,l,c,d,u,h,f,p,y,b,g,m,w,v,T,k,R,x,Q,ge,At,Re,ze,V,Qn;t.preventDefault();const e=t.target,n=e.querySelector('button[type="submit"]');let i=(((a=document.getElementById("b-phone-code"))==null?void 0:a.value)==="other"?(l=document.getElementById("b-phone-code-other"))==null?void 0:l.value:(c=document.getElementById("b-phone-code"))==null?void 0:c.value)||"966",s=((d=document.getElementById("b-phone"))==null?void 0:d.value)||"";i=i.replace(/\D/g,""),s=s.replace(/\D/g,""),s.startsWith("05")||s.startsWith("5")&&s.length===9||s.startsWith("9665")?(i="966",s.startsWith("05")&&(s=s.substring(1)),s.startsWith("966")&&(s=s.substring(3))):s.startsWith("07")||s.startsWith("7")&&s.length===9||s.startsWith("9677")?(i="967",s.startsWith("07")&&(s=s.substring(1)),s.startsWith("967")&&(s=s.substring(3))):(i&&s.startsWith(i)&&(s=s.substring(i.length)),i&&s.startsWith("00"+i)&&(s=s.substring(i.length+2)));const r=window.normalizePhone(i+s),o={customerType:((u=e.querySelector('[name="customer-type"]:checked'))==null?void 0:u.value)||"individual",carRequested:((h=document.getElementById("b-car"))==null?void 0:h.value)||"",name:((f=document.getElementById("b-name"))==null?void 0:f.value)||"",phone:r,age:((p=document.getElementById("b-age"))==null?void 0:p.value)||"",email:((y=document.getElementById("b-email"))==null?void 0:y.value)||"",nationality:((b=document.getElementById("b-nationality"))==null?void 0:b.value)==="مقيم"?((g=document.getElementById("b-nationality-other"))==null?void 0:g.value)||"مقيم":((m=document.getElementById("b-nationality"))==null?void 0:m.value)||"سعودي",city:((w=document.getElementById("b-city"))==null?void 0:w.value)==="أخرى"?((v=document.getElementById("b-city-other"))==null?void 0:v.value)||"أخرى":((T=document.getElementById("b-city"))==null?void 0:T.value)||"",paymentMethod:((k=e.querySelector('[name="payment-method"]:checked'))==null?void 0:k.value)||"كاش",bankName:((R=document.getElementById("b-bank-name"))==null?void 0:R.value)||"",installmentPeriod:((x=document.getElementById("b-installment-period"))==null?void 0:x.value)||"",salary:((Q=document.getElementById("b-salary"))==null?void 0:Q.value)||"",commitments:((ge=document.getElementById("b-commitments"))==null?void 0:ge.value)||"",workEntity:((At=document.getElementById("b-work-entity"))==null?void 0:At.value)||"حكومي",workStatus:((Re=document.getElementById("b-work-status"))==null?void 0:Re.value)||"معتمد",contactMethod:((ze=e.querySelector('[name="contact-method"]:checked'))==null?void 0:ze.value)||"الجوال",preferredTime:((V=e.querySelector('[name="preferred-time"]:checked'))==null?void 0:V.value)||"10am - 1pm",notes:((Qn=document.getElementById("b-notes"))==null?void 0:Qn.value)||"",status:"new",subStatus:"not_contacted",createdAt:new Date().toISOString()};n.disabled=!0,n.innerText="جاري الإرسال...";try{const an=j(W,"config/lastAssignedStaffIndex_v2"),Rt=window.state.users.filter(Nt=>Nt.role==="staff"&&Nt.isAvailable!==!1);Rt.length>0&&await so(an,Nt=>{let Pt=Nt||0;Pt>=Rt.length&&(Pt=0);const Xn=Rt[Pt];return o.assignedTo=Xn.id,(Pt+1)%Rt.length});const Jn=Kt(j(W,"bookings"));await je(Jn,o),o.assignedTo&&await Kt(j(W,"notifications"),{userId:o.assignedTo,type:"new_booking",title:"طلب جديد مسند إليك",body:`لديك طلب جديد من ${o.name} للسيارة ${o.carRequested}`,bookingId:Jn.key,read:!1,createdAt:new Date().toISOString()}),window.showLuxuryToast("تم إرسال طلبك بنجاح، سنتواصل معك قريباً"),e.reset()}catch(an){console.error(an),window.showLuxuryToast("حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً","error")}finally{n.disabled=!1,n.innerText="تأكيد طلب حجز الخدمة"}};window.fillAIInput=function(t){const e=document.getElementById("ai-chat-input");e&&(e.value=t)};window.clearAIChat=function(){const t=document.getElementById("ai-messages-area");t&&(t.innerHTML="")};window.askLuxuryAI=function(){var i;const t=document.getElementById("ai-chat-input"),e=(i=t==null?void 0:t.value)==null?void 0:i.trim();if(!e)return;Hs("user",e),t.value="";const n="ai-typing-"+Date.now();Hs("bot","جاري التفكير...",n),setTimeout(()=>{const s=document.getElementById(n);s&&s.remove();const r=fI(e);Hs("bot",r)},1e3)};function Hs(t,e,n=null){const i=document.getElementById("ai-messages-area");if(!i)return;const s=document.createElement("div");s.className=`ai-msg ${t}`,n&&(s.id=n),s.innerHTML=`
        <div class="msg-icon"><i class="fas ${t==="bot"?"fa-robot":"fa-user"}"></i></div>
        <div class="msg-content">
            <p>${e}</p>
        </div>
    `,i.appendChild(s),i.scrollTop=i.scrollHeight}function fI(t){const e=t.toLowerCase(),n=window.state.cars||[],i=window.state.bookings||[];return e.includes("قيمة")||e.includes("مخزون")?`إجمالي قيمة المخزون الحالي هو ${n.reduce((r,o)=>r+(parseFloat(o.price)||0),0).toLocaleString()} ريال سعودي لعدد ${n.length} سيارة.`:e.includes("موظف")||e.includes("أفضل")?"بناءً على البيانات الحالية، يتميز فريق المبيعات بنشاط عالٍ، والمنافسة قوية بين الموظفين لهذا الشهر.":e.includes("ملخص")||e.includes("أداء")?`حالة اليوم: يوجد ${i.filter(r=>r.status==="new"||!r.status).length} طلبات جديدة لم يتم معالجتها بعد، وإجمالي الطلبات في النظام هو ${i.length}.`:"أنا هنا لمساعدتك في إدارة المعرض. يمكنك سؤالي عن المخزون، الطلبات، أو الإحصائيات العامة."}window.renderWhatsAppMonitor=function(){var i,s;const t=document.getElementById("admin-wa-monitor-table");if(!t)return;const e=(((i=document.getElementById("wa-monitor-search"))==null?void 0:i.value)||"").toLowerCase();(s=document.getElementById("wa-monitor-filter"))!=null&&s.value;let n=(window.state.logs||[]).filter(r=>r.category==="whatsapp"||r.details.includes("WhatsApp"));if(e&&(n=n.filter(r=>r.details.toLowerCase().includes(e)||r.user.toLowerCase().includes(e))),n.length===0){t.innerHTML='<div class="no-data-admin" style="padding:40px; text-align:center;">لا توجد سجلات مراقبة حالياً</div>';return}t.innerHTML=n.map(r=>`
        <div class="admin-item-row" style="background:rgba(255,255,255,0.02); padding:15px; border-radius:12px; border:1px solid var(--glass-border); margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between;">
                <strong>${r.user}</strong>
                <span style="opacity:0.5; font-size:11px;">${new Date(r.timestamp).toLocaleString()}</span>
            </div>
            <p style="font-size:13px; margin:10px 0;">${r.details}</p>
            ${r.proofUrl?`<a href="${r.proofUrl}" target="_blank" class="btn-premium btn-sm" style="display:inline-block;">عرض الإثبات</a>`:""}
        </div>
    `).join("")};let U=null;const Yn="https://pct-soonest-bus-boats.trycloudflare.com";window.WA_SERVER_URL_OVERRIDE||localStorage.getItem("wa_server_url");window.saveWAServerURL=async function(){const t=document.getElementById("wa-server-url-config");if(!t)return;let e=t.value.trim().replace(/\/$/,"");if(!e)return window.showLuxuryToast("يرجى إدخال الرابط","error");try{await je(j(W,"settings/waServerUrl"),e),localStorage.setItem("wa_server_url",e),window.showLuxuryToast("تم حفظ الرابط وبثه للجميع، سيتم تحديث الصفحة","success"),setTimeout(()=>location.reload(),1500)}catch{window.showLuxuryToast("خطأ في الصلاحيات لرفع الرابط","error")}};window.startStaffWASession=function(){const t=document.getElementById("wa-staff-select");if(!t||!t.value)return window.showLuxuryToast("يرجى اختيار موظف للربط","error");U&&(document.getElementById("wa-server-status").innerText="يتم الآن توليد كود الاستجابة للموظف...",document.getElementById("wa-server-status").style.color="var(--text-dim)",document.getElementById("wa-qr-container").style.display="none",U.emit("start_session",{userId:t.value}))};window.logoutStaffWASession=function(){const t=document.getElementById("wa-staff-select");if(!t||!t.value)return window.showLuxuryToast("يرجى اختيار الموظف أولاً","error");confirm("هل أنت متأكد من فصل رقم الواتساب لهذا الموظف وسجل المحادثة الخاصة به من السيرفر؟")&&U&&U.emit("logout_session",{userId:t.value})};window.initWhatsAppServer=async function(){const t=document.getElementById("wa-server-url-config");let e=null;window.location.hostname.includes("app.github.dev")&&(e=`https://${window.location.hostname.replace("-5173","-3001")}`,console.log("تم اكتشاف GitHub Codespaces، استخدام الرابط التلقائي:",e));let n=null;try{const r=await vg(j(W,"settings/waServerUrl"));r.exists()&&(n=r.val(),localStorage.setItem("wa_server_url",n))}catch(r){console.error("Firebase config error:",r)}const i=e||n||localStorage.getItem("wa_server_url")||Yn;window._waServerActiveUrl=i,t&&(t.value=i);const s=document.getElementById("wa-staff-select");if(s&&window.state&&window.state.users){const r=s.value;s.innerHTML='<option value="">-- اختر الموظف --</option>',window.state.users.filter(o=>o.role==="staff"||o.role==="admin"||o.role==="supervisor").forEach(o=>{const a=o.role==="admin"?"مدير":o.role==="supervisor"?"مشرف":"موظف";s.innerHTML+=`<option value="${o.id}" ${o.id===r?"selected":""}>${o.name||o.email||"موظف"} (${a})</option>`}),s.onchange=function(){this.value&&(U&&U.emit("join_room",this.value),window.startStaffWASession())},s.value&&(U&&U.emit("join_room",s.value),window.startStaffWASession())}typeof io<"u"&&!U&&(fetch(`${i}/ping`).catch(()=>{}),U=io(i,{reconnection:!0,reconnectionAttempts:10,reconnectionDelay:2e3,transports:["polling","websocket"]}),U.on("connect_error",r=>{console.error("Connection Error:",r),r.message!=="websocket error"&&(window._waAlerted||(alert("عذراً، المتصفح لم يستطع الاتصال بخادم الواتساب. تأكد من أن الرابط يعمل في صفحة منفصلة. الخطأ: "+r.message),window._waAlerted=!0))}),U.on("connect",()=>{console.log("Connected to WhatsApp Server!");const r=document.getElementById("wa-connection-dot");r&&(r.style.background="#4de265",r.style.boxShadow="0 0 5px #4de265",r.title="متصل بالسيرفر"),window.state.user&&U.emit("join_room",window.state.user.uid),window.state.user&&window.startCurrentWASession&&setTimeout(()=>window.startCurrentWASession(),1500)}),U.on("qr",r=>{const o=document.getElementById("wa-staff-select"),a=document.getElementById("wa-server-status"),l=document.getElementById("wa-qr-container"),c=document.getElementById("wa-qr-canvas");if(o&&o.value===r.userId&&(a&&(a.innerText="في انتظار مسح كود الـ QR...",a.style.color="var(--text-color)"),l&&(l.style.display="block"),typeof QRCode<"u"&&c&&QRCode.toCanvas(c,r.qr,function(d){d&&console.error(d)})),window.state.user&&r.userId===window.state.user.uid){const d=document.getElementById("wa-my-status-title"),u=document.getElementById("wa-my-status-desc"),h=document.getElementById("wa-my-qr-container"),f=document.getElementById("wa-my-qr-canvas"),p=document.getElementById("btn-start-my-wa"),y=document.getElementById("btn-logout-my-wa");d&&(d.innerText="بانتظار مسح رمز QR..."),u&&(u.innerText="افتح واتساب على هاتفك وامسح الرمز الظاهر أدناه ليتم ربط حسابك."),h&&(h.style.display="block"),p&&(p.innerText="تحديث الرمز"),y&&(y.style.display="none"),typeof QRCode<"u"&&f&&QRCode.toCanvas(f,r.qr,{width:250,margin:2},function(b){b&&console.error(b)})}}),U.on("ready",r=>{const o=document.getElementById("wa-staff-select"),a=document.getElementById("wa-connection-dot");if(a&&(a.style.background="#4de265",a.style.boxShadow="0 0 8px #4de265",a.title="واتساب جاهز للعمل"),o&&o.value===r.userId){const l=document.getElementById("wa-server-status"),c=document.getElementById("wa-qr-container");l&&(l.innerText=r.msg,l.style.color="#00a884"),c&&(c.style.display="none")}if(window.state.user&&r.userId===window.state.user.uid){const l=document.getElementById("wa-my-status-title"),c=document.getElementById("wa-my-status-desc"),d=document.getElementById("wa-my-qr-container"),u=document.getElementById("btn-start-my-wa"),h=document.getElementById("btn-logout-my-wa");l&&(l.innerText="واتساب متصل بنجاح"),c&&(c.innerText="حسابك الآن مرتبط بالنظام، يمكنك البدء في استقبال وإرسال الرسائل للعملاء."),d&&(d.style.display="none"),u&&(u.style.display="none"),h&&(h.style.display="inline-block"),window.showLuxuryToast("تم ربط حساب واتساب الخاص بك بنجاح","success")}}),U.on("disconnected",r=>{console.log("Disconnected Event:",r);const o=document.getElementById("wa-connection-dot");o&&(o.style.background="#ff4b4b",o.style.boxShadow="0 0 5px #ff4b4b",o.title="تم قطع الاتصال بالسيرفر");const a=r.msg||"تم قطع الاتصال بالسيرفر. يرجى إعادة الربط لتفعيل خدمات الدردشة.",l=document.getElementById("wa-staff-select");if(l&&l.value===r.userId){const c=document.getElementById("wa-server-status");c&&(c.innerText=a,c.style.color="red")}if(window.state.user&&r.userId===window.state.user.uid){const c=document.getElementById("wa-my-status-title"),d=document.getElementById("wa-my-status-desc"),u=document.getElementById("btn-start-my-wa"),h=document.getElementById("btn-logout-my-wa"),f=document.getElementById("wa-my-qr-container");c&&(c.innerText="الواتساب غير متصل"),d&&(d.innerText=a),f&&(f.style.display="none"),u&&(u.style.display="inline-block",u.innerText="إعادة الربط الآن"),h&&(h.style.display="none")}}),U.on("message",async r=>{var p,y,b;console.log("Real-time WA message received:",r);const o=window.normalizePhone,a=o(r.from),l=o(window._currentWaPhone),c=document.getElementById("details-modal"),d=c&&!c.classList.contains("hidden"),u=document.getElementById("wa-connection-dot");u&&(u.style.transform="scale(1.2)",setTimeout(()=>u.style.transform="scale(1)",300));const h=window.state.bookings||[];let f=h.find(g=>g.waJid===r.from);if(f||(f=h.find(g=>{if(!g.phone)return!1;const m=window.normalizePhone(g.phone);return!a.includes("@")&&m===a}),f&&!f.waJid&&(console.log(`Smart Pinning JID ${r.from} to booking ${f.id}`),Vn(j(W,`bookings/${f.id}`),{waJid:r.from}).catch(g=>{}),f.waJid=r.from)),!f&&!r.isMe){console.log("New customer detected via WhatsApp, creating lead...");try{const g={name:"عميل جديد (واتساب)",phone:a,waJid:r.from,carRequested:"استفسار واتساب",status:"new",subStatus:"not_contacted",source:"whatsapp_inbound",assignedTo:r.userId||"",createdAt:new Date().toISOString(),notes:"تم استقبال رسالة من رقم جديد عبر الواتساب: "+r.body},m=await Kt(j(W,"bookings"),g);f={...g,id:m.key},window.showLuxuryToast("تم استقبال طلب حجز جديد تلقائياً من عميل واتساب","success")}catch(g){console.error("Failed to create automatic booking:",g)}}if(d&&l&&a===l)setTimeout(()=>{window.fetchServerWAChat(window._currentWaPhone,r.userId)},500);else{if(r.isMe)return;const g=r.userId===((p=window.state.userProfile)==null?void 0:p.id),m=((y=window.state.userProfile)==null?void 0:y.role)==="admin"||((b=window.state.userProfile)==null?void 0:b.role)==="supervisor";(g||m)&&window.showWAPushNotification&&window.showWAPushNotification(a,r.body,r.userId)}}))};window.showWAPushNotification=async function(t,e,n){let i=document.getElementById("wa-push-notifications-container");i||(i=document.createElement("div"),i.id="wa-push-notifications-container",i.style.cssText="position:fixed; bottom:30px; left:25px; z-index:999999; display:flex; flex-direction:column-reverse; gap:12px; width:340px; pointer-events:none;",document.body.appendChild(i));const r=(window.state.bookings||[]).find(f=>f.phone&&window.normalizePhone(f.phone)===window.normalizePhone(t)),o=r&&r.name?r.name:t;let a=e||"رسالة جديدة";a.length>70&&(a=a.substring(0,70)+"...");const l=document.createElement("div");l.style.cssText="background:rgba(255,255,255,0.98); border-right:4px solid #00a884; border-radius:12px; padding:12px 15px; box-shadow:0 6px 20px rgba(0,0,0,0.15); pointer-events:auto; cursor:pointer; transform:translateX(-120%); transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s, margin 0.3s; opacity:0; overflow:hidden; position:relative; direction:rtl;",l.innerHTML=`
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
    `;const c=l.querySelector(".fa-times-btn");c.onmouseover=()=>c.style.color="#e02424",c.onmouseout=()=>c.style.color="#999";const d=async()=>{var f;try{await Kt(j(W,"notifications"),{userId:n||((f=window.state.userProfile)==null?void 0:f.id)||"admin",type:"wa_message",title:"رسالة واتساب من "+o,body:a,phone:t,read:!1,createdAt:new Date().toISOString()})}catch(p){console.warn("Could not save to notifications DB",p)}};let u=setTimeout(()=>{h(),d()},1e4);const h=()=>{l.style.transform="translateX(-120%)",l.style.opacity="0",l.style.marginTop=`-${l.offsetHeight}px`,setTimeout(()=>{l.parentNode&&l.parentNode.removeChild(l)},400)};c.onclick=f=>{f.stopPropagation(),clearTimeout(u),h()},l.onclick=()=>{clearTimeout(u),h(),r?(window.viewBookingDetails(r.id),setTimeout(()=>{const f=document.getElementById("details-modal").querySelector(".dash-tab.admin-only");f&&f.click()},100)):window.showLuxuryToast("الرسالة من رقم غير مسجل في أي طلب مفتوح","info")},i.insertBefore(l,i.firstChild),requestAnimationFrame(()=>{l.style.transform="translateX(0)",l.style.opacity="1"})};window.startCurrentWASession=function(){if(!window.state.user)return;const t=()=>{U.emit("start_session",{userId:window.state.user.uid});const e=document.getElementById("wa-my-status-title"),n=document.getElementById("wa-my-status-desc");e&&(e.innerText="جاري الاتصال..."),n&&(n.innerText="يتم الآن التواصل مع خادم الواتساب لتوليد رمز الاستجابة السريعة...")};U?U.connected?t():(U.once("connect",t),U.connect()):window.initWhatsAppServer()};window.logoutCurrentWASession=function(){window.state.user&&confirm("هل أنت متأكد من تسجيل الخروج من واتساب؟ لن تتمكن من المراسلة من هنا.")&&U&&U.emit("logout_session",{userId:window.state.user.uid})};window._waMediaCache=window._waMediaCache||{};window.fetchServerWAChat=async function(t,e){var s,r,o;if(!t)return;const n=document.getElementById("wa-server-chat-box");if(!n)return;let i=(s=window.state.userProfile)==null?void 0:s.id;if(((r=window.state.userProfile)==null?void 0:r.role)==="admin"||((o=window.state.userProfile)==null?void 0:o.role)==="supervisor")if(e)i=e;else{const l=(window.state.bookings||[]).find(c=>c.phone&&window.normalizePhone(c.phone)===window.normalizePhone(t));if(l&&l.assignedTo)i=l.assignedTo;else{n.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:20px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 10px 30px rgba(0,0,0,0.1); max-width:85%;">
                        <i class="fas fa-user-slash" style="color:#00a884; font-size:32px; margin-bottom:15px; display:block;"></i>
                        هذا الحجز غير مسند لموظف.<br>
                        سجل المحادثات متاح فقط للحجوزات المسندة.
                    </div>
                </div>`;return}}window._currentWaPhone=t,(!n.hasChildNodes()||n.innerHTML.includes("fa-circle-notch")||n.innerHTML.includes("fa-comment-dots"))&&(n.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><i class="fas fa-circle-notch fa-spin" style="font-size: 30px; color: #00a884; margin-bottom: 12px;"></i><br><div style="background: rgba(255,255,255,0.9); display: inline-block; padding: 8px 16px; border-radius: 12px; font-size: 12px; color: #555; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">جاري مزامنة الرسائل...</div></div>');try{const a=window._waServerActiveUrl||Yn,l=await fetch(`${a}/api/chat/${i}/${t}`);if(l.ok){const c=await l.json();if(c.messages&&c.messages.length>0){const d=n.scrollHeight-n.scrollTop-n.clientHeight<50;n.innerHTML="";const u=document.createElement("div");u.style.cssText="text-align:center; margin:10px 0 15px;",u.innerHTML='<span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span>',n.appendChild(u),c.messages.forEach(h=>{const f=h.timestamp?new Date(h.timestamp*1e3).toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit"}):"";let p=(h.body||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");p=p.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const y=document.createElement("div");y.style.padding="6px 8px 8px 10px",y.style.maxWidth="75%",y.style.fontSize="14.5px",y.style.marginBottom="4px",y.style.position="relative",y.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",y.style.whiteSpace="pre-wrap",y.style.lineHeight="1.4",y.style.wordBreak="break-word",y.style.overflowWrap="anywhere",h.isMe?(y.style.alignSelf="flex-end",y.style.background="#d9fdd3",y.style.color="#111b21",y.style.borderRadius="12px 0 12px 12px"):(y.style.alignSelf="flex-start",y.style.background="#ffffff",y.style.color="#111b21",y.style.borderRadius="0 12px 12px 12px");let b=`<div>${p}</div>`;if(h.media)if(window._waMediaCache[h.id]&&(h.media.data=window._waMediaCache[h.id]),h.media.data===null){const m=`btn-dl-${h.id}`,w=`cont-dl-${h.id}`;let v="مرفق";h.media.mimetype.startsWith("image/")?v="صورة":h.media.mimetype.startsWith("video/")?v="فيديو":(h.media.mimetype.startsWith("audio/")||h.type==="ptt")&&(v="مقطع صوتي"),b=`<div id="${w}" style="margin-bottom:8px; display:flex; align-items:center; gap:10px; background:rgba(0,0,0,0.05); padding:10px; border-radius:8px;">
                                <i class="fas fa-file-download" style="font-size:24px; color:#54656f;"></i>
                                <div style="flex:1;">
                                    <strong style="display:block; font-size:13px;">${v} سابق</strong>
                                    <span style="font-size:11px; opacity:0.7;">${h.media.filename||"اضغط للتحميل من السيرفر"}</span>
                                </div>
                                <button id="${m}" class="btn-premium btn-sm" onclick="window.downloadWAMedia('${i}', '${t}', '${h.id}', '${w}', '${h.media.mimetype}', '${h.type}')" style="padding:4px 10px; min-width:40px;"><i class="fas fa-download"></i></button>
                            </div>`+(p?`<div>${p}</div>`:"")}else h.media.mimetype.startsWith("image/")?b=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${h.media.mimetype};base64,${h.media.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`+(p?`<div>${p}</div>`:""):h.media.mimetype.startsWith("audio/")||h.type==="ptt"?b=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${h.media.mimetype};base64,${h.media.data}" type="${h.media.mimetype}"></audio></div>`+(p?`<div style="margin-top:5px;">${p}</div>`:""):h.media.mimetype.startsWith("video/")?b=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${h.media.mimetype};base64,${h.media.data}" type="${h.media.mimetype}"></video>`+(p?`<div>${p}</div>`:""):b=`<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-file-alt" style="font-size:24px; color:#54656f;"></i> <div><strong style="display:block; font-size:13px;">ملف ${h.media.filename||"مرفق"}</strong><span style="font-size:11px; opacity:0.7;">تنزيل للعرض</span></div></div>`+(p?`<div>${p}</div>`:"");let g="";if(h.isMe){let m=h.ack!==void 0?h.ack:h.status==="read"?3:h.status==="delivered"?2:h.status==="sent"?1:void 0;m===1||m===0?g='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':m===2?g='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>':m>=3?g='<i class="fas fa-check-double" style="font-size:12px; margin-right:4px; color:#53bdeb;"></i>':g='<i class="fas fa-check" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>'}y.innerHTML=`${b} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;">
                      <span style="font-size:11px; color:#667781;">${f}</span>
                      ${g}
                    </div><div style="clear:both;"></div>`,n.appendChild(y)}),(d||n.innerHTML.includes("fa-lock"))&&setTimeout(()=>{n.scrollTo({top:n.scrollHeight,behavior:"smooth"})},100)}else n.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 30px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-comment-dots" style="color:#00a884; font-size:24px; margin-bottom:10px; display:block;"></i>لا توجد رسائل سابقة مع هذا الرقم.<br>يمكنك بدء دردشة جديدة الآن.</div></div>'}else n.innerHTML=`
                <div style="text-align:center; margin-top:auto; margin-bottom:auto;">
                    <div style="background:rgba(255,255,255,0.95); display:inline-block; padding:25px; border-radius:15px; font-size:14px; color:#555; box-shadow:0 3px 10px rgba(0,0,0,0.08);">
                        <i class="fab fa-whatsapp" style="font-size:50px; margin-bottom:15px; color:#8696a0;"></i>
                        <p style="margin-bottom:15px;">خادم واتساب غير متصل لهذا الموظف</p>
                        <button class="btn-premium btn-sm" onclick="window.closeModal('details-modal'); window.switchLuxuryTab('whatsapp-mgmt')">اذهب لإعدادات الواتساب</button>
                    </div>
                </div>
            `}catch{n.innerHTML='<div style="text-align:center; margin-top:auto; margin-bottom:auto;"><div style="background:rgba(255,255,255,0.95); display:inline-block; padding:15px 25px; border-radius:15px; font-size:13px; color:#e02424; box-shadow:0 3px 10px rgba(0,0,0,0.08);"><i class="fas fa-exclamation-triangle" style="font-size:24px; margin-bottom:10px; display:block;"></i>فشل الاتصال بالخادم. يرجى التأكد من تشغيل السيرفر.</div></div>'}};let Ne,Hi=[];window.startWARecording=async function(){window._waRecordingIntent=!0;try{const t=await navigator.mediaDevices.getUserMedia({audio:!0});if(!window._waRecordingIntent){t.getTracks().forEach(n=>n.stop());return}Ne=new MediaRecorder(t),Hi=[],window._waRecordingStartTime=Date.now(),Ne.ondataavailable=n=>{n.data.size>0&&Hi.push(n.data)},Ne.start();const e=document.getElementById("wa-mic-btn");e&&(e.style.color="red")}catch{window.showLuxuryToast("لم يتم السماح باستخدام الميكروفون","error"),window._waRecordingIntent=!1}};window.stopWARecording=function(t,e){window._waRecordingIntent&&(window._waRecordingIntent=!1,!(!Ne||Ne.state==="inactive")&&(Ne.onstop=async()=>{if(Date.now()-(window._waRecordingStartTime||Date.now())<500||Hi.length===0){Ne.stream.getTracks().forEach(a=>a.stop());const o=document.getElementById("wa-mic-btn");o&&(o.style.color="#54656f");return}const i=new Blob(Hi,{type:"audio/webm"}),s=new FileReader;s.readAsDataURL(i),s.onloadend=()=>{const o=s.result.split(",")[1];window.sendServerWAMessage(t,e,{data:o,mimetype:"audio/webm",filename:"voice_note.webm",ptt:!0},"")};const r=document.getElementById("wa-mic-btn");r&&(r.style.color="#54656f"),Ne.stream.getTracks().forEach(o=>o.stop())},Ne.stop()))};window.handleWAMediaSelect=function(t,e){const n=document.getElementById("wa-media-upload"),i=n.files&&n.files[0];if(!i)return;if(i.size>16*1024*1024){window.showLuxuryToast("حجم الملف كبير جداً، أقصى حد يسمح به الواتساب هو 16 ميجابايت","error");return}const s=new FileReader;s.onload=function(r){const o=r.target.result.split(",")[1],a=i.type||"application/octet-stream",l=i.name;let c=prompt("هل تريد إرفاق رسالة نصية مع هذا الملف؟ (اختياري)","");if(c===null){n.value="";return}window.sendServerWAMessage(t,e,{data:o,mimetype:a,filename:l},c)},s.readAsDataURL(i)};window.sendServerWAMessage=async function(t,e,n=null,i=null){const s=document.getElementById("wa-server-input");if(s&&s.disabled)return;const r=i!==null?i:s?s.value.trim():"";if(!n&&!r)return;let o=window.state.userProfile.id;window.state.userProfile.role==="admin"&&e&&(o=e),s&&i===null&&(s.value="",s.focus());const a=document.getElementById("wa-server-chat-box");if(a){(a.innerHTML.includes("fa-comment-dots")||a.innerHTML.includes("fa-circle-notch")||!a.hasChildNodes())&&(a.innerHTML='<div style="text-align:center; margin:10px 0 15px;"><span style="background:#fefed7; color:#54656f; font-size:11px; padding:6px 12px; border-radius:8px; box-shadow:0 1px 1px rgba(0,0,0,0.05); display:inline-block;"><i class="fas fa-lock" style="margin-left:4px; font-size:10px;"></i> الرسائل محمية ومسجلة عبر الخادم الداخلي</span></div>');const l=new Date().toLocaleTimeString("ar-SA",{hour:"2-digit",minute:"2-digit"});let c=(r||"").replace(/</g,"&lt;").replace(/>/g,"&gt;");c=c.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#027eb5; text-decoration:underline;">$1</a>');const d=document.createElement("div");d.style.padding="6px 8px 8px 10px",d.style.maxWidth="75%",d.style.fontSize="14.5px",d.style.marginBottom="4px",d.style.position="relative",d.style.boxShadow="0 1px 1.5px rgba(11,20,26,0.1)",d.style.whiteSpace="pre-wrap",d.style.lineHeight="1.4",d.style.wordBreak="break-word",d.style.overflowWrap="anywhere",d.style.alignSelf="flex-end",d.style.background="#d9fdd3",d.style.color="#111b21",d.style.borderRadius="12px 0 12px 12px";let u=`<div>${c}</div>`;n&&(u='<div style="margin-bottom:5px; font-size:12px; color:#555;"><i class="fas fa-paperclip"></i> تم إرسال مرفق</div>'+u);let h='<i class="fas fa-clock" style="font-size:12px; margin-right:4px; color:#c7c7c7;"></i>';d.innerHTML=`${u} <div style="display:flex; justify-content:flex-end; align-items:center; margin-top:2px; float:left; margin-left:-5px; padding-left:10px; padding-top:2px;"><span style="font-size:11px; color:#667781;">${l}</span>${h}</div><div style="clear:both;"></div>`,a.appendChild(d),setTimeout(()=>{a.scrollTo({top:a.scrollHeight,behavior:"smooth"})},50)}try{const l=window._waServerActiveUrl||Yn,c={userId:o,phone:t,message:r};n&&(c.media=n),(await fetch(`${l}/api/send`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)})).ok?setTimeout(()=>window.fetchServerWAChat(t,o),1500):(window.showLuxuryToast("الواتساب غير متصل في الإدارة، المرجو فحص الاتصال","error"),s&&i===null&&!n&&(s.value=r))}catch{window.showLuxuryToast("الخادم البرمجي مغلق أو متوقف","error"),s&&i===null&&!n&&(s.value=r)}finally{const l=document.getElementById("wa-media-upload");l&&(l.value="")}};window.openQuickReplyModal=function(){window.openCRUDModal("quickReplies")};window.editQuickReply=function(t){window.openCRUDModal("quickReplies",t)};window.addQuickReply=async function(t){window.openQuickReplyModal()};window.deleteQuickReply=async function(t,e){if(confirm("هل أنت متأكد من الحذف؟")){let n="";e&&(n=e.innerHTML,e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{await qc(j(W,`quickReplies/${t}`)),window.showLuxuryToast("تم الحذف بنجاح")}catch(i){console.error("Error deleting quick reply:",i),window.showLuxuryToast("فُقدت الصلاحية أو حدث خطأ أثناء الحذف","error"),e&&(e.disabled=!1,e.innerHTML=n)}}};window.renderQuickRepliesAdmin=function(){var i;const t=document.getElementById("quick-replies-list");if(!t)return;const e=(((i=document.getElementById("qr-search"))==null?void 0:i.value)||"").toLowerCase();let n=window.state.quickReplies||[];if(e&&(n=n.filter(s=>(s.title||"").toLowerCase().includes(e)||(s.content||"").toLowerCase().includes(e))),n.length===0){t.innerHTML=`
            <div class="no-results-v2 full-width">
                <i class="fas fa-search"></i>
                <p>${e?"لا توجد نتائج تطابق بحثك":"لا توجد نماذج ردود سريعة حالياً"}</p>
            </div>`;return}t.innerHTML=n.map(s=>`
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
    `).join("")};window._qrExpanded=!1;window.renderQuickRepliesBar=function(){const t=document.getElementById("wa-quick-replies-bar");if(!t)return;const e=window.state.quickReplies||[];if(e.length===0){t.style.display="none";return}t.style.display="flex";const n=window._qrExpanded;let i=e,s=!1;!n&&e.length>4&&(i=e.slice(0,4),s=!0);let r=i.map(o=>`
        <button onclick="window.applyQuickReply(\`${o.content.replace(/"/g,"&quot;").replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\\n/g,"\\\\n")}\`)" style="background:white; border:1px solid var(--glass-border); padding:6px 12px; border-radius:16px; font-size:12px; color:#54656f; cursor:pointer; flex-shrink:0; white-space:nowrap; transition:all 0.2s; box-shadow:0 1px 2px rgba(0,0,0,0.05);" onmouseover="this.style.background='#f0f2f5'" onmouseout="this.style.background='white'">
            ${o.title}
        </button>
    `).join("");s?r+='<button onclick="window._qrExpanded=true; window.renderQuickRepliesBar();" style="background:#00a884; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">عرض الكل <i class="fas fa-chevron-left" style="margin-right:4px;"></i></button>':n&&e.length>4&&(r+='<button onclick="window._qrExpanded=false; window.renderQuickRepliesBar();" style="background:#e02424; color:white; border:none; padding:6px 12px; border-radius:16px; font-size:12px; cursor:pointer; flex-shrink:0;">إخفاء <i class="fas fa-chevron-right" style="margin-right:4px;"></i></button>'),t.innerHTML=r};window.applyQuickReply=function(t){const e=document.getElementById("wa-server-input");e&&(e.value=t,e.focus())};window.downloadWAMedia=async function(t,e,n,i,s,r){const o=document.getElementById(i.replace("cont-dl-","btn-dl-"));o&&(o.disabled=!0,o.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const a=window._waServerActiveUrl||Yn,l=await fetch(`${a}/api/media/${t}/${e}/${n}`);if(!l.ok)throw new Error("Failed");const c=await l.json();if(!c.data)throw new Error("No data");window._waMediaCache[n]=c.data;const d=document.getElementById(i);if(!d)return;let u="";s.startsWith("image/")?u=`<div style="margin:-4px -6px 4px -8px; background:rgba(0,0,0,0.02); border-radius:10px 10px 0 0; overflow:hidden; text-align:center;"><img src="data:${s};base64,${c.data}" style="max-width:100%; max-height:220px; border-radius:8px; display:inline-block; cursor:pointer; object-fit:cover;" onclick="window.viewFullImage(this.src)"></div>`:s.startsWith("audio/")||r==="ptt"?u=`<div style="display:flex; align-items:center; gap:10px;"><div style="background:#00a884; width:40px; height:40px; border-radius:50%; display:flex; justify-content:center; align-items:center; flex-shrink:0;"><i class="fas fa-play" style="color:white; margin-right:-2px; font-size:14px;"></i></div> <audio controls style="max-width:200px; height:35px;"><source src="data:${s};base64,${c.data}" type="${s}"></audio></div>`:s.startsWith("video/")?u=`<video controls style="max-width:100%; border-radius:8px; margin-bottom:5px;"><source src="data:${s};base64,${c.data}" type="${s}"></video>`:u='<div style="background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; display:flex; align-items:center; gap:10px; margin-bottom:5px;"><i class="fas fa-check-circle" style="font-size:24px; color:#00a884;"></i> <div><strong style="display:block; font-size:13px;">تم التحميل بنجاح</strong></div></div>',d.outerHTML=u}catch{o&&(o.disabled=!1,o.innerHTML='<i class="fas fa-redo"></i>'),window.showLuxuryToast("فشل تحميل الوسائط","error")}};document.addEventListener("DOMContentLoaded",()=>{document.addEventListener("click",t=>{const e=t.target.closest(".dash-tab");e&&e.dataset.tab&&window.switchLuxuryTab(e.dataset.tab)}),setTimeout(()=>{window.initWhatsAppServer()},3e3)});window.viewFullImage=function(t){let e=document.getElementById("wa-full-image-overlay");if(!e){e=document.createElement("div"),e.id="wa-full-image-overlay",e.style.cssText="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); z-index:999999; display:flex; justify-content:center; align-items:center; opacity:0; transition:opacity 0.25s ease-in-out; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);";const i=document.createElement("div");i.innerHTML='<i class="fas fa-times"></i>',i.style.cssText="position:absolute; top:25px; right:30px; font-size:24px; color:white; cursor:pointer; padding:10px; z-index:1000000; background:rgba(255,255,255,0.1); border-radius:50%; width:45px; height:45px; display:flex; justify-content:center; align-items:center; border: 1px solid rgba(255,255,255,0.2); transition: background 0.2s;",i.onmouseover=()=>i.style.background="rgba(255,255,255,0.2)",i.onmouseout=()=>i.style.background="rgba(255,255,255,0.1)";const s=document.createElement("img");s.id="wa-full-image-element",s.style.cssText="max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 15px 40px rgba(0,0,0,0.5); object-fit:contain; transform:scale(0.85); transition:transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);",e.appendChild(i),e.appendChild(s),document.body.appendChild(e);const r=()=>{e.style.opacity="0",s.style.transform="scale(0.85)",setTimeout(()=>{e.style.display="none"},250)};i.onclick=r,e.onclick=o=>{o.target===e&&r()}}const n=document.getElementById("wa-full-image-element");n.src=t,e.style.display="flex",e.offsetWidth,e.style.opacity="1",n.style.transform="scale(1)"};
