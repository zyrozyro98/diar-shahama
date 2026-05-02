const fs = require('fs');
let text = fs.readFileSync('index.html', 'utf8');

const s1 = `<!-- Stats bar moved here to allow scrolling -->`;
const r1 = `<div id="cars-mgmt" class="pane active">
                                <div class="pane-header-v2">
                                    <div class="pane-title">
                                        <h3>إدارة المخزون</h3>
                                        <p>إدارة وتسجيل كافة السيارات المتوفرة والواردة</p>
                                    </div>
                                    <button id="add-car-btn-v2" class="btn-premium btn-sm admin-strictly hidden"
                                        onclick="window.openCRUDModal('cars')">إضافة للمخزون</button>
                                </div>
                            <!-- Stats bar returned to cars-mgmt -->`;

text = text.replace(s1, r1);

// Find the SECOND occurrence of the header block (the original one)
const s2 = `<div id="cars-mgmt" class="pane active">
                                <div class="pane-header-v2">
                                    <div class="pane-title">
                                        <h3>إدارة المخزون</h3>
                                        <p>إدارة وتسجيل كافة السيارات المتوفرة والواردة</p>
                                    </div>
                                    <button id="add-car-btn-v2" class="btn-premium btn-sm admin-strictly hidden"
                                        onclick="window.openCRUDModal('cars')">إضافة للمخزون</button>
                                </div>`;

// Find the last index of s2 to only remove the original one
let lastIndex = text.lastIndexOf(s2);
if (lastIndex !== -1) {
    text = text.substring(0, lastIndex) + text.substring(lastIndex + s2.length);
}

fs.writeFileSync('index.html', text);
console.log("Done");
