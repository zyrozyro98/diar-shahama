const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const startTag = '<div class="f-group full-width" style="margin-top:20px;">';
// We want to replace the section that contains "set-enable-primary-grad"
const searchRegex = /<div class="f-group full-width" style="margin-top:20px;">[\s\S]*?id="set-enable-primary-grad"[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/;

const newContent = `                                                    <div class="f-group full-width" style="margin-top:20px;">
                                                        <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                                                            <input type="checkbox" id="set-enable-primary-grad" checked style="width:20px; height:20px; cursor:pointer;">
                                                            <label for="set-enable-primary-grad" style="margin:0; cursor:pointer;">تفعيل تدرج العناصر الرئيسية (Primary Gradient)</label>
                                                        </div>
                                                        <div class="form-grid-v2">
                                                            <div class="f-group">
                                                                 <label>بداية التدرج</label>
                                                                 <input type="color" id="set-primary-grad-1" value="#a11d21">
                                                            </div>
                                                            <div class="f-group">
                                                                 <label>نهاية التدرج</label>
                                                                 <input type="color" id="set-primary-grad-2" value="#1c7c8c">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="f-group full-width" style="margin-top:20px;">
                                                        <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                                                            <input type="checkbox" id="set-enable-secondary-grad" checked style="width:20px; height:20px; cursor:pointer;">
                                                            <label for="set-enable-secondary-grad" style="margin:0; cursor:pointer;">تفعيل التدرج الثانوي (Secondary Gradient)</label>
                                                        </div>
                                                        <div class="form-grid-v2">
                                                            <div class="f-group">
                                                                 <label>بداية التدرج</label>
                                                                 <input type="color" id="set-secondary-grad-1" value="#1c7c8c">
                                                            </div>
                                                            <div class="f-group">
                                                                 <label>نهاية التدرج</label>
                                                                 <input type="color" id="set-secondary-grad-2" value="#0f172a">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="f-group full-width" style="margin-top:20px;">
                                                        <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                                                            <input type="checkbox" id="set-enable-accent-grad" checked style="width:20px; height:20px; cursor:pointer;">
                                                            <label for="set-enable-accent-grad" style="margin:0; cursor:pointer;">تفعيل تدرج التميز (Accent Gradient)</label>
                                                        </div>
                                                        <div class="form-grid-v2">
                                                            <div class="f-group">
                                                                 <label>بداية التدرج</label>
                                                                 <input type="color" id="set-accent-grad-1" value="#b8860b">
                                                            </div>
                                                            <div class="f-group">
                                                                 <label>نهاية التدرج</label>
                                                                 <input type="color" id="set-accent-grad-2" value="#ffd700">
                                                            </div>
                                                        </div>
                                                    </div>`;

if (searchRegex.test(content)) {
    content = content.replace(searchRegex, newContent);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully updated index.html");
} else {
    console.error("Could not find the target section in index.html");
}
