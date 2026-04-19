
// Employee Management UI Fix & Enhancement
(function() {
    console.log("Patching Employee Management UI...");
    
    const oldOpenCRUDModal = window.openCRUDModal;
    window.openCRUDModal = function(type, id) {
        if (oldOpenCRUDModal) oldOpenCRUDModal(type, id);
        
        if (type === 'users') {
            setTimeout(() => {
                const container = document.getElementById('item-modal-fields');
                if (!container) return;
                
                const data = id ? (window.state.users || []).find(u => u.id === id) || {} : {};
                const fields = [
                    { name: 'id', label: 'معرف المستخدم (UID من Firebase)', type: 'text', placeholder: 'اتركه فارغاً للتلقائي، أو ضعه للمطابقة مع Auth' },
                    { name: 'name', label: 'الاسم الكامل للموظف', type: 'text', required: true },
                    { name: 'email', label: 'البريد الإلكتروني الرسمي', type: 'text', required: true },
                    { name: 'phone', label: 'رقم الجوال (اختياري)', type: 'text' },
                    { name: 'role', label: 'الصلاحية / الرتبة', type: 'select', options: [{ v: 'staff', t: 'موظف مبيعات' }, { v: 'supervisor', t: 'مشرف نظام' }, { v: 'admin', t: 'مدير نظام' }] },
                    { name: 'isAvailable', label: 'حالة التوفر لاستقبال الطلبات', type: 'select', options: [{ v: true, t: 'متاح الآن' }, { v: false, t: 'غير متاح / مشغول' }] }
                ];
                
                let html = '<div class="form-grid-v3">';
                fields.forEach(f => {
                    let val = (data[f.name] !== undefined && data[f.name] !== null) ? data[f.name] : "";
                    html += `<div class="f-group ${f.type === 'textarea' ? 'full-width' : ''}">
                        <label>${f.label} ${f.required ? '<span class="req">*</span>' : ''}</label>`;
                    
                    if (f.type === 'select') {
                        html += `<select name="${f.name}" class="filter-select">
                            ${f.options.map(opt => `<option value="${opt.v}" ${opt.v.toString() === val.toString() ? 'selected' : ''}>${opt.t}</option>`).join('')}
                        </select>`;
                    } else if (f.type === 'textarea') {
                        html += `<textarea name="${f.name}" placeholder="${f.placeholder || ''}">${val}</textarea>`;
                    } else {
                        html += `<input type="${f.type}" name="${f.name}" value="${val}" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''}>`;
                    }
                    html += '</div>';
                });
                html += '</div>';
                container.innerHTML = html;
            }, 50);
        }
    };

    // Override saveLuxuryItem to handle explicit IDs for users
    const oldSaveLuxuryItem = window.saveLuxuryItem;
    window.saveLuxuryItem = async function(e) {
        const edit = window.state.currentEdit;
        if (edit && edit.type === 'users') {
            if (e) e.preventDefault();
            const form = document.getElementById('item-form');
            const formData = new FormData(form);
            const data = {};
            formData.forEach((val, key) => { data[key] = val; });
            
            const customId = data.id || null;
            delete data.id; // Remove ID from the data body before saving
            
            const targetId = edit.id || customId; // Use existing ID (edit) or custom ID (new)
            try {
                const targetRef = targetId ? window.FirebaseSDK.ref(window.FirebaseSDK.db, `users/${targetId}`) : window.FirebaseSDK.push(window.FirebaseSDK.ref(window.FirebaseSDK.db, 'users'));
                await (targetId ? window.FirebaseSDK.update(targetRef, data) : window.FirebaseSDK.set(targetRef, data));
                window.showLuxuryToast('تم حفظ بيانات الموظف بنجاح');
                window.closeModal('item-modal');
                window.syncAdminTables('users');
                return;
            } catch (err) {
                console.error("User Save Error:", err);
                window.showLuxuryToast("فشل الحفظ: " + err.message, "error");
                return;
            }
        }
        if (oldSaveLuxuryItem) return oldSaveLuxuryItem(e);
    };
})();
