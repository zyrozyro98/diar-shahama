const iconv = require('iconv-lite');
const s = 'ط¹ظ…ظٹظ„';
const buf = iconv.encode(s, 'cp1256');
console.log('from cp1256:', buf.toString('utf8'));
const buf2 = Buffer.from(s, 'utf8');
console.log('buf2 cp1256:', iconv.decode(buf2, 'cp1256'));
const buf3 = iconv.encode(s, 'latin1');
console.log('from latin1 to utf8:', buf3.toString('utf8'));
