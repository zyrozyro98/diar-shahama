import{o as Rc,_ as Jr}from"./vendor-Bg_btqvK.js";var Ja={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ac={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A=function(n,e){if(!n)throw cn(e)},cn=function(n){return new Error("Firebase Database ("+Ac.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kc=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Gd=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[i++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;e[i++]=String.fromCharCode(55296+(u>>10)),e[i++]=String.fromCharCode(56320+(u&1023))}else{const o=n[t++],a=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},Qr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,v=o>>2,m=(o&3)<<4|c>>4;let E=(c&15)<<2|d>>6,b=d&63;u||(b=64,a||(E=64)),i.push(t[v],t[m],t[E],t[b])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(kc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Gd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const m=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||c==null||d==null||m==null)throw new qd;const E=o<<2|c>>4;if(i.push(E),d!==64){const b=c<<4&240|d>>2;if(i.push(b),m!==64){const R=d<<6&192|m;i.push(R)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class qd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Pc=function(n){const e=kc(n);return Qr.encodeByteArray(e,!0)},zi=function(n){return Pc(n).replace(/\./g,"")},Ki=function(n){try{return Qr.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zd(n){return Nc(void 0,n)}function Nc(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Kd(t)||(n[t]=Nc(n[t],e[t]));return n}function Kd(n){return n!=="__proto__"}/**
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
 */function Yd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Xd=()=>Yd().__FIREBASE_DEFAULTS__,Jd=()=>{if(typeof process>"u"||typeof Ja>"u")return;const n=Ja.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Qd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ki(n[1]);return e&&JSON.parse(e)},Zr=()=>{try{return Xd()||Jd()||Qd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Oc=n=>{var e,t;return(t=(e=Zr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},eo=n=>{const e=Oc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Dc=()=>{var n;return(n=Zr())===null||n===void 0?void 0:n.config},Lc=n=>{var e;return(e=Zr())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function to(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[zi(JSON.stringify(t)),zi(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function no(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ve())}function Zd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Mc(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function xc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ef(){const n=ve();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function tf(){return Ac.NODE_ADMIN===!0}function Fc(){try{return typeof indexedDB=="object"}catch{return!1}}function Uc(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}function nf(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sf="FirebaseError";class Pe extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=sf,Object.setPrototypeOf(this,Pe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,xt.prototype.create)}}class xt{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?rf(o,i):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new Pe(s,c,i)}}function rf(n,e){return n.replace(of,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const of=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yn(n){return JSON.parse(n)}function te(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vc=function(n){let e={},t={},i={},s="";try{const o=n.split(".");e=Yn(Ki(o[0])||""),t=Yn(Ki(o[1])||""),s=o[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},af=function(n){const e=Vc(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},lf=function(n){const e=Vc(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function kt(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Pr(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Yi(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Xn(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const o=n[s],a=e[s];if(Qa(o)&&Qa(a)){if(!Xn(o,a))return!1}else if(o!==a)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Qa(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Un(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,o]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(o)}}),e}function Vn(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let m=0;m<16;m++)i[m]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let m=0;m<16;m++)i[m]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let m=16;m<80;m++){const E=i[m-3]^i[m-8]^i[m-14]^i[m-16];i[m]=(E<<1|E>>>31)&4294967295}let s=this.chain_[0],o=this.chain_[1],a=this.chain_[2],c=this.chain_[3],u=this.chain_[4],d,v;for(let m=0;m<80;m++){m<40?m<20?(d=c^o&(a^c),v=1518500249):(d=o^a^c,v=1859775393):m<60?(d=o&a|c&(o|a),v=2400959708):(d=o^a^c,v=3395469782);const E=(s<<5|s>>>27)+d+u+v+i[m]&4294967295;u=c,c=a,a=(o<<30|o>>>2)&4294967295,o=s,s=E}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const o=this.buf_;let a=this.inbuf_;for(;s<t;){if(a===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(o[a]=e.charCodeAt(s),++a,++s,a===this.blockSize){this.compress_(o),a=0;break}}else for(;s<t;)if(o[a]=e[s],++a,++s,a===this.blockSize){this.compress_(o),a=0;break}}this.inbuf_=a,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let o=24;o>=0;o-=8)e[i]=this.chain_[s]>>o&255,++i;return e}}function hf(n,e){const t=new uf(n,e);return t.subscribe.bind(t)}class uf{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");df(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=pr),s.error===void 0&&(s.error=pr),s.complete===void 0&&(s.complete=pr);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function df(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function pr(){}function Is(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const o=s-55296;i++,A(i<n.length,"Surrogate pair missing trail surrogate.");const a=n.charCodeAt(i)-56320;s=65536+(o<<10)+a}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ws=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */const pf=1e3,gf=2,_f=4*60*60*1e3,mf=.5;function Za(n,e=pf,t=gf){const i=e*Math.pow(t,n),s=Math.round(mf*i*(Math.random()-.5)*2);return Math.min(_f,i+s)}/**
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
 */function Q(n){return n&&n._delegate?n._delegate:n}class Ce{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const St="[DEFAULT]";/**
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
 */class vf{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new hn;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(If(e))try{this.getOrInitializeService({instanceIdentifier:St})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});i.resolve(o)}catch{}}}}clearInstance(e=St){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=St){return this.instances.has(e)}getOptions(e=St){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);i===c&&a.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),o=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;o.add(e),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&e(a,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:yf(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=St){return this.component?this.component.multipleInstances?e:St:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function yf(n){return n===St?void 0:n}function If(n){return n.instantiationMode==="EAGER"}/**
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
 */class wf{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new vf(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(j||(j={}));const Ef={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},Tf=j.INFO,Cf={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},Sf=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Cf[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class li{constructor(e){this.name=e,this._logLevel=Tf,this._logHandler=Sf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in j))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ef[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...e),this._logHandler(this,j.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...e),this._logHandler(this,j.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,j.INFO,...e),this._logHandler(this,j.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,j.WARN,...e),this._logHandler(this,j.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...e),this._logHandler(this,j.ERROR,...e)}}/**
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
 */class bf{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Rf(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Rf(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Nr="@firebase/app",el="0.10.13";/**
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
 */const Ze=new li("@firebase/app"),Af="@firebase/app-compat",kf="@firebase/analytics-compat",Pf="@firebase/analytics",Nf="@firebase/app-check-compat",Of="@firebase/app-check",Df="@firebase/auth",Lf="@firebase/auth-compat",Mf="@firebase/database",xf="@firebase/data-connect",Ff="@firebase/database-compat",Uf="@firebase/functions",Vf="@firebase/functions-compat",jf="@firebase/installations",Hf="@firebase/installations-compat",Bf="@firebase/messaging",Wf="@firebase/messaging-compat",$f="@firebase/performance",Gf="@firebase/performance-compat",qf="@firebase/remote-config",zf="@firebase/remote-config-compat",Kf="@firebase/storage",Yf="@firebase/storage-compat",Xf="@firebase/firestore",Jf="@firebase/vertexai-preview",Qf="@firebase/firestore-compat",Zf="firebase",ep="10.14.1";/**
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
 */const Or="[DEFAULT]",tp={[Nr]:"fire-core",[Af]:"fire-core-compat",[Pf]:"fire-analytics",[kf]:"fire-analytics-compat",[Of]:"fire-app-check",[Nf]:"fire-app-check-compat",[Df]:"fire-auth",[Lf]:"fire-auth-compat",[Mf]:"fire-rtdb",[xf]:"fire-data-connect",[Ff]:"fire-rtdb-compat",[Uf]:"fire-fn",[Vf]:"fire-fn-compat",[jf]:"fire-iid",[Hf]:"fire-iid-compat",[Bf]:"fire-fcm",[Wf]:"fire-fcm-compat",[$f]:"fire-perf",[Gf]:"fire-perf-compat",[qf]:"fire-rc",[zf]:"fire-rc-compat",[Kf]:"fire-gcs",[Yf]:"fire-gcs-compat",[Xf]:"fire-fst",[Qf]:"fire-fst-compat",[Jf]:"fire-vertex","fire-js":"fire-js",[Zf]:"fire-js-all"};/**
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
 */const Xi=new Map,np=new Map,Dr=new Map;function tl(n,e){try{n.container.addComponent(e)}catch(t){Ze.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ke(n){const e=n.name;if(Dr.has(e))return Ze.debug(`There were multiple attempts to register component ${e}.`),!1;Dr.set(e,n);for(const t of Xi.values())tl(t,n);for(const t of np.values())tl(t,n);return!0}function nt(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ze(n){return n.settings!==void 0}/**
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
 */const ip={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ft=new xt("app","Firebase",ip);/**
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
 */class sp{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ce("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ft.create("app-deleted",{appName:this._name})}}/**
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
 */const It=ep;function rp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Or,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw ft.create("bad-app-name",{appName:String(s)});if(t||(t=Dc()),!t)throw ft.create("no-options");const o=Xi.get(s);if(o){if(Xn(t,o.options)&&Xn(i,o.config))return o;throw ft.create("duplicate-app",{appName:s})}const a=new wf(s);for(const u of Dr.values())a.addComponent(u);const c=new sp(t,i,a);return Xi.set(s,c),c}function ci(n=Or){const e=Xi.get(n);if(!e&&n===Or&&Dc())return rp();if(!e)throw ft.create("no-app",{appName:n});return e}function de(n,e,t){var i;let s=(i=tp[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const o=s.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const c=[`Unable to register library "${s}" with version "${e}":`];o&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ze.warn(c.join(" "));return}ke(new Ce(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const op="firebase-heartbeat-database",ap=1,Jn="firebase-heartbeat-store";let gr=null;function jc(){return gr||(gr=Rc(op,ap,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Jn)}catch(t){console.warn(t)}}}}).catch(n=>{throw ft.create("idb-open",{originalErrorMessage:n.message})})),gr}async function lp(n){try{const t=(await jc()).transaction(Jn),i=await t.objectStore(Jn).get(Hc(n));return await t.done,i}catch(e){if(e instanceof Pe)Ze.warn(e.message);else{const t=ft.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ze.warn(t.message)}}}async function nl(n,e){try{const i=(await jc()).transaction(Jn,"readwrite");await i.objectStore(Jn).put(e,Hc(n)),await i.done}catch(t){if(t instanceof Pe)Ze.warn(t.message);else{const i=ft.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ze.warn(i.message)}}}function Hc(n){return`${n.name}!${n.options.appId}`}/**
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
 */const cp=1024,hp=30*24*60*60*1e3;class up{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new fp(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=il();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const c=new Date(a.date).valueOf();return Date.now()-c<=hp}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Ze.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=il(),{heartbeatsToSend:i,unsentEntries:s}=dp(this._heartbeatsCache.heartbeats),o=zi(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Ze.warn(t),""}}}function il(){return new Date().toISOString().substring(0,10)}function dp(n,e=cp){const t=[];let i=n.slice();for(const s of n){const o=t.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),sl(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),sl(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class fp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Fc()?Uc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await lp(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return nl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return nl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function sl(n){return zi(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function pp(n){ke(new Ce("platform-logger",e=>new bf(e),"PRIVATE")),ke(new Ce("heartbeat",e=>new up(e),"PRIVATE")),de(Nr,el,n),de(Nr,el,"esm2017"),de("fire-js","")}pp("");var gp="firebase",_p="10.14.1";/**
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
 */de(gp,_p,"app");const Bc="@firebase/installations",io="0.6.9";/**
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
 */const Wc=1e4,$c=`w:${io}`,Gc="FIS_v2",mp="https://firebaseinstallations.googleapis.com/v1",vp=60*60*1e3,yp="installations",Ip="Installations";/**
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
 */const wp={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Pt=new xt(yp,Ip,wp);function qc(n){return n instanceof Pe&&n.code.includes("request-failed")}/**
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
 */function zc({projectId:n}){return`${mp}/projects/${n}/installations`}function Kc(n){return{token:n.token,requestStatus:2,expiresIn:Tp(n.expiresIn),creationTime:Date.now()}}async function Yc(n,e){const i=(await e.json()).error;return Pt.create("request-failed",{requestName:n,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function Xc({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function Ep(n,{refreshToken:e}){const t=Xc(n);return t.append("Authorization",Cp(e)),t}async function Jc(n){const e=await n();return e.status>=500&&e.status<600?n():e}function Tp(n){return Number(n.replace("s","000"))}function Cp(n){return`${Gc} ${n}`}/**
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
 */async function Sp({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const i=zc(n),s=Xc(n),o=e.getImmediate({optional:!0});if(o){const d=await o.getHeartbeatsHeader();d&&s.append("x-firebase-client",d)}const a={fid:t,authVersion:Gc,appId:n.appId,sdkVersion:$c},c={method:"POST",headers:s,body:JSON.stringify(a)},u=await Jc(()=>fetch(i,c));if(u.ok){const d=await u.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:Kc(d.authToken)}}else throw await Yc("Create Installation",u)}/**
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
 */function Qc(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */function bp(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Rp=/^[cdef][\w-]{21}$/,Lr="";function Ap(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=kp(n);return Rp.test(t)?t:Lr}catch{return Lr}}function kp(n){return bp(n).substr(0,22)}/**
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
 */function Es(n){return`${n.appName}!${n.appId}`}/**
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
 */const Zc=new Map;function eh(n,e){const t=Es(n);th(t,e),Pp(t,e)}function th(n,e){const t=Zc.get(n);if(t)for(const i of t)i(e)}function Pp(n,e){const t=Np();t&&t.postMessage({key:n,fid:e}),Op()}let Rt=null;function Np(){return!Rt&&"BroadcastChannel"in self&&(Rt=new BroadcastChannel("[Firebase] FID Change"),Rt.onmessage=n=>{th(n.data.key,n.data.fid)}),Rt}function Op(){Zc.size===0&&Rt&&(Rt.close(),Rt=null)}/**
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
 */const Dp="firebase-installations-database",Lp=1,Nt="firebase-installations-store";let _r=null;function so(){return _r||(_r=Rc(Dp,Lp,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Nt)}}})),_r}async function Ji(n,e){const t=Es(n),s=(await so()).transaction(Nt,"readwrite"),o=s.objectStore(Nt),a=await o.get(t);return await o.put(e,t),await s.done,(!a||a.fid!==e.fid)&&eh(n,e.fid),e}async function nh(n){const e=Es(n),i=(await so()).transaction(Nt,"readwrite");await i.objectStore(Nt).delete(e),await i.done}async function Ts(n,e){const t=Es(n),s=(await so()).transaction(Nt,"readwrite"),o=s.objectStore(Nt),a=await o.get(t),c=e(a);return c===void 0?await o.delete(t):await o.put(c,t),await s.done,c&&(!a||a.fid!==c.fid)&&eh(n,c.fid),c}/**
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
 */async function ro(n){let e;const t=await Ts(n.appConfig,i=>{const s=Mp(i),o=xp(n,s);return e=o.registrationPromise,o.installationEntry});return t.fid===Lr?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function Mp(n){const e=n||{fid:Ap(),registrationStatus:0};return ih(e)}function xp(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Pt.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=Fp(n,t);return{installationEntry:t,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Up(n)}:{installationEntry:e}}async function Fp(n,e){try{const t=await Sp(n,e);return Ji(n.appConfig,t)}catch(t){throw qc(t)&&t.customData.serverCode===409?await nh(n.appConfig):await Ji(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function Up(n){let e=await rl(n.appConfig);for(;e.registrationStatus===1;)await Qc(100),e=await rl(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:i}=await ro(n);return i||t}return e}function rl(n){return Ts(n,e=>{if(!e)throw Pt.create("installation-not-found");return ih(e)})}function ih(n){return Vp(n)?{fid:n.fid,registrationStatus:0}:n}function Vp(n){return n.registrationStatus===1&&n.registrationTime+Wc<Date.now()}/**
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
 */async function jp({appConfig:n,heartbeatServiceProvider:e},t){const i=Hp(n,t),s=Ep(n,t),o=e.getImmediate({optional:!0});if(o){const d=await o.getHeartbeatsHeader();d&&s.append("x-firebase-client",d)}const a={installation:{sdkVersion:$c,appId:n.appId}},c={method:"POST",headers:s,body:JSON.stringify(a)},u=await Jc(()=>fetch(i,c));if(u.ok){const d=await u.json();return Kc(d)}else throw await Yc("Generate Auth Token",u)}function Hp(n,{fid:e}){return`${zc(n)}/${e}/authTokens:generate`}/**
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
 */async function oo(n,e=!1){let t;const i=await Ts(n.appConfig,o=>{if(!sh(o))throw Pt.create("not-registered");const a=o.authToken;if(!e&&$p(a))return o;if(a.requestStatus===1)return t=Bp(n,e),o;{if(!navigator.onLine)throw Pt.create("app-offline");const c=qp(o);return t=Wp(n,c),c}});return t?await t:i.authToken}async function Bp(n,e){let t=await ol(n.appConfig);for(;t.authToken.requestStatus===1;)await Qc(100),t=await ol(n.appConfig);const i=t.authToken;return i.requestStatus===0?oo(n,e):i}function ol(n){return Ts(n,e=>{if(!sh(e))throw Pt.create("not-registered");const t=e.authToken;return zp(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Wp(n,e){try{const t=await jp(n,e),i=Object.assign(Object.assign({},e),{authToken:t});return await Ji(n.appConfig,i),t}catch(t){if(qc(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await nh(n.appConfig);else{const i=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Ji(n.appConfig,i)}throw t}}function sh(n){return n!==void 0&&n.registrationStatus===2}function $p(n){return n.requestStatus===2&&!Gp(n)}function Gp(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+vp}function qp(n){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},n),{authToken:e})}function zp(n){return n.requestStatus===1&&n.requestTime+Wc<Date.now()}/**
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
 */async function Kp(n){const e=n,{installationEntry:t,registrationPromise:i}=await ro(e);return i?i.catch(console.error):oo(e).catch(console.error),t.fid}/**
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
 */async function Yp(n,e=!1){const t=n;return await Xp(t),(await oo(t,e)).token}async function Xp(n){const{registrationPromise:e}=await ro(n);e&&await e}/**
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
 */function Jp(n){if(!n||!n.options)throw mr("App Configuration");if(!n.name)throw mr("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw mr(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function mr(n){return Pt.create("missing-app-config-values",{valueName:n})}/**
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
 */const rh="installations",Qp="installations-internal",Zp=n=>{const e=n.getProvider("app").getImmediate(),t=Jp(e),i=nt(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},eg=n=>{const e=n.getProvider("app").getImmediate(),t=nt(e,rh).getImmediate();return{getId:()=>Kp(t),getToken:s=>Yp(t,s)}};function tg(){ke(new Ce(rh,Zp,"PUBLIC")),ke(new Ce(Qp,eg,"PRIVATE"))}tg();de(Bc,io);de(Bc,io,"esm2017");/**
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
 */const Qi="analytics",ng="firebase_id",ig="origin",sg=60*1e3,rg="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",ao="https://www.googletagmanager.com/gtag/js";/**
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
 */const Ee=new li("@firebase/analytics");/**
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
 */const og={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Te=new xt("analytics","Analytics",og);/**
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
 */function ag(n){if(!n.startsWith(ao)){const e=Te.create("invalid-gtag-resource",{gtagURL:n});return Ee.warn(e.message),""}return n}function oh(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function lg(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function cg(n,e){const t=lg("firebase-js-sdk-policy",{createScriptURL:ag}),i=document.createElement("script"),s=`${ao}?l=${n}&id=${e}`;i.src=t?t==null?void 0:t.createScriptURL(s):s,i.async=!0,document.head.appendChild(i)}function hg(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function ug(n,e,t,i,s,o){const a=i[s];try{if(a)await e[a];else{const u=(await oh(t)).find(d=>d.measurementId===s);u&&await e[u.appId]}}catch(c){Ee.error(c)}n("config",s,o)}async function dg(n,e,t,i,s){try{let o=[];if(s&&s.send_to){let a=s.send_to;Array.isArray(a)||(a=[a]);const c=await oh(t);for(const u of a){const d=c.find(m=>m.measurementId===u),v=d&&e[d.appId];if(v)o.push(v);else{o=[];break}}}o.length===0&&(o=Object.values(e)),await Promise.all(o),n("event",i,s||{})}catch(o){Ee.error(o)}}function fg(n,e,t,i){async function s(o,...a){try{if(o==="event"){const[c,u]=a;await dg(n,e,t,c,u)}else if(o==="config"){const[c,u]=a;await ug(n,e,t,i,c,u)}else if(o==="consent"){const[c,u]=a;n("consent",c,u)}else if(o==="get"){const[c,u,d]=a;n("get",c,u,d)}else if(o==="set"){const[c]=a;n("set",c)}else n(o,...a)}catch(c){Ee.error(c)}}return s}function pg(n,e,t,i,s){let o=function(...a){window[i].push(arguments)};return window[s]&&typeof window[s]=="function"&&(o=window[s]),window[s]=fg(o,n,e,t),{gtagCore:o,wrappedGtag:window[s]}}function gg(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(ao)&&t.src.includes(n))return t;return null}/**
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
 */const _g=30,mg=1e3;class vg{constructor(e={},t=mg){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const ah=new vg;function yg(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function Ig(n){var e;const{appId:t,apiKey:i}=n,s={method:"GET",headers:yg(i)},o=rg.replace("{app-id}",t),a=await fetch(o,s);if(a.status!==200&&a.status!==304){let c="";try{const u=await a.json();!((e=u.error)===null||e===void 0)&&e.message&&(c=u.error.message)}catch{}throw Te.create("config-fetch-failed",{httpStatus:a.status,responseMessage:c})}return a.json()}async function wg(n,e=ah,t){const{appId:i,apiKey:s,measurementId:o}=n.options;if(!i)throw Te.create("no-app-id");if(!s){if(o)return{measurementId:o,appId:i};throw Te.create("no-api-key")}const a=e.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new Cg;return setTimeout(async()=>{c.abort()},sg),lh({appId:i,apiKey:s,measurementId:o},a,c,e)}async function lh(n,{throttleEndTimeMillis:e,backoffCount:t},i,s=ah){var o;const{appId:a,measurementId:c}=n;try{await Eg(i,e)}catch(u){if(c)return Ee.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:a,measurementId:c};throw u}try{const u=await Ig(n);return s.deleteThrottleMetadata(a),u}catch(u){const d=u;if(!Tg(d)){if(s.deleteThrottleMetadata(a),c)return Ee.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:a,measurementId:c};throw u}const v=Number((o=d==null?void 0:d.customData)===null||o===void 0?void 0:o.httpStatus)===503?Za(t,s.intervalMillis,_g):Za(t,s.intervalMillis),m={throttleEndTimeMillis:Date.now()+v,backoffCount:t+1};return s.setThrottleMetadata(a,m),Ee.debug(`Calling attemptFetch again in ${v} millis`),lh(n,m,i,s)}}function Eg(n,e){return new Promise((t,i)=>{const s=Math.max(e-Date.now(),0),o=setTimeout(t,s);n.addEventListener(()=>{clearTimeout(o),i(Te.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Tg(n){if(!(n instanceof Pe)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class Cg{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function Sg(n,e,t,i,s){if(s&&s.global){n("event",t,i);return}else{const o=await e,a=Object.assign(Object.assign({},i),{send_to:o});n("event",t,a)}}/**
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
 */async function bg(){if(Fc())try{await Uc()}catch(n){return Ee.warn(Te.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return Ee.warn(Te.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Rg(n,e,t,i,s,o,a){var c;const u=wg(n);u.then(b=>{t[b.measurementId]=b.appId,n.options.measurementId&&b.measurementId!==n.options.measurementId&&Ee.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${b.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(b=>Ee.error(b)),e.push(u);const d=bg().then(b=>{if(b)return i.getId()}),[v,m]=await Promise.all([u,d]);gg(o)||cg(o,v.measurementId),s("js",new Date);const E=(c=a==null?void 0:a.config)!==null&&c!==void 0?c:{};return E[ig]="firebase",E.update=!0,m!=null&&(E[ng]=m),s("config",v.measurementId,E),v.measurementId}/**
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
 */class Ag{constructor(e){this.app=e}_delete(){return delete jn[this.app.options.appId],Promise.resolve()}}let jn={},al=[];const ll={};let vr="dataLayer",kg="gtag",cl,ch,hl=!1;function Pg(){const n=[];if(Mc()&&n.push("This is a browser extension environment."),nf()||n.push("Cookies are not available."),n.length>0){const e=n.map((i,s)=>`(${s+1}) ${i}`).join(" "),t=Te.create("invalid-analytics-context",{errorInfo:e});Ee.warn(t.message)}}function Ng(n,e,t){Pg();const i=n.options.appId;if(!i)throw Te.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)Ee.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Te.create("no-api-key");if(jn[i]!=null)throw Te.create("already-exists",{id:i});if(!hl){hg(vr);const{wrappedGtag:o,gtagCore:a}=pg(jn,al,ll,vr,kg);ch=o,cl=a,hl=!0}return jn[i]=Rg(n,al,ll,e,cl,vr,t),new Ag(n)}function Gw(n=ci()){n=Q(n);const e=nt(n,Qi);return e.isInitialized()?e.getImmediate():Og(n)}function Og(n,e={}){const t=nt(n,Qi);if(t.isInitialized()){const s=t.getImmediate();if(Xn(e,t.getOptions()))return s;throw Te.create("already-initialized")}return t.initialize({options:e})}function Dg(n,e,t,i){n=Q(n),Sg(ch,jn[n.app.options.appId],e,t,i).catch(s=>Ee.error(s))}const ul="@firebase/analytics",dl="0.10.8";function Lg(){ke(new Ce(Qi,(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return Ng(i,s,t)},"PUBLIC")),ke(new Ce("analytics-internal",n,"PRIVATE")),de(ul,dl),de(ul,dl,"esm2017");function n(e){try{const t=e.getProvider(Qi).getImmediate();return{logEvent:(i,s,o)=>Dg(t,i,s,o)}}catch(t){throw Te.create("interop-component-reg-failed",{reason:t})}}}Lg();var fl={};const pl="@firebase/database",gl="1.0.8";/**
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
 */let hh="";function Mg(n){hh=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),te(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Yn(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fg{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Ue(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uh=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new xg(e)}}catch{}return new Fg},At=uh("localStorage"),Ug=uh("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt=new li("@firebase/database"),dh=function(){let n=1;return function(){return n++}}(),fh=function(n){const e=ff(n),t=new cf;t.update(e);const i=t.digest();return Qr.encodeByteArray(i)},hi=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=hi.apply(null,i):typeof i=="object"?e+=te(i):e+=i,e+=" "}return e};let Hn=null,_l=!0;const Vg=function(n,e){A(!0,"Can't turn on custom loggers persistently."),Yt.logLevel=j.VERBOSE,Hn=Yt.log.bind(Yt)},oe=function(...n){if(_l===!0&&(_l=!1,Hn===null&&Ug.get("logging_enabled")===!0&&Vg()),Hn){const e=hi.apply(null,n);Hn(e)}},ui=function(n){return function(...e){oe(n,...e)}},Mr=function(...n){const e="FIREBASE INTERNAL ERROR: "+hi(...n);Yt.error(e)},et=function(...n){const e=`FIREBASE FATAL ERROR: ${hi(...n)}`;throw Yt.error(e),new Error(e)},me=function(...n){const e="FIREBASE WARNING: "+hi(...n);Yt.warn(e)},jg=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&me("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},lo=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Hg=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},en="[MIN_NAME]",Ot="[MAX_NAME]",Ft=function(n,e){if(n===e)return 0;if(n===en||e===Ot)return-1;if(e===en||n===Ot)return 1;{const t=ml(n),i=ml(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Bg=function(n,e){return n===e?0:n<e?-1:1},Ln=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+te(e))},co=function(n){if(typeof n!="object"||n===null)return te(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=te(e[i]),t+=":",t+=co(n[e[i]]);return t+="}",t},ph=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function ae(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const gh=function(n){A(!lo(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,o,a,c,u;n===0?(o=0,a=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(c=Math.min(Math.floor(Math.log(n)/Math.LN2),i),o=c+i,a=Math.round(n*Math.pow(2,t-c)-Math.pow(2,t))):(o=0,a=Math.round(n/Math.pow(2,1-i-t))));const d=[];for(u=t;u;u-=1)d.push(a%2?1:0),a=Math.floor(a/2);for(u=e;u;u-=1)d.push(o%2?1:0),o=Math.floor(o/2);d.push(s?1:0),d.reverse();const v=d.join("");let m="";for(u=0;u<64;u+=8){let E=parseInt(v.substr(u,8),2).toString(16);E.length===1&&(E="0"+E),m=m+E}return m.toLowerCase()},Wg=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},$g=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Gg(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const qg=new RegExp("^-?(0*)\\d{1,10}$"),zg=-2147483648,Kg=2147483647,ml=function(n){if(qg.test(n)){const e=Number(n);if(e>=zg&&e<=Kg)return e}return null},dn=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw me("Exception was thrown by user callback.",t),e},Math.floor(0))}},Yg=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Bn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class Xg{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){me(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jg{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(oe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',me(e)}}class Bi{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Bi.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ho="5",_h="v",mh="s",vh="r",yh="f",Ih=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,wh="ls",Eh="p",xr="ac",Th="websocket",Ch="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sh{constructor(e,t,i,s,o=!1,a="",c=!1,u=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=o,this.persistenceKey=a,this.includeNamespaceInQueryParams=c,this.isUsingEmulator=u,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=At.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&At.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Qg(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function bh(n,e,t){A(typeof e=="string","typeof type must == string"),A(typeof t=="object","typeof params must == object");let i;if(e===Th)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Ch)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Qg(n)&&(t.ns=n.namespace);const s=[];return ae(t,(o,a)=>{s.push(o+"="+a)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(){this.counters_={}}incrementCounter(e,t=1){Ue(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return zd(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr={},Ir={};function uo(n){const e=n.toString();return yr[e]||(yr[e]=new Zg),yr[e]}function e_(n,e){const t=n.toString();return Ir[t]||(Ir[t]=e()),Ir[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&dn(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vl="start",n_="close",i_="pLPCommand",s_="pRTLPCB",Rh="id",Ah="pw",kh="ser",r_="cb",o_="seg",a_="ts",l_="d",c_="dframe",Ph=1870,Nh=30,h_=Ph-Nh,u_=25e3,d_=3e4;class zt{constructor(e,t,i,s,o,a,c){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=o,this.transportSessionId=a,this.lastSessionId=c,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ui(e),this.stats_=uo(t),this.urlFn=u=>(this.appCheckToken&&(u[xr]=this.appCheckToken),bh(t,Ch,u))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new t_(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(d_)),Hg(()=>{if(this.isClosed_)return;this.scriptTagHolder=new fo((...o)=>{const[a,c,u,d,v]=o;if(this.incrementIncomingBytes_(o),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,a===vl)this.id=c,this.password=u;else if(a===n_)c?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(c,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+a)},(...o)=>{const[a,c]=o;this.incrementIncomingBytes_(o),this.myPacketOrderer.handleResponse(a,c)},()=>{this.onClosed_()},this.urlFn);const i={};i[vl]="t",i[kh]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[r_]=this.scriptTagHolder.uniqueCallbackIdentifier),i[_h]=ho,this.transportSessionId&&(i[mh]=this.transportSessionId),this.lastSessionId&&(i[wh]=this.lastSessionId),this.applicationId&&(i[Eh]=this.applicationId),this.appCheckToken&&(i[xr]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ih.test(location.hostname)&&(i[vh]=yh);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){zt.forceAllow_=!0}static forceDisallow(){zt.forceDisallow_=!0}static isAvailable(){return zt.forceAllow_?!0:!zt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Wg()&&!$g()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=te(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Pc(t),s=ph(i,h_);for(let o=0;o<s.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[o]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[c_]="t",i[Rh]=e,i[Ah]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=te(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class fo{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=dh(),window[i_+this.uniqueCallbackIdentifier]=e,window[s_+this.uniqueCallbackIdentifier]=t,this.myIFrame=fo.createIFrame_();let o="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(o='<script>document.domain="'+document.domain+'";<\/script>');const a="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(a),this.myIFrame.doc.close()}catch(c){oe("frame writing exception"),c.stack&&oe(c.stack),oe(c)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||oe("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Rh]=this.myID,e[Ah]=this.myPW,e[kh]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Nh+i.length<=Ph;){const a=this.pendingSegs.shift();i=i+"&"+o_+s+"="+a.seg+"&"+a_+s+"="+a.ts+"&"+l_+s+"="+a.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(u_)),o=()=>{clearTimeout(s),i()};this.addTag(e,o)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{oe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f_=16384,p_=45e3;let Zi=null;typeof MozWebSocket<"u"?Zi=MozWebSocket:typeof WebSocket<"u"&&(Zi=WebSocket);class Oe{constructor(e,t,i,s,o,a,c){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ui(this.connId),this.stats_=uo(t),this.connURL=Oe.connectionURL_(t,a,c,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,o){const a={};return a[_h]=ho,typeof location<"u"&&location.hostname&&Ih.test(location.hostname)&&(a[vh]=yh),t&&(a[mh]=t),i&&(a[wh]=i),s&&(a[xr]=s),o&&(a[Eh]=o),bh(e,Th,a)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,At.set("previous_websocket_failure",!0);try{let i;tf(),this.mySock=new Zi(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Oe.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Zi!==null&&!Oe.forceDisallow_}static previouslyFailed(){return At.isInMemoryStorage||At.get("previous_websocket_failure")===!0}markConnectionHealthy(){At.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Yn(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(A(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=te(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=ph(t,f_);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(p_))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Oe.responsesRequiredToBeHealthy=2;Oe.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[zt,Oe]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=Oe&&Oe.isAvailable();let i=t&&!Oe.previouslyFailed();if(e.webSocketOnly&&(t||me("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Oe];else{const s=this.transports_=[];for(const o of Qn.ALL_TRANSPORTS)o&&o.isAvailable()&&s.push(o);Qn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Qn.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_=6e4,__=5e3,m_=10*1024,v_=100*1024,wr="t",yl="d",y_="s",Il="r",I_="e",wl="o",El="a",Tl="n",Cl="p",w_="h";class E_{constructor(e,t,i,s,o,a,c,u,d,v){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=o,this.onMessage_=a,this.onReady_=c,this.onDisconnect_=u,this.onKill_=d,this.lastSessionId=v,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ui("c:"+this.id+":"),this.transportManager_=new Qn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Bn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>v_?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>m_?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(wr in e){const t=e[wr];t===El?this.upgradeIfSecondaryHealthy_():t===Il?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===wl&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Ln("t",e),i=Ln("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Cl,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:El,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Tl,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Ln("t",e),i=Ln("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Ln(wr,e);if(yl in e){const i=e[yl];if(t===w_){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Tl){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===y_?this.onConnectionShutdown_(i):t===Il?this.onReset_(i):t===I_?Mr("Server Error: "+i):t===wl?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Mr("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),ho!==i&&me("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Bn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(g_))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Bn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(__))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Cl,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(At.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(e){this.allowedEvents_=e,this.listeners_={},A(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let o=0;o<s.length;o++)if(s[o].callback===t&&(!i||i===s[o].context)){s.splice(o,1);return}}validateEventType_(e){A(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es extends Dh{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!no()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new es}getInitialEvent(e){return A(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl=32,bl=768;class H{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function V(){return new H("")}function L(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function mt(n){return n.pieces_.length-n.pieceNum_}function G(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new H(n.pieces_,e)}function po(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function T_(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Zn(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Lh(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new H(e,0)}function Y(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof H)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new H(t,0)}function x(n){return n.pieceNum_>=n.pieces_.length}function _e(n,e){const t=L(n),i=L(e);if(t===null)return e;if(t===i)return _e(G(n),G(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function C_(n,e){const t=Zn(n,0),i=Zn(e,0);for(let s=0;s<t.length&&s<i.length;s++){const o=Ft(t[s],i[s]);if(o!==0)return o}return t.length===i.length?0:t.length<i.length?-1:1}function go(n,e){if(mt(n)!==mt(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Ae(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(mt(n)>mt(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class S_{constructor(e,t){this.errorPrefix_=t,this.parts_=Zn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=ws(this.parts_[i]);Mh(this)}}function b_(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=ws(e),Mh(n)}function R_(n){const e=n.parts_.pop();n.byteLength_-=ws(e),n.parts_.length>0&&(n.byteLength_-=1)}function Mh(n){if(n.byteLength_>bl)throw new Error(n.errorPrefix_+"has a key path longer than "+bl+" bytes ("+n.byteLength_+").");if(n.parts_.length>Sl)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Sl+") or object contains a cycle "+bt(n))}function bt(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o extends Dh{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new _o}getInitialEvent(e){return A(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn=1e3,A_=60*5*1e3,Rl=30*1e3,k_=1.3,P_=3e4,N_="server_kill",Al=3;class Qe extends Oh{constructor(e,t,i,s,o,a,c,u){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=o,this.authTokenProvider_=a,this.appCheckTokenProvider_=c,this.authOverride_=u,this.id=Qe.nextPersistentConnectionId_++,this.log_=ui("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Mn,this.maxReconnectDelay_=A_,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");_o.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&es.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,o={r:s,a:e,b:t};this.log_(te(o)),A(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(o),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new hn,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:a=>{const c=a.d;a.s==="ok"?t.resolve(c):t.reject(c)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const o=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(o),t.promise}listen(e,t,i,s){this.initConnection_();const o=e._queryIdentifier,a=e._path.toString();this.log_("Listen called for "+a+" "+o),this.listens.has(a)||this.listens.set(a,new Map),A(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),A(!this.listens.get(a).has(o),"listen() called twice for same path/queryId.");const c={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(a).set(o,c),this.connected_&&this.sendListen_(c)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const o={p:i},a="q";e.tag&&(o.q=t._queryObject,o.t=e.tag),o.h=e.hashFn(),this.sendRequest(a,o,c=>{const u=c.d,d=c.s;Qe.warnOnListenWarnings_(u,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",c),d!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(d,u))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Ue(e,"w")){const i=kt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',o=t._path.toString();me(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${o} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||lf(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Rl)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=af(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const o=s.s,a=s.d||"error";this.authToken_===e&&(o==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(o,a))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),A(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const o={p:e},a="n";s&&(o.q=i,o.t=s),this.sendRequest(a,o)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const o={p:t,d:i};this.log_("onDisconnect "+e,o),this.sendRequest(e,o,a=>{s&&setTimeout(()=>{s(a.s,a.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,o){this.initConnection_();const a={p:t,d:i};o!==void 0&&(a.h=o),this.outstandingPuts_.push({action:e,request:a,onComplete:s}),this.outstandingPutCount_++;const c=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(c):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,o=>{this.log_(t+" response",o),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(o.s,o.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const o=i.d;this.log_("reportStats","Error sending stats: "+o)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+te(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Mr("Unrecognized action received from server: "+te(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){A(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Mn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Mn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>P_&&(this.reconnectDelay_=Mn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*k_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Qe.nextConnectionId_++,o=this.lastSessionId;let a=!1,c=null;const u=function(){c?c.close():(a=!0,i())},d=function(m){A(c,"sendRequest call when we're not connected not allowed."),c.sendRequest(m)};this.realtime_={close:u,sendRequest:d};const v=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[m,E]=await Promise.all([this.authTokenProvider_.getToken(v),this.appCheckTokenProvider_.getToken(v)]);a?oe("getToken() completed but was canceled"):(oe("getToken() completed. Creating connection."),this.authToken_=m&&m.accessToken,this.appCheckToken_=E&&E.token,c=new E_(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,b=>{me(b+" ("+this.repoInfo_.toString()+")"),this.interrupt(N_)},o))}catch(m){this.log_("Failed to get token: "+m),a||(this.repoInfo_.nodeAdmin&&me(m),u())}}}interrupt(e){oe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){oe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Pr(this.interruptReasons_)&&(this.reconnectDelay_=Mn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(o=>co(o)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new H(e).toString();let s;if(this.listens.has(i)){const o=this.listens.get(i);s=o.get(t),o.delete(t),o.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){oe("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Al&&(this.reconnectDelay_=Rl,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){oe("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Al&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+hh.replace(/\./g,"-")]=1,no()?e["framework.cordova"]=1:xc()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=es.getInstance().currentlyOnline();return Pr(this.interruptReasons_)&&e}}Qe.nextPersistentConnectionId_=0;Qe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new M(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new M(en,e),s=new M(en,t);return this.compare(i,s)!==0}minPost(){return M.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fi;class xh extends Cs{static get __EMPTY_NODE(){return Fi}static set __EMPTY_NODE(e){Fi=e}compare(e,t){return Ft(e.name,t.name)}isDefinedOn(e){throw cn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return M.MIN}maxPost(){return new M(Ot,Fi)}makePost(e,t){return A(typeof e=="string","KeyIndex indexValue must always be a string."),new M(e,Fi)}toString(){return".key"}}const Xt=new xh;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{constructor(e,t,i,s,o=null){this.isReverse_=s,this.resultGenerator_=o,this.nodeStack_=[];let a=1;for(;!e.isEmpty();)if(e=e,a=t?i(e.key,t):1,s&&(a*=-1),a<0)this.isReverse_?e=e.left:e=e.right;else if(a===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class se{constructor(e,t,i,s,o){this.key=e,this.value=t,this.color=i??se.RED,this.left=s??we.EMPTY_NODE,this.right=o??we.EMPTY_NODE}copy(e,t,i,s,o){return new se(e??this.key,t??this.value,i??this.color,s??this.left,o??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const o=i(e,s.key);return o<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):o===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return we.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return we.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}se.RED=!0;se.BLACK=!1;class O_{copy(e,t,i,s,o){return this}insert(e,t,i){return new se(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class we{constructor(e,t=we.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new we(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,se.BLACK,null,null))}remove(e){return new we(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,se.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ui(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Ui(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Ui(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Ui(this.root_,null,this.comparator_,!0,e)}}we.EMPTY_NODE=new O_;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(n,e){return Ft(n.name,e.name)}function mo(n,e){return Ft(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fr;function L_(n){Fr=n}const Fh=function(n){return typeof n=="number"?"number:"+gh(n):"string:"+n},Uh=function(n){if(n.isLeafNode()){const e=n.val();A(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ue(e,".sv"),"Priority must be a string or number.")}else A(n===Fr||n.isEmpty(),"priority of unexpected type.");A(n===Fr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kl;class ie{constructor(e,t=ie.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,A(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Uh(this.priorityNode_)}static set __childrenNodeConstructor(e){kl=e}static get __childrenNodeConstructor(){return kl}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ie(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ie.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return x(e)?this:L(e)===".priority"?this.priorityNode_:ie.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:ie.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=L(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(A(i!==".priority"||mt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,ie.__childrenNodeConstructor.EMPTY_NODE.updateChild(G(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Fh(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=gh(this.value_):e+=this.value_,this.lazyHash_=fh(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ie.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ie.__childrenNodeConstructor?-1:(A(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=ie.VALUE_TYPE_ORDER.indexOf(t),o=ie.VALUE_TYPE_ORDER.indexOf(i);return A(s>=0,"Unknown leaf type: "+t),A(o>=0,"Unknown leaf type: "+i),s===o?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:o-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}ie.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vh,jh;function M_(n){Vh=n}function x_(n){jh=n}class F_ extends Cs{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),o=i.compareTo(s);return o===0?Ft(e.name,t.name):o}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return M.MIN}maxPost(){return new M(Ot,new ie("[PRIORITY-POST]",jh))}makePost(e,t){const i=Vh(e);return new M(t,new ie("[PRIORITY-POST]",i))}toString(){return".priority"}}const K=new F_;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U_=Math.log(2);class V_{constructor(e){const t=o=>parseInt(Math.log(o)/U_,10),i=o=>parseInt(Array(o+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const ts=function(n,e,t,i){n.sort(e);const s=function(u,d){const v=d-u;let m,E;if(v===0)return null;if(v===1)return m=n[u],E=t?t(m):m,new se(E,m.node,se.BLACK,null,null);{const b=parseInt(v/2,10)+u,R=s(u,b),N=s(b+1,d);return m=n[b],E=t?t(m):m,new se(E,m.node,se.BLACK,R,N)}},o=function(u){let d=null,v=null,m=n.length;const E=function(R,N){const P=m-R,X=m;m-=R;const Z=s(P+1,X),B=n[P],q=t?t(B):B;b(new se(q,B.node,N,null,Z))},b=function(R){d?(d.left=R,d=R):(v=R,d=R)};for(let R=0;R<u.count;++R){const N=u.nextBitIsOne(),P=Math.pow(2,u.count-(R+1));N?E(P,se.BLACK):(E(P,se.BLACK),E(P,se.RED))}return v},a=new V_(n.length),c=o(a);return new we(i||e,c)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Er;const qt={};class Ke{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return A(qt&&K,"ChildrenNode.ts has not been loaded"),Er=Er||new Ke({".priority":qt},{".priority":K}),Er}get(e){const t=kt(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof we?t:null}hasIndex(e){return Ue(this.indexSet_,e.toString())}addIndex(e,t){A(e!==Xt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const o=t.getIterator(M.Wrap);let a=o.getNext();for(;a;)s=s||e.isDefinedOn(a.node),i.push(a),a=o.getNext();let c;s?c=ts(i,e.getCompare()):c=qt;const u=e.toString(),d=Object.assign({},this.indexSet_);d[u]=e;const v=Object.assign({},this.indexes_);return v[u]=c,new Ke(v,d)}addToIndexes(e,t){const i=Yi(this.indexes_,(s,o)=>{const a=kt(this.indexSet_,o);if(A(a,"Missing index implementation for "+o),s===qt)if(a.isDefinedOn(e.node)){const c=[],u=t.getIterator(M.Wrap);let d=u.getNext();for(;d;)d.name!==e.name&&c.push(d),d=u.getNext();return c.push(e),ts(c,a.getCompare())}else return qt;else{const c=t.get(e.name);let u=s;return c&&(u=u.remove(new M(e.name,c))),u.insert(e,e.node)}});return new Ke(i,this.indexSet_)}removeFromIndexes(e,t){const i=Yi(this.indexes_,s=>{if(s===qt)return s;{const o=t.get(e.name);return o?s.remove(new M(e.name,o)):s}});return new Ke(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xn;class O{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Uh(this.priorityNode_),this.children_.isEmpty()&&A(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return xn||(xn=new O(new we(mo),null,Ke.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||xn}updatePriority(e){return this.children_.isEmpty()?this:new O(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?xn:t}}getChild(e){const t=L(e);return t===null?this:this.getImmediateChild(t).getChild(G(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(A(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new M(e,t);let s,o;t.isEmpty()?(s=this.children_.remove(e),o=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),o=this.indexMap_.addToIndexes(i,this.children_));const a=s.isEmpty()?xn:this.priorityNode_;return new O(s,a,o)}}updateChild(e,t){const i=L(e);if(i===null)return t;{A(L(e)!==".priority"||mt(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(G(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,o=!0;if(this.forEachChild(K,(a,c)=>{t[a]=c.val(e),i++,o&&O.INTEGER_REGEXP_.test(a)?s=Math.max(s,Number(a)):o=!1}),!e&&o&&s<2*i){const a=[];for(const c in t)a[c]=t[c];return a}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Fh(this.getPriority().val())+":"),this.forEachChild(K,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":fh(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const o=s.getPredecessorKey(new M(e,t));return o?o.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new M(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new M(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,M.Wrap);let o=s.peek();for(;o!=null&&t.compare(o,e)<0;)s.getNext(),o=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,M.Wrap);let o=s.peek();for(;o!=null&&t.compare(o,e)>0;)s.getNext(),o=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===di?-1:0}withIndex(e){if(e===Xt||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new O(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Xt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(K),s=t.getIterator(K);let o=i.getNext(),a=s.getNext();for(;o&&a;){if(o.name!==a.name||!o.node.equals(a.node))return!1;o=i.getNext(),a=s.getNext()}return o===null&&a===null}else return!1;else return!1}}resolveIndex_(e){return e===Xt?null:this.indexMap_.get(e.toString())}}O.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class j_ extends O{constructor(){super(new we(mo),O.EMPTY_NODE,Ke.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return O.EMPTY_NODE}isEmpty(){return!1}}const di=new j_;Object.defineProperties(M,{MIN:{value:new M(en,O.EMPTY_NODE)},MAX:{value:new M(Ot,di)}});xh.__EMPTY_NODE=O.EMPTY_NODE;ie.__childrenNodeConstructor=O;L_(di);x_(di);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H_=!0;function ee(n,e=null){if(n===null)return O.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),A(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new ie(t,ee(e))}if(!(n instanceof Array)&&H_){const t=[];let i=!1;if(ae(n,(a,c)=>{if(a.substring(0,1)!=="."){const u=ee(c);u.isEmpty()||(i=i||!u.getPriority().isEmpty(),t.push(new M(a,u)))}}),t.length===0)return O.EMPTY_NODE;const o=ts(t,D_,a=>a.name,mo);if(i){const a=ts(t,K.getCompare());return new O(o,ee(e),new Ke({".priority":a},{".priority":K}))}else return new O(o,ee(e),Ke.Default)}else{let t=O.EMPTY_NODE;return ae(n,(i,s)=>{if(Ue(n,i)&&i.substring(0,1)!=="."){const o=ee(s);(o.isLeafNode()||!o.isEmpty())&&(t=t.updateImmediateChild(i,o))}}),t.updatePriority(ee(e))}}M_(ee);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_ extends Cs{constructor(e){super(),this.indexPath_=e,A(!x(e)&&L(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),o=i.compareTo(s);return o===0?Ft(e.name,t.name):o}makePost(e,t){const i=ee(e),s=O.EMPTY_NODE.updateChild(this.indexPath_,i);return new M(t,s)}maxPost(){const e=O.EMPTY_NODE.updateChild(this.indexPath_,di);return new M(Ot,e)}toString(){return Zn(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_ extends Cs{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Ft(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return M.MIN}maxPost(){return M.MAX}makePost(e,t){const i=ee(e);return new M(t,i)}toString(){return".value"}}const $_=new W_;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hh(n){return{type:"value",snapshotNode:n}}function tn(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function ei(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function ti(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function G_(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(e){this.index_=e}updateChild(e,t,i,s,o,a){A(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const c=e.getImmediateChild(t);return c.getChild(s).equals(i.getChild(s))&&c.isEmpty()===i.isEmpty()||(a!=null&&(i.isEmpty()?e.hasChild(t)?a.trackChildChange(ei(t,c)):A(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):c.isEmpty()?a.trackChildChange(tn(t,i)):a.trackChildChange(ti(t,i,c))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(K,(s,o)=>{t.hasChild(s)||i.trackChildChange(ei(s,o))}),t.isLeafNode()||t.forEachChild(K,(s,o)=>{if(e.hasChild(s)){const a=e.getImmediateChild(s);a.equals(o)||i.trackChildChange(ti(s,o,a))}else i.trackChildChange(tn(s,o))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?O.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e){this.indexedFilter_=new vo(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ni.getStartPost_(e),this.endPost_=ni.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,o,a){return this.matches(new M(t,i))||(i=O.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,o,a)}updateFullNode(e,t,i){t.isLeafNode()&&(t=O.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(O.EMPTY_NODE);const o=this;return t.forEachChild(K,(a,c)=>{o.matches(new M(a,c))||(s=s.updateImmediateChild(a,O.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new ni(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,o,a){return this.rangedFilter_.matches(new M(t,i))||(i=O.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,o,a):this.fullLimitUpdateChild_(e,t,i,o,a)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=O.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=O.EMPTY_NODE.withIndex(this.index_);let o;this.reverse_?o=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):o=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let a=0;for(;o.hasNext()&&a<this.limit_;){const c=o.getNext();if(this.withinDirectionalStart(c))if(this.withinDirectionalEnd(c))s=s.updateImmediateChild(c.name,c.node),a++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(O.EMPTY_NODE);let o;this.reverse_?o=s.getReverseIterator(this.index_):o=s.getIterator(this.index_);let a=0;for(;o.hasNext();){const c=o.getNext();a<this.limit_&&this.withinDirectionalStart(c)&&this.withinDirectionalEnd(c)?a++:s=s.updateImmediateChild(c.name,O.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,o){let a;if(this.reverse_){const m=this.index_.getCompare();a=(E,b)=>m(b,E)}else a=this.index_.getCompare();const c=e;A(c.numChildren()===this.limit_,"");const u=new M(t,i),d=this.reverse_?c.getFirstChild(this.index_):c.getLastChild(this.index_),v=this.rangedFilter_.matches(u);if(c.hasChild(t)){const m=c.getImmediateChild(t);let E=s.getChildAfterChild(this.index_,d,this.reverse_);for(;E!=null&&(E.name===t||c.hasChild(E.name));)E=s.getChildAfterChild(this.index_,E,this.reverse_);const b=E==null?1:a(E,u);if(v&&!i.isEmpty()&&b>=0)return o!=null&&o.trackChildChange(ti(t,i,m)),c.updateImmediateChild(t,i);{o!=null&&o.trackChildChange(ei(t,m));const N=c.updateImmediateChild(t,O.EMPTY_NODE);return E!=null&&this.rangedFilter_.matches(E)?(o!=null&&o.trackChildChange(tn(E.name,E.node)),N.updateImmediateChild(E.name,E.node)):N}}else return i.isEmpty()?e:v&&a(d,u)>=0?(o!=null&&(o.trackChildChange(ei(d.name,d.node)),o.trackChildChange(tn(t,i))),c.updateImmediateChild(t,i).updateImmediateChild(d.name,O.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=K}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return A(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return A(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:en}hasEnd(){return this.endSet_}getIndexEndValue(){return A(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return A(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ot}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return A(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===K}copy(){const e=new yo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function z_(n){return n.loadsAllData()?new vo(n.getIndex()):n.hasLimit()?new q_(n):new ni(n)}function Pl(n){const e={};if(n.isDefault())return e;let t;if(n.index_===K?t="$priority":n.index_===$_?t="$value":n.index_===Xt?t="$key":(A(n.index_ instanceof B_,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=te(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=te(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+te(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=te(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+te(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Nl(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==K&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns extends Oh{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=ui("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(A(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const o=e._path.toString();this.log_("Listen called for "+o+" "+e._queryIdentifier);const a=ns.getListenId_(e,i),c={};this.listens_[a]=c;const u=Pl(e._queryParams);this.restRequest_(o+".json",u,(d,v)=>{let m=v;if(d===404&&(m=null,d=null),d===null&&this.onDataUpdate_(o,m,!1,i),kt(this.listens_,a)===c){let E;d?d===401?E="permission_denied":E="rest_error:"+d:E="ok",s(E,null)}})}unlisten(e,t){const i=ns.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Pl(e._queryParams),i=e._path.toString(),s=new hn;return this.restRequest_(i+".json",t,(o,a)=>{let c=a;o===404&&(c=null,o=null),o===null?(this.onDataUpdate_(i,c,!1,null),s.resolve(c)):s.reject(new Error(c))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,o])=>{s&&s.accessToken&&(t.auth=s.accessToken),o&&o.token&&(t.ac=o.token);const a=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+un(t);this.log_("Sending REST request for "+a);const c=new XMLHttpRequest;c.onreadystatechange=()=>{if(i&&c.readyState===4){this.log_("REST Response for "+a+" received. status:",c.status,"response:",c.responseText);let u=null;if(c.status>=200&&c.status<300){try{u=Yn(c.responseText)}catch{me("Failed to parse JSON response for "+a+": "+c.responseText)}i(null,u)}else c.status!==401&&c.status!==404&&me("Got unsuccessful REST response for "+a+" Status: "+c.status),i(c.status);i=null}},c.open("GET",a,!0),c.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K_{constructor(){this.rootNode_=O.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function is(){return{value:null,children:new Map}}function Bh(n,e,t){if(x(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=L(e);n.children.has(i)||n.children.set(i,is());const s=n.children.get(i);e=G(e),Bh(s,e,t)}}function Ur(n,e,t){n.value!==null?t(e,n.value):Y_(n,(i,s)=>{const o=new H(e.toString()+"/"+i);Ur(s,o,t)})}function Y_(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X_{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&ae(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol=10*1e3,J_=30*1e3,Q_=5*60*1e3;class Z_{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new X_(e);const i=Ol+(J_-Ol)*Math.random();Bn(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;ae(e,(s,o)=>{o>0&&Ue(this.statsToReport_,s)&&(t[s]=o,i=!0)}),i&&this.server_.reportStats(t),Bn(this.reportStats_.bind(this),Math.floor(Math.random()*2*Q_))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var De;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(De||(De={}));function Io(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function wo(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Eo(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=De.ACK_USER_WRITE,this.source=Io()}operationForChild(e){if(x(this.path)){if(this.affectedTree.value!=null)return A(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new H(e));return new ss(V(),t,this.revert)}}else return A(L(this.path)===e,"operationForChild called for unrelated child."),new ss(G(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t){this.source=e,this.path=t,this.type=De.LISTEN_COMPLETE}operationForChild(e){return x(this.path)?new ii(this.source,V()):new ii(this.source,G(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=De.OVERWRITE}operationForChild(e){return x(this.path)?new Dt(this.source,V(),this.snap.getImmediateChild(e)):new Dt(this.source,G(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=De.MERGE}operationForChild(e){if(x(this.path)){const t=this.children.subtree(new H(e));return t.isEmpty()?null:t.value?new Dt(this.source,V(),t.value):new nn(this.source,V(),t)}else return A(L(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new nn(this.source,G(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(x(e))return this.isFullyInitialized()&&!this.filtered_;const t=L(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function tm(n,e,t,i){const s=[],o=[];return e.forEach(a=>{a.type==="child_changed"&&n.index_.indexedValueChanged(a.oldSnap,a.snapshotNode)&&o.push(G_(a.childName,a.snapshotNode))}),Fn(n,s,"child_removed",e,i,t),Fn(n,s,"child_added",e,i,t),Fn(n,s,"child_moved",o,i,t),Fn(n,s,"child_changed",e,i,t),Fn(n,s,"value",e,i,t),s}function Fn(n,e,t,i,s,o){const a=i.filter(c=>c.type===t);a.sort((c,u)=>im(n,c,u)),a.forEach(c=>{const u=nm(n,c,o);s.forEach(d=>{d.respondsTo(c.type)&&e.push(d.createEvent(u,n.query_))})})}function nm(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function im(n,e,t){if(e.childName==null||t.childName==null)throw cn("Should only compare child_ events.");const i=new M(e.childName,e.snapshotNode),s=new M(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(n,e){return{eventCache:n,serverCache:e}}function Wn(n,e,t,i){return Ss(new vt(e,t,i),n.serverCache)}function Wh(n,e,t,i){return Ss(n.eventCache,new vt(e,t,i))}function rs(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Lt(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tr;const sm=()=>(Tr||(Tr=new we(Bg)),Tr);class ${constructor(e,t=sm()){this.value=e,this.children=t}static fromObject(e){let t=new $(null);return ae(e,(i,s)=>{t=t.set(new H(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:V(),value:this.value};if(x(e))return null;{const i=L(e),s=this.children.get(i);if(s!==null){const o=s.findRootMostMatchingPathAndValue(G(e),t);return o!=null?{path:Y(new H(i),o.path),value:o.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(x(e))return this;{const t=L(e),i=this.children.get(t);return i!==null?i.subtree(G(e)):new $(null)}}set(e,t){if(x(e))return new $(t,this.children);{const i=L(e),o=(this.children.get(i)||new $(null)).set(G(e),t),a=this.children.insert(i,o);return new $(this.value,a)}}remove(e){if(x(e))return this.children.isEmpty()?new $(null):new $(null,this.children);{const t=L(e),i=this.children.get(t);if(i){const s=i.remove(G(e));let o;return s.isEmpty()?o=this.children.remove(t):o=this.children.insert(t,s),this.value===null&&o.isEmpty()?new $(null):new $(this.value,o)}else return this}}get(e){if(x(e))return this.value;{const t=L(e),i=this.children.get(t);return i?i.get(G(e)):null}}setTree(e,t){if(x(e))return t;{const i=L(e),o=(this.children.get(i)||new $(null)).setTree(G(e),t);let a;return o.isEmpty()?a=this.children.remove(i):a=this.children.insert(i,o),new $(this.value,a)}}fold(e){return this.fold_(V(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,o)=>{i[s]=o.fold_(Y(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,V(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(x(e))return null;{const o=L(e),a=this.children.get(o);return a?a.findOnPath_(G(e),Y(t,o),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,V(),t)}foreachOnPath_(e,t,i){if(x(e))return this;{this.value&&i(t,this.value);const s=L(e),o=this.children.get(s);return o?o.foreachOnPath_(G(e),Y(t,s),i):new $(null)}}foreach(e){this.foreach_(V(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(Y(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.writeTree_=e}static empty(){return new xe(new $(null))}}function $n(n,e,t){if(x(e))return new xe(new $(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let o=i.value;const a=_e(s,e);return o=o.updateChild(a,t),new xe(n.writeTree_.set(s,o))}else{const s=new $(t),o=n.writeTree_.setTree(e,s);return new xe(o)}}}function Vr(n,e,t){let i=n;return ae(t,(s,o)=>{i=$n(i,Y(e,s),o)}),i}function Dl(n,e){if(x(e))return xe.empty();{const t=n.writeTree_.setTree(e,new $(null));return new xe(t)}}function jr(n,e){return Ut(n,e)!=null}function Ut(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(_e(t.path,e)):null}function Ll(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(K,(i,s)=>{e.push(new M(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new M(i,s.value))}),e}function pt(n,e){if(x(e))return n;{const t=Ut(n,e);return t!=null?new xe(new $(t)):new xe(n.writeTree_.subtree(e))}}function Hr(n){return n.writeTree_.isEmpty()}function sn(n,e){return $h(V(),n.writeTree_,e)}function $h(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,o)=>{s===".priority"?(A(o.value!==null,"Priority writes must always be leaf nodes"),i=o.value):t=$h(Y(n,s),o,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(Y(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bs(n,e){return Kh(e,n)}function rm(n,e,t,i,s){A(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=$n(n.visibleWrites,e,t)),n.lastWriteId=i}function om(n,e,t,i){A(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Vr(n.visibleWrites,e,t),n.lastWriteId=i}function am(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function lm(n,e){const t=n.allWrites.findIndex(c=>c.writeId===e);A(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,o=!1,a=n.allWrites.length-1;for(;s&&a>=0;){const c=n.allWrites[a];c.visible&&(a>=t&&cm(c,i.path)?s=!1:Ae(i.path,c.path)&&(o=!0)),a--}if(s){if(o)return hm(n),!0;if(i.snap)n.visibleWrites=Dl(n.visibleWrites,i.path);else{const c=i.children;ae(c,u=>{n.visibleWrites=Dl(n.visibleWrites,Y(i.path,u))})}return!0}else return!1}function cm(n,e){if(n.snap)return Ae(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Ae(Y(n.path,t),e))return!0;return!1}function hm(n){n.visibleWrites=Gh(n.allWrites,um,V()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function um(n){return n.visible}function Gh(n,e,t){let i=xe.empty();for(let s=0;s<n.length;++s){const o=n[s];if(e(o)){const a=o.path;let c;if(o.snap)Ae(t,a)?(c=_e(t,a),i=$n(i,c,o.snap)):Ae(a,t)&&(c=_e(a,t),i=$n(i,V(),o.snap.getChild(c)));else if(o.children){if(Ae(t,a))c=_e(t,a),i=Vr(i,c,o.children);else if(Ae(a,t))if(c=_e(a,t),x(c))i=Vr(i,V(),o.children);else{const u=kt(o.children,L(c));if(u){const d=u.getChild(G(c));i=$n(i,V(),d)}}}else throw cn("WriteRecord should have .snap or .children")}}return i}function qh(n,e,t,i,s){if(!i&&!s){const o=Ut(n.visibleWrites,e);if(o!=null)return o;{const a=pt(n.visibleWrites,e);if(Hr(a))return t;if(t==null&&!jr(a,V()))return null;{const c=t||O.EMPTY_NODE;return sn(a,c)}}}else{const o=pt(n.visibleWrites,e);if(!s&&Hr(o))return t;if(!s&&t==null&&!jr(o,V()))return null;{const a=function(d){return(d.visible||s)&&(!i||!~i.indexOf(d.writeId))&&(Ae(d.path,e)||Ae(e,d.path))},c=Gh(n.allWrites,a,e),u=t||O.EMPTY_NODE;return sn(c,u)}}}function dm(n,e,t){let i=O.EMPTY_NODE;const s=Ut(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(K,(o,a)=>{i=i.updateImmediateChild(o,a)}),i;if(t){const o=pt(n.visibleWrites,e);return t.forEachChild(K,(a,c)=>{const u=sn(pt(o,new H(a)),c);i=i.updateImmediateChild(a,u)}),Ll(o).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}else{const o=pt(n.visibleWrites,e);return Ll(o).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}}function fm(n,e,t,i,s){A(i||s,"Either existingEventSnap or existingServerSnap must exist");const o=Y(e,t);if(jr(n.visibleWrites,o))return null;{const a=pt(n.visibleWrites,o);return Hr(a)?s.getChild(t):sn(a,s.getChild(t))}}function pm(n,e,t,i){const s=Y(e,t),o=Ut(n.visibleWrites,s);if(o!=null)return o;if(i.isCompleteForChild(t)){const a=pt(n.visibleWrites,s);return sn(a,i.getNode().getImmediateChild(t))}else return null}function gm(n,e){return Ut(n.visibleWrites,e)}function _m(n,e,t,i,s,o,a){let c;const u=pt(n.visibleWrites,e),d=Ut(u,V());if(d!=null)c=d;else if(t!=null)c=sn(u,t);else return[];if(c=c.withIndex(a),!c.isEmpty()&&!c.isLeafNode()){const v=[],m=a.getCompare(),E=o?c.getReverseIteratorFrom(i,a):c.getIteratorFrom(i,a);let b=E.getNext();for(;b&&v.length<s;)m(b,i)!==0&&v.push(b),b=E.getNext();return v}else return[]}function mm(){return{visibleWrites:xe.empty(),allWrites:[],lastWriteId:-1}}function os(n,e,t,i){return qh(n.writeTree,n.treePath,e,t,i)}function To(n,e){return dm(n.writeTree,n.treePath,e)}function Ml(n,e,t,i){return fm(n.writeTree,n.treePath,e,t,i)}function as(n,e){return gm(n.writeTree,Y(n.treePath,e))}function vm(n,e,t,i,s,o){return _m(n.writeTree,n.treePath,e,t,i,s,o)}function Co(n,e,t){return pm(n.writeTree,n.treePath,e,t)}function zh(n,e){return Kh(Y(n.treePath,e),n.writeTree)}function Kh(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;A(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),A(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const o=s.type;if(t==="child_added"&&o==="child_removed")this.changeMap.set(i,ti(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&o==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&o==="child_changed")this.changeMap.set(i,ei(i,s.oldSnap));else if(t==="child_changed"&&o==="child_added")this.changeMap.set(i,tn(i,e.snapshotNode));else if(t==="child_changed"&&o==="child_changed")this.changeMap.set(i,ti(i,e.snapshotNode,s.oldSnap));else throw cn("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Im{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Yh=new Im;class So{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new vt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Co(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Lt(this.viewCache_),o=vm(this.writes_,s,t,1,i,e);return o.length===0?null:o[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wm(n){return{filter:n}}function Em(n,e){A(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),A(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Tm(n,e,t,i,s){const o=new ym;let a,c;if(t.type===De.OVERWRITE){const d=t;d.source.fromUser?a=Br(n,e,d.path,d.snap,i,s,o):(A(d.source.fromServer,"Unknown source."),c=d.source.tagged||e.serverCache.isFiltered()&&!x(d.path),a=ls(n,e,d.path,d.snap,i,s,c,o))}else if(t.type===De.MERGE){const d=t;d.source.fromUser?a=Sm(n,e,d.path,d.children,i,s,o):(A(d.source.fromServer,"Unknown source."),c=d.source.tagged||e.serverCache.isFiltered(),a=Wr(n,e,d.path,d.children,i,s,c,o))}else if(t.type===De.ACK_USER_WRITE){const d=t;d.revert?a=Am(n,e,d.path,i,s,o):a=bm(n,e,d.path,d.affectedTree,i,s,o)}else if(t.type===De.LISTEN_COMPLETE)a=Rm(n,e,t.path,i,o);else throw cn("Unknown operation type: "+t.type);const u=o.getChanges();return Cm(e,a,u),{viewCache:a,changes:u}}function Cm(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),o=rs(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(o)||!i.getNode().getPriority().equals(o.getPriority()))&&t.push(Hh(rs(e)))}}function Xh(n,e,t,i,s,o){const a=e.eventCache;if(as(i,t)!=null)return e;{let c,u;if(x(t))if(A(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const d=Lt(e),v=d instanceof O?d:O.EMPTY_NODE,m=To(i,v);c=n.filter.updateFullNode(e.eventCache.getNode(),m,o)}else{const d=os(i,Lt(e));c=n.filter.updateFullNode(e.eventCache.getNode(),d,o)}else{const d=L(t);if(d===".priority"){A(mt(t)===1,"Can't have a priority with additional path components");const v=a.getNode();u=e.serverCache.getNode();const m=Ml(i,t,v,u);m!=null?c=n.filter.updatePriority(v,m):c=a.getNode()}else{const v=G(t);let m;if(a.isCompleteForChild(d)){u=e.serverCache.getNode();const E=Ml(i,t,a.getNode(),u);E!=null?m=a.getNode().getImmediateChild(d).updateChild(v,E):m=a.getNode().getImmediateChild(d)}else m=Co(i,d,e.serverCache);m!=null?c=n.filter.updateChild(a.getNode(),d,m,v,s,o):c=a.getNode()}}return Wn(e,c,a.isFullyInitialized()||x(t),n.filter.filtersNodes())}}function ls(n,e,t,i,s,o,a,c){const u=e.serverCache;let d;const v=a?n.filter:n.filter.getIndexedFilter();if(x(t))d=v.updateFullNode(u.getNode(),i,null);else if(v.filtersNodes()&&!u.isFiltered()){const b=u.getNode().updateChild(t,i);d=v.updateFullNode(u.getNode(),b,null)}else{const b=L(t);if(!u.isCompleteForPath(t)&&mt(t)>1)return e;const R=G(t),P=u.getNode().getImmediateChild(b).updateChild(R,i);b===".priority"?d=v.updatePriority(u.getNode(),P):d=v.updateChild(u.getNode(),b,P,R,Yh,null)}const m=Wh(e,d,u.isFullyInitialized()||x(t),v.filtersNodes()),E=new So(s,m,o);return Xh(n,m,t,s,E,c)}function Br(n,e,t,i,s,o,a){const c=e.eventCache;let u,d;const v=new So(s,e,o);if(x(t))d=n.filter.updateFullNode(e.eventCache.getNode(),i,a),u=Wn(e,d,!0,n.filter.filtersNodes());else{const m=L(t);if(m===".priority")d=n.filter.updatePriority(e.eventCache.getNode(),i),u=Wn(e,d,c.isFullyInitialized(),c.isFiltered());else{const E=G(t),b=c.getNode().getImmediateChild(m);let R;if(x(E))R=i;else{const N=v.getCompleteChild(m);N!=null?po(E)===".priority"&&N.getChild(Lh(E)).isEmpty()?R=N:R=N.updateChild(E,i):R=O.EMPTY_NODE}if(b.equals(R))u=e;else{const N=n.filter.updateChild(c.getNode(),m,R,E,v,a);u=Wn(e,N,c.isFullyInitialized(),n.filter.filtersNodes())}}}return u}function xl(n,e){return n.eventCache.isCompleteForChild(e)}function Sm(n,e,t,i,s,o,a){let c=e;return i.foreach((u,d)=>{const v=Y(t,u);xl(e,L(v))&&(c=Br(n,c,v,d,s,o,a))}),i.foreach((u,d)=>{const v=Y(t,u);xl(e,L(v))||(c=Br(n,c,v,d,s,o,a))}),c}function Fl(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Wr(n,e,t,i,s,o,a,c){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,d;x(t)?d=i:d=new $(null).setTree(t,i);const v=e.serverCache.getNode();return d.children.inorderTraversal((m,E)=>{if(v.hasChild(m)){const b=e.serverCache.getNode().getImmediateChild(m),R=Fl(n,b,E);u=ls(n,u,new H(m),R,s,o,a,c)}}),d.children.inorderTraversal((m,E)=>{const b=!e.serverCache.isCompleteForChild(m)&&E.value===null;if(!v.hasChild(m)&&!b){const R=e.serverCache.getNode().getImmediateChild(m),N=Fl(n,R,E);u=ls(n,u,new H(m),N,s,o,a,c)}}),u}function bm(n,e,t,i,s,o,a){if(as(s,t)!=null)return e;const c=e.serverCache.isFiltered(),u=e.serverCache;if(i.value!=null){if(x(t)&&u.isFullyInitialized()||u.isCompleteForPath(t))return ls(n,e,t,u.getNode().getChild(t),s,o,c,a);if(x(t)){let d=new $(null);return u.getNode().forEachChild(Xt,(v,m)=>{d=d.set(new H(v),m)}),Wr(n,e,t,d,s,o,c,a)}else return e}else{let d=new $(null);return i.foreach((v,m)=>{const E=Y(t,v);u.isCompleteForPath(E)&&(d=d.set(v,u.getNode().getChild(E)))}),Wr(n,e,t,d,s,o,c,a)}}function Rm(n,e,t,i,s){const o=e.serverCache,a=Wh(e,o.getNode(),o.isFullyInitialized()||x(t),o.isFiltered());return Xh(n,a,t,i,Yh,s)}function Am(n,e,t,i,s,o){let a;if(as(i,t)!=null)return e;{const c=new So(i,e,s),u=e.eventCache.getNode();let d;if(x(t)||L(t)===".priority"){let v;if(e.serverCache.isFullyInitialized())v=os(i,Lt(e));else{const m=e.serverCache.getNode();A(m instanceof O,"serverChildren would be complete if leaf node"),v=To(i,m)}v=v,d=n.filter.updateFullNode(u,v,o)}else{const v=L(t);let m=Co(i,v,e.serverCache);m==null&&e.serverCache.isCompleteForChild(v)&&(m=u.getImmediateChild(v)),m!=null?d=n.filter.updateChild(u,v,m,G(t),c,o):e.eventCache.getNode().hasChild(v)?d=n.filter.updateChild(u,v,O.EMPTY_NODE,G(t),c,o):d=u,d.isEmpty()&&e.serverCache.isFullyInitialized()&&(a=os(i,Lt(e)),a.isLeafNode()&&(d=n.filter.updateFullNode(d,a,o)))}return a=e.serverCache.isFullyInitialized()||as(i,V())!=null,Wn(e,d,a,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class km{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new vo(i.getIndex()),o=z_(i);this.processor_=wm(o);const a=t.serverCache,c=t.eventCache,u=s.updateFullNode(O.EMPTY_NODE,a.getNode(),null),d=o.updateFullNode(O.EMPTY_NODE,c.getNode(),null),v=new vt(u,a.isFullyInitialized(),s.filtersNodes()),m=new vt(d,c.isFullyInitialized(),o.filtersNodes());this.viewCache_=Ss(m,v),this.eventGenerator_=new em(this.query_)}get query(){return this.query_}}function Pm(n){return n.viewCache_.serverCache.getNode()}function Nm(n){return rs(n.viewCache_)}function Om(n,e){const t=Lt(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!x(e)&&!t.getImmediateChild(L(e)).isEmpty())?t.getChild(e):null}function Ul(n){return n.eventRegistrations_.length===0}function Dm(n,e){n.eventRegistrations_.push(e)}function Vl(n,e,t){const i=[];if(t){A(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(o=>{const a=o.createCancelEvent(t,s);a&&i.push(a)})}if(e){let s=[];for(let o=0;o<n.eventRegistrations_.length;++o){const a=n.eventRegistrations_[o];if(!a.matches(e))s.push(a);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(o+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function jl(n,e,t,i){e.type===De.MERGE&&e.source.queryId!==null&&(A(Lt(n.viewCache_),"We should always have a full cache before handling merges"),A(rs(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,o=Tm(n.processor_,s,e,t,i);return Em(n.processor_,o.viewCache),A(o.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=o.viewCache,Jh(n,o.changes,o.viewCache.eventCache.getNode(),null)}function Lm(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(K,(o,a)=>{i.push(tn(o,a))}),t.isFullyInitialized()&&i.push(Hh(t.getNode())),Jh(n,i,t.getNode(),e)}function Jh(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return tm(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cs;class Qh{constructor(){this.views=new Map}}function Mm(n){A(!cs,"__referenceConstructor has already been defined"),cs=n}function xm(){return A(cs,"Reference.ts has not been loaded"),cs}function Fm(n){return n.views.size===0}function bo(n,e,t,i){const s=e.source.queryId;if(s!==null){const o=n.views.get(s);return A(o!=null,"SyncTree gave us an op for an invalid query."),jl(o,e,t,i)}else{let o=[];for(const a of n.views.values())o=o.concat(jl(a,e,t,i));return o}}function Zh(n,e,t,i,s){const o=e._queryIdentifier,a=n.views.get(o);if(!a){let c=os(t,s?i:null),u=!1;c?u=!0:i instanceof O?(c=To(t,i),u=!1):(c=O.EMPTY_NODE,u=!1);const d=Ss(new vt(c,u,!1),new vt(i,s,!1));return new km(e,d)}return a}function Um(n,e,t,i,s,o){const a=Zh(n,e,i,s,o);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,a),Dm(a,t),Lm(a,t)}function Vm(n,e,t,i){const s=e._queryIdentifier,o=[];let a=[];const c=yt(n);if(s==="default")for(const[u,d]of n.views.entries())a=a.concat(Vl(d,t,i)),Ul(d)&&(n.views.delete(u),d.query._queryParams.loadsAllData()||o.push(d.query));else{const u=n.views.get(s);u&&(a=a.concat(Vl(u,t,i)),Ul(u)&&(n.views.delete(s),u.query._queryParams.loadsAllData()||o.push(u.query)))}return c&&!yt(n)&&o.push(new(xm())(e._repo,e._path)),{removed:o,events:a}}function eu(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function gt(n,e){let t=null;for(const i of n.views.values())t=t||Om(i,e);return t}function tu(n,e){if(e._queryParams.loadsAllData())return Rs(n);{const i=e._queryIdentifier;return n.views.get(i)}}function nu(n,e){return tu(n,e)!=null}function yt(n){return Rs(n)!=null}function Rs(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hs;function jm(n){A(!hs,"__referenceConstructor has already been defined"),hs=n}function Hm(){return A(hs,"Reference.ts has not been loaded"),hs}let Bm=1;class Hl{constructor(e){this.listenProvider_=e,this.syncPointTree_=new $(null),this.pendingWriteTree_=mm(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ro(n,e,t,i,s){return rm(n.pendingWriteTree_,e,t,i,s),s?fn(n,new Dt(Io(),e,t)):[]}function Wm(n,e,t,i){om(n.pendingWriteTree_,e,t,i);const s=$.fromObject(t);return fn(n,new nn(Io(),e,s))}function dt(n,e,t=!1){const i=am(n.pendingWriteTree_,e);if(lm(n.pendingWriteTree_,e)){let o=new $(null);return i.snap!=null?o=o.set(V(),!0):ae(i.children,a=>{o=o.set(new H(a),!0)}),fn(n,new ss(i.path,o,t))}else return[]}function fi(n,e,t){return fn(n,new Dt(wo(),e,t))}function $m(n,e,t){const i=$.fromObject(t);return fn(n,new nn(wo(),e,i))}function Gm(n,e){return fn(n,new ii(wo(),e))}function qm(n,e,t){const i=Ao(n,t);if(i){const s=ko(i),o=s.path,a=s.queryId,c=_e(o,e),u=new ii(Eo(a),c);return Po(n,o,u)}else return[]}function us(n,e,t,i,s=!1){const o=e._path,a=n.syncPointTree_.get(o);let c=[];if(a&&(e._queryIdentifier==="default"||nu(a,e))){const u=Vm(a,e,t,i);Fm(a)&&(n.syncPointTree_=n.syncPointTree_.remove(o));const d=u.removed;if(c=u.events,!s){const v=d.findIndex(E=>E._queryParams.loadsAllData())!==-1,m=n.syncPointTree_.findOnPath(o,(E,b)=>yt(b));if(v&&!m){const E=n.syncPointTree_.subtree(o);if(!E.isEmpty()){const b=Ym(E);for(let R=0;R<b.length;++R){const N=b[R],P=N.query,X=ou(n,N);n.listenProvider_.startListening(Gn(P),si(n,P),X.hashFn,X.onComplete)}}}!m&&d.length>0&&!i&&(v?n.listenProvider_.stopListening(Gn(e),null):d.forEach(E=>{const b=n.queryToTagMap.get(ks(E));n.listenProvider_.stopListening(Gn(E),b)}))}Xm(n,d)}return c}function iu(n,e,t,i){const s=Ao(n,i);if(s!=null){const o=ko(s),a=o.path,c=o.queryId,u=_e(a,e),d=new Dt(Eo(c),u,t);return Po(n,a,d)}else return[]}function zm(n,e,t,i){const s=Ao(n,i);if(s){const o=ko(s),a=o.path,c=o.queryId,u=_e(a,e),d=$.fromObject(t),v=new nn(Eo(c),u,d);return Po(n,a,v)}else return[]}function $r(n,e,t,i=!1){const s=e._path;let o=null,a=!1;n.syncPointTree_.foreachOnPath(s,(E,b)=>{const R=_e(E,s);o=o||gt(b,R),a=a||yt(b)});let c=n.syncPointTree_.get(s);c?(a=a||yt(c),o=o||gt(c,V())):(c=new Qh,n.syncPointTree_=n.syncPointTree_.set(s,c));let u;o!=null?u=!0:(u=!1,o=O.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((b,R)=>{const N=gt(R,V());N&&(o=o.updateImmediateChild(b,N))}));const d=nu(c,e);if(!d&&!e._queryParams.loadsAllData()){const E=ks(e);A(!n.queryToTagMap.has(E),"View does not exist, but we have a tag");const b=Jm();n.queryToTagMap.set(E,b),n.tagToQueryMap.set(b,E)}const v=bs(n.pendingWriteTree_,s);let m=Um(c,e,t,v,o,u);if(!d&&!a&&!i){const E=tu(c,e);m=m.concat(Qm(n,e,E))}return m}function As(n,e,t){const s=n.pendingWriteTree_,o=n.syncPointTree_.findOnPath(e,(a,c)=>{const u=_e(a,e),d=gt(c,u);if(d)return d});return qh(s,e,o,t,!0)}function Km(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(d,v)=>{const m=_e(d,t);i=i||gt(v,m)});let s=n.syncPointTree_.get(t);s?i=i||gt(s,V()):(s=new Qh,n.syncPointTree_=n.syncPointTree_.set(t,s));const o=i!=null,a=o?new vt(i,!0,!1):null,c=bs(n.pendingWriteTree_,e._path),u=Zh(s,e,c,o?a.getNode():O.EMPTY_NODE,o);return Nm(u)}function fn(n,e){return su(e,n.syncPointTree_,null,bs(n.pendingWriteTree_,V()))}function su(n,e,t,i){if(x(n.path))return ru(n,e,t,i);{const s=e.get(V());t==null&&s!=null&&(t=gt(s,V()));let o=[];const a=L(n.path),c=n.operationForChild(a),u=e.children.get(a);if(u&&c){const d=t?t.getImmediateChild(a):null,v=zh(i,a);o=o.concat(su(c,u,d,v))}return s&&(o=o.concat(bo(s,n,i,t))),o}}function ru(n,e,t,i){const s=e.get(V());t==null&&s!=null&&(t=gt(s,V()));let o=[];return e.children.inorderTraversal((a,c)=>{const u=t?t.getImmediateChild(a):null,d=zh(i,a),v=n.operationForChild(a);v&&(o=o.concat(ru(v,c,u,d)))}),s&&(o=o.concat(bo(s,n,i,t))),o}function ou(n,e){const t=e.query,i=si(n,t);return{hashFn:()=>(Pm(e)||O.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?qm(n,t._path,i):Gm(n,t._path);{const o=Gg(s,t);return us(n,t,null,o)}}}}function si(n,e){const t=ks(e);return n.queryToTagMap.get(t)}function ks(n){return n._path.toString()+"$"+n._queryIdentifier}function Ao(n,e){return n.tagToQueryMap.get(e)}function ko(n){const e=n.indexOf("$");return A(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new H(n.substr(0,e))}}function Po(n,e,t){const i=n.syncPointTree_.get(e);A(i,"Missing sync point for query tag that we're tracking");const s=bs(n.pendingWriteTree_,e);return bo(i,t,s,null)}function Ym(n){return n.fold((e,t,i)=>{if(t&&yt(t))return[Rs(t)];{let s=[];return t&&(s=eu(t)),ae(i,(o,a)=>{s=s.concat(a)}),s}})}function Gn(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Hm())(n._repo,n._path):n}function Xm(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=ks(i),o=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(o)}}}function Jm(){return Bm++}function Qm(n,e,t){const i=e._path,s=si(n,e),o=ou(n,t),a=n.listenProvider_.startListening(Gn(e),s,o.hashFn,o.onComplete),c=n.syncPointTree_.subtree(i);if(s)A(!yt(c.value),"If we're adding a query, it shouldn't be shadowed");else{const u=c.fold((d,v,m)=>{if(!x(d)&&v&&yt(v))return[Rs(v).query];{let E=[];return v&&(E=E.concat(eu(v).map(b=>b.query))),ae(m,(b,R)=>{E=E.concat(R)}),E}});for(let d=0;d<u.length;++d){const v=u[d];n.listenProvider_.stopListening(Gn(v),si(n,v))}}return a}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new No(t)}node(){return this.node_}}class Oo{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Y(this.path_,e);return new Oo(this.syncTree_,t)}node(){return As(this.syncTree_,this.path_)}}const Zm=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Bl=function(n,e,t){if(!n||typeof n!="object")return n;if(A(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return ev(n[".sv"],e,t);if(typeof n[".sv"]=="object")return tv(n[".sv"],e);A(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},ev=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:A(!1,"Unexpected server value: "+n)}},tv=function(n,e,t){n.hasOwnProperty("increment")||A(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&A(!1,"Unexpected increment value: "+i);const s=e.node();if(A(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const a=s.getValue();return typeof a!="number"?i:a+i},au=function(n,e,t,i){return Lo(e,new Oo(t,n),i)},Do=function(n,e,t){return Lo(n,new No(e),t)};function Lo(n,e,t){const i=n.getPriority().val(),s=Bl(i,e.getImmediateChild(".priority"),t);let o;if(n.isLeafNode()){const a=n,c=Bl(a.getValue(),e,t);return c!==a.getValue()||s!==a.getPriority().val()?new ie(c,ee(s)):n}else{const a=n;return o=a,s!==a.getPriority().val()&&(o=o.updatePriority(new ie(s))),a.forEachChild(K,(c,u)=>{const d=Lo(u,e.getImmediateChild(c),t);d!==u&&(o=o.updateImmediateChild(c,d))}),o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Ps(n,e){let t=e instanceof H?e:new H(e),i=n,s=L(t);for(;s!==null;){const o=kt(i.node.children,s)||{children:{},childCount:0};i=new Mo(s,i,o),t=G(t),s=L(t)}return i}function Vt(n){return n.node.value}function xo(n,e){n.node.value=e,Gr(n)}function lu(n){return n.node.childCount>0}function nv(n){return Vt(n)===void 0&&!lu(n)}function Ns(n,e){ae(n.node.children,(t,i)=>{e(new Mo(t,n,i))})}function cu(n,e,t,i){t&&e(n),Ns(n,s=>{cu(s,e,!0)})}function iv(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function pi(n){return new H(n.parent===null?n.name:pi(n.parent)+"/"+n.name)}function Gr(n){n.parent!==null&&sv(n.parent,n.name,n)}function sv(n,e,t){const i=nv(t),s=Ue(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Gr(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Gr(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rv=/[\[\].#$\/\u0000-\u001F\u007F]/,ov=/[\[\].#$\u0000-\u001F\u007F]/,Cr=10*1024*1024,Fo=function(n){return typeof n=="string"&&n.length!==0&&!rv.test(n)},hu=function(n){return typeof n=="string"&&n.length!==0&&!ov.test(n)},av=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),hu(n)},uu=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!lo(n)||n&&typeof n=="object"&&Ue(n,".sv")},du=function(n,e,t,i){i&&e===void 0||gi(Is(n,"value"),e,t)},gi=function(n,e,t){const i=t instanceof H?new S_(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+bt(i));if(typeof e=="function")throw new Error(n+"contains a function "+bt(i)+" with contents = "+e.toString());if(lo(e))throw new Error(n+"contains "+e.toString()+" "+bt(i));if(typeof e=="string"&&e.length>Cr/3&&ws(e)>Cr)throw new Error(n+"contains a string greater than "+Cr+" utf8 bytes "+bt(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,o=!1;if(ae(e,(a,c)=>{if(a===".value")s=!0;else if(a!==".priority"&&a!==".sv"&&(o=!0,!Fo(a)))throw new Error(n+" contains an invalid key ("+a+") "+bt(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);b_(i,a),gi(n,c,i),R_(i)}),s&&o)throw new Error(n+' contains ".value" child '+bt(i)+" in addition to actual children.")}},lv=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const o=Zn(i);for(let a=0;a<o.length;a++)if(!(o[a]===".priority"&&a===o.length-1)){if(!Fo(o[a]))throw new Error(n+"contains an invalid key ("+o[a]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(C_);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&Ae(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},cv=function(n,e,t,i){const s=Is(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const o=[];ae(e,(a,c)=>{const u=new H(a);if(gi(s,c,Y(t,u)),po(u)===".priority"&&!uu(c))throw new Error(s+"contains an invalid value for '"+u.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");o.push(u)}),lv(s,o)},fu=function(n,e,t,i){if(!hu(t))throw new Error(Is(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},hv=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),fu(n,e,t)},Os=function(n,e){if(L(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},uv=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Fo(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!av(t))throw new Error(Is(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Ds(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],o=s.getPath();t!==null&&!go(o,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:o}),t.events.push(s)}t&&n.eventLists_.push(t)}function pu(n,e,t){Ds(n,t),gu(n,i=>go(i,e))}function Se(n,e,t){Ds(n,t),gu(n,i=>Ae(i,e)||Ae(e,i))}function gu(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const o=s.path;e(o)?(fv(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function fv(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Hn&&oe("event: "+t.toString()),dn(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pv="repo_interrupt",gv=25;class _v{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new dv,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=is(),this.transactionQueueTree_=new Mo,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function mv(n,e,t){if(n.stats_=uo(n.repoInfo_),n.forceRestClient_||Yg())n.server_=new ns(n.repoInfo_,(i,s,o,a)=>{Wl(n,i,s,o,a)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>$l(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{te(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Qe(n.repoInfo_,e,(i,s,o,a)=>{Wl(n,i,s,o,a)},i=>{$l(n,i)},i=>{vv(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=e_(n.repoInfo_,()=>new Z_(n.stats_,n.server_)),n.infoData_=new K_,n.infoSyncTree_=new Hl({startListening:(i,s,o,a)=>{let c=[];const u=n.infoData_.getNode(i._path);return u.isEmpty()||(c=fi(n.infoSyncTree_,i._path,u),setTimeout(()=>{a("ok")},0)),c},stopListening:()=>{}}),Uo(n,"connected",!1),n.serverSyncTree_=new Hl({startListening:(i,s,o,a)=>(n.server_.listen(i,o,s,(c,u)=>{const d=a(c,u);Se(n.eventQueue_,i._path,d)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function _u(n){const t=n.infoData_.getNode(new H(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function _i(n){return Zm({timestamp:_u(n)})}function Wl(n,e,t,i,s){n.dataUpdateCount++;const o=new H(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let a=[];if(s)if(i){const u=Yi(t,d=>ee(d));a=zm(n.serverSyncTree_,o,u,s)}else{const u=ee(t);a=iu(n.serverSyncTree_,o,u,s)}else if(i){const u=Yi(t,d=>ee(d));a=$m(n.serverSyncTree_,o,u)}else{const u=ee(t);a=fi(n.serverSyncTree_,o,u)}let c=o;a.length>0&&(c=rn(n,o)),Se(n.eventQueue_,c,a)}function $l(n,e){Uo(n,"connected",e),e===!1&&Ev(n)}function vv(n,e){ae(e,(t,i)=>{Uo(n,t,i)})}function Uo(n,e,t){const i=new H("/.info/"+e),s=ee(t);n.infoData_.updateSnapshot(i,s);const o=fi(n.infoSyncTree_,i,s);Se(n.eventQueue_,i,o)}function Ls(n){return n.nextWriteId_++}function yv(n,e,t){const i=Km(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const o=ee(s).withIndex(e._queryParams.getIndex());$r(n.serverSyncTree_,e,t,!0);let a;if(e._queryParams.loadsAllData())a=fi(n.serverSyncTree_,e._path,o);else{const c=si(n.serverSyncTree_,e);a=iu(n.serverSyncTree_,e._path,o,c)}return Se(n.eventQueue_,e._path,a),us(n.serverSyncTree_,e,t,null,!0),o},s=>(pn(n,"get for query "+te(e)+" failed: "+s),Promise.reject(new Error(s))))}function Iv(n,e,t,i,s){pn(n,"set",{path:e.toString(),value:t,priority:i});const o=_i(n),a=ee(t,i),c=As(n.serverSyncTree_,e),u=Do(a,c,o),d=Ls(n),v=Ro(n.serverSyncTree_,e,u,d,!0);Ds(n.eventQueue_,v),n.server_.put(e.toString(),a.val(!0),(E,b)=>{const R=E==="ok";R||me("set at "+e+" failed: "+E);const N=dt(n.serverSyncTree_,d,!R);Se(n.eventQueue_,e,N),qr(n,s,E,b)});const m=jo(n,e);rn(n,m),Se(n.eventQueue_,m,[])}function wv(n,e,t,i){pn(n,"update",{path:e.toString(),value:t});let s=!0;const o=_i(n),a={};if(ae(t,(c,u)=>{s=!1,a[c]=au(Y(e,c),ee(u),n.serverSyncTree_,o)}),s)oe("update() called with empty data.  Don't do anything."),qr(n,i,"ok",void 0);else{const c=Ls(n),u=Wm(n.serverSyncTree_,e,a,c);Ds(n.eventQueue_,u),n.server_.merge(e.toString(),t,(d,v)=>{const m=d==="ok";m||me("update at "+e+" failed: "+d);const E=dt(n.serverSyncTree_,c,!m),b=E.length>0?rn(n,e):e;Se(n.eventQueue_,b,E),qr(n,i,d,v)}),ae(t,d=>{const v=jo(n,Y(e,d));rn(n,v)}),Se(n.eventQueue_,e,[])}}function Ev(n){pn(n,"onDisconnectEvents");const e=_i(n),t=is();Ur(n.onDisconnect_,V(),(s,o)=>{const a=au(s,o,n.serverSyncTree_,e);Bh(t,s,a)});let i=[];Ur(t,V(),(s,o)=>{i=i.concat(fi(n.serverSyncTree_,s,o));const a=jo(n,s);rn(n,a)}),n.onDisconnect_=is(),Se(n.eventQueue_,V(),i)}function Tv(n,e,t){let i;L(e._path)===".info"?i=$r(n.infoSyncTree_,e,t):i=$r(n.serverSyncTree_,e,t),pu(n.eventQueue_,e._path,i)}function Gl(n,e,t){let i;L(e._path)===".info"?i=us(n.infoSyncTree_,e,t):i=us(n.serverSyncTree_,e,t),pu(n.eventQueue_,e._path,i)}function Cv(n){n.persistentConnection_&&n.persistentConnection_.interrupt(pv)}function pn(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),oe(t,...e)}function qr(n,e,t,i){e&&dn(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let o=s;i&&(o+=": "+i);const a=new Error(o);a.code=s,e(a)}})}function Sv(n,e,t,i,s,o){pn(n,"transaction on "+e);const a={path:e,update:t,onComplete:i,status:null,order:dh(),applyLocally:o,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},c=Vo(n,e,void 0);a.currentInputSnapshot=c;const u=a.update(c.val());if(u===void 0)a.unwatcher(),a.currentOutputSnapshotRaw=null,a.currentOutputSnapshotResolved=null,a.onComplete&&a.onComplete(null,!1,a.currentInputSnapshot);else{gi("transaction failed: Data returned ",u,a.path),a.status=0;const d=Ps(n.transactionQueueTree_,e),v=Vt(d)||[];v.push(a),xo(d,v);let m;typeof u=="object"&&u!==null&&Ue(u,".priority")?(m=kt(u,".priority"),A(uu(m),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):m=(As(n.serverSyncTree_,e)||O.EMPTY_NODE).getPriority().val();const E=_i(n),b=ee(u,m),R=Do(b,c,E);a.currentOutputSnapshotRaw=b,a.currentOutputSnapshotResolved=R,a.currentWriteId=Ls(n);const N=Ro(n.serverSyncTree_,e,R,a.currentWriteId,a.applyLocally);Se(n.eventQueue_,e,N),Ms(n,n.transactionQueueTree_)}}function Vo(n,e,t){return As(n.serverSyncTree_,e,t)||O.EMPTY_NODE}function Ms(n,e=n.transactionQueueTree_){if(e||xs(n,e),Vt(e)){const t=vu(n,e);A(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&bv(n,pi(e),t)}else lu(e)&&Ns(e,t=>{Ms(n,t)})}function bv(n,e,t){const i=t.map(d=>d.currentWriteId),s=Vo(n,e,i);let o=s;const a=s.hash();for(let d=0;d<t.length;d++){const v=t[d];A(v.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),v.status=1,v.retryCount++;const m=_e(e,v.path);o=o.updateChild(m,v.currentOutputSnapshotRaw)}const c=o.val(!0),u=e;n.server_.put(u.toString(),c,d=>{pn(n,"transaction put response",{path:u.toString(),status:d});let v=[];if(d==="ok"){const m=[];for(let E=0;E<t.length;E++)t[E].status=2,v=v.concat(dt(n.serverSyncTree_,t[E].currentWriteId)),t[E].onComplete&&m.push(()=>t[E].onComplete(null,!0,t[E].currentOutputSnapshotResolved)),t[E].unwatcher();xs(n,Ps(n.transactionQueueTree_,e)),Ms(n,n.transactionQueueTree_),Se(n.eventQueue_,e,v);for(let E=0;E<m.length;E++)dn(m[E])}else{if(d==="datastale")for(let m=0;m<t.length;m++)t[m].status===3?t[m].status=4:t[m].status=0;else{me("transaction at "+u.toString()+" failed: "+d);for(let m=0;m<t.length;m++)t[m].status=4,t[m].abortReason=d}rn(n,e)}},a)}function rn(n,e){const t=mu(n,e),i=pi(t),s=vu(n,t);return Rv(n,s,i),i}function Rv(n,e,t){if(e.length===0)return;const i=[];let s=[];const a=e.filter(c=>c.status===0).map(c=>c.currentWriteId);for(let c=0;c<e.length;c++){const u=e[c],d=_e(t,u.path);let v=!1,m;if(A(d!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)v=!0,m=u.abortReason,s=s.concat(dt(n.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=gv)v=!0,m="maxretry",s=s.concat(dt(n.serverSyncTree_,u.currentWriteId,!0));else{const E=Vo(n,u.path,a);u.currentInputSnapshot=E;const b=e[c].update(E.val());if(b!==void 0){gi("transaction failed: Data returned ",b,u.path);let R=ee(b);typeof b=="object"&&b!=null&&Ue(b,".priority")||(R=R.updatePriority(E.getPriority()));const P=u.currentWriteId,X=_i(n),Z=Do(R,E,X);u.currentOutputSnapshotRaw=R,u.currentOutputSnapshotResolved=Z,u.currentWriteId=Ls(n),a.splice(a.indexOf(P),1),s=s.concat(Ro(n.serverSyncTree_,u.path,Z,u.currentWriteId,u.applyLocally)),s=s.concat(dt(n.serverSyncTree_,P,!0))}else v=!0,m="nodata",s=s.concat(dt(n.serverSyncTree_,u.currentWriteId,!0))}Se(n.eventQueue_,t,s),s=[],v&&(e[c].status=2,function(E){setTimeout(E,Math.floor(0))}(e[c].unwatcher),e[c].onComplete&&(m==="nodata"?i.push(()=>e[c].onComplete(null,!1,e[c].currentInputSnapshot)):i.push(()=>e[c].onComplete(new Error(m),!1,null))))}xs(n,n.transactionQueueTree_);for(let c=0;c<i.length;c++)dn(i[c]);Ms(n,n.transactionQueueTree_)}function mu(n,e){let t,i=n.transactionQueueTree_;for(t=L(e);t!==null&&Vt(i)===void 0;)i=Ps(i,t),e=G(e),t=L(e);return i}function vu(n,e){const t=[];return yu(n,e,t),t.sort((i,s)=>i.order-s.order),t}function yu(n,e,t){const i=Vt(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Ns(e,s=>{yu(n,s,t)})}function xs(n,e){const t=Vt(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,xo(e,t.length>0?t:void 0)}Ns(e,i=>{xs(n,i)})}function jo(n,e){const t=pi(mu(n,e)),i=Ps(n.transactionQueueTree_,e);return iv(i,s=>{Sr(n,s)}),Sr(n,i),cu(i,s=>{Sr(n,s)}),t}function Sr(n,e){const t=Vt(e);if(t){const i=[];let s=[],o=-1;for(let a=0;a<t.length;a++)t[a].status===3||(t[a].status===1?(A(o===a-1,"All SENT items should be at beginning of queue."),o=a,t[a].status=3,t[a].abortReason="set"):(A(t[a].status===0,"Unexpected transaction status in abort"),t[a].unwatcher(),s=s.concat(dt(n.serverSyncTree_,t[a].currentWriteId,!0)),t[a].onComplete&&i.push(t[a].onComplete.bind(null,new Error("set"),!1,null))));o===-1?xo(e,void 0):t.length=o+1,Se(n.eventQueue_,pi(e),s);for(let a=0;a<i.length;a++)dn(i[a])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Av(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function kv(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):me(`Invalid query segment '${t}' in query '${n}'`)}return e}const ql=function(n,e){const t=Pv(n),i=t.namespace;t.domain==="firebase.com"&&et(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&et("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||jg();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Sh(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new H(t.pathString)}},Pv=function(n){let e="",t="",i="",s="",o="",a=!0,c="https",u=443;if(typeof n=="string"){let d=n.indexOf("//");d>=0&&(c=n.substring(0,d-1),n=n.substring(d+2));let v=n.indexOf("/");v===-1&&(v=n.length);let m=n.indexOf("?");m===-1&&(m=n.length),e=n.substring(0,Math.min(v,m)),v<m&&(s=Av(n.substring(v,m)));const E=kv(n.substring(Math.min(n.length,m)));d=e.indexOf(":"),d>=0?(a=c==="https"||c==="wss",u=parseInt(e.substring(d+1),10)):d=e.length;const b=e.slice(0,d);if(b.toLowerCase()==="localhost")t="localhost";else if(b.split(".").length<=2)t=b;else{const R=e.indexOf(".");i=e.substring(0,R).toLowerCase(),t=e.substring(R+1),o=i}"ns"in E&&(o=E.ns)}return{host:e,port:u,domain:t,subdomain:i,secure:a,scheme:c,pathString:s,namespace:o}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zl="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Nv=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const o=new Array(8);for(s=7;s>=0;s--)o[s]=zl.charAt(t%64),t=Math.floor(t/64);A(t===0,"Cannot push at time == 0");let a=o.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)a+=zl.charAt(e[s]);return A(a.length===20,"nextPushId: Length should be 20."),a}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ov{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+te(this.snapshot.exportVal())}}class Dv{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return A(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Ho{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return x(this._path)?null:po(this._path)}get ref(){return new Be(this._repo,this._path)}get _queryIdentifier(){const e=Nl(this._queryParams),t=co(e);return t==="{}"?"default":t}get _queryObject(){return Nl(this._queryParams)}isEqual(e){if(e=Q(e),!(e instanceof Ho))return!1;const t=this._repo===e._repo,i=go(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+T_(this._path)}}class Be extends Ho{constructor(e,t){super(e,t,new yo,!1)}get parent(){const e=Lh(this._path);return e===null?null:new Be(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class on{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new H(e),i=ri(this.ref,e);return new on(this._node.getChild(t),i,K)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new on(s,ri(this.ref,i),K)))}hasChild(e){const t=new H(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function qw(n,e){return n=Q(n),n._checkNotDeleted("ref"),e!==void 0?ri(n._root,e):n._root}function ri(n,e){return n=Q(n),L(n._path)===null?hv("child","path",e):fu("child","path",e),new Be(n._repo,Y(n._path,e))}function zw(n,e){n=Q(n),Os("push",n._path),du("push",e,n._path,!0);const t=_u(n._repo),i=Nv(t),s=ri(n,i),o=ri(n,i);let a;return e!=null?a=wu(o,e).then(()=>o):a=Promise.resolve(o),s.then=a.then.bind(a),s.catch=a.then.bind(a,void 0),s}function Kw(n){return Os("remove",n._path),wu(n,null)}function wu(n,e){n=Q(n),Os("set",n._path),du("set",e,n._path,!1);const t=new hn;return Iv(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Yw(n,e){cv("update",e,n._path);const t=new hn;return wv(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Xw(n){n=Q(n);const e=new Iu(()=>{}),t=new Fs(e);return yv(n._repo,n,t).then(i=>new on(i,new Be(n._repo,n._path),n._queryParams.getIndex()))}class Fs{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Ov("value",this,new on(e.snapshotNode,new Be(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Dv(this,e,t):null}matches(e){return e instanceof Fs?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Lv(n,e,t,i,s){let o;if(typeof i=="object"&&(o=void 0,s=i),typeof i=="function"&&(o=i),s&&s.onlyOnce){const u=t,d=(v,m)=>{Gl(n._repo,n,c),u(v,m)};d.userCallback=t.userCallback,d.context=t.context,t=d}const a=new Iu(t,o||void 0),c=new Fs(a);return Tv(n._repo,n,c),()=>Gl(n._repo,n,c)}function Mv(n,e,t,i){return Lv(n,"value",e,t,i)}Mm(Be);jm(Be);/**
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
 */const xv="FIREBASE_DATABASE_EMULATOR_HOST",zr={};let Fv=!1;function Uv(n,e,t,i){n.repoInfo_=new Sh(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function Vv(n,e,t,i,s){let o=i||n.options.databaseURL;o===void 0&&(n.options.projectId||et("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),oe("Using default host for project ",n.options.projectId),o=`${n.options.projectId}-default-rtdb.firebaseio.com`);let a=ql(o,s),c=a.repoInfo,u;typeof process<"u"&&fl&&(u=fl[xv]),u?(o=`http://${u}?ns=${c.namespace}`,a=ql(o,s),c=a.repoInfo):a.repoInfo.secure;const d=new Jg(n.name,n.options,e);uv("Invalid Firebase Database URL",a),x(a.path)||et("Database URL must point to the root of a Firebase Database (not including a child path).");const v=Hv(c,n,d,new Xg(n.name,t));return new Bv(v,n)}function jv(n,e){const t=zr[e];(!t||t[n.key]!==n)&&et(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Cv(n),delete t[n.key]}function Hv(n,e,t,i){let s=zr[e.name];s||(s={},zr[e.name]=s);let o=s[n.toURLString()];return o&&et("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new _v(n,Fv,t,i),s[n.toURLString()]=o,o}class Bv{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(mv(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Be(this._repo,V())),this._rootInternal}_delete(){return this._rootInternal!==null&&(jv(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&et("Cannot call "+e+" on a deleted database.")}}function Jw(n=ci(),e){const t=nt(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=eo("database");i&&Wv(t,...i)}return t}function Wv(n,e,t,i={}){n=Q(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&et("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let o;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&et('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Bi(Bi.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:to(i.mockUserToken,n.app.options.projectId);o=new Bi(a)}Uv(s,e,t,o)}/**
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
 */function $v(n){Mg(It),ke(new Ce("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return Vv(i,s,o,t)},"PUBLIC").setMultipleInstances(!0)),de(pl,gl,n),de(pl,gl,"esm2017")}/**
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
 */class Gv{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function Qw(n,e,t){var i;if(n=Q(n),Os("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const s=(i=void 0)!==null&&i!==void 0?i:!0,o=new hn,a=(u,d,v)=>{let m=null;u?o.reject(u):(m=new on(v,new Be(n._repo,n._path),K),o.resolve(new Gv(d,m)))},c=Mv(n,()=>{});return Sv(n._repo,n._path,e,a,c,s),o.promise}Qe.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Qe.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};$v();function Eu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const qv=Eu,Tu=new xt("auth","Firebase",Eu());/**
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
 */const ds=new li("@firebase/auth");function zv(n,...e){ds.logLevel<=j.WARN&&ds.warn(`Auth (${It}): ${n}`,...e)}function Wi(n,...e){ds.logLevel<=j.ERROR&&ds.error(`Auth (${It}): ${n}`,...e)}/**
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
 */function Fe(n,...e){throw Bo(n,...e)}function Ve(n,...e){return Bo(n,...e)}function Cu(n,e,t){const i=Object.assign(Object.assign({},qv()),{[e]:t});return new xt("auth","Firebase",i).create(e,{appName:n.name})}function _t(n){return Cu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Bo(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Tu.create(n,...e)}function D(n,e,...t){if(!n)throw Bo(e,...t)}function Ye(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Wi(e),new Error(e)}function tt(n,e){n||Ye(e)}/**
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
 */function Kr(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Kv(){return Kl()==="http:"||Kl()==="https:"}function Kl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function Yv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Kv()||Mc()||"connection"in navigator)?navigator.onLine:!0}function Xv(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class mi{constructor(e,t){this.shortDelay=e,this.longDelay=t,tt(t>e,"Short delay should be less than long delay!"),this.isMobile=no()||xc()}get(){return Yv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Wo(n,e){tt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Su{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ye("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ye("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ye("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Jv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Qv=new mi(3e4,6e4);function jt(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function wt(n,e,t,i,s={}){return bu(n,s,async()=>{let o={},a={};i&&(e==="GET"?a=i:o={body:JSON.stringify(i)});const c=un(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:u},o);return Zd()||(d.referrerPolicy="no-referrer"),Su.fetch()(Ru(n,n.config.apiHost,t,c),d)})}async function bu(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},Jv),e);try{const s=new ey(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Vi(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const c=o.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Vi(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Vi(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Vi(n,"user-disabled",a);const v=i[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Cu(n,v,d);Fe(n,v)}}catch(s){if(s instanceof Pe)throw s;Fe(n,"network-request-failed",{message:String(s)})}}async function Us(n,e,t,i,s={}){const o=await wt(n,e,t,i,s);return"mfaPendingCredential"in o&&Fe(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Ru(n,e,t,i){const s=`${e}${t}?${i}`;return n.config.emulator?Wo(n.config,s):`${n.config.apiScheme}://${s}`}function Zv(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ey{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Ve(this.auth,"network-request-failed")),Qv.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Vi(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=Ve(n,e,i);return s.customData._tokenResponse=t,s}function Yl(n){return n!==void 0&&n.enterprise!==void 0}class ty{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Zv(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function ny(n,e){return wt(n,"GET","/v2/recaptchaConfig",jt(n,e))}/**
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
 */async function iy(n,e){return wt(n,"POST","/v1/accounts:delete",e)}async function Au(n,e){return wt(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function qn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function sy(n,e=!1){const t=Q(n),i=await t.getIdToken(e),s=$o(i);D(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:s,token:i,authTime:qn(br(s.auth_time)),issuedAtTime:qn(br(s.iat)),expirationTime:qn(br(s.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function br(n){return Number(n)*1e3}function $o(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Wi("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ki(t);return s?JSON.parse(s):(Wi("Failed to decode base64 JWT payload"),null)}catch(s){return Wi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Xl(n){const e=$o(n);return D(e,"internal-error"),D(typeof e.exp<"u","internal-error"),D(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function oi(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Pe&&ry(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function ry({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class oy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Yr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=qn(this.lastLoginAt),this.creationTime=qn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function fs(n){var e;const t=n.auth,i=await n.getIdToken(),s=await oi(n,Au(t,{idToken:i}));D(s==null?void 0:s.users.length,t,"internal-error");const o=s.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?ku(o.providerUserInfo):[],c=ly(n.providerData,a),u=n.isAnonymous,d=!(n.email&&o.passwordHash)&&!(c!=null&&c.length),v=u?d:!1,m={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new Yr(o.createdAt,o.lastLoginAt),isAnonymous:v};Object.assign(n,m)}async function ay(n){const e=Q(n);await fs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ly(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function ku(n){return n.map(e=>{var{providerId:t}=e,i=Jr(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function cy(n,e){const t=await bu(n,{},async()=>{const i=un({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,a=Ru(n,s,"/v1/token",`key=${o}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Su.fetch()(a,{method:"POST",headers:c,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function hy(n,e){return wt(n,"POST","/v2/accounts:revokeToken",jt(n,e))}/**
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
 */class Jt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){D(e.idToken,"internal-error"),D(typeof e.idToken<"u","internal-error"),D(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Xl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){D(e.length!==0,"internal-error");const t=Xl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(D(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:o}=await cy(e,t);this.updateTokensAndExpiration(i,s,Number(o))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:o}=t,a=new Jt;return i&&(D(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),s&&(D(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),o&&(D(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Jt,this.toJSON())}_performRefresh(){return Ye("not implemented")}}/**
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
 */function at(n,e){D(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Xe{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,o=Jr(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new oy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Yr(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await oi(this,this.stsTokenManager.getToken(this.auth,e));return D(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return sy(this,e)}reload(){return ay(this)}_assign(e){this!==e&&(D(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Xe(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){D(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await fs(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ze(this.auth.app))return Promise.reject(_t(this.auth));const e=await this.getIdToken();return await oi(this,iy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,o,a,c,u,d,v;const m=(i=t.displayName)!==null&&i!==void 0?i:void 0,E=(s=t.email)!==null&&s!==void 0?s:void 0,b=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,R=(a=t.photoURL)!==null&&a!==void 0?a:void 0,N=(c=t.tenantId)!==null&&c!==void 0?c:void 0,P=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,X=(d=t.createdAt)!==null&&d!==void 0?d:void 0,Z=(v=t.lastLoginAt)!==null&&v!==void 0?v:void 0,{uid:B,emailVerified:q,isAnonymous:be,providerData:ne,stsTokenManager:w}=t;D(B&&w,e,"internal-error");const p=Jt.fromJSON(this.name,w);D(typeof B=="string",e,"internal-error"),at(m,e.name),at(E,e.name),D(typeof q=="boolean",e,"internal-error"),D(typeof be=="boolean",e,"internal-error"),at(b,e.name),at(R,e.name),at(N,e.name),at(P,e.name),at(X,e.name),at(Z,e.name);const _=new Xe({uid:B,auth:e,email:E,emailVerified:q,displayName:m,isAnonymous:be,photoURL:R,phoneNumber:b,tenantId:N,stsTokenManager:p,createdAt:X,lastLoginAt:Z});return ne&&Array.isArray(ne)&&(_.providerData=ne.map(y=>Object.assign({},y))),P&&(_._redirectEventId=P),_}static async _fromIdTokenResponse(e,t,i=!1){const s=new Jt;s.updateFromServerResponse(t);const o=new Xe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await fs(o),o}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];D(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?ku(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(o!=null&&o.length),c=new Jt;c.updateFromIdToken(i);const u=new Xe({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Yr(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(o!=null&&o.length)};return Object.assign(u,d),u}}/**
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
 */const Jl=new Map;function Je(n){tt(n instanceof Function,"Expected a class definition");let e=Jl.get(n);return e?(tt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Jl.set(n,e),e)}/**
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
 */class Pu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Pu.type="NONE";const Ql=Pu;/**
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
 */function $i(n,e,t){return`firebase:${n}:${e}:${t}`}class Qt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:o}=this.auth;this.fullUserKey=$i(this.userKey,s.apiKey,o),this.fullPersistenceKey=$i("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Xe._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Qt(Je(Ql),e,i);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=s[0]||Je(Ql);const a=$i(i,e.config.apiKey,e.name);let c=null;for(const d of t)try{const v=await d._get(a);if(v){const m=Xe._fromJSON(e,v);d!==o&&(c=m),o=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!u.length?new Qt(o,e,i):(o=u[0],c&&await o._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new Qt(o,e,i))}}/**
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
 */function Zl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Lu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Nu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(xu(e))return"Blackberry";if(Fu(e))return"Webos";if(Ou(e))return"Safari";if((e.includes("chrome/")||Du(e))&&!e.includes("edge/"))return"Chrome";if(Mu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Nu(n=ve()){return/firefox\//i.test(n)}function Ou(n=ve()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Du(n=ve()){return/crios\//i.test(n)}function Lu(n=ve()){return/iemobile/i.test(n)}function Mu(n=ve()){return/android/i.test(n)}function xu(n=ve()){return/blackberry/i.test(n)}function Fu(n=ve()){return/webos/i.test(n)}function Go(n=ve()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function uy(n=ve()){var e;return Go(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function dy(){return ef()&&document.documentMode===10}function Uu(n=ve()){return Go(n)||Mu(n)||Fu(n)||xu(n)||/windows phone/i.test(n)||Lu(n)}/**
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
 */function Vu(n,e=[]){let t;switch(n){case"Browser":t=Zl(ve());break;case"Worker":t=`${Zl(ve())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${It}/${i}`}/**
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
 */class fy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=o=>new Promise((a,c)=>{try{const u=e(o);a(u)}catch(u){c(u)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
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
 */async function py(n,e={}){return wt(n,"GET","/v2/passwordPolicy",jt(n,e))}/**
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
 */const gy=6;class _y{constructor(e){var t,i,s,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:gy,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,o,a,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(i=u.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsUppercaseLetter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
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
 */class my{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ec(this),this.idTokenSubscription=new ec(this),this.beforeStateQueue=new fy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Tu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Je(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await Qt.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Au(this,{idToken:e}),i=await Xe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ze(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&(u!=null&&u.user)&&(s=u.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return D(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await fs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Xv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ze(this.app))return Promise.reject(_t(this));const t=e?Q(e):null;return t&&D(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&D(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ze(this.app)?Promise.reject(_t(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ze(this.app)?Promise.reject(_t(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Je(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await py(this),t=new _y(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new xt("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await hy(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Je(e)||this._popupRedirectResolver;D(t,this,"argument-error"),this.redirectPersistenceManager=await Qt.create(this,[Je(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(D(c,this,"internal-error"),c.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,i,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return D(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Vu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&zv(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function gn(n){return Q(n)}class ec{constructor(e){this.auth=e,this.observer=null,this.addObserver=hf(t=>this.observer=t)}get next(){return D(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Vs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function vy(n){Vs=n}function ju(n){return Vs.loadJS(n)}function yy(){return Vs.recaptchaEnterpriseScript}function Iy(){return Vs.gapiScript}function wy(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const Ey="recaptcha-enterprise",Ty="NO_RECAPTCHA";class Cy{constructor(e){this.type=Ey,this.auth=gn(e)}async verify(e="verify",t=!1){async function i(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,c)=>{ny(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new ty(u);return o.tenantId==null?o._agentRecaptchaConfig=d:o._tenantRecaptchaConfigs[o.tenantId]=d,a(d.siteKey)}}).catch(u=>{c(u)})})}function s(o,a,c){const u=window.grecaptcha;Yl(u)?u.enterprise.ready(()=>{u.enterprise.execute(o,{action:e}).then(d=>{a(d)}).catch(()=>{a(Ty)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,a)=>{i(this.auth).then(c=>{if(!t&&Yl(window.grecaptcha))s(c,o,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=yy();u.length!==0&&(u+=c),ju(u).then(()=>{s(c,o,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function tc(n,e,t,i=!1){const s=new Cy(n);let o;try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const a=Object.assign({},e);return i?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function nc(n,e,t,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await tc(n,e,t,t==="getOobCode");return i(n,o)}else return i(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await tc(n,e,t,t==="getOobCode");return i(n,a)}else return Promise.reject(o)})}/**
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
 */function Sy(n,e){const t=nt(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),o=t.getOptions();if(Xn(o,e??{}))return s;Fe(s,"already-initialized")}return t.initialize({options:e})}function by(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Je);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function Ry(n,e,t){const i=gn(n);D(i._canInitEmulator,i,"emulator-config-failed"),D(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,o=Hu(e),{host:a,port:c}=Ay(e),u=c===null?"":`:${c}`;i.config.emulator={url:`${o}//${a}${u}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})}),ky()}function Hu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Ay(n){const e=Hu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const o=s[1];return{host:o,port:ic(i.substr(o.length+1))}}else{const[o,a]=i.split(":");return{host:o,port:ic(a)}}}function ic(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function ky(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class qo{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ye("not implemented")}_getIdTokenResponse(e){return Ye("not implemented")}_linkToIdToken(e,t){return Ye("not implemented")}_getReauthenticationResolver(e){return Ye("not implemented")}}async function Py(n,e){return wt(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function Ny(n,e){return Us(n,"POST","/v1/accounts:signInWithPassword",jt(n,e))}/**
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
 */async function Oy(n,e){return Us(n,"POST","/v1/accounts:signInWithEmailLink",jt(n,e))}async function Dy(n,e){return Us(n,"POST","/v1/accounts:signInWithEmailLink",jt(n,e))}/**
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
 */class ai extends qo{constructor(e,t,i,s=null){super("password",i),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new ai(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new ai(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return nc(e,t,"signInWithPassword",Ny);case"emailLink":return Oy(e,{email:this._email,oobCode:this._password});default:Fe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return nc(e,i,"signUpPassword",Py);case"emailLink":return Dy(e,{idToken:t,email:this._email,oobCode:this._password});default:Fe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Zt(n,e){return Us(n,"POST","/v1/accounts:signInWithIdp",jt(n,e))}/**
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
 */const Ly="http://localhost";class Mt extends qo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Mt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Fe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,o=Jr(t,["providerId","signInMethod"]);if(!i||!s)return null;const a=new Mt(i,s);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Zt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Zt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Zt(e,t)}buildRequest(){const e={requestUri:Ly,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=un(t)}return e}}/**
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
 */function My(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function xy(n){const e=Un(Vn(n)).link,t=e?Un(Vn(e)).deep_link_id:null,i=Un(Vn(n)).deep_link_id;return(i?Un(Vn(i)).link:null)||i||t||e||n}class zo{constructor(e){var t,i,s,o,a,c;const u=Un(Vn(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,v=(i=u.oobCode)!==null&&i!==void 0?i:null,m=My((s=u.mode)!==null&&s!==void 0?s:null);D(d&&v&&m,"argument-error"),this.apiKey=d,this.operation=m,this.code=v,this.continueUrl=(o=u.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(a=u.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){const t=xy(e);try{return new zo(t)}catch{return null}}}/**
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
 */class _n{constructor(){this.providerId=_n.PROVIDER_ID}static credential(e,t){return ai._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=zo.parseLink(t);return D(i,"argument-error"),ai._fromEmailAndCode(e,i.code,i.tenantId)}}_n.PROVIDER_ID="password";_n.EMAIL_PASSWORD_SIGN_IN_METHOD="password";_n.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Bu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class vi extends Bu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class lt extends vi{constructor(){super("facebook.com")}static credential(e){return Mt._fromParams({providerId:lt.PROVIDER_ID,signInMethod:lt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return lt.credentialFromTaggedObject(e)}static credentialFromError(e){return lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return lt.credential(e.oauthAccessToken)}catch{return null}}}lt.FACEBOOK_SIGN_IN_METHOD="facebook.com";lt.PROVIDER_ID="facebook.com";/**
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
 */class ct extends vi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Mt._fromParams({providerId:ct.PROVIDER_ID,signInMethod:ct.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ct.credentialFromTaggedObject(e)}static credentialFromError(e){return ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return ct.credential(t,i)}catch{return null}}}ct.GOOGLE_SIGN_IN_METHOD="google.com";ct.PROVIDER_ID="google.com";/**
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
 */class ht extends vi{constructor(){super("github.com")}static credential(e){return Mt._fromParams({providerId:ht.PROVIDER_ID,signInMethod:ht.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ht.credentialFromTaggedObject(e)}static credentialFromError(e){return ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ht.credential(e.oauthAccessToken)}catch{return null}}}ht.GITHUB_SIGN_IN_METHOD="github.com";ht.PROVIDER_ID="github.com";/**
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
 */class ut extends vi{constructor(){super("twitter.com")}static credential(e,t){return Mt._fromParams({providerId:ut.PROVIDER_ID,signInMethod:ut.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ut.credentialFromTaggedObject(e)}static credentialFromError(e){return ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return ut.credential(t,i)}catch{return null}}}ut.TWITTER_SIGN_IN_METHOD="twitter.com";ut.PROVIDER_ID="twitter.com";/**
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
 */class an{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const o=await Xe._fromIdTokenResponse(e,i,s),a=sc(i);return new an({user:o,providerId:a,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=sc(i);return new an({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function sc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ps extends Pe{constructor(e,t,i,s){var o;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,ps.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new ps(e,t,i,s)}}function Wu(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?ps._fromErrorAndOperation(n,o,e,i):o})}async function Fy(n,e,t=!1){const i=await oi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return an._forOperation(n,"link",i)}/**
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
 */async function Uy(n,e,t=!1){const{auth:i}=n;if(ze(i.app))return Promise.reject(_t(i));const s="reauthenticate";try{const o=await oi(n,Wu(i,s,e,n),t);D(o.idToken,i,"internal-error");const a=$o(o.idToken);D(a,i,"internal-error");const{sub:c}=a;return D(n.uid===c,i,"user-mismatch"),an._forOperation(n,s,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Fe(i,"user-mismatch"),o}}/**
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
 */async function $u(n,e,t=!1){if(ze(n.app))return Promise.reject(_t(n));const i="signIn",s=await Wu(n,i,e),o=await an._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(o.user),o}async function Vy(n,e){return $u(gn(n),e)}/**
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
 */async function jy(n){const e=gn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Zw(n,e,t){return ze(n.app)?Promise.reject(_t(n)):Vy(Q(n),_n.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&jy(n),i})}/**
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
 */function eE(n,e){return Q(n).setPersistence(e)}function Hy(n,e,t,i){return Q(n).onIdTokenChanged(e,t,i)}function By(n,e,t){return Q(n).beforeAuthStateChanged(e,t)}function tE(n,e,t,i){return Q(n).onAuthStateChanged(e,t,i)}function nE(n){return Q(n).signOut()}const gs="__sak";/**
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
 */class Gu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(gs,"1"),this.storage.removeItem(gs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Wy=1e3,$y=10;class qu extends Gu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Uu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(i);!t&&this.localCache[i]===a||this.notifyListeners(i,a)},o=this.storage.getItem(i);dy()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,$y):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Wy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}qu.type="LOCAL";const Gy=qu;/**
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
 */class zu extends Gu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}zu.type="SESSION";const Ku=zu;/**
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
 */function qy(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class js{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new js(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:o}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const c=Array.from(a).map(async d=>d(t.origin,o)),u=await qy(c);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}js.receivers=[];/**
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
 */function Ko(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class zy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,a;return new Promise((c,u)=>{const d=Ko("",20);s.port1.start();const v=setTimeout(()=>{u(new Error("unsupported_event"))},i);a={messageChannel:s,onMessage(m){const E=m;if(E.data.eventId===d)switch(E.data.status){case"ack":clearTimeout(v),o=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),c(E.data.response);break;default:clearTimeout(v),clearTimeout(o),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function je(){return window}function Ky(n){je().location.href=n}/**
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
 */function Yu(){return typeof je().WorkerGlobalScope<"u"&&typeof je().importScripts=="function"}async function Yy(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Xy(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Jy(){return Yu()?self:null}/**
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
 */const Xu="firebaseLocalStorageDb",Qy=1,_s="firebaseLocalStorage",Ju="fbase_key";class yi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Hs(n,e){return n.transaction([_s],e?"readwrite":"readonly").objectStore(_s)}function Zy(){const n=indexedDB.deleteDatabase(Xu);return new yi(n).toPromise()}function Xr(){const n=indexedDB.open(Xu,Qy);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(_s,{keyPath:Ju})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(_s)?e(i):(i.close(),await Zy(),e(await Xr()))})})}async function rc(n,e,t){const i=Hs(n,!0).put({[Ju]:e,value:t});return new yi(i).toPromise()}async function eI(n,e){const t=Hs(n,!1).get(e),i=await new yi(t).toPromise();return i===void 0?null:i.value}function oc(n,e){const t=Hs(n,!0).delete(e);return new yi(t).toPromise()}const tI=800,nI=3;class Qu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Xr(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>nI)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Yu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=js._getInstance(Jy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Yy(),!this.activeServiceWorker)return;this.sender=new zy(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Xy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Xr();return await rc(e,gs,"1"),await oc(e,gs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>rc(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>eI(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>oc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=Hs(s,!1).getAll();return new yi(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),tI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Qu.type="LOCAL";const iI=Qu;new mi(3e4,6e4);/**
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
 */function sI(n,e){return e?Je(e):(D(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Yo extends qo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Zt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Zt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Zt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function rI(n){return $u(n.auth,new Yo(n),n.bypassAuthState)}function oI(n){const{auth:e,user:t}=n;return D(t,e,"internal-error"),Uy(t,new Yo(n),n.bypassAuthState)}async function aI(n){const{auth:e,user:t}=n;return D(t,e,"internal-error"),Fy(t,new Yo(n),n.bypassAuthState)}/**
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
 */class Zu{constructor(e,t,i,s,o=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:o,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:i,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return rI;case"linkViaPopup":case"linkViaRedirect":return aI;case"reauthViaPopup":case"reauthViaRedirect":return oI;default:Fe(this.auth,"internal-error")}}resolve(e){tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){tt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const lI=new mi(2e3,1e4);class Kt extends Zu{constructor(e,t,i,s,o){super(e,t,s,o),this.provider=i,this.authWindow=null,this.pollId=null,Kt.currentPopupAction&&Kt.currentPopupAction.cancel(),Kt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return D(e,this.auth,"internal-error"),e}async onExecution(){tt(this.filter.length===1,"Popup operations only handle one event");const e=Ko();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ve(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ve(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Kt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ve(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,lI.get())};e()}}Kt.currentPopupAction=null;/**
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
 */const cI="pendingRedirect",Gi=new Map;class hI extends Zu{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Gi.get(this.auth._key());if(!e){try{const i=await uI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Gi.set(this.auth._key(),e)}return this.bypassAuthState||Gi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function uI(n,e){const t=pI(e),i=fI(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function dI(n,e){Gi.set(n._key(),e)}function fI(n){return Je(n._redirectPersistence)}function pI(n){return $i(cI,n.config.apiKey,n.name)}async function gI(n,e,t=!1){if(ze(n.app))return Promise.reject(_t(n));const i=gn(n),s=sI(i,e),a=await new hI(i,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}/**
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
 */const _I=10*60*1e3;class mI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!vI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!ed(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(Ve(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=_I&&this.cachedEventUids.clear(),this.cachedEventUids.has(ac(e))}saveEventToCache(e){this.cachedEventUids.add(ac(e)),this.lastProcessedEventTime=Date.now()}}function ac(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function ed({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function vI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ed(n);default:return!1}}/**
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
 */async function yI(n,e={}){return wt(n,"GET","/v1/projects",e)}/**
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
 */const II=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,wI=/^https?/;async function EI(n){if(n.config.emulator)return;const{authorizedDomains:e}=await yI(n);for(const t of e)try{if(TI(t))return}catch{}Fe(n,"unauthorized-domain")}function TI(n){const e=Kr(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===i}if(!wI.test(t))return!1;if(II.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const CI=new mi(3e4,6e4);function lc(){const n=je().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function SI(n){return new Promise((e,t)=>{var i,s,o;function a(){lc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{lc(),t(Ve(n,"network-request-failed"))},timeout:CI.get()})}if(!((s=(i=je().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((o=je().gapi)===null||o===void 0)&&o.load)a();else{const c=wy("iframefcb");return je()[c]=()=>{gapi.load?a():t(Ve(n,"network-request-failed"))},ju(`${Iy()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw qi=null,e})}let qi=null;function bI(n){return qi=qi||SI(n),qi}/**
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
 */const RI=new mi(5e3,15e3),AI="__/auth/iframe",kI="emulator/auth/iframe",PI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},NI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function OI(n){const e=n.config;D(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Wo(e,kI):`https://${n.config.authDomain}/${AI}`,i={apiKey:e.apiKey,appName:n.name,v:It},s=NI.get(n.config.apiHost);s&&(i.eid=s);const o=n._getFrameworks();return o.length&&(i.fw=o.join(",")),`${t}?${un(i).slice(1)}`}async function DI(n){const e=await bI(n),t=je().gapi;return D(t,n,"internal-error"),e.open({where:document.body,url:OI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:PI,dontclear:!0},i=>new Promise(async(s,o)=>{await i.restyle({setHideOnLeave:!1});const a=Ve(n,"network-request-failed"),c=je().setTimeout(()=>{o(a)},RI.get());function u(){je().clearTimeout(c),s(i)}i.ping(u).then(u,()=>{o(a)})}))}/**
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
 */const LI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},MI=500,xI=600,FI="_blank",UI="http://localhost";class cc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function VI(n,e,t,i=MI,s=xI){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let c="";const u=Object.assign(Object.assign({},LI),{width:i.toString(),height:s.toString(),top:o,left:a}),d=ve().toLowerCase();t&&(c=Du(d)?FI:t),Nu(d)&&(e=e||UI,u.scrollbars="yes");const v=Object.entries(u).reduce((E,[b,R])=>`${E}${b}=${R},`,"");if(uy(d)&&c!=="_self")return jI(e||"",c),new cc(null);const m=window.open(e||"",c,v);D(m,n,"popup-blocked");try{m.focus()}catch{}return new cc(m)}function jI(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const HI="__/auth/handler",BI="emulator/auth/handler",WI=encodeURIComponent("fac");async function hc(n,e,t,i,s,o){D(n.config.authDomain,n,"auth-domain-config-required"),D(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:It,eventId:s};if(e instanceof Bu){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Pr(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[v,m]of Object.entries({}))a[v]=m}if(e instanceof vi){const v=e.getScopes().filter(m=>m!=="");v.length>0&&(a.scopes=v.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const v of Object.keys(c))c[v]===void 0&&delete c[v];const u=await n._getAppCheckToken(),d=u?`#${WI}=${encodeURIComponent(u)}`:"";return`${$I(n)}?${un(c).slice(1)}${d}`}function $I({config:n}){return n.emulator?Wo(n,BI):`https://${n.authDomain}/${HI}`}/**
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
 */const Rr="webStorageSupport";class GI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ku,this._completeRedirectFn=gI,this._overrideRedirectResult=dI}async _openPopup(e,t,i,s){var o;tt((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await hc(e,t,i,Kr(),s);return VI(e,a,Ko())}async _openRedirect(e,t,i,s){await this._originValidation(e);const o=await hc(e,t,i,Kr(),s);return Ky(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):(tt(o,"If manager is not set, promise should be"),o)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await DI(e),i=new mI(e);return t.register("authEvent",s=>(D(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Rr,{type:Rr},s=>{var o;const a=(o=s==null?void 0:s[0])===null||o===void 0?void 0:o[Rr];a!==void 0&&t(!!a),Fe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=EI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Uu()||Ou()||Go()}}const qI=GI;var uc="@firebase/auth",dc="1.7.9";/**
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
 */class zI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){D(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function KI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function YI(n){ke(new Ce("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=i.options;D(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Vu(n)},d=new my(i,s,o,u);return by(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),ke(new Ce("auth-internal",e=>{const t=gn(e.getProvider("auth").getImmediate());return(i=>new zI(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),de(uc,dc,KI(n)),de(uc,dc,"esm2017")}/**
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
 */const XI=5*60,JI=Lc("authIdTokenMaxAge")||XI;let fc=null;const QI=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>JI)return;const s=t==null?void 0:t.token;fc!==s&&(fc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function iE(n=ci()){const e=nt(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Sy(n,{popupRedirectResolver:qI,persistence:[iI,Gy,Ku]}),i=Lc("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(i,location.origin);if(location.origin===o.origin){const a=QI(o.toString());By(t,a,()=>a(t.currentUser)),Hy(t,c=>a(c))}}const s=Oc("auth");return s&&Ry(t,`http://${s}`),t}function ZI(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}vy({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const o=Ve("internal-error");o.customData=s,t(o)},i.type="text/javascript",i.charset="UTF-8",ZI().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});YI("Browser");var pc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var td;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,p){function _(){}_.prototype=p.prototype,w.D=p.prototype,w.prototype=new _,w.prototype.constructor=w,w.C=function(y,I,C){for(var g=Array(arguments.length-2),$e=2;$e<arguments.length;$e++)g[$e-2]=arguments[$e];return p.prototype[I].apply(y,g)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,t),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,p,_){_||(_=0);var y=Array(16);if(typeof p=="string")for(var I=0;16>I;++I)y[I]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(I=0;16>I;++I)y[I]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=w.g[0],_=w.g[1],I=w.g[2];var C=w.g[3],g=p+(C^_&(I^C))+y[0]+3614090360&4294967295;p=_+(g<<7&4294967295|g>>>25),g=C+(I^p&(_^I))+y[1]+3905402710&4294967295,C=p+(g<<12&4294967295|g>>>20),g=I+(_^C&(p^_))+y[2]+606105819&4294967295,I=C+(g<<17&4294967295|g>>>15),g=_+(p^I&(C^p))+y[3]+3250441966&4294967295,_=I+(g<<22&4294967295|g>>>10),g=p+(C^_&(I^C))+y[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=C+(I^p&(_^I))+y[5]+1200080426&4294967295,C=p+(g<<12&4294967295|g>>>20),g=I+(_^C&(p^_))+y[6]+2821735955&4294967295,I=C+(g<<17&4294967295|g>>>15),g=_+(p^I&(C^p))+y[7]+4249261313&4294967295,_=I+(g<<22&4294967295|g>>>10),g=p+(C^_&(I^C))+y[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=C+(I^p&(_^I))+y[9]+2336552879&4294967295,C=p+(g<<12&4294967295|g>>>20),g=I+(_^C&(p^_))+y[10]+4294925233&4294967295,I=C+(g<<17&4294967295|g>>>15),g=_+(p^I&(C^p))+y[11]+2304563134&4294967295,_=I+(g<<22&4294967295|g>>>10),g=p+(C^_&(I^C))+y[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=C+(I^p&(_^I))+y[13]+4254626195&4294967295,C=p+(g<<12&4294967295|g>>>20),g=I+(_^C&(p^_))+y[14]+2792965006&4294967295,I=C+(g<<17&4294967295|g>>>15),g=_+(p^I&(C^p))+y[15]+1236535329&4294967295,_=I+(g<<22&4294967295|g>>>10),g=p+(I^C&(_^I))+y[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=C+(_^I&(p^_))+y[6]+3225465664&4294967295,C=p+(g<<9&4294967295|g>>>23),g=I+(p^_&(C^p))+y[11]+643717713&4294967295,I=C+(g<<14&4294967295|g>>>18),g=_+(C^p&(I^C))+y[0]+3921069994&4294967295,_=I+(g<<20&4294967295|g>>>12),g=p+(I^C&(_^I))+y[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=C+(_^I&(p^_))+y[10]+38016083&4294967295,C=p+(g<<9&4294967295|g>>>23),g=I+(p^_&(C^p))+y[15]+3634488961&4294967295,I=C+(g<<14&4294967295|g>>>18),g=_+(C^p&(I^C))+y[4]+3889429448&4294967295,_=I+(g<<20&4294967295|g>>>12),g=p+(I^C&(_^I))+y[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=C+(_^I&(p^_))+y[14]+3275163606&4294967295,C=p+(g<<9&4294967295|g>>>23),g=I+(p^_&(C^p))+y[3]+4107603335&4294967295,I=C+(g<<14&4294967295|g>>>18),g=_+(C^p&(I^C))+y[8]+1163531501&4294967295,_=I+(g<<20&4294967295|g>>>12),g=p+(I^C&(_^I))+y[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=C+(_^I&(p^_))+y[2]+4243563512&4294967295,C=p+(g<<9&4294967295|g>>>23),g=I+(p^_&(C^p))+y[7]+1735328473&4294967295,I=C+(g<<14&4294967295|g>>>18),g=_+(C^p&(I^C))+y[12]+2368359562&4294967295,_=I+(g<<20&4294967295|g>>>12),g=p+(_^I^C)+y[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=C+(p^_^I)+y[8]+2272392833&4294967295,C=p+(g<<11&4294967295|g>>>21),g=I+(C^p^_)+y[11]+1839030562&4294967295,I=C+(g<<16&4294967295|g>>>16),g=_+(I^C^p)+y[14]+4259657740&4294967295,_=I+(g<<23&4294967295|g>>>9),g=p+(_^I^C)+y[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=C+(p^_^I)+y[4]+1272893353&4294967295,C=p+(g<<11&4294967295|g>>>21),g=I+(C^p^_)+y[7]+4139469664&4294967295,I=C+(g<<16&4294967295|g>>>16),g=_+(I^C^p)+y[10]+3200236656&4294967295,_=I+(g<<23&4294967295|g>>>9),g=p+(_^I^C)+y[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=C+(p^_^I)+y[0]+3936430074&4294967295,C=p+(g<<11&4294967295|g>>>21),g=I+(C^p^_)+y[3]+3572445317&4294967295,I=C+(g<<16&4294967295|g>>>16),g=_+(I^C^p)+y[6]+76029189&4294967295,_=I+(g<<23&4294967295|g>>>9),g=p+(_^I^C)+y[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=C+(p^_^I)+y[12]+3873151461&4294967295,C=p+(g<<11&4294967295|g>>>21),g=I+(C^p^_)+y[15]+530742520&4294967295,I=C+(g<<16&4294967295|g>>>16),g=_+(I^C^p)+y[2]+3299628645&4294967295,_=I+(g<<23&4294967295|g>>>9),g=p+(I^(_|~C))+y[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=C+(_^(p|~I))+y[7]+1126891415&4294967295,C=p+(g<<10&4294967295|g>>>22),g=I+(p^(C|~_))+y[14]+2878612391&4294967295,I=C+(g<<15&4294967295|g>>>17),g=_+(C^(I|~p))+y[5]+4237533241&4294967295,_=I+(g<<21&4294967295|g>>>11),g=p+(I^(_|~C))+y[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=C+(_^(p|~I))+y[3]+2399980690&4294967295,C=p+(g<<10&4294967295|g>>>22),g=I+(p^(C|~_))+y[10]+4293915773&4294967295,I=C+(g<<15&4294967295|g>>>17),g=_+(C^(I|~p))+y[1]+2240044497&4294967295,_=I+(g<<21&4294967295|g>>>11),g=p+(I^(_|~C))+y[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=C+(_^(p|~I))+y[15]+4264355552&4294967295,C=p+(g<<10&4294967295|g>>>22),g=I+(p^(C|~_))+y[6]+2734768916&4294967295,I=C+(g<<15&4294967295|g>>>17),g=_+(C^(I|~p))+y[13]+1309151649&4294967295,_=I+(g<<21&4294967295|g>>>11),g=p+(I^(_|~C))+y[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=C+(_^(p|~I))+y[11]+3174756917&4294967295,C=p+(g<<10&4294967295|g>>>22),g=I+(p^(C|~_))+y[2]+718787259&4294967295,I=C+(g<<15&4294967295|g>>>17),g=_+(C^(I|~p))+y[9]+3951481745&4294967295,w.g[0]=w.g[0]+p&4294967295,w.g[1]=w.g[1]+(I+(g<<21&4294967295|g>>>11))&4294967295,w.g[2]=w.g[2]+I&4294967295,w.g[3]=w.g[3]+C&4294967295}i.prototype.u=function(w,p){p===void 0&&(p=w.length);for(var _=p-this.blockSize,y=this.B,I=this.h,C=0;C<p;){if(I==0)for(;C<=_;)s(this,w,C),C+=this.blockSize;if(typeof w=="string"){for(;C<p;)if(y[I++]=w.charCodeAt(C++),I==this.blockSize){s(this,y),I=0;break}}else for(;C<p;)if(y[I++]=w[C++],I==this.blockSize){s(this,y),I=0;break}}this.h=I,this.o+=p},i.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var p=1;p<w.length-8;++p)w[p]=0;var _=8*this.o;for(p=w.length-8;p<w.length;++p)w[p]=_&255,_/=256;for(this.u(w),w=Array(16),p=_=0;4>p;++p)for(var y=0;32>y;y+=8)w[_++]=this.g[p]>>>y&255;return w};function o(w,p){var _=c;return Object.prototype.hasOwnProperty.call(_,w)?_[w]:_[w]=p(w)}function a(w,p){this.h=p;for(var _=[],y=!0,I=w.length-1;0<=I;I--){var C=w[I]|0;y&&C==p||(_[I]=C,y=!1)}this.g=_}var c={};function u(w){return-128<=w&&128>w?o(w,function(p){return new a([p|0],0>p?-1:0)}):new a([w|0],0>w?-1:0)}function d(w){if(isNaN(w)||!isFinite(w))return m;if(0>w)return P(d(-w));for(var p=[],_=1,y=0;w>=_;y++)p[y]=w/_|0,_*=4294967296;return new a(p,0)}function v(w,p){if(w.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(w.charAt(0)=="-")return P(v(w.substring(1),p));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(p,8)),y=m,I=0;I<w.length;I+=8){var C=Math.min(8,w.length-I),g=parseInt(w.substring(I,I+C),p);8>C?(C=d(Math.pow(p,C)),y=y.j(C).add(d(g))):(y=y.j(_),y=y.add(d(g)))}return y}var m=u(0),E=u(1),b=u(16777216);n=a.prototype,n.m=function(){if(N(this))return-P(this).m();for(var w=0,p=1,_=0;_<this.g.length;_++){var y=this.i(_);w+=(0<=y?y:4294967296+y)*p,p*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(R(this))return"0";if(N(this))return"-"+P(this).toString(w);for(var p=d(Math.pow(w,6)),_=this,y="";;){var I=q(_,p).g;_=X(_,I.j(p));var C=((0<_.g.length?_.g[0]:_.h)>>>0).toString(w);if(_=I,R(_))return C+y;for(;6>C.length;)C="0"+C;y=C+y}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function R(w){if(w.h!=0)return!1;for(var p=0;p<w.g.length;p++)if(w.g[p]!=0)return!1;return!0}function N(w){return w.h==-1}n.l=function(w){return w=X(this,w),N(w)?-1:R(w)?0:1};function P(w){for(var p=w.g.length,_=[],y=0;y<p;y++)_[y]=~w.g[y];return new a(_,~w.h).add(E)}n.abs=function(){return N(this)?P(this):this},n.add=function(w){for(var p=Math.max(this.g.length,w.g.length),_=[],y=0,I=0;I<=p;I++){var C=y+(this.i(I)&65535)+(w.i(I)&65535),g=(C>>>16)+(this.i(I)>>>16)+(w.i(I)>>>16);y=g>>>16,C&=65535,g&=65535,_[I]=g<<16|C}return new a(_,_[_.length-1]&-2147483648?-1:0)};function X(w,p){return w.add(P(p))}n.j=function(w){if(R(this)||R(w))return m;if(N(this))return N(w)?P(this).j(P(w)):P(P(this).j(w));if(N(w))return P(this.j(P(w)));if(0>this.l(b)&&0>w.l(b))return d(this.m()*w.m());for(var p=this.g.length+w.g.length,_=[],y=0;y<2*p;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var I=0;I<w.g.length;I++){var C=this.i(y)>>>16,g=this.i(y)&65535,$e=w.i(I)>>>16,mn=w.i(I)&65535;_[2*y+2*I]+=g*mn,Z(_,2*y+2*I),_[2*y+2*I+1]+=C*mn,Z(_,2*y+2*I+1),_[2*y+2*I+1]+=g*$e,Z(_,2*y+2*I+1),_[2*y+2*I+2]+=C*$e,Z(_,2*y+2*I+2)}for(y=0;y<p;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=p;y<2*p;y++)_[y]=0;return new a(_,0)};function Z(w,p){for(;(w[p]&65535)!=w[p];)w[p+1]+=w[p]>>>16,w[p]&=65535,p++}function B(w,p){this.g=w,this.h=p}function q(w,p){if(R(p))throw Error("division by zero");if(R(w))return new B(m,m);if(N(w))return p=q(P(w),p),new B(P(p.g),P(p.h));if(N(p))return p=q(w,P(p)),new B(P(p.g),p.h);if(30<w.g.length){if(N(w)||N(p))throw Error("slowDivide_ only works with positive integers.");for(var _=E,y=p;0>=y.l(w);)_=be(_),y=be(y);var I=ne(_,1),C=ne(y,1);for(y=ne(y,2),_=ne(_,2);!R(y);){var g=C.add(y);0>=g.l(w)&&(I=I.add(_),C=g),y=ne(y,1),_=ne(_,1)}return p=X(w,I.j(p)),new B(I,p)}for(I=m;0<=w.l(p);){for(_=Math.max(1,Math.floor(w.m()/p.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),C=d(_),g=C.j(p);N(g)||0<g.l(w);)_-=y,C=d(_),g=C.j(p);R(C)&&(C=E),I=I.add(C),w=X(w,g)}return new B(I,w)}n.A=function(w){return q(this,w).h},n.and=function(w){for(var p=Math.max(this.g.length,w.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)&w.i(y);return new a(_,this.h&w.h)},n.or=function(w){for(var p=Math.max(this.g.length,w.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)|w.i(y);return new a(_,this.h|w.h)},n.xor=function(w){for(var p=Math.max(this.g.length,w.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)^w.i(y);return new a(_,this.h^w.h)};function be(w){for(var p=w.g.length+1,_=[],y=0;y<p;y++)_[y]=w.i(y)<<1|w.i(y-1)>>>31;return new a(_,w.h)}function ne(w,p){var _=p>>5;p%=32;for(var y=w.g.length-_,I=[],C=0;C<y;C++)I[C]=0<p?w.i(C+_)>>>p|w.i(C+_+1)<<32-p:w.i(C+_);return new a(I,w.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=v,td=a}).apply(typeof pc<"u"?pc:typeof self<"u"?self:typeof window<"u"?window:{});var ji=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(r,l,h){return r==Array.prototype||r==Object.prototype||(r[l]=h.value),r};function t(r){r=[typeof globalThis=="object"&&globalThis,r,typeof window=="object"&&window,typeof self=="object"&&self,typeof ji=="object"&&ji];for(var l=0;l<r.length;++l){var h=r[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var i=t(this);function s(r,l){if(l)e:{var h=i;r=r.split(".");for(var f=0;f<r.length-1;f++){var T=r[f];if(!(T in h))break e;h=h[T]}r=r[r.length-1],f=h[r],l=l(f),l!=f&&l!=null&&e(h,r,{configurable:!0,writable:!0,value:l})}}function o(r,l){r instanceof String&&(r+="");var h=0,f=!1,T={next:function(){if(!f&&h<r.length){var S=h++;return{value:l(S,r[S]),done:!1}}return f=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}s("Array.prototype.values",function(r){return r||function(){return o(this,function(l,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(r){var l=typeof r;return l=l!="object"?l:r?Array.isArray(r)?"array":l:"null",l=="array"||l=="object"&&typeof r.length=="number"}function d(r){var l=typeof r;return l=="object"&&r!=null||l=="function"}function v(r,l,h){return r.call.apply(r.bind,arguments)}function m(r,l,h){if(!r)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,f),r.apply(l,T)}}return function(){return r.apply(l,arguments)}}function E(r,l,h){return E=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?v:m,E.apply(null,arguments)}function b(r,l){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),r.apply(this,f)}}function R(r,l){function h(){}h.prototype=l.prototype,r.aa=l.prototype,r.prototype=new h,r.prototype.constructor=r,r.Qb=function(f,T,S){for(var k=Array(arguments.length-2),W=2;W<arguments.length;W++)k[W-2]=arguments[W];return l.prototype[T].apply(f,k)}}function N(r){const l=r.length;if(0<l){const h=Array(l);for(let f=0;f<l;f++)h[f]=r[f];return h}return[]}function P(r,l){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(u(f)){const T=r.length||0,S=f.length||0;r.length=T+S;for(let k=0;k<S;k++)r[T+k]=f[k]}else r.push(f)}}class X{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function Z(r){return/^[\s\xa0]*$/.test(r)}function B(){var r=c.navigator;return r&&(r=r.userAgent)?r:""}function q(r){return q[" "](r),r}q[" "]=function(){};var be=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function ne(r,l,h){for(const f in r)l.call(h,r[f],f,r)}function w(r,l){for(const h in r)l.call(void 0,r[h],h,r)}function p(r){const l={};for(const h in r)l[h]=r[h];return l}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(r,l){let h,f;for(let T=1;T<arguments.length;T++){f=arguments[T];for(h in f)r[h]=f[h];for(let S=0;S<_.length;S++)h=_[S],Object.prototype.hasOwnProperty.call(f,h)&&(r[h]=f[h])}}function I(r){var l=1;r=r.split(":");const h=[];for(;0<l&&r.length;)h.push(r.shift()),l--;return r.length&&h.push(r.join(":")),h}function C(r){c.setTimeout(()=>{throw r},0)}function g(){var r=Bs;let l=null;return r.g&&(l=r.g,r.g=r.g.next,r.g||(r.h=null),l.next=null),l}class $e{constructor(){this.h=this.g=null}add(l,h){const f=mn.get();f.set(l,h),this.h?this.h.next=f:this.g=f,this.h=f}}var mn=new X(()=>new ld,r=>r.reset());class ld{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let vn,yn=!1,Bs=new $e,Zo=()=>{const r=c.Promise.resolve(void 0);vn=()=>{r.then(cd)}};var cd=()=>{for(var r;r=g();){try{r.h.call(r.g)}catch(h){C(h)}var l=mn;l.j(r),100>l.h&&(l.h++,r.next=l.g,l.g=r)}yn=!1};function it(){this.s=this.s,this.C=this.C}it.prototype.s=!1,it.prototype.ma=function(){this.s||(this.s=!0,this.N())},it.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function le(r,l){this.type=r,this.g=this.target=l,this.defaultPrevented=!1}le.prototype.h=function(){this.defaultPrevented=!0};var hd=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var r=!1,l=Object.defineProperty({},"passive",{get:function(){r=!0}});try{const h=()=>{};c.addEventListener("test",h,l),c.removeEventListener("test",h,l)}catch{}return r}();function In(r,l){if(le.call(this,r?r.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,r){var h=this.type=r.type,f=r.changedTouches&&r.changedTouches.length?r.changedTouches[0]:null;if(this.target=r.target||r.srcElement,this.g=l,l=r.relatedTarget){if(be){e:{try{q(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else h=="mouseover"?l=r.fromElement:h=="mouseout"&&(l=r.toElement);this.relatedTarget=l,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0),this.button=r.button,this.key=r.key||"",this.ctrlKey=r.ctrlKey,this.altKey=r.altKey,this.shiftKey=r.shiftKey,this.metaKey=r.metaKey,this.pointerId=r.pointerId||0,this.pointerType=typeof r.pointerType=="string"?r.pointerType:ud[r.pointerType]||"",this.state=r.state,this.i=r,r.defaultPrevented&&In.aa.h.call(this)}}R(In,le);var ud={2:"touch",3:"pen",4:"mouse"};In.prototype.h=function(){In.aa.h.call(this);var r=this.i;r.preventDefault?r.preventDefault():r.returnValue=!1};var wi="closure_listenable_"+(1e6*Math.random()|0),dd=0;function fd(r,l,h,f,T){this.listener=r,this.proxy=null,this.src=l,this.type=h,this.capture=!!f,this.ha=T,this.key=++dd,this.da=this.fa=!1}function Ei(r){r.da=!0,r.listener=null,r.proxy=null,r.src=null,r.ha=null}function Ti(r){this.src=r,this.g={},this.h=0}Ti.prototype.add=function(r,l,h,f,T){var S=r.toString();r=this.g[S],r||(r=this.g[S]=[],this.h++);var k=$s(r,l,f,T);return-1<k?(l=r[k],h||(l.fa=!1)):(l=new fd(l,this.src,S,!!f,T),l.fa=h,r.push(l)),l};function Ws(r,l){var h=l.type;if(h in r.g){var f=r.g[h],T=Array.prototype.indexOf.call(f,l,void 0),S;(S=0<=T)&&Array.prototype.splice.call(f,T,1),S&&(Ei(l),r.g[h].length==0&&(delete r.g[h],r.h--))}}function $s(r,l,h,f){for(var T=0;T<r.length;++T){var S=r[T];if(!S.da&&S.listener==l&&S.capture==!!h&&S.ha==f)return T}return-1}var Gs="closure_lm_"+(1e6*Math.random()|0),qs={};function ea(r,l,h,f,T){if(Array.isArray(l)){for(var S=0;S<l.length;S++)ea(r,l[S],h,f,T);return null}return h=ia(h),r&&r[wi]?r.K(l,h,d(f)?!!f.capture:!1,T):pd(r,l,h,!1,f,T)}function pd(r,l,h,f,T,S){if(!l)throw Error("Invalid event type");var k=d(T)?!!T.capture:!!T,W=Ks(r);if(W||(r[Gs]=W=new Ti(r)),h=W.add(l,h,f,k,S),h.proxy)return h;if(f=gd(),h.proxy=f,f.src=r,f.listener=h,r.addEventListener)hd||(T=k),T===void 0&&(T=!1),r.addEventListener(l.toString(),f,T);else if(r.attachEvent)r.attachEvent(na(l.toString()),f);else if(r.addListener&&r.removeListener)r.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function gd(){function r(h){return l.call(r.src,r.listener,h)}const l=_d;return r}function ta(r,l,h,f,T){if(Array.isArray(l))for(var S=0;S<l.length;S++)ta(r,l[S],h,f,T);else f=d(f)?!!f.capture:!!f,h=ia(h),r&&r[wi]?(r=r.i,l=String(l).toString(),l in r.g&&(S=r.g[l],h=$s(S,h,f,T),-1<h&&(Ei(S[h]),Array.prototype.splice.call(S,h,1),S.length==0&&(delete r.g[l],r.h--)))):r&&(r=Ks(r))&&(l=r.g[l.toString()],r=-1,l&&(r=$s(l,h,f,T)),(h=-1<r?l[r]:null)&&zs(h))}function zs(r){if(typeof r!="number"&&r&&!r.da){var l=r.src;if(l&&l[wi])Ws(l.i,r);else{var h=r.type,f=r.proxy;l.removeEventListener?l.removeEventListener(h,f,r.capture):l.detachEvent?l.detachEvent(na(h),f):l.addListener&&l.removeListener&&l.removeListener(f),(h=Ks(l))?(Ws(h,r),h.h==0&&(h.src=null,l[Gs]=null)):Ei(r)}}}function na(r){return r in qs?qs[r]:qs[r]="on"+r}function _d(r,l){if(r.da)r=!0;else{l=new In(l,this);var h=r.listener,f=r.ha||r.src;r.fa&&zs(r),r=h.call(f,l)}return r}function Ks(r){return r=r[Gs],r instanceof Ti?r:null}var Ys="__closure_events_fn_"+(1e9*Math.random()>>>0);function ia(r){return typeof r=="function"?r:(r[Ys]||(r[Ys]=function(l){return r.handleEvent(l)}),r[Ys])}function ce(){it.call(this),this.i=new Ti(this),this.M=this,this.F=null}R(ce,it),ce.prototype[wi]=!0,ce.prototype.removeEventListener=function(r,l,h,f){ta(this,r,l,h,f)};function fe(r,l){var h,f=r.F;if(f)for(h=[];f;f=f.F)h.push(f);if(r=r.M,f=l.type||l,typeof l=="string")l=new le(l,r);else if(l instanceof le)l.target=l.target||r;else{var T=l;l=new le(f,r),y(l,T)}if(T=!0,h)for(var S=h.length-1;0<=S;S--){var k=l.g=h[S];T=Ci(k,f,!0,l)&&T}if(k=l.g=r,T=Ci(k,f,!0,l)&&T,T=Ci(k,f,!1,l)&&T,h)for(S=0;S<h.length;S++)k=l.g=h[S],T=Ci(k,f,!1,l)&&T}ce.prototype.N=function(){if(ce.aa.N.call(this),this.i){var r=this.i,l;for(l in r.g){for(var h=r.g[l],f=0;f<h.length;f++)Ei(h[f]);delete r.g[l],r.h--}}this.F=null},ce.prototype.K=function(r,l,h,f){return this.i.add(String(r),l,!1,h,f)},ce.prototype.L=function(r,l,h,f){return this.i.add(String(r),l,!0,h,f)};function Ci(r,l,h,f){if(l=r.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,S=0;S<l.length;++S){var k=l[S];if(k&&!k.da&&k.capture==h){var W=k.listener,re=k.ha||k.src;k.fa&&Ws(r.i,k),T=W.call(re,f)!==!1&&T}}return T&&!f.defaultPrevented}function sa(r,l,h){if(typeof r=="function")h&&(r=E(r,h));else if(r&&typeof r.handleEvent=="function")r=E(r.handleEvent,r);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(r,l||0)}function ra(r){r.g=sa(()=>{r.g=null,r.i&&(r.i=!1,ra(r))},r.l);const l=r.h;r.h=null,r.m.apply(null,l)}class md extends it{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:ra(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function wn(r){it.call(this),this.h=r,this.g={}}R(wn,it);var oa=[];function aa(r){ne(r.g,function(l,h){this.g.hasOwnProperty(h)&&zs(l)},r),r.g={}}wn.prototype.N=function(){wn.aa.N.call(this),aa(this)},wn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Xs=c.JSON.stringify,vd=c.JSON.parse,yd=class{stringify(r){return c.JSON.stringify(r,void 0)}parse(r){return c.JSON.parse(r,void 0)}};function Js(){}Js.prototype.h=null;function la(r){return r.h||(r.h=r.i())}function Id(){}var En={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Qs(){le.call(this,"d")}R(Qs,le);function Zs(){le.call(this,"c")}R(Zs,le);var Ht={},ca=null;function er(){return ca=ca||new ce}Ht.La="serverreachability";function ha(r){le.call(this,Ht.La,r)}R(ha,le);function Tn(r){const l=er();fe(l,new ha(l))}Ht.STAT_EVENT="statevent";function ua(r,l){le.call(this,Ht.STAT_EVENT,r),this.stat=l}R(ua,le);function pe(r){const l=er();fe(l,new ua(l,r))}Ht.Ma="timingevent";function da(r,l){le.call(this,Ht.Ma,r),this.size=l}R(da,le);function Cn(r,l){if(typeof r!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){r()},l)}function Sn(){this.g=!0}Sn.prototype.xa=function(){this.g=!1};function wd(r,l,h,f,T,S){r.info(function(){if(r.g)if(S)for(var k="",W=S.split("&"),re=0;re<W.length;re++){var U=W[re].split("=");if(1<U.length){var he=U[0];U=U[1];var ue=he.split("_");k=2<=ue.length&&ue[1]=="type"?k+(he+"="+U+"&"):k+(he+"=redacted&")}}else k=null;else k=S;return"XMLHTTP REQ ("+f+") [attempt "+T+"]: "+l+`
`+h+`
`+k})}function Ed(r,l,h,f,T,S,k){r.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+T+"]: "+l+`
`+h+`
`+S+" "+k})}function Bt(r,l,h,f){r.info(function(){return"XMLHTTP TEXT ("+l+"): "+Cd(r,h)+(f?" "+f:"")})}function Td(r,l){r.info(function(){return"TIMEOUT: "+l})}Sn.prototype.info=function(){};function Cd(r,l){if(!r.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(r=0;r<h.length;r++)if(Array.isArray(h[r])){var f=h[r];if(!(2>f.length)){var T=f[1];if(Array.isArray(T)&&!(1>T.length)){var S=T[0];if(S!="noop"&&S!="stop"&&S!="close")for(var k=1;k<T.length;k++)T[k]=""}}}}return Xs(h)}catch{return l}}var tr={NO_ERROR:0,TIMEOUT:8},Sd={},nr;function Si(){}R(Si,Js),Si.prototype.g=function(){return new XMLHttpRequest},Si.prototype.i=function(){return{}},nr=new Si;function st(r,l,h,f){this.j=r,this.i=l,this.l=h,this.R=f||1,this.U=new wn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new fa}function fa(){this.i=null,this.g="",this.h=!1}var pa={},ir={};function sr(r,l,h){r.L=1,r.v=ki(Ge(l)),r.m=h,r.P=!0,ga(r,null)}function ga(r,l){r.F=Date.now(),bi(r),r.A=Ge(r.v);var h=r.A,f=r.R;Array.isArray(f)||(f=[String(f)]),ka(h.i,"t",f),r.C=0,h=r.j.J,r.h=new fa,r.g=za(r.j,h?l:null,!r.m),0<r.O&&(r.M=new md(E(r.Y,r,r.g),r.O)),l=r.U,h=r.g,f=r.ca;var T="readystatechange";Array.isArray(T)||(T&&(oa[0]=T.toString()),T=oa);for(var S=0;S<T.length;S++){var k=ea(h,T[S],f||l.handleEvent,!1,l.h||l);if(!k)break;l.g[k.key]=k}l=r.H?p(r.H):{},r.m?(r.u||(r.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",r.g.ea(r.A,r.u,r.m,l)):(r.u="GET",r.g.ea(r.A,r.u,null,l)),Tn(),wd(r.i,r.u,r.A,r.l,r.R,r.m)}st.prototype.ca=function(r){r=r.target;const l=this.M;l&&qe(r)==3?l.j():this.Y(r)},st.prototype.Y=function(r){try{if(r==this.g)e:{const ue=qe(this.g);var l=this.g.Ba();const Gt=this.g.Z();if(!(3>ue)&&(ue!=3||this.g&&(this.h.h||this.g.oa()||xa(this.g)))){this.J||ue!=4||l==7||(l==8||0>=Gt?Tn(3):Tn(2)),rr(this);var h=this.g.Z();this.X=h;t:if(_a(this)){var f=xa(this.g);r="";var T=f.length,S=qe(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Et(this),bn(this);var k="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,r+=this.h.i.decode(f[l],{stream:!(S&&l==T-1)});f.length=0,this.h.g+=r,this.C=0,k=this.h.g}else k=this.g.oa();if(this.o=h==200,Ed(this.i,this.u,this.A,this.l,this.R,ue,h),this.o){if(this.T&&!this.K){t:{if(this.g){var W,re=this.g;if((W=re.g?re.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Z(W)){var U=W;break t}}U=null}if(h=U)Bt(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,or(this,h);else{this.o=!1,this.s=3,pe(12),Et(this),bn(this);break e}}if(this.P){h=!0;let Ne;for(;!this.J&&this.C<k.length;)if(Ne=bd(this,k),Ne==ir){ue==4&&(this.s=4,pe(14),h=!1),Bt(this.i,this.l,null,"[Incomplete Response]");break}else if(Ne==pa){this.s=4,pe(15),Bt(this.i,this.l,k,"[Invalid Chunk]"),h=!1;break}else Bt(this.i,this.l,Ne,null),or(this,Ne);if(_a(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ue!=4||k.length!=0||this.h.h||(this.s=1,pe(16),h=!1),this.o=this.o&&h,!h)Bt(this.i,this.l,k,"[Invalid Chunked Response]"),Et(this),bn(this);else if(0<k.length&&!this.W){this.W=!0;var he=this.j;he.g==this&&he.ba&&!he.M&&(he.j.info("Great, no buffering proxy detected. Bytes received: "+k.length),dr(he),he.M=!0,pe(11))}}else Bt(this.i,this.l,k,null),or(this,k);ue==4&&Et(this),this.o&&!this.J&&(ue==4?Wa(this.j,this):(this.o=!1,bi(this)))}else Wd(this.g),h==400&&0<k.indexOf("Unknown SID")?(this.s=3,pe(12)):(this.s=0,pe(13)),Et(this),bn(this)}}}catch{}finally{}};function _a(r){return r.g?r.u=="GET"&&r.L!=2&&r.j.Ca:!1}function bd(r,l){var h=r.C,f=l.indexOf(`
`,h);return f==-1?ir:(h=Number(l.substring(h,f)),isNaN(h)?pa:(f+=1,f+h>l.length?ir:(l=l.slice(f,f+h),r.C=f+h,l)))}st.prototype.cancel=function(){this.J=!0,Et(this)};function bi(r){r.S=Date.now()+r.I,ma(r,r.I)}function ma(r,l){if(r.B!=null)throw Error("WatchDog timer not null");r.B=Cn(E(r.ba,r),l)}function rr(r){r.B&&(c.clearTimeout(r.B),r.B=null)}st.prototype.ba=function(){this.B=null;const r=Date.now();0<=r-this.S?(Td(this.i,this.A),this.L!=2&&(Tn(),pe(17)),Et(this),this.s=2,bn(this)):ma(this,this.S-r)};function bn(r){r.j.G==0||r.J||Wa(r.j,r)}function Et(r){rr(r);var l=r.M;l&&typeof l.ma=="function"&&l.ma(),r.M=null,aa(r.U),r.g&&(l=r.g,r.g=null,l.abort(),l.ma())}function or(r,l){try{var h=r.j;if(h.G!=0&&(h.g==r||ar(h.h,r))){if(!r.K&&ar(h.h,r)&&h.G==3){try{var f=h.Da.g.parse(l)}catch{f=null}if(Array.isArray(f)&&f.length==3){var T=f;if(T[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<r.F)Mi(h),Di(h);else break e;ur(h),pe(18)}}else h.za=T[1],0<h.za-h.T&&37500>T[2]&&h.F&&h.v==0&&!h.C&&(h.C=Cn(E(h.Za,h),6e3));if(1>=Ia(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Ct(h,11)}else if((r.K||h.g==r)&&Mi(h),!Z(l))for(T=h.Da.g.parse(l),l=0;l<T.length;l++){let U=T[l];if(h.T=U[0],U=U[1],h.G==2)if(U[0]=="c"){h.K=U[1],h.ia=U[2];const he=U[3];he!=null&&(h.la=he,h.j.info("VER="+h.la));const ue=U[4];ue!=null&&(h.Aa=ue,h.j.info("SVER="+h.Aa));const Gt=U[5];Gt!=null&&typeof Gt=="number"&&0<Gt&&(f=1.5*Gt,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const Ne=r.g;if(Ne){const xi=Ne.g?Ne.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(xi){var S=f.h;S.g||xi.indexOf("spdy")==-1&&xi.indexOf("quic")==-1&&xi.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(lr(S,S.h),S.h=null))}if(f.D){const fr=Ne.g?Ne.g.getResponseHeader("X-HTTP-Session-Id"):null;fr&&(f.ya=fr,z(f.I,f.D,fr))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-r.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var k=r;if(f.qa=qa(f,f.J?f.ia:null,f.W),k.K){wa(f.h,k);var W=k,re=f.L;re&&(W.I=re),W.B&&(rr(W),bi(W)),f.g=k}else Ha(f);0<h.i.length&&Li(h)}else U[0]!="stop"&&U[0]!="close"||Ct(h,7);else h.G==3&&(U[0]=="stop"||U[0]=="close"?U[0]=="stop"?Ct(h,7):hr(h):U[0]!="noop"&&h.l&&h.l.ta(U),h.v=0)}}Tn(4)}catch{}}var Rd=class{constructor(r,l){this.g=r,this.map=l}};function va(r){this.l=r||10,c.PerformanceNavigationTiming?(r=c.performance.getEntriesByType("navigation"),r=0<r.length&&(r[0].nextHopProtocol=="hq"||r[0].nextHopProtocol=="h2")):r=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=r?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ya(r){return r.h?!0:r.g?r.g.size>=r.j:!1}function Ia(r){return r.h?1:r.g?r.g.size:0}function ar(r,l){return r.h?r.h==l:r.g?r.g.has(l):!1}function lr(r,l){r.g?r.g.add(l):r.h=l}function wa(r,l){r.h&&r.h==l?r.h=null:r.g&&r.g.has(l)&&r.g.delete(l)}va.prototype.cancel=function(){if(this.i=Ea(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const r of this.g.values())r.cancel();this.g.clear()}};function Ea(r){if(r.h!=null)return r.i.concat(r.h.D);if(r.g!=null&&r.g.size!==0){let l=r.i;for(const h of r.g.values())l=l.concat(h.D);return l}return N(r.i)}function Ad(r){if(r.V&&typeof r.V=="function")return r.V();if(typeof Map<"u"&&r instanceof Map||typeof Set<"u"&&r instanceof Set)return Array.from(r.values());if(typeof r=="string")return r.split("");if(u(r)){for(var l=[],h=r.length,f=0;f<h;f++)l.push(r[f]);return l}l=[],h=0;for(f in r)l[h++]=r[f];return l}function kd(r){if(r.na&&typeof r.na=="function")return r.na();if(!r.V||typeof r.V!="function"){if(typeof Map<"u"&&r instanceof Map)return Array.from(r.keys());if(!(typeof Set<"u"&&r instanceof Set)){if(u(r)||typeof r=="string"){var l=[];r=r.length;for(var h=0;h<r;h++)l.push(h);return l}l=[],h=0;for(const f in r)l[h++]=f;return l}}}function Ta(r,l){if(r.forEach&&typeof r.forEach=="function")r.forEach(l,void 0);else if(u(r)||typeof r=="string")Array.prototype.forEach.call(r,l,void 0);else for(var h=kd(r),f=Ad(r),T=f.length,S=0;S<T;S++)l.call(void 0,f[S],h&&h[S],r)}var Ca=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Pd(r,l){if(r){r=r.split("&");for(var h=0;h<r.length;h++){var f=r[h].indexOf("="),T=null;if(0<=f){var S=r[h].substring(0,f);T=r[h].substring(f+1)}else S=r[h];l(S,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Tt(r){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,r instanceof Tt){this.h=r.h,Ri(this,r.j),this.o=r.o,this.g=r.g,Ai(this,r.s),this.l=r.l;var l=r.i,h=new kn;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),Sa(this,h),this.m=r.m}else r&&(l=String(r).match(Ca))?(this.h=!1,Ri(this,l[1]||"",!0),this.o=Rn(l[2]||""),this.g=Rn(l[3]||"",!0),Ai(this,l[4]),this.l=Rn(l[5]||"",!0),Sa(this,l[6]||"",!0),this.m=Rn(l[7]||"")):(this.h=!1,this.i=new kn(null,this.h))}Tt.prototype.toString=function(){var r=[],l=this.j;l&&r.push(An(l,ba,!0),":");var h=this.g;return(h||l=="file")&&(r.push("//"),(l=this.o)&&r.push(An(l,ba,!0),"@"),r.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&r.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&r.push("/"),r.push(An(h,h.charAt(0)=="/"?Dd:Od,!0))),(h=this.i.toString())&&r.push("?",h),(h=this.m)&&r.push("#",An(h,Md)),r.join("")};function Ge(r){return new Tt(r)}function Ri(r,l,h){r.j=h?Rn(l,!0):l,r.j&&(r.j=r.j.replace(/:$/,""))}function Ai(r,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);r.s=l}else r.s=null}function Sa(r,l,h){l instanceof kn?(r.i=l,xd(r.i,r.h)):(h||(l=An(l,Ld)),r.i=new kn(l,r.h))}function z(r,l,h){r.i.set(l,h)}function ki(r){return z(r,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),r}function Rn(r,l){return r?l?decodeURI(r.replace(/%25/g,"%2525")):decodeURIComponent(r):""}function An(r,l,h){return typeof r=="string"?(r=encodeURI(r).replace(l,Nd),h&&(r=r.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),r):null}function Nd(r){return r=r.charCodeAt(0),"%"+(r>>4&15).toString(16)+(r&15).toString(16)}var ba=/[#\/\?@]/g,Od=/[#\?:]/g,Dd=/[#\?]/g,Ld=/[#\?@]/g,Md=/#/g;function kn(r,l){this.h=this.g=null,this.i=r||null,this.j=!!l}function rt(r){r.g||(r.g=new Map,r.h=0,r.i&&Pd(r.i,function(l,h){r.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=kn.prototype,n.add=function(r,l){rt(this),this.i=null,r=Wt(this,r);var h=this.g.get(r);return h||this.g.set(r,h=[]),h.push(l),this.h+=1,this};function Ra(r,l){rt(r),l=Wt(r,l),r.g.has(l)&&(r.i=null,r.h-=r.g.get(l).length,r.g.delete(l))}function Aa(r,l){return rt(r),l=Wt(r,l),r.g.has(l)}n.forEach=function(r,l){rt(this),this.g.forEach(function(h,f){h.forEach(function(T){r.call(l,T,f,this)},this)},this)},n.na=function(){rt(this);const r=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let f=0;f<l.length;f++){const T=r[f];for(let S=0;S<T.length;S++)h.push(l[f])}return h},n.V=function(r){rt(this);let l=[];if(typeof r=="string")Aa(this,r)&&(l=l.concat(this.g.get(Wt(this,r))));else{r=Array.from(this.g.values());for(let h=0;h<r.length;h++)l=l.concat(r[h])}return l},n.set=function(r,l){return rt(this),this.i=null,r=Wt(this,r),Aa(this,r)&&(this.h-=this.g.get(r).length),this.g.set(r,[l]),this.h+=1,this},n.get=function(r,l){return r?(r=this.V(r),0<r.length?String(r[0]):l):l};function ka(r,l,h){Ra(r,l),0<h.length&&(r.i=null,r.g.set(Wt(r,l),N(h)),r.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const r=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var f=l[h];const S=encodeURIComponent(String(f)),k=this.V(f);for(f=0;f<k.length;f++){var T=S;k[f]!==""&&(T+="="+encodeURIComponent(String(k[f]))),r.push(T)}}return this.i=r.join("&")};function Wt(r,l){return l=String(l),r.j&&(l=l.toLowerCase()),l}function xd(r,l){l&&!r.j&&(rt(r),r.i=null,r.g.forEach(function(h,f){var T=f.toLowerCase();f!=T&&(Ra(this,f),ka(this,T,h))},r)),r.j=l}function Fd(r,l){const h=new Sn;if(c.Image){const f=new Image;f.onload=b(ot,h,"TestLoadImage: loaded",!0,l,f),f.onerror=b(ot,h,"TestLoadImage: error",!1,l,f),f.onabort=b(ot,h,"TestLoadImage: abort",!1,l,f),f.ontimeout=b(ot,h,"TestLoadImage: timeout",!1,l,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=r}else l(!1)}function Ud(r,l){const h=new Sn,f=new AbortController,T=setTimeout(()=>{f.abort(),ot(h,"TestPingServer: timeout",!1,l)},1e4);fetch(r,{signal:f.signal}).then(S=>{clearTimeout(T),S.ok?ot(h,"TestPingServer: ok",!0,l):ot(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),ot(h,"TestPingServer: error",!1,l)})}function ot(r,l,h,f,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),f(h)}catch{}}function Vd(){this.g=new yd}function jd(r,l,h){const f=h||"";try{Ta(r,function(T,S){let k=T;d(T)&&(k=Xs(T)),l.push(f+S+"="+encodeURIComponent(k))})}catch(T){throw l.push(f+"type="+encodeURIComponent("_badmap")),T}}function Pi(r){this.l=r.Ub||null,this.j=r.eb||!1}R(Pi,Js),Pi.prototype.g=function(){return new Ni(this.l,this.j)},Pi.prototype.i=function(r){return function(){return r}}({});function Ni(r,l){ce.call(this),this.D=r,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(Ni,ce),n=Ni.prototype,n.open=function(r,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=r,this.A=l,this.readyState=1,Nn(this)},n.send=function(r){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};r&&(l.body=r),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Pn(this)),this.readyState=0},n.Sa=function(r){if(this.g&&(this.l=r,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=r.headers,this.readyState=2,Nn(this)),this.g&&(this.readyState=3,Nn(this),this.g)))if(this.responseType==="arraybuffer")r.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in r){if(this.j=r.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Pa(this)}else r.text().then(this.Ra.bind(this),this.ga.bind(this))};function Pa(r){r.j.read().then(r.Pa.bind(r)).catch(r.ga.bind(r))}n.Pa=function(r){if(this.g){if(this.o&&r.value)this.response.push(r.value);else if(!this.o){var l=r.value?r.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!r.done}))&&(this.response=this.responseText+=l)}r.done?Pn(this):Nn(this),this.readyState==3&&Pa(this)}},n.Ra=function(r){this.g&&(this.response=this.responseText=r,Pn(this))},n.Qa=function(r){this.g&&(this.response=r,Pn(this))},n.ga=function(){this.g&&Pn(this)};function Pn(r){r.readyState=4,r.l=null,r.j=null,r.v=null,Nn(r)}n.setRequestHeader=function(r,l){this.u.append(r,l)},n.getResponseHeader=function(r){return this.h&&this.h.get(r.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const r=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,r.push(h[0]+": "+h[1]),h=l.next();return r.join(`\r
`)};function Nn(r){r.onreadystatechange&&r.onreadystatechange.call(r)}Object.defineProperty(Ni.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(r){this.m=r?"include":"same-origin"}});function Na(r){let l="";return ne(r,function(h,f){l+=f,l+=":",l+=h,l+=`\r
`}),l}function cr(r,l,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=Na(h),typeof r=="string"?h!=null&&encodeURIComponent(String(h)):z(r,l,h))}function J(r){ce.call(this),this.headers=new Map,this.o=r||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(J,ce);var Hd=/^https?$/i,Bd=["POST","PUT"];n=J.prototype,n.Ha=function(r){this.J=r},n.ea=function(r,l,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+r);l=l?l.toUpperCase():"GET",this.D=r,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():nr.g(),this.v=this.o?la(this.o):la(nr),this.g.onreadystatechange=E(this.Ea,this);try{this.B=!0,this.g.open(l,String(r),!0),this.B=!1}catch(S){Oa(this,S);return}if(r=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var T in f)h.set(T,f[T]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const S of f.keys())h.set(S,f.get(S));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(S=>S.toLowerCase()=="content-type"),T=c.FormData&&r instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Bd,l,void 0))||f||T||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,k]of h)this.g.setRequestHeader(S,k);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ma(this),this.u=!0,this.g.send(r),this.u=!1}catch(S){Oa(this,S)}};function Oa(r,l){r.h=!1,r.g&&(r.j=!0,r.g.abort(),r.j=!1),r.l=l,r.m=5,Da(r),Oi(r)}function Da(r){r.A||(r.A=!0,fe(r,"complete"),fe(r,"error"))}n.abort=function(r){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=r||7,fe(this,"complete"),fe(this,"abort"),Oi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Oi(this,!0)),J.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?La(this):this.bb())},n.bb=function(){La(this)};function La(r){if(r.h&&typeof a<"u"&&(!r.v[1]||qe(r)!=4||r.Z()!=2)){if(r.u&&qe(r)==4)sa(r.Ea,0,r);else if(fe(r,"readystatechange"),qe(r)==4){r.h=!1;try{const k=r.Z();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var f;if(f=k===0){var T=String(r.D).match(Ca)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),f=!Hd.test(T?T.toLowerCase():"")}h=f}if(h)fe(r,"complete"),fe(r,"success");else{r.m=6;try{var S=2<qe(r)?r.g.statusText:""}catch{S=""}r.l=S+" ["+r.Z()+"]",Da(r)}}finally{Oi(r)}}}}function Oi(r,l){if(r.g){Ma(r);const h=r.g,f=r.v[0]?()=>{}:null;r.g=null,r.v=null,l||fe(r,"ready");try{h.onreadystatechange=f}catch{}}}function Ma(r){r.I&&(c.clearTimeout(r.I),r.I=null)}n.isActive=function(){return!!this.g};function qe(r){return r.g?r.g.readyState:0}n.Z=function(){try{return 2<qe(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(r){if(this.g){var l=this.g.responseText;return r&&l.indexOf(r)==0&&(l=l.substring(r.length)),vd(l)}};function xa(r){try{if(!r.g)return null;if("response"in r.g)return r.g.response;switch(r.H){case"":case"text":return r.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in r.g)return r.g.mozResponseArrayBuffer}return null}catch{return null}}function Wd(r){const l={};r=(r.g&&2<=qe(r)&&r.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<r.length;f++){if(Z(r[f]))continue;var h=I(r[f]);const T=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const S=l[T]||[];l[T]=S,S.push(h)}w(l,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function On(r,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[r]||l}function Fa(r){this.Aa=0,this.i=[],this.j=new Sn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=On("failFast",!1,r),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=On("baseRetryDelayMs",5e3,r),this.cb=On("retryDelaySeedMs",1e4,r),this.Wa=On("forwardChannelMaxRetries",2,r),this.wa=On("forwardChannelRequestTimeoutMs",2e4,r),this.pa=r&&r.xmlHttpFactory||void 0,this.Xa=r&&r.Tb||void 0,this.Ca=r&&r.useFetchStreams||!1,this.L=void 0,this.J=r&&r.supportsCrossDomainXhr||!1,this.K="",this.h=new va(r&&r.concurrentRequestLimit),this.Da=new Vd,this.P=r&&r.fastHandshake||!1,this.O=r&&r.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=r&&r.Rb||!1,r&&r.xa&&this.j.xa(),r&&r.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&r&&r.detectBufferingProxy||!1,this.ja=void 0,r&&r.longPollingTimeout&&0<r.longPollingTimeout&&(this.ja=r.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Fa.prototype,n.la=8,n.G=1,n.connect=function(r,l,h,f){pe(0),this.W=r,this.H=l||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=qa(this,null,this.W),Li(this)};function hr(r){if(Ua(r),r.G==3){var l=r.U++,h=Ge(r.I);if(z(h,"SID",r.K),z(h,"RID",l),z(h,"TYPE","terminate"),Dn(r,h),l=new st(r,r.j,l),l.L=2,l.v=ki(Ge(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=l.v,h=!0),h||(l.g=za(l.j,null),l.g.ea(l.v)),l.F=Date.now(),bi(l)}Ga(r)}function Di(r){r.g&&(dr(r),r.g.cancel(),r.g=null)}function Ua(r){Di(r),r.u&&(c.clearTimeout(r.u),r.u=null),Mi(r),r.h.cancel(),r.s&&(typeof r.s=="number"&&c.clearTimeout(r.s),r.s=null)}function Li(r){if(!ya(r.h)&&!r.s){r.s=!0;var l=r.Ga;vn||Zo(),yn||(vn(),yn=!0),Bs.add(l,r),r.B=0}}function $d(r,l){return Ia(r.h)>=r.h.j-(r.s?1:0)?!1:r.s?(r.i=l.D.concat(r.i),!0):r.G==1||r.G==2||r.B>=(r.Va?0:r.Wa)?!1:(r.s=Cn(E(r.Ga,r,l),$a(r,r.B)),r.B++,!0)}n.Ga=function(r){if(this.s)if(this.s=null,this.G==1){if(!r){this.U=Math.floor(1e5*Math.random()),r=this.U++;const T=new st(this,this.j,r);let S=this.o;if(this.S&&(S?(S=p(S),y(S,this.S)):S=this.S),this.m!==null||this.O||(T.H=S,S=null),this.P)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(l+=f,4096<l){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=ja(this,T,l),h=Ge(this.I),z(h,"RID",r),z(h,"CVER",22),this.D&&z(h,"X-HTTP-Session-Id",this.D),Dn(this,h),S&&(this.O?l="headers="+encodeURIComponent(String(Na(S)))+"&"+l:this.m&&cr(h,this.m,S)),lr(this.h,T),this.Ua&&z(h,"TYPE","init"),this.P?(z(h,"$req",l),z(h,"SID","null"),T.T=!0,sr(T,h,null)):sr(T,h,l),this.G=2}}else this.G==3&&(r?Va(this,r):this.i.length==0||ya(this.h)||Va(this))};function Va(r,l){var h;l?h=l.l:h=r.U++;const f=Ge(r.I);z(f,"SID",r.K),z(f,"RID",h),z(f,"AID",r.T),Dn(r,f),r.m&&r.o&&cr(f,r.m,r.o),h=new st(r,r.j,h,r.B+1),r.m===null&&(h.H=r.o),l&&(r.i=l.D.concat(r.i)),l=ja(r,h,1e3),h.I=Math.round(.5*r.wa)+Math.round(.5*r.wa*Math.random()),lr(r.h,h),sr(h,f,l)}function Dn(r,l){r.H&&ne(r.H,function(h,f){z(l,f,h)}),r.l&&Ta({},function(h,f){z(l,f,h)})}function ja(r,l,h){h=Math.min(r.i.length,h);var f=r.l?E(r.l.Na,r.l,r):null;e:{var T=r.i;let S=-1;for(;;){const k=["count="+h];S==-1?0<h?(S=T[0].g,k.push("ofs="+S)):S=0:k.push("ofs="+S);let W=!0;for(let re=0;re<h;re++){let U=T[re].g;const he=T[re].map;if(U-=S,0>U)S=Math.max(0,T[re].g-100),W=!1;else try{jd(he,k,"req"+U+"_")}catch{f&&f(he)}}if(W){f=k.join("&");break e}}}return r=r.i.splice(0,h),l.D=r,f}function Ha(r){if(!r.g&&!r.u){r.Y=1;var l=r.Fa;vn||Zo(),yn||(vn(),yn=!0),Bs.add(l,r),r.v=0}}function ur(r){return r.g||r.u||3<=r.v?!1:(r.Y++,r.u=Cn(E(r.Fa,r),$a(r,r.v)),r.v++,!0)}n.Fa=function(){if(this.u=null,Ba(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var r=2*this.R;this.j.info("BP detection timer enabled: "+r),this.A=Cn(E(this.ab,this),r)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,pe(10),Di(this),Ba(this))};function dr(r){r.A!=null&&(c.clearTimeout(r.A),r.A=null)}function Ba(r){r.g=new st(r,r.j,"rpc",r.Y),r.m===null&&(r.g.H=r.o),r.g.O=0;var l=Ge(r.qa);z(l,"RID","rpc"),z(l,"SID",r.K),z(l,"AID",r.T),z(l,"CI",r.F?"0":"1"),!r.F&&r.ja&&z(l,"TO",r.ja),z(l,"TYPE","xmlhttp"),Dn(r,l),r.m&&r.o&&cr(l,r.m,r.o),r.L&&(r.g.I=r.L);var h=r.g;r=r.ia,h.L=1,h.v=ki(Ge(l)),h.m=null,h.P=!0,ga(h,r)}n.Za=function(){this.C!=null&&(this.C=null,Di(this),ur(this),pe(19))};function Mi(r){r.C!=null&&(c.clearTimeout(r.C),r.C=null)}function Wa(r,l){var h=null;if(r.g==l){Mi(r),dr(r),r.g=null;var f=2}else if(ar(r.h,l))h=l.D,wa(r.h,l),f=1;else return;if(r.G!=0){if(l.o)if(f==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var T=r.B;f=er(),fe(f,new da(f,h)),Li(r)}else Ha(r);else if(T=l.s,T==3||T==0&&0<l.X||!(f==1&&$d(r,l)||f==2&&ur(r)))switch(h&&0<h.length&&(l=r.h,l.i=l.i.concat(h)),T){case 1:Ct(r,5);break;case 4:Ct(r,10);break;case 3:Ct(r,6);break;default:Ct(r,2)}}}function $a(r,l){let h=r.Ta+Math.floor(Math.random()*r.cb);return r.isActive()||(h*=2),h*l}function Ct(r,l){if(r.j.info("Error code "+l),l==2){var h=E(r.fb,r),f=r.Xa;const T=!f;f=new Tt(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Ri(f,"https"),ki(f),T?Fd(f.toString(),h):Ud(f.toString(),h)}else pe(2);r.G=0,r.l&&r.l.sa(l),Ga(r),Ua(r)}n.fb=function(r){r?(this.j.info("Successfully pinged google.com"),pe(2)):(this.j.info("Failed to ping google.com"),pe(1))};function Ga(r){if(r.G=0,r.ka=[],r.l){const l=Ea(r.h);(l.length!=0||r.i.length!=0)&&(P(r.ka,l),P(r.ka,r.i),r.h.i.length=0,N(r.i),r.i.length=0),r.l.ra()}}function qa(r,l,h){var f=h instanceof Tt?Ge(h):new Tt(h);if(f.g!="")l&&(f.g=l+"."+f.g),Ai(f,f.s);else{var T=c.location;f=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var S=new Tt(null);f&&Ri(S,f),l&&(S.g=l),T&&Ai(S,T),h&&(S.l=h),f=S}return h=r.D,l=r.ya,h&&l&&z(f,h,l),z(f,"VER",r.la),Dn(r,f),f}function za(r,l,h){if(l&&!r.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=r.Ca&&!r.pa?new J(new Pi({eb:h})):new J(r.pa),l.Ha(r.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ka(){}n=Ka.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Re(r,l){ce.call(this),this.g=new Fa(l),this.l=r,this.h=l&&l.messageUrlParams||null,r=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(r?r["X-Client-Protocol"]="webchannel":r={"X-Client-Protocol":"webchannel"}),this.g.o=r,r=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(r?r["X-WebChannel-Content-Type"]=l.messageContentType:r={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(r?r["X-WebChannel-Client-Profile"]=l.va:r={"X-WebChannel-Client-Profile":l.va}),this.g.S=r,(r=l&&l.Sb)&&!Z(r)&&(this.g.m=r),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!Z(l)&&(this.g.D=l,r=this.h,r!==null&&l in r&&(r=this.h,l in r&&delete r[l])),this.j=new $t(this)}R(Re,ce),Re.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Re.prototype.close=function(){hr(this.g)},Re.prototype.o=function(r){var l=this.g;if(typeof r=="string"){var h={};h.__data__=r,r=h}else this.u&&(h={},h.__data__=Xs(r),r=h);l.i.push(new Rd(l.Ya++,r)),l.G==3&&Li(l)},Re.prototype.N=function(){this.g.l=null,delete this.j,hr(this.g),delete this.g,Re.aa.N.call(this)};function Ya(r){Qs.call(this),r.__headers__&&(this.headers=r.__headers__,this.statusCode=r.__status__,delete r.__headers__,delete r.__status__);var l=r.__sm__;if(l){e:{for(const h in l){r=h;break e}r=void 0}(this.i=r)&&(r=this.i,l=l!==null&&r in l?l[r]:void 0),this.data=l}else this.data=r}R(Ya,Qs);function Xa(){Zs.call(this),this.status=1}R(Xa,Zs);function $t(r){this.g=r}R($t,Ka),$t.prototype.ua=function(){fe(this.g,"a")},$t.prototype.ta=function(r){fe(this.g,new Ya(r))},$t.prototype.sa=function(r){fe(this.g,new Xa)},$t.prototype.ra=function(){fe(this.g,"b")},Re.prototype.send=Re.prototype.o,Re.prototype.open=Re.prototype.m,Re.prototype.close=Re.prototype.close,tr.NO_ERROR=0,tr.TIMEOUT=8,tr.HTTP_ERROR=6,Sd.COMPLETE="complete",Id.EventType=En,En.OPEN="a",En.CLOSE="b",En.ERROR="c",En.MESSAGE="d",ce.prototype.listen=ce.prototype.K,J.prototype.listenOnce=J.prototype.L,J.prototype.getLastError=J.prototype.Ka,J.prototype.getLastErrorCode=J.prototype.Ba,J.prototype.getStatus=J.prototype.Z,J.prototype.getResponseJson=J.prototype.Oa,J.prototype.getResponseText=J.prototype.oa,J.prototype.send=J.prototype.ea,J.prototype.setWithCredentials=J.prototype.Ha}).apply(typeof ji<"u"?ji:typeof self<"u"?self:typeof window<"u"?window:{});const gc="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ge.UNAUTHENTICATED=new ge(null),ge.GOOGLE_CREDENTIALS=new ge("google-credentials-uid"),ge.FIRST_PARTY=new ge("first-party-uid"),ge.MOCK_USER=new ge("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ii="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=new li("@firebase/firestore");function Le(n,...e){if(ln.logLevel<=j.DEBUG){const t=e.map(Xo);ln.debug(`Firestore (${Ii}): ${n}`,...t)}}function nd(n,...e){if(ln.logLevel<=j.ERROR){const t=e.map(Xo);ln.error(`Firestore (${Ii}): ${n}`,...t)}}function ew(n,...e){if(ln.logLevel<=j.WARN){const t=e.map(Xo);ln.warn(`Firestore (${Ii}): ${n}`,...t)}}function Xo(n){if(typeof n=="string")return n;try{/**
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
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(n="Unexpected state"){const e=`FIRESTORE (${Ii}) INTERNAL ASSERTION FAILED: `+n;throw nd(e),new Error(e)}function zn(n,e){n||Jo()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class Ie extends Pe{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class tw{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ge.UNAUTHENTICATED))}shutdown(){}}class nw{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class iw{constructor(e){this.t=e,this.currentUser=ge.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){zn(this.o===void 0);let i=this.i;const s=u=>this.i!==i?(i=this.i,t(u)):Promise.resolve();let o=new Kn;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Kn,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=o;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{Le("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(Le("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Kn)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(Le("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(zn(typeof i.accessToken=="string"),new id(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return zn(e===null||typeof e=="string"),new ge(e)}}class sw{constructor(e,t,i){this.l=e,this.h=t,this.P=i,this.type="FirstParty",this.user=ge.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class rw{constructor(e,t,i){this.l=e,this.h=t,this.P=i}getToken(){return Promise.resolve(new sw(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ge.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ow{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class aw{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){zn(this.o===void 0);const i=o=>{o.error!=null&&Le("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,Le("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>i(o))};const s=o=>{Le("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?s(o):Le("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(zn(typeof t.token=="string"),this.R=t.token,new ow(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function lw(n){return n.name==="IndexedDbTransactionError"}class ms{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ms("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ms&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _c,F;(F=_c||(_c={}))[F.OK=0]="OK",F[F.CANCELLED=1]="CANCELLED",F[F.UNKNOWN=2]="UNKNOWN",F[F.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",F[F.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",F[F.NOT_FOUND=5]="NOT_FOUND",F[F.ALREADY_EXISTS=6]="ALREADY_EXISTS",F[F.PERMISSION_DENIED=7]="PERMISSION_DENIED",F[F.UNAUTHENTICATED=16]="UNAUTHENTICATED",F[F.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",F[F.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",F[F.ABORTED=10]="ABORTED",F[F.OUT_OF_RANGE=11]="OUT_OF_RANGE",F[F.UNIMPLEMENTED=12]="UNIMPLEMENTED",F[F.INTERNAL=13]="INTERNAL",F[F.UNAVAILABLE=14]="UNAVAILABLE",F[F.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new td([4294967295,4294967295],0);function Ar(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cw{constructor(e,t,i=1e3,s=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=i,this.qo=s,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),i=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-i);s>0&&Le("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e,t,i,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=s,this.removalCallback=o,this.deferred=new Kn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,s,o){const a=Date.now()+i,c=new Qo(e,t,a,s,o);return c.start(i),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new Ie(ye.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var mc,vc;(vc=mc||(mc={})).ea="default",vc.Cache="cache";/**
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
 */function hw(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const yc=new Map;function uw(n,e,t,i){if(e===!0&&i===!0)throw new Ie(ye.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function dw(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Jo()}function fw(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new Ie(ye.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=dw(n);throw new Ie(ye.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */class Ic{constructor(e){var t,i;if(e.host===void 0){if(e.ssl!==void 0)throw new Ie(ye.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new Ie(ye.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}uw("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=hw((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new Ie(ye.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new Ie(ye.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new Ie(ye.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class sd{constructor(e,t,i,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ic({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Ie(ye.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new Ie(ye.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ic(e),e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new tw;switch(i.type){case"firstParty":return new rw(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new Ie(ye.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const i=yc.get(t);i&&(Le("ComponentProvider","Removing Datastore"),yc.delete(t),i.terminate())}(this),Promise.resolve()}}function pw(n,e,t,i={}){var s;const o=(n=fw(n,sd))._getSettings(),a=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&ew("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),i.mockUserToken){let c,u;if(typeof i.mockUserToken=="string")c=i.mockUserToken,u=ge.MOCK_USER;else{c=to(i.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const d=i.mockUserToken.sub||i.mockUserToken.user_id;if(!d)throw new Ie(ye.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new ge(d)}n._authCredentials=new nw(new id(c,u))}}/**
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
 */class wc{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new cw(this,"async_queue_retry"),this.Vu=()=>{const i=Ar();i&&Le("AsyncQueue","Visibility state changed to "+i.visibilityState),this.t_.jo()},this.mu=e;const t=Ar();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Ar();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Kn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!lw(e))throw e;Le("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(i=>{this.Eu=i,this.du=!1;const s=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(i);throw nd("INTERNAL UNHANDLED ERROR: ",s),i}).then(i=>(this.du=!1,i))));return this.mu=t,t}enqueueAfterDelay(e,t,i){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=Qo.createAndSchedule(this,e,t,i,o=>this.yu(o));return this.Tu.push(s),s}fu(){this.Eu&&Jo()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class gw extends sd{constructor(e,t,i,s){super(e,t,i,s),this.type="firestore",this._queue=new wc,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new wc(e),this._firestoreClient=void 0,await e}}}function sE(n,e){const t=typeof n=="object"?n:ci(),i=typeof n=="string"?n:"(default)",s=nt(t,"firestore").getImmediate({identifier:i});if(!s._initialized){const o=eo("firestore");o&&pw(s,...o)}return s}(function(e,t=!0){(function(s){Ii=s})(It),ke(new Ce("firestore",(i,{instanceIdentifier:s,options:o})=>{const a=i.getProvider("app").getImmediate(),c=new gw(new iw(i.getProvider("auth-internal")),new aw(i.getProvider("app-check-internal")),function(d,v){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new Ie(ye.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ms(d.options.projectId,v)}(a,s),a);return o=Object.assign({useFetchStreams:t},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),de(gc,"4.7.3",e),de(gc,"4.7.3","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd="firebasestorage.googleapis.com",_w="storageBucket",mw=2*60*1e3,vw=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We extends Pe{constructor(e,t,i=0){super(kr(e),`Firebase Storage: ${t} (${kr(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,We.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return kr(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var He;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(He||(He={}));function kr(n){return"storage/"+n}function yw(){const n="An unknown error occurred, please check the error payload for server response.";return new We(He.UNKNOWN,n)}function Iw(){return new We(He.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function ww(){return new We(He.CANCELED,"User canceled the upload/download.")}function Ew(n){return new We(He.INVALID_URL,"Invalid URL '"+n+"'.")}function Tw(n){return new We(He.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Ec(n){return new We(He.INVALID_ARGUMENT,n)}function od(){return new We(He.APP_DELETED,"The Firebase app was deleted.")}function Cw(n){return new We(He.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let i;try{i=Me.makeFromUrl(e,t)}catch{return new Me(e,"")}if(i.path==="")return i;throw Tw(e)}static makeFromUrl(e,t){let i=null;const s="([A-Za-z0-9.\\-_]+)";function o(q){q.path.charAt(q.path.length-1)==="/"&&(q.path_=q.path_.slice(0,-1))}const a="(/(.*))?$",c=new RegExp("^gs://"+s+a,"i"),u={bucket:1,path:3};function d(q){q.path_=decodeURIComponent(q.path)}const v="v[A-Za-z0-9_]+",m=t.replace(/[.]/g,"\\."),E="(/([^?#]*).*)?$",b=new RegExp(`^https?://${m}/${v}/b/${s}/o${E}`,"i"),R={bucket:1,path:3},N=t===rd?"(?:storage.googleapis.com|storage.cloud.google.com)":t,P="([^?#]*)",X=new RegExp(`^https?://${N}/${s}/${P}`,"i"),B=[{regex:c,indices:u,postModify:o},{regex:b,indices:R,postModify:d},{regex:X,indices:{bucket:1,path:2},postModify:d}];for(let q=0;q<B.length;q++){const be=B[q],ne=be.regex.exec(e);if(ne){const w=ne[be.indices.bucket];let p=ne[be.indices.path];p||(p=""),i=new Me(w,p),be.postModify(i);break}}if(i==null)throw Ew(e);return i}}class Sw{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bw(n,e,t){let i=1,s=null,o=null,a=!1,c=0;function u(){return c===2}let d=!1;function v(...P){d||(d=!0,e.apply(null,P))}function m(P){s=setTimeout(()=>{s=null,n(b,u())},P)}function E(){o&&clearTimeout(o)}function b(P,...X){if(d){E();return}if(P){E(),v.call(null,P,...X);return}if(u()||a){E(),v.call(null,P,...X);return}i<64&&(i*=2);let B;c===1?(c=2,B=0):B=(i+Math.random())*1e3,m(B)}let R=!1;function N(P){R||(R=!0,E(),!d&&(s!==null?(P||(c=2),clearTimeout(s),m(0)):P||(c=1)))}return m(0),o=setTimeout(()=>{a=!0,N(!0)},t),N}function Rw(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Aw(n){return n!==void 0}function Tc(n,e,t,i){if(i<e)throw Ec(`Invalid value for '${n}'. Expected ${e} or greater.`);if(i>t)throw Ec(`Invalid value for '${n}'. Expected ${t} or less.`)}function kw(n){const e=encodeURIComponent;let t="?";for(const i in n)if(n.hasOwnProperty(i)){const s=e(i)+"="+e(n[i]);t=t+s+"&"}return t=t.slice(0,-1),t}var vs;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(vs||(vs={}));/**
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
 */function Pw(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,o=e.indexOf(n)!==-1;return t||s||o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nw{constructor(e,t,i,s,o,a,c,u,d,v,m,E=!0){this.url_=e,this.method_=t,this.headers_=i,this.body_=s,this.successCodes_=o,this.additionalRetryCodes_=a,this.callback_=c,this.errorCallback_=u,this.timeout_=d,this.progressCallback_=v,this.connectionFactory_=m,this.retry=E,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((b,R)=>{this.resolve_=b,this.reject_=R,this.start_()})}start_(){const e=(i,s)=>{if(s){i(!1,new Hi(!1,null,!0));return}const o=this.connectionFactory_();this.pendingConnection_=o;const a=c=>{const u=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,d)};this.progressCallback_!==null&&o.addUploadProgressListener(a),o.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(a),this.pendingConnection_=null;const c=o.getErrorCode()===vs.NO_ERROR,u=o.getStatus();if(!c||Pw(u,this.additionalRetryCodes_)&&this.retry){const v=o.getErrorCode()===vs.ABORT;i(!1,new Hi(!1,null,v));return}const d=this.successCodes_.indexOf(u)!==-1;i(!0,new Hi(d,o))})},t=(i,s)=>{const o=this.resolve_,a=this.reject_,c=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());Aw(u)?o(u):o()}catch(u){a(u)}else if(c!==null){const u=yw();u.serverResponse=c.getErrorText(),this.errorCallback_?a(this.errorCallback_(c,u)):a(u)}else if(s.canceled){const u=this.appDelete_?od():ww();a(u)}else{const u=Iw();a(u)}};this.canceled_?t(!1,new Hi(!1,null,!0)):this.backoffId_=bw(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Rw(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Hi{constructor(e,t,i){this.wasSuccessCode=e,this.connection=t,this.canceled=!!i}}function Ow(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function Dw(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Lw(n,e){e&&(n["X-Firebase-GMPID"]=e)}function Mw(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function xw(n,e,t,i,s,o,a=!0){const c=kw(n.urlParams),u=n.url+c,d=Object.assign({},n.headers);return Lw(d,e),Ow(d,t),Dw(d,o),Mw(d,i),new Nw(u,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fw(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Uw(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */class ys{constructor(e,t){this._service=e,t instanceof Me?this._location=t:this._location=Me.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new ys(e,t)}get root(){const e=new Me(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Uw(this._location.path)}get storage(){return this._service}get parent(){const e=Fw(this._location.path);if(e===null)return null;const t=new Me(this._location.bucket,e);return new ys(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw Cw(e)}}function Cc(n,e){const t=e==null?void 0:e[_w];return t==null?null:Me.makeFromBucketSpec(t,n)}function Vw(n,e,t,i={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:s}=i;s&&(n._overrideAuthToken=typeof s=="string"?s:to(s,n.app.options.projectId))}class jw{constructor(e,t,i,s,o){this.app=e,this._authProvider=t,this._appCheckProvider=i,this._url=s,this._firebaseVersion=o,this._bucket=null,this._host=rd,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=mw,this._maxUploadRetryTime=vw,this._requests=new Set,s!=null?this._bucket=Me.makeFromBucketSpec(s,this._host):this._bucket=Cc(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Me.makeFromBucketSpec(this._url,e):this._bucket=Cc(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Tc("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Tc("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new ys(this,e)}_makeRequest(e,t,i,s,o=!0){if(this._deleted)return new Sw(od());{const a=xw(e,this._appId,i,s,t,this._firebaseVersion,o);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){const[i,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,i,s).getPromise()}}const Sc="@firebase/storage",bc="0.13.2";/**
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
 */const ad="storage";function rE(n=ci(),e){n=Q(n);const i=nt(n,ad).getImmediate({identifier:e}),s=eo("storage");return s&&Hw(i,...s),i}function Hw(n,e,t,i={}){Vw(n,e,t,i)}function Bw(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),i=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new jw(t,i,s,e,It)}function Ww(){ke(new Ce(ad,Bw,"PUBLIC").setMultipleInstances(!0)),de(Sc,bc,""),de(Sc,bc,"esm2017")}Ww();export{Jw as a,iE as b,sE as c,rE as d,wu as e,Qw as f,Gw as g,Zw as h,rp as i,nE as j,Kw as k,Xw as l,Mv as m,Gy as n,tE as o,zw as p,qw as r,eE as s,Yw as u};
