window.selectionManager = {
            init() {
                this.bindEvents();
            },

            bindEvents() {
                // 目的选择
                elements.purposeCards.forEach(card => {
                    card.setAttribute('role', 'button');
                    card.setAttribute('tabindex', '0');
                    try { card.setAttribute('aria-pressed', 'false'); } catch(_) {}
                    card.addEventListener('click', () => this.handlePurposeSelection(card));
                    card.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.handlePurposeSelection(card); }
                    });
                });

                // 自定义目的
                if (elements.addCustomPurpose) {
                    elements.addCustomPurpose.addEventListener('click', () => this.handlePurposeCustom());
                }
                if (elements.purposeCustomInput) {
                    elements.purposeCustomInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            this.handlePurposeCustom();
                        }
                    });
                }

                // 风格选择
                elements.styleCards.forEach(card => {
                    card.setAttribute('role', 'button');
                    card.setAttribute('tabindex', '0');
                    try { card.setAttribute('aria-pressed', 'false'); } catch(_) {}
                    card.addEventListener('click', () => this.handleStyleSelection(card));
                    card.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.handleStyleSelection(card); }
                    });
                });

                // 行业选择
                if (elements.industriesContainer) {
                    elements.industriesContainer.addEventListener('click', (e) => {
                        const tag = e.target.closest('.industry-tag');
                        if (tag) this.handleIndustrySelection(tag);
                    });
                    elements.industriesContainer.addEventListener('keydown', (e) => {
                        const tag = e.target.closest('.industry-tag');
                        if (tag && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault();
                            this.handleIndustrySelection(tag);
                        }
                    });
                }

                // 自定义行业
                if (elements.addCustomIndustry) {
                    elements.addCustomIndustry.addEventListener('click', () => this.handleIndustryCustom());
                }
                if (elements.industryCustomInput) {
                    elements.industryCustomInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            this.handleIndustryCustom();
                        }
                    });
                }

                // 自定义风格
                if (elements.addCustomStyle) {
                    elements.addCustomStyle.addEventListener('click', () => this.handleStyleCustom());
                }
                if (elements.styleCustomInput) {
                    elements.styleCustomInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            this.handleStyleCustom();
                        }
                    });
                }

                // 颜色选择
                elements.colorSwatches.forEach(swatch => {
                    swatch.addEventListener('click', () => this.handleColorSelection(swatch));
                });

                // 自定义颜色（文本或色轮，均在此处理；色轮 input 会是即时有效的 hex）
                // 点击预览圆打开隐藏色轮
                if (elements.customColorPreview) {
                    try {
                        elements.customColorPreview.style.cursor = 'pointer';
                        elements.customColorPreview.title = '点击选择颜色';
                        elements.customColorPreview.addEventListener('click', () => this.openColorDialog());
                    } catch(_) {}
                }
                // 监听隐藏色轮变化，回填到文本框并即时应用
                if (elements.colorPicker) {
                    const applyFromPicker = (val) => {
                        if (!val) return;
                        const hex = this.toHexUpper(val);
                        if (elements.customColorInput) elements.customColorInput.value = hex;
                        elements.customColorPreview.style.backgroundColor = hex;
                        state.selections.color = hex;
                        this.updateSelectionDisplay('color');
                        try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
                    };
                    elements.colorPicker.addEventListener('input', (e) => applyFromPicker(e.target.value));
                    elements.colorPicker.addEventListener('change', (e) => applyFromPicker(e.target.value));
                }
                elements.customColorInput.addEventListener('input', (e) => {
                    const val = (e.target.value || '').trim();
                    const valid = this.isValidCssColor(val);
                    elements.customColorInput.setAttribute('aria-invalid', valid ? 'false' : 'true');
                    elements.customColorInput.style.borderColor = valid ? '' : '#ef4444';
                    if (valid) {
                        const hex = this.toHexUpper(val);
                        elements.customColorPreview.style.backgroundColor = hex;
                        state.selections.color = hex;
                        this.updateSelectionDisplay('color');
                        try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
                    }
                });

                elements.applyCustomColor.addEventListener('click', () => {
                    const color = (elements.customColorInput.value || '').trim();
                    if (!this.isValidCssColor(color)) {
                        try { this.showToast('请输入有效的颜色值，如 #6366F1 或 rgb(99,102,241)', 'error'); } catch(_) {}
                        elements.customColorInput.focus();
                        return;
                    }
                    const hex = this.toHexUpper(color);
                    state.selections.color = hex;
                    this.updateSelectionDisplay('color');
                    try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
                });

                // 已移除单独色轮，统一在 customColorInput 内处理
            },

            openColorDialog() {
                const apply = (val) => {
                    if (!val) return;
                    const hex = this.toHexUpper(val);
                    if (elements.customColorInput) elements.customColorInput.value = hex;
                    elements.customColorPreview.style.backgroundColor = hex;
                    state.selections.color = hex;
                    this.updateSelectionDisplay('color');
                    try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
                };
                const current = state?.selections?.color || elements.customColorInput?.value || '#6366F1';
                const picker = elements.colorPicker;
                // Preferred path: native showPicker if available
                try {
                    if (picker && typeof picker.showPicker === 'function') {
                        picker.value = this.toHexUpper(current);
                        picker.oninput = (e) => apply(e.target.value);
                        picker.onchange = (e) => apply(e.target.value);
                        picker.showPicker();
                        return;
                    }
                } catch(_) {}
                // Visible overlay with color input (works across browsers)
                const rect = elements.customColorPreview.getBoundingClientRect();
                const box = document.createElement('div');
                box.className = 'inline-color-picker';
                box.style.position = 'fixed';
                box.style.left = Math.round(rect.left) + 'px';
                box.style.top = Math.round(rect.bottom + 6) + 'px';
                box.style.zIndex = '10000';
                box.style.background = 'var(--bg-secondary, #fff)';
                box.style.border = '1px solid var(--border-color, #e5e7eb)';
                box.style.borderRadius = '8px';
                box.style.padding = '8px';
                box.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
                const input = document.createElement('input');
                input.type = 'color';
                input.value = this.toHexUpper(current);
                input.style.width = '36px';
                input.style.height = '36px';
                input.style.border = 'none';
                input.style.padding = '0';
                input.addEventListener('input', (e) => apply(e.target.value));
                input.addEventListener('change', (e) => { apply(e.target.value); remove(); });
                box.appendChild(input);
                document.body.appendChild(box);
                // Try to open native picker, but even不打开用户也可手动点
                try { input.click(); } catch(_) {}
                const onDocClick = (ev) => { if (!box.contains(ev.target)) remove(); };
                const onKey = (ev) => { if (ev.key === 'Escape') remove(); };
                function remove() {
                    document.removeEventListener('mousedown', onDocClick);
                    document.removeEventListener('keydown', onKey);
                    try { document.body.removeChild(box); } catch(_) {}
                }
                document.addEventListener('mousedown', onDocClick);
                document.addEventListener('keydown', onKey);
            },

            // 简单的 CSS 颜色有效性校验
            isValidCssColor(val) {
                if (!val) return false;
                // 快速匹配常见格式
                const hex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
                const func = /^(rgb|rgba|hsl|hsla)\(/i;
                if (hex.test(val) || func.test(val)) return true;
                // 兜底：让浏览器尝试解析
                const el = document.createElement('span');
                el.style.color = '';
                el.style.color = val;
                return !!el.style.color;
            },

            // 转为 #RRGGBB（大写），尽可能归一
            toHexUpper(val) {
                if (!val) return val;
                const hex3 = /^#([0-9a-fA-F]{3})$/;
                const hex6 = /^#([0-9a-fA-F]{6})$/;
                if (hex6.test(val)) return val.toUpperCase();
                if (hex3.test(val)) {
                    const m = val.substring(1).split('');
                    return ('#' + m.map(c => c + c).join('')).toUpperCase();
                }
                // 浏览器解析 rgb/rgba/hsl/hsla
                const tmp = document.createElement('span');
                tmp.style.color = val;
                document.body.appendChild(tmp);
                const cs = getComputedStyle(tmp).color; // rgb(a, ...)
                document.body.removeChild(tmp);
                const m = cs && cs.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
                if (m) {
                    const r = Number(m[1])|0, g = Number(m[2])|0, b = Number(m[3])|0;
                    const to2 = (n) => ('0' + n.toString(16)).slice(-2);
                    return ('#' + to2(r) + to2(g) + to2(b)).toUpperCase();
                }
                return val.toUpperCase();
            },

            showToast(message, type = 'error') {
                const toast = document.createElement('div');
                toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} shadow-lg z-50 transform transition-transform duration-300 translate-y-10 opacity-0`;
                toast.textContent = message;
                document.body.appendChild(toast);
                setTimeout(() => { toast.classList.remove('translate-y-10', 'opacity-0'); }, 10);
                setTimeout(() => {
                    toast.classList.add('translate-y-10', 'opacity-0');
                    setTimeout(() => { document.body.removeChild(toast); }, 300);
                }, 2200);
            },

            handlePurposeSelection(card) {
                const isSelected = card.classList.contains('selected');
                // 清除全部选中样式，并隐藏所有勾选标记
                elements.purposeCards.forEach(c => {
                    c.classList.remove('selected');
                    try { c.setAttribute('aria-pressed', 'false'); } catch(_) {}
                    try {
                        const mark = c.querySelector('.check-mark');
                        if (mark) {
                            mark.classList.add('opacity-0');
                            mark.style.opacity = '0';
                        }
                    } catch(_) {}
                });
                if (isSelected) {
                    // 二次点击同一项：取消选择
                    state.selections.purpose = '';
                    state.selections.purposeText = '';
                } else {
                    // 选择新项
                    card.classList.add('selected');
                    try { card.setAttribute('aria-pressed', 'true'); } catch(_) {}
                    state.selections.purpose = card.dataset.purpose;
                    state.selections.purposeText = card.querySelector('p.font-medium').textContent;
                    // 显示当前卡片的勾选标记
                    try {
                        const mark = card.querySelector('.check-mark');
                        if (mark) {
                            mark.classList.remove('opacity-0');
                            mark.style.opacity = '1';
                        }
                    } catch(_) {}
                }
                this.updateSelectionDisplay('purpose');
                try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
                // 通知其他模块（如建议更新）
                document.dispatchEvent(new Event('purposeChanged'));
            },

            handlePurposeCustom() {
                const input = elements.purposeCustomInput;
                if (!input) return;
                const val = (input.value || '').trim();
                if (!val) return;
                elements.purposeCards.forEach(c => c.classList.remove('selected'));
                state.selections.purpose = 'custom';
                state.selections.purposeText = val;
                this.updateSelectionDisplay('purpose');
                try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
                document.dispatchEvent(new Event('purposeChanged'));
                input.value = '';
            },

            handleStyleSelection(card) {
                const isSelected = card.classList.contains('selected');
                elements.styleCards.forEach(c => { c.classList.remove('selected'); try { c.setAttribute('aria-pressed', 'false'); } catch(_) {} });
                if (isSelected) {
                    state.selections.style = '';
                } else {
                    card.classList.add('selected');
                    try { card.setAttribute('aria-pressed', 'true'); } catch(_) {}
                    state.selections.style = card.dataset.style;
                }
                this.updateSelectionDisplay('style');
                try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
            },

            handleStyleCustom() {
                const input = elements.styleCustomInput;
                if (!input) return;
                const val = (input.value || '').trim();
                if (!val) return;
                // 清除已有选中样式
                elements.styleCards.forEach(c => c.classList.remove('selected'));
                state.selections.style = 'custom';
                state.selections.styleText = val;
                this.updateSelectionDisplay('style');
                try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
                input.value = '';
            },

            handleIndustrySelection(tag) {
                const container = elements.industriesContainer || document;
                const isSelected = tag.classList.contains('selected');
                container.querySelectorAll('.industry-tag.selected').forEach(t => {
                    t.classList.remove('selected');
                    try { t.setAttribute('aria-pressed', 'false'); } catch(_) {}
                });
                if (isSelected) {
                    // 取消选择
                    state.selections.industry = '';
                    state.selections.industryText = '';
                } else {
                    tag.classList.add('selected');
                    try { tag.setAttribute('aria-pressed', 'true'); } catch(_) {}
                    state.selections.industry = tag.dataset.industry || '';
                    state.selections.industryText = (tag.textContent || '').trim();
                }
                this.updateSelectionDisplay('industry');
                try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
                document.dispatchEvent(new Event('purposeChanged'));
            },

            handleIndustryCustom() {
                const input = elements.industryCustomInput;
                if (!input) return;
                const val = (input.value || '').trim();
                if (!val) return;
                // 清除已有选中样式
                elements.industryTags.forEach(t => t.classList.remove('selected'));
                state.selections.industry = 'custom';
                state.selections.industryText = val;
                this.updateSelectionDisplay('industry');
                try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
                // 视觉反馈：在容器末尾追加一个选中的标签
                if (elements.industriesContainer) {
                    const chip = document.createElement('span');
                    chip.className = 'industry-tag tag px-3 py-2 rounded-full cursor-pointer selected';
                    chip.dataset.industry = 'custom';
                    chip.textContent = val;
                    try { chip.setAttribute('role', 'button'); chip.tabIndex = 0; } catch(_) {}
                    elements.industriesContainer.appendChild(chip);
                }
                input.value = '';
                // 持久化自定义行业
                try {
                    const raw = localStorage.getItem('custom_selections');
                    const obj = raw ? JSON.parse(raw) : {};
                    obj.industryText = val;
                    localStorage.setItem('custom_selections', JSON.stringify(obj));
                } catch(_) {}
            },

            handleColorSelection(swatch) {
                const isSelected = swatch.classList.contains('selected');
                elements.colorSwatches.forEach(s => { s.classList.remove('selected'); try { s.setAttribute('aria-pressed', 'false'); } catch(_) {} });
                if (isSelected) {
                    // 取消选择
                    state.selections.color = '';
                    if (elements.customColorInput) elements.customColorInput.value = '';
                    try { elements.customColorPreview.style.backgroundColor = ''; } catch(_) {}
                } else {
                    swatch.classList.add('selected');
                    try { swatch.setAttribute('aria-pressed', 'true'); } catch(_) {}
                    const color = swatch.getAttribute('data-color');
                    const hex = this.toHexUpper(color);
                    state.selections.color = hex;
                    if (elements.customColorInput) elements.customColorInput.value = hex;
                    try { elements.customColorPreview.style.backgroundColor = hex; } catch(_) {}
                }

                this.updateSelectionDisplay('color');
                try { window.promptManager?.scheduleRealtimeUpdate?.(); } catch(_) {}
            },

            updateSelectionDisplay(type) {
                const displays = {
                    purpose: () => {
                        elements.selectedPurpose.innerHTML = `
            <i class="fas fa-bullseye mr-2 text-indigo-500"></i>
            <span>设计目的: ${state.selections.purposeText || '未选择'}</span>
          `;
                    },
                    industry: () => {
                        elements.selectedIndustry.innerHTML = `
            <i class="fas fa-building mr-2 text-indigo-500"></i>
            <span>行业: ${state.selections.industryText || '未选择'}</span>
          `;
                    },
                    style: () => {
                        const styleText = state.selections.style === 'custom' ? state.selections.styleText : state.selections.style;
                        elements.selectedStyle.innerHTML = `
            <i class="fas fa-palette mr-2 text-indigo-500"></i>
            <span>风格: ${styleText || '未选择'}</span>
          `;
                    },
                    color: () => {
                        elements.selectedColor.innerHTML = `
            <i class="fas fa-fill-drip mr-2 text-indigo-500"></i>
            <span>主题色: ${state.selections.color || '未选择'}</span>
          `;
                    }
                };
                if (displays[type]) {
                    displays[type]();
                }
            }
        };
        // 初始加载：自定义行业回填
        try {
            const raw = localStorage.getItem('custom_selections');
            if (raw && elements.industryCustomInput) {
                const obj = JSON.parse(raw);
                if (obj.industryText) {
                    elements.industryCustomInput.value = obj.industryText;
                }
            }
        } catch(_) {}
