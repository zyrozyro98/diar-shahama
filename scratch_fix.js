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

const s2 = `<div id="cars-mgmt" class="pane active">
                                <div class="pane-header-v2">
                                    <div class="pane-title">
                                        <h3>إدارة المخزون</h3>
                                        <p>إدارة وتسجيل كافة السيارات المتوفرة والواردة</p>
                                    </div>
                                    <button id="add-car-btn-v2" class="btn-premium btn-sm admin-strictly hidden"
                                        onclick="window.openCRUDModal('cars')">إضافة للمخزون</button>
                                </div>`;

text = text.replace(s2, '');

fs.writeFileSync('index.html', text);
console.log("Done");
