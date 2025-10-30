const elements = window.elements = {
            // 主题相关（已禁用暗色）

            // 向导步骤相关
            progressBar: document.getElementById('progressBar'),
            steps: {
                step1: document.getElementById('step1'),
                step2: document.getElementById('step2'),
                step3: document.getElementById('step3'),
                step4: document.getElementById('step4')
            },
            wizardSteps: {
                step1: document.getElementById('wizardStep1'),
                // 新的 5 步结构：将澄清作为第 2 步
                step2: document.getElementById('wizardStep1_5'),
                step3: document.getElementById('wizardStep2'),
                step4: document.getElementById('wizardStep3'),
                step5: document.getElementById('wizardStep4')
            },
            navigationButtons: {
                nextStep1: document.getElementById('nextStep1'),
                nextStep2: document.getElementById('nextStep2'),
                nextStep3: document.getElementById('nextStep3'),
                prevStep2: document.getElementById('prevStep2'),
                prevStep3: document.getElementById('prevStep3'),
                prevStep4: document.getElementById('prevStep4')
            },

            // 选择相关
            purposeCards: document.querySelectorAll('.purpose-card'),
            styleCards: document.querySelectorAll('.style-card'),
            industryTags: document.querySelectorAll('.industry-tag'),
            colorSwatches: document.querySelectorAll('.color-swatch'),
            componentTags: document.querySelectorAll('.component-tag'),
            categoryPills: document.querySelectorAll('.category-pill'),
            industriesContainer: document.getElementById('industriesContainer'),

            // 颜色相关
            customColorInput: document.getElementById('customColorInput'),
            customColorPreview: document.getElementById('customColorPreview'),
            applyCustomColor: document.getElementById('applyCustomColor'),
            colorPicker: document.getElementById('hiddenColorPicker'),
            // 自定义目的/行业
            purposeCustomInput: document.getElementById('purposeCustomInput'),
            addCustomPurpose: document.getElementById('addCustomPurpose'),
            
            // 组件相关
            componentSearch: document.getElementById('componentSearch'),
            clearSearch: document.getElementById('clearSearch'),
            previewContainer: document.getElementById('previewContainer'),
            componentContainer: document.getElementById('componentContainer'),
            componentGroups: document.querySelectorAll('.component-group'),
            noResultsMessage: document.getElementById('noResultsMessage'),

            // 提示词生成相关
            generatePromptButton: document.getElementById('generatePrompt'),
            aiProgressBar: document.getElementById('aiProgressBar'),
            generatedPrompt: document.getElementById('generatedPrompt'),
            suggestionTags: document.getElementById('suggestionTags'),
            additionalDetails: document.getElementById('additionalDetails'),
            copyPromptBtn: document.getElementById('copyPromptBtn'),
            copyStatus: document.getElementById('copyStatus'),
            helpButton: document.getElementById('helpButton'),
            industryCustomInput: document.getElementById('industryCustomInput'),
            addCustomIndustry: document.getElementById('addCustomIndustry'),

            // 选择状态显示
            selectedPurpose: document.getElementById('selectedPurpose'),
            selectedIndustry: document.getElementById('selectedIndustry'),
            selectedStyle: document.getElementById('selectedStyle'),
            selectedColor: document.getElementById('selectedColor'),
            selectedComponentsCount: document.getElementById('selectedComponentsCount'),

        };
const state = window.state = {
            theme: localStorage.getItem('theme') || 'light',
            language: 'zh-CN',
            currentStep: 1,
            currentCategory: 'all', // 当前选中的组件分类
            selections: {
                purpose: '',
                purposeText: '',
                industry: '',
                industryText: '',
                style: '',
                color: '#6366F1',
                components: [],
                additionalDetails: ''
            }
        };
        function refreshDynamicElements() {
            elements.purposeCards = document.querySelectorAll('.purpose-card');
            elements.styleCards = document.querySelectorAll('.style-card');
            elements.industryTags = document.querySelectorAll('.industry-tag');
            elements.componentTags = document.querySelectorAll('.component-tag');
            elements.categoryPills = document.querySelectorAll('.category-pill');
        }
const dataRenderer = window.dataRenderer = {
            renderAll() {
                this.renderPurposes();
                this.renderIndustries();
                this.renderStyles();
                this.renderComponentCategories();
                this.renderComponents();
                refreshDynamicElements();
            },
            renderComponentCategories() {
                const wrap = document.getElementById('componentCategories') || document.querySelector('.component-categories');
                if (!wrap) return;
                wrap.innerHTML = '';
                const all = document.createElement('span');
                all.className = 'category-pill active';
                all.dataset.category = 'all';
                all.innerHTML = `<i class="fas fa-th"></i> 全部`;
                wrap.appendChild(all);
                const cats = Object.keys(window.CONFIG.components);
                cats.forEach(cat => {
                    const pill = document.createElement('span');
                    pill.className = 'category-pill';
                    pill.dataset.category = cat;
                    const ti = window.CONFIG.sectionTitles[cat] || { title: cat };
                    const icon = ti.icon ? `<i class="${ti.icon}"></i> ` : '';
                    pill.innerHTML = `${icon}${ti.title || cat}`;
                    wrap.appendChild(pill);
                });
            },
            renderPurposes() {
                const c = document.getElementById('purposesContainer');
                if (!c) return;
                c.innerHTML = '';
                c.append(
                    ...window.CONFIG.purposes.map(p => {
                        const el = document.createElement('div');
                        el.className = 'purpose-card style-card p-4 rounded-xl bg-white shadow-sm text-center relative';
                        el.dataset.purpose = p.id;
                        el.innerHTML = `
                            <div class="absolute top-0 right-0 w-5 h-5 rounded-full bg-indigo-500 text-white transform translate-x-1 -translate-y-1 opacity-0 check-mark">
                                <i class="fas fa-check text-xs"></i>
                            </div>
                            <div class="h-12 flex items-center justify-center mb-3">
                                <i class="${p.icon} text-3xl ${p.color}"></i>
                            </div>
                            <p class="font-medium">${p.name}</p>
                            <p class="text-xs text-gray-500 mt-1">${p.desc}</p>
                        `;
                        return el;
                    })
                );
            },
            renderIndustries() {
                const c = document.getElementById('industriesContainer');
                if (!c) return;
                c.innerHTML = '';
                c.append(
                    ...window.CONFIG.industries.map(i => {
                        const el = document.createElement('span');
                        el.className = 'industry-tag tag px-3 py-2 rounded-full cursor-pointer';
                        el.dataset.industry = i.id;
                        el.textContent = i.name;
                        try { el.setAttribute('role', 'button'); el.tabIndex = 0; } catch(_) {}
                        return el;
                    })
                );
            },
            renderStyles() {
                const c = document.getElementById('stylesContainer');
                if (!c) return;
                c.innerHTML = '';
                c.append(
                    ...window.CONFIG.styles.map(s => {
                        const el = document.createElement('div');
                        el.className = 'style-card p-4 rounded-xl bg-white shadow-sm relative';
                        el.dataset.style = s.id;
                        el.innerHTML = `
                            <div class="absolute top-0 right-0 w-5 h-5 rounded-full bg-indigo-500 text-white transform translate-x-1 -translate-y-1 opacity-0 check-mark">
                                <i class="fas fa-check text-xs"></i>
                            </div>
                            <img src="${s.image}" alt="${s.name}风格" loading="lazy" class="rounded-md mb-3">
                            <p class="font-medium text-center">${s.name}</p>
                        `;
                        return el;
                    })
                );
            },
            renderComponents() {
                const c = document.getElementById('componentContainer');
                if (!c) return;
                c.innerHTML = '';
                const cats = Object.keys(window.CONFIG.components);
                cats.forEach(cat => {
                    const section = document.createElement('div');
                    section.className = 'component-section';
                    section.dataset.category = cat;
                    const ti = window.CONFIG.sectionTitles[cat] || { title: cat, icon: '' };
                    section.innerHTML = `
                        <div class="component-section-title">
                            ${ti.icon ? `<i class="${ti.icon} text-indigo-500"></i>` : ''} ${ti.title}
                        </div>
                        <div class="component-group"></div>
                    `;
                    const group = section.querySelector('.component-group');
                    window.CONFIG.components[cat].forEach(item => {
                        const tag = document.createElement('div');
                        tag.className = 'component-tag';
                        tag.dataset.category = cat;
                        tag.innerHTML = `<span class="component-icon"><i class="${item.icon}"></i></span> ${item.name}`;
                        group.appendChild(tag);
                    });
                    c.appendChild(section);
                });
            }
        };
        function initApp() {
            // 先渲染数据，再绑定事件
            dataRenderer.renderAll();
            // 在右栏卡片内放置“输出与优化”标题以及顶部“生成提示词”按钮
            (function ensureOutputHeaderAndButton() {
                let placed = false;
                function place() {
                    if (placed) return true;
                    const card = document.getElementById('outputRightCard');
                    if (!card) return false;
                    // header
                    let header = card.querySelector('h3');
                    if (!header) {
                        header = document.createElement('h3');
                        header.className = 'text-lg font-medium';
                        header.textContent = '输出与优化';
                        card.prepend(header);
                    }
                    // wrap header & actions
                    let bar = document.getElementById('outputHeaderBar');
                    if (!bar) {
                        bar = document.createElement('div');
                        bar.id = 'outputHeaderBar';
                        bar.className = 'flex items-center justify-between mb-3 gap-3 flex-wrap';
                        header.parentNode.insertBefore(bar, header);
                        bar.appendChild(header);
                    }
                    // create the top generate button inside header bar
                    let topBtn = document.getElementById('generatePromptTop');
                    if (!topBtn) {
                        topBtn = document.createElement('button');
                        topBtn.id = 'generatePromptTop';
                        topBtn.className = 'btn btn-primary btn-sm flex items-center justify-center';
                        topBtn.innerHTML = '<span class="button-text">生成提示词</span> <span class="loading-spinner hidden ml-2"><i class="fas fa-spinner fa-spin"></i></span>';
                        bar.appendChild(topBtn);
                    }
                    if (!topBtn._bound) {
                        topBtn.addEventListener('click', () => {
                            try {
                                if (window.promptManager && !window.promptManager.isGenerating) window.promptManager.generatePrompt();
                            } catch (_) {}
                        });
                        topBtn._bound = true;
                    }
                    // 可选：隐藏底部按钮区域（保持单一主按钮）
                    const bottomBtn = document.getElementById('generatePrompt');
                    if (bottomBtn) {
                        try {
                            const wrap = bottomBtn.closest('div.flex.justify-end');
                            if (wrap) wrap.style.display = 'none';
                        } catch (_) {}
                    }
                    placed = true;
                    return true;
                }
                // 初次放置与轻微延迟复查（兼容其他模块稍后注入 DOM）
                place();
                setTimeout(place, 80);
                setTimeout(place, 200);
            })();
            // 简化主题初始化：强制亮色主题
            try { document.documentElement.classList.remove('dark'); } catch(_) {}
            try { localStorage.setItem('theme', 'light'); } catch(_) {}
            try { state.theme = 'light'; } catch(_) {}
            // 初始化模块（直接使用 window.* 避免全局别名）
            try { window.helpManager?.init(); } catch(_) {}
            try { window.wizardManager?.init(); } catch(_) {}
            try { window.componentManager?.init(); } catch(_) {}
            try { window.selectionManager?.init(); } catch(_) {}
            try { window.clarificationManager?.init(); } catch(_) {}
            try { window.promptManager?.init(); } catch(_) {}
            try { window.openAISettingsManager?.init(); } catch(_) {} // 设置管理器初始化
            try { window.shareManager?.init(); } catch(_) {}
            // Apply config from URL after everything bound
            try { window.stateManager?.applyUrlConfig(); } catch(_) {}
            // 动态计算左右栏可视高度（桌面）
            try {
                const left = document.querySelector('.left-pane');
                const right = document.querySelector('.right-pane');
                const header = document.getElementById('pageHeader');
                const footer = document.getElementById('pageFooter');
                const compute = () => {
                    if (window.innerWidth < 1024) {
                        if (left) left.style.height = '';
                        if (right) right.style.height = '';
                        document.documentElement.style.overflow = 'auto';
                        document.body.style.overflow = 'auto';
                        return;
                    }
                    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
                    const footerH = footer ? footer.getBoundingClientRect().height : 0;
                    const gap = 24 + (footer ? 24 : 0);
                    let h = window.innerHeight - headerBottom - footerH - gap;
                    if (!Number.isFinite(h) || h < 240) h = Math.max(240, window.innerHeight - 220);
                    if (left) { left.style.height = h + 'px'; left.style.overflowY = 'auto'; }
                    if (right) { right.style.height = h + 'px'; right.style.overflowY = 'auto'; }
                    document.documentElement.style.overflow = 'hidden';
                    document.body.style.overflow = 'hidden';
                };
                compute();
                window.addEventListener('resize', compute);
                window.addEventListener('orientationchange', compute);
            } catch(_) {}
        }
        document.addEventListener('DOMContentLoaded', function () {
            // 页面DOM完全加载后执行的代码
            if (!window.promptGeneratorInitialized) {
                window.promptGeneratorInitialized = true;
                initApp();
            }
        });
