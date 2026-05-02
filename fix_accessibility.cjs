const fs = require('fs');

const filePath = 'index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Associate labels with inputs/selects and add titles
const fixes = [
    { label: 'من تاريخ', id: 'sup-export-start', title: 'تاريخ البداية' },
    { label: 'إلى تاريخ', id: 'sup-export-end', title: 'تاريخ النهاية' },
    { label: 'نوع البيانات', id: 'sup-export-type', title: 'نوع البيانات' },
    { label: 'لون بداية التدرج', id: 'set-text-grad-1', title: 'لون بداية التدرج' },
    { label: 'لون نهاية التدرج', id: 'set-text-grad-2', title: 'لون نهاية التدرج' },
    { label: 'بداية التدرج', id: 'set-topbar-grad-1', title: 'بداية تدرج الشريط العلوي' },
    { label: 'نهاية التدرج', id: 'set-topbar-grad-2', title: 'نهاية تدرج الشريط العلوي' },
    { label: 'بداية التدرج', id: 'set-primary-grad-1', title: 'بداية التدرج الرئيسي' },
    { label: 'نهاية التدرج', id: 'set-primary-grad-2', title: 'نهاية التدرج الرئيسي' },
    { label: 'بداية التدرج', id: 'set-secondary-grad-1', title: 'بداية التدرج الثانوي' },
    { label: 'نهاية التدرج', id: 'set-secondary-grad-2', title: 'نهاية التدرج الثانوي' },
    { label: 'بداية التدرج', id: 'set-accent-grad-1', title: 'بداية تدرج التميز' },
    { label: 'نهاية التدرج', id: 'set-accent-grad-2', title: 'نهاية تدرج التميز' }
];

fixes.forEach(fix => {
    // Find the label followed by the input/select with the given ID
    // We use a regex that handles whitespace and newlines
    const regex = new RegExp(`(<label>)${fix.label}(</label>\\s+<(input|select)[^>]+id="${fix.id}"[^>]*>)`, 'g');
    content = content.replace(regex, (match, p1, p2) => {
        let replacement = `<label for="${fix.id}">${fix.label}</label>${p2}`;
        if (!replacement.includes('title=')) {
            replacement = replacement.replace(`id="${fix.id}"`, `id="${fix.id}" title="${fix.title}"`);
        }
        return replacement;
    });
});

// 2. Fix line-clamp
content = content.replace(/-webkit-line-clamp: 2;/g, '-webkit-line-clamp: 2;\n            line-clamp: 2;');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Accessibility and compatibility fixes applied to index.html');
