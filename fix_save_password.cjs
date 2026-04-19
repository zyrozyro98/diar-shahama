const fs = require('fs');
let code = fs.readFileSync('src/main.js', 'utf8');

const regex = /const formData = new FormData\(form\);\s*const data = \{\};\s*formData\.forEach\(\(val, key\) => \{\s*if \(key !== "main_img_file" && key !== "gallery_files"\) \{\s*data\[key\] = val;/g;

if (regex.test(code)) {
    code = code.replace(regex, (match) => {
        return match.replace('data[key] = val;', 'if (key === "password" && !val) return;\n      data[key] = val;');
    });
    fs.writeFileSync('src/main.js', code, 'utf8');
    console.log('Successfully patched password logic.');
} else {
    console.log('Could not find target block with regex.');
}
